# Geom. Brissoni Stefano — sito

Studio tecnico di progettazione di Brissoni Stefano, geometra libero professionista a Scanzorosciate (BG).
Il sito è il clone della base dello studio di architettura (struttura, layout, design system e
animazioni identici), svuotato dei contenuti del cliente precedente e riempito con la mappa
`mappa-riempimento-brissoni.md` (contenuti del sito attuale geombrissoni.wixsite.com/bris). È **in italiano**.

Astro 5, CSS senza framework, tutto guidato dai dati in `src/data/`.

```bash
npm run dev            # http://localhost:4720
npm run build          # dist/ statico
npm run slots          # slot ancora aperti ([[DA COMPILARE]] e [[DA VALIDARE]])
npm run check-residui  # residui dei clienti precedenti della base: deve dare 0
npm run immagini       # riscarica/rigenera foto dei progetti e loghi dei partner (idempotente)
npm run placeholders   # NON usarlo: sovrascriverebbe logo, favicon e immagine OG con i segnaposto della base
```

## Dove sta cosa

| Pagina (rotta della base) | Contenuto per Brissoni |
| --- | --- |
| `/` | carosello (5 realizzazioni), "Chi sono" con il testo intro, 9 servizi, 4 passaggi "Dal progetto all'agibilità", 5 realizzazioni, dove lavoro (3 comuni), il geometra, sede + mappa, invito al contatto |
| `/studio/` "Chi sono" | presentazione, numeri, approccio (3 punti da compilare), bio, sede e competenze |
| `/servizi/` "Servizi" | i 9 servizi del sito attuale, con le frasi del blocco intro divise per servizio |
| `/metodo/` "Collaborazioni" | gli 8 partner della mappa, con il link al loro sito e 7 loghi |
| `/progetti/` + 3 categorie + 5 schede | le 5 realizzazioni del sito attuale |
| `/contatti/` | indirizzo, telefono e cellulare, email e PEC, ricevimento, mappa, form |
| privacy, cookie, mappa del sito, grazie, 404 | in italiano |

Tolte rispetto al clone di partenza: l'elenco dei 12 collaboratori nella pagina studio (le
collaborazioni hanno la loro pagina), le card premi nella pagina `/metodo/` (le card scure restano in
home con i passaggi del lavoro), i 35 redirect del vecchio sito, la seconda sede. Recensioni e
newsletter, da togliere secondo la mappa, nella base non c'erano.

## Animazioni

Restano tutte quelle della base, senza modifiche al codice: header trasparente → pieno, menu
mobile, reveal (IntersectionObserver), carosello dell'hero (dissolvenza + zoom, 6 s, pallini),
lightbox della gallery, gli hover. Negli script sono cambiate solo le etichette accessibili in italiano.

**Intro d'apertura col logo** (aggiunta, `src/components/Intro.astro`): alla prima pagina aperta nella
sessione, pannello antracite con il logo: "GEOM." sale e appare, "BRISSONI STEFANO" si scopre da
sinistra, la linea oro si allunga, poi il pannello scorre verso l'alto (circa 2,8 s). Un clic o un tasto la
saltano. Non parte senza JavaScript, con "riduci movimento" attivo o se è già stata vista nella sessione
(`sessionStorage` → `intro-vista`; per rivederla: chiudere la scheda o svuotare la memoria di sessione).
La classe `intro` la mette uno script inline nel `<head>` di `Layout.astro`, prima del primo paint.

## Dati e immagini

- `src/data/site.ts`: identità, sede unica, telefono e cellulare, PEC, coordinate per la mappa OSM
  (Nominatim, **a livello di via**: il civico 20 non è mappato), form.
- `src/data/progetti.ts`: 3 categorie e 5 realizzazioni. Titoli e anni verbatim dalla mappa (sistemate
  solo le maiuscole dei nomi propri: "scanzorosciate" → "Scanzorosciate").
- **Foto**: le 9 foto della mappa, scaricate a piena risoluzione da Wix (senza il segmento
  `/v1/fill/...`), ruotate secondo l'EXIF, varianti avif/webp/jpg in `public/img/progetti/<slug>/`
  (script `scripts/immagini.mjs`, misure in `src/data/immagini.json`). Il percorso segue il meccanismo
  immagini della base (`public/img/...`), non `public/images/`.
- **Loghi dei partner**: 7 su 8, presi dalla pagina Collaborazioni del sito attuale, in
  `public/img/partner/` (stesso script). Escluso il Geom. Matteo Morbi: sul sito ha lo stemma del Comune
  di Nembro, che non è un suo logo e non si usa su un sito privato senza autorizzazione del Comune.
- **Non migrate**: le 4 foto stock Wix (licenza valida solo su siti Wix) e le 5 immagini delle card
  servizi prese da altri siti (copyright di terzi).
- **Logo**: il cliente non ne ha uno (il sito attuale ha solo la scritta "GEOMETRA LAUREATO BRISSONI
  STEFANO"). `public/img/logo/logo.svg` e `logo-light.svg` sono un wordmark testuale "GEOM. /
  BRISSONI STEFANO" nei font della base (Inter + Newsreader), convertito in tracciati, riquadro 882×182.
  Favicon e icone: una "B" in Newsreader su nero. Immagine OG: wordmark su bianco.

## Palette (solo token, `src/styles/global.css`)

La palette del tema del sito attuale (Wix, variabili `--color_N`): neutri caldi, applicati solo ai token.

| Token | Valore | Dal sito attuale | Uso |
| --- | --- | --- | --- |
| `--accent` | `#202020` | antracite di intestazione e fasce scure | bottoni, sopratitoli, fascia contatti |
| `--accent-dark` / `--ink-2` | `#41403a` | grigio scuro del tema | hover dei bottoni |
| `--ink` | `#2c2a2a` | fascia scura dei servizi | titoli, footer, "Dove lavoro", intro |
| `--accent-on-dark` | `#cfbb8b` | riga oro del tema | evidenza sui fondi scuri, linea dell'intro |
| `--text` | `#202020` | testo | testo |
| `--grey` | `#5a5951` | grigio caldo | testo secondario |
| `--sand` | `#f1ebdd` | beige | sezioni chiare |
| `--grey-light` / `--accent-soft` | `#e0deca` | sabbia | fondi delle foto, anello di focus |
| `--white` | `#f7f5ee` | avorio, fondo del sito | fondo pagina |

Contrasti: `--text` 14.9:1 e `--grey` 6.5:1 su avorio (5.9:1 su beige), oro 7.6:1 su `--ink`, testo
dei bottoni 14.9:1. Logo, favicon, icone e immagine OG usano antracite e avorio. Font della base.

## Aperti — `[[DA COMPILARE]]` (manca il dato)

`npm run slots` li elenca file per file. In sintesi:

1. **P.IVA e denominazione legale**: servono per footer e privacy (non sono sul sito attuale).
2. **Logo vero**, se il cliente ne vuole uno: oggi c'è il wordmark testuale provvisorio.
3. **Ritratto** del cliente (1002×897): la foto attuale è stock.
4. **Descrizioni delle 5 realizzazioni** (2-3 frasi ciascuna) e, se ci sono, foto migliori o a fine lavori.
5. **Servizi**: testo di "Aste giudiziarie", secondi paragrafi dei servizi, attività di sicurezza ed Enea.
6. **Approccio** (professionalità, empatia, disponibilità): una frase per punto.
7. **Ricevimento** (orari) e frase di invito in contatti e in home.
8. **Social**: verificare se esistono.
9. **Dominio** definitivo (`astro.config.mjs` + `src/data/site.ts`).
10. **Endpoint del form**: oggi il form apre il programma di posta verso geom.brissoni@gmail.com.
11. **Immagine d'apertura** migliore per la hero (oggi è lo scatto da cantiere del sito attuale).
12. **Loghi dei partner** originali in buona qualità, con il loro consenso a mostrarli (oggi sono i file caricati su Wix).

## Da validare col cliente — `[[DA VALIDARE]]` (ricomposto da noi)

- Divisione del blocco intro tra i 9 servizi e le frasi brevi.
- I 4 passaggi "Dal progetto all'agibilità".
- Nomi e introduzioni delle 3 categorie.
- I numeri (2016, 9 servizi, 5 realizzazioni, 8 collaborazioni, albo 4716, laurea 2021).
- Alcuni titoli di sezione e la descrizione meta.
- La palette (presa dal tema del sito attuale).
- **Titolo professionale**: il sito usa "Geom. Brissoni Stefano" (iscritto all'albo dei geometri,
  n. 4716). Non si usa "Geometra Ing." del vecchio footer (punto 8 della mappa).

## Nota di posizionamento (dalla mappa)

Il sito attuale promette "bellezza" e "design unico", ma i servizi sono tecnici. In una fase di
riscrittura conviene guidare con competenza e copertura completa della pratica edilizia. La
citazione di Dostoevskij in hero non è stata riportata.
