'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

type Props = {
  children: React.ReactNode;
};

export function SmoothScrollProvider({ children }: Props) {
  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      // Hoger lerp = sneller reageren, minder "traag" gevoel
      lerp: 0.22,
      wheelMultiplier: 0.9,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

