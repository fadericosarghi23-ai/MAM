/**
 * SERVIZI (9). Usati in: home (griglia a 3 colonne), /servizi/ (una sezione per servizio,
 * alternate), footer, mappa del sito, select del form contatti, JSON-LD.
 * id = ancora in /servizi/#<id>.
 * foto = progetto la cui copertina illustra il servizio ("Nella foto: ...").
 * correlati = 3 progetti elencati sotto, categoria = pagina portfolio collegata.
 *
 * Brissoni: i 9 titoli sono quelli delle card del sito attuale. Le frasi vengono dal blocco
 * intro dei servizi della mappa (verbatim), divise per servizio; gli elenchi puntati sono
 * pezzi delle stesse frasi. Le foto delle card del sito attuale sono stock e non sono migrate.
 * [[DA VALIDARE: divisione del blocco intro tra i servizi e frasi brevi ricomposte da noi]]
 */
import type { Icona } from './icone';
import type { CategoriaId } from './progetti';

export type Servizio = {
  id: string;
  nome: string;
  breve: string;
  icona: Icona;
  paragrafi: [string, string];
  punti: string[];
  foto: string;
  correlati: string[];
  categoria: CategoriaId;
};

const PERCORSO = 'Dalla progettazione preliminare a quella esecutiva, dall’ottenimento dei permessi necessari alla direzione lavori e al coordinamento della sicurezza fino ad arrivare alla chiusura dei lavori con l’ottenimento dell’agibilità.';
const SECONDO = (servizio: string) => `[[DA COMPILARE: secondo paragrafo su ${servizio}, 1-2 frasi: per chi è e cosa comprende]]`;

export const servizi: Servizio[] = [
  {
    id: 'progettazione',
    nome: 'Progettazione 2D e 3D',
    breve: 'Dalla progettazione preliminare a quella esecutiva.',
    icona: 'pianta',
    paragrafi: [PERCORSO, SECONDO('la progettazione 2D e 3D')],
    punti: [
      'Progettazione preliminare',
      'Progettazione esecutiva',
      'Rilievi e redazione stato dei luoghi',
      'Ottenimento dei permessi necessari',
    ],
    foto: 'villetta-scanzorosciate-2023',
    correlati: ['villetta-scanzorosciate-2023', 'appartamento-zanica', 'monolocali-bergamo-loreto'],
    categoria: 'cat-1',
  },
  {
    id: 'sicurezza',
    nome: 'Coordinamento sicurezza',
    breve: 'Il coordinamento della sicurezza, fino alla chiusura dei lavori.',
    icona: 'casco',
    paragrafi: [PERCORSO, SECONDO('il coordinamento della sicurezza')],
    punti: ['[[DA COMPILARE: 3-5 attività incluse nel coordinamento sicurezza]]'],
    foto: 'condominio-scanzorosciate',
    correlati: ['condominio-scanzorosciate', 'villetta-scanzorosciate-2025', 'appartamento-zanica'],
    categoria: 'cat-3',
  },
  {
    id: 'direzione-lavori',
    nome: 'Direzione lavori',
    breve: 'La direzione lavori fino alla chiusura dei lavori con l’ottenimento dell’agibilità.',
    icona: 'treppiede',
    paragrafi: [PERCORSO, SECONDO('la direzione lavori')],
    punti: ['Direzione lavori', 'Chiusura dei lavori', 'Ottenimento dell’agibilità'],
    foto: 'villetta-scanzorosciate-2025',
    correlati: ['villetta-scanzorosciate-2025', 'condominio-scanzorosciate', 'villetta-scanzorosciate-2023'],
    categoria: 'cat-1',
  },
  {
    id: 'ape',
    nome: 'Attestati di prestazione energetica (APE)',
    breve: 'Attestati di Prestazione Energetica (APE) obbligatori per vendite e affitti.',
    icona: 'divano',
    paragrafi: [
      'Attestati di Prestazione Energetica (APE) obbligatori per vendite e affitti, da aggiornare in caso di riqualificazioni energetiche o ristrutturazioni.',
      SECONDO('gli APE'),
    ],
    punti: ['Vendite e affitti', 'Aggiornamento dopo riqualificazioni energetiche', 'Aggiornamento dopo ristrutturazioni'],
    foto: 'villetta-scanzorosciate-2023',
    correlati: ['villetta-scanzorosciate-2023', 'villetta-scanzorosciate-2025', 'appartamento-zanica'],
    categoria: 'cat-1',
  },
  {
    id: 'pratiche',
    nome: 'Pratiche edilizie e catastali',
    breve: 'Pratiche e istanze catastali, verifica conformità edilizia-urbanistica ed eventuale sanatoria.',
    icona: 'telaio',
    paragrafi: [
      'Verifica fattibilità di sanatorie tramite accesso atti in comune e in catasto, rilievi e redazione stato dei luoghi, redazione stati autorizzati e redazione stati di raffronto, verifica conformità edilizia-urbanistica ed eventuale successiva sanatoria.',
      'Pratiche e istanze catastali.',
    ],
    punti: [
      'Verifica fattibilità di sanatorie',
      'Accesso atti in comune e in catasto',
      'Rilievi e redazione stato dei luoghi',
      'Stati autorizzati e stati di raffronto',
      'Verifica conformità edilizia-urbanistica',
      'Pratiche e istanze catastali',
    ],
    foto: 'monolocali-bergamo-loreto',
    correlati: ['monolocali-bergamo-loreto', 'appartamento-zanica', 'villetta-scanzorosciate-2023'],
    categoria: 'cat-2',
  },
  {
    id: 'enea',
    nome: 'Pratiche Enea per recupero fiscale',
    breve: 'Pratiche Enea per recupero fiscale.',
    icona: 'divano',
    paragrafi: ['Pratiche Enea per recupero fiscale.', SECONDO('le pratiche Enea')],
    punti: ['[[DA COMPILARE: 3-5 tipi di intervento per cui si seguono le pratiche Enea]]'],
    foto: 'villetta-scanzorosciate-2025',
    correlati: ['villetta-scanzorosciate-2025', 'villetta-scanzorosciate-2023', 'condominio-scanzorosciate'],
    categoria: 'cat-1',
  },
  {
    id: 'aste',
    nome: 'Aste giudiziarie',
    breve: '[[DA COMPILARE: descrizione breve del servizio aste giudiziarie, 1 frase]]',
    icona: 'ponte',
    paragrafi: [
      '[[DA COMPILARE: cosa comprende l’assistenza per le aste giudiziarie, 1-2 frasi]]',
      SECONDO('le aste giudiziarie'),
    ],
    punti: ['[[DA COMPILARE: 3-5 attività incluse nel servizio aste giudiziarie]]'],
    foto: 'monolocali-bergamo-loreto',
    correlati: ['monolocali-bergamo-loreto', 'appartamento-zanica', 'condominio-scanzorosciate'],
    categoria: 'cat-2',
  },
  {
    id: 'stime',
    nome: 'Stime immobiliari',
    breve: 'Stima del bene per la formulazione di un’offerta di acquisto.',
    icona: 'pianta',
    paragrafi: [
      'Assistenza all’acquisto di immobili tramite sopralluogo, verifica visiva delle finiture, reperimento informazioni impiantistiche e strutturali, consigli sugli interventi da effettuare, verifica conformità edilizia e urbanistica, stima del bene per la formulazione di un’offerta di acquisto.',
      SECONDO('le stime immobiliari'),
    ],
    punti: [
      'Sopralluogo',
      'Verifica visiva delle finiture',
      'Informazioni impiantistiche e strutturali',
      'Consigli sugli interventi da effettuare',
      'Verifica conformità edilizia e urbanistica',
      'Stima del bene',
    ],
    foto: 'appartamento-zanica',
    correlati: ['appartamento-zanica', 'monolocali-bergamo-loreto', 'villetta-scanzorosciate-2023'],
    categoria: 'cat-1',
  },
  {
    id: 'impianti-strutture',
    nome: 'Progettazione impiantistica e strutturale',
    breve: 'In collaborazione con tecnici specializzati per offrire una progettazione completa.',
    icona: 'telaio',
    paragrafi: [
      'In collaborazione con tecnici specializzati per offrire una progettazione completa.',
      SECONDO('la progettazione impiantistica e strutturale'),
    ],
    punti: [
      'Progettazione strutturale con Finazzi Andrea Ingegneria',
      'Progettazione impiantistica con l’Ing. Santini Stefano',
    ],
    foto: 'condominio-scanzorosciate',
    correlati: ['condominio-scanzorosciate', 'villetta-scanzorosciate-2025', 'appartamento-zanica'],
    categoria: 'cat-3',
  },
];
