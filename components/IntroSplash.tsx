'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

type IntroSplashProps = {
  onComplete: () => void;
};

const SESSION_KEY = 'ae-intro-shown';

export function IntroSplash({ onComplete }: IntroSplashProps) {
  // Start altijd met null — server en client zijn identiek, geen hydration mismatch.
  // Na mount beslissen we pas of het intro getoond wordt.
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState<'show' | 'reveal'>('show');
  const [logoVisible, setLogoVisible] = useState(false);
  const splashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Al eerder getoond? Direct doorgaan zonder enige render.
    if (sessionStorage.getItem(SESSION_KEY)) {
      onComplete();
      return;
    }

    // Eerste bezoek: intro tonen.
    setShow(true);
    document.body.style.overflow = 'hidden';

    const logoInTimer = window.setTimeout(() => setLogoVisible(true), 600);
    const revealTimer = window.setTimeout(() => setPhase('reveal'), 2000);

    return () => {
      window.clearTimeout(logoInTimer);
      window.clearTimeout(revealTimer);
      document.body.style.overflow = '';
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!show) return null;

  return (
    <motion.div
      ref={splashRef}
      className="intro-splash"
      aria-hidden="true"
      style={{ pointerEvents: phase === 'reveal' ? 'none' : 'auto', willChange: 'clip-path' }}
      animate={{
        clipPath: phase === 'reveal' ? 'inset(0% 0% 100% 0%)' : 'inset(0% 0% 0% 0%)',
      }}
      transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (phase === 'reveal') {
          if (splashRef.current) splashRef.current.style.display = 'none';
          sessionStorage.setItem(SESSION_KEY, '1');
          document.body.style.overflow = '';
          setShow(false);
          onComplete();
        }
      }}
    >
      <motion.img
        src="/logo-ae-wit.svg"
        alt="Abra Entertainment"
        className="intro-splash-logo"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: logoVisible ? 1 : 0, scale: logoVisible ? 1 : 0.7 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
    </motion.div>
  );
}
