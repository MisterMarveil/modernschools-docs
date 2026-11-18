import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { themes as prismThemes } from 'prism-react-renderer';
import contexts from './data/contexts.json';

/**
 * docs.modernschools.online — documentation publique de ModernSchools
 * (cahier des charges Documentation V1.0).
 *
 * Site statique : Node sert à construire, pas à servir. La recherche est
 * indexée par Pagefind après la construction (npm run build).
 */
const config: Config = {
  title: 'ModernSchools Documentation',
  tagline: "L'école, mieux pilotée.",
  favicon: 'img/brand/favicon.svg',
  url: 'https://docs.modernschools.online',
  baseUrl: '/',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'warn',
  onDuplicateRoutes: 'throw',

  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    localeConfigs: {
      fr: { label: 'Français', htmlLang: 'fr' },
      en: { label: 'English', htmlLang: 'en' },
    },
  },

  onBrokenMarkdownLinks: 'throw',

  headTags: [
    { tagName: 'link', attributes: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
    { tagName: 'link', attributes: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' } },
    { tagName: 'link', attributes: { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap' } },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          showLastUpdateTime: false,
          breadcrumbs: true,
        },
        blog: false,
        pages: {},
        theme: { customCss: './src/css/custom.css' },
        sitemap: { changefreq: 'weekly', priority: 0.5, ignorePatterns: ['/context/**', '/en/context/**'] },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        // Aide contextuelle : /context/{CODE} → page de référence (cahier §19.3).
        redirects: Object.entries(contexts as Record<string, string>).map(([code, to]) => ({ from: `/context/${code}`, to })),
      },
    ],
  ],

  themeConfig: {
    image: 'img/brand/og-docs.png',
    metadata: [{ name: 'theme-color', content: '#0D1B6C' }],
    colorMode: { defaultMode: 'light', respectPrefersColorScheme: false, disableSwitch: true },
    navbar: {
      logo: { alt: 'ModernSchools', src: 'img/brand/logo.svg', href: '/' },
      items: [
        { type: 'docSidebar', sidebarId: 'documentation', position: 'left', label: 'Guides' },
        { to: '/videos', label: 'Tutoriels vidéo', position: 'left' },
        { to: '/troubleshooting', label: 'Dépannage', position: 'left' },
        { to: '/developers', label: 'Développeurs', position: 'left' },
        { to: '/support', label: 'Support', position: 'right' },
        { type: 'localeDropdown', position: 'right' },
        { type: 'search', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            { label: 'Bien démarrer', to: '/getting-started' },
            { label: 'Onboarding', to: '/onboarding/new-school' },
            { label: 'Glossaire', to: '/glossary' },
            { label: 'Nouveautés', to: '/whats-new' },
          ],
        },
        {
          title: 'ModernSchools',
          items: [
            { label: 'Site officiel', href: 'https://www.modernschools.online' },
            { label: 'Trouver mon établissement', href: 'https://www.modernschools.online/fr/trouver-mon-etablissement' },
          ],
        },
        {
          title: 'Support',
          items: [
            { label: 'support@modernschools.online', href: 'mailto:support@modernschools.online' },
            { label: 'WhatsApp +237 691 91 91 16', href: 'https://wa.me/237691919116' },
          ],
        },
      ],
      copyright: `© 2026 ETS BRIDGE SOLUTIONS · ModernSchools — L'école, mieux pilotée.`,
    },
    tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
    prism: { theme: prismThemes.github, additionalLanguages: ['bash', 'json'] },
  } satisfies Preset.ThemeConfig,
};

export default config;
