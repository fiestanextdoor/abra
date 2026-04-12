'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type ScrambleTextProps = {
  text: string;
  className?: string;
};

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function ScrambleText({ text, className }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLElement | null>(null);
  const chars = useMemo(() => CHARS.split(''), []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStarted(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    let frame = 0;
    const maxFrames = text.length + 16;
    const interval = window.setInterval(() => {
      frame += 1;
      const revealCount = Math.max(0, frame - 8);

      const next = text
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          if (i < revealCount) return text[i];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      setDisplayText(next);

      if (frame >= maxFrames) {
        window.clearInterval(interval);
        setDisplayText(text);
      }
    }, 36);

    return () => window.clearInterval(interval);
  }, [started, text, chars]);

  return (
    <span
      ref={(node) => {
        ref.current = node;
      }}
      className={className}
    >
      {displayText}
    </span>
  );
}
