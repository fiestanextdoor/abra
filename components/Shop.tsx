export function Shop() {
  return (
    <section id="shop" className="shop" aria-label="abra shop">
      <div className="shop-block">
        {/* watermark logo — decorative */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/Huisstijl Abra Entertainment.png"
          alt=""
          aria-hidden="true"
          className="shop-watermark"
        />

        <div className="shop-content">
          <span className="shop-label">limited edition objects</span>
          <h2 className="shop-heading">abra shop</h2>
          <a href="#" className="shop-cta">shop nu</a>
        </div>
      </div>
    </section>
  );
}
