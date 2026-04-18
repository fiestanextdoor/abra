import { NextResponse } from 'next/server';
import { getAllTopTracks } from '@/lib/spotify';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await getAllTopTracks();
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (e) {
    console.error('[api/top-tracks]', e);
    return NextResponse.json([], { status: 500 });
  }
}
