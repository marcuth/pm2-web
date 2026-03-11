import { NextResponse } from "next/server"

import { UserRole } from "@/generated/prisma/client"
import { authMiddleware, handleRouteError } from "@/helpers/auth.helper"
import { signUpSchema } from "@/schemas/users/auth.schema"
import { createUser, findAllUsers } from "@/services/user.service"

export async function GET(request: Request) {
    try {
        const auth = await authMiddleware(request, { roles: [UserRole.ADMIN] })

        if (auth instanceof NextResponse) return auth

        const users = await findAllUsers()

        return NextResponse.json(users)
    } catch (error) {
        return handleRouteError(error)
    }
}

export async function POST(request: Request) {
    try {
        const auth = await authMiddleware(request, { roles: [UserRole.ADMIN] })

        if (auth instanceof NextResponse) return auth

        const body = await request.json()
        const validatedData = signUpSchema.parse(body)

        const user = await createUser(validatedData)

        return NextResponse.json(user, { status: 201 })
    } catch (error) {
        return handleRouteError(error)
    }
}
