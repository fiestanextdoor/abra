'use client';

import { ReactNode, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  href: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
};

export function MagneticButton({
  children,
  className,
  href,
  target,
  rel,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 280, damping: 20, mass: 0.5 });

  const onMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    const distance = Math.hypot(dx, dy);

    if (distance < 80) {
      x.set(dx * 0.3);
      y.set(dy * 0.3);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={onMouseMove}
      onMouseLeave={reset}
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 280, damping: 18 }}
    >
      {children}
    </motion.a>
  );
}
