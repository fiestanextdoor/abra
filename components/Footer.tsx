import Link from 'next/link';

const NAV_LEFT = [
  { href: '/artiesten', label: 'artiesten' },
  { href: '#releases', label: 'releases' },
  { href: '#shop', label: 'shop' },
];

const NAV_RIGHT = [
  { href: '/join', label: 'demo submission' },
  { href: '/#contact', label: 'contact' },
  { href: 'https://www.instagram.com/abraentertainment', label: 'instagram', external: true },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-nav-row">
        <div className="footer-nav-col">
          <span className="footer-nav-label">navigatie</span>
          {NAV_LEFT.map((item) => (
            <Link key={item.href} href={item.href} className="footer-nav-link">
              {item.label}
            </Link>
          ))}
        </div>

        <div className="footer-nav-col" style={{ alignItems: 'flex-end' }}>
          <span className="footer-nav-label">overig</span>
          {NAV_RIGHT.map((item) =>
            item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-nav-link"
                style={{ textAlign: 'right' }}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="footer-nav-link"
                style={{ textAlign: 'right' }}
              >
                {item.label}
              </Link>
            )
          )}
        </div>
      </div>

      {/* Logo image only — no text wordmark */}
      <div className="footer-logo-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-ae-blauw.svg"
          alt="Abra Entertainment"
          className="footer-logo-img"
        />
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
