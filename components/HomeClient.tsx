'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Artists } from '@/components/Artists';
import { ToniReleasesCarousel } from '@/components/ToniReleasesCarousel';
import { Shop } from '@/components/Shop';
import { Footer } from '@/components/Footer';
import { IntroSplash } from '@/components/IntroSplash';

type ArtistFromApi = {
  id: string;
  name: string;
  image: string;
  spotifyUrl: string;
  genres?: string[];
};

type HomeClientProps = {
  artists: ArtistFromApi[];
};

export function HomeClient({ artists }: HomeClientProps) {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <main>
      <IntroSplash onComplete={() => setIntroComplete(true)} />
      <Header />
      <Hero introComplete={introComplete} />
      <Artists initialArtists={artists} introComplete={introComplete} />
      <ToniReleasesCarousel introComplete={introComplete} />
      <Shop />
      <Footer />
    </main>
  );
}
