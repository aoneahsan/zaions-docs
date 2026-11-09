import { translate } from '@docusaurus/Translate';

/**
 * The feed page's words (GATE 4 package: `../docs/story/drafts/docs-site-pages.md`). Each goes through Docusaurus's
 * `translate`, so a second locale needs a translation file and no edit here. "Updated {updated_date}" lives in the
 * page itself, because its date is a `<time>` element. The sitemap page reads the title and meta description for
 * the feed's own card.
 *
 * @returns the page's words
 */
export function feedWords() {
  return {
    title: translate({ id: 'docs.feed.title', message: 'What changed in the docs' }),
    metaDescription: translate({
      id: 'docs.feed.meta.description',
      message: 'Every Zaions docs page with the day we last changed it, newest first, plus an RSS link for your feed reader.',
    }),
    intro: translate({
      id: 'docs.feed.intro',
      message: 'When we change how a project runs, the page that explains it changes the same week. Newest first.',
    }),
    rssHeading: translate({ id: 'docs.feed.rss.heading', message: 'Get changes in your feed reader' }),
    rssBody: translate({
      id: 'docs.feed.rss.body',
      message:
        "Paste this link into any feed reader. When we change a page, it shows up there on its own. It's the same list as this page.",
    }),
    rssLinkLabel: translate({ id: 'docs.feed.rss.link_label', message: 'RSS link' }),
    copy: translate({ id: 'docs.feed.copy', message: 'Copy link' }),
    copied: translate({ id: 'docs.feed.copied', message: 'Copied' }),
    copyFailed: translate({
      id: 'docs.feed.copy_failed',
      message: "We couldn't copy it. The link is selected, so copy it yourself.",
    }),
    read: translate({ id: 'docs.feed.item.read', message: 'Read the page' }),
    emptyTitle: translate({ id: 'docs.feed.empty.title', message: 'No pages yet' }),
    emptyBody: translate({
      id: 'docs.feed.empty.body',
      message: 'The first page shows up here, and in your feed reader, the day we publish it.',
    }),
  };
}
