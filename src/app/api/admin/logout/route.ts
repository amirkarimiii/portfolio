import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {verifyRefreshToken} from "@/features/admin/utils/jwt";
import clientPromise from "@/shared/lib/mongodb";


export async function POST() {
    try {
        const cookieStore = await cookies();
        const refreshTokenStr = cookieStore.get('admin_refresh_token')?.value;

        if (refreshTokenStr) {
            const refreshPayload = await verifyRefreshToken(refreshTokenStr);
            if (refreshPayload?.tokenId) {
                const client = await clientPromise;
                const db = client.db();
                await db.collection('adminRefreshTokens').deleteOne({
                    tokenId: refreshPayload.tokenId,
                });
            }
        }

        const response = NextResponse.json({ success: true });

        response.cookies.delete('admin_access_token');
        response.cookies.delete('admin_refresh_token');

        return response;
    } catch (e) {
        if (e instanceof Error) {
            console.error('Logout error:', e.message);
        }

        const response = NextResponse.json({ success: true });
        response.cookies.delete('admin_access_token');
        response.cookies.delete('admin_refresh_token');
        return response;
    }
}