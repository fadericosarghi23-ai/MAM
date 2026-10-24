/**
 * Home: slideshow a tutto schermo come il sorgente (5 slide 1600×900).
 * I testi SEO (title/description/H1) sono segnaposto: l'H1 è un'aggiunta per il posizionamento
 * (il sorgente non ne ha nessuno — debolezza SEO che qui correggiamo).
 */
import { ph } from '../lib/media';

export const home = {
  /** <title> della home (~55-60 caratteri, con città per il locale) */
  title: '[[DA COMPILARE: title SEO home, es. "Studio di architettura a <città> | <nome>"]]',
  /** meta description (140-160 caratteri, attività + città) */
  description: '[[DA COMPILARE: meta description home, 140-160 caratteri con attività e città]]',
  /** H1 della home (per il SEO). Visibile solo agli screen reader/crawler per non alterare il look. */
  h1: '[[DA COMPILARE: H1 home, es. "Studio di architettura a <città>"]]',
  slides: [
    ph('home-1', 1600, 900, 'SLIDE HERO 1', { dark: true }),
    ph('home-2', 1600, 900, 'SLIDE HERO 2', { dark: true }),
    ph('home-3', 1600, 900, 'SLIDE HERO 3', { dark: true }),
    ph('home-4', 1600, 900, 'SLIDE HERO 4', { dark: true }),
    ph('home-5', 1600, 900, 'SLIDE HERO 5', { dark: true }),
  ],
};
