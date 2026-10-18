/**
 * Contenuti ripetuti o in lista (home, studio, metodo). I testi singoli delle pagine
 * sono scritti direttamente nei file .astro.
 *
 * Brissoni: le 4 card scure sono i passaggi del lavoro presi dal blocco intro dei servizi
 * ("dalla progettazione ... all'ottenimento dell'agibilità"); la rotta /metodo/ ospita le
 * collaborazioni (8 voci della mappa, con il link).
 */
import type { Img } from '../lib/media';
import { progetto } from './progetti';
import immagini from './immagini.json';

/** logo di un partner (public/img/partner/, da scripts/immagini.mjs) */
const logo = (slug: keyof typeof immagini.partner, nome: string): Img => ({ ...immagini.partner[slug], alt: `Logo ${nome}` });

/** Carosello hero della home: 5 slide, ognuna punta a un progetto (titolo · luogo nella didascalia).
 *  La prima è la foto usata in home sul sito attuale (scatto da cantiere).
 *  [[DA COMPILARE: immagine d'apertura migliore, da chiedere al cliente]] */
export const heroSlides = [
  { progetto: 'villetta-scanzorosciate-2023', foto: 0 },
  { progetto: 'appartamento-zanica', foto: 0 },
  { progetto: 'villetta-scanzorosciate-2025', foto: 0 },
  { progetto: 'monolocali-bergamo-loreto', foto: 0 },
  { progetto: 'condominio-scanzorosciate', foto: 0 },
].map(({ progetto: slug, foto }) => {
  const p = progetto(slug);
  return { href: `/progetti/${p.slug}/`, titolo: p.titolo, luogo: p.luogo, img: p.immagini[foto] };
});

/** Progetti nella griglia della home (tutti e 5) */
export const progettiHome = ['villetta-scanzorosciate-2023', 'villetta-scanzorosciate-2025', 'monolocali-bergamo-loreto', 'condominio-scanzorosciate', 'appartamento-zanica'];

// [[DA VALIDARE: numeri contati da noi sui dati della mappa]]
/** Numeri (home: 4 card sotto "Chi sono") */
export const numeriHome = [
  { n: '2016', label: 'Libero professionista dal' },
  { n: '9', label: 'Servizi' },
  { n: '5', label: 'Realizzazioni' },
  { n: '8', label: 'Collaborazioni' },
];

/** Numeri (pagina studio) */
export const numeriStudio = [
  { n: '2016', label: 'Libero professionista dal' },
  { n: '4716', label: 'Iscrizione all’albo' },
  { n: '2021', label: 'Laurea in Ingegneria Civile e Ambientale' },
  { n: '9', label: 'Servizi' },
];

/** I passaggi del lavoro (card scure con foto: home + /metodo/)
 *  [[DA VALIDARE: frase del blocco intro servizi divisa da noi in 4 passaggi]] */
export const tappe = [
  {
    titolo: 'Progettazione',
    testo: 'Dalla progettazione preliminare a quella esecutiva.',
    img: progetto('villetta-scanzorosciate-2023').immagini[0],
  },
  {
    titolo: 'Permessi',
    testo: 'L’ottenimento dei permessi necessari.',
    img: progetto('monolocali-bergamo-loreto').immagini[0],
  },
  {
    titolo: 'Direzione lavori e sicurezza',
    testo: 'La direzione lavori e il coordinamento della sicurezza.',
    img: progetto('condominio-scanzorosciate').immagini[0],
  },
  {
    titolo: 'Chiusura dei lavori',
    testo: 'Fino ad arrivare alla chiusura dei lavori con l’ottenimento dell’agibilità.',
    img: progetto('appartamento-zanica').immagini[0],
  },
];

/** Collaborazioni (/metodo/): nome, descrizione e link verbatim dalla mappa, logo dal sito attuale.
 *  url vuoto = nessun link; logo assente = riquadro vuoto (Morbi: sul sito c'è lo stemma del Comune, non usabile)
 *  [[DA COMPILARE: loghi originali in alta qualità forniti dai partner, e il loro consenso a mostrarli]] */
export const fasi: { titolo: string; testo: string; url?: string; logo?: Img }[] = [
  { titolo: 'Geom. Matteo Morbi', testo: 'Assessore lavori pubblici e valorizzazione del territorio del Comune di Nembro.', url: 'https://www.comune.nembro.bg.it/it/persone/morbi-matteo' },
  { titolo: 'Passione Edile SRL', testo: 'Impresa edile con sede in Villa di Serio.', url: 'https://passioneedile.it/', logo: logo('passione-edile', 'Passione Edile SRL') },
  { titolo: 'Moda Mobil arredamenti', testo: 'Negozio di arredamento.', url: 'https://modamobil.it/', logo: logo('moda-mobil', 'Moda Mobil arredamenti') },
  { titolo: 'Costruzioni Brignoli SRL', testo: 'Impresa edile con sede in Scanzorosciate.', url: 'https://www.instagram.com/costruzionibrignoli/', logo: logo('costruzioni-brignoli', 'Costruzioni Brignoli SRL') },
  { titolo: 'Cremaschi Stefano ceramiche snc', testo: 'Pavimenti e rivestimenti.', url: 'https://www.cremaschiceramiche.com/', logo: logo('cremaschi-ceramiche', 'Cremaschi Stefano ceramiche snc') },
  { titolo: 'Finazzi Andrea Ingegneria', testo: 'Ing. Finazzi Andrea specializzato nella progettazione e strutturale.', url: 'https://www.ingegneriafinazzi.it/', logo: logo('finazzi-ingegneria', 'Finazzi Andrea Ingegneria') },
  { titolo: 'Zanga arredamenti', testo: 'Negozio di arredamento.', url: 'https://www.zangaarredamenti.it/', logo: logo('zanga-arredamenti', 'Zanga arredamenti') },
  { titolo: 'Ing. Santini Stefano', testo: 'Termotecnico specializzato nella progettazione impiantistica.', logo: { ...immagini.partner['santini-stefano'], alt: 'Ing. Santini Stefano' } },
];

/** Dove lavora lo studio (home, fondo scuro): contati sui luoghi delle 5 realizzazioni */
export const aree = [
  { conteggio: '3 realizzazioni', nome: 'Scanzorosciate', comuni: 'Due villette unifamiliari e un condominio di 6 unità' },
  { conteggio: '1 realizzazione', nome: 'Bergamo', comuni: 'Zona Loreto: da magazzini a due monolocali' },
  { conteggio: '1 realizzazione', nome: 'Zanica', comuni: 'Ristrutturazione completa interna di un appartamento' },
];

/** Approccio: 3 punti (pagina studio). Titoli verbatim dalla frase "professionalità, empatia e disponibilità" */
export const approccio = [
  { titolo: 'Professionalità', testo: '[[DA COMPILARE: cosa vuol dire professionalità per lo studio, 1-2 frasi di circa 150 caratteri]]' },
  { titolo: 'Empatia', testo: '[[DA COMPILARE: come lo studio ascolta e segue il cliente, 1-2 frasi di circa 150 caratteri]]' },
  { titolo: 'Disponibilità', testo: '[[DA COMPILARE: come e quando lo studio è raggiungibile, 1-2 frasi di circa 150 caratteri]]' },
];

/** Elenco competenze nella sezione "Lo studio" (pagina studio): i titoli dei servizi */
export const competenzeStudio = [
  'Progettazione 2D e 3D',
  'Coordinamento sicurezza e direzione lavori',
  'Attestati di prestazione energetica (APE)',
  'Pratiche edilizie e catastali, sanatorie',
  'Pratiche Enea per recupero fiscale',
  'Aste giudiziarie e stime immobiliari',
  'Progettazione impiantistica e strutturale, con tecnici specializzati',
];

/** FAQ: il cliente non ne ha (la sezione FAQ della home è tolta). */
export const faq: { d: string; r: string }[] = [];
export const FAQ_COL1 = 5;

/** CTA in fondo alle pagine (titolo dal pulsante della sezione "Chi sono", testo dal blocco servizi) */
export const cta = {
  eyebrow: 'Contatti',
  titolo: 'Mettiti in contatto',
  testo: 'L’obiettivo è di offrire al cliente professionalità, empatia e disponibilità con attenzione e cura ai dettagli grazie alla passione per il settore dell’edilizia che mi contraddistingue.',
};
