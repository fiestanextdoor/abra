'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type IntroSplashProps = {
  onComplete: () => void;
};

export function IntroSplash({ onComplete }: IntroSplashProps) {
  const [phase, setPhase] = useState<'show' | 'reveal' | 'done'>('show');
  const [logoVisible, setLogoVisible] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const logoInTimer = window.setTimeout(() => setLogoVisible(true), 600);
    const revealTimer = window.setTimeout(() => setPhase('reveal'), 2000);
    const doneTimer = window.setTimeout(() => {
      setPhase('done');
      document.body.style.overflow = previousOverflow;
      onComplete();
    }, 2300);

    return () => {
      window.clearTimeout(logoInTimer);
      window.clearTimeout(revealTimer);
      window.clearTimeout(doneTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <motion.div
      className="intro-splash"
      aria-hidden="true"
      animate={{
        clipPath: phase === 'reveal' ? 'inset(0% 0% 100% 0%)' : 'inset(0% 0% 0% 0%)',
      }}
      transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div
        className="intro-splash-logo"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: logoVisible ? 1 : 0, scale: logoVisible ? 1 : 0.7 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        ae
      </motion.div>
    </motion.div>
  );
}
