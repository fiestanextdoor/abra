function proxyImage(url: string): string {
  if (!url) return '';
  return `/api/image-proxy?url=${encodeURIComponent(url)}`;
}

const ARTIST_IDS = [
  '1tE9LhdFz72nhlipsg1ea9',
  '5NcvBSEJrkWS2Gpng3Vj6w',
  '0jFWofJtib9hQ6h6dFgzhk',
];

export type ArtistData = {
  id: string;
  name: string;
  image: string;
  spotifyUrl: string;
  genres: string[];
  latestRelease?: { name: string; url: string } | null;
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
    // Individuele calls per artiest — de batch-endpoint geeft 403 op bepaalde omgevingen.
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
        const a = await res.json() as {
          id: string;
          name: string;
          images: { url: string }[];
          external_urls: { spotify: string };
          genres?: string[];
        };
        const latestRes = await fetch(
          `https://api.spotify.com/v1/artists/${a.id}/albums?include_groups=single&limit=1`,
          { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }
        );
        let latestRelease: { name: string; url: string } | null = null;
        if (latestRes.ok) {
          const latestData = await latestRes.json() as { items: { name: string; external_urls: { spotify: string } }[] };
          const first = latestData.items?.[0];
          if (first) latestRelease = { name: first.name, url: first.external_urls?.spotify ?? '' };
        }

        return {
          id: a.id,
          name: a.name,
          image: proxyImage(a.images?.[0]?.url ?? ''),
          spotifyUrl: a.external_urls?.spotify ?? `https://open.spotify.com/artist/${ARTIST_IDS[i]}`,
          genres: Array.isArray(a.genres) ? a.genres : [],
          latestRelease,
        };
      })
    );

    const valid = artists.filter((a): a is NonNullable<typeof a> => a !== null);
    return valid.length > 0 ? valid : getFallbackArtists();
  } catch {
    return getFallbackArtists();
  }
}

export type AlbumTrack = {
  number: number;
  name: string;
  duration: string;
};

export type FeaturedAlbum = {
  id: string;
  name: string;
  image: string;
  url: string;
  release_date: string;
  artists: string[];
  tracks: AlbumTrack[];
};


function formatDuration(ms: number): string {
  const mins = Math.floor(ms / 60000);
  const secs = Math.floor((ms % 60000) / 1000);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export type TopTrack = {
  id: string;
  name: string;
  duration: string;
  url: string;
  albumImage: string;
  albumName: string;
  artistName: string;
};

export type ArtistTopTracks = {
  artistId: string;
  artistName: string;
  tracks: TopTrack[];
};

export async function getAllTopTracks(): Promise<ArtistTopTracks[]> {
  const token = await getToken();
  if (!token) {
    console.error('[spotify] getAllTopTracks: no token');
    return [];
  }
  try {
    async function fetchTopTracks(id: string, market: string) {
      const res = await fetch(
        `https://api.spotify.com/v1/artists/${id}/top-tracks?market=${market}`,
        { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }
      );
      if (!res.ok) return null;
      const data = await res.json() as {
        tracks: {
          id: string;
          name: string;
          duration_ms: number;
          external_urls: { spotify: string };
          album: { name: string; images: { url: string }[] };
          artists: { name: string }[];
        }[];
      };
      return data.tracks?.length ? data.tracks : null;
    }

    return Promise.all(
      ARTIST_IDS.map(async (id, i) => {
        // Probeer NL eerst, dan US als fallback
        let tracks = await fetchTopTracks(id, 'NL');
        if (!tracks) tracks = await fetchTopTracks(id, 'US');
        if (!tracks) {
          console.error(`[spotify] top-tracks ${id}: geen resultaten in NL of US`);
          return { artistId: id, artistName: '', tracks: [] };
        }
        return {
          artistId: id,
          artistName: tracks[0]?.artists?.[0]?.name ?? '',
          tracks: tracks.slice(0, 5).map((t) => ({
            id: t.id,
            name: t.name,
            duration: formatDuration(t.duration_ms),
            url: t.external_urls?.spotify ?? '',
            albumImage: proxyImage(t.album?.images?.[0]?.url ?? ''),
            albumName: t.album?.name ?? '',
            artistName: t.artists?.[0]?.name ?? '',
          })),
        };
      })
    );
  } catch (e) {
    console.error('[spotify] getAllTopTracks error:', e);
    return [];
  }
}

const FEATURED_ALBUM_ID = '1S69lwXnaWhX7LZYypbQeU';

export async function getFeaturedAlbum(): Promise<FeaturedAlbum | null> {
  const token = await getToken();
  if (!token) return null;
  try {
    const [albumRes, tracksRes] = await Promise.all([
      fetch(`https://api.spotify.com/v1/albums/${FEATURED_ALBUM_ID}`, {
        headers: { Authorization: `Bearer ${token}` }, cache: 'no-store',
      }),
      fetch(`https://api.spotify.com/v1/albums/${FEATURED_ALBUM_ID}/tracks?limit=20`, {
        headers: { Authorization: `Bearer ${token}` }, cache: 'no-store',
      }),
    ]);

    if (!albumRes.ok) return null;

    const album = await albumRes.json() as {
      id: string;
      name: string;
      images: { url: string }[];
      external_urls: { spotify: string };
      release_date: string;
      artists: { name: string }[];
    };

    let tracks: AlbumTrack[] = [];
    if (tracksRes.ok) {
      const tracksData = await tracksRes.json() as {
        items: { name: string; duration_ms: number; track_number: number }[];
      };
      tracks = (tracksData.items ?? []).map((t) => ({
        number: t.track_number,
        name: t.name,
        duration: formatDuration(t.duration_ms),
      }));
    }

    return {
      id: album.id,
      name: album.name,
      image: proxyImage(album.images?.[0]?.url ?? ''),
      url: album.external_urls?.spotify ?? `https://open.spotify.com/album/${FEATURED_ALBUM_ID}`,
      release_date: album.release_date,
      artists: album.artists?.map((a) => a.name) ?? [],
      tracks,
    };
  } catch {
    return null;
  }
}


function getFallbackArtists(): ArtistData[] {
  return [
    { id: '1tE9LhdFz72nhlipsg1ea9', name: 'TØNI', image: '', spotifyUrl: 'https://open.spotify.com/artist/1tE9LhdFz72nhlipsg1ea9', genres: [] },
    { id: '5NcvBSEJrkWS2Gpng3Vj6w', name: 'AREnD', image: '', spotifyUrl: 'https://open.spotify.com/artist/5NcvBSEJrkWS2Gpng3Vj6w', genres: [] },
    { id: '0jFWofJtib9hQ6h6dFgzhk', name: 'RENSPLOP', image: '', spotifyUrl: 'https://open.spotify.com/artist/0jFWofJtib9hQ6h6dFgzhk', genres: [] },
  ];
}
