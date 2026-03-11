import { env } from "@marcuth/env"
import ms, { StringValue } from "ms"

const isProduction = env("NODE_ENV", false) === "production"

function parseTimeToSeconds(timeStr: string): number {
    const milliseconds = ms(timeStr as StringValue)
    return Math.floor(milliseconds / 1000)
}

export const configHelper = {
    isProduction: isProduction,
    isDevelopment: !isProduction,
    cookie: {
        maxAge: parseTimeToSeconds(env("REFRESH_SIGN_EXPIRES_IN", false) || "30d"),
    },
}
