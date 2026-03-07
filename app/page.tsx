import { Hero } from '@/components/Hero';
import { Artists } from '@/components/Artists';
import { SunglassesCarousel } from '@/components/SunglassesCarousel';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <Artists />
      <SunglassesCarousel />
      <Contact />
      <Footer />
    </main>
  );
}
