/** llms.txt generato dai dati: nessun testo da tenere allineato a mano. */
import type { APIRoute } from 'astro';
import { site, abs } from '../data/site';
import { servizi } from '../data/servizi';
import { team } from '../data/team';
import { categorie, inCategoria, progetti } from '../data/progetti';

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
    ...(site.cellulare ? [`- Cellulare: ${site.cellulare}`] : []),
    `- Email: ${site.email}`,
    ...(site.pec ? [`- PEC: ${site.pec}`] : []),
    ...site.social.map((s) => `- ${s.nome}: ${s.url}`),
    `- Zone: ${site.areeServite.map((a) => a.nome).join(', ')}`,
    `- Professionista: ${team.map((m) => `${m.nome} (${m.ruolo})`).join(', ')}`,
    `- Realizzazioni: ${progetti.length} progetti documentati`,
    '',
    '## Pagine principali',
    '',
    `- [Home](${abs('/')}): presentazione, servizi, come lavoro, realizzazioni e contatti.`,
    `- [Chi sono](${abs('/studio/')}): il geometra, il percorso e l’approccio.`,
    `- [Servizi](${abs('/servizi/')}): i servizi dello studio tecnico.`,
    `- [Collaborazioni](${abs('/metodo/')}): professionisti, imprese e fornitori.`,
    `- [Realizzazioni](${abs('/progetti/')}): tutte le realizzazioni, filtrabili per categoria.`,
    `- [Contatti](${abs('/contatti/')}): indirizzo, telefono, email, mappa e modulo di contatto.`,
    '',
    '## Servizi',
    '',
    ...servizi.map((s) => `- [${s.nome}](${abs(`/servizi/#${s.id}`)}): ${s.breve}`),
    ...categorie.flatMap((c) => ['', `## Realizzazioni — ${c.nome}`, '', ...inCategoria(c.id).map((p) => `- [${p.titolo}](${abs(`/progetti/${p.slug}/`)}): ${p.intervento}. ${p.luogo}.${p.importo ? ` Importo lavori: ${p.importo}.` : ''}`)]),
    '',
  ];
  return new Response(righe.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
