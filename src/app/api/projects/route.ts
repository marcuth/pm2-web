import { NextRequest, NextResponse } from "next/server"
import { createProject, listProjects } from "@/services/project.service"
import { createProjectSchema } from "@/schemas/projects/project.schema"

export async function GET() {
    try {
        const projects = await listProjects()
        return NextResponse.json(projects)
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const validated = createProjectSchema.parse(body)
        const project = await createProject(validated)
        return NextResponse.json(project, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: (error as any).errors || (error as Error).message }, { status: 400 })
    }
}
