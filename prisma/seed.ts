import { env } from "@marcuth/env"

import { prisma } from "../src/helpers/prisma.helper"
import { hashPassword } from "../src/utils/password.util"

async function main() {
    const hashedPassword = await hashPassword(env("ADMIN_DEFAULT_PASSWORD"))

    await prisma.user.upsert({
        where: { email: env("ADMIN_DEFAULT_EMAIL") },
        update: {},
        create: {
            name: env("ADMIN_DEFAULT_NAME"),
            email: env("ADMIN_DEFAULT_EMAIL"),
            username: env("ADMIN_DEFAULT_USERNAME"),
            password: hashedPassword,
            apiKey: env("ADMIN_DEFAULT_API_KEY"),
            role: "ADMIN",
        },
    })

    console.log("✅ Production seed completed: Admin user created/verified.")
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
