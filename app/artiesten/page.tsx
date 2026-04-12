import { Header } from '@/components/Header';
import { Artists } from '@/components/Artists';
import { Footer } from '@/components/Footer';
import { getArtists } from '@/lib/spotify';

export default async function ArtiestenPage() {
  const artists = await getArtists();

  return (
    <>
      <Header />
      <main className="subpage">
        <section className="subpage-hero" aria-label="artiesten bij abra entertainment">
          <div className="subpage-inner">
            <h1 className="subpage-title">artiesten</h1>
            <p className="subpage-copy">
              een compacte selectie artiesten die passen bij de abra sound en elkaar versterken.
            </p>
          </div>
        </section>
        <Artists initialArtists={artists} />
      </main>
      <Footer />
    </>
  );
}

