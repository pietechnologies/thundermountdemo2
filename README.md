# Thunder Mounts — Connected Platform Demo

An interactive proposal for **Thunder Mounts Garage Systems**: a storefront, customer accounts, a dealer
portal, an owner console and an installer app — all sharing one catalogue, one stock pool and one set of
reporting.

This is a **design prototype with sample data**, not the production system. Nothing is saved to a server
and no payment is processed.

---

## What's inside

| Route | Surface | Notes |
|-------|---------|-------|
| `/` | Storefront | Hero, categories, before/after, fitment teaser, portfolio, reviews |
| `/shop` | Catalogue | Filter, sort, search, stock states, add to cart |
| `/product/:id` | Product detail | Fitment, contents, trade price, install availability, reviews |
| `/measure` | Fitment finder | 3-step wizard returning the exact SKU + companion mount |
| `/installers` | Installer locator | Dealer map, fixed pricing, booking flow |
| `/checkout` | Checkout | Contact → shipping → payment → confirmation |
| `/account` | Customer dashboard | Orders, tracking, garage profile, installs, support |
| `/dealer` | Dealer portal | Dashboard, orders, quotes, price list, inventory, jobs, terms |
| `/admin` | Owner console | KPIs, orders, inventory, dealers, installs, CMS, team & audit |
| `/field` | Installer app | Route, checklist, photos, signature, offline state |
| `/pitch` | Proposal deck | 14 slides, arrow-key navigation |
| `/docs` | Scope document | Feature matrix, data model, acceptance criteria, FAQ |
| `/today` | Current site audit | Side-by-side comparison of what exists today |

Demo logins (password `demo1234`, prefilled on each login screen):

- Customer — `marcus.hale@gmail.com`
- Dealer — `orders@summitgaragedoors.com`
- Owner — `gustavo@thundermounts.com`

A downloadable copy of the proposal lives at [`/proposal.md`](./public/proposal.md).

---

## Run it locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build
npm test         # route smoke tests (vitest + jsdom)
```

---

## Deploy to GitHub Pages

The build uses **relative asset paths** (`base: './'`) and **hash routing**, so it works on GitHub Pages
without any server rewrite rules — both at `username.github.io/repo/` and on a custom domain.

### Option A — GitHub Actions (included)

1. Push this branch / merge to `main`.
2. In the repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` builds and publishes automatically on every push.
4. The deck is then at `https://<user>.github.io/<repo>/#/pitch` and the store at `.../#/`.

### Option B — Manual

```bash
npm run build
# commit / upload the contents of dist/ to the gh-pages branch,
# or drag dist/ into Netlify / Cloudflare Pages / any static host
```

Because routing is hash-based, no `404.html` or rewrite configuration is needed.

---

## Tech

Vite · React 18 · TypeScript · Tailwind CSS · React Router (hash) · Recharts · Lucide icons.

Images in `public/img` are AI-generated placeholders for the proposal and would be replaced with real
product and job photography in production.

---

## Notes for the client conversation

- The `/today` page compares the current thundermounts.com experience with the proposed one.
- The `/pitch` deck is the recommended walk-through order: problem → vision → each surface → plan → investment.
- The `/docs` page is the written spec to leave behind after the meeting.
- All numbers (revenue, dealers, orders) are illustrative sample data.
