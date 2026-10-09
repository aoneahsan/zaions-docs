import fs from 'node:fs/promises';
import path from 'node:path';
import {load, type CheerioAPI} from 'cheerio';
import type {Element} from 'domhandler';
import type {LoadContext, Plugin} from '@docusaurus/types';

/** Number of questions the approved FAQ copy carries. A different count fails the build. */
const EXPECTED_QUESTIONS = 16;

/** Squeezes whitespace (and the zero-width space Docusaurus puts in hash links) to single spaces. */
function clean(text: string): string {
  return text.replace(/\u200b/g, '').replace(/\s+/g, ' ').trim();
}

/**
 * Removes a "read more" page link sitting alone at the end of an answer paragraph, so the
 * accepted answer carries the answer only. A link inside a sentence keeps its text.
 * @param $ - the loaded document
 * @param paragraph - the answer paragraph (mutated)
 */
function dropTrailingPageLink($: CheerioAPI, paragraph: Element): void {
  const nodes = $(paragraph).contents().toArray();
  while (nodes.length > 0) {
    const last = nodes[nodes.length - 1];
    if (last.type === 'text' && clean($(last).text()) === '') {
      nodes.pop();
      continue;
    }
    break;
  }
  const last = nodes[nodes.length - 1];
  if (!last || last.type !== 'tag' || (last as Element).tagName !== 'a') {
    return;
  }
  const before = clean(
    nodes
      .slice(0, -1)
      .map((node) => $(node).text())
      .join(''),
  );
  if (/[.?!]$/.test(before)) {
    $(last).remove();
  }
}

/**
 * Reads the built /faq page and returns its question/answer pairs exactly as rendered.
 * @param html - the built faq page
 * @returns the questions with their plain-text answers
 */
export function extractFaq(html: string): {question: string; answer: string}[] {
  const $ = load(html);
  $('.sr-only').remove();
  const pairs: {question: string; answer: string}[] = [];
  $('article .theme-doc-markdown h2').each((_index, heading) => {
    $(heading).find('.hash-link').remove();
    const question = clean($(heading).text());
    const parts: string[] = [];
    let next = $(heading).next();
    while (next.length > 0 && next.is('p') && !/^Next:/.test(clean(next.text()))) {
      const paragraph = next.clone();
      dropTrailingPageLink($, paragraph.get(0) as Element);
      parts.push(clean(paragraph.text()));
      next = next.next();
    }
    pairs.push({question, answer: parts.join(' ')});
  });
  return pairs;
}

/**
 * Adds one FAQPage JSON-LD node to the built /faq page, built from the rendered Q&A only.
 * @param context - the Docusaurus load context
 * @returns the plugin
 */
export default function faqSchemaPlugin(context: LoadContext): Plugin {
  return {
    name: 'zaions-faq-schema',
    async postBuild({outDir}) {
      const candidates = [path.join(outDir, 'faq.html'), path.join(outDir, 'faq', 'index.html')];
      let file: string | undefined;
      for (const candidate of candidates) {
        try {
          await fs.access(candidate);
          file = candidate;
          break;
        } catch {
          // try the next layout
        }
      }
      if (!file) {
        throw new Error('[zaions-faq-schema] the built /faq page was not found');
      }
      const html = await fs.readFile(file, 'utf8');
      const pairs = extractFaq(html);
      if (pairs.length !== EXPECTED_QUESTIONS || pairs.some((pair) => !pair.question || !pair.answer)) {
        throw new Error(
          `[zaions-faq-schema] expected ${EXPECTED_QUESTIONS} answered questions on /faq, found ${pairs.length}`,
        );
      }
      const node = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        url: `${context.siteConfig.url}/faq`,
        mainEntity: pairs.map(({question, answer}) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: {'@type': 'Answer', text: answer},
        })),
      };
      const script = `<script type="application/ld+json">${JSON.stringify(node).replace(/</g, '\\u003c')}</script>`;
      await fs.writeFile(file, html.replace('</head>', `${script}</head>`), 'utf8');
    },
  };
}
