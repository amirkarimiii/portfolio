import { NextResponse } from 'next/server';
import clientPromise from "@/shared/lib/mongodb";
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { ObjectId } from 'mongodb';
import {signAccessToken, signRefreshToken} from "@/features/admin/utils/jwt";

export async function POST(request: Request) {
    try {
        const { password } = await request.json();
        if (!password) {
            return NextResponse.json(
                { error: 'Password required' },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db();
        const config = await db.collection('adminConfig').findOne({
            _id: new ObjectId('6a4012498a8251c60725be91')
        });

        if (!config || !config.passwordHash) {
            return NextResponse.json({ error: 'Server configuration missing' }, { status: 500 });
        }

        const isPasswordValid = await bcrypt.compare(password, config.passwordHash);
        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const adminId = config._id.toString();
        const tokenId = uuidv4();
        const createdAt = new Date();

        const refreshExpiresAt = new Date(createdAt.getTime() + 7 * 24 * 60 * 60 * 1000);

        await db.collection('adminRefreshTokens').insertOne({
            tokenId,
            adminId,
            createdAt,
            expiresAt: refreshExpiresAt,
        });

        const accessToken = await signAccessToken(adminId);
        const refreshToken = await signRefreshToken(adminId, tokenId);

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
            console.error(e.message);
            console.error(e.stack);
        } else {
            console.error(e);
        }
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}