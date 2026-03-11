import { Header } from '@/components/Header';
import { LabelStats } from '@/components/LabelStats';
import { LabelServices } from '@/components/LabelServices';
import { JoinLabel } from '@/components/JoinLabel';

export default function OverPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero" aria-label="Over Abra Entertainment">
        <div className="page-hero-inner">
          <p className="page-hero-kicker">Over het label</p>
          <h1 className="page-hero-title">Abra Entertainment in het kort</h1>
          <p className="page-hero-subtitle">
            Een compact muzieklabel rond TØNI, AREnD en RENSPLOP, met een focus op plezier, eigenheid
            en slimme releases.
          </p>
        </div>
      </section>
        <LabelStats />
        <LabelServices />
        <section className="page-section" aria-label="Onze filosofie">
          <div className="page-section-inner">
            <h2 className="page-section-heading">Filosofie</h2>
            <p className="page-section-text">
              Abra gelooft dat muziek maken leuk moet blijven. We combineren structuur (planning,
              distributie, visuals) met ruimte voor experiment. Geen groot corporate verhaal, maar een
              kleine crew die elkaar scherp houdt.
            </p>
          </div>
        </section>
        <JoinLabel />
      </main>
    </>
  );
}

