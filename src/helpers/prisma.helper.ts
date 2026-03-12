import { env } from "@marcuth/env"
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"

/* Uncomment this section if you use PostgreSQL
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"
*/

import { PrismaClient } from "../generated/prisma/client"

/* And uncomment this section if you use PostgreSQL
const pool = new Pool({
    connectionString: env("DATABASE_URL")
})

const adapter = new PrismaPg(pool)
*/
const adapter = new PrismaBetterSqlite3({ url: env("DATABASE_URL") })

export const prisma = new PrismaClient({ adapter: adapter })
