import { NextResponse } from 'next/server';

function proxyImage(url: string): string {
  if (!url) return '';
  return `/api/image-proxy?url=${encodeURIComponent(url)}`;
}

const TONI_ARTIST_ID = '1tE9LhdFz72nhlipsg1ea9';

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

  if (!clientId || !clientSecret) {
    console.error('[toni-releases] missing env vars');
    return NextResponse.json([], { headers: { 'Cache-Control': 'no-store' } });
  }

  try {
    const token = await getSpotifyToken(clientId, clientSecret);
    const releases = await fetchArtistReleases(token);
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

async function fetchArtistReleases(token: string): Promise<Release[]> {
  const releases: Release[] = [];
  let nextUrl: string | null =
    `https://api.spotify.com/v1/artists/${TONI_ARTIST_ID}/albums?include_groups=single,album&limit=50&market=NL`;

  while (nextUrl) {
    const res = await fetch(nextUrl, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Artist albums fetch failed. Status: ${res.status}. Body: ${body}`);
    }
    const data = await res.json() as {
      items: {
        id: string;
        name: string;
        images: { url: string }[];
        external_urls: { spotify: string };
        release_date: string;
        artists: { name: string }[];
        album_type: string;
      }[];
      next: string | null;
    };

    for (const album of (data.items ?? [])) {
      releases.push({
        name: album.name,
        image: proxyImage(album.images?.[0]?.url ?? ''),
        url: album.external_urls?.spotify ?? '',
        release_date: album.release_date ?? '',
        artists: album.artists?.map((a) => a.name) ?? [],
      });
    }

    nextUrl = data.next ?? null;
  }

  // Sorteer op release datum, nieuwste eerst
  releases.sort((a, b) => b.release_date.localeCompare(a.release_date));

  return releases;
}
