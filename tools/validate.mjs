// Contrôles éditoriaux avant construction (cahier §21) :
//  - contrats OpenAPI YAML → JSON (src/data/openapi) ;
//  - parité structurelle FR/EN : chaque article existe dans les deux langues ;
//  - métadonnées obligatoires ;
//  - captures présentes dans les deux langues ;
//  - formulations interdites ;
//  - aide contextuelle et vidéos pointant vers des articles existants.
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const FR = path.join(ROOT, 'docs');
const EN = path.join(ROOT, 'i18n/en/docusaurus-plugin-content-docs/current');
const errors = [];

// 1. OpenAPI
fs.mkdirSync(path.join(ROOT, 'src/data/openapi'), { recursive: true });
for (const f of fs.readdirSync(path.join(ROOT, 'openapi')).filter((f) => f.endsWith('.yaml'))) {
  const spec = parse(fs.readFileSync(path.join(ROOT, 'openapi', f), 'utf8'));
  if (!spec.openapi || !spec.paths) errors.push(`openapi/${f} : contrat invalide`);
  fs.writeFileSync(path.join(ROOT, 'src/data/openapi', f.replace('.yaml', '.json')), JSON.stringify(spec));
}

// 2. Articles
const walk = (d) => fs.existsSync(d) ? fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(d, e.name)) : /\.mdx?$/.test(e.name) ? [path.join(d, e.name)] : []) : [];
const rel = (base) => new Set(walk(base).map((f) => path.relative(base, f)));
const fr = rel(FR), en = rel(EN);
for (const f of fr) if (!en.has(f)) errors.push(`${f} : traduction anglaise manquante`);
for (const f of en) if (!fr.has(f)) errors.push(`${f} : article anglais sans original français`);

const REQUIRED = ['title', 'description', 'type', 'product', 'audience', 'availability', 'last_verified'];
const BANNED = [
  [/matricule\s+minesec/i, '« Matricule MINESEC » : écrire « Matricule unique »'],
  [/smart tools for smart schools/i, 'slogan retiré'],
  [/(partenaire|agréé|affilié)[^.\n]{0,40}minesec|minesec[^.\n]{0,40}(partenaire|agréé|affilié)/i, 'affiliation MINESEC sous-entendue'],
];
const routes = new Set();
const shots = [];
for (const [base, lang, files] of [[FR, 'fr', fr], [EN, 'en', en]]) {
  for (const f of files) {
    const src = fs.readFileSync(path.join(base, f), 'utf8');
    const m = src.match(/^---\n([\s\S]*?)\n---/);
    if (!m) { errors.push(`${lang}/${f} : métadonnées absentes`); continue; }
    const fm = parse(m[1]);
    for (const k of REQUIRED) if (fm[k] === undefined) errors.push(`${lang}/${f} : métadonnée « ${k} » manquante`);
    if (fm.availability === 'planned' && !/planifi|planned/i.test(src.slice(m[0].length))) errors.push(`${lang}/${f} : fonctionnalité planifiée non signalée dans le texte`);
    for (const [re, why] of BANNED) if (re.test(src)) errors.push(`${lang}/${f} : ${why}`);
    if (lang === 'fr') routes.add(fm.slug ?? '/' + f.replace(/\.mdx?$/, '').replace(/\/index$/, ''));
    for (const s of src.matchAll(/<DocScreenshot\s+src="([^"]+)"/g)) shots.push([lang, s[1], f]);
  }
}
for (const [lang, s, f] of shots) {
  if (!fs.existsSync(path.join(ROOT, 'static/img/screenshots', lang, s + '.webp'))) errors.push(`${lang}/${f} : capture absente ${lang}/${s}.webp (npm run images)`);
}

// 3. Aide contextuelle et vidéos
const contexts = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/contexts.json'), 'utf8'));
for (const [code, to] of Object.entries(contexts)) {
  if (!/^[A-Z0-9-]+$/.test(code)) errors.push(`contexts.json : code invalide ${code}`);
  if (!routes.has(to)) errors.push(`contexts.json : ${code} → ${to} n'existe pas`);
}
const videos = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/videos.json'), 'utf8'));
for (const [id, v] of Object.entries(videos)) {
  if (!v.title?.fr || !v.title?.en || !v.duration) errors.push(`videos.json : ${id} incomplet (title.fr, title.en, duration)`);
  if (v.youtube && !/^[A-Za-z0-9_-]{11}$/.test(v.youtube)) errors.push(`videos.json : ${id} identifiant YouTube invalide`);
  if (v.file && !fs.existsSync(path.join(ROOT, 'static', v.file))) errors.push(`videos.json : ${id} fichier absent static${v.file}`);
  for (const p of v.pages ?? []) if (!routes.has(p)) errors.push(`videos.json : ${id} → ${p} n'existe pas`);
}

if (errors.length) {
  console.error(`✗ ${errors.length} problème(s) :\n  - ` + errors.join('\n  - '));
  process.exit(1);
}
console.log(`✓ ${fr.size} articles FR/EN, ${shots.length} captures, ${Object.keys(contexts).length} codes contextuels, ${Object.keys(videos).length} vidéos`);
