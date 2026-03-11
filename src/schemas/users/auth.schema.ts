import { z } from "zod"

export const signUpSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("E-mail inválido"),
    username: z.string().min(3, "Username deve ter pelo menos 3 caracteres"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
})

export type SignUpValues = z.infer<typeof signUpSchema>

export const signInSchema = z.object({
    username: z.string().min(1, "Username é obrigatório"),
    password: z.string().min(1, "Senha é obrigatória"),
})

export type SignInValues = z.infer<typeof signInSchema>

export const refreshTokenSchema = z.object({
    refreshToken: z.string().min(1, "Refresh token é obrigatório"),
})

export type RefreshTokenValues = z.infer<typeof refreshTokenSchema>
