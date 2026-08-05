import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { AdminAuthService } from "@/features/admin/services/adminAuthService";
import { withErrorHandler, createSuccessResponse } from '@/shared/lib/api/routeHandler';
import { logger } from '@/shared/logger/logger';
import { getClientIp } from '@/shared/http/get-client-ip';

export const POST = withErrorHandler(async (request: NextRequest) => {
    const clientIp = getClientIp(request);
    const cookieStore = await cookies();
    const refreshTokenStr = cookieStore.get('admin_refresh_token')?.value;

    try {
        await AdminAuthService.logout(refreshTokenStr);
        logger.info('Admin logout successful', { ip: clientIp });
    } catch (e: unknown) {
        logger.warn('Admin logout encountered an issue', {
            ip: clientIp,
            error: e instanceof Error ? e.message : String(e),
        });
    }

    const response = createSuccessResponse({ success: true });
    response.cookies.delete('admin_access_token');
    response.cookies.delete('admin_refresh_token');

    return response;
});