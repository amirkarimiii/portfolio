import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { AdminAuthService } from "@/features/admin/services/adminAuthService";

export async function POST() {
    try {
        const cookieStore = await cookies();
        const refreshTokenStr = cookieStore.get('admin_refresh_token')?.value;

        await AdminAuthService.logout(refreshTokenStr);

        const response = NextResponse.json({ success: true });
        response.cookies.delete('admin_access_token');
        response.cookies.delete('admin_refresh_token');

        return response;
    } catch {
        const response = NextResponse.json({ success: true });
        response.cookies.delete('admin_access_token');
        response.cookies.delete('admin_refresh_token');
        return response;
    }
}