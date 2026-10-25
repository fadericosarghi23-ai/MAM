# MAM Architetti — sito

Sito di **MAM Architetti**, studio di architettura a Vicenza (architettura, interni, allestimenti).
Astro 5, statico, CSS senza framework, in italiano. Design minimale monocromo (Open Sans, bianco/nero),
con slideshow in home, griglia progetti con lightbox, pagina studio con organigramma e contatti con form e mappa.

```bash
npm install
npm run dev      # http://localhost:4790
npm run build    # output statico in dist/
```

## Pagine

| Rotta | Contenuto |
| --- | --- |
| `/` | slideshow a tutto schermo + intro studio + griglia progetti (lightbox) |
| `/progetti/` | griglia dei progetti (immagini reali, lightbox) |
| `/studio/` | presentazione + organigramma: fondatori (con slot foto), collaboratori, hanno collaborato |
| `/contatti/` | indirizzo, telefono, email, **form** e **mappa** (monocroma) |
| privacy, cookie, mappa del sito, 404 | pagine di servizio |

## SEO / GEO

Tutto il motore è centralizzato in `src/data/site.ts` (NAP, coordinate, aree servite, orari).
In ogni pagina: `<title>`/description, un H1, JSON-LD `ProfessionalService`+`LocalBusiness` con
indirizzo e coordinate di Vicenza, meta geo, Open Graph, sitemap, robots, llms.txt.

> Regola NAP: nome, indirizzo e telefono devono restare identici qui, su Google Business Profile e sulle directory.

## Dove stanno i contenuti

- `src/data/site.ts` — identità, contatti (NAP), coordinate, aree servite, **orari** (da compilare), form.
- `src/data/mam.ts` — slide della home, intro, elenco progetti (immagini in `public/img/mam/`).
- `src/data/team.ts` — testo studio, fondatori (con slot `foto`), collaboratori.
- `src/data/servizi.ts` — ambiti/servizi (keyword + JSON-LD).

### Form contatti
In `src/data/site.ts → form`: valorizza `endpoint` (Formspree/Resend) per l'invio via POST, oppure
`netlify: true` per usare Netlify Forms. Finché sono vuoti, il form apre l'email precompilata (mailto).

### Foto dei fondatori
Metti il file in `public/img/mam/team/` e valorizza `foto` nel relativo fondatore in `src/data/team.ts`.

## Deploy (Netlify)

`netlify.toml` già pronto: build `npm run build`, publish `dist`, Node 20. Il dominio canonico
arriva dalla variabile `URL` di Netlify (collega il dominio definitivo nelle impostazioni del sito).
