/**
 * IDENTITÀ DEL CLIENTE — unico punto da cui header, footer, contatti, JSON-LD,
 * meta, privacy, cookie, robots e llms.txt leggono i dati dello studio.
 *
 * Geom. Brissoni Stefano: dati dalla mappa di riempimento (sito attuale geombrissoni.wixsite.com/bris).
 * Una sola sede, a Scanzorosciate (BG).
 */

export const site = {
  /** Nome breve usato ovunque (title, header, footer, JSON-LD) */
  nome: 'Geom. Brissoni Stefano',
  /** Denominazione completa/ragione sociale (JSON-LD legalName, privacy). Vuota = non resa.
   *  [[DA COMPILARE: denominazione legale corretta per footer e privacy — non indicata sul sito attuale]] */
  ragioneSociale: '',
  /** Varianti del nome (JSON-LD alternateName) */
  nomiAlternativi: ['Brissoni Stefano', 'Stefano Brissoni geometra'],
  /** Alt del logo: nome + discipline */
  logoAlt: 'Geom. Brissoni Stefano — studio tecnico di progettazione',
  /** Tipo di attività in 2-4 parole, usato in eyebrow e meta */
  attivita: 'Studio tecnico di progettazione',
  /** Slogan breve (JSON-LD slogan, footer) */
  slogan: 'Stile di qualità per un design unico',
  /** Descrizione dello studio in 1 frase (meta description di default, JSON-LD, llms.txt)
   *  [[DA VALIDARE: frase composta da noi con i dati della mappa]] */
  descrizione:
    'Brissoni Stefano, geometra libero professionista dal 2016 a Scanzorosciate (BG): progettazione, direzione lavori, sicurezza, APE, pratiche edilizie e catastali, stime immobiliari.',
  /** Frase del footer sotto il logo */
  footerClaim: 'Stile di qualità per un design unico',

  // ── Dominio e tecnici ───────────────────────────────────────────────
  /** Dominio canonico SENZA slash finale: è il `site` di astro.config.mjs (su Netlify, l'URL del sito) */
  dominio: String(import.meta.env.SITE).replace(/\/$/, ''),
  /** Colore della barra del browser: deve coincidere con --accent in global.css */
  themeColor: '#202020',
  /** Codice ISO regione/provincia per meta geo.region */
  geoRegion: 'IT-BG',

  // ── Contatti ────────────────────────────────────────────────────────
  email: 'geom.brissoni@gmail.com',
  /** Telefono come si legge a schermo. Vuoto = le righe col telefono non vengono rese. */
  telefono: '035 459 9201',
  /** Telefono per i link tel: in formato E.164 senza spazi */
  telefonoE164: '+390354599201',
  /** Cellulare (pagina contatti, footer, menu mobile) */
  cellulare: '348 720 5790',
  cellulareE164: '+393487205790',
  /** PEC e P.IVA: vuote = non rese. [[DA COMPILARE: partita IVA — non indicata sul sito attuale]] */
  pec: 'stefano.brissoni@geopec.it',
  piva: '',

  indirizzo: {
    via: 'Via Monte Cervino 20',
    cap: '24020',
    citta: 'Scanzorosciate',
    provincia: 'BG',
    paese: 'IT',
  },
  /** Zona/quartiere in cui si trova lo studio (testo libero per "Dove siamo") */
  zona: 'Scanzorosciate, provincia di Bergamo',
  /** Coordinate per la mappa OpenStreetMap (Nominatim: Via Monte Cervino, Scanzorosciate — a livello di via, senza civico) */
  geo: { lat: 45.7172592, lng: 9.7769164 } as null | { lat: number; lng: number },
  /** Link "Apri in Google Maps / Indicazioni stradali" */
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Via%20Monte%20Cervino%2020%2C%2024020%20Scanzorosciate%20BG',
  /** Modalità di ricevimento (pagina contatti) */
  ricevimento: '[[DA COMPILARE: orari o modalità di ricevimento — non indicati sul sito attuale]]',

  /** Social: lasciare l'array vuoto per nascondere il blocco. icona: 'facebook' | 'instagram' | 'linkedin'
   *  [[DA COMPILARE: social del cliente, se esistono — il sito attuale non ne ha]] */
  social: [] as { nome: string; url: string; icona: 'facebook' | 'instagram' | 'linkedin' }[],

  /** Aree servite (JSON-LD areaServed, llms.txt) — dai luoghi dei progetti */
  areeServite: [
    { tipo: 'City', nome: 'Scanzorosciate' },
    { tipo: 'City', nome: 'Bergamo' },
    { tipo: 'City', nome: 'Zanica' },
    { tipo: 'AdministrativeArea', nome: 'Provincia di Bergamo' },
  ],
  /** Competenze (JSON-LD knowsAbout) — i titoli dei servizi */
  competenze: [
    'Progettazione 2D e 3D',
    'Coordinamento sicurezza',
    'Direzione lavori',
    'Attestati di prestazione energetica (APE)',
    'Pratiche edilizie e catastali',
    'Pratiche Enea per recupero fiscale',
    'Aste giudiziarie',
    'Stime immobiliari',
  ],

  /** Form contatti. endpoint vuoto + mailto: il form apre il programma di posta verso l'email.
   *  [[DA COMPILARE: collegamento del form (Netlify Forms o endpoint) da concordare col cliente]] */
  form: {
    netlify: false,
    endpoint: '',
    mailto: 'geom.brissoni@gmail.com',
  },

  /** Analytics/pixel: nessuno */
  analytics: null as null | string,

  /** Anno per il copyright */
  anno: new Date().getFullYear(),
};

export const indirizzoRiga = `${site.indirizzo.via}, ${site.indirizzo.cap} ${site.indirizzo.citta}`;
export const abs = (p: string) => site.dominio + p;
