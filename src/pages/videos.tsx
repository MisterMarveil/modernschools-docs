import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { MiniTutorial, VIDEOS } from '@site/src/components/Doc';
import { useLocale } from '@site/src/components/i18n';

const C = {
  fr: { title: 'Tutoriels vidéo', lead: 'De courtes vidéos en français, de moins d’une minute, pour les gestes les plus courants. Chacune renvoie au guide écrit détaillé.', empty: 'Les tutoriels vidéo seront publiés ici prochainement.', guide: 'Lire le guide écrit' },
  en: { title: 'Video tutorials', lead: 'Short videos in French, under a minute each, for the most common tasks. Each one links to the detailed written guide.', empty: 'Video tutorials will be published here soon.', guide: 'Read the written guide' },
};

export default function Videos(): React.JSX.Element {
  const c = C[useLocale()];
  const ids = Object.keys(VIDEOS).filter((id) => VIDEOS[id].youtube || VIDEOS[id].file);
  return (
    <Layout title={c.title} description={c.lead}>
      <main className="container margin-vert--lg">
        <h1>{c.title}</h1>
        <p>{c.lead}</p>
        {ids.length === 0 ? <p>{c.empty}</p> : null}
        <div className="ms-videos">
          {ids.map((id) => (
            <div key={id}>
              <MiniTutorial id={id} />
              {VIDEOS[id].pages?.[0] ? <p><Link to={VIDEOS[id].pages![0]}>{c.guide} →</Link></p> : null}
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}
