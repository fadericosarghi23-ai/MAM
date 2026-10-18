import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Dominio canonico. Su Netlify arriva dalla variabile di build URL (l'indirizzo principale del sito:
// il dominio personalizzato se collegato, altrimenti https://<nome>.netlify.app). In locale resta il segnaposto.
// src/data/site.ts lo rilegge da import.meta.env.SITE, quindi non va ripetuto.
// [[DA COMPILARE: collegare su Netlify il dominio definitivo del cliente]]
export const SITE_URL = (process.env.URL || 'https://esempio.it').replace(/\/$/, '');

export default defineConfig({
  site: SITE_URL,
  // 'ignore': i link restano con lo slash finale (build a cartelle), ma il dev serve anche
  // le rotte con estensione (src/pages/img/placeholder/[id].svg.ts) senza slash.
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/grazie/') && !page.includes('/404'),
    }),
  ],
});
