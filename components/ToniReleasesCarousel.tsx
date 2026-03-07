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
};

export function ToniReleasesCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [releases, setReleases] = useState<Release[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/toni-releases')
      .then((res) => res.json())
      .then((data: Release[]) => {
        setReleases(Array.isArray(data) ? data : []);
        setActiveIndex(0);
      })
      .catch(() => setReleases([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (releases.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % releases.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [releases.length]);

  useEffect(() => {
    if (!trackRef.current || releases.length === 0) return;
    const count = releases.length;
    const offsetPercent = activeIndex * (100 / count);
    gsap.to(trackRef.current, {
      x: `-${offsetPercent}%`,
      duration: 0.6,
      ease: 'power2.inOut',
    });
  }, [activeIndex, releases]);

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
        <div className="toni-releases-inner">
          <h2 className="toni-carousel-heading">Laatste releases van TØNI</h2>
          <div className="toni-carousel-loading">Laden…</div>
        </div>
      </section>
    );
  }

  if (releases.length === 0) return null;

  const count = releases.length;

  return (
    <section
      ref={sectionRef}
      className="toni-releases section-alt"
      aria-label="Laatste releases van TØNI"
    >
      <div className="toni-releases-inner">
        <h2 className="toni-carousel-heading">Laatste releases van TØNI</h2>
        <p className="toni-carousel-sub">Luister op Spotify – wordt automatisch bijgewerkt</p>
        <div className="toni-carousel-wrapper">
          <div
            className="toni-carousel-track"
            ref={trackRef}
            style={{ width: `${count * 100}%` }}
          >
            {releases.map((release, i) => (
              <a
                key={`${release.name}-${i}`}
                href={release.url}
                target="_blank"
                rel="noopener noreferrer"
                className="toni-carousel-slide"
                style={{ flex: `0 0 ${100 / count}%` }}
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
                    <span className="toni-carousel-artist">TØNI</span>
                    <span className="toni-carousel-cta">Luister op Spotify →</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
          {count > 1 && (
            <div className="toni-carousel-dots" role="tablist">
              {releases.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === activeIndex}
                  aria-label={`Release ${i + 1}`}
                  className={`toni-carousel-dot ${i === activeIndex ? 'toni-carousel-dot--active' : ''}`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
