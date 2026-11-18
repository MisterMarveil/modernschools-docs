import React, { useState } from 'react';
import { useLocation } from '@docusaurus/router';
import { useT } from './i18n';

/**
 * « Cette page vous a-t-elle aidé ? » (cahier §21.1). Aucune donnée scolaire,
 * aucun cookie : la réponse n'est transmise qu'à un outil de mesure
 * d'audience s'il est installé (dataLayer), sinon elle reste sur l'appareil.
 */
export default function Feedback() {
  const t = useT();
  const { pathname } = useLocation();
  const [state, setState] = useState<'ask' | 'why' | 'done'>('ask');
  const send = (event: string, reason?: string) => {
    const w = window as unknown as { dataLayer?: unknown[] };
    w.dataLayer?.push({ event, page: pathname, reason });
  };
  const mail = `mailto:support@modernschools.online?subject=${encodeURIComponent('Documentation : ' + pathname)}`;
  return (
    <aside className="ms-feedback" aria-live="polite">
      {state === 'ask' && (
        <>
          <span>{t.helpful}</span>
          <button type="button" className="button button--sm button--outline button--primary" onClick={() => { send('helpful_yes'); setState('done'); }}>{t.yes}</button>
          <button type="button" className="button button--sm button--outline button--secondary" onClick={() => setState('why')}>{t.no}</button>
        </>
      )}
      {state === 'why' && (
        <>
          <span>{t.why}</span>
          {t.reasons.map((r) => (
            <button key={r} type="button" className="button button--sm button--outline button--secondary" onClick={() => { send('helpful_no', r); setState('done'); }}>{r}</button>
          ))}
        </>
      )}
      {state === 'done' && (
        <span>
          {t.thanks} <a href={mail}>{t.report}</a>
        </span>
      )}
    </aside>
  );
}
