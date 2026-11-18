# ModernSchools Documentation

Sources de **docs.modernschools.online** : guides pas à pas, mini-tutoriels vidéo, dépannage et référence développeur de ModernSchools, en français (langue par défaut) et en anglais.

Site statique [Docusaurus 3](https://docusaurus.io) ; recherche [Pagefind](https://pagefind.app) indexée à la construction ; aucun serveur applicatif.

## Démarrer

```bash
npm ci
npm start                 # aperçu FR sur http://localhost:3000
npm start -- --locale en  # aperçu EN
npm run build             # contrôles + site + index de recherche dans build/
npm run serve             # sert build/ (recherche comprise)
```

## Organisation

| Dossier | Contenu |
|---|---|
| `docs/` | articles en français (MDX), un fichier par tâche |
| `i18n/en/docusaurus-plugin-content-docs/current/` | les mêmes articles en anglais, même arborescence |
| `i18n/en/*.json` | libellés traduits : menu, pied de page, catégories |
| `src/components/` | composants d'article : `DocScreenshot`, `Hotspot`, `Procedure`/`Step`, `Prerequisite`, `ExpectedResult`, `RelatedArticles`, `MiniTutorial`, `ApiReference`, `Glossary` |
| `src/pages/` | accueil, tutoriels vidéo, support |
| `static/img/screenshots/{fr,en}/` | captures WebP de l'école fictive de démonstration |
| `static/videos/` | mini-tutoriels MP4 (secours si YouTube n'est pas renseigné) |
| `openapi/` | contrats OpenAPI des interfaces publiques (référence générée) |
| `data/videos.json` | catalogue des vidéos : titre, durée, identifiant YouTube, fichier local, articles liés |
| `data/contexts.json` | aide contextuelle : `/context/{CODE}` → article |
| `data/glossary.json` | glossaire bilingue |
| `tools/validate.mjs` | contrôles éditoriaux lancés avant chaque construction |
| `tools/images.py` | conversion des captures PNG en WebP |

## Règles éditoriales

- **Données fictives uniquement.** Les captures et exemples viennent de l'école de démonstration « Lycée Démonstration ModernSchools ». Jamais de donnée réelle d'élève, de parent ou d'enseignant, ni de mot de passe.
- **Parité FR/EN structurelle** : tout article existe dans les deux langues, au même chemin (`npm run validate` échoue sinon).
- **Rien d'annoncé qui ne soit livré.** Une fonctionnalité future porte `availability: planned` et le dit dans le texte.
- Écrire « Matricule unique ». Ne jamais suggérer d'affiliation à une administration publique.
- Chaque article déclare `title`, `description`, `type`, `product`, `audience`, `availability`, `last_verified`.
- Les captures ne sont jamais annotées : les repères sont des `<Hotspot>` positionnés en pourcentage.

## Ajouter une vidéo YouTube

1. Publier la vidéo sur YouTube (sous-titres français activés).
2. Copier l'identifiant à 11 caractères (`https://youtu.be/XXXXXXXXXXX`) dans le champ `youtube` de l'entrée correspondante de `data/videos.json`.
3. `npm run build`, puis déployer. Le lecteur YouTube (youtube-nocookie.com) n'est chargé qu'au clic du visiteur ; sans identifiant, le fichier MP4 local est lu.

## Déploiement

Voir [DEPLOYMENT.md](DEPLOYMENT.md).
