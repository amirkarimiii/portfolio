import { ApiResponse } from "@/shared/types/api";

export interface SessionResponse {
    authenticated: boolean;
    refreshed?: boolean;
    expiresAt?: number;
}

async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
    const res = await fetch(url, options);
    const json: ApiResponse<T> = await res.json().catch(() => ({
        success: false,
        error: {
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to parse response",
        },
    }));

    if (!res.ok || !json.success) {
        const errorMessage = !json.success ? json.error.message : "An unexpected error occurred";
        throw new Error(errorMessage);
    }

    return json.data;
}

export async function getAdminSession(): Promise<SessionResponse> {
    try {
        return await apiFetch<SessionResponse>("/api/admin/session");
    } catch {
        return { authenticated: false };
    }
}

export async function loginAdmin(password: string): Promise<{ success: boolean }> {
    return apiFetch<{ success: boolean }>("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
    });
}

export async function logoutAdmin(): Promise<{ success: boolean }> {
    return apiFetch<{ success: boolean }>("/api/admin/logout", {
        method: "POST",
    });
}