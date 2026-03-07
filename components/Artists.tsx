'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type ArtistFromApi = {
  id: string;
  name: string;
  image: string;
  spotifyUrl: string;
  genres?: string[];
};

const ARTIST_DESCRIPTIONS: Record<string, { description: string; gradient: string }> = {
  '1tE9LhdFz72nhlipsg1ea9': {
    description:
      'Toon Abramin van de Sluis is een selfmade artiest die bijna 10 jaar vooral beats produceerde. Geïnspireerd door producer Esko begon hij met trap, en ontdekte later drill, techhouse, deephouse en afro beats. Sinds 2025 gebruikt hij zijn stem — humoristische pop in de lijn van Antoon en Roxy Dekker. Luister naar Verliefd, Koud en meer op Spotify.',
    gradient: 'linear-gradient(135deg, var(--pastel-lavender) 0%, var(--pastel-sky) 100%)',
  },
  '5NcvBSEJrkWS2Gpng3Vj6w': {
    description:
      'AREnD maakt deel uit van het Abra Entertainment-collectief met tracks als Verliefd, Koud en BLOEDHEET. Ontdek de sound van Entre Nous en de rest van het repertoire op Spotify.',
    gradient: 'linear-gradient(135deg, var(--pastel-peach) 0%, var(--pastel-blush) 100%)',
  },
  '0jFWofJtib9hQ6h6dFgzhk': {
    description:
      'Rens is muzikant en onderdeel van Abra Entertainment. Van Broodje Kipfilet tot Entre Nous — vind alle releases op Spotify en volg de ontwikkeling van RENSPLOP.',
    gradient: 'linear-gradient(135deg, var(--pastel-sky) 0%, var(--pastel-blush) 100%)',
  },
};

const FALLBACK_ARTISTS: ArtistFromApi[] = [
  { id: '1tE9LhdFz72nhlipsg1ea9', name: 'TØNI', image: '', spotifyUrl: 'https://open.spotify.com/artist/1tE9LhdFz72nhlipsg1ea9', genres: [] },
  { id: '5NcvBSEJrkWS2Gpng3Vj6w', name: 'AREnD', image: '', spotifyUrl: 'https://open.spotify.com/artist/5NcvBSEJrkWS2Gpng3Vj6w', genres: [] },
  { id: '0jFWofJtib9hQ6h6dFgzhk', name: 'RENSPLOP', image: '', spotifyUrl: 'https://open.spotify.com/artist/0jFWofJtib9hQ6h6dFgzhk', genres: [] },
];

type ArtistsProps = {
  initialArtists: ArtistFromApi[];
};

export function Artists({ initialArtists }: ArtistsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const artists = Array.isArray(initialArtists) && initialArtists.length > 0 ? initialArtists : FALLBACK_ARTISTS;
  const loading = false;

  useEffect(() => {
    if (artists.length === 0) return;
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
      cardsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              end: 'top 60%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [artists.length]);

  const merged = artists.map((a) => ({
    ...a,
    description: ARTIST_DESCRIPTIONS[a.id]?.description ?? '',
    gradient: ARTIST_DESCRIPTIONS[a.id]?.gradient ?? 'linear-gradient(135deg, var(--pastel-lavender) 0%, var(--pastel-sky) 100%)',
    genres: a.genres ?? [],
  }));

  if (loading && merged.length === 0) {
    return (
      <section ref={sectionRef} id="artists" className="artists section-alt" aria-labelledby="artists-heading">
        <h2 id="artists-heading" ref={headingRef} className="artists-heading">
          Onze artiesten
        </h2>
        <div className="artists-list">
          <div className="artist-loading">Laden…</div>
        </div>
      </section>
    );
  }

  const toShow = merged.length > 0 ? merged : FALLBACK_ARTISTS.map((a) => ({
    ...a,
    description: ARTIST_DESCRIPTIONS[a.id]?.description ?? '',
    gradient: ARTIST_DESCRIPTIONS[a.id]?.gradient ?? 'linear-gradient(135deg, var(--pastel-lavender) 0%, var(--pastel-sky) 100%)',
    genres: a.genres ?? [],
  }));
  if (toShow.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      id="artists"
      className="artists section-alt"
      aria-labelledby="artists-heading"
    >
      <h2 id="artists-heading" ref={headingRef} className="artists-heading">
        Onze artiesten
      </h2>
      <div className="artists-list">
        {toShow.map((artist, index) => (
          <a
            key={artist.id}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            href={artist.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`artist-card ${index % 2 === 1 ? 'artist-card--reverse' : ''}`}
          >
            <div className="artist-card-image-wrap">
              <div
                className="artist-card-image"
                style={{ background: artist.gradient }}
              >
                {artist.image ? (
                  <img
                    src={artist.image}
                    alt={`Profielfoto van ${artist.name} op Spotify`}
                    className="artist-card-img"
                  />
                ) : (
                  <span className="artist-initial">{artist.name.charAt(0)}</span>
                )}
              </div>
            </div>
            <div className="artist-card-content">
              <h3 className="artist-name">{artist.name}</h3>
              <p className="artist-description">{artist.description}</p>
              {artist.genres && artist.genres.length > 0 && (
                <p className="artist-genres">Genres: {artist.genres.join(', ')}</p>
              )}
              <span className="artist-spotify-link">
                Luister op Spotify →
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
