'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ARTISTS = [
  {
    id: 'toni',
    name: 'TØNI',
    spotifyUrl:
      'https://open.spotify.com/artist/1tE9LhdFz72nhlipsg1ea9?si=d1cf6b4ac13f41bf',
    description:
      'Toon Abramin van de Sluis is een selfmade artiest die bijna 10 jaar vooral beats produceerde. Geïnspireerd door producer Esko begon hij met trap, en ontdekte later drill, techhouse, deephouse en afro beats. Sinds 2025 gebruikt hij zijn stem — humoristische pop in de lijn van Antoon en Roxy Dekker. Luister naar Verliefd, Koud en meer op Spotify.',
    gradient: 'linear-gradient(135deg, var(--pastel-lavender) 0%, var(--pastel-sky) 100%)',
  },
  {
    id: 'arend',
    name: 'AREnD',
    spotifyUrl:
      'https://open.spotify.com/artist/5NcvBSEJrkWS2Gpng3Vj6w?si=bikTd4TESGyq-cuMxt2P3w',
    description:
      'AREnD maakt deel uit van het Abra Entertainment-collectief met tracks als Verliefd, Koud en BLOEDHEET. Ontdek de sound van Entre Nous en de rest van het repertoire op Spotify.',
    gradient: 'linear-gradient(135deg, var(--pastel-peach) 0%, var(--pastel-blush) 100%)',
  },
  {
    id: 'rensplop',
    name: 'RENSPLOP',
    spotifyUrl:
      'https://open.spotify.com/artist/0jFWofJtib9hQ6h6dFgzhk?si=OhVUF_FrTg2gkIp1Vqnckg',
    description:
      'Rens is muzikant en onderdeel van Abra Entertainment. Van Broodje Kipfilet tot Entre Nous — vind alle releases op Spotify en volg de ontwikkeling van RENSPLOP.',
    gradient: 'linear-gradient(135deg, var(--pastel-sage) 0%, var(--pastel-mint) 100%)',
  },
];

export function Artists() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
  }, []);

  return (
    <section
      ref={sectionRef}
      id="artists"
      className="artists section-alt"
      aria-labelledby="artists-heading"
    >
      <h2 id="artists-heading" className="artists-heading">
        Onze artiesten
      </h2>
      <div className="artists-list">
        {ARTISTS.map((artist, index) => (
          <div
            key={artist.id}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            className={`artist-card ${index % 2 === 1 ? 'artist-card--reverse' : ''}`}
          >
            <div className="artist-card-image-wrap">
              <div
                className="artist-card-image"
                style={{ background: artist.gradient }}
              >
                <span className="artist-initial">{artist.name.charAt(0)}</span>
              </div>
            </div>
            <div className="artist-card-content">
              <h3 className="artist-name">{artist.name}</h3>
              <p className="artist-description">{artist.description}</p>
              <a
                href={artist.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="artist-spotify-link"
              >
                Luister op Spotify →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
