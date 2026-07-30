import { NextRequest } from "next/server";

export function getClientIp(request: NextRequest): string {
    const candidates = [
        request.headers.get("cf-connecting-ip"),
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
        request.headers.get("x-real-ip"),
    ];

    return (
        candidates.find((value): value is string => Boolean(value?.trim())) ??
        "unknown"
    );
}