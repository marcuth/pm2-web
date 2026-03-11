import { env } from "@marcuth/env"
import jwt, { SignOptions } from "jsonwebtoken"

import { TokenPayloadValues, tokenPayloadSchema } from "@/schemas/users/token.schema"

const JWT_PRIVATE_KEY = env("JWT_PRIVATE_KEY")
const ACCESS_EXPIRES = env("ACCESS_SIGN_EXPIRES_IN")
const REFRESH_EXPIRES = env("REFRESH_SIGN_EXPIRES_IN")

export function generateAccessToken(payload: Omit<TokenPayloadValues, "type">): string {
    return jwt.sign({ ...payload, type: "access" }, JWT_PRIVATE_KEY, {
        expiresIn: ACCESS_EXPIRES as SignOptions["expiresIn"],
    })
}

export function generateRefreshToken(payload: Omit<TokenPayloadValues, "type">): string {
    return jwt.sign({ ...payload, type: "refresh" }, JWT_PRIVATE_KEY, {
        expiresIn: REFRESH_EXPIRES as SignOptions["expiresIn"],
    })
}

export function verifyToken(
    token: string,
    expectedType: "access" | "refresh"
): TokenPayloadValues | null {
    try {
        const decoded = jwt.verify(token, JWT_PRIVATE_KEY)
        const validated = tokenPayloadSchema.parse(decoded)

        if (validated.type !== expectedType) {
            return null
        }

        return validated
    } catch {
        return null
    }
}
