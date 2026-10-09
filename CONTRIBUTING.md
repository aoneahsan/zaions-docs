# Contributing to Zaions docs

Thanks for helping. These pages explain how a Zaions project runs, so accuracy matters more than volume.

<a id="reporting-a-problem"></a>
## 🐛 Reporting a problem&nbsp;[#](#reporting-a-problem)

Open an issue with the page URL, what it says, and what you expected. A broken link, a figure that differs
from [zaions.com](https://zaions.com), or a page that renders badly at some screen width are all welcome.

<a id="changing-a-page"></a>
## ✏️ Changing a page&nbsp;[#](#changing-a-page)

1. Fork the repository and create a branch.
2. Edit the page in `docs/`. Keep its front matter (`title`, `sidebar_label`, `description`, `slug`,
   `sidebar_position`) complete; the description is the page's meta description.
3. Never type a price, the phone number or the product count into a page. They come from
   `src/data/site.ts` through `<Price />`, `<Phone />` and `<ProductCount />`.
4. Link to other pages by file (`./brief.mdx`) and to zaions.com with absolute URLs.
5. Run `yarn typecheck` and `yarn build`. The build fails on a broken link, so a green build is the link
   check.
6. Open a pull request describing the change and how you checked it.

Keep formatting-only changes out of page files: each page's "Page updated" date comes from its last commit.

<a id="what-not-to-add"></a>
## 🚫 What not to add&nbsp;[#](#what-not-to-add)

This repository is public. Never add a secret, an access key, an `.env` file or a private link.

<a id="license"></a>
## 📄 License&nbsp;[#](#license)

By contributing you agree that your contribution is licensed under the [MIT License](./LICENSE).
