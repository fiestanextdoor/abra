'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function SunglassesCard() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !cardRef.current) return;
      gsap.fromTo(
        sectionRef.current.querySelector('.bril-card-heading'),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
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
      className="bril-section section-lavender"
      aria-label="Abra Zonnebril"
    >
      <div className="bril-inner">
        <h2 className="bril-card-heading">Abra Zonnebril</h2>
        <p className="bril-card-subheading">Officieel merchandise — limited edition</p>
        <div ref={cardRef} className="bril-card">
          <div className="bril-card-content">
            <h3 className="bril-card-title">Abra x Zonnebril</h3>
            <p className="bril-card-price">€ 24,95</p>
            <p className="bril-card-description">
              Stijlvolle zonnebril met het Abra Entertainment-logo. Perfect voor op het podium of in het dagelijks leven. Officieel merchandise van het label.
            </p>
            <p className="bril-card-levertijd">
              <strong>Levertijd:</strong> 3–5 werkdagen (Nederland)
            </p>
            <a
              href="mailto:toonvandersluis@gmail.com?subject=Zonnebril bestellen"
              className="bril-card-cta"
            >
              Bestel nu
            </a>
          </div>
          <div className="bril-card-image-wrap">
            <img
              src="/zonnebril.png"
              alt="Abra Zonnebril"
              className="bril-card-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
