# Déploiement de docs.modernschools.online

Le site est un dossier de fichiers statiques (`build/`) servi par Apache 2.4. Node.js ne sert qu'à le construire.

## 1. DNS et certificat

- Enregistrement `A` (ou `CNAME`) `docs.modernschools.online` vers le serveur web.
- Certificat TLS : `certbot --apache -d docs.modernschools.online`.

## 2. Hôte virtuel Apache

Modules : `rewrite`, `headers`, `expires` (`a2enmod rewrite headers expires`).

```apache
<VirtualHost *:443>
  ServerName docs.modernschools.online
  DocumentRoot /var/www/docs.modernschools.online
  <Directory /var/www/docs.modernschools.online>
    AllowOverride All
    Require all granted
  </Directory>
  # SSLEngine on … (certbot)
</VirtualHost>
<VirtualHost *:80>
  ServerName docs.modernschools.online
  Redirect permanent / https://docs.modernschools.online/
</VirtualHost>
```

Le fichier `static/.htaccess`, copié dans `build/`, assure : adresses sans `.html` ni barre finale, pages 404 par langue (statut 404 conservé), en-têtes de sécurité (CSP autorisant seulement `www.youtube-nocookie.com` en cadre) et mise en cache.

## 3. Construire et publier

Sur le poste de construction (Node.js 20 ou plus) :

```bash
git pull
npm ci
npm run build
rsync -av --delete build/ deploy@SERVEUR:/var/www/docs.modernschools.online/
```

La publication se fait de serveur à serveur (`rsync`/`scp` sur SSH). Aucun secret n'est stocké dans ce dépôt.

## 4. Vérifier

```bash
curl -sI https://docs.modernschools.online/students/photos | head -1      # 200
curl -sI https://docs.modernschools.online/en/students/photos | head -1   # 200
curl -sI https://docs.modernschools.online/inexistant | head -1           # 404
curl -sI https://docs.modernschools.online/context/PHOTOS | head -1       # 200 (redirection côté navigateur)
curl -sI https://docs.modernschools.online/pagefind/pagefind-ui.js | head -1
```

Puis, dans un navigateur : rechercher « bulletin » sur l'accueil français et « report card » sur l'accueil anglais ; ouvrir une page avec vidéo.

## 5. Vidéos

- **YouTube** : renseigner l'identifiant dans `data/videos.json`, reconstruire, republier.
- **Secours local** : les MP4 de `static/videos/` sont publiés avec le site et lus si aucun identifiant YouTube n'est renseigné.

## 6. Retour arrière

Conserver la publication précédente (`/var/www/docs.modernschools.online.prev`) avant chaque `rsync` ; en cas de problème, rétablir ce dossier.
