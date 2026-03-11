import { Header } from '@/components/Header';
import { JoinLabel } from '@/components/JoinLabel';

export default function JoinPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero" aria-label="Stuur je demo naar Abra Entertainment">
          <div className="page-hero-inner">
            <p className="page-hero-kicker">Join</p>
            <h1 className="page-hero-title">Stuur je demo</h1>
            <p className="page-hero-subtitle">
              Klaar om je muziek te delen? Stuur een korte introductie, een paar links en vertel waarom
              je bij Abra past.
            </p>
          </div>
        </section>
        <section className="page-section" aria-label="Wat we graag ontvangen">
          <div className="page-section-inner">
            <h2 className="page-section-heading">Wat we graag zien in je bericht</h2>
            <ul className="page-list">
              <li>Je artiestennaam en waar je vandaan komt</li>
              <li>Links naar 2–3 tracks (Spotify, SoundCloud of YouTube)</li>
              <li>Een korte beschrijving van je sound en inspiratie</li>
              <li>Wat je zoekt in een label of samenwerking</li>
            </ul>
          </div>
        </section>
        <JoinLabel />
      </main>
    </>
  );
}

