import { NextResponse } from "next/server"

import { configHelper } from "@/helpers/config.helper"

export async function POST() {
    const response = NextResponse.json({ message: "Sign out successful" }, { status: 200 })

    response.cookies.set("refreshToken", "", {
        httpOnly: true,
        secure: configHelper.isProduction,
        sameSite: "strict",
        expires: new Date(0),
        path: "/",
    })

    return response
}
