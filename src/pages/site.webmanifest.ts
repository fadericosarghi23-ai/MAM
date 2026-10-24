import type { APIRoute } from 'astro';
import { site } from '../data/site';

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify(
      {
        name: site.nome,
        short_name: site.nome,
        description: `${site.attivita} a ${site.indirizzo.citta} (${site.indirizzo.provincia})`,
        lang: 'it',
        start_url: '/',
        display: 'browser',
        background_color: '#ffffff',
        theme_color: site.themeColor,
        // Icona segnaposto (SVG). [[DA COMPILARE: generare icon-192.png e icon-512.png dal logo del cliente]]
        icons: [
          { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
        ],
      },
      null,
      2,
    ),
    { headers: { 'Content-Type': 'application/manifest+json' } },
  );
