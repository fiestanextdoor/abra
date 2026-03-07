export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-brand">Abra Entertainment</p>
        <p className="footer-copy">
          © {new Date().getFullYear()} Abra Entertainment. Alle rechten voorbehouden.
        </p>
      </div>
    </footer>
  );
}
