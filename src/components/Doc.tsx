import React, { type ReactNode, useState } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useT, useLocale } from './i18n';
import videos from '@site/data/videos.json';

/* ------------------------------------------------------------------ Captures */

/**
 * Capture réelle de l'interface (école fictive « Lycée Démonstration
 * ModernSchools »). `src` est relatif à static/img/screenshots/<langue>/ et
 * sans extension : la version de la langue de la page est choisie.
 * Les repères sont superposés en HTML : l'image maîtresse n'est jamais annotée.
 */
export function DocScreenshot({ src, alt, caption, children }: { src: string; alt: string; caption?: ReactNode; children?: ReactNode }) {
  const locale = useLocale();
  const url = useBaseUrl(`/img/screenshots/${locale}/${src}.webp`);
  return (
    <figure className="ms-shot">
      <div className="ms-shot__frame">
        <img src={url} alt={alt} loading="lazy" decoding="async" width={1600} height={1000} />
        {children}
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

/** Repère numéroté posé sur une capture (x, y en % de l'image). */
export function Hotspot({ number, x, y, label }: { number: number; x: number; y: number; label?: string }) {
  const t = useT();
  return (
    <span className="ms-hotspot" style={{ left: `${x}%`, top: `${y}%` }} tabIndex={0} role="note" aria-label={`${t.hotspot} ${number}${label ? ' : ' + label : ''}`}>
      {number}
      {label ? <span className="ms-hotspot__tip">{label}</span> : null}
    </span>
  );
}

/* ------------------------------------------------------------------ Procédure */

export function Procedure({ children }: { children: ReactNode }) {
  return <ol className="ms-procedure">{children}</ol>;
}

export function Step({ title, children }: { title: ReactNode; children?: ReactNode }) {
  return (
    <li className="ms-step">
      <p className="ms-step__title">{title}</p>
      {children}
    </li>
  );
}

export function Prerequisite({ children }: { children: ReactNode }) {
  const t = useT();
  return (
    <div className="ms-box ms-box--prereq">
      <p className="ms-box__title">{t.prerequisites}</p>
      {children}
    </div>
  );
}

export function ExpectedResult({ children }: { children: ReactNode }) {
  const t = useT();
  return (
    <div className="ms-box ms-box--result">
      <p className="ms-box__title">✓ {t.expected}</p>
      {children}
    </div>
  );
}

export function ExternalPlatformNotice({ name }: { name: string }) {
  const t = useT();
  return (
    <div className="ms-box ms-box--external" role="note">
      <p className="ms-box__title">{t.external} — {name}</p>
      <p>{t.externalText}</p>
    </div>
  );
}

export function RelatedArticles({ items }: { items: Array<{ to: string; label: string }> }) {
  const t = useT();
  return (
    <nav className="ms-related" aria-label={t.related}>
      <p className="ms-box__title">{t.related}</p>
      <ul>
        {items.map((i) => (
          <li key={i.to}>
            <Link to={i.to}>{i.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ------------------------------------------------------------------ Badges */

export function ProductBadge({ product }: { product: string }) {
  const t = useT();
  return <span className={`ms-badge ms-badge--product ms-badge--${product}`}>{t.product[product] ?? product}</span>;
}

export function RoleBadge({ role }: { role: string }) {
  const t = useT();
  return <span className="ms-badge ms-badge--role">{t.role[role] ?? role}</span>;
}

export function AvailabilityBadge({ status }: { status: string }) {
  const t = useT();
  return <span className={`ms-badge ms-badge--${status}`}>{t.availability[status] ?? status}</span>;
}

/* ------------------------------------------------------------------ Vidéo */

type Video = { title: Record<string, string>; duration: string; youtube?: string; file?: string; poster?: string; pages?: string[] };
export const VIDEOS = videos as unknown as Record<string, Video>;

/**
 * Mini-tutoriel (cahier §17). Lecture YouTube en mode confidentialité
 * renforcée, chargée seulement au clic ; à défaut, le fichier MP4 hébergé
 * avec la documentation. Sans l'un ni l'autre, rien n'est affiché.
 */
export function MiniTutorial({ id }: { id: string }) {
  const t = useT();
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const v = VIDEOS[id];
  const poster = useBaseUrl(v?.poster ?? '/img/brand/og-docs.png');
  const file = useBaseUrl(v?.file ?? '');
  if (!v || (!v.youtube && !v.file)) return null;
  const title = v.title[locale] ?? v.title.fr;
  return (
    <section className="ms-video" aria-label={t.video}>
      <p className="ms-box__title">
        ▶ {t.video} · {title} <span className="ms-video__duration">({v.duration})</span>
      </p>
      <div className="ms-video__frame">
        {v.youtube && open ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${v.youtube}?autoplay=1&rel=0&cc_load_policy=1&hl=${locale}`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : v.youtube ? (
          <button type="button" className="ms-video__facade" onClick={() => setOpen(true)} aria-label={`${t.play} : ${title}`}>
            <img src={poster} alt="" loading="lazy" />
            <span className="ms-video__play" aria-hidden="true">▶</span>
          </button>
        ) : (
          <video controls preload="none" poster={poster} src={file}>
            {title}
          </video>
        )}
      </div>
      {v.youtube ? <p className="ms-video__note">{t.videoYoutube}</p> : null}
    </section>
  );
}
