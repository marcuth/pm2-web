import { NextRequest, NextResponse } from "next/server"
import path from "node:path"
import { getProjectById } from "@/services/project.service"
import { readEnvFile, writeEnvFile } from "@/services/env-file.service"

type Props = {
    params: Promise<{ id: string }>
}

export async function GET(req: NextRequest, { params }: Props) {
    const { id } = await params
    try {
        const project = await getProjectById(id)
        if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 })

        const envFile = req.nextUrl.searchParams.get("filename") || project.envPath || ".env"
        const filePath = path.resolve(project.cwd, envFile)
        
        const env = await readEnvFile(filePath)
        return NextResponse.json(env)
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}

export async function PATCH(req: NextRequest, { params }: Props) {
    const { id } = await params
    try {
        const project = await getProjectById(id)
        if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 })

        const envFile = req.nextUrl.searchParams.get("filename") || project.envPath || ".env"
        const filePath = path.resolve(project.cwd, envFile)
        
        const envValues = await req.json()
        await writeEnvFile(filePath, envValues)
        
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 400 })
    }
}
