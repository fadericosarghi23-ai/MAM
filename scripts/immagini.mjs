// Foto dei progetti nel formato immagini della base (src/lib/media.ts):
// public/img/<cartella>/<stem>-<w>.<avif|webp|jpg>, larghezze 480/800/1200/1600 + larghezza intrinseca
// (max 2400). Scarica gli originali a piena risoluzione dagli URL diretti della mappa di riempimento
// (sito attuale su Wix: static.wixstatic.com/media/<id>, senza il segmento /v1/fill/...).
// Scrive src/data/immagini.json (misure, src, flag disegno) che src/data/progetti.ts legge.
// Uso: node scripts/immagini.mjs   (idempotente: salta i file già scaricati o generati)
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CACHE = path.join(ROOT, 'scripts/.cache-originali');
const STD = [480, 800, 1200, 1600];
const WIX = 'https://static.wixstatic.com/media/';

// slug del progetto -> foto della mappa, nell'ordine della mappa (la prima è la copertina)
const FOTO = {
  'villetta-scanzorosciate-2023': ['d4ca00_d05992fbde2d4acf9c304496b74bdf9d~mv2.jpg'],
  'villetta-scanzorosciate-2025': ['d4ca00_0e12fab30f79492b8094a33ae6c871c8~mv2.jpg'],
  'monolocali-bergamo-loreto': ['d4ca00_ea6afb770bf045e2ab207dd934aeb999~mv2.jpg', 'd4ca00_6e1fff658e754d4ba714a87100e01eeb~mv2.jpg'],
  'condominio-scanzorosciate': ['d4ca00_e1199a45349243d481958697d2466954~mv2.jpg'],
  'appartamento-zanica': [
    'd4ca00_8ba8c6bc7668483da82557bb98c00763~mv2.jpg',
    'd4ca00_8dbfcd297b2f4da2aed4d6b1ae0e9377~mv2.jpg',
    'd4ca00_4aa286e676644ef490330aa64e803fef~mv2.jpg',
    'd4ca00_08b63bd7d52b4d0b94d19bec88645f40~mv2.jpg',
  ],
};

// loghi dei partner (pagina Collaborazioni del sito attuale, nello stesso ordine). Sono i file caricati
// su Wix dal cliente: andrebbero sostituiti con gli originali forniti dai partner.
// Escluso il Geom. Matteo Morbi: sul sito attuale ha lo stemma del Comune di Nembro, che non è un suo
// logo e non si usa su un sito privato senza autorizzazione del Comune.
const PARTNER = {
  'passione-edile': 'd4ca00_6c0347dc0a5b40ae864dad29785261fc~mv2.jpg',
  'moda-mobil': 'd4ca00_dafc563f43824c5588c36d3f470c8c01~mv2.jpg',
  'costruzioni-brignoli': 'd4ca00_0a2a56185f8e44b5b59f416c1728b9dc~mv2.jpg',
  'cremaschi-ceramiche': 'd4ca00_63ad32a2293c43cf9d2f9cb3c73c15cb~mv2.jpg',
  'finazzi-ingegneria': 'd4ca00_7c4920957e374402963cae3d92c3b562~mv2.jpg',
  'zanga-arredamenti': 'd4ca00_aa4d50a7ba7746a3a03bc7088a7f4db5~mv2.jpg',
  'santini-stefano': 'd4ca00_bb2aea5ac34a4c579eb33fff19124948~mv2.jpg',
};

async function varianti(file, outDir, stem) {
  const meta = await sharp(file).metadata();
  const max = Math.min(meta.width, 2400);
  const widths = [...STD.filter((w) => w < max), max];
  await fs.mkdir(outDir, { recursive: true });
  for (const w of widths) {
    const out = (ext) => path.join(outDir, `${stem}-${w}.${ext}`);
    const enc = {
      jpg: (s) => s.jpeg({ quality: 80, mozjpeg: true }),
      webp: (s) => s.webp({ quality: 76 }),
      avif: (s) => s.avif({ quality: 52, effort: 2 }),
    };
    // il jpg serve solo come src di ripiego (la larghezza ≤ 1200): le altre larghezze escono solo in avif/webp
    const exts = w === widths.filter((x) => x <= 1200).pop() ? Object.keys(enc) : ['webp', 'avif'];
    for (const ext of exts) {
      try { await fs.access(out(ext)); } catch { await enc[ext](sharp(file).resize({ width: w })).toFile(out(ext)); }
    }
  }
  return { width: meta.width, height: meta.height, widths, src: widths.filter((w) => w <= 1200).pop() };
}

// originale ruotato secondo l'EXIF (scatti da telefono) e limitato a 2400 px
async function scarica(url, file) {
  try { await fs.access(file); return; } catch {}
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await sharp(Buffer.from(await r.arrayBuffer()))
    .rotate()
    .resize({ width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(file);
}

const out = { progetti: {}, partner: {} };
for (const [slug, lista] of Object.entries(FOTO)) {
  out.progetti[slug] = [];
  for (const [i, id] of lista.entries()) {
    const stem = `${slug}-${String(i + 1).padStart(2, '0')}`;
    const orig = path.join(CACHE, slug, `${stem}.jpg`);
    await scarica(WIX + id, orig);
    const v = await varianti(orig, path.join(ROOT, 'public/img/progetti', slug), stem);
    out.progetti[slug].push({
      src: `/img/progetti/${slug}/${stem}-${v.src}.jpg`,
      width: v.width,
      height: v.height,
      widths: v.widths,
      drawing: false,
      originale: WIX + id,
    });
    console.log(stem, `${v.width}×${v.height}`);
  }
}
// loghi: un solo file, su bianco, al massimo 480 px di lato
for (const [slug, id] of Object.entries(PARTNER)) {
  const orig = path.join(CACHE, 'partner', `${slug}.jpg`);
  await scarica(WIX + id, orig);
  const file = path.join(ROOT, 'public/img/partner', `${slug}.jpg`);
  await fs.mkdir(path.dirname(file), { recursive: true });
  const info = await sharp(orig)
    .flatten({ background: '#ffffff' })
    .resize({ width: 480, height: 480, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(file);
  out.partner[slug] = { src: `/img/partner/${slug}.jpg`, width: info.width, height: info.height, originale: WIX + id };
  console.log('logo', slug, `${info.width}×${info.height}`);
}

await fs.writeFile(path.join(ROOT, 'src/data/immagini.json'), JSON.stringify(out, null, 1) + '\n');
console.log('scritto src/data/immagini.json');
