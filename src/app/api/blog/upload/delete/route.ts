import { del } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request): Promise<NextResponse> {
    const { searchParams } = new URL(request.url);
    const urlToDelete = searchParams.get('url');

    if (!urlToDelete) {
        return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
    }

    try {
        await del(urlToDelete);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
    }
}