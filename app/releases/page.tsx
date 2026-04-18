import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Contact } from '@/components/Contact';
import { getFeaturedAlbum } from '@/lib/spotify';
import type { FeaturedAlbum } from '@/lib/spotify';

export const dynamic = 'force-dynamic';

type SingleRelease = {
  name: string;
  image: string;
  url: string;
  release_date: string;
  artists: string[];
};

async function getSingles(): Promise<SingleRelease[]> {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
    const res = await fetch(`${base}/api/toni-releases`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

const ASPECT_RATIOS = ['1/1', '4/5', '5/4', '1/1', '4/5', '1/1', '5/4', '4/5'];

function SpotifyIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="featured-play-icon">
      <path d="M8 5v14l11-7z"/>
    </svg>
  );
}

function FeaturedAlbumSection({ album }: { album: FeaturedAlbum }) {
  const year = album.release_date?.split('-')[0] ?? '';
  const artist = album.artists.join(', ') || 'tøni';

  return (
    <section className="releases-featured" aria-label="uitgelichte release">
      <div className="releases-featured-inner">
        <div className="releases-featured-cover-wrap">
          {album.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={album.image} alt={album.name} className="releases-featured-cover" />
          ) : (
            <div className="releases-featured-cover releases-featured-cover--fallback" />
          )}
        </div>
        <div className="releases-featured-info">
          <span className="releases-featured-label">featured release</span>
          <h1 className="releases-featured-title">{album.name}</h1>
          <p className="releases-featured-artist">by {artist}{year ? ` · ${year}` : ''}</p>
          {album.tracks.length > 0 && (
            <ol className="releases-featured-tracklist">
              {album.tracks.map((track) => (
                <li key={track.number} className="releases-featured-track">
                  <span className="track-number">{String(track.number).padStart(2, '0')}</span>
                  <span className="track-name">{track.name}</span>
                  <span className="track-duration">{track.duration}</span>
                </li>
              ))}
            </ol>
          )}
          <a href={album.url} target="_blank" rel="noopener noreferrer" className="releases-featured-btn">
            <SpotifyIcon />
            play on spotify
          </a>
        </div>
      </div>
    </section>
  );
}

function FeaturedSingleSection({ release }: { release: SingleRelease }) {
  const year = release.release_date?.split('-')[0] ?? '';
  const artist = release.artists?.join(', ') || 'tøni';

  return (
    <section className="releases-featured" aria-label="uitgelichte release">
      <div className="releases-featured-inner">
        <div className="releases-featured-cover-wrap">
          {release.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={release.image} alt={release.name} className="releases-featured-cover" />
          ) : (
            <div className="releases-featured-cover releases-featured-cover--fallback" />
          )}
        </div>
        <div className="releases-featured-info">
          <span className="releases-featured-label">latest single</span>
          <h1 className="releases-featured-title">{release.name}</h1>
          <p className="releases-featured-artist">by {artist}{year ? ` · ${year}` : ''}</p>
          <a href={release.url} target="_blank" rel="noopener noreferrer" className="releases-featured-btn">
            <SpotifyIcon />
            play on spotify
          </a>
        </div>
      </div>
    </section>
  );
}

function ArchiveCard({ release, index }: { release: SingleRelease; index: number }) {
  const year = release.release_date?.split('-')[0] ?? '';
  const artist = release.artists?.join(', ') || 'tøni';
  const ratio = ASPECT_RATIOS[index % ASPECT_RATIOS.length];

  return (
    <a href={release.url} target="_blank" rel="noopener noreferrer" className="archive-card">
      <div className="archive-card-cover-wrap" style={{ aspectRatio: ratio }}>
        {release.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={release.image} alt={release.name} className="archive-card-cover" />
        ) : (
          <div className="archive-card-cover archive-card-cover--fallback" />
        )}
      </div>
      <div className="archive-card-meta">
        <span className="archive-card-title">{release.name}</span>
        <span className="archive-card-sub">{artist}{year ? ` · ${year}` : ''}</span>
      </div>
    </a>
  );
}

export default async function ReleasesPage() {
  const [album, singles] = await Promise.all([
    getFeaturedAlbum(),
    getSingles(),
  ]);

  const hasFeaturedAlbum = album !== null;
  const archiveSingles = hasFeaturedAlbum ? singles : singles.slice(1);
  const featuredSingle = !hasFeaturedAlbum && singles.length > 0 ? singles[0] : null;

  return (
    <>
      <Header />
      <main>
        {hasFeaturedAlbum && <FeaturedAlbumSection album={album!} />}
        {!hasFeaturedAlbum && featuredSingle && <FeaturedSingleSection release={featuredSingle} />}

        {archiveSingles.length > 0 && (
          <section className="releases-archive" aria-label="singles archief">
            <div className="releases-archive-inner">
              <h2 className="releases-archive-heading">the archive</h2>
              <div className="releases-archive-grid">
                {archiveSingles.map((release, i) => (
                  <ArchiveCard
                    key={`${release.name}-${release.release_date}`}
                    release={release}
                    index={i}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        <Contact introComplete={true} />
      </main>
      <Footer />
    </>
  );
}
