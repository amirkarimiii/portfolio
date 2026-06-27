import {NextRequest, NextResponse} from 'next/server';
import { cookies } from 'next/headers';
import clientPromise from '@/lib/mongodb';


export default async function GET(request: NextRequest) {

    try {

        const sessionId = (await cookies()).get('admin_session')?.value;

        if (!sessionId) {
            return NextResponse.json(
                { authenticated: false },
                { status: 200 }
            );
        }

        const client = await clientPromise;
        const db = client.db();

        const session = await db.collection('adminSessions').findOne({ sessionId });

        if (!session || new Date() > new Date(session.expiresAt)) {
            if (session) {
                await db.collection('adminSessions').deleteOne({ sessionId });
            }

            const response = NextResponse.json({ authenticated: false }, { status: 200 });
            response.cookies.delete('admin_session');
            return response;
        }

        return NextResponse.json({
            authenticated: true,
            expiresAt: session.expiresAt
        });

    } catch (e) {
        return NextResponse.json(
            {authenticated: false, error: 'Internal server error'},
            {status: 500}
        );
    }

}