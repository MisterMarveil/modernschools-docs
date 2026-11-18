"""Convertit les captures PNG en WebP pour le site.

Usage : python3 tools/images.py <dossier_captures>
  <dossier_captures>/{fr,en}/<chemin>.png → static/img/screenshots/{fr,en}/<chemin>.webp

Les captures proviennent exclusivement de l'école fictive « Lycée Démonstration
ModernSchools » : aucune donnée réelle d'élève. Largeur maximale 1600 px.
"""
import os, sys
from PIL import Image

SRC = sys.argv[1] if len(sys.argv) > 1 else 'captures'
DST = os.path.join(os.path.dirname(__file__), '..', 'static', 'img', 'screenshots')
n = 0
for lang in ('fr', 'en'):
    base = os.path.join(SRC, lang)
    for root, _, files in os.walk(base):
        for f in files:
            if not f.endswith('.png'):
                continue
            rel = os.path.relpath(os.path.join(root, f), base)[:-4]
            out = os.path.join(DST, lang, rel + '.webp')
            os.makedirs(os.path.dirname(out), exist_ok=True)
            im = Image.open(os.path.join(root, f)).convert('RGB')
            if im.width > 1600:
                im = im.resize((1600, round(im.height * 1600 / im.width)), Image.LANCZOS)
            im.save(out, 'WEBP', quality=82, method=6)
            n += 1
print(f'{n} captures converties')
