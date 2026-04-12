'use client';

import { motion } from 'framer-motion';

type HeroProps = {
  introComplete: boolean;
};

export function Hero({ introComplete }: HeroProps) {
  return (
    <section className="hero" aria-label="welkom bij abra entertainment">
      <div className="hero-bg-texture" aria-hidden="true" />

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 32 }}
        animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/Logo AE wit png '26.png.png"
          alt=""
          aria-hidden="true"
          className="hero-logo-img"
        />

        <h1 className="hero-wordmark">
          abra entertainment
        </h1>

        <p className="hero-tagline">
          curating the underground sound through intentional aesthetics and tactile soundscapes.
        </p>

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
