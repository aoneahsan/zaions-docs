# Packages

**Last updated:** 2026-11-16

`package.json` and `yarn.lock` are the exact version authority. This Docusaurus site uses Yarn 4.18.1 on
Node 26.13.1 LTS (`.nvmrc`, `engines.node >=26.13.1`). TypeScript is on `~7.0.2`: this site runs no
`typescript-eslint` and no Capacitor CLI, the two tools that hold the rest of the fleet on 6.0, and its
`tsconfig.json` carries no `baseUrl` and no `@docusaurus/tsconfig` extend (fleet ledger, Docusaurus on TS 7).

After any update, run `yarn install --immutable`, `yarn typecheck`, and `yarn build`, then serve the exact
`build/` output and check desktop and mobile Chrome. Production output must contain no source maps.

`build` runs with `NODE_OPTIONS=--no-experimental-webstorage`: Docusaurus' SSG touches Node 26's disabled
`localStorage` and prints an ExperimentalWarning. Upstream has no option; re-check on each Docusaurus minor and
remove the flag when a build without it prints nothing.

## History

- 2026-11-16 — Node 26.13.1 LTS pass: `.nvmrc` created at 26.13.1, `engines.node` `>=20.0` → `>=26.13.1`. Every
  package was already on its latest stable (`npm-check-updates` reported nothing to move).
