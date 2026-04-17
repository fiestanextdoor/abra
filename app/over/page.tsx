import { Header } from '@/components/Header';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function OverPage() {
  return (
    <>
      <Header />
      <main className="over-page">

        {/* ── Hero split ── */}
        <section className="over-hero">
          <div className="over-hero-left">
            <h1 className="over-title">over abra</h1>
            <p className="over-body">
              we zijn een collectief gedreven door de ongetemde energie van
              de underground. bij abra entertainment draait alles om de
              intentie achter de frequentie. we cureren geluid dat niet alleen
              gehoord wordt, maar ook gevoeld, tactiele texturen en rauwe
              esthetiek vormen onze kern.
            </p>
            <p className="over-tagline">
              altijd in beweging. gedreven door passie. running for success.
              zonder de ziel te verliezen.
            </p>
          </div>
          <div className="over-hero-right" aria-hidden="true">
            <div className="over-vinyl">
              <div className="over-vinyl-inner" />
              <div className="over-vinyl-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo-ae-wit.svg" alt="" className="over-vinyl-logo" />
              </div>
            </div>
          </div>
        </section>

        {/* ── Values grid ── */}
        <section className="over-grid" aria-label="onze waarden">

          <div className="over-tile over-tile--cream">
            <span className="over-tile-label">01 / visie</span>
            <p className="over-tile-text">underground<br />sound</p>
          </div>

          <div className="over-tile over-tile--dark">
            <span className="over-tile-label">02 / ethos</span>
            <p className="over-tile-text">
              de archivering van<br />een nieuw tijdperk<br />in muziek.
            </p>
            <div className="over-tile-circle" aria-hidden="true" />
          </div>

          <div className="over-tile over-tile--blue">
            <span className="over-tile-label">03 / tactiliteit</span>
            <p className="over-tile-text">
              wij geloven in de tastbaarheid van geluid,<br />
              van vinyl tot digitale beleving.
            </p>
          </div>

          <div className="over-tile over-tile--white">
            <span className="over-tile-label">04 / focus</span>
            <p className="over-tile-text">running for<br />success.</p>
          </div>

        </section>

        <Contact introComplete={true} />
      </main>
      <Footer />
    </>
  );
}
