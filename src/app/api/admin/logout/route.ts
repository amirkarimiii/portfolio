import { cookies } from 'next/headers';
import { AdminAuthService } from "@/features/admin/services/adminAuthService";
import { withErrorHandler, createSuccessResponse } from '@/shared/lib/api/routeHandler';

export const POST = withErrorHandler(async () => {
    const cookieStore = await cookies();
    const refreshTokenStr = cookieStore.get('admin_refresh_token')?.value;

    try {
        await AdminAuthService.logout(refreshTokenStr);
    } catch (e: unknown) {
        console.warn('[LOGOUT_SERVICE_WARNING]:', e);
    }

    const response = createSuccessResponse({ success: true });
    response.cookies.delete('admin_access_token');
    response.cookies.delete('admin_refresh_token');

    return response;
});