import { NextResponse } from 'next/server';

const TONI_ARTIST_ID = '1tE9LhdFz72nhlipsg1ea9';

export const dynamic = 'force-dynamic';

type SpotifyAlbum = {
  name: string;
  images: { url: string; height: number; width: number }[];
  external_urls: { spotify: string };
  release_date: string;
  artists: { id: string; name: string }[];
};

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.json(getFallbackReleases(), {
      headers: { 'Cache-Control': 'public, s-maxage=3600' },
    });
  }

  try {
    const token = await getSpotifyToken(clientId, clientSecret);
    const releases = await fetchToniReleases(token);
    return NextResponse.json(releases, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (e) {
    console.error('Spotify API error:', e);
    return NextResponse.json(
      { error: String(e), fallback: getFallbackReleases() },
      { headers: { 'Cache-Control': 'no-store' } }
    );
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

async function fetchToniReleases(token: string): Promise<
  { name: string; image: string; url: string; release_date: string; artists: string[] }[]
> {
  // Probeer eerst met market=NL, dan zonder — sommige omgevingen geven 403 met market-param.
  const urls = [
    `https://api.spotify.com/v1/artists/${TONI_ARTIST_ID}/albums?include_groups=album,single&limit=50&offset=0`,
    `https://api.spotify.com/v1/artists/${TONI_ARTIST_ID}/albums?include_groups=album,single&limit=50&offset=0&market=NL`,
  ];

  let firstRes: Response | null = null;
  const attemptStatuses: number[] = [];
  for (const url of urls) {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });
    attemptStatuses.push(res.status);
    if (res.ok) { firstRes = res; break; }
  }

  if (!firstRes) throw new Error(`Spotify albums failed. Token length: ${token?.length ?? 0}. Statuses: ${attemptStatuses.join(', ')}`);

  // Pagineer door alle releases
  let items: SpotifyAlbum[] = [];
  const firstData = await firstRes.json();
  items = items.concat((firstData.items || []) as SpotifyAlbum[]);

  let nextUrl: string | null = firstData.next ?? null;
  while (nextUrl) {
    const res = await fetch(nextUrl, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });
    if (!res.ok) break;
    const data = await res.json();
    items = items.concat((data.items || []) as SpotifyAlbum[]);
    nextUrl = data.next ?? null;
  }

  const sorted = items
    .slice()
    .sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());

  return sorted.map((a) => ({
    name: a.name,
    image: a.images?.[0]?.url || '',
    url: a.external_urls?.spotify || `https://open.spotify.com/artist/${TONI_ARTIST_ID}`,
    release_date: a.release_date,
    artists: (a.artists || []).map((ar) => ar.name),
  }));
}

function getFallbackReleases(): {
  name: string;
  image: string;
  url: string;
  release_date: string;
  artists: string[];
}[] {
  const baseUrl = 'https://open.spotify.com/artist/1tE9LhdFz72nhlipsg1ea9';
  return [
    { name: 'Verliefd', image: '', url: baseUrl, release_date: '2026-01-01', artists: ['TØNI'] },
    { name: 'Koud', image: '', url: baseUrl, release_date: '2026-01-01', artists: ['TØNI'] },
    { name: 'BLOEDHEET', image: '', url: baseUrl, release_date: '2025-01-01', artists: ['TØNI'] },
    { name: 'Broodje Kipfilet', image: '', url: baseUrl, release_date: '2025-01-01', artists: ['TØNI'] },
    { name: 'Entre Nous', image: '', url: baseUrl, release_date: '2025-01-01', artists: ['TØNI'] },
  ];
}
