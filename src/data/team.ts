/**
 * Studio (about): testo di presentazione, foto di apertura e gli elenchi di persone come il
 * sorgente (Fondatori / Collaboratori / Hanno collaborato). `team` (i fondatori) alimenta anche
 * il JSON-LD employee in Layout.astro. Tutto a segnaposto nella base.
 */
import { ph, type Img } from '../lib/media';

/** Paragrafo di presentazione (testo indicizzabile, importante per il SEO) */
export const studioIntro =
  '[[DA COMPILARE: presentazione dello studio, 3-5 frasi: chi siete, approccio, ambiti (architettura, interni, retail…). Testo utile al posizionamento.]]';

/** Foto di apertura della pagina studio (stesse misure del sorgente) */
export const studioHero = ph('studio-hero', 1600, 900, 'STUDIO · APERTURA', { dark: true });

export type Persona = { id: string; nome: string; ruolo: string; foto: Img };

/** Fondatori: mostrati nell'elenco e usati nel JSON-LD (Person employee). */
export const fondatori: Persona[] = [
  { id: 'fondatore-1', nome: '[[DA COMPILARE: fondatore 1]]', ruolo: 'Fondatore', foto: ph('team-1', 600, 600, 'FONDATORE 1') },
  { id: 'fondatore-2', nome: '[[DA COMPILARE: fondatore 2]]', ruolo: 'Fondatore', foto: ph('team-2', 600, 600, 'FONDATORE 2') },
  { id: 'fondatore-3', nome: '[[DA COMPILARE: fondatore 3]]', ruolo: 'Fondatore', foto: ph('team-3', 600, 600, 'FONDATORE 3') },
];

/** Collaboratori attuali (solo nomi, come il sorgente) */
export const collaboratori: string[] = [
  '[[DA COMPILARE: collaboratore 1]]',
  '[[DA COMPILARE: collaboratore 2]]',
  '[[DA COMPILARE: collaboratore 3]]',
];

/** Hanno collaborato (elenco nomi, facoltativo) */
export const hannoCollaborato: string[] = [
  '[[DA COMPILARE: ex collaboratore 1]]',
  '[[DA COMPILARE: ex collaboratore 2]]',
];

/** Alias per il JSON-LD employee in Layout.astro */
export const team = fondatori;
