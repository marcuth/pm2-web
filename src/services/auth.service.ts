import * as crypto from "node:crypto"

import { prisma } from "../helpers/prisma.helper"
import { SignInValues, SignUpValues } from "../schemas/users/auth.schema"
import { generateAccessToken, generateRefreshToken, verifyToken } from "../utils/jwt.util"
import { comparePassword, hashPassword } from "../utils/password.util"

export async function signUp(data: SignUpValues) {
    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [{ email: data.email }, { username: data.username }],
        },
    })

    if (existingUser) {
        throw new Error("Usuário ou e-mail já cadastrado")
    }

    const hashedPassword = await hashPassword(data.password)
    const apiKey = `user_${crypto.randomBytes(16).toString("hex")}`

    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            username: data.username,
            password: hashedPassword,
            apiKey: apiKey,
        },
    })

    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
}

export async function signIn(data: SignInValues) {
    const user = await prisma.user.findUnique({
        where: { username: data.username },
    })

    if (!user) {
        throw new Error("Credenciais inválidas")
    }

    const isPasswordValid = await comparePassword(data.password, user.password)

    if (!isPasswordValid) {
        throw new Error("Credenciais inválidas")
    }

    const accessToken = generateAccessToken({
        sub: user.id,
        username: user.username,
        role: user.role,
    })
    const refreshToken = generateRefreshToken({ sub: user.id })

    const { password: _, ...userWithoutPassword } = user

    return {
        user: userWithoutPassword,
        accessToken,
        refreshToken,
    }
}

export async function refresh(token: string) {
    const payload = verifyToken(token, "refresh")

    if (!payload || !payload.sub) {
        throw new Error("Token inválido ou expirado")
    }

    const user = await prisma.user.findUnique({
        where: { id: payload.sub },
    })

    if (!user) {
        throw new Error("Usuário não encontrado")
    }

    const accessToken = generateAccessToken({
        sub: user.id,
        username: user.username,
        role: user.role,
    })
    const newRefreshToken = generateRefreshToken({ sub: user.id })

    return {
        accessToken,
        refreshToken: newRefreshToken,
    }
}
