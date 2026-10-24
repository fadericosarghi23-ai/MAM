# Base architettura (clone di mamarchitetti.it)

Base riutilizzabile per **studi di architettura/interior**, ricostruita dall'aspetto di
`mamarchitetti.it` (minimalismo monocromo, Open Sans, slideshow, griglia di progetti).
Struttura, layout, design system e animazioni sono fedeli al sorgente; **tutti i contenuti del
cliente sono segnaposto** `[[DA COMPILARE]]`. La base è pensata per il **posizionamento SEO + locale (GEO)**:
il sorgente è bellissimo ma povero di testo e di dati struttura — qui il motore SEO/GEO è completo.

Astro 5, CSS senza framework, tutto guidato dai dati in `src/data/`. È **in italiano**.

> Il mirror statico 1:1 del sorgente (solo riferimento visivo, non pubblicabile) è in `../mam-source/`,
> servibile con `node ../mam-source/tools/serve.mjs` → http://localhost:4791

```bash
npm run dev            # http://localhost:4790
npm run build          # dist/ statico
npm run slots          # slot ancora aperti ([[DA COMPILARE]] e [[DA VALIDARE]])
npm run check-residui  # residui di clienti precedenti: deve dare 0
```

## Pagine (stessa struttura del sorgente)

| Rotta | Contenuto |
| --- | --- |
| `/` | slideshow a tutto schermo (5 slide), header trasparente, H1 nascosto per SEO |
| `/progetti/` | griglia 2 colonne di quadrati 1:1, titolo in hover (8 progetti d'esempio) |
| `/progetti/[slug]/` | apertura + titolo + luogo/anno + dati (cliente/destinazione/intervento/stato/team) + descrizione + galleria con lightbox |
| `/studio/` | apertura + presentazione + Fondatori / Collaboratori / Hanno collaborato |
| `/contatti/` | apertura + blocco NAP (indirizzo, email, telefono, indicazioni) con microdati |
| privacy, cookie, mappa del sito, 404 | pagine di servizio, guidate da `site.ts` |

## SEO / GEO — cosa è già pronto

- **Meta per pagina**: `<title>` e description (segnaposto) in ogni pagina; canonical, Open Graph, Twitter, robots.
- **Un H1 per pagina** (sulla home è nascosto visivamente per non alterare il look).
- **JSON-LD** in `Layout.astro`: `ProfessionalService`+`LocalBusiness` con indirizzo, **coordinate geo**,
  **aree servite**, **orari** (`openingHoursSpecification`), competenze, persone, catalogo servizi; `WebSite`, `WebPage`, `BreadcrumbList`.
- **Local SEO (GEO)**: NAP coerente (nome/indirizzo/telefono) in footer, contatti e schema; meta `geo.region/position`, `ICBM`; link Google Maps.
- `sitemap-index.xml`, `robots.txt`, `llms.txt`, `site.webmanifest` generati dai dati.

> Regola NAP: nome, indirizzo e telefono devono essere **identici** in `site.ts`, su Google Business Profile e sulle directory.

## Come si riempie (in ordine)

1. **`src/data/site.ts`** — identità + NAP + `geo` (lat/lng da Google Maps) + `geoRegion` + `areeServite` + `orari` + social. È il cuore SEO/GEO.
2. **`src/data/home.ts`** — title/description/H1 della home.
3. **`src/data/progetti.ts`** — progetti (titolo, luogo, anno, dati, descrizione) e relative immagini.
4. **`src/data/team.ts`** — presentazione studio, fondatori, collaboratori.
5. **`src/data/servizi.ts`** — ambiti/servizi (keyword per SEO e JSON-LD).
6. **Immagini**: ogni foto è un segnaposto `ph(id, w, h, …)` che genera un SVG grigio delle stesse
   misure (`/img/placeholder/<id>.svg`). Per la foto vera: metti il file in `public/img/...` e
   sostituisci la `ph(...)` con `{ src, width, height, alt }` (o `responsive: true` con le varianti).
   Misure: slide hero 1600×900, copertina progetti 1200×1200, apertura progetto 1600×900,
   galleria 1600×935 (orizzontale) e 900×1200 (verticale), studio/contatti 1600×900, OG 1200×630.
7. **Logo**: `public/img/logo/logo.svg` (scuro) e `logo-light.svg` (chiaro), 940×264.
8. **Favicon/icone**: `public/favicon.svg` segnaposto; generare `favicon.ico`/`apple-touch`/`icon-192/512` dal logo.
9. **Dominio**: su Netlify arriva da `URL`; in locale resta il segnaposto in `astro.config.mjs`.

Cerca sempre `[[DA COMPILARE]]` (o `npm run slots`) per trovare tutti gli slot.

## Animazioni

Tutte vanilla (niente GSAP/Lenis, come il sorgente): slideshow hero (dissolvenza + zoom automatici,
pallini), header trasparente→pieno, reveal in scroll (IntersectionObserver), hover della griglia
progetti (zoom + titolo), lightbox della galleria progetto. Il codice animazioni non va toccato al riempimento.
