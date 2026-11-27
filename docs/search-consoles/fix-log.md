# Search-console fix log — zaions-docs

Fixed path in every repo (`aoneahsan-cccs-search-issue-remediation`). Newest first. Not published: excluded in
`docusaurus.config.ts`. The audit session retests with the commands under **Retest**.

## zaions-docs#1 (and the docs.zaions.com boxes of zaions-portfolio-company-app#1) · 2026-11-27 · commit: see `git log -- docs/search-consoles/fix-log.md`

Status: live-verified, google-pending (commit `7e72502`, gh-pages `665b54b`, IndexNow 200): `/PACKAGES/` and `/tags/phone/`
answer redirect pages to the live equivalents; FAQPage, sameAs and founder in the home's raw HTML; 0 unslashed sitemap URLs. `yarn build` (zero warnings) ends with
`yarn seo:contract` (`src/plugins/seo-contract.mts`), which caught 6 tag pages with no meta description and failed on a
planted noindex on `/faq/`, then passed. Rendered `/` at 1440.

| Box | SA | What was wrong (evidence) | Root fix (file) | Contract | Live proof |
|---|---|---|---|---|---|
| 1 · `docs.zaions.com/PACKAGES/` 404 | P31 / P26 | an old upper-case address; also `trailingSlash: false` 404ed every slashed URL | `docusaurus.config.ts`: `trailingSlash: true`, and a redirect `/PACKAGES` → `/packages` (`@docusaurus/plugin-client-redirects`); `src/plugins/site-pages.ts` dates sitemap URLs slashless (`served`) | fails on any `x.html` page, unslashed canonical or sitemap URL | see Retest |
| 2 · publisher without sameAs | P20 | the Organization node had no sameAs and no person | `src/theme/DocItem/Layout/index.tsx`: Organization gains alternateName and sameAs, and a founder Person `https://aoneahsan.com/#person` with the sameAs list aoneahsan.com publishes (values from `owner-profile.json`) | JSON-LD must parse | see Retest |
| 3 · FAQ without FAQPage | P30 | the docs home asks three questions as section headings (`/faq` already had FAQPage) | `src/plugins/faq-schema.ts` now marks up every page in `FAQ_PAGES`: `/faq/` (16) and `/` (3, headings ending in `?`, answers from the paragraphs and lists under them) | the build fails if a count changes | see Retest |
| found · 6 tag pages with no description | P32 | generated `/tags/*` lists | two docs' `tags:` → `topics:` (the `/sitemap` chips keep them); `/tags/*` redirect to the matching page | redirects present | see Retest |

### Pending

| Box | Why not done | Who | Next action |
|---|---|---|---|
| Google re-crawl and Validate fix | console | daily audit | Validate fix |

### Retest

```bash
H=https://docs.zaions.com
for p in /PACKAGES/ /tags/phone/ /faq; do printf '%s %s\n' "$p" "$(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' "$H$p")"; done
curl -s "$H/" | grep -oE '"@type":"FAQPage"|"sameAs"|"founder"' | sort | uniq -c
curl -s "$H/sitemap.xml" | grep -oE '<loc>[^<]*</loc>' | grep -vc '/</loc>'   # 0
```
