import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import faqSchemaPlugin from './src/plugins/faq-schema';
import rehypeTableLabels from './src/plugins/rehype-table-labels';
import {agency, phone} from './src/data/site';

// Public site. Nothing here may carry a secret, a private repository or an internal tool name.
const SITE_URL = 'https://docs.zaions.com';

const config: Config = {
  title: 'Zaions docs',
  tagline:
    'How a Zaions project runs, step by step: writing the brief, the written estimate, milestone links, the packages, the handover and paying an invoice.',
  favicon: 'favicon.ico',

  future: {
    v4: true,
    faster: true,
  },

  url: SITE_URL,
  baseUrl: '/',
  // GitHub Pages serves /brief from brief.html with no redirect, so URLs stay exactly the approved slugs.
  trailingSlash: false,
  organizationName: 'aoneahsan',
  projectName: 'zaions-docs',

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  onDuplicateRoutes: 'throw',

  markdown: {
    format: 'detect',
    hooks: {
      onBrokenMarkdownLinks: 'throw',
      onBrokenMarkdownImages: 'throw',
    },
  },

  // English only today; the i18n config is in place so a second locale is one folder away.
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    localeConfigs: {
      en: {htmlLang: 'en-US', label: 'English'},
    },
  },

  headTags: [
    {tagName: 'link', attributes: {rel: 'icon', type: 'image/svg+xml', href: '/img/favicon.svg'}},
    {tagName: 'link', attributes: {rel: 'apple-touch-icon', href: '/img/apple-touch-icon.png'}},
    {
      tagName: 'link',
      attributes: {
        rel: 'preload',
        href: '/fonts/AtkinsonHyperlegibleNext-wght.ttf',
        as: 'font',
        type: 'font/ttf',
        crossorigin: 'anonymous',
      },
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          breadcrumbs: true,
          // Labels table cells with their column header, so phones can show each row as a card.
          rehypePlugins: [rehypeTableLabels],
          showLastUpdateTime: true,
          showLastUpdateAuthor: false,
          // `exclude` replaces the defaults, so they are restated. Internal records never publish.
          exclude: [
            '**/_*.{js,jsx,ts,tsx,md,mdx}',
            '**/_*/**',
            '**/*.test.{js,jsx,ts,tsx}',
            '**/__tests__/**',
            'MANUAL-TASKS.md',
            'story/**',
          ],
        },
        blog: false,
        pages: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          lastmod: 'date',
          ignorePatterns: ['/search', '/tags/**'],
          filename: 'sitemap.xml',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        indexDocs: true,
        indexBlog: false,
        indexPages: false,
        docsRouteBasePath: '/',
        language: ['en'],
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 10,
        searchResultContextMaxLength: 60,
        explicitSearchResultPath: true,
      },
    ],
  ],

  plugins: [faqSchemaPlugin, ['@docusaurus/plugin-client-redirects', {redirects: []}]],

  themeConfig: {
    image: 'img/zaions-mark.png',
    metadata: [
      {name: 'theme-color', content: '#9434de'},
      {property: 'og:site_name', content: 'Zaions docs'},
      {name: 'twitter:card', content: 'summary'},
    ],
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: false,
        autoCollapseCategories: false,
      },
    },
    navbar: {
      title: 'Zaions docs',
      logo: {
        alt: 'Zaions',
        src: 'img/zaions-mark.svg',
        width: 32,
        height: 32,
      },
      items: [
        {type: 'search', position: 'right'},
        {
          href: agency.startProject,
          label: 'Start a project',
          position: 'right',
          className: 'navbar-cta',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Company',
          items: [
            {label: 'Zaions', href: agency.home},
            {label: 'Services', href: agency.services},
            {label: 'Pricing', href: agency.pricing},
          ],
        },
        {
          title: 'Talk to us',
          items: [
            {label: 'Start a project', href: agency.startProject},
            {label: 'Book a free consultation', href: agency.consultation},
            {label: 'Contact', href: agency.contact},
            {html: `<a class="footer__link-item" href="${phone.href}">${phone.display}</a>`},
          ],
        },
        {
          title: 'Legal',
          items: [
            {label: 'Privacy Policy', href: agency.privacy},
            {label: 'Terms of Service', href: agency.terms},
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Zaions`,
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 3,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
