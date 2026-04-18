'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export function PageTransition() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState<'in' | 'out'>('in');
  const isFirst = useRef(true);

  // Listen for TransitionLink signaling that a nav is about to happen
  useEffect(() => {
    const onStart = () => {
      setPhase('in');
      setShow(true);
    };
    window.addEventListener('page-transition-start', onStart);
    return () => window.removeEventListener('page-transition-start', onStart);
  }, []);

  // When the new page actually renders, start the exit animation
  useEffect(() => {
    if (isFirst.current) { isFirst.current = false; return; }
    setPhase('out');
  }, [pathname]);

  if (!show) return null;

  return (
    <motion.div
      className="page-transition"
      aria-hidden="true"
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      animate={{ clipPath: phase === 'out' ? 'inset(0% 0% 100% 0%)' : 'inset(0% 0% 0% 0%)' }}
      transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (phase === 'in') {
          // Screen is fully covered — tell TransitionLink to navigate now
          window.dispatchEvent(new CustomEvent('page-transition-ready'));
        } else {
          setShow(false);
        }
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo-ae-creme.svg" alt="" className="page-transition-logo" />
    </motion.div>
  );
}
