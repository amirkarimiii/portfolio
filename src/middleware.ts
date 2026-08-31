import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { env } from "@/env";
import { logger } from "@/shared/logger/logger";
import { getClientIp } from "@/shared/http/get-client-ip";

const PUBLIC_API_ROUTES = [
    "/api/admin/login",
    "/api/admin/session",
];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/api/admin") && PUBLIC_API_ROUTES.includes(pathname)) {
        return NextResponse.next();
    }

    const accessToken = request.cookies.get("admin_access_token")?.value;

    const handleUnauthorized = (reason: string) => {
        logger.warn(reason, {
            pathname,
            method: request.method,
            ip: getClientIp(request),
        });

        if (pathname.startsWith("/api/")) {
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

        const loginUrl = new URL("/", request.url);
        return NextResponse.redirect(loginUrl);
    };

    if (!accessToken) {
        return handleUnauthorized("Admin access blocked: Missing access token");
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
        return handleUnauthorized("Admin access blocked: Invalid or expired access token");
    }
}

export const config = {
    matcher: [
        "/api/admin/:path*",
        "/admin/:path*",
        "/preview/:path*",
    ],
};