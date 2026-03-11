import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { LabelStats } from '@/components/LabelStats';
import { LabelServices } from '@/components/LabelServices';
import { Artists } from '@/components/Artists';
import { JoinLabel } from '@/components/JoinLabel';
import { ToniReleasesCarousel } from '@/components/ToniReleasesCarousel';
import { SunglassesCard } from '@/components/SunglassesCard';
import { Contact } from '@/components/Contact';
import { LabelMarquee } from '@/components/LabelMarquee';
import { Footer } from '@/components/Footer';
import { getArtists } from '@/lib/spotify';

export default async function Home() {
  const artists = await getArtists();
  return (
    <main>
      <Header />
      <Hero />
      <LabelStats />
      <LabelServices />
      <Artists initialArtists={artists} />
      <JoinLabel />
      <ToniReleasesCarousel />
      <SunglassesCard />
      <Contact />
      <LabelMarquee />
      <Footer />
    </main>
  );
}
