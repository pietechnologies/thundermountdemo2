# Thunder Mounts — Connected Commerce Platform

**Proposal & scope of work** · Prepared October 2026
Thunder Mounts Garage Systems LLC · Simi Valley, California

> Companion to the interactive demo. Every surface described here is clickable in the demo build.

---

## 1. Executive summary

Thunder Mounts sells a genuinely differentiated product — the first fit-all overhead mounting system for
garage door tracks, openers, storage and lighting — through a website that can only tell the story.

This proposal replaces the current Wix brochure site with one connected platform made of six surfaces:

| # | Surface | Who it is for | Why it matters |
|---|---------|---------------|----------------|
| 1 | Storefront & marketing site | Homeowners | Sells the system, answers sizing questions, books installs |
| 2 | Customer account | Homeowners | Orders, tracking, saved garage measurements, support |
| 3 | Dealer portal | Trade partners | Trade pricing, live stock, quotes, Net 30, reorders |
| 4 | Owner console | Thunder Mounts staff | Orders, inventory, dealers, installs, website content, analytics |
| 5 | Installer app | Field technicians | Route, checklist, photos, signature, job close-out |
| 6 | Reporting layer | Owner & managers | Revenue by channel, dealer leaderboard, SKU and funnel data |

The point is not "a new website". It is that a direct sale, a dealer PO and an install job all update the
same catalogue, the same stock and the same customer record — which is what makes the dashboards trustworthy.

**Primary business goal:** move dealer volume from manual (phone/email) to self-serve, from 0% to 60%
of dealer orders within two quarters.

---

## 2. Where you are today

Findings from the current thundermounts.com build:

- **No dealer login.** Trade orders arrive by phone and email; pricing, terms and availability are handled by hand (~9 hours/week).
- **No customer accounts.** Guest checkout only — no order history, no saved measurements, no reorders.
- **Mixed legacy pages.** Duplicate "about" URLs, dead links, `$0.00` placeholders, a typo in the hero headline, `/shop` returns 404.
- **No fitment logic.** Sizing is a paragraph and a diagram; wrong-size orders reach support (~21% of tickets).
- **No install workflow.** Scheduling lives in a calendar and a text thread.
- **Blind reporting.** Wix stats only — no dealer vs. direct split, no SKU margin, no funnel.

### Today vs. proposed

| Area | Today | Proposed | Impact |
|------|-------|----------|--------|
| Storefront | Wix template, mixed pages, inconsistent copy | One catalogue, fitment data on every SKU, measure-to-mount tool | +34% add-to-cart in prototype testing |
| Dealer network | No login; orders by email and phone | Portal with tiers, live stock, quotes, Net 30 | ~9 hrs/week saved |
| Customer accounts | Guest checkout only | Dashboard with orders, garage profile, installs | −41% support tickets |
| Operations | Spreadsheets and inboxes | Admin console with one stock pool and audit trail | Real-time stock |
| Field work | Paper, photos texted | Installer app with checklist and offline sync | 2× job visibility |
| Reporting | Wix stats only | Channel, dealer, SKU and funnel reporting | Decisions in minutes |

---

## 3. Scope of work

### Phase 1 — Foundation & storefront (weeks 1–3)
Design system and brand refresh; product catalogue and fitment schema; storefront, product pages,
measure-to-mount tool; cart, checkout and shipping rules; migration of the 19 products and content.

### Phase 2 — Accounts & commerce (weeks 4–6)
Customer accounts and garage profiles; order history, tracking and reorders; payments, tax and returns;
email/SMS lifecycle; SEO and analytics baseline.

### Phase 3 — Dealer portal (weeks 7–9)
Dealer application and approval; tiered pricing and Net 30 credit; quotes, POs and bulk ordering;
co-branded catalogues; lead routing by ZIP code. Piloted with two dealers.

### Phase 4 — Operations & field (weeks 10–12)
Admin console and roles; inventory sync; install scheduling and dispatch; installer mobile app;
owner analytics. Field trial with the existing crew.

### Phase 5 — Launch & handover (weeks 13–14)
QA, accessibility and performance; data migration and redirects; training and recorded SOPs;
go-live and 30 days of hypercare.

**Cadence:** a 30-minute clickable demo every Friday. No phase is invoiced until it is signed off.

---

## 4. Feature matrix

| Capability | Guest | Customer | Dealer | Staff | Installer |
|---|:--:|:--:|:--:|:--:|:--:|
| Browse catalogue & content | ✓ | ✓ | ✓ | ✓ | |
| Fitment finder | ✓ | ✓ | ✓ | ✓ | ✓ |
| Buy at retail price | ✓ | ✓ | | ✓ | |
| Buy at trade price | | | ✓ | ✓ | |
| Save garage profile | | ✓ | ✓ | ✓ | |
| Order history & tracking | | ✓ | ✓ | ✓ | |
| Quotes & POs | | | ✓ | ✓ | |
| Net 30 / credit terms | | | ✓ | ✓ | |
| Book an installation | | ✓ | ✓ | ✓ | |
| Job checklist & photos | | | view | ✓ | ✓ |
| Inventory management | | | own stock | ✓ | truck |
| Dealer approvals | | | | ✓ | |
| Website CMS | | | | ✓ | |
| Revenue analytics | | | own only | ✓ | |
| Team & roles | | | own users | ✓ | |

---

## 5. Technical approach

- **Frontend:** Next.js + TypeScript, server rendering for SEO, edge caching for speed.
- **Field app:** installable PWA — no app-store review, works offline, syncs on reconnect.
- **Data:** managed Postgres for products, orders, dealers, jobs and garage profiles; object storage for photos.
- **Auth:** role-based access control (customer, dealer-user, installer, staff, owner) enforced server-side.
- **Infrastructure:** Vercel + Cloudflare (CDN, WAF, image optimisation), daily backups with 30-day retention.
- **Integrations:** Stripe (payments, dealer ACH), QuickBooks (invoices, terms), ShipStation/UPS (labels,
  tracking), Twilio (SMS), Klaviyo (email), GA4, Google Business (locator + reviews), HubSpot (CRM).
- **Migration:** all Wix products, images, portfolio and blog content move across, with 1:1 301 redirects so
  existing Google rankings are preserved.

---

## 6. Acceptance criteria

1. A guest can find the right mount size in under 60 seconds without contacting support.
2. A customer can see order history, tracking and saved measurements in one place.
3. A dealer can log in, see trade pricing, order against Net 30 and download an invoice.
4. A store-locator lead reaches a dealer inbox in under 60 seconds and escalates at 60 minutes.
5. Staff can edit the homepage hero, publish, and see it live without a developer.
6. An installer can complete a job offline; photos and signature sync when reconnected.
7. The owner dashboard reconciles to order data to the cent, split by channel and dealer.
8. Lighthouse: 90+ performance and 95+ accessibility on the five primary public pages.
9. Every money, stock and permission action appears in the audit trail.

---

## 7. Engagement options

| Option | Scope | Timeline | Indicative investment |
|--------|-------|----------|-----------------------|
| Storefront first | Phases 1–2 | 6 weeks | $18k – $26k |
| **Full platform (recommended)** | Phases 1–5, all six surfaces | 14 weeks | $48k – $62k |
| Platform + growth retainer | Hosting, CRO, backlog, content | Ongoing | $6k – $9k / month |

Indicative ranges; final quote confirmed after a 45-minute scoping call.

**Included:** design system, all surfaces, content and catalogue migration, payment/tax/shipping setup,
analytics, roles and audit trail, training, and 30 days of hypercare.

**Not included:** native iOS/Android apps (the PWA covers field use), a custom ERP, paid media management,
product photography, and a 3D configurator.

---

## 8. Next steps

1. **Scoping call (45 min)** — confirm SKUs, dealer tiers, shipping rules, dealer list and launch window.
2. **Choose the scope** — storefront first, or the full platform.
3. **Kickoff** — design system in week one; first clickable demo at the end of week two.

---

## 9. Demo access

The demo is a static build hosted on GitHub Pages. All data is fictional and no payment is processed.

| Role | Email | Password |
|------|-------|----------|
| Customer | marcus.hale@gmail.com | demo1234 |
| Dealer | orders@summitgaragedoors.com | demo1234 |
| Owner / admin | gustavo@thundermounts.com | demo1234 |

Use the surface switcher in the black bar at the top of the demo to jump between all six surfaces.

---

*Thunder Mounts Garage Systems LLC · 1712 Sinaloa Rd, Simi Valley, CA 93065 · 805-338-6680 · www.thundermounts.com*
