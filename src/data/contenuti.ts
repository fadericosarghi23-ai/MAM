/**
 * Asset di pagina non legati a progetti/studio: foto di apertura della pagina contatti e
 * immagine Open Graph di default (anteprima social). Tutti segnaposto delle misure giuste.
 */
import { ph } from '../lib/media';

/** Foto di apertura della pagina contatti (stesse misure del sorgente) */
export const contactHero = ph('contatti-hero', 1600, 900, 'CONTATTI · APERTURA', { dark: true });

/** Immagine Open Graph di default (anteprima social). Da sostituire con un PNG/JPG 1200×630. */
export const ogImage = ph('og-default', 1200, 630, 'IMMAGINE OG · 1200x630');
