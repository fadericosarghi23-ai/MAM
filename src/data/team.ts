/**
 * Team. L'id è l'ancora in /studio/#<id> e il riferimento "referente" nei progetti.
 * Brissoni: un solo professionista. La foto della sezione about del sito attuale è stock e non
 * va migrata: resta il segnaposto delle stesse misure del ritratto della base.
 * [[DA COMPILARE: ritratto professionale reale del cliente, 1002×897]]
 */
import { ph, type Img } from '../lib/media';

/** bio: biografia verbatim dalla sezione "Chi sono" del sito attuale (resa sotto il ruolo in /studio/) */
export type Membro = { id: string; nome: string; ruolo: string; foto: Img; bio?: string };

export const team: Membro[] = [
  {
    id: 'brissoni-stefano',
    nome: 'Brissoni Stefano',
    ruolo: 'Geometra, iscritto all’albo al n. 4716',
    foto: ph('ritratto-brissoni', 1002, 897, 'RITRATTO BRISSONI STEFANO', { alt: 'ritratto di Brissoni Stefano' }),
    bio: 'Geometra Libero Professionista dal 2016 iscritto all’albo al numero 4716. Sono laureato in Ingegneria Civile e Ambientale, titolo conseguito nel 2021. Lavoro con passione su molti progetti con l’unico obiettivo di fornire soluzioni funzionali e di bellezza estetica unica.',
  },
];

export const membro = (id: string) => team.find((m) => m.id === id);
