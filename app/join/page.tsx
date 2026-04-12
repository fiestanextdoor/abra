import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MagneticButton } from '@/components/MagneticButton';

export default function JoinPage() {
  return (
    <>
      <Header />
      <main className="subpage">
        <section className="subpage-hero" aria-label="stuur je demo naar abra entertainment">
          <div className="subpage-inner">
            <h1 className="subpage-title">join</h1>
            <p className="subpage-copy">
              klaar om je muziek te delen? stuur een korte introductie en links naar je tracks.
            </p>
          </div>
        </section>
        <section className="subpage-text" aria-label="wat we graag ontvangen">
          <div className="subpage-inner">
            <h2 className="subpage-subtitle">wat we graag zien</h2>
            <ul className="subpage-list">
              <li>Je artiestennaam en waar je vandaan komt</li>
              <li>Links naar 2–3 tracks (Spotify, SoundCloud of YouTube)</li>
              <li>Een korte beschrijving van je sound en inspiratie</li>
              <li>Wat je zoekt in een label of samenwerking</li>
            </ul>
            <MagneticButton
              href="mailto:toonvandersluis@gmail.com?subject=demo%20insturen"
              className="join-cta"
              ariaLabel="stuur je demo via e-mail"
            >
              stuur je demo
            </MagneticButton>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

