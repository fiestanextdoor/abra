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

  const ARTIST_IDS = [
    '1tE9LhdFz72nhlipsg1ea9',
    '5NcvBSEJrkWS2Gpng3Vj6w',
    '0jFWofJtib9hQ6h6dFgzhk',
  ];

  // Stap 3: batch-aanroep (exact zoals getArtists() dit doet)
  try {
    const res = await fetch(
      `https://api.spotify.com/v1/artists?ids=${ARTIST_IDS.join(',')}`,
      { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }
    );
    if (!res.ok) {
      return NextResponse.json({
        ok: false,
        step: 'batch_fetch',
        status: res.status,
        message: `Spotify batch-aanvraag mislukt (HTTP ${res.status}).`,
      });
    }
    const data = await res.json();
    const artists = (data.artists || []).map((a: { name: string; images?: { url: string }[] }) => ({
      name: a.name,
      image: a.images?.[0]?.url ?? '',
      hasImage: !!(a.images?.[0]?.url),
    }));
    return NextResponse.json({
      ok: true,
      message: 'Spotify werkt correct.',
      artists,
    });
  } catch (e) {
    return NextResponse.json({
      ok: false,
      step: 'batch_fetch',
      message: 'Netwerkfout bij ophalen artiesten.',
      error: String(e),
    });
  }
}
