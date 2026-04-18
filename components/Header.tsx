'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { TransitionLink } from '@/components/TransitionLink';

const NAV_LINKS = [
  { href: '/over', label: 'over' },
  { href: '/artiesten', label: 'artiesten' },
  { href: '/releases', label: 'releases' },
  { href: '/#contact', label: 'contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [hiding, setHiding] = useState(false);
  const pastHeroRef = useRef(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (!isHome) {
      setPastHero(true);
      pastHeroRef.current = true;
      return;
    }
    const onScroll = () => {
      const hero = document.querySelector('.hero') as HTMLElement | null;
      if (!hero) return;
      const heroBottom = hero.getBoundingClientRect().bottom;
      const vh = window.innerHeight;
      if (heroBottom <= vh * 0.45 && !pastHeroRef.current) {
        if (hideTimerRef.current) { clearTimeout(hideTimerRef.current); hideTimerRef.current = null; }
        setHiding(false);
        setPastHero(true);
        pastHeroRef.current = true;
      } else if (heroBottom >= vh * 0.65 && pastHeroRef.current && !hideTimerRef.current) {
        setHiding(true);
        hideTimerRef.current = setTimeout(() => {
          setHiding(false);
          setPastHero(false);
          pastHeroRef.current = false;
          hideTimerRef.current = null;
        }, 340);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [isHome]);

  const headerClass = [
    'site-header',
    pastHero ? 'site-header--scrolled' : 'site-header--hero',
    hiding ? 'site-header--hiding' : '',
  ].filter(Boolean).join(' ');

  return (
    <>
      <header className={headerClass}>
        {pastHero && (
          <TransitionLink href="/" aria-label="abra entertainment home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-ae-creme.svg" alt="Abra Entertainment" className="header-logo-img" />
          </TransitionLink>
        )}

        <nav className="header-nav" aria-label="hoofdnavigatie">
          {NAV_LINKS.map((item) => (
            <TransitionLink key={item.href} href={item.href} className="header-nav-link">
              {item.label}
            </TransitionLink>
          ))}
        </nav>

        <button
          className="header-nav-mobile-toggle"
          aria-label={open ? 'menu sluiten' : 'menu openen'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'sluit' : 'menu'}
        </button>
      </header>

      {/* Offcanvas overlay */}
      <div
        className={`mobile-nav-overlay${open ? ' mobile-nav-overlay--open' : ''}`}
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      />

      {/* Offcanvas panel */}
      <nav
        className={`mobile-nav${open ? ' mobile-nav--open' : ''}`}
        aria-label="mobiele navigatie"
      >
        <div className="mobile-nav-inner">
          {NAV_LINKS.map((item) => (
            <TransitionLink
              key={item.href}
              href={item.href}
              className="mobile-nav-link"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </TransitionLink>
          ))}
        </div>
      </nav>
    </>
  );
}
