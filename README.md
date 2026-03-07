# Abra Entertainment

Moderne website voor muzieklabel **Abra Entertainment**, gebouwd met Next.js en geschikt voor hosting op Vercel.

## Ontwikkeling

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Deploy op Vercel

1. Push de code naar GitHub (of koppel een andere Git-provider).
2. Ga naar [vercel.com](https://vercel.com) en log in.
3. Klik op **Add New Project** en importeer deze repository.
4. Vercel herkent Next.js automatisch; klik op **Deploy**.

De site wordt gebouwd en live gezet. Bij elke push naar de main branch wordt automatisch opnieuw gedeployed.

## Structuur van de site

- **Hero** — Kennismaking met het label, met GSAP-animaties en pastel vormen.
- **Artisten** — TØNI, AREnD en RENSPLOP met afwisselende layout (foto/tekst om en om) en links naar Spotify.
- **Zonnebril-carousel** — Promotie van Abra-zonnebril met CTA “Bestel nu” (mailto).
- **Contact** — Contact opnemen via toonvandersluis@gmail.com.
- **Footer** — Merknaam en copyright.

## Artistenfoto’s

De artiestenblokken gebruiken nu een gradient met de eerste letter. Om echte foto’s te gebruiken:

1. Plaats afbeeldingen in `public/artists/` (bijv. `toni.jpg`, `arend.jpg`, `rensplop.jpg`).
2. Pas in `components/Artists.tsx` de artiestenarray aan: voeg weer een `image`-veld toe en render een `<img>` of `next/image` in plaats van alleen de gradient met initiaal.

## Technieken

- **Next.js 14** (App Router)
- **GSAP** (ScrollTrigger) voor scroll- en entree-animaties
- **Pastel huisstijl** (mint, lavender, peach, sky, sage, blush)
- **Fonts**: Outfit (body), Syne (headings)
