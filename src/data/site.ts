/**
 * IDENTITÀ DEL CLIENTE + FONDAMENTA SEO/GEO — unico punto da cui header, footer, contatti,
 * JSON-LD, meta, privacy, cookie, robots e llms.txt leggono i dati dello studio.
 *
 * BASE (clone di mamarchitetti.it): tutti i valori del cliente sono segnaposto [[DA COMPILARE]].
 * I campi sono già predisposti per il posizionamento locale (GEO): NAP (nome/indirizzo/telefono),
 * coordinate, aree servite, orari, competenze. Al riempimento si cambiano SOLO i valori.
 *
 * REGOLA SEO/GEO: nome, città e indirizzo devono essere IDENTICI qui, su Google Business Profile
 * e sulle directory (NAP coerente = segnale locale forte).
 */

export const site = {
  /** Nome breve usato ovunque (title, header, footer, JSON-LD). Dev'essere identico a Google Business Profile. */
  nome: '[[DA COMPILARE: nome dello studio, es. "MAM Architetti"]]',
  /** Denominazione completa/ragione sociale (JSON-LD legalName, privacy). Vuota = non resa. */
  ragioneSociale: '[[DA COMPILARE: ragione sociale completa per footer/privacy]]',
  /** Varianti del nome (JSON-LD alternateName) */
  nomiAlternativi: ['[[DA COMPILARE: variante del nome, es. cognome o sigla]]'],
  /** Alt del logo: nome + disciplina */
  logoAlt: '[[DA COMPILARE: nome studio]] — studio di architettura',
  /** Tipo di attività in 2-4 parole, usato in eyebrow e meta (con la città aiuta il SEO locale) */
  attivita: 'Studio di architettura',
  /** Slogan breve (JSON-LD slogan, footer) */
  slogan: '[[DA COMPILARE: claim breve dello studio, 3-6 parole]]',
  /** Descrizione in 1 frase (meta description di default, JSON-LD, llms.txt). Metti attività + città per il locale. */
  descrizione:
    '[[DA COMPILARE: descrizione studio in 1 frase, con attività e città, 140-160 caratteri per la meta description]]',
  /** Frase del footer sotto il logo (il "Have fun with us" del sorgente) */
  footerClaim: '[[DA COMPILARE: frase breve footer, es. "Have fun with us"]]',

  // ── Dominio e tecnici ───────────────────────────────────────────────
  /** Dominio canonico SENZA slash finale: è il `site` di astro.config.mjs (su Netlify, l'URL del sito) */
  dominio: String(import.meta.env.SITE).replace(/\/$/, ''),
  /** Colore della barra del browser: deve coincidere con --ink in global.css */
  themeColor: '#0a0a0a',
  /** Codice ISO regione/provincia per meta geo.region, es. IT-VI (Vicenza). [[DA COMPILARE]] */
  geoRegion: 'IT-[[XX]]',

  // ── Contatti (NAP) ──────────────────────────────────────────────────
  email: '[[DA COMPILARE: email, es. info@studio.it]]',
  /** Telefono come si legge a schermo. Vuoto = le righe col telefono non vengono rese. */
  telefono: '[[DA COMPILARE: telefono, es. 0444 1930546]]',
  /** Telefono per i link tel: in formato E.164 senza spazi, es. +3904441930546 */
  telefonoE164: '',
  /** Cellulare (facoltativo). Vuoto = non reso. */
  cellulare: '',
  cellulareE164: '',
  /** PEC e P.IVA: vuote = non rese. */
  pec: '',
  piva: '',

  indirizzo: {
    via: '[[DA COMPILARE: via e numero civico]]',
    cap: '[[CAP]]',
    citta: '[[DA COMPILARE: città]]',
    provincia: '[[XX]]',
    paese: 'IT',
  },
  /** Zona/quartiere (testo libero per "Dove siamo", utile per il locale) */
  zona: '[[DA COMPILARE: città e provincia servite]]',
  /** Coordinate per la mappa e lo schema geo. null = mappa e meta geo-position nascoste finché non compilate.
   *  [[DA COMPILARE: lat/lng della sede — da Google Maps]] */
  geo: null as null | { lat: number; lng: number },
  /** Link "Indicazioni stradali / Apri in Google Maps" */
  mapsUrl: '[[DA COMPILARE: URL Google Maps della sede]]',
  /** Modalità/orari di ricevimento (testo libero, pagina contatti) */
  ricevimento: '[[DA COMPILARE: orari o modalità di ricevimento]]',

  /** Orari di apertura per JSON-LD openingHoursSpecification (forte per il SEO locale).
   *  Array vuoto = non reso. days: 0=domenica … 6=sabato. [[DA COMPILARE: orari reali]] */
  orari: [] as { days: number[]; opens: string; closes: string }[],

  /** Social: array vuoto = blocco nascosto. icona: 'facebook' | 'instagram' | 'linkedin' */
  social: [] as { nome: string; url: string; icona: 'facebook' | 'instagram' | 'linkedin' }[],

  /** Aree servite (JSON-LD areaServed, llms.txt) — città/comuni per il posizionamento locale */
  areeServite: [
    { tipo: 'City', nome: '[[DA COMPILARE: città principale]]' },
    { tipo: 'AdministrativeArea', nome: '[[DA COMPILARE: provincia]]' },
  ] as { tipo: 'City' | 'AdministrativeArea'; nome: string }[],
  /** Competenze (JSON-LD knowsAbout) — ambiti dello studio, usati anche come keyword */
  competenze: [
    'Progettazione architettonica',
    'Direzione lavori',
    'Direzione artistica',
    'Ristrutturazione',
    'Interior design',
    'Retail e allestimenti',
  ],

  /** Form contatti. Il sorgente non ha form: i contatti stanno nel footer.
   *  Se si aggiunge un form, qui va l'endpoint; finché è vuoto non invia da nessuna parte. */
  form: {
    netlify: false,
    endpoint: '',
    mailto: '',
  },

  /** Analytics/pixel: nessuno nella base (il GTM del sorgente è stato rimosso). */
  analytics: null as null | string,

  /** Anno per il copyright */
  anno: new Date().getFullYear(),
};

export const indirizzoRiga = `${site.indirizzo.via}, ${site.indirizzo.cap} ${site.indirizzo.citta}`;
export const abs = (p: string) => site.dominio + p;
