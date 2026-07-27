import { NextRequest } from "next/server";
import { env } from "@/env";

interface RateLimitRecord {
    count: number;
    resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of rateLimitMap.entries()) {
        if (now > record.resetTime) {
            rateLimitMap.delete(ip);
        }
    }
}, 5 * 60 * 1000);

export function checkRateLimit(request: NextRequest): { success: boolean; remaining: number; resetTime: number } {
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : realIp || "127.0.0.1";

    const now = Date.now();
    const windowMs = env.LOGIN_RATE_LIMIT_WINDOW_MS;
    const maxAttempts = env.MAX_LOGIN_ATTEMPTS;

    const record = rateLimitMap.get(ip);

    if (!record || now > record.resetTime) {
        rateLimitMap.set(ip, {
            count: 1,
            resetTime: now + windowMs,
        });
        return { success: true, remaining: maxAttempts - 1, resetTime: now + windowMs };
    }

    if (record.count >= maxAttempts) {
        return { success: false, remaining: 0, resetTime: record.resetTime };
    }

    record.count += 1;
    return { success: true, remaining: maxAttempts - record.count, resetTime: record.resetTime };
}