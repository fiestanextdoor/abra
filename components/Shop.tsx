export function Shop() {
  return (
    <section id="shop" className="shop" aria-label="abra wear">
      <div className="shop-block">
        {/* decorative watermark */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/Huisstijl Abra Entertainment.png"
          alt=""
          aria-hidden="true"
          className="shop-watermark"
        />

        <div className="shop-content">
          <span className="shop-label">limited edition objects</span>
          <h2 className="shop-heading">abra wear</h2>
          <a href="#" className="shop-cta">shop nu</a>
        </div>
      </div>
    </section>
  );
}
