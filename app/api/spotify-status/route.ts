import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  // Stap 1: controleer of vars bestaan
  if (!clientId || !clientSecret) {
    return NextResponse.json({
      ok: false,
      step: 'env_vars',
      message: 'SPOTIFY_CLIENT_ID of SPOTIFY_CLIENT_SECRET ontbreekt in Vercel environment variables.',
      clientId: clientId ? 'aanwezig' : 'ONTBREEKT',
      clientSecret: clientSecret ? 'aanwezig' : 'ONTBREEKT',
    });
  }

  // Stap 2: probeer een token te halen
  let token: string;
  try {
    const res = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
      body: 'grant_type=client_credentials',
      cache: 'no-store',
    });
    if (!res.ok) {
      const body = await res.text();
      return NextResponse.json({
        ok: false,
        step: 'token',
        status: res.status,
        message: `Spotify token-aanvraag mislukt (HTTP ${res.status}).`,
        response: body,
      });
    }
    const data = await res.json();
    token = data.access_token;
  } catch (e) {
    return NextResponse.json({
      ok: false,
      step: 'token',
      message: 'Netwerkfout bij ophalen Spotify token.',
      error: String(e),
    });
  }

  const TONI_ID = '1tE9LhdFz72nhlipsg1ea9';

  // Stap 3: albums endpoint zonder market
  const albumsNoMarket = await fetch(
    `https://api.spotify.com/v1/artists/${TONI_ID}/albums?include_groups=album,single&limit=3`,
    { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }
  );

  // Stap 4: albums endpoint met market=NL
  const albumsWithMarket = await fetch(
    `https://api.spotify.com/v1/artists/${TONI_ID}/albums?include_groups=album,single&limit=3&market=NL`,
    { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }
  );

  let albumSample: { name: string; image: string }[] = [];
  const workingAlbumsRes = albumsNoMarket.ok ? albumsNoMarket : albumsWithMarket;
  if (workingAlbumsRes.ok) {
    const data = await workingAlbumsRes.json();
    albumSample = (data.items || []).slice(0, 3).map((a: { name: string; images?: { url: string }[] }) => ({
      name: a.name,
      image: a.images?.[0]?.url ?? '',
    }));
  }

  return NextResponse.json({
    albums_no_market_status: albumsNoMarket.status,
    albums_with_market_status: albumsWithMarket.status,
    album_sample: albumSample,
  });
}
