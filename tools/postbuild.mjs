// Après la construction : un seul .htaccess (celui de la racine) et un index de recherche par langue.
//
// Docusaurus copie static/ dans chaque langue : build/en/.htaccess remplaçait alors les règles
// de la racine pour /en/… et sa règle « dossier → index.html » renvoyait /en/ vers l'accueil
// français (/index.html), d'où une page « introuvable » et une recherche absente en anglais.
import fs from 'node:fs';
import path from 'node:path';

const build = path.resolve('build');
let retires = 0;
for (const entree of fs.readdirSync(build, { withFileTypes: true })) {
  const f = path.join(build, entree.name, '.htaccess');
  if (entree.isDirectory() && fs.existsSync(f)) { fs.unlinkSync(f); retires++; }
}
const erreurs = [];
if (!fs.existsSync(path.join(build, '.htaccess'))) erreurs.push('build/.htaccess absent');
const pf = path.join(build, 'pagefind');
if (!fs.existsSync(path.join(pf, 'pagefind-ui.js'))) erreurs.push('index de recherche absent (build/pagefind) : lancer « npm run build », pas « docusaurus build » seul');
else {
  const metas = fs.readdirSync(pf).filter((n) => n.endsWith('.pf_meta'));
  for (const l of ['fr', 'en']) if (!metas.some((n) => n.startsWith(`pagefind.${l}_`))) erreurs.push(`index de recherche « ${l} » absent`);
}
if (erreurs.length) { console.error('postbuild : ' + erreurs.join(' ; ')); process.exit(1); }
console.log(`postbuild : ${retires} .htaccess de langue retiré(s), index de recherche fr et en présents.`);
