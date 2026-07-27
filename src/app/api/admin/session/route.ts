import { cookies } from 'next/headers';
import { AdminAuthService } from "@/features/admin/services/adminAuthService";
import { withErrorHandler, createSuccessResponse } from '@/shared/lib/api/routeHandler';

export interface SessionData {
    authenticated: boolean;
    refreshed?: boolean;
    expiresAt?: string;
}

export const GET = withErrorHandler(async () => {
    const cookieStore = await cookies();
    const accessTokenStr = cookieStore.get('admin_access_token')?.value;
    const refreshTokenStr = cookieStore.get('admin_refresh_token')?.value;

    const result = await AdminAuthService.validateOrRefreshSession(accessTokenStr, refreshTokenStr);

    if (!result.authenticated) {
        return clearAuthCookiesResponse();
    }

    const sessionData: SessionData = {
        authenticated: true,
        refreshed: result.refreshed,
        expiresAt: result.expiresAt,
    };

    const response = createSuccessResponse(sessionData);

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
});

function clearAuthCookiesResponse() {
    const response = createSuccessResponse<SessionData>({ authenticated: false });
    response.cookies.delete('admin_access_token');
    response.cookies.delete('admin_refresh_token');
    return response;
}