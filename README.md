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
- **TØNI-releases carousel** — Animerende carousel met de laatste 5 releases van TØNI (via Spotify API). Staat tussen Artisten en Zonnebril; bij nieuwe releases van TØNI verschijnen die automatisch (na verversen of na cache-verloop).
- **Zonnebril-carousel** — Promotie van Abra-zonnebril met CTA “Bestel nu” (mailto).
- **Contact** — Contact opnemen via toonvandersluis@gmail.com.
- **Footer** — Merknaam en copyright.

## Artistenfoto’s

De artiestenblokken gebruiken nu een gradient met de eerste letter. Om echte foto’s te gebruiken:

1. Plaats afbeeldingen in `public/artists/` (bijv. `toni.jpg`, `arend.jpg`, `rensplop.jpg`).
2. Pas in `components/Artists.tsx` de artiestenarray aan: voeg weer een `image`-veld toe en render een `<img>` of `next/image` in plaats van alleen de gradient met initiaal.

## TØNI-releases carousel (Spotify API)

De carousel haalt de laatste 5 releases van TØNI op via de Spotify Web API. Zodra TØNI iets nieuws uitbrengt, komt dat automatisch in de carousel (response wordt 1 uur gecached).

**Setup:**

1. Maak een app aan in het [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).
2. Kopieer `.env.example` naar `.env.local` en vul in:
   - `SPOTIFY_CLIENT_ID` — Client ID van je Spotify-app
   - `SPOTIFY_CLIENT_SECRET` — Client Secret van je Spotify-app
3. Op Vercel: voeg dezelfde variabelen toe onder Project → Settings → Environment Variables.

Zonder deze variabelen toont de carousel een vaste fallback-lijst (Verliefd, Koud, BLOEDHEET, enz.).

## Technieken

- **Next.js 14** (App Router)
- **GSAP** (ScrollTrigger) voor scroll- en entree-animaties
- **Pastel huisstijl** (mint, lavender, peach, sky, sage, blush)
- **Fonts**: Outfit (body), Syne (headings)
