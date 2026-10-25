/**
 * Studio (about): testo e persone reali di MAM. L'organigramma è ad albero
 * (Fondatori → Collaboratori → Hanno collaborato). I 3 fondatori hanno uno slot foto:
 * per aggiungere la foto, metti il file in public/img/mam/team/ e valorizza `foto`.
 * `team` (i fondatori) alimenta anche il JSON-LD employee in Layout.astro.
 */
import { type Img } from '../lib/media';

/** Paragrafo di presentazione (dal sito di MAM) */
export const studioIntro =
  'Lo studio nasce dalla volontà di un gruppo di professionisti di collaborare per fondere assieme le proprie esperienze e creare nuove sinergie. L’attenzione progettuale è trasversale dal retail all’allestimento, dalla ricerca e sviluppo alla riflessione critica sul progetto, dall’edilizia residenziale a quella industriale con il medesimo approccio. Il team si occupa prevalentemente di progettazione architettonica, direzione artistica, direzione lavori, sicurezza cantiere e consulenze per lo sviluppo di concept e re-branding.';

/** Foto di apertura della pagina studio */
export const studioHero: Img = { src: '/img/mam/hero.jpeg', width: 1600, height: 900, alt: 'MAM Architetti — studio di architettura a Vicenza' };

export type Persona = {
  id: string;
  nome: string;
  ruolo: string;
  /** Percorso foto (es. '/img/mam/team/michele-cecchetto.jpg'). Vuoto = segnaposto con iniziali. */
  foto?: string;
};

/** Fondatori: i 3 "più importanti", con slot foto. Elenco + JSON-LD (Person employee). */
export const fondatori: Persona[] = [
  { id: 'michele-cecchetto', nome: 'Michele Cecchetto', ruolo: 'Fondatore', foto: '' },
  { id: 'alberto-zampieri', nome: 'Alberto Zampieri', ruolo: 'Fondatore', foto: '' },
  { id: 'michele-zorzan', nome: 'Michele Zorzan', ruolo: 'Fondatore', foto: '' },
];

/** Collaboratori */
export const collaboratori: string[] = ['Riccardo De Cani', 'Erica Bolis', 'Michelangelo Portinari'];

/** Hanno collaborato */
export const hannoCollaborato: string[] = [
  'Alberto Provolo', 'Alessandro Fantin', 'Dario Fanton', 'Cecilia Fortuna', 'Miriam Nuzzarello',
  'Pietro Zampieri', 'Francesco Baggio', 'Giulia Schiavo', 'Marco de Visini', 'Marco Trevisan',
  'Clara Simonetto', 'Alessandro Fantini', 'Beatrice Cavalcante', 'Anna Ravarotto', 'Vania Corsia',
  'Veronica Vigolo', 'Irene Tamiello',
];

/** Alias per il JSON-LD employee in Layout.astro */
export const team = fondatori;
