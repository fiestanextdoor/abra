'use client';

import { motion } from 'framer-motion';

type ArtistFromApi = {
  id: string;
  name: string;
  image: string;
  spotifyUrl: string;
  genres?: string[];
};

// Display names: all uppercase, except AREnD keeps its lowercase 'n'
const ARTIST_META: Record<string, { displayName: string; description: string }> = {
  '1tE9LhdFz72nhlipsg1ea9': {
    displayName: 'TØNI',
    description:
      'Toon Abramin van de Sluis is een selfmade artiest die bijna 10 jaar vooral beats produceerde. Geïnspireerd door producer Esko begon hij met trap, en ontdekte later drill, techhouse, deephouse en afro beats. Sinds 2025 gebruikt hij zijn stem.',
  },
  '5NcvBSEJrkWS2Gpng3Vj6w': {
    displayName: 'AREnD',
    description:
      'AREnD maakt deel uit van het Abra Entertainment-collectief met tracks als Verliefd, Koud en BLOEDHEET. Ontdek de sound van Entre Nous en de rest van het repertoire op Spotify.',
  },
  '0jFWofJtib9hQ6h6dFgzhk': {
    displayName: 'RENSPLOP',
    description:
      'Rens is muzikant en onderdeel van Abra Entertainment. Van Broodje Kipfilet tot Entre Nous — vind alle releases op Spotify en volg de ontwikkeling van RENSPLOP.',
  },
};

const FALLBACK_ARTISTS: ArtistFromApi[] = [
  { id: '1tE9LhdFz72nhlipsg1ea9', name: 'TØNI',     image: '', spotifyUrl: 'https://open.spotify.com/artist/1tE9LhdFz72nhlipsg1ea9', genres: [] },
  { id: '5NcvBSEJrkWS2Gpng3Vj6w', name: 'AREnD',    image: '', spotifyUrl: 'https://open.spotify.com/artist/5NcvBSEJrkWS2Gpng3Vj6w', genres: [] },
  { id: '0jFWofJtib9hQ6h6dFgzhk', name: 'RENSPLOP', image: '', spotifyUrl: 'https://open.spotify.com/artist/0jFWofJtib9hQ6h6dFgzhk', genres: [] },
];

type ArtistsProps = {
  initialArtists: ArtistFromApi[];
  introComplete?: boolean;
};

function ArtistCard({
  artist,
  index,
}: {
  artist: ArtistFromApi & { displayName: string; description: string; genres: string[] };
  index: number;
}) {
  return (
    <motion.article
      className="artist-card"
      variants={{
        hidden: { opacity: 0, y: 40 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 },
        },
      }}
    >
      <a
        href={artist.spotifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="artist-card-link"
      >
        {artist.image ? (
          <img
            src={artist.image}
            alt={`Profielfoto van ${artist.displayName}`}
            className="artist-card-img"
          />
        ) : (
          <div className="artist-card-fallback">
            <span className="artist-initial">{artist.displayName.charAt(0)}</span>
          </div>
        )}

        <div className="artist-card-overlay">
          <h3 className="artist-name">{artist.displayName}</h3>
          <div className="artist-card-hover-info">
            <p className="artist-description">{artist.description}</p>
            <span className="artist-spotify-link">luister op spotify &rarr;</span>
          </div>
        </div>
      </a>
    </motion.article>
  );
}

export function Artists({ initialArtists, introComplete = true }: ArtistsProps) {
  const base =
    Array.isArray(initialArtists) && initialArtists.length > 0
      ? initialArtists
      : FALLBACK_ARTISTS;

  const artists = base.map((a) => ({
    ...a,
    displayName: ARTIST_META[a.id]?.displayName ?? a.name.toUpperCase(),
    description:  ARTIST_META[a.id]?.description ?? '',
    genres:       a.genres ?? [],
  }));

  if (artists.length === 0) return null;

  return (
    <section id="artists" className="artists" aria-labelledby="artists-heading">
      <div className="artists-header">
        <span className="section-label">the collective</span>
        <h2 id="artists-heading" className="artists-heading">artiesten</h2>
      </div>

      <motion.div
        className="artists-grid"
        initial="hidden"
        animate={introComplete ? 'show' : 'hidden'}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
      >
        {artists.map((artist, i) => (
          <ArtistCard key={artist.id} artist={artist} index={i} />
        ))}
      </motion.div>
    </section>
  );
}
