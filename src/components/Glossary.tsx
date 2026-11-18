import React from 'react';
import glossary from '@site/data/glossary.json';
import { useT, useLocale } from './i18n';

type Entry = { fr: string; en: string; def_fr: string; def_en: string };

/** Glossaire bilingue (data/glossary.json), trié dans la langue de la page. */
export default function Glossary() {
  const t = useT().glossary;
  const locale = useLocale();
  const other = locale === 'fr' ? 'en' : 'fr';
  const items = [...(glossary as Entry[])].sort((a, b) => a[locale].localeCompare(b[locale], locale));
  return (
    <table>
      <thead><tr><th>{t.term}</th><th>{t.en}</th><th>{t.definition}</th></tr></thead>
      <tbody>
        {items.map((e) => (
          <tr key={e.fr} id={e[locale].toLowerCase().normalize('NFD').replace(/[^a-z0-9]+/g, '-')}>
            <td><strong>{e[locale]}</strong></td>
            <td>{e[other]}</td>
            <td>{locale === 'fr' ? e.def_fr : e.def_en}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
