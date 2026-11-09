import { translate } from '@docusaurus/Translate';

/**
 * The sitemap page's words (GATE 4 package: `../docs/story/drafts/docs-site-pages.md`). Each goes through
 * Docusaurus's `translate`, so a second locale needs a translation file and no edit here. Count messages are one
 * plural message each (`one|other`).
 *
 * @returns the page's words
 */
export function sitemapWords() {
  return {
    title: translate({ id: 'docs.sitemap.title', message: 'Every page of the Zaions docs' }),
    metaDescription: translate({
      id: 'docs.sitemap.meta.description',
      message:
        'Every page of the Zaions docs on one list: the brief, the estimate, milestones, packages, handover, paying an invoice and how we compare.',
    }),
    intro: translate({
      id: 'docs.sitemap.intro',
      message: "Looking for one answer? Type a word below. The list narrows as you type, and a typo won't stop it.",
    }),
    filesLabel: translate({ id: 'docs.sitemap.files.label', message: 'Files for machines' }),
    sitemapXml: {
      label: translate({ id: 'docs.sitemap.file.sitemap_xml.label', message: 'sitemap.xml' }),
      hint: translate({
        id: 'docs.sitemap.file.sitemap_xml.hint',
        message: 'This list, for search engines.',
      }),
    },
    feedXml: {
      label: translate({ id: 'docs.sitemap.file.feed_xml.label', message: 'feed.xml' }),
      hint: translate({
        id: 'docs.sitemap.file.feed_xml.hint',
        message: 'Pages we changed, newest first, for a feed reader.',
      }),
    },
    llms: {
      label: translate({ id: 'docs.sitemap.file.llms.label', message: 'llms.txt' }),
      hint: translate({
        id: 'docs.sitemap.file.llms.hint',
        message: 'The docs in plain text for AI assistants, with a link to every page.',
      }),
    },
    searchLabel: translate({ id: 'docs.sitemap.search.label', message: 'Find a page' }),
    searchPlaceholder: translate({ id: 'docs.sitemap.search.placeholder', message: 'Try "handover" or "invoice"' }),
    count: translate({ id: 'docs.sitemap.search.count', message: '1 page|{count} pages' }),
    countQuery: translate({
      id: 'docs.sitemap.search.count_query',
      message: '1 page matches "{query}"|{count} pages match "{query}"',
    }),
    groupDocs: translate({ id: 'docs.sitemap.group.docs', message: 'How a project runs' }),
    groupCompare: translate({ id: 'docs.sitemap.group.compare', message: 'How we compare' }),
    groupSite: translate({ id: 'docs.sitemap.group.site', message: 'This site' }),
    emptyTitle: translate({ id: 'docs.sitemap.empty.title', message: 'Nothing matches "{query}"' }),
    emptyBody: translate({
      id: 'docs.sitemap.empty.body',
      message: 'Try one shorter word. Or clear the search and read the whole list.',
    }),
    emptyAction: translate({ id: 'docs.sitemap.empty.action', message: 'Clear the search' }),
  };
}
