import { NextRequest } from 'next/server';
import { AdminAuthService } from "@/features/admin/services/adminAuthService";
import { withErrorHandler, createSuccessResponse, validateBody } from '@/shared/lib/api/routeHandler';
import { AppError, ErrorCode } from '@/shared/types/api';
import { LoginInputSchema } from '@/features/admin/schemas/authSchema';
import { env } from "@/env";
import { checkRateLimit } from '@/shared/lib/api/rateLimiter';
import { logger } from '@/shared/logger/logger';
import { getClientIp } from '@/shared/http/get-client-ip';

export const POST = withErrorHandler(async (request: NextRequest) => {
    const clientIp = getClientIp(request);
    const rateLimit = checkRateLimit(request);
    if (!rateLimit.success) {
        logger.warn('Admin login rate limit exceeded', { ip: clientIp });
        throw new AppError(
            'Too many login attempts. Please try again later.',
            429,
            ErrorCode.TOO_MANY_REQUESTS
        );
    }

    const { password } = await validateBody(request, LoginInputSchema);

    try {
        const { accessToken, refreshToken } = await AdminAuthService.login(password);
        logger.info('Admin login successful', { ip: clientIp });

        const response = createSuccessResponse({ success: true });
        const isProduction = env.NODE_ENV === 'production';
        response.cookies.set({
            name: 'admin_access_token',
            value: accessToken,
            httpOnly: true,
            secure: isProduction,
            sameSite: 'strict',
            maxAge: 15 * 60,
            path: '/',
        });

        response.cookies.set({
            name: 'admin_refresh_token',
            value: refreshToken,
            httpOnly: true,
            secure: isProduction,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60,
            path: '/api/admin',
        });

        return response;
    } catch (e: unknown) {
        if (e instanceof Error) {
            if (e.message === 'SERVER_CONFIG_MISSING') {
                logger.error(e, 'Admin login failed: Server configuration missing', { ip: clientIp });
                throw new AppError('Server configuration missing', 500, ErrorCode.SERVER_CONFIG_MISSING);
            }
            if (e.message === 'INVALID_CREDENTIALS') {
                logger.warn('Admin login failed: Invalid credentials provided', { ip: clientIp });
                throw new AppError('Invalid credentials', 401, ErrorCode.INVALID_CREDENTIALS);
            }
        }

        logger.error(e as Error, 'Admin login failed due to an unexpected error', { ip: clientIp });
        throw e;
    }
});