'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.3 }
      );
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.6 }
      );
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.9 }
      );
      if (shapesRef.current) {
        const shapes = shapesRef.current.querySelectorAll('.shape');
        gsap.fromTo(
          shapes,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 0.4,
            duration: 1.2,
            stagger: 0.15,
            ease: 'back.out(1.2)',
            delay: 0.2,
          }
        );
        // Subtiele zweefanimatie (CodePen-style)
        shapes.forEach((shape, i) => {
          gsap.to(shape, {
            y: i % 2 === 0 ? -15 : 12,
            duration: 3 + i * 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 1.5 + i * 0.2,
          });
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="hero"
      aria-label="Welkom bij Abra Entertainment"
    >
      <div ref={shapesRef} className="hero-shapes" aria-hidden="true">
        <div className="shape shape-1" />
        <div className="shape shape-2" />
        <div className="shape shape-3" />
        <div className="shape shape-4" />
        <div className="shape shape-5" />
      </div>
      <div className="hero-content">
        <h1 ref={titleRef} className="hero-title">
          Abra Entertainment
        </h1>
        <p ref={subtitleRef} className="hero-subtitle">
          Een modern muzieklabel waar sound en stijl samenkomen. Ontdek onze
          artiesten en de wereld achter de muziek.
        </p>
        <a
          ref={ctaRef}
          href="#artists"
          className="hero-cta"
        >
          Ontdek onze artiesten
        </a>
      </div>
    </section>
  );
}
