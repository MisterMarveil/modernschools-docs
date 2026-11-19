import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/** Navigation par tâche (cahier §6). Les libellés sont traduits dans i18n/en/…/current.json. */
const sidebars: SidebarsConfig = {
  documentation: [
    {
      type: 'category', label: 'Bien démarrer', collapsed: false,
      link: { type: 'doc', id: 'getting-started/index' },
      items: ['getting-started/find-school', 'getting-started/sign-in', 'getting-started/dashboard', 'getting-started/my-profile'],
    },
    {
      type: 'category', label: 'Inscription et onboarding',
      items: ['onboarding/new-school', 'onboarding/existing-school', 'onboarding/commercial-code', 'onboarding/school-identity'],
    },
    {
      type: 'category', label: 'Structure de l’établissement',
      items: ['structure/overview', 'structure/initial-setup', 'structure/create-group', 'structure/create-class', 'structure/subjects'],
    },
    {
      type: 'category', label: 'Élèves',
      items: ['students/add', 'students/edit', 'students/change-class', 'students/import', 'students/photos', 'students/identity'],
    },
    { type: 'category', label: 'Utilisateurs et rôles', items: ['users/create-teacher', 'users/roles'] },
    {
      type: 'category', label: 'Évaluations et notes',
      items: ['evaluations/periods', 'evaluations/configure-periods', 'grades/enter-grades', 'grades/edit-grades'],
    },
    {
      type: 'category', label: 'Documents',
      link: { type: 'doc', id: 'documents/index' },
      items: ['documents/report-cards', 'documents/results-minutes', 'documents/honour-roll', 'documents/id-cards'],
    },
    { type: 'category', label: 'Conseils et discipline', items: ['class-council/run', 'discipline/rules'] },
    { type: 'category', label: 'Statistiques et archives', items: ['analytics/overview', 'archives/overview'] },
    {
      type: 'category', label: 'Dépannage',
      link: { type: 'doc', id: 'troubleshooting/index' },
      items: ['troubleshooting/school-not-found', 'troubleshooting/sign-in', 'troubleshooting/student-duplicate', 'troubleshooting/import-errors'],
    },
    {
      type: 'category', label: 'Développeurs',
      link: { type: 'doc', id: 'developers/index' },
      items: ['developers/directory-api'],
    },
    'glossary',
    'whats-new',
  ],
};

export default sidebars;
