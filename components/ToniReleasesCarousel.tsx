'use client';

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Release = {
  name: string;
  image: string;
  url: string;
  release_date: string;
  artists?: string[];
};

export function ToniReleasesCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/toni-releases')
      .then((res) => res.json())
      .then((data: Release[]) => {
        setReleases(Array.isArray(data) ? data : []);
      })
      .catch(() => setReleases([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;
      gsap.fromTo(
        sectionRef.current.querySelector('.toni-carousel-heading'),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  if (loading && releases.length === 0) {
    return (
      <section ref={sectionRef} className="toni-releases section-alt" aria-label="TØNI releases">
        <div className="toni-releases-inner toni-releases-inner--full">
          <h2 className="toni-carousel-heading">Laatste releases van TØNI</h2>
          <div className="toni-carousel-loading">Laden…</div>
        </div>
      </section>
    );
  }

  if (releases.length === 0) return null;

  const duplicated = [...releases, ...releases];

  return (
    <section
      ref={sectionRef}
      className="toni-releases section-alt toni-releases--fullwidth"
      aria-label="Laatste releases van TØNI"
    >
      <div className="toni-releases-inner toni-releases-inner--full">
        <h2 className="toni-carousel-heading">Laatste releases van TØNI</h2>
        <p className="toni-carousel-sub">Luister op Spotify – wordt automatisch bijgewerkt</p>
        <div className="toni-carousel-wrapper toni-carousel-wrapper--full">
          <div className="toni-carousel-track toni-carousel-track--infinite">
            {duplicated.map((release, i) => (
              <a
                key={`${release.name}-${i}`}
                href={release.url}
                target="_blank"
                rel="noopener noreferrer"
                className="toni-carousel-slide"
              >
                <div className="toni-carousel-slide-inner">
                  <div className="toni-carousel-cover">
                    {release.image ? (
                      <img src={release.image} alt="" />
                    ) : (
                      <span className="toni-carousel-cover-placeholder">TØNI</span>
                    )}
                  </div>
                  <div className="toni-carousel-info">
                    <span className="toni-carousel-title">{release.name}</span>
                    <span className="toni-carousel-artist">
                      {(release.artists && release.artists.length > 0)
                        ? release.artists.join(', ')
                        : 'TØNI'}
                    </span>
                    <span className="toni-carousel-cta">Luister op Spotify →</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
