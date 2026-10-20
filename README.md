# Zaions docs

The source of [docs.zaions.com](https://docs.zaions.com): how a Zaions project runs, from the brief to the
handover. Built with [Docusaurus](https://docusaurus.io) and published on GitHub Pages.

<a id="run-it-locally"></a>
## 🚀 Run it locally&nbsp;[#](#run-it-locally)

Needs Node 20 or later and Yarn 4.

```bash
yarn install --immutable
yarn start      # dev server on http://localhost:5971
yarn build      # production build into build/ (also checks every link)
yarn serve      # serve that build on http://localhost:5971
yarn typecheck
```

Search is local (`@easyops-cn/docusaurus-search-local`); no account or key is needed. `yarn build` reads
each page's last git commit for its "Page updated" date, so it needs at least one commit.

<a id="where-things-live"></a>
## 📁 Where things live&nbsp;[#](#where-things-live)

| Path | Holds |
|---|---|
| `docs/*.mdx` | the eight pages; the sidebar order is in `sidebars.ts` |
| `src/data/site.ts` | every changeable figure: package prices, phone number, product count, zaions.com links |
| `src/components/` | the shared `<StartProject />` block and the price, phone and product-count helpers |
| `src/theme/` | small theme overrides: page JSON-LD, the "Page updated" line, the 404 page, MDX components |
| `src/plugins/` | `faq-schema.ts` adds the FAQPage JSON-LD to `/faq` from the built page; `rehype-table-labels.ts` labels table cells so phones show rows as cards |
| `static/` | fonts, logo, favicons, `CNAME`, `robots.txt`, `llms.txt` |

<a id="deploy"></a>
## 🚢 Deploy&nbsp;[#](#deploy)

Every push to `main` runs `.github/workflows/deploy-pages.yml`: type-check, build, then publish to GitHub
Pages. `static/CNAME` pins the domain `docs.zaions.com`.

<a id="license"></a>
## 📄 License&nbsp;[#](#license)

[MIT](./LICENSE). The fonts in `static/fonts/` keep their own SIL Open Font License.
