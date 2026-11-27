import fs from 'node:fs/promises';
import path from 'node:path';
import {load, type CheerioAPI} from 'cheerio';
import type {Element} from 'domhandler';
import type {LoadContext, Plugin} from '@docusaurus/types';

/**
 * The pages that show questions and answers, and how many each carries; a different count fails the build.
 * `/faq` asks at every `##`. The docs home asks three of its section headings (zaions-docs#1, AEO 3), answered by the
 * paragraphs and lists under them, so only headings ending in `?` count there.
 */
const FAQ_PAGES = [
  {route: 'faq', expected: 16, questionsOnly: false, answerBlocks: 'p'},
  {route: '', expected: 3, questionsOnly: true, answerBlocks: 'p, ul, ol'},
] as const;

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
 * Reads a built page and returns its question/answer pairs exactly as rendered.
 * @param html - the built page
 * @param questionsOnly - keep only headings that end in `?`
 * @param answerBlocks - the sibling elements that make up an answer
 * @returns the questions with their plain-text answers
 */
export function extractFaq(html: string, questionsOnly = false, answerBlocks = 'p'): {question: string; answer: string}[] {
  const $ = load(html);
  $('.sr-only').remove();
  const pairs: {question: string; answer: string}[] = [];
  $('article .theme-doc-markdown h2').each((_index, heading) => {
    $(heading).find('.hash-link').remove();
    const question = clean($(heading).text());
    if (questionsOnly && !question.endsWith('?')) return;
    const parts: string[] = [];
    let next = $(heading).next();
    while (next.length > 0 && next.is(answerBlocks) && !/^Next:/.test(clean(next.text()))) {
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
 * Adds one FAQPage JSON-LD node to each page in FAQ_PAGES, built from the rendered Q&A only.
 * @param context - the Docusaurus load context
 * @returns the plugin
 */
export default function faqSchemaPlugin(context: LoadContext): Plugin {
  return {
    name: 'zaions-faq-schema',
    async postBuild({outDir}) {
      for (const {route, expected, questionsOnly, answerBlocks} of FAQ_PAGES) {
        const candidates = [path.join(outDir, `${route || 'index'}.html`), path.join(outDir, route, 'index.html')];
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
          throw new Error(`[zaions-faq-schema] the built /${route} page was not found`);
        }
        const html = await fs.readFile(file, 'utf8');
        const pairs = extractFaq(html, questionsOnly, answerBlocks);
        if (pairs.length !== expected || pairs.some((pair) => !pair.question || !pair.answer)) {
          throw new Error(`[zaions-faq-schema] expected ${expected} answered questions on /${route}, found ${pairs.length}`);
        }
        const node = {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          url: `${context.siteConfig.url}/${route ? `${route}/` : ''}`,
          mainEntity: pairs.map(({question, answer}) => ({
            '@type': 'Question',
            name: question,
            acceptedAnswer: {'@type': 'Answer', text: answer},
          })),
        };
        const script = `<script type="application/ld+json">${JSON.stringify(node).replace(/</g, '\\u003c')}</script>`;
        await fs.writeFile(file, html.replace('</head>', `${script}</head>`), 'utf8');
      }
    },
  };
}
