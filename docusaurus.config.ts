import {existsSync, readdirSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import faqSchemaPlugin from './src/plugins/faq-schema';
import rehypeTableLabels from './src/plugins/rehype-table-labels';
import {BLOG_DESCRIPTION, BLOG_PATH, BLOG_TITLE} from './src/data/blog';
import {agency, phone} from './src/data/site';
import {OTHER_PLATFORMS} from './src/data/platforms';

// Public site. Nothing here may carry a secret, a private repository or an internal tool name.
const SITE_URL = 'https://docs.zaions.com';

/**
 * Whether blog/ holds a post yet. Until it does, the blog stays off: an empty blog page would sit in sitemap.xml with
 * nothing on it, and a Blog link would point at it. The first post added to blog/ turns on the blog, its RSS and Atom
 * feeds, its search index, its dated sitemap entries, its place on /sitemap, /feed and /feed.xml, and the Blog links.
 */
const BLOG_DIR = fileURLToPath(new URL('./blog', import.meta.url));
const HAS_POSTS = existsSync(BLOG_DIR) && readdirSync(BLOG_DIR).some((name) => name.endsWith('.md') || name.endsWith('.mdx'));

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
            'PACKAGES.md',
            'story/**',
          ],
        },
        blog: HAS_POSTS && {
          path: 'blog',
          routeBasePath: BLOG_PATH.slice(1),
          blogTitle: BLOG_TITLE,
          blogDescription: BLOG_DESCRIPTION,
          blogSidebarTitle: 'Recent posts',
          blogSidebarCount: 10,
          postsPerPage: 10,
          showReadingTime: false,
          // A post is dated by the day it was published (its own front matter), in the feed and in sitemap.xml.
          showLastUpdateTime: false,
          showLastUpdateAuthor: false,
          // Every author and tag is defined once, in blog/authors.yml (and blog/tags.yml when a post uses one).
          onInlineAuthors: 'throw',
          onInlineTags: 'throw',
          // markdown.format is 'detect', so a post written as .md marks its excerpt with <!-- truncate -->.
          onUntruncatedBlogPosts: 'throw',
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
            title: BLOG_TITLE,
            description: BLOG_DESCRIPTION,
            copyright: 'Made by the Zaions team.',
            language: 'en-US',
          },
        },
        pages: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          lastmod: 'date',
          changefreq: null,
          priority: null,
          // The blog's tag, author, archive and later list pages only repeat its posts; each post is listed once.
          ignorePatterns: ['/search', '/search/**', '/tags/**', '/blog/tags/**', '/blog/authors/**', '/blog/archive', '/blog/page/**'],
          filename: 'sitemap.xml',
          // Every URL dated: a doc by its git date, /sitemap and /feed by the newest doc (src/plugins/site-pages.ts).
          createSitemapItems: async ({defaultCreateSitemapItems, ...params}) =>
            (require('./src/plugins/site-pages') as typeof import('./src/plugins/site-pages')).withLastmod(
              await defaultCreateSitemapItems(params),
            ),
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
        indexBlog: HAS_POSTS,
        blogRouteBasePath: BLOG_PATH,
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

  plugins: [
    faqSchemaPlugin,
    ['@docusaurus/plugin-client-redirects', {redirects: []}],
    // /sitemap, /feed and /feed.xml (every frontend ships the four routes; src/plugins/site-pages.ts).
    (require('./src/plugins/site-pages') as typeof import('./src/plugins/site-pages')).default,
  ],

  themeConfig: {
    image: 'img/zaions-mark.png',
    metadata: [
      { name: 'yandex-verification', content: 'ffc2cf741c9b8c71' },
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
        ...(HAS_POSTS ? [{to: BLOG_PATH, label: 'Blog', position: 'left' as const}] : []),
        {
          type: 'dropdown',
          label: 'Get Zaions',
          position: 'right',
          items: [
            ...OTHER_PLATFORMS.map((platform) => ({label: platform.name, href: platform.href})),
            {label: 'All apps', to: '/apps'},
          ],
        },
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
          title: 'Get Zaions',
          items: [
            ...OTHER_PLATFORMS.map((platform) => ({label: platform.name, href: platform.href})),
            {label: 'All apps', to: '/apps'},
          ],
        },
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
        {
          title: 'This site',
          items: [
            ...(HAS_POSTS ? [{label: 'Blog', to: BLOG_PATH}] : []),
            {label: 'Every page', to: '/sitemap'},
            {label: 'What changed', to: '/feed'},
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
