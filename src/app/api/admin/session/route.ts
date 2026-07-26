import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';
import {
    getAccessTokenRemainingSeconds, signAccessToken,
    signRefreshToken, verifyAccessToken,
    verifyRefreshToken
} from "@/features/admin/utils/jwt";
import clientPromise from "@/shared/lib/mongodb";


export async function GET() {
    try {
        const cookieStore = await cookies();
        const accessTokenStr = cookieStore.get('admin_access_token')?.value;
        const refreshTokenStr = cookieStore.get('admin_refresh_token')?.value;

        if (accessTokenStr) {
            const payload = await verifyAccessToken(accessTokenStr);
            if (payload) {
                const remainingSeconds = getAccessTokenRemainingSeconds(payload);

                if (remainingSeconds > 180) {
                    return NextResponse.json({
                        authenticated: true,
                        expiresAt: new Date(payload.exp! * 1000).toISOString(),
                    });
                }
            }
        }

        if (!refreshTokenStr) {
            return clearAuthCookiesResponse();
        }

        const refreshPayload = await verifyRefreshToken(refreshTokenStr);
        if (!refreshPayload) {
            return clearAuthCookiesResponse();
        }

        const client = await clientPromise;
        const db = client.db();

        const storedToken = await db.collection('adminRefreshTokens').findOne({
            tokenId: refreshPayload.tokenId,
        });

        if (!storedToken || new Date() > new Date(storedToken.expiresAt)) {
            if (storedToken) {
                await db.collection('adminRefreshTokens').deleteOne({ tokenId: refreshPayload.tokenId });
            }
            return clearAuthCookiesResponse();
        }

        await db.collection('adminRefreshTokens').deleteOne({ tokenId: refreshPayload.tokenId });

        const adminId = refreshPayload.sub;
        const newTokenId = uuidv4();
        const createdAt = new Date();
        const refreshExpiresAt = new Date(createdAt.getTime() + 7 * 24 * 60 * 60 * 1000);

        await db.collection('adminRefreshTokens').insertOne({
            tokenId: newTokenId,
            adminId,
            createdAt,
            expiresAt: refreshExpiresAt,
        });

        const newAccessToken = await signAccessToken(adminId);
        const newRefreshToken = await signRefreshToken(adminId, newTokenId);

        const isProduction = process.env.NODE_ENV === 'production';
        const response = NextResponse.json({
            authenticated: true,
            refreshed: true,
        });

        response.cookies.set({
            name: 'admin_access_token',
            value: newAccessToken,
            httpOnly: true,
            secure: isProduction,
            sameSite: 'strict',
            maxAge: 15 * 60,
            path: '/',
        });

        response.cookies.set({
            name: 'admin_refresh_token',
            value: newRefreshToken,
            httpOnly: true,
            secure: isProduction,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60,
            path: '/api/admin',
        });

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