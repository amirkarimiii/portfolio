import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { env } from "@/env";

const PUBLIC_API_ROUTES = [
    "/api/admin/login",
    "/api/admin/session",
];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (!pathname.startsWith("/api/admin") || PUBLIC_API_ROUTES.includes(pathname)) {
        return NextResponse.next();
    }

    const accessToken = request.cookies.get("admin_access_token")?.value;

    if (!accessToken) {
        return NextResponse.json(
            {
                success: false,
                error: {
                    code: "UNAUTHORIZED",
                    message: "Authentication required",
                },
            },
            { status: 401 }
        );
    }

    try {
        const secret = new TextEncoder().encode(env.JWT_ACCESS_SECRET);
        const { payload } = await jwtVerify(accessToken, secret);

        const requestHeaders = new Headers(request.headers);
        if (typeof payload.sub === "string") {
            requestHeaders.set("x-admin-id", payload.sub);
        }

        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    } catch {
        return NextResponse.json(
            {
                success: false,
                error: {
                    code: "UNAUTHORIZED",
                    message: "Invalid or expired access token",
                },
            },
            { status: 401 }
        );
    }
}

export const config = {
    matcher: [
        "/api/admin/:path*",
    ],
};