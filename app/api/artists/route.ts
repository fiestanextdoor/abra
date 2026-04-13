import { NextResponse } from 'next/server';

const ARTIST_IDS = [
  '1tE9LhdFz72nhlipsg1ea9', // TØNI
  '5NcvBSEJrkWS2Gpng3Vj6w', // AREnD
  '0jFWofJtib9hQ6h6dFgzhk', // RENSPLOP
];

export const dynamic = 'force-dynamic';

type SpotifyArtist = {
  id: string;
  name: string;
  images: { url: string; height: number; width: number }[] | null;
  external_urls: { spotify: string };
};

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.json(getFallbackArtists(), {
      headers: { 'Cache-Control': 'no-store' },
    });
  }

  try {
    const token = await getSpotifyToken(clientId, clientSecret);
    const artists = await fetchArtists(token);
    return NextResponse.json(artists, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (e) {
    console.error('Spotify API error:', e);
    return NextResponse.json(getFallbackArtists(), {
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
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Spotify token failed');
  const data = await res.json();
  return data.access_token;
}

async function fetchArtists(token: string): Promise<
  { id: string; name: string; image: string; spotifyUrl: string }[]
> {
  // Individuele calls — batch-endpoint geeft 403 op bepaalde omgevingen.
  const results = await Promise.all(
    ARTIST_IDS.map((id) =>
      fetch(`https://api.spotify.com/v1/artists/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      })
    )
  );

  const artists = await Promise.all(
    results.map(async (res, i) => {
      if (!res.ok) return null;
      const a = await res.json() as SpotifyArtist;
      return {
        id: a.id,
        name: a.name,
        image: a.images?.[0]?.url || '',
        spotifyUrl: a.external_urls?.spotify || `https://open.spotify.com/artist/${ARTIST_IDS[i]}`,
      };
    })
  );

  return artists.filter((a): a is NonNullable<typeof a> => a !== null);
}

function getFallbackArtists(): { id: string; name: string; image: string; spotifyUrl: string }[] {
  return [
    {
      id: '1tE9LhdFz72nhlipsg1ea9',
      name: 'TØNI',
      image: '',
      spotifyUrl: 'https://open.spotify.com/artist/1tE9LhdFz72nhlipsg1ea9',
    },
    {
      id: '5NcvBSEJrkWS2Gpng3Vj6w',
      name: 'AREnD',
      image: '',
      spotifyUrl: 'https://open.spotify.com/artist/5NcvBSEJrkWS2Gpng3Vj6w',
    },
    {
      id: '0jFWofJtib9hQ6h6dFgzhk',
      name: 'RENSPLOP',
      image: '',
      spotifyUrl: 'https://open.spotify.com/artist/0jFWofJtib9hQ6h6dFgzhk',
    },
  ];
}
