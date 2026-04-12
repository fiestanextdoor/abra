import type { Metadata } from 'next';
import './globals.css';
import { SmoothScroll } from '@/components/SmoothScroll';
import { CustomCursor } from '@/components/CustomCursor';
import { BackgroundNoise } from '@/components/BackgroundNoise';

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
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
