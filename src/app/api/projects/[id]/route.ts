import { NextRequest, NextResponse } from "next/server"
import { getProjectById, updateProject, deleteProject } from "@/services/project.service"
import { updateProjectSchema } from "@/schemas/projects/project.schema"

type Props = {
    params: Promise<{ id: string }>
}

export async function GET(req: NextRequest, { params }: Props) {
    const { id } = await params
    try {
        const project = await getProjectById(id)
        if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 })
        return NextResponse.json(project)
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}

export async function PATCH(req: NextRequest, { params }: Props) {
    const { id } = await params
    try {
        const body = await req.json()
        const validated = updateProjectSchema.parse(body)
        const project = await updateProject(id, validated)
        return NextResponse.json(project)
    } catch (error) {
        return NextResponse.json({ error: (error as any).errors || (error as Error).message }, { status: 400 })
    }
}

export async function DELETE(req: NextRequest, { params }: Props) {
    const { id } = await params
    try {
        await deleteProject(id)
        return new NextResponse(null, { status: 204 })
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}
