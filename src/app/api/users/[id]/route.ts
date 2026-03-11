import { NextResponse } from "next/server"

import { UserRole } from "@/generated/prisma/client"
import { AuthenticatedUser, authMiddleware, handleRouteError } from "@/helpers/auth.helper"
import { signUpSchema } from "@/schemas/users/auth.schema"
import { deleteUser, findUserById, updateUser } from "@/services/user.service"

// Schema for PATCH, all fields optional
const patchUserSchema = signUpSchema.partial()

async function checkAccess(auth: { user: AuthenticatedUser }, id: string) {
    if (auth.user.role === UserRole.ADMIN) return true
    if (auth.user.id === id) return true
    return false
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const auth = await authMiddleware(request)

        if (auth instanceof NextResponse) return auth

        if (!(await checkAccess(auth, id))) {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 })
        }

        const user = await findUserById(id)

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 })
        }

        return NextResponse.json(user)
    } catch (error) {
        return handleRouteError(error)
    }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const auth = await authMiddleware(request)

        if (auth instanceof NextResponse) return auth

        if (!(await checkAccess(auth, id))) {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 })
        }

        const body = await request.json()
        const validatedData = patchUserSchema.parse(body)

        const user = await updateUser(id, validatedData)

        return NextResponse.json(user)
    } catch (error) {
        return handleRouteError(error)
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const auth = await authMiddleware(request)

        if (auth instanceof NextResponse) return auth

        if (!(await checkAccess(auth, id))) {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 })
        }

        await deleteUser(id)

        return new NextResponse(null, { status: 204 })
    } catch (error) {
        return handleRouteError(error)
    }
}
