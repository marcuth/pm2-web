import { NextResponse } from "next/server"
import { ZodError } from "zod"

import { signUpSchema } from "@/schemas/users/auth.schema"
import { signUp } from "@/services/auth.service"

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const validatedData = signUpSchema.parse(body)

        const user = await signUp(validatedData)

        return NextResponse.json(user, { status: 201 })
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json({ errors: error.issues }, { status: 400 })
        }

        const message = error instanceof Error ? error.message : "Erro interno"
        return NextResponse.json({ message }, { status: 500 })
    }
}
