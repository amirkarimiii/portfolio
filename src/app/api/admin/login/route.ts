import {NextResponse} from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import {v4 as uuidv4} from 'uuid';
import {ObjectId} from "mongodb";

export async function POST(request: Request) {
    try {
        const { password } = await request.json();
        if (!password) {
            return NextResponse.json(
                {error: 'Password required'},
                {status: 400}
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

        const sessionId = uuidv4();
        const createdAt = new Date();
        const expiresAt = new Date(createdAt.getTime() + 60 * 60 * 1000);

        await db.collection('adminSessions').insertOne({
            sessionId,
            createdAt,
            expiresAt,
        });

        const response = NextResponse.json({ success: true });

        response.cookies.set({
            name: 'admin_session',
            value: sessionId,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            expires: expiresAt,
            path: '/',
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