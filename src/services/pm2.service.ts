import pm2 from "pm2"
import fs from "node:fs/promises"
import { prisma } from "@/helpers/prisma.helper"
import { CreateProcessValues } from "@/schemas/processes/process.schema"

async function withPm2<T>(callback: () => Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        pm2.connect(async (err) => {
            if (err) return reject(err)
            try {
                const result = await callback()
                pm2.disconnect()
                resolve(result)
            } catch (error) {
                pm2.disconnect()
                reject(error)
            }
        })
    })
}

export async function listPm2Processes() {
    return withPm2(
        () =>
            new Promise<pm2.ProcessDescription[]>((resolve, reject) => {
                pm2.list((err, list) => {
                    if (err) return reject(err)
                    resolve(list)
                })
            })
    )
}

export async function startProcess(projectId: string, data: CreateProcessValues) {
    const project = await prisma.project.findUnique({ where: { id: projectId } })
    if (!project) throw new Error("Project not found")

    let script = data.script
    let args = data.args || ""
    
    // For terminal commands, we pass the full command to the shell
    // For standard scripts, we pass the file path
    const config = JSON.stringify(data)
    
    // Always create/update in DB first so it's visible even if PM2 fails
    const dbProcess = await prisma.process.upsert({
        where: { name: data.name },
        update: {
            projectId,
            config
        },
        create: {
            name: data.name,
            projectId,
            config
        },
    })

    return withPm2(
        () =>
            new Promise((resolve, reject) => {
                pm2.start(
                    {
                        name: data.name,
                        script: data.isCommand ? `${data.script} ${data.args || ""}`.trim() : data.script,
                        cwd: data.cwd || project.cwd,
                        args: data.isCommand ? "" : (data.args || ""),
                        env: Object.fromEntries(
                            Object.entries({ ...process.env, ...data.env })
                                .filter(([_, v]) => v !== undefined)
                        ) as Record<string, string>,
                        autorestart: true,
                        watch: false,
                        shell: data.isCommand ? (process.platform === "win32" ? "cmd.exe" : true) : false,
                        interpreter: data.isCommand ? "none" : undefined,
                    } as any,
                    async (err, proc) => {
                        if (err) {
                            console.error(`PM2 start failed for ${data.name}:`, err)
                            // We still resolve with the DB entry so the UI can show it
                            return resolve({ proc: null, db: dbProcess, error: (err as Error).message })
                        }
                        resolve({ proc, db: dbProcess })
                    }
                )
            })
    )
}

export async function stopProcess(name: string) {
    return withPm2(
        () =>
            new Promise((resolve, reject) => {
                pm2.stop(name, (err) => {
                    if (err) return reject(err)
                    resolve(true)
                })
            })
    )
}

export async function restartProcess(name: string) {
    return withPm2(
        () =>
            new Promise((resolve, reject) => {
                pm2.restart(name, (err) => {
                    if (err) return reject(err)
                    resolve(true)
                })
            })
    )
}

export async function deletePm2Process(name: string) {
    try {
        await withPm2(
            () =>
                new Promise((resolve, reject) => {
                    pm2.delete(name, (err) => {
                        if (err) return reject(err)
                        resolve(true)
                    })
                })
        )
    } catch (error) {
        console.warn(`PM2 delete failed for ${name}, proceeding to DB deletion:`, error)
    }

    await prisma.process.deleteMany({
        where: { name: name },
    })

    return true
}

export async function getProcessLogs(name: string, lines = 100) {
    return withPm2(
        () =>
            new Promise<{ out: string; err: string }>((resolve, reject) => {
                pm2.describe(name, async (err, list) => {
                    if (err) return reject(err)
                    if (!list || list.length === 0) return reject(new Error("Process not found"))

                    const proc = list[0]
                    const outPath = proc.pm2_env?.pm_out_log_path
                    const errPath = proc.pm2_env?.pm_err_log_path

                    const readLastLines = async (filePath?: string) => {
                        if (!filePath) return ""
                        try {
                            const stats = await fs.stat(filePath)
                            const size = stats.size
                            // Read last 10KB to be fast, then split by lines
                            const bufferSize = Math.min(size, 1024 * 10) 
                            const { buffer } = await fs.open(filePath, 'r').then(async fd => {
                                try {
                                    return await fd.read(Buffer.alloc(bufferSize), 0, bufferSize, size - bufferSize)
                                } finally {
                                    await fd.close()
                                }
                            })
                            const content = buffer.toString('utf8')
                            const linesArray = content.split('\n')
                            return linesArray.slice(-lines).join('\n')
                        } catch (e) {
                            console.error(`Failed to read logs at ${filePath}`, e)
                            return ""
                        }
                    }

                    const [out, errorLogs] = await Promise.all([
                        readLastLines(outPath),
                        readLastLines(errPath)
                    ])

                    resolve({ out, err: errorLogs })
                })
            })
    )
}
