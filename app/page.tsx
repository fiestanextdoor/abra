import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Artists } from '@/components/Artists';
import { ToniReleasesCarousel } from '@/components/ToniReleasesCarousel';
import { SunglassesCarousel } from '@/components/SunglassesCarousel';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Artists />
      <ToniReleasesCarousel />
      <SunglassesCarousel />
      <Contact />
      <Footer />
    </main>
  );
}
