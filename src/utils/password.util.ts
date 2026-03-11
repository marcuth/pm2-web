import { env } from "@marcuth/env"
import * as bcrypt from "bcrypt"

export async function hashPassword(password: string): Promise<string> {
    const saltRounds = +env("BCRYPT_SALT_ROUNDS")
    return await bcrypt.hash(password, saltRounds)
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash)
}
