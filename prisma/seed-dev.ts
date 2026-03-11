import { env } from "@marcuth/env"

import { prisma } from "../src/helpers/prisma.helper"
import { hashPassword } from "../src/utils/password.util"

async function main() {
    const adminPassword = await hashPassword(env("ADMIN_DEFAULT_PASSWORD"))

    await prisma.user.upsert({
        where: { email: env("ADMIN_DEFAULT_EMAIL") },
        update: {},
        create: {
            name: env("ADMIN_DEFAULT_NAME"),
            email: env("ADMIN_DEFAULT_EMAIL"),
            username: env("ADMIN_DEFAULT_USERNAME"),
            password: adminPassword,
            apiKey: env("ADMIN_DEFAULT_API_KEY"),
            role: "ADMIN",
        },
    })

    const users = [
        {
            name: "João Silva",
            email: "joao.silva@example.com",
            username: "joaosilva",
            apiKey: "user_68d7e9f1a2b3c4d5",
        },
        {
            name: "Maria Oliveira",
            email: "maria.oliveira@example.com",
            username: "mariaoliveira",
            apiKey: "user_f2a1e3d4b6c8a0b1",
        },
        {
            name: "Pedro Santos",
            email: "pedro.santos@example.com",
            username: "pedrosantos",
            apiKey: "user_c9d8e7b6a5f4e3d2",
        },
    ]

    const commonPassword = await hashPassword("password123")

    for (const userData of users) {
        await prisma.user.upsert({
            where: { email: userData.email },
            update: {},
            create: {
                ...userData,
                password: commonPassword,
                role: "USER",
            },
        })
    }

    console.log("🚀 Dev seed completed: Admin and multiple test users created.")
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
