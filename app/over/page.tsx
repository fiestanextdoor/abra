import { Header } from '@/components/Header';
import { LabelServices } from '@/components/LabelServices';
import { Footer } from '@/components/Footer';

export default function OverPage() {
  return (
    <>
      <Header />
      <main className="subpage">
        <section className="subpage-hero" aria-label="over abra entertainment">
          <div className="subpage-inner">
            <h1 className="subpage-title">over</h1>
            <p className="subpage-copy">
              abra entertainment bouwt artiesten op met een eigen verhaal. klein team, snelle lijnen en
              focus op identiteit.
            </p>
          </div>
        </section>
        <section className="subpage-text">
          <div className="subpage-inner">
            <p>
              We begeleiden release-strategie, creatieve richting en distributie. We houden het persoonlijk
              en helder, zodat elke track voelt als een bewuste stap.
            </p>
          </div>
        </section>
        <LabelServices />
      </main>
      <Footer />
    </>
  );
}

