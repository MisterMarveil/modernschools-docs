# Mini-tutoriels vidéo

Sources des vidéos de `docs.modernschools.online/videos`, rendues avec Animation Machine (HTML → MP4, 1080p, narration IA en français).

- `player.js`, `player.css` : le lecteur commun (GSAP) — titre, captures réelles de l'école fictive, zoom sur la zone utile, cadre de repère, consigne numérotée.
- `<id>.js` : les scènes d'un tutoriel (capture, durée, consigne, zone `focus` en pourcentage).
- `videos.json` : titre, durée totale, articles liés et **texte de la narration**.
- `index.html?v=<id>` : aperçu local dans un navigateur.

Pour le rendu, la page envoyée au moteur définit `window.ASSETS` (dossier des captures) et charge `player.js`, `<id>.js` et les captures depuis jsDelivr, épinglés sur un commit de ce dépôt (`https://cdn.jsdelivr.net/gh/MisterMarveil/modernschools-docs@<commit>/…`).

Les MP4 produits sont publiés dans `static/videos/` (secours) et déclarés dans `data/videos.json` ; une fois mises en ligne sur YouTube, renseigner leur identifiant dans ce même fichier.
