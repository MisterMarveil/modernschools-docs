import React, { useEffect, useRef, useState } from 'react';
import { useT } from './i18n';

declare global {
  interface Window { PagefindUI?: new (o: Record<string, unknown>) => unknown }
}

let chargement: Promise<void> | null = null;
function charger(js: string, css: string): Promise<void> {
  if (chargement) return chargement;
  chargement = new Promise((ok, ko) => {
    const l = document.createElement('link');
    l.rel = 'stylesheet'; l.href = css; document.head.appendChild(l);
    const s = document.createElement('script');
    s.src = js; s.onload = () => ok(); s.onerror = () => { chargement = null; ko(new Error('pagefind')); };
    document.head.appendChild(s);
  });
  return chargement;
}

/**
 * Recherche statique Pagefind (index construit après la construction du site,
 * une par langue). Le moteur n'est chargé qu'à la première utilisation.
 */
export function SearchBox({ autofocus = false }: { autofocus?: boolean }) {
  const t = useT();
  const zone = useRef<HTMLDivElement>(null);
  const js = '/pagefind/pagefind-ui.js';
  const css = '/pagefind/pagefind-ui.css';
  const [erreur, setErreur] = useState(false);
  useEffect(() => {
    let vivant = true;
    charger(js, css).then(() => {
      if (!vivant || !zone.current || !window.PagefindUI) return;
      zone.current.innerHTML = '';
      new window.PagefindUI({ element: zone.current, showSubResults: true, showImages: false, resetStyles: false, translations: { placeholder: t.searchPlaceholder } });
      if (autofocus) setTimeout(() => zone.current?.querySelector('input')?.focus(), 50);
    }).catch(() => setErreur(true));
    return () => { vivant = false; };
  }, [js, css]);
  return (
    <div className="ms-search">
      <div ref={zone} />
      {erreur ? <p className="ms-search__off">{t.searchOff}</p> : null}
    </div>
  );
}

export function SearchButton() {
  const t = useT();
  const [ouvert, setOuvert] = useState(false);
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !/input|textarea/i.test((e.target as HTMLElement).tagName))) { e.preventDefault(); setOuvert(true); }
      if (e.key === 'Escape') setOuvert(false);
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, []);
  return (
    <>
      <button type="button" className="ms-searchbtn" onClick={() => setOuvert(true)} aria-label={t.search}>
        <span aria-hidden="true">⌕</span> <span className="ms-searchbtn__label">{t.search}</span>
      </button>
      {ouvert && (
        <div className="ms-searchmodal" role="dialog" aria-modal="true" aria-label={t.search} onClick={(e) => e.target === e.currentTarget && setOuvert(false)}>
          <div className="ms-searchmodal__box">
            <button type="button" className="ms-searchmodal__close" onClick={() => setOuvert(false)} aria-label={t.close}>×</button>
            <SearchBox autofocus />
          </div>
        </div>
      )}
    </>
  );
}
