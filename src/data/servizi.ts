/**
 * Ambiti/servizi dello studio. Alimenta il JSON-LD (hasOfferCatalog) e llms.txt, e vale
 * come insieme di parole chiave per il SEO.
 */
export type Servizio = { id: string; nome: string; breve: string };

export const servizi: Servizio[] = [
  { id: 'progettazione-architettonica', nome: 'Progettazione architettonica', breve: 'Progettazione di nuove costruzioni e ristrutturazioni, dal concept al dettaglio esecutivo.' },
  { id: 'interior-design', nome: 'Interior design', breve: 'Progetto degli spazi interni: distribuzione, materiali, luce e arredo su misura.' },
  { id: 'direzione-lavori', nome: 'Direzione lavori', breve: 'Coordinamento e controllo del cantiere per tempi, costi e qualità dell’opera.' },
  { id: 'direzione-artistica', nome: 'Direzione artistica', breve: 'Cura della coerenza estetica del progetto in ogni sua fase.' },
  { id: 'ristrutturazione', nome: 'Ristrutturazione e recupero', breve: 'Riqualificazione di edifici residenziali e industriali esistenti.' },
  { id: 'retail-allestimenti', nome: 'Retail e allestimenti', breve: 'Progettazione di spazi commerciali, allestimenti e concept di re-branding.' },
];
