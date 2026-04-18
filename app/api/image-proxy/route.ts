import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');
  if (!url) return new NextResponse('missing url', { status: 400 });

  // Only allow Spotify CDN images
  if (!url.startsWith('https://i.scdn.co/')) {
    return new NextResponse('forbidden', { status: 403 });
  }

  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return new NextResponse('upstream error', { status: 502 });

    const contentType = res.headers.get('content-type') ?? 'image/jpeg';
    const buffer = await res.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        // Cache for 55 minutes — Spotify URLs expire after ~1 hour
        'Cache-Control': 'public, max-age=3300, s-maxage=3300',
      },
    });
  } catch {
    return new NextResponse('fetch failed', { status: 502 });
  }
}
