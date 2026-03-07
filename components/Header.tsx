'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { href: '#artists', label: 'Artiesten' },
  { href: '#zonnebril', label: 'Zonnebril' },
  { href: '#contact', label: 'Contact' },
];

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const header = headerRef.current;
    const pill = pillRef.current;
    if (!header) return;

    const ctx = gsap.context(() => {
      // Start breed: pill begint vrij breed
      const startWidth = typeof window !== 'undefined'
        ? Math.min(window.innerWidth * 0.94, 1400)
        : 1200;
      const endWidth = typeof window !== 'undefined'
        ? Math.min(900, window.innerWidth - 32)
        : 900;
      gsap.set(pill, { maxWidth: startWidth });

      // Bij scroll: animatie van breed naar smalle pill
      gsap.to(pill, {
        maxWidth: endWidth,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: document.body,
          start: 0,
          end: 200,
          scrub: 1,
        },
      });

      // Entree: logo en nav komen zacht binnen
      gsap.fromTo(
        [logoRef.current, navRef.current],
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.2, stagger: 0.1, ease: 'power3.out' }
      );

      // Scroll progress voor state
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          const progress = self.progress;
          setScrolled(progress > 0.15);
          if (logoRef.current) {
            gsap.set(logoRef.current, {
              opacity: progress > 0.12 ? 1 : 0.92,
            });
          }
        },
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    const links = navRef.current.querySelectorAll('a');
    links.forEach((link) => {
      link.addEventListener('mouseenter', () => {
        gsap.to(link, { y: -2, duration: 0.2, ease: 'power2.out' });
      });
      link.addEventListener('mouseleave', () => {
        gsap.to(link, { y: 0, duration: 0.2 });
      });
    });
  }, []);

  return (
    <header ref={headerRef} className="site-header" data-scrolled={scrolled}>
      <div ref={pillRef} className="header-pill glass-container glass-container--rounded">
        <div className="glass-filter" aria-hidden="true" />
        <div className="glass-overlay" aria-hidden="true" />
        <div className="glass-specular" aria-hidden="true" />
        <div className="glass-content header-inner">
          <Link
            ref={logoRef}
            href="#"
            className="header-logo"
            aria-label="Abra Entertainment - naar boven"
          >
            <img
              src="/abra-logo.png"
              alt="Abra Entertainment"
              className="header-logo-img"
              width={160}
              height={52}
            />
          </Link>
          <nav ref={navRef} className="header-nav" aria-label="Hoofdnavigatie">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="header-nav-link"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
