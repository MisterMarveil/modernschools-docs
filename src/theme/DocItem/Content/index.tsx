import React from 'react';
import Content from '@theme-original/DocItem/Content';
import type ContentType from '@theme/DocItem/Content';
import type { WrapperProps } from '@docusaurus/types';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { ProductBadge, RoleBadge, AvailabilityBadge, MiniTutorial } from '@site/src/components/Doc';
import Feedback from '@site/src/components/Feedback';
import { useT } from '@site/src/components/i18n';

type Props = WrapperProps<typeof ContentType>;

/** En-tête d'article (produit, rôles, durée, disponibilité), vidéo et retour lecteur. */
export default function ContentWrapper(props: Props): React.JSX.Element {
  const { frontMatter } = useDoc();
  const fm = frontMatter as Record<string, unknown>;
  const t = useT();
  const products = (fm.product as string[] | undefined) ?? [];
  const roles = (fm.audience as string[] | undefined) ?? [];
  const showMeta = products.length > 0 || roles.length > 0;
  return (
    <>
      {showMeta && (
        <div className="ms-meta">
          {products.map((p) => <ProductBadge key={p} product={p} />)}
          {roles.map((r) => <RoleBadge key={r} role={r} />)}
          {fm.availability && fm.availability !== 'available' ? <AvailabilityBadge status={String(fm.availability)} /> : null}
          {fm.estimated_time ? <span className="ms-meta__time">⏱ {t.duration} : {String(fm.estimated_time)}</span> : null}
        </div>
      )}
      <div data-pagefind-body>
        <Content {...props} />
      </div>
      {fm.video ? <MiniTutorial id={String(fm.video)} /> : null}
      <Feedback />
    </>
  );
}
