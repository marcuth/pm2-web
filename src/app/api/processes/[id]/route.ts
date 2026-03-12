import { NextRequest, NextResponse } from "next/server"
import { stopProcess, restartProcess, deletePm2Process, startProcess } from "@/services/pm2.service"
import { prisma } from "@/helpers/prisma.helper"
import { updateProcessSchema } from "@/schemas/processes/process.schema"

type Props = {
    params: Promise<{ id: string }>
}

export async function POST(req: NextRequest, { params }: Props) {
    const { id: name } = await params
    const { action } = await req.json()

    try {
        switch (action) {
            case "stop":
                await stopProcess(name)
                break
            case "restart":
                await restartProcess(name)
                break
            case "delete":
                await deletePm2Process(name)
                break
            default:
                return NextResponse.json({ error: "Invalid action" }, { status: 400 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}

export async function PATCH(req: NextRequest, { params }: Props) {
    const { id: name } = await params
    try {
        const body = await req.json()
        const validated = updateProcessSchema.parse(body)
        
        // Find existing to get projectId
        const existing = await prisma.process.findUnique({ where: { name } })
        if (!existing) return NextResponse.json({ error: "Process not found" }, { status: 404 })

        const currentConfig = existing.config ? JSON.parse(existing.config) : {}

        // Restart with new config - startProcess handles upsert
        await startProcess(existing.projectId, {
            ...currentConfig,
            ...validated,
            name // Name cannot be changed via PATCH [id] in this implementation
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest, { params }: Props) {
    const { id: name } = await params
    try {
        await deletePm2Process(name)
        return new NextResponse(null, { status: 204 })
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}
