import type { Metadata } from 'next';
import './globals.css';
import { SmoothScroll } from '@/components/SmoothScroll';
import { BackgroundNoise } from '@/components/BackgroundNoise';
import { PageTransition } from '@/components/PageTransition';

export const metadata: Metadata = {
  title: 'Abra Entertainment | Muzieklabel',
  description:
    'Abra Entertainment — een fris muzieklabel met artiesten als TØNI, AREnD en RENSPLOP. Ontdek onze sound.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body>
        <SmoothScroll>
          <BackgroundNoise />
          <PageTransition />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
