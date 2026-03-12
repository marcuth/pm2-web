import { prisma } from "@/helpers/prisma.helper"
import { CreateProjectValues, UpdateProjectValues } from "@/schemas/projects/project.schema"
import fs from "fs"
import path from "path"
import { exec } from "child_process"
import { promisify } from "util"

const execAsync = promisify(exec)

export async function createProject(data: CreateProjectValues) {
    return prisma.project.create({
        data,
    })
}

import { listPm2Processes } from "./pm2.service"

export async function listProjects() {
    const [projects, pm2List] = await Promise.all([
        prisma.project.findMany({
            include: {
                processes: true,
            },
            orderBy: { createdAt: "desc" },
        }),
        listPm2Processes()
    ])

    return projects.map(project => ({
        ...project,
        isGit: fs.existsSync(path.join(project.cwd, ".git")),
        processes: project.processes.map(dbProc => {
            const live = pm2List.find(p => p.name === dbProc.name)
            return {
                ...dbProc,
                status: live ? live.pm2_env?.status || "unknown" : "stopped"
            }
        })
    }))
}

export async function getProjectById(id: string) {
    const project = await prisma.project.findUnique({
        where: { id },
        include: {
            processes: true,
        },
    })

    if (project) {
        return {
            ...project,
            isGit: fs.existsSync(path.join(project.cwd, ".git"))
        }
    }

    return null
}

export async function updateProject(id: string, data: UpdateProjectValues) {
    return prisma.project.update({
        where: { id },
        data,
    })
}

export async function deleteProject(id: string) {
    return prisma.project.delete({
        where: { id },
    })
}

export async function gitPull(id: string) {
    const project = await prisma.project.findUnique({ where: { id: id } })

    if (!project) throw new Error("Project not found")

    try {
        const { stdout, stderr } = await execAsync("git pull", { cwd: project.cwd })
        return { stdout, stderr }
    } catch (error: any) {
        throw new Error(error.stderr || error.message)
    }
}
