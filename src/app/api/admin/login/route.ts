import { NextResponse } from 'next/server';
import { AdminAuthService } from "@/features/admin/services/adminAuthService";

export async function POST(request: Request) {
    try {
        const { password } = await request.json();
        if (!password) {
            return NextResponse.json(
                { error: 'Password required' },
                { status: 400 }
            );
        }

        const { accessToken, refreshToken } = await AdminAuthService.login(password);

        const response = NextResponse.json({ success: true });
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
    } catch (e) {
        if (e instanceof Error) {
            if (e.message === 'SERVER_CONFIG_MISSING') {
                return NextResponse.json({ error: 'Server configuration missing' }, { status: 500 });
            }
            if (e.message === 'INVALID_CREDENTIALS') {
                return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
            }
        }
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}