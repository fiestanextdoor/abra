import Link from 'next/link';

const NAV_LINKS = [
  { href: '/over', label: 'over' },
  { href: '/artiesten', label: 'artiesten' },
  { href: '/join', label: 'join' },
  { href: '/#contact', label: 'contact' },
];

export function Header() {
  return (
    <header className="site-header">
      <Link href="/" aria-label="abra entertainment home">
        {/* Cream logo on light-blue header */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/Logo AE creme png '26.png"
          alt="Abra Entertainment"
          className="header-logo-img"
        />
      </Link>

      <nav className="header-nav" aria-label="hoofdnavigatie">
        {NAV_LINKS.map((item) => (
          <Link key={item.href} href={item.href} className="header-nav-link">
            {item.label}
          </Link>
        ))}
      </nav>

      <button className="header-nav-mobile-toggle" aria-label="menu openen">
        menu
      </button>
    </header>
  );
}
