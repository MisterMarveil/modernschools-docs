import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { SearchBox } from '@site/src/components/Search';
import { useLocale } from '@site/src/components/i18n';

/** Accueil (cahier §5) : recherche, accès par tâche, par rôle et questions fréquentes. */
const C = {
  fr: {
    title: 'Documentation ModernSchools',
    lead: 'Guides pas à pas, mini-tutoriels vidéo et dépannage pour les établissements qui utilisent ModernSchools.',
    tasks: 'Les tâches les plus demandées',
    cards: [
      ['/getting-started/find-school', 'Trouver mon établissement', "Ouvrir l'adresse de son école"],
      ['/getting-started/sign-in', 'Se connecter', 'Première connexion et mot de passe'],
      ['/onboarding/new-school', 'Inscrire un établissement', 'Le dossier en ligne, étape par étape'],
      ['/structure/initial-setup', 'Configuration initiale', 'Classes, matières et périodes depuis un modèle'],
      ['/students/import', 'Importer les élèves', 'Le fichier modèle, contrôlé avant écriture'],
      ['/students/photos', "Photos d'élèves", 'Un ZIP par lot, vérifié puis validé'],
      ['/grades/enter-grades', 'Saisir les notes', "Pour l'enseignant"],
      ['/documents/report-cards', 'Générer les bulletins', "Par classe et par période"],
    ],
    roles: 'Par rôle',
    roleList: [
      ['Administration', [['/structure/initial-setup', 'Configuration initiale'], ['/users/create-teacher', 'Comptes enseignants'], ['/users/roles', 'Rôles et accès']]],
      ['Secrétariat', [['/students/add', 'Ajouter un élève'], ['/students/import', 'Importer des élèves'], ['/documents/id-cards', 'Cartes scolaires']]],
      ['Enseignant', [['/getting-started/sign-in', 'Se connecter'], ['/grades/enter-grades', 'Saisir les notes'], ['/getting-started/my-profile', 'Mon profil']]],
      ['Direction', [['/class-council/run', 'Conseil de classe'], ['/analytics/overview', 'Statistiques'], ['/onboarding/existing-school', 'Mon établissement']]],
    ] as Array<[string, string[][]]>,
    faq: 'Questions fréquentes',
    faqList: [
      ['/troubleshooting/school-not-found', 'Je ne trouve pas mon établissement'],
      ['/troubleshooting/sign-in', "J'ai oublié mon mot de passe"],
      ['/troubleshooting/student-duplicate', 'Un élève « existe déjà »'],
      ['/troubleshooting/import-errors', 'Mon fichier d’import est refusé'],
      ['/students/identity', 'Qu’est-ce que le matricule unique ?'],
      ['/archives/overview', 'Où sont les années précédentes ?'],
    ],
    videos: 'Voir les tutoriels vidéo',
  },
  en: {
    title: 'ModernSchools Documentation',
    lead: 'Step-by-step guides, video mini-tutorials and troubleshooting for schools that use ModernSchools.',
    tasks: 'Most requested tasks',
    cards: [
      ['/getting-started/find-school', 'Find my school', "Open your school's address"],
      ['/getting-started/sign-in', 'Sign in', 'First sign-in and password'],
      ['/onboarding/new-school', 'Register a school', 'The online file, step by step'],
      ['/structure/initial-setup', 'Initial setup', 'Classes, subjects and periods from a template'],
      ['/students/import', 'Import students', 'The template, checked before writing'],
      ['/students/photos', 'Student photos', 'One ZIP per batch, checked then validated'],
      ['/grades/enter-grades', 'Enter marks', 'For teachers'],
      ['/documents/report-cards', 'Generate report cards', 'By class and period'],
    ],
    roles: 'By role',
    roleList: [
      ['Administration', [['/structure/initial-setup', 'Initial setup'], ['/users/create-teacher', 'Teacher accounts'], ['/users/roles', 'Roles and access']]],
      ['Secretariat', [['/students/add', 'Add a student'], ['/students/import', 'Import students'], ['/documents/id-cards', 'School ID cards']]],
      ['Teacher', [['/getting-started/sign-in', 'Sign in'], ['/grades/enter-grades', 'Enter marks'], ['/getting-started/my-profile', 'My profile']]],
      ['Management', [['/class-council/run', 'Class council'], ['/analytics/overview', 'Statistics'], ['/onboarding/existing-school', 'My school']]],
    ] as Array<[string, string[][]]>,
    faq: 'Frequently asked questions',
    faqList: [
      ['/troubleshooting/school-not-found', 'I cannot find my school'],
      ['/troubleshooting/sign-in', 'I forgot my password'],
      ['/troubleshooting/student-duplicate', 'A student “already exists”'],
      ['/troubleshooting/import-errors', 'My import file is refused'],
      ['/students/identity', 'What is the unique matricule?'],
      ['/archives/overview', 'Where are previous years?'],
    ],
    videos: 'Watch the video tutorials',
  },
};

export default function Home(): React.JSX.Element {
  const c = C[useLocale()];
  return (
    <Layout title={c.title} description={c.lead}>
      <header className="ms-hero">
        <div className="container">
          <h1>{c.title}</h1>
          <p>{c.lead}</p>
          <SearchBox />
        </div>
      </header>
      <main>
        <section className="ms-section container">
          <h2>{c.tasks}</h2>
          <div className="ms-grid">
            {c.cards.map(([to, title, text]) => (
              <Link key={to} to={to} className="ms-card"><strong>{title}</strong><span>{text}</span></Link>
            ))}
          </div>
          <p style={{ marginTop: '1rem' }}><Link to="/videos">▶ {c.videos}</Link></p>
        </section>
        <section className="ms-section container">
          <h2>{c.roles}</h2>
          <div className="ms-roles">
            {c.roleList.map(([role, links]) => (
              <div key={role} className="ms-card">
                <strong>{role}</strong>
                <ul>{links.map(([to, l]) => <li key={to}><Link to={to}>{l}</Link></li>)}</ul>
              </div>
            ))}
          </div>
        </section>
        <section className="ms-section container">
          <h2>{c.faq}</h2>
          <ul className="ms-faq">{c.faqList.map(([to, q]) => <li key={to}><Link to={to}>{q}</Link></li>)}</ul>
        </section>
      </main>
    </Layout>
  );
}
