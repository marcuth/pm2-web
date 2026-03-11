import { env } from "@marcuth/env"
import * as crypto from "node:crypto"

const ALGORITHM = env("ENCRYPTION_ALGORITHM")
const KEY_HEX = env("ENCRYPTION_KEY")
const IV_HEX = env("ENCRYPTION_IV")

export function encrypt(text: string): string {
    const key = Buffer.from(KEY_HEX, "hex")
    const iv = Buffer.from(IV_HEX, "hex")
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv)
    let encrypted = cipher.update(text, "utf8", "hex")
    encrypted += cipher.final("hex")
    return encrypted
}

export function decrypt(encryptedText: string): string {
    const key = Buffer.from(KEY_HEX, "hex")
    const iv = Buffer.from(IV_HEX, "hex")
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv)
    let decrypted = decipher.update(encryptedText, "hex", "utf8")
    decrypted += decipher.final("utf8")
    return decrypted
}
