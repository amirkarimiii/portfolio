export interface SessionResponse {
    authenticated: boolean;
    refreshed?: boolean;
    expiresAt?: string;
    error?: string;
}

export async function getAdminSession(): Promise<SessionResponse> {
    const res = await fetch("/api/admin/session");
    if (!res.ok) {
        return { authenticated: false };
    }
    return res.json();
}

export async function loginAdmin(password: string): Promise<void> {
    const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.message || "Authentication failed");
    }
}

export async function logoutAdmin(): Promise<void> {
    const res = await fetch("/api/admin/logout", {
        method: "POST",
    });

    if (!res.ok) {
        throw new Error("Failed to logout");
    }
}