import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

/** Libellés des composants : français par défaut, anglais pour /en. */
const T = {
  fr: {
    product: { web: 'Application web', mobile: 'ModernSchools Mobile', portal: 'Site officiel', desk: 'ModernSchools Desk', api: 'API publique' } as Record<string, string>,
    role: { 'school-admin': 'Administration', direction: 'Direction', secretary: 'Secrétariat', 'studies-manager': 'Responsable des études', teacher: 'Enseignant', 'school-life': 'Vie scolaire', 'it-manager': 'Responsable informatique', prospect: 'Établissement candidat', developer: 'Développeur' } as Record<string, string>,
    availability: { available: 'Disponible', beta: 'Bêta', planned: 'Planifié', retired: 'Retiré' } as Record<string, string>,
    duration: 'Durée', prerequisites: 'Prérequis', expected: 'Résultat attendu', related: 'Articles associés',
    video: 'Mini-tutoriel vidéo', play: 'Lire la vidéo', videoYoutube: 'Lecture sur YouTube (youtube-nocookie.com) : aucun contenu YouTube n’est chargé avant votre clic.',
    helpful: 'Cette page vous a-t-elle aidé ?', yes: 'Oui', no: 'Non', thanks: 'Merci pour votre retour.', why: 'Qu’est-ce qui n’allait pas ?',
    reasons: ['Information manquante', 'Interface différente', 'Difficile à comprendre', 'Procédure incorrecte', 'Autre'],
    report: 'Écrire au support à propos de cette page', external: 'Plateforme externe',
    externalText: 'Cette capture montre une plateforme officielle distincte de ModernSchools. ModernSchools n’y est pas affilié.',
    hotspot: 'Repère', search: 'Rechercher', searchPlaceholder: 'ajouter un élève, bulletin, connexion…', close: 'Fermer',
    planned: 'Cette fonctionnalité est planifiée : elle n’est pas encore disponible.',
    searchOff: 'La recherche est disponible sur le site publié (index Pagefind).',
    api: { arrayOf: 'tableau de', field: 'Champ', type: 'Type', description: 'Description', object: 'Objet', example: 'ex.', version: 'Version du contrat :', base: 'Base :', param: 'Paramètre', where: 'Où' },
    glossary: { term: 'Terme', en: 'En anglais', definition: 'Définition' },
  },
  en: {
    product: { web: 'Web application', mobile: 'ModernSchools Mobile', portal: 'Official website', desk: 'ModernSchools Desk', api: 'Public API' } as Record<string, string>,
    role: { 'school-admin': 'Administration', direction: 'Management', secretary: 'Secretariat', 'studies-manager': 'Head of studies', teacher: 'Teacher', 'school-life': 'Student life', 'it-manager': 'IT manager', prospect: 'Applying school', developer: 'Developer' } as Record<string, string>,
    availability: { available: 'Available', beta: 'Beta', planned: 'Planned', retired: 'Retired' } as Record<string, string>,
    duration: 'Time', prerequisites: 'Prerequisites', expected: 'Expected result', related: 'Related articles',
    video: 'Video mini-tutorial', play: 'Play the video', videoYoutube: 'Played on YouTube (youtube-nocookie.com): nothing is loaded from YouTube before you click.',
    helpful: 'Was this page helpful?', yes: 'Yes', no: 'No', thanks: 'Thank you for your feedback.', why: 'What went wrong?',
    reasons: ['Missing information', 'Interface looks different', 'Hard to understand', 'Incorrect procedure', 'Other'],
    report: 'Write to support about this page', external: 'External platform',
    externalText: 'This screenshot shows an official platform that is separate from ModernSchools. ModernSchools is not affiliated with it.',
    hotspot: 'Marker', search: 'Search', searchPlaceholder: 'add a student, report card, sign in…', close: 'Close',
    planned: 'This feature is planned: it is not available yet.',
    searchOff: 'Search is available on the published site (Pagefind index).',
    api: { arrayOf: 'array of', field: 'Field', type: 'Type', description: 'Description', object: 'Object', example: 'e.g.', version: 'Contract version:', base: 'Base:', param: 'Parameter', where: 'In', },
    glossary: { term: 'Term', en: 'In French', definition: 'Definition' },
  },
};

export function useT() {
  const { i18n } = useDocusaurusContext();
  return i18n.currentLocale === 'en' ? T.en : T.fr;
}

export function useLocale(): 'fr' | 'en' {
  const { i18n } = useDocusaurusContext();
  return i18n.currentLocale === 'en' ? 'en' : 'fr';
}
