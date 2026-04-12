'use client';

import { useEffect, useState } from 'react';

type Release = {
  name: string;
  image: string;
  url: string;
  release_date: string;
  artists?: string[];
};

type ToniReleasesCarouselProps = {
  introComplete: boolean;
};

function PlayIcon() {
  return (
    <div className="release-play-icon">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M8 5v14l11-7z" />
      </svg>
    </div>
  );
}

function ReleaseCard({ release }: { release: Release }) {
  const year = release.release_date ? release.release_date.split('-')[0] : '';
  const artistLabel =
    release.artists && release.artists.length > 0
      ? release.artists.join(', ')
      : 'tøni';

  return (
    <a
      href={release.url}
      target="_blank"
      rel="noopener noreferrer"
      className="release-card"
    >
      <div className="release-cover-wrap">
        {release.image ? (
          <img
            src={release.image}
            alt={release.name}
            className="release-cover-img"
          />
        ) : (
          <div
            className="release-cover-img"
            style={{ background: 'var(--surface-highest)' }}
          />
        )}
        <div className="release-play-btn" aria-hidden="true">
          <PlayIcon />
        </div>
      </div>

      <div className="release-meta">
        <span className="release-title">{release.name}</span>
        <span className="release-artist-date">
          {artistLabel}{year ? ` — ${year}` : ''}
        </span>
      </div>
    </a>
  );
}

export function ToniReleasesCarousel({ introComplete }: ToniReleasesCarouselProps) {
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/toni-releases')
      .then((res) => res.json())
      .then((data: Release[]) => {
        setReleases(Array.isArray(data) ? data.slice(0, 8) : []);
      })
      .catch(() => setReleases([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section
      id="releases"
      className="releases"
      aria-labelledby="releases-heading"
      style={{
        opacity: introComplete ? 1 : 0,
        transform: introComplete ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      <div className="releases-header">
        <div>
          <span className="section-label">new additions</span>
          <h2 id="releases-heading" className="releases-heading">releases</h2>
        </div>
        <a
          href="https://open.spotify.com/artist/1tE9LhdFz72nhlipsg1ea9"
          target="_blank"
          rel="noopener noreferrer"
          className="releases-archive-link"
        >
          alle releases
        </a>
      </div>

      {loading ? (
        <p className="releases-loading">laden...</p>
      ) : releases.length === 0 ? (
        <div className="releases-grid">
          <p className="releases-empty">geen releases gevonden.</p>
        </div>
      ) : (
        <div className="releases-grid">
          {releases.map((release, i) => (
            <ReleaseCard key={`${release.name}-${i}`} release={release} />
          ))}
        </div>
      )}
    </section>
  );
}
