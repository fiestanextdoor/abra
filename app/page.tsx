import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Artists } from '@/components/Artists';
import { ToniReleasesCarousel } from '@/components/ToniReleasesCarousel';
import { SunglassesCarousel } from '@/components/SunglassesCarousel';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { getArtists } from '@/lib/spotify';

export default async function Home() {
  const artists = await getArtists();
  return (
    <main>
      <Header />
      <Hero />
      <Artists initialArtists={artists} />
      <ToniReleasesCarousel />
      <SunglassesCarousel />
      <Contact />
      <Footer />
    </main>
  );
}
