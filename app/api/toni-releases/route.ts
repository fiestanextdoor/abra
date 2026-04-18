import { NextResponse } from 'next/server';

function proxyImage(url: string): string {
  if (!url) return '';
  return `/api/image-proxy?url=${encodeURIComponent(url)}`;
}

const PLAYLIST_ID = '4SnTKgEMG91Jd8D1bahNiW';

export const dynamic = 'force-dynamic';

type Release = {
  name: string;
  image: string;
  url: string;
  release_date: string;
  artists: string[];
};

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  console.log('[toni-releases] called, clientId present:', !!clientId, 'clientSecret present:', !!clientSecret);

  if (!clientId || !clientSecret) {
    console.error('[toni-releases] missing env vars');
    return NextResponse.json([], { headers: { 'Cache-Control': 'no-store' } });
  }

  try {
    const token = await getSpotifyToken(clientId, clientSecret);
    console.log('[toni-releases] token ok:', !!token);
    const releases = await fetchPlaylistTracks(token);
    console.log('[toni-releases] releases count:', releases.length);
    return NextResponse.json(releases, { headers: { 'Cache-Control': 'no-store' } });
  } catch (e) {
    console.error('[toni-releases] Spotify API error:', e);
    return NextResponse.json([], { headers: { 'Cache-Control': 'no-store' } });
  }
}

async function getSpotifyToken(clientId: string, clientSecret: string): Promise<string> {
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
    },
    body: 'grant_type=client_credentials',
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Spotify token failed');
  const data = await res.json();
  return data.access_token;
}

async function fetchPlaylistTracks(token: string): Promise<Release[]> {
  const releases: Release[] = [];
  let nextUrl: string | null =
    `https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks?limit=50`;

  while (nextUrl) {
    const res = await fetch(nextUrl, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Playlist fetch failed. Status: ${res.status}. Body: ${body}`);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = await res.json() as any;

    console.log('[toni-releases] playlist response status ok, items:', data.items?.length ?? 'none', 'next:', data.next);
    for (const item of (data.items ?? [])) {
      if (!item.track) continue;
      const t = item.track;
      releases.push({
        name: t.name,
        image: proxyImage(t.album?.images?.[0]?.url ?? ''),
        url: t.external_urls?.spotify ?? '',
        release_date: t.album?.release_date ?? '',
        artists: t.artists?.map((a: { name: string }) => a.name) ?? [],
      });
    }

    nextUrl = data.next ?? null;
  }

  return releases;
}
