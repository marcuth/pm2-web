import { env } from "@marcuth/env"
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"

/* Descomente esta seção se você for usar PostgreSQL
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"
*/

import { PrismaClient } from "../generated/prisma/client"

/* E descomente esta seção se você for usar PostgreSQL
const pool = new Pool({
    connectionString: env("DATABASE_URL")
})

const adapter = new PrismaPg(pool)
*/
const adapter = new PrismaBetterSqlite3({ url: env("DATABASE_URL") })

export const prisma = new PrismaClient({ adapter: adapter })
