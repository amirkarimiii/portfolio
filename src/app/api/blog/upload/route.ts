import { head, put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
        return NextResponse.json({ error: 'Filename is missing' }, { status: 400 });
    }

    try {
        try {
            const existingBlob = await head(filename);
            if (existingBlob) {
                return NextResponse.json(existingBlob);
            }
        } catch {

        }

        if (!request.body) {
            return NextResponse.json({ error: 'Body is missing' }, { status: 400 });
        }

        const blob = await put(filename, request.body, {
            access: 'public',
            addRandomSuffix: false,
        });

        return NextResponse.json(blob);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to process image' }, { status: 500 });
    }
}