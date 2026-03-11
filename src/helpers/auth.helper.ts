import { NextResponse } from "next/server"
import { ZodError } from "zod"

import { verifyToken } from "@/utils/jwt.util"

export type AuthenticatedUser = {
    id: string
    username?: string
    role?: string
}

export async function authMiddleware(
    request: Request,
    options?: { roles?: string[] }
): Promise<{ user: AuthenticatedUser } | NextResponse> {
    const authHeader = request.headers.get("Authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]
    const payload = verifyToken(token, "access")

    if (!payload || !payload.sub) {
        return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 })
    }

    if (options?.roles && options.roles.length > 0) {
        if (!payload.role || !options.roles.includes(payload.role)) {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 })
        }
    }

    return {
        user: {
            id: payload.sub,
            username: payload.username,
            role: payload.role,
        },
    }
}

export function handleRouteError(error: unknown) {
    if (error instanceof ZodError) {
        return NextResponse.json({ errors: error.issues }, { status: 400 })
    }

    const message = error instanceof Error ? error.message : "Internal Server Error"
    const status = (error as { status?: number }).status || 500

    return NextResponse.json({ message }, { status })
}
