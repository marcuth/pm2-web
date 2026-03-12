import fs from "node:fs/promises"
import path from "node:path"
import dotenv from "dotenv"

/**
 * Service to manage local .env files.
 * Provides reading and saving capabilities for standard key=value formats.
 */

export async function readEnvFile(filePath: string) {
    try {
        const raw = await fs.readFile(filePath, "utf-8")
        return dotenv.parse(raw)
    } catch (error) {
        if ((error as any).code === "ENOENT") {
            return {}
        }
        throw error
    }
}

export async function writeEnvFile(filePath: string, env: Record<string, string>) {
    const content = Object.entries(env)
        .map(([key, value]) => `${key}="${value}"`)
        .join("\n")
    
    // Ensure parent directory exists
    const dirname = path.dirname(filePath)
    await fs.mkdir(dirname, { recursive: true })
    
    await fs.writeFile(filePath, content, "utf-8")
}

export async function listEnvFiles(directory: string) {
    const files = await fs.readdir(directory)
    return files.filter(f => f.startsWith(".env"))
}
