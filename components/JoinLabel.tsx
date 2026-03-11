'use client';

import { motion } from 'framer-motion';

export function JoinLabel() {
  return (
    <section className="join-label" aria-label="Word artiest bij Abra Entertainment">
      <motion.div
        className="join-label-inner"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className="join-label-text">
          <h2 className="join-label-heading">Ook onderdeel worden van Abra?</h2>
          <p className="join-label-body">
            Werk je aan eigen muziek en herken je je in de vibe van TØNI en de rest van het roster?
            Stuur een korte introductie en een paar links naar je tracks.
          </p>
        </div>
        <motion.a
          href="mailto:toonvandersluis@gmail.com?subject=Demo%20insturen%20-%20Abra%20Entertainment"
          className="join-label-cta"
          whileHover={{ y: -3, scale: 1.02 }}
          whileTap={{ y: -1, scale: 0.99 }}
        >
          Stuur je demo →
        </motion.a>
      </motion.div>
    </section>
  );
}

