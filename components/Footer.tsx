import { TransitionLink } from '@/components/TransitionLink';

const NAV_LINKS = [
  { href: '/artiesten', label: 'artiesten' },
  { href: '#releases', label: 'releases' },
  { href: '#shop', label: 'shop' },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main-row">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-ae-wit.svg"
          alt="Abra Entertainment"
          className="footer-logo-img"
        />

        <nav className="footer-nav" aria-label="Footer navigatie">
          {NAV_LINKS.map((item) => (
            <TransitionLink key={item.href} href={item.href} className="footer-nav-link">
              {item.label}
            </TransitionLink>
          ))}
        </nav>
      </div>

      <div className="footer-bottom">
        <span className="footer-copy">
          &copy; {new Date().getFullYear()} abra entertainment. alle rechten voorbehouden.
        </span>
        <div className="footer-legal-links">
          <a href="#" className="footer-legal-link">privacy</a>
          <a href="#" className="footer-legal-link">voorwaarden</a>
        </div>
      </div>
    </footer>
  );
}
