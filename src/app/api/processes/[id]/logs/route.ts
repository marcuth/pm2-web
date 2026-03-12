import { NextRequest, NextResponse } from "next/server"
import { getProcessLogs } from "@/services/pm2.service"

type Props = {
    params: Promise<{ id: string }>
}

export async function GET(req: NextRequest, { params }: Props) {
    const { id: name } = await params
    const lines = parseInt(req.nextUrl.searchParams.get("lines") || "100")

    try {
        const logs = await getProcessLogs(name, lines)
        return NextResponse.json(logs)
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}
