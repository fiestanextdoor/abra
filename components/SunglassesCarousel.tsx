'use client';

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
  {
    id: 1,
    title: 'Abra x Zonnebril',
    subtitle: 'Limited edition',
    color: 'var(--pastel-lavender)',
  },
  {
    id: 2,
    title: 'Stijl & Sound',
    subtitle: 'Officieel merchandise',
    color: 'var(--pastel-peach)',
  },
  {
    id: 3,
    title: 'Wees gezien',
    subtitle: 'Bestel nu',
    color: 'var(--pastel-sky)',
  },
];

export function SunglassesCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!trackRef.current) return;
    // Track is 300% breed, elke slide 33.333% → verplaats met 33.333% per slide
    const offsetPercent = activeIndex * (100 / 3);
    gsap.to(trackRef.current, {
      x: `-${offsetPercent}%`,
      duration: 0.6,
      ease: 'power2.inOut',
    });
  }, [activeIndex]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;
      gsap.fromTo(
        sectionRef.current.querySelector('.carousel-heading'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="zonnebril"
      className="carousel-section section-lavender"
      aria-label="Abra zonnebril"
    >
      <h2 className="carousel-heading">Abra Zonnebril</h2>
      <p className="carousel-subheading">
        Officieel merchandise — stijl die bij je past
      </p>
      <div className="carousel-wrapper">
        <button
          type="button"
          className="carousel-btn carousel-btn--prev"
          aria-label="Vorige slide"
          onClick={() => setActiveIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length)}
        >
          ‹
        </button>
        <button
          type="button"
          className="carousel-btn carousel-btn--next"
          aria-label="Volgende slide"
          onClick={() => setActiveIndex((i) => (i + 1) % SLIDES.length)}
        >
          ›
        </button>
        <div className="carousel-track" ref={trackRef}>
          {SLIDES.map((slide, i) => (
            <div
              key={slide.id}
              className="carousel-slide"
              style={{ background: slide.color }}
              data-active={i === activeIndex}
            >
              <div className="carousel-slide-content">
                <span className="carousel-slide-subtitle">{slide.subtitle}</span>
                <h3 className="carousel-slide-title">{slide.title}</h3>
                <a
                  href="mailto:toonvandersluis@gmail.com?subject=Zonnebril bestellen"
                  className="carousel-cta"
                >
                  Bestel nu
                </a>
              </div>
              <div className="carousel-slide-visual" aria-hidden="true">
                <div className="sunglasses-icon" />
              </div>
            </div>
          ))}
        </div>
        <div className="carousel-dots" role="tablist" aria-label="Slide navigatie">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Slide ${i + 1}`}
              className={`carousel-dot ${i === activeIndex ? 'carousel-dot--active' : ''}`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
