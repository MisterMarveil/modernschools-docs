/*
 * Lecteur des mini-tutoriels ModernSchools.
 * Chaque tutoriel (tools/videos/<id>.js) définit window.TOTAL et window.D :
 * titre, sous-titre et scènes { src, w, h, dur, text, focus:[x,y,l,h] en pourcentage, maxZoom }.
 * Les images sont les captures publiées de l'école fictive de démonstration.
 */
(function () {
document.body.insertAdjacentHTML('afterbegin', "<div id=\"stage\">\n<div id=\"bg\"></div>\n<div id=\"brand\"><b>M</b>ModernSchools <span>Tutoriel</span></div>\n<div id=\"step\"></div>\n<div id=\"frame\"></div>\n<div id=\"cap\"><div id=\"num\">1</div><div id=\"txt\"></div></div>\n<div id=\"demo\">\u00c9cole fictive de d\u00e9monstration</div>\n<div id=\"title\"><small>Tutoriel ModernSchools</small><h1></h1><p></p></div>\n</div>\n");
const D = window.D;
const BASE = document.currentScript.src.replace(/tools\/videos\/player\.js.*$/, 'static/img/screenshots/fr/');
D.scenes.forEach((s) => { if (!/^https?:/.test(s.src)) s.src = BASE + s.src + '.webp'; });
const FW = 1800, FH = 780;
const fit = () => { document.getElementById('stage').style.transform = 'scale(' + Math.min(innerWidth / 1920, innerHeight / 1080) + ')'; };
fit(); addEventListener('resize', fit);
document.querySelector('#title h1').textContent = D.title;
document.querySelector('#title p').textContent = D.subtitle;
const frame = document.getElementById('frame');
const tl = gsap.timeline();
// Écran titre
tl.to('#title', {opacity: 0, duration: .6}, 2.9);
let t = 3.5;
D.scenes.forEach((s, i) => {
  const sc = document.createElement('div'); sc.className = 'scene';
  const cam = document.createElement('div'); cam.className = 'cam';
  const img = new Image(); img.src = s.src; img.width = s.w; img.height = s.h;
  cam.appendChild(img); sc.appendChild(cam);
  const ring = document.createElement('div'); ring.className = 'ring'; sc.appendChild(ring);
  frame.appendChild(sc);
  // Vue d'ensemble : largeur du cadre, haut de page
  const s0 = FW / s.w;
  const f = s.focus || [0, 0, 100, 100];
  const fx = f[0] / 100 * s.w, fy = f[1] / 100 * s.h, fw = f[2] / 100 * s.w, fh = f[3] / 100 * s.h;
  let s1 = Math.min(FW * .82 / fw, FH * .72 / fh, s.maxZoom || 2.1); s1 = Math.max(s1, s0);
  const tx = Math.min(0, Math.max(FW - s.w * s1, FW / 2 - (fx + fw / 2) * s1));
  const ty = Math.min(0, Math.max(FH - s.h * s1, FH / 2 - (fy + fh / 2) * s1));
  const ty0 = Math.min(0, Math.max(FH - s.h * s0, FH / 2 - (fy + fh / 2) * s0));
  gsap.set(cam, {scale: s0, x: 0, y: ty0});
  gsap.set(ring, {left: tx + fx * s1 - 12, top: ty + fy * s1 - 12, width: fw * s1 + 24, height: fh * s1 + 24});
  tl.set('#txt', {textContent: s.text}, t);
  tl.set('#num', {textContent: String(i + 1)}, t);
  tl.set('#step', {textContent: `Étape ${i + 1} / ${D.scenes.length}`}, t);
  tl.fromTo('#cap', {opacity: 0, y: 20}, {opacity: 1, y: 0, duration: .5}, t);
  tl.to(sc, {opacity: 1, duration: .6}, t);
  if (s.focus) {
    tl.to(cam, {scale: s1, x: tx, y: ty, duration: 1.6, ease: 'power2.inOut'}, t + 1.0);
    tl.to(ring, {opacity: 1, duration: .5}, t + 2.6);
  }
  t += s.dur;
  if (i < D.scenes.length - 1) tl.to(sc, {opacity: 0, duration: .5}, t - .3);
});
tl.to({}, {duration: Math.max(0, window.TOTAL - tl.duration())});
window.tl = tl;
})();
