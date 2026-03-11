import { NextResponse } from "next/server"

import { authMiddleware, handleRouteError } from "@/helpers/auth.helper"
import { findUserById } from "@/services/user.service"

export async function GET(request: Request) {
    try {
        const auth = await authMiddleware(request)

        if (auth instanceof NextResponse) return auth

        const user = await findUserById(auth.user.id)

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 })
        }

        return NextResponse.json(user)
    } catch (error) {
        return handleRouteError(error)
    }
}
