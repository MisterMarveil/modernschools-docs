import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { useLocale } from '@site/src/components/i18n';

const C = {
  fr: {
    title: 'Support', lead: "L'équipe BRIDGE accompagne les établissements qui utilisent ModernSchools.",
    before: 'Avant d’écrire', beforeList: ['Consultez le [dépannage].', "Notez l'adresse de votre école, l'écran concerné et le message affiché."],
    contact: 'Nous contacter', email: 'E-mail', whatsapp: 'WhatsApp',
    never: 'Ne jamais envoyer', neverList: ['un mot de passe, même provisoire ;', "un fichier contenant des données d'élèves (listes, photos, exports) ;", 'une capture qui montre des informations personnelles.'],
    neverNote: "Si un fichier est nécessaire au diagnostic, l'équipe BRIDGE vous indiquera un moyen de transfert sécurisé.",
    trouble: 'dépannage',
  },
  en: {
    title: 'Support', lead: 'The BRIDGE team supports schools that use ModernSchools.',
    before: 'Before writing', beforeList: ['Check [troubleshooting].', "Note your school's address, the screen concerned and the message shown."],
    contact: 'Contact us', email: 'E-mail', whatsapp: 'WhatsApp',
    never: 'Never send', neverList: ['a password, even a temporary one;', 'a file containing student data (lists, photos, exports);', 'a screenshot showing personal information.'],
    neverNote: 'If a file is needed for diagnosis, the BRIDGE team will give you a secure transfer method.',
    trouble: 'troubleshooting',
  },
};

export default function Support(): React.JSX.Element {
  const c = C[useLocale()];
  const [avant, apres] = c.beforeList[0].split(/\[[^\]]+\]/);
  return (
    <Layout title={c.title} description={c.lead}>
      <main className="container margin-vert--lg" style={{ maxWidth: 820 }}>
        <h1>{c.title}</h1>
        <p>{c.lead}</p>
        <h2>{c.before}</h2>
        <ul>
          <li>{avant}<Link to="/troubleshooting">{c.trouble}</Link>{apres}</li>
          <li>{c.beforeList[1]}</li>
        </ul>
        <h2>{c.contact}</h2>
        <ul>
          <li>{c.email} : <a href="mailto:support@modernschools.online">support@modernschools.online</a></li>
          <li>{c.whatsapp} : <a href="https://wa.me/237691919116">+237 691 91 91 16</a></li>
        </ul>
        <div className="ms-box ms-box--external">
          <p className="ms-box__title">{c.never}</p>
          <ul>{c.neverList.map((l) => <li key={l}>{l}</li>)}</ul>
          <p>{c.neverNote}</p>
        </div>
      </main>
    </Layout>
  );
}
