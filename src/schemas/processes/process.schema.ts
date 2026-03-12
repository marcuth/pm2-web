import { z } from "zod"

export const createProcessSchema = z.object({
    name: z.string().min(1, "Name is required"),
    script: z.string().min(1, "Script or command is required"), // Can be a file path or a full command
    isCommand: z.boolean(), // If true, we handle it as a shell command
    cwd: z.string().optional(),
    args: z.string().optional(),
    env: z.record(z.string(), z.string()).optional(),
})

export type CreateProcessValues = z.infer<typeof createProcessSchema>

export const updateProcessSchema = createProcessSchema.partial()

export type UpdateProcessValues = z.infer<typeof updateProcessSchema>
