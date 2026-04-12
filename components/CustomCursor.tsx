'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useSpring(x, { stiffness: 700, damping: 35, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 700, damping: 35, mass: 0.2 });
  const ringX = useSpring(x, { stiffness: 250, damping: 26, mass: 0.8 });
  const ringY = useSpring(y, { stiffness: 250, damping: 26, mass: 0.8 });
  const scale = useSpring(1, { stiffness: 420, damping: 22 });

  useEffect(() => {
    const move = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    const over = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('a, button')) {
        scale.set(1.9);
      } else {
        scale.set(1);
      }
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, [scale, x, y]);

  return (
    <>
      <motion.div
        className="cursor-ring"
        style={{ x: ringX, y: ringY, scale, translateX: '-50%', translateY: '-50%' }}
        aria-hidden="true"
      />
      <motion.div
        className="cursor-dot"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        aria-hidden="true"
      />
    </>
  );
}
