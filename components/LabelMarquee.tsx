'use client';

import { motion } from 'framer-motion';

const ITEMS = [
  'Spotify',
  'Apple Music',
  'YouTube',
  'Artiesten eerst',
  'Transparante afspraken',
  'Focus op plezier',
];

export function LabelMarquee() {
  return (
    <section className="label-marquee" aria-label="Waar Abra Entertainment voor staat">
      <div className="label-marquee-inner">
        <motion.div
          className="label-marquee-track"
          aria-hidden="true"
        >
          {[...ITEMS, ...ITEMS].map((item, index) => (
            <span key={`${item}-${index}`} className="label-marquee-pill">
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

