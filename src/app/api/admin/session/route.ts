import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { AdminAuthService } from "@/features/admin/services/adminAuthService";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const accessTokenStr = cookieStore.get('admin_access_token')?.value;
        const refreshTokenStr = cookieStore.get('admin_refresh_token')?.value;

        const result = await AdminAuthService.validateOrRefreshSession(accessTokenStr, refreshTokenStr);

        if (!result.authenticated) {
            return clearAuthCookiesResponse();
        }

        const response = NextResponse.json({
            authenticated: true,
            refreshed: result.refreshed,
            expiresAt: result.expiresAt,
        });

        if (result.refreshed && result.accessToken && result.refreshToken) {
            const isProduction = process.env.NODE_ENV === 'production';

            response.cookies.set({
                name: 'admin_access_token',
                value: result.accessToken,
                httpOnly: true,
                secure: isProduction,
                sameSite: 'strict',
                maxAge: 15 * 60,
                path: '/',
            });

            response.cookies.set({
                name: 'admin_refresh_token',
                value: result.refreshToken,
                httpOnly: true,
                secure: isProduction,
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60,
                path: '/api/admin',
            });
        }

        return response;
    } catch (e) {
        if (e instanceof Error) {
            console.error('Session verification error:', e.message);
        }
        return NextResponse.json(
            { authenticated: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}

function clearAuthCookiesResponse() {
    const response = NextResponse.json({ authenticated: false }, { status: 200 });
    response.cookies.delete('admin_access_token');
    response.cookies.delete('admin_refresh_token');
    return response;
}