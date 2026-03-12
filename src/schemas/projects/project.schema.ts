import { z } from "zod"

export const createProjectSchema = z.object({
    name: z.string().min(1, "Name is required"),
    cwd: z.string().min(1, "Working directory is required"),
    mainFile: z.string().optional(),
    envPath: z.string().optional(),
})

export type CreateProjectValues = z.infer<typeof createProjectSchema>

export const updateProjectSchema = createProjectSchema.partial()

export type UpdateProjectValues = z.infer<typeof updateProjectSchema>
