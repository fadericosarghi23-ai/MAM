/**
 * IDENTITÀ + FONDAMENTA SEO/GEO — unico punto da cui header, footer, contatti, JSON-LD,
 * meta, privacy, cookie, robots e llms.txt leggono i dati dello studio.
 *
 * Contenuti REALI di MAM Architetti (da mamarchitetti.it): il sito resta identico; le uniche
 * aggiunte rispetto all'originale sono il livello SEO (meta/H1/alt) e GEO/local (schema
 * LocalBusiness con indirizzo, coordinate, aree servite). NAP = nome/indirizzo/telefono coerenti.
 */

export const site = {
  nome: 'MAM Architetti',
  /** Ragione sociale: non pubblicata sul sito. Vuota = in privacy si usa il nome. */
  ragioneSociale: '',
  nomiAlternativi: ['MAM', 'MAM Architetti Vicenza', 'Studio MAM'],
  logoAlt: 'MAM Architetti — studio di architettura a Vicenza',
  attivita: 'Studio di architettura',
  slogan: 'Architettura, direzione artistica e allestimenti',
  /** meta description di default (con attività + città per il SEO locale) */
  descrizione:
    'MAM Architetti è uno studio di architettura a Vicenza: progettazione architettonica, interior design, direzione lavori e artistica, retail e allestimenti.',
  /** Frase del footer (come il sorgente) */
  footerClaim: 'Have fun with us',

  // ── Dominio e tecnici ───────────────────────────────────────────────
  dominio: String(import.meta.env.SITE).replace(/\/$/, ''),
  themeColor: '#0a0a0a',
  geoRegion: 'IT-VI',

  // ── Contatti (NAP) ──────────────────────────────────────────────────
  email: 'info@mamarchitetti.it',
  telefono: '0444 1930546',
  telefonoE164: '+3904441930546',
  cellulare: '',
  cellulareE164: '',
  pec: '',
  piva: '',

  indirizzo: {
    via: 'Contrà Valmerlara, 23',
    cap: '36100',
    citta: 'Vicenza',
    provincia: 'VI',
    paese: 'IT',
  },
  zona: 'Vicenza e provincia',
  /** Coordinate reali della sede (Nominatim: Contrà Valmerlara 23, Vicenza) */
  geo: { lat: 45.5425678, lng: 11.5477361 } as null | { lat: number; lng: number },
  mapsUrl: 'https://maps.google.com/?q=Contr%C3%A0+Valmerlara+23%2C+36100+Vicenza',
  ricevimento: '',

  /** Orari di apertura (non pubblicati sul sito). [[DA COMPILARE: orari reali per il SEO locale]] */
  orari: [] as { days: number[]; opens: string; closes: string }[],

  social: [
    { nome: 'Instagram', url: 'https://www.instagram.com/mamarchitetti/', icona: 'instagram' },
  ] as { nome: string; url: string; icona: 'facebook' | 'instagram' | 'linkedin' }[],

  /** Aree servite (JSON-LD areaServed, llms.txt) — per il posizionamento locale */
  areeServite: [
    { tipo: 'City', nome: 'Vicenza' },
    { tipo: 'AdministrativeArea', nome: 'Provincia di Vicenza' },
    { tipo: 'AdministrativeArea', nome: 'Veneto' },
  ] as { tipo: 'City' | 'AdministrativeArea'; nome: string }[],
  /** Competenze (JSON-LD knowsAbout) — ambiti dello studio e keyword */
  competenze: [
    'Progettazione architettonica',
    'Direzione artistica',
    'Direzione lavori',
    'Sicurezza cantiere',
    'Interior design',
    'Retail e allestimenti',
    'Edilizia residenziale',
    'Edilizia industriale',
    'Concept e re-branding',
  ],

  /** Il sorgente non ha form: i contatti stanno nel footer. */
  form: {
    netlify: false,
    endpoint: '',
    mailto: 'info@mamarchitetti.it',
  },

  /** Analytics: nel sorgente c'è Google Tag Manager; qui non è incluso finché non lo si collega. */
  analytics: null as null | string,

  anno: new Date().getFullYear(),
};

export const indirizzoRiga = `${site.indirizzo.via}, ${site.indirizzo.cap} ${site.indirizzo.citta}`;
export const abs = (p: string) => site.dominio + p;
