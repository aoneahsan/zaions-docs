# Packages

**Last updated:** 2026-10-21

`package.json` and `yarn.lock` are the exact version authority. This Docusaurus site uses Yarn 4.18.1.
TypeScript remains on `~6.0.3` while the fleet TypeScript 7 compatibility blocker is active.

After any update, run `yarn install --immutable`, `yarn typecheck`, and `yarn build`, then serve the exact
`build/` output and check desktop and mobile Chrome. Production output must contain no source maps.
