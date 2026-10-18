/**
 * PORTFOLIO. 3 categorie e le 5 realizzazioni di Geom. Brissoni Stefano (sezione "Le mie
 * realizzazioni" del sito attuale, nello stesso ordine). Ogni progetto genera /progetti/<slug>/,
 * entra nella pagina della sua categoria e nella mappa del sito.
 *
 * Dati: titolo e anno verbatim dalla mappa (solo maiuscole dei nomi propri sistemate); tipologia
 * e luogo ricavati dal titolo. Il sito attuale non ha testi per i progetti.
 * [[DA COMPILARE: descrizioni dei progetti scritte dal cliente (2-3 frasi ciascuna)]]
 *
 * Immagini: le foto della mappa (sito attuale su Wix), con le varianti in
 * public/img/progetti/<slug>/ generate da scripts/immagini.mjs. Sono scatti da telefono:
 * [[DA COMPILARE: foto migliori o a fine lavori, se il cliente le ha]]
 */
import { ph, type Img } from '../lib/media';
import immagini from './immagini.json';

export type CategoriaId = 'cat-1' | 'cat-2' | 'cat-3';

export type Categoria = {
  id: CategoriaId;
  /** slug della pagina /progetti/<slug>/ */
  slug: string;
  /** nome completo (filtri, breadcrumb, eyebrow) */
  nome: string;
  /** etichetta corta sul badge della card */
  etichetta: string;
  /** testo introduttivo della pagina categoria */
  intro: string;
  title: string;
  description: string;
};

// [[DA VALIDARE: nomi e introduzioni delle categorie scritti da noi sulle tipologie dei progetti]]
export const categorie: Categoria[] = [
  {
    id: 'cat-1',
    slug: 'ristrutturazioni',
    nome: 'Ristrutturazioni e riqualificazioni',
    etichetta: 'Ristrutturazione',
    intro: 'Riqualificazione energetica e ristrutturazione di villette unifamiliari a Scanzorosciate e ristrutturazione completa interna di un appartamento a Zanica.',
    title: 'Ristrutturazioni e riqualificazioni | Geom. Brissoni Stefano',
    description: 'Ristrutturazioni e riqualificazioni energetiche del Geom. Brissoni Stefano: villette unifamiliari a Scanzorosciate e un appartamento a Zanica (BG).',
  },
  {
    id: 'cat-2',
    slug: 'cambi-destinazione-uso',
    nome: 'Cambi di destinazione d’uso',
    etichetta: 'Cambio d’uso',
    intro: 'Cambio d’uso da magazzini a due monolocali a Bergamo, in zona Loreto.',
    title: 'Cambi di destinazione d’uso | Geom. Brissoni Stefano',
    description: 'Cambi di destinazione d’uso del Geom. Brissoni Stefano: da magazzini a due monolocali a Bergamo, zona Loreto.',
  },
  {
    id: 'cat-3',
    slug: 'condomini',
    nome: 'Condomini',
    etichetta: 'Condominio',
    intro: 'Rifacimento del tetto e delle facciate di un condominio di 6 unità immobiliari a Scanzorosciate, in corso.',
    title: 'Condomini | Geom. Brissoni Stefano',
    description: 'Interventi su condomini del Geom. Brissoni Stefano: rifacimento tetto e facciate di un condominio di 6 unità immobiliari a Scanzorosciate (BG).',
  },
];

export const categoria = (id: CategoriaId) => categorie.find((c) => c.id === id)!;

export type Progetto = {
  slug: string;
  titolo: string;
  luogo: string;
  /** categoria principale (badge) */
  categoria: CategoriaId;
  /** tutte le categorie in cui compare (filtri) */
  categorie: CategoriaId[];
  intervento: string;
  progettisti?: string[];
  importo?: string;
  temi: string[];
  /** id del membro del team referente (src/data/team.ts); vuoto = riga nascosta */
  referente: string;
  paragrafi: string[];
  immagini: Img[];
};

type Foto = { src: string; width: number; height: number; widths: number[]; drawing: boolean };
const foto = immagini.progetti as Record<string, Foto[]>;

const imgs = (slug: string, titolo: string, luogo: string): Img[] => {
  const lista = foto[slug] ?? [];
  if (!lista.length) {
    // [[DA COMPILARE: immagini del progetto]]
    return [
      ph(`${slug}-01`, 2400, 1800, `${titolo.toUpperCase()} · FOTO 01`, { alt: `copertina del progetto ${titolo}` }),
      ph(`${slug}-02`, 2400, 1800, `${titolo.toUpperCase()} · FOTO 02`, { alt: `foto del progetto ${titolo}` }),
    ];
  }
  return lista.map((f, k) => ({
    src: f.src,
    width: f.width,
    height: f.height,
    widths: f.widths,
    responsive: true,
    drawing: f.drawing || undefined,
    alt: `${titolo}, ${luogo} — foto ${k + 1}`,
  }));
};

type Riga = [
  slug: string,
  cat: CategoriaId,
  titolo: string,
  luogo: string,
  anno: string,
  contesto: string,
  tipologia: string,
  paragrafo: string,
  con?: string[],
];

const TESTO = '[[DA COMPILARE: descrizione del progetto, 2-3 frasi: stato di partenza, intervento, risultato]]';

const R: Riga[] = [
  ['villetta-scanzorosciate-2023', 'cat-1', 'Riqualificazione energetica e ristrutturazione villetta unifamiliare Scanzorosciate (BG)', 'Scanzorosciate (BG)', '2023',
    'Villetta unifamiliare', 'Riqualificazione energetica e ristrutturazione', TESTO],
  ['villetta-scanzorosciate-2025', 'cat-1', 'Riqualificazione energetica e ristrutturazione villetta unifamiliare Scanzorosciate (BG)', 'Scanzorosciate (BG)', '2024-2025',
    'Villetta unifamiliare', 'Riqualificazione energetica e ristrutturazione', TESTO],
  ['monolocali-bergamo-loreto', 'cat-2', 'Cambio d’uso da magazzini a n°2 monolocali Bergamo Loreto', 'Bergamo, Loreto', '2025',
    'Da magazzini a n°2 monolocali', 'Cambio di destinazione d’uso', TESTO],
  ['condominio-scanzorosciate', 'cat-3', 'Rifacimento tetto e facciate condominio 6 u.i. Scanzorosciate (BG)', 'Scanzorosciate (BG)', 'In corso',
    'Condominio 6 u.i.', 'Rifacimento tetto e facciate', TESTO],
  ['appartamento-zanica', 'cat-1', 'Ristrutturazione completa interna di appartamento Zanica', 'Zanica (BG)', '2026',
    'Appartamento', 'Ristrutturazione completa interna', TESTO],
];

export const progetti: Progetto[] = R.map(([slug, cat, titolo, luogo, anno, contesto, tipologia, paragrafo, con]) => ({
  slug,
  titolo,
  luogo,
  categoria: cat,
  categorie: [cat],
  intervento: `${tipologia} · ${contesto}`,
  progettisti: con,
  temi: [anno, tipologia],
  referente: 'brissoni-stefano',
  paragrafi: [paragrafo],
  immagini: imgs(slug, titolo, luogo),
}));

export const progetto = (slug: string) => progetti.find((p) => p.slug === slug)!;
export const copertina = (p: Progetto) => p.immagini[0];
export const inCategoria = (id: CategoriaId) => progetti.filter((p) => p.categorie.includes(id));
