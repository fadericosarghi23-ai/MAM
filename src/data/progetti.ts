/**
 * Progetti (works). Il sorgente ha una griglia piatta di schede quadrate; ogni scheda apre una
 * pagina con foto grande, titolo, luogo, anno, dati (cliente/destinazione/intervento/stato/team)
 * e galleria. Nella base: 8 progetti d'esempio, tutti a segnaposto.
 *
 * Immagini (stesse misure del sorgente): copertina 1200×1200 (1:1), apertura 1600×900,
 * galleria con foto orizzontale 1600×935 e verticali 900×1200 (3:4, affiancate a due).
 */
import { ph, type Img } from '../lib/media';

export type Progetto = {
  slug: string;
  titolo: string;
  luogo: string;
  anno: string;
  cliente: string;
  destinazione: string;
  intervento: string;
  stato: string;
  team: string;
  /** descrizione per il SEO (testo indicizzabile che il sorgente non ha) */
  descrizione: string;
  thumb: Img;
  hero: Img;
  gallery: Img[];
};

const mk = (n: number): Progetto => ({
  slug: `progetto-${n}`,
  titolo: `[[DA COMPILARE: titolo progetto ${n}]]`,
  luogo: '[[DA COMPILARE: città]]',
  anno: '[[ANNO]]',
  cliente: '[[DA COMPILARE: cliente]]',
  destinazione: '[[DA COMPILARE: destinazione d’uso]]',
  intervento: '[[DA COMPILARE: tipo di intervento]]',
  stato: '[[DA COMPILARE: stato, es. Realizzato]]',
  team: '[[DA COMPILARE: team di progetto]]',
  descrizione: `[[DA COMPILARE: descrizione progetto ${n}, 2-4 frasi con luogo e tipo di intervento (testo utile al SEO)]]`,
  thumb: ph(`prj-${n}-thumb`, 1200, 1200, `PROGETTO ${n} · COPERTINA`),
  hero: ph(`prj-${n}-hero`, 1600, 900, `PROGETTO ${n} · APERTURA`, { dark: true }),
  gallery: [
    ph(`prj-${n}-01`, 1600, 935, `PROGETTO ${n} · FOTO 1`),
    ph(`prj-${n}-02`, 900, 1200, `PROGETTO ${n} · FOTO 2`),
    ph(`prj-${n}-03`, 900, 1200, `PROGETTO ${n} · FOTO 3`),
  ],
});

export const progetti: Progetto[] = Array.from({ length: 8 }, (_, i) => mk(i + 1));
export const getProgetto = (slug: string) => progetti.find((p) => p.slug === slug);
