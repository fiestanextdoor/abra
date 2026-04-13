const ARTIST_IDS = [
  '1tE9LhdFz72nhlipsg1ea9',
  '5NcvBSEJrkWS2Gpng3Vj6w',
  '0jFWofJtib9hQ6h6dFgzhk',
];

export type ArtistData = {
  id: string;
  name: string;
  /** Profielfoto van de artiest op Spotify (images[0]) */
  image: string;
  spotifyUrl: string;
  /** Genres van Spotify (API heeft geen bio, wel genres) */
  genres: string[];
};

async function getToken(): Promise<string | null> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
    },
    body: 'grant_type=client_credentials',
    cache: 'no-store',
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.access_token ?? null;
}

export async function getArtists(): Promise<ArtistData[]> {
  const token = await getToken();
  if (!token) {
    return getFallbackArtists();
  }
  try {
    const res = await fetch(`https://api.spotify.com/v1/artists?ids=${ARTIST_IDS.join(',')}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });
    if (!res.ok) return getFallbackArtists();
    const data = await res.json();
    const raw = (data.artists || []) as {
      id: string;
      name: string;
      images: { url: string }[];
      external_urls: { spotify: string };
      genres?: string[];
    }[];
    return raw
      .filter((a) => a && a.id)
      .map((a) => ({
        id: a.id,
        name: a.name,
        image: a.images?.[0]?.url ?? '',
        spotifyUrl: a.external_urls?.spotify ?? `https://open.spotify.com/artist/${a.id}`,
        genres: Array.isArray(a.genres) ? a.genres : [],
      }));
  } catch {
    return getFallbackArtists();
  }
}

function getFallbackArtists(): ArtistData[] {
  return [
    { id: '1tE9LhdFz72nhlipsg1ea9', name: 'TØNI', image: '', spotifyUrl: 'https://open.spotify.com/artist/1tE9LhdFz72nhlipsg1ea9', genres: [] },
    { id: '5NcvBSEJrkWS2Gpng3Vj6w', name: 'AREnD', image: '', spotifyUrl: 'https://open.spotify.com/artist/5NcvBSEJrkWS2Gpng3Vj6w', genres: [] },
    { id: '0jFWofJtib9hQ6h6dFgzhk', name: 'RENSPLOP', image: '', spotifyUrl: 'https://open.spotify.com/artist/0jFWofJtib9hQ6h6dFgzhk', genres: [] },
  ];
}
