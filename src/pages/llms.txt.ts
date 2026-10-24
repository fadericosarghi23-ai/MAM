/** llms.txt generato dai dati: nessun testo da tenere allineato a mano. */
import type { APIRoute } from 'astro';
import { site, abs } from '../data/site';
import { servizi } from '../data/servizi';
import { team } from '../data/team';
import { progetti } from '../data/progetti';

export const GET: APIRoute = () => {
  const righe = [
    `# ${site.nome}`,
    '',
    `> ${site.descrizione}`,
    '',
    '## Dati principali',
    '',
    `- Nome: ${site.nome}`,
    `- Sito: ${abs('/')}`,
    `- Sede: ${site.indirizzo.via}, ${site.indirizzo.cap} ${site.indirizzo.citta} (${site.indirizzo.provincia})`,
    ...(site.telefono ? [`- Telefono: ${site.telefono}`] : []),
    `- Email: ${site.email}`,
    ...site.social.map((s) => `- ${s.nome}: ${s.url}`),
    `- Aree servite: ${site.areeServite.map((a) => a.nome).join(', ')}`,
    `- Studio: ${team.map((m) => `${m.nome} (${m.ruolo})`).join(', ')}`,
    `- Progetti: ${progetti.length} progetti pubblicati`,
    '',
    '## Pagine principali',
    '',
    `- [Home](${abs('/')}): studio di architettura e realizzazioni.`,
    `- [Progetti](${abs('/progetti/')}): tutte le realizzazioni dello studio.`,
    `- [Studio](${abs('/studio/')}): chi siamo, approccio e persone.`,
    `- [Contatti](${abs('/contatti/')}): indirizzo, email, telefono e indicazioni.`,
    '',
    '## Ambiti',
    '',
    ...servizi.map((s) => `- ${s.nome}: ${s.breve}`),
    '',
    '## Progetti',
    '',
    ...progetti.map((p) => `- [${p.titolo}](${abs(`/progetti/${p.slug}/`)}): ${p.intervento}. ${p.luogo}.`),
    '',
  ];
  return new Response(righe.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
