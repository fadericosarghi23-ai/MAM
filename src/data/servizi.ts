/**
 * Ambiti/servizi dello studio. Non c'è una pagina servizi nel sorgente: questa lista alimenta
 * il JSON-LD (hasOfferCatalog) e llms.txt, e vale come insieme di parole chiave per il SEO.
 */
export type Servizio = { id: string; nome: string; breve: string };

export const servizi: Servizio[] = [
  { id: 'progettazione-architettonica', nome: 'Progettazione architettonica', breve: '[[DA COMPILARE: 1 frase sul servizio]]' },
  { id: 'interior-design', nome: 'Interior design', breve: '[[DA COMPILARE: 1 frase sul servizio]]' },
  { id: 'direzione-lavori', nome: 'Direzione lavori', breve: '[[DA COMPILARE: 1 frase sul servizio]]' },
  { id: 'direzione-artistica', nome: 'Direzione artistica', breve: '[[DA COMPILARE: 1 frase sul servizio]]' },
  { id: 'ristrutturazione', nome: 'Ristrutturazione e recupero', breve: '[[DA COMPILARE: 1 frase sul servizio]]' },
  { id: 'retail-allestimenti', nome: 'Retail e allestimenti', breve: '[[DA COMPILARE: 1 frase sul servizio]]' },
];
