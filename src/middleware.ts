import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { env } from "@/env";
import {logger} from "@/shared/logger/logger";
import {getClientIp} from "@/shared/http/get-client-ip";

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
        logger.warn("Admin access blocked: Missing access token", {
            pathname,
            method: request.method,
            ip: getClientIp(request),
        });

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

        logger.debug("Admin request authenticated", {
            pathname,
            adminId: payload.sub,
        });

        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    } catch (error) {
        logger.warn(error instanceof Error ? error : new Error(String(error)), "Admin access blocked: Invalid or expired access token", {
            pathname,
            method: request.method,
        });

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