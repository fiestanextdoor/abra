'use client';

import { useEffect, useState } from 'react';

type TopTrack = {
  id: string;
  name: string;
  duration: string;
  url: string;
  albumImage: string;
  albumName: string;
  artistName: string;
};

type ArtistTopTracks = {
  artistId: string;
  artistName: string;
  tracks: TopTrack[];
};

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="top-track-play-icon">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function ArtistBlock({ group }: { group: ArtistTopTracks }) {
  if (!group.tracks.length) return null;
  return (
    <div className="top-tracks-artist-block">
      <h3 className="top-tracks-artist-name">{group.artistName || group.artistId}</h3>
      <ul className="top-tracks-list">
        {group.tracks.map((track, i) => (
          <li key={track.id}>
            <a
              href={track.url}
              target="_blank"
              rel="noopener noreferrer"
              className="top-track-row"
            >
              <span className="top-track-index">{String(i + 1).padStart(2, '0')}</span>
              {track.albumImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={track.albumImage} alt={track.albumName} className="top-track-thumb" />
              )}
              <span className="top-track-name">{track.name}</span>
              <span className="top-track-duration">{track.duration}</span>
              <PlayIcon />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

type Props = { introComplete: boolean };

export function TopTracks({ introComplete }: Props) {
  const [data, setData] = useState<ArtistTopTracks[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/top-tracks')
      .then((r) => r.json())
      .then((d) => setData(Array.isArray(d) ? d : []))
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section
      className="top-tracks"
      aria-labelledby="top-tracks-heading"
      style={{
        opacity: introComplete ? 1 : 0,
        transform: introComplete ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      <div className="top-tracks-inner">
        <div className="top-tracks-header">
          <span className="section-label">most played</span>
          <h2 id="top-tracks-heading" className="top-tracks-heading">top tracks</h2>
        </div>

        {loading ? (
          <p className="releases-loading">laden...</p>
        ) : (
          <div className="top-tracks-grid">
            {data.filter((g) => g.tracks.length > 0).map((group) => (
              <ArtistBlock key={group.artistId} group={group} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
