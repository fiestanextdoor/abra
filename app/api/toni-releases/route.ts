import { NextResponse } from 'next/server';

const TONI_ARTIST_ID = '1tE9LhdFz72nhlipsg1ea9';

export const dynamic = 'force-dynamic';

type SpotifyAlbum = {
  name: string;
  images: { url: string; height: number; width: number }[];
  external_urls: { spotify: string };
  release_date: string;
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
      headers: { 'Cache-Control': 'public, s-maxage=3600' },
    });
  } catch (e) {
    console.error('Spotify API error:', e);
    return NextResponse.json(getFallbackReleases(), {
      headers: { 'Cache-Control': 'public, s-maxage=300' },
    });
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
  });
  if (!res.ok) throw new Error('Spotify token failed');
  const data = await res.json();
  return data.access_token;
}

async function fetchToniReleases(token: string): Promise<
  { name: string; image: string; url: string; release_date: string }[]
> {
  const res = await fetch(
    `https://api.spotify.com/v1/artists/${TONI_ARTIST_ID}/albums?include_groups=album,single&limit=20&market=NL`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!res.ok) throw new Error('Spotify albums failed');
  const data = await res.json();
  const items = (data.items || []) as SpotifyAlbum[];
  const sorted = items
    .slice()
    .sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
  return sorted.slice(0, 5).map((a) => ({
    name: a.name,
    image: a.images?.[0]?.url || '',
    url: a.external_urls?.spotify || `https://open.spotify.com/artist/${TONI_ARTIST_ID}`,
    release_date: a.release_date,
  }));
}

function getFallbackReleases(): { name: string; image: string; url: string; release_date: string }[] {
  const baseUrl = 'https://open.spotify.com/artist/1tE9LhdFz72nhlipsg1ea9';
  return [
    { name: 'Verliefd', image: '', url: baseUrl, release_date: '2026-01-01' },
    { name: 'Koud', image: '', url: baseUrl, release_date: '2026-01-01' },
    { name: 'BLOEDHEET', image: '', url: baseUrl, release_date: '2025-01-01' },
    { name: 'Broodje Kipfilet', image: '', url: baseUrl, release_date: '2025-01-01' },
    { name: 'Entre Nous', image: '', url: baseUrl, release_date: '2025-01-01' },
  ];
}
