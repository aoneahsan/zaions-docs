# Zaions docs — project guide (AGENTS.md)

**Last Updated:** 2026-10-20. Claude Code reads `CLAUDE.md`; other agents read `AGENTS.md`. The two are
identical except this header line. Change both together. Fleet law auto-loads from `~/.claude/rules/`;
never copy it here.

Context, Gitignore, build and browser output were verified 2026-10-20. The next routine context optimization
is eligible 2026-11-19. Fleet evidence lives in the private parent root's maintenance record.

## What this is

The public docs site for Zaions, https://docs.zaions.com. Docusaurus 3 (docs-only, `routeBasePath: '/'`),
TypeScript ~6.0, yarn 4 (`nodeLinker: node-modules`). Public repo `aoneahsan/zaions-docs`, remote `o`,
primary branch `main`. The approved copy lives in the parent planning kit (`../`), outside this repo.

## Links

| What | URL |
|---|---|
| Docs (this site) | https://docs.zaions.com |
| Agency site | https://zaions.com |
| Repo | https://github.com/aoneahsan/zaions-docs |

## Hard rules

- **Words come only from the approved copy** in `../docs/story/drafts/docs.md` (GATE 4, 2026-10-09) and
  `../docs/story/drafts/ui.md`. A page change starts there, through the story workflow; never invent copy.
- **Figures live once** in `src/data/site.ts` (package floors, phone, product count). No price typed in MDX.
- **Public repo:** no secret, `.env`, private repo link or internal tool name, anywhere.
- **GitHub Pages only** via `.github/workflows/deploy-pages.yml`. Never Firebase.
- **No refund, warning or "before you pay" copy** on any page; no `:::warning`/`:::danger` on Packages or
  Paying an invoice.
- `docs/MANUAL-TASKS.md` is excluded from the build; keep the docs `exclude` list when editing config.
- Formatting-only commits stay out of `docs/*.mdx`: each page's "Page updated" date is its last commit.

## Commands

`yarn start` / `yarn serve` on port **5971** · `yarn build` (link check; needs ≥ 1 commit) · `yarn typecheck`.

## Where things live

See `README.md` → "Where things live". Owner-only steps: `docs/MANUAL-TASKS.md`.
