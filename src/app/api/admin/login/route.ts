import { NextRequest } from 'next/server';
import { AdminAuthService } from "@/features/admin/services/adminAuthService";
import { withErrorHandler, createSuccessResponse } from '@/shared/lib/api/routeHandler';
import { AppError, ErrorCode } from '@/shared/types/api';

export const POST = withErrorHandler(async (request: NextRequest) => {
    const { password } = await request.json();

    if (!password) {
        throw new AppError('Password is required', 400, ErrorCode.VALIDATION_ERROR);
    }

    try {
        const { accessToken, refreshToken } = await AdminAuthService.login(password);

        const response = createSuccessResponse({ success: true });
        const isProduction = process.env.NODE_ENV === 'production';

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
                throw new AppError('Server configuration missing', 500, ErrorCode.SERVER_CONFIG_MISSING);
            }
            if (e.message === 'INVALID_CREDENTIALS') {
                throw new AppError('Invalid credentials', 401, ErrorCode.INVALID_CREDENTIALS);
            }
        }
        throw e;
    }
});