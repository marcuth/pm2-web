import { z } from "zod"

export const tokenPayloadSchema = z.object({
    sub: z.string(),
    type: z.enum(["access", "refresh"]),
    username: z.string().optional(),
    role: z.string().optional(),
})

export type TokenPayloadValues = z.infer<typeof tokenPayloadSchema>
