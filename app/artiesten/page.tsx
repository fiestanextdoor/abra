import { Header } from '@/components/Header';
import { Artists } from '@/components/Artists';
import { getArtists } from '@/lib/spotify';

export default async function ArtiestenPage() {
  const artists = await getArtists();

  return (
    <>
      <Header />
      <main>
        <section className="page-hero" aria-label="Artiesten bij Abra Entertainment">
          <div className="page-hero-inner">
            <p className="page-hero-kicker">Roster</p>
            <h1 className="page-hero-title">Onze artiesten</h1>
            <p className="page-hero-subtitle">
              Een compacte selectie artiesten die passen bij de Abra-sound en elkaar versterken.
            </p>
          </div>
        </section>
        <Artists initialArtists={artists} />
      </main>
    </>
  );
}

