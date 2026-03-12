import { NextRequest, NextResponse } from "next/server"
import { listPm2Processes, startProcess } from "@/services/pm2.service"
import { createProcessSchema } from "@/schemas/processes/process.schema"

import { prisma } from "@/helpers/prisma.helper"

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const projectId = searchParams.get("projectId")

    try {
        const [pm2List, dbProcesses] = await Promise.all([
            listPm2Processes(),
            prisma.process.findMany({
                where: projectId ? { projectId } : undefined
            })
        ])

        // Merge DB processes with live PM2 data
        const merged = dbProcesses.map(dbProc => {
            const live = pm2List.find(p => p.name === dbProc.name)
            return {
                ...dbProc,
                status: live ? live.pm2_env?.status || "unknown" : "stopped",
                live: live || null
            }
        })

        // Also include processes that are in PM2 but maybe not in DB (if no projectId filter)
        if (!projectId) {
            pm2List.forEach(live => {
                if (!dbProcesses.find(db => db.name === live.name)) {
                    merged.push({
                        id: `pm2-${live.name}`,
                        name: live.name || "unknown",
                        projectId: "external",
                        status: live.pm2_env?.status || "unknown",
                        config: null,
                        live: live,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    } as any)
                }
            })
        }

        return NextResponse.json(merged)
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { projectId, ...data } = body
        if (!projectId) return NextResponse.json({ error: "projectId is required" }, { status: 400 })

        const validated = createProcessSchema.parse(data)
        const result = await startProcess(projectId, validated)
        return NextResponse.json(result, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: (error as any).errors || (error as Error).message }, { status: 400 })
    }
}
