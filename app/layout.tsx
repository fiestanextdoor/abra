import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Abra Entertainment | Modern Muzieklabel',
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
      <body>{children}</body>
    </html>
  );
}
