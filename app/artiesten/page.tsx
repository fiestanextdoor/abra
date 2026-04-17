import { Header } from '@/components/Header';
import { ArtistRoster } from '@/components/ArtistRoster';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { getArtists } from '@/lib/spotify';

export const dynamic = 'force-dynamic';

export default async function ArtiestenPage() {
  const artists = await getArtists();

  return (
    <>
      <Header />
      <main>
        <ArtistRoster artists={artists} />
        <Contact introComplete={true} />
      </main>
      <Footer />
    </>
  );
}
