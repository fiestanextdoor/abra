'use client';

import { motion } from 'framer-motion';

type HeroProps = {
  introComplete: boolean;
};

export function Hero({ introComplete }: HeroProps) {
  return (
    <section className="hero" aria-label="welkom bij abra entertainment">
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 28 }}
        animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* SVG logo for crisp rendering at any size */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-ae-blauw.svg"
          alt="Abra Entertainment"
          className="hero-main-logo"
        />

        <p className="hero-tagline">Running for success</p>

        <a href="#artists" className="hero-cta">
          bekijk artiesten
        </a>
      </motion.div>

      <div className="hero-scroll-hint" aria-hidden="true">
        <span className="hero-scroll-line" />
        scroll to discover
      </div>
    </section>
  );
}
