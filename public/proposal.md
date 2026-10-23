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

Six connected areas. Each is demoed and signed off on its own before the next begins.

**01 · Storefront & marketing site** — design system and brand refresh; product catalogue and fitment
schema; measure-to-mount tool on every product page; cart, checkout and shipping rules; portfolio, blog,
reviews and SEO.

**02 · Customer accounts & commerce** — accounts and garage profiles; order history, tracking and
reorders; payments, tax and returns; email and SMS lifecycle; analytics baseline.

**03 · Dealer portal** — dealer application and approval; tiered pricing and Net 30 credit; quotes, POs
and bulk ordering; co-branded catalogues; lead routing by ZIP code.

**04 · Owner console** — orders, refunds and RMAs; inventory and price control; dealer network
management; install scheduling and dispatch; website CMS, roles and audit trail.

**05 · Installer app** — route and job detail; guided checklist; photo evidence and signature; offline
operation with sync; job close-out and stock draw.

**06 · Reporting & integrations** — channel and dealer reporting; SKU performance and funnel; payments,
accounting and shipping; email, SMS and CRM; exports and scheduled digests.

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

## 5. Admin actions

What staff can do in the owner console without a developer, a spreadsheet or an email to the office.
Every action is role-checked and written to the audit trail. All of these are clickable in the demo's
**Action Centre** at `/admin`.

### Orders & payments
Create a manual order · edit line items · apply a discount · capture or refund a payment · void or cancel
an order · add tracking and split shipments · resend invoice or receipt · issue an RMA.

### Inventory & pricing
Adjust stock · set reorder points · raise a purchase order · transfer between locations · bulk price
change · add a new product · pause or hide a SKU.

### Dealers & leads
Approve or reject an application · set tier and discount · set credit limit and terms · assign a rep ·
map ZIP codes · reassign a lead · suspend a dealer · invite dealer users.

### Installations
Schedule a job · assign or reassign a technician · reschedule with the customer · review job photos and
signature · close out and invoice · issue a change order.

### Website content
Edit the homepage hero · publish or unpublish a page · edit product copy and specs · moderate reviews ·
update the portfolio · manage SEO and redirects.

### Customers
View a full customer record · issue store credit or points · merge duplicate accounts · send a password
reset · export or erase customer data.

### Team & security
Invite a team member · change a role · revoke access · review the audit trail · enable two-factor
authentication.

### Reports & exports
Export orders, stock or dealers · run a sales tax report · pull a dealer statement · compare channels ·
schedule a weekly digest.

**Guarded by design:** refunds above $1,000 need owner approval, stock adjustments require a reason code,
dealer credit limits are verified before Net 30 orders, and two-factor is required for admin and owner
accounts.

---

## 6. Technical approach

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

## 7. Acceptance criteria

1. A guest can find the right mount size in under 60 seconds without contacting support.
2. A customer can see order history, tracking and saved measurements in one place.
3. A dealer can log in, see trade pricing, order against Net 30 and download an invoice.
4. A store-locator lead reaches a dealer inbox in under 60 seconds and escalates at 60 minutes.
5. Staff can edit the homepage hero, publish, and see it live without a developer.
6. An installer can complete a job offline; photos and signature sync when reconnected.
7. The owner dashboard reconciles to order data to the cent, split by channel and dealer.
8. Every admin action in section 5 is available to the right role and blocked for the wrong one.
9. Lighthouse: 90+ performance and 95+ accessibility on the five primary public pages.
10. Every money, stock and permission action appears in the audit trail.

---

## 8. What is included

Design system and all six surfaces · content and catalogue migration · payment, tax and shipping setup ·
analytics, roles and audit trail · training with recorded SOPs · repository, hosting and account handover.

**Not included:** native iOS/Android apps (the PWA covers field use), a custom ERP, payroll and full
accounting, paid media management, product photography, and a 3D configurator.

---

## 9. Next steps

1. **Scoping call** — confirm SKUs, dealer tiers, shipping rules and which logins each team needs.
2. **Choose the scope** — storefront first, or every surface at once. The catalogue and design system come
   first either way.
3. **Kickoff** — we start with your catalogue, photography and dealer list, then demo the first surface.

---

## 10. Demo access

The demo is a static build hosted on GitHub Pages. All data is fictional and no payment is processed.

| Role | Email | Password |
|------|-------|----------|
| Customer | marcus.hale@gmail.com | demo1234 |
| Dealer | orders@summitgaragedoors.com | demo1234 |
| Owner / admin | gustavo@thundermounts.com | demo1234 |

Use the surface switcher in the black bar at the top of the demo. The owner console's **Action centre**
lists every action from section 5 with a working "Run" button.

---

*Thunder Mounts Garage Systems LLC · 1712 Sinaloa Rd, Simi Valley, CA 93065 · 805-338-6680 · www.thundermounts.com*
