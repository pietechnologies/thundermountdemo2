import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Check, X, Printer, FileText, Database, Cloud, Lock, Layers, Wrench, ShoppingCart,
  Users, Handshake, LayoutDashboard, Smartphone, Globe, ShieldCheck, CircleDot, AlertCircle,
} from 'lucide-react'
import { phases, integrations, money } from '../data'

const toc = [
  ['summary', '1. Summary'],
  ['demo', '2. What this demo contains'],
  ['scope', '3. Scope of work'],
  ['matrix', '4. Feature matrix by role'],
  ['routes', '5. Site map & routes'],
  ['data', '6. Data model'],
  ['arch', '7. Architecture'],
  ['integrations', '8. Integrations'],
  ['design', '9. Design system'],
  ['plan', '10. Delivery plan'],
  ['accept', '11. Acceptance criteria'],
  ['launch', '12. Launch & migration'],
  ['assume', '13. Assumptions'],
  ['faq', '14. FAQ'],
] as const

function H2({ id, children, n }: { id: string; children: React.ReactNode; n?: string }) {
  return (
    <h2 id={id} className="scroll-mt-32 border-t border-line pt-8 text-xl font-extrabold tracking-tight sm:text-2xl">
      {n && <span className="mr-2 text-bolt">{n}</span>}
      {children}
    </h2>
  )
}

const matrix: { feature: string; guest: boolean | string; customer: boolean | string; dealer: boolean | string; staff: boolean | string; installer: boolean | string }[] = [
  { feature: 'Browse catalogue & content', guest: true, customer: true, dealer: true, staff: true, installer: false },
  { feature: 'Fitment finder', guest: true, customer: true, dealer: true, staff: true, installer: true },
  { feature: 'Buy at retail price', guest: true, customer: true, dealer: false, staff: true, installer: false },
  { feature: 'Buy at trade price', guest: false, customer: false, dealer: true, staff: true, installer: false },
  { feature: 'Save garage profile', guest: false, customer: true, dealer: true, staff: true, installer: false },
  { feature: 'Order history & tracking', guest: false, customer: true, dealer: true, staff: true, installer: false },
  { feature: 'Quotes & POs', guest: false, customer: false, dealer: true, staff: true, installer: false },
  { feature: 'Net 30 / credit terms', guest: false, customer: false, dealer: true, staff: true, installer: false },
  { feature: 'Book an installation', guest: 'limited', customer: true, dealer: true, staff: true, installer: false },
  { feature: 'Job checklist & photos', guest: false, customer: false, dealer: 'view', staff: true, installer: true },
  { feature: 'Inventory management', guest: false, customer: false, dealer: 'own stock', staff: true, installer: 'truck' },
  { feature: 'Dealer approvals', guest: false, customer: false, dealer: false, staff: true, installer: false },
  { feature: 'Website CMS', guest: false, customer: false, dealer: false, staff: true, installer: false },
  { feature: 'Revenue analytics', guest: false, customer: false, dealer: 'own only', staff: true, installer: false },
  { feature: 'Team & roles', guest: false, customer: false, dealer: 'own users', staff: true, installer: false },
]

const entities = [
  { name: 'Product', fields: 'sku, name, category, price, msrp, image, maxLength, fits, stock, installTime, includes[], seo' },
  { name: 'Variant / Kit', fields: 'productId, contents[], weight, dims, shipsFrom' },
  { name: 'Customer', fields: 'name, email, phone, addresses[], tier, points, createdAt' },
  { name: 'Garage', fields: 'customerId, doors[], ceilingHeight, measuredDrop, mountStyle, openerBrand, photos[], documents[]' },
  { name: 'Order', fields: 'number, customerId | dealerId, channel, lines[], subtotal, shipping, tax, total, status, tracking' },
  { name: 'Dealer', fields: 'dealerId, name, tier, discount, terms, creditLimit, creditUsed, region, rep, status' },
  { name: 'DealerUser', fields: 'dealerId, name, email, role (owner / installer / billing)' },
  { name: 'Quote', fields: 'number, dealerId, customer, address?, value, stage, owner, source, validUntil, lines[]' },
  { name: 'InstallJob', fields: 'number, orderId, customerId, address, date, window, technician, checklist[], photos[], signature, status' },
  { name: 'Ticket', fields: 'number, customerId, orderId?, subject, priority, channel, status, assignee, messages[]' },
  { name: 'ContentPage', fields: 'slug, title, hero, blocks[], seo, status, publishedAt' },
  { name: 'AuditEvent', fields: 'actorId, action, entity, entityId, diff, timestamp' },
]

export default function Docs() {
  const [active, setActive] = useState('summary')

  return (
    <div className="mx-auto max-w-[1180px] px-5 py-10 sm:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="eyebrow mb-2">Documentation</div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Scope & platform specification</h1>
          <p className="mt-2 max-w-2xl text-[14px] text-mist">
            The written companion to the demo and the pitch deck: what gets built, how it's structured, and how we'll
            know it's done.
          </p>
        </div>
        <div className="flex gap-2 no-print">
          <button onClick={() => window.print()} className="btn-dark btn-sm"><Printer className="h-3.5 w-3.5" /> Print / PDF</button>
          <a href="./proposal.md" download className="btn-dark btn-sm"><FileText className="h-3.5 w-3.5" /> proposal.md</a>
          <Link to="/pitch" className="btn-primary btn-sm">Proposal deck <ArrowRight className="h-3.5 w-3.5" /></Link>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
        <aside className="no-print sticky top-32 hidden h-fit lg:block">
          <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/30">Contents</div>
          <nav className="space-y-0.5">
            {toc.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setActive(id)}
                className={`block rounded-lg px-3 py-1.5 text-[12px] transition ${active === id ? 'bg-white/[0.06] text-white' : 'text-white/45 hover:text-white'}`}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="mt-6 rounded-xl border border-line bg-panel p-3">
            <div className="text-[11px] font-bold text-white/70">Demo logins</div>
            <div className="mt-2 space-y-1.5 text-[10px] text-white/40">
              <div>Customer · marcus.hale@gmail.com</div>
              <div>Dealer · orders@summitgaragedoors.com</div>
              <div>Owner · gustavo@thundermounts.com</div>
              <div className="pt-1 font-mono text-white/30">password · demo1234</div>
            </div>
          </div>
        </aside>

        <article className="min-w-0 space-y-9 text-[14px] leading-relaxed text-white/70">
          <section>
            <H2 id="summary" n="1">Summary</H2>
            <p className="mt-3">
              Thunder Mounts sells a genuinely differentiated product through a website that can only tell the story.
              This engagement replaces that site with a connected platform: a commerce storefront, customer accounts,
              a dealer portal, an internal operations console and a field app for installers — all backed by one
              catalogue, one stock pool and one reporting layer.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                ['Business goal', 'Convert dealer enquiries into self-serve orders and remove the manual work behind them.'],
                ['Primary KPI', 'Dealer self-serve order share, from 0% to 60% of dealer volume within two quarters.'],
                ['Secondary KPIs', 'Store conversion, fitment-tool completion, install attach rate, support ticket volume.'],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl border border-line bg-panel p-4">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-bolt">{k}</div>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-white/55">{v}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <H2 id="demo" n="2">What this demo contains</H2>
            <p className="mt-3">Everything below is clickable in this build and uses sample data. It is a design prototype, not the production system.</p>
            <div className="mt-4 overflow-hidden rounded-xl border border-line">
              {[
                ['/', 'Storefront home', 'Hero, categories, before/after, fitment teaser, bestsellers, portfolio, reviews', <ShoppingCart className="h-3.5 w-3.5" />],
                ['/shop', 'Catalogue', 'Filtering, sorting, search, stock states, add to cart', <Layers className="h-3.5 w-3.5" />],
                ['/product/:id', 'Product detail', 'Fitment, contents, trade price, install availability, reviews', <FileText className="h-3.5 w-3.5" />],
                ['/measure', 'Fitment finder', '3-step wizard → exact SKU + companion mount + saved profile', <Wrench className="h-3.5 w-3.5" />],
                ['/checkout', 'Checkout', 'Contact → shipping → payment → confirmation', <Globe className="h-3.5 w-3.5" />],
                ['/account', 'Customer dashboard', 'Orders, tracking, garage profile, installs, support', <Users className="h-3.5 w-3.5" />],
                ['/dealer', 'Dealer portal', 'Dashboard, orders, quote pipeline, price list, inventory, jobs, terms', <Handshake className="h-3.5 w-3.5" />],
                ['/admin', 'Owner console', 'KPIs, orders, inventory, dealers, installs, CMS, team & audit', <LayoutDashboard className="h-3.5 w-3.5" />],
                ['/field', 'Installer app', 'Route, checklist, photos, signature, close-out, offline state', <Smartphone className="h-3.5 w-3.5" />],
                ['/today', 'Current vs proposed', 'Side-by-side audit of what exists today', <AlertCircle className="h-3.5 w-3.5" />],
              ].map(([route, name, desc, icon], i) => (
                <div key={route as string} className={`grid gap-2 px-4 py-3 sm:grid-cols-[110px_160px_1fr] sm:items-center ${i ? 'border-t border-line' : ''}`}>
                  <div className="flex items-center gap-2 font-mono text-[11px] text-bolt">{icon} {route}</div>
                  <div className="text-[12px] font-semibold text-white/85">{name}</div>
                  <div className="text-[12px] text-white/45">{desc}</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <H2 id="scope" n="3">Scope of work</H2>
            <div className="mt-4 space-y-3">
              {phases.map((p) => (
                <div key={p.n} className="rounded-xl border border-line bg-panel p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-[14px] font-bold"><span className="mr-2 text-bolt">{p.n}</span>{p.title}</h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/35">{p.weeks}</span>
                  </div>
                  <ul className="mt-2.5 grid gap-1.5 sm:grid-cols-2">
                    {p.items.map((i) => (
                      <li key={i} className="flex gap-2 text-[12px] text-white/55"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-bolt" /> {i}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section>
            <H2 id="matrix" n="4">Feature matrix by role</H2>
            <p className="mt-3">Who can do what. This matrix drives the permission model and is written into the acceptance tests.</p>
            <div className="mt-4 overflow-x-auto rounded-xl border border-line">
              <table className="w-full min-w-[620px]">
                <thead className="bg-white/[0.03]">
                  <tr>
                    <th className="th">Capability</th>
                    <th className="th">Guest</th>
                    <th className="th">Customer</th>
                    <th className="th">Dealer</th>
                    <th className="th">Staff</th>
                    <th className="th">Installer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/70">
                  {matrix.map((r) => (
                    <tr key={r.feature}>
                      <td className="td text-[12px]">{r.feature}</td>
                      {[r.guest, r.customer, r.dealer, r.staff, r.installer].map((v, i) => (
                        <td key={i} className="td">
                          {v === true ? <Check className="h-4 w-4 text-emerald-400" /> : v === false ? <X className="h-3.5 w-3.5 text-white/15" /> : <span className="text-[10px] uppercase tracking-wider text-amber-300/80">{v}</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <H2 id="routes" n="5">Site map & routes</H2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                { g: 'Public', items: ['/', '/shop', '/product/:slug', '/measure', '/installers', '/our-story', '/portfolio', '/blog', '/support'] },
                { g: 'Customer', items: ['/account', '/account/orders', '/account/garage', '/account/installs', '/account/support', '/checkout'] },
                { g: 'Dealer', items: ['/dealer', '/dealer/orders', '/dealer/quotes', '/dealer/catalog', '/dealer/inventory', '/dealer/jobs', '/dealer/account'] },
                { g: 'Internal', items: ['/admin', '/admin/orders', '/admin/inventory', '/admin/customers', '/admin/dealers', '/admin/installs', '/admin/content', '/admin/team'] },
              ].map((c) => (
                <div key={c.g} className="rounded-xl border border-line bg-panel p-4">
                  <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-bolt">{c.g}</div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {c.items.map((i) => <span key={i} className="rounded bg-black/40 px-2 py-1 font-mono text-[10px] text-white/50">{i}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <H2 id="data" n="6">Data model</H2>
            <p className="mt-3">Core entities. Everything else (dashboards, quotes, jobs) is derived from these records, which is what keeps reporting trustworthy.</p>
            <div className="mt-4 overflow-hidden rounded-xl border border-line">
              {entities.map((e, i) => (
                <div key={e.name} className={`grid gap-1 px-4 py-3 sm:grid-cols-[140px_1fr] ${i ? 'border-t border-line' : ''}`}>
                  <div className="flex items-center gap-2 text-[12px] font-bold text-white/85"><Database className="h-3 w-3 text-bolt" /> {e.name}</div>
                  <div className="font-mono text-[11px] leading-relaxed text-white/40">{e.fields}</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <H2 id="arch" n="7">Architecture</H2>
            <div className="mt-4 rounded-xl border border-line bg-panel p-5">
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { t: 'Client layer', i: <Globe className="h-4 w-4" />, items: ['Next.js storefront (SSR/ISR)', 'Account & portal SPA routes', 'Installer PWA (offline)'] },
                  { t: 'Application layer', i: <Cloud className="h-4 w-4" />, items: ['API routes / server actions', 'Auth + RBAC middleware', 'Jobs: email, sync, reports'] },
                  { t: 'Data layer', i: <Database className="h-4 w-4" />, items: ['Postgres (managed)', 'Object storage for photos', 'Redis cache / rate limits'] },
                ].map((c) => (
                  <div key={c.t} className="rounded-lg border border-line bg-black/30 p-4">
                    <div className="flex items-center gap-2 text-bolt">{c.i}<span className="text-[11px] font-bold uppercase tracking-wider">{c.t}</span></div>
                    <ul className="mt-2.5 space-y-1.5">
                      {c.items.map((i) => <li key={i} className="text-[11px] text-white/55">· {i}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] text-white/40">
                <span className="chip"><Lock className="h-3 w-3" /> RBAC on every route</span>
                <span className="chip"><ShieldCheck className="h-3 w-3" /> SOC2-friendly hosting</span>
                <span className="chip"><CircleDot className="h-3 w-3" /> Daily backups, 30-day retention</span>
              </div>
            </div>
          </section>

          <section>
            <H2 id="integrations" n="8">Integrations</H2>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {integrations.map((i) => (
                <div key={i.name} className="flex items-start gap-3 rounded-lg border border-line bg-panel px-4 py-3">
                  <span className="mt-0.5 rounded bg-white/[0.06] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white/40">{i.group}</span>
                  <div>
                    <div className="text-[12px] font-semibold">{i.name}</div>
                    <div className="text-[11px] text-white/40">{i.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <H2 id="design" n="9">Design system</H2>
            <p className="mt-3">The visual language you see in this demo is the proposed brand system: charcoal surfaces, one signal colour, and generous type.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr]">
              <div className="rounded-xl border border-line bg-panel p-4">
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/40">Palette</div>
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {[['#08080A', 'Ink'], ['#16161A', 'Panel'], ['#FFC300', 'Bolt'], ['#9A9AA5', 'Mist']].map(([c, n]) => (
                    <div key={n}>
                      <div className="h-12 rounded-lg border border-white/10" style={{ background: c }} />
                      <div className="mt-1 text-[10px] text-white/50">{n}</div>
                      <div className="font-mono text-[9px] text-white/25">{c}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-line bg-panel p-4">
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/40">Type & components</div>
                <div className="mt-2 text-[10px] leading-relaxed text-white/55">
                  Inter across weights 300–900 · display tracking −3% · 8pt spacing scale · 16px card radius ·
                  all interactive states defined (hover, focus, disabled, loading, empty, error).
                </div>
              </div>
            </div>
          </section>

          <section>
            <H2 id="plan" n="10">Delivery plan & milestones</H2>
            <div className="mt-4 overflow-hidden rounded-xl border border-line">
              {[
                ['M1', 'End of week 3', 'Storefront and catalogue live on staging; you can buy a product end-to-end.'],
                ['M2', 'End of week 6', 'Accounts, garage profiles, fitment tool and install booking complete.'],
                ['M3', 'End of week 9', 'Dealer portal in pilot with 2 dealers; trade pricing verified.'],
                ['M4', 'End of week 12', 'Admin console, inventory sync and installer app in field trial.'],
                ['M5', 'End of week 14', 'Production launch, training delivered, hypercare starts.'],
              ].map(([m, w, d], i) => (
                <div key={m} className={`grid gap-2 px-4 py-3 sm:grid-cols-[60px_140px_1fr] sm:items-center ${i ? 'border-t border-line' : ''}`}>
                  <div className="text-[12px] font-extrabold text-bolt">{m}</div>
                  <div className="text-[11px] uppercase tracking-wider text-white/40">{w}</div>
                  <div className="text-[12px] text-white/65">{d}</div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[12px] text-white/40">Demo each Friday, 30 minutes, with a clickable build. No phase is invoiced until you sign it off.</p>
          </section>

          <section>
            <H2 id="accept" n="11">Acceptance criteria</H2>
            <ul className="mt-3 space-y-2">
              {[
                'A guest can find the right mount size in under 60 seconds without contacting support.',
                'A customer can see order history, tracking and saved measurements in one place.',
                'A dealer can log in, see trade pricing, place an order against Net 30 and download an invoice.',
                'A lead from the store locator reaches a dealer inbox in under 60 seconds and escalates at 60 minutes.',
                'Staff can edit the homepage hero, publish, and see the change live without a developer.',
                'An installer can complete a job offline; photos and signature sync when reconnected.',
                'Owner dashboard reconciles to order data to the cent, split by channel and dealer.',
                'Lighthouse: 90+ performance, 95+ accessibility on the five primary public pages.',
                'All money, stock and permission actions appear in the audit trail.',
              ].map((c) => (
                <li key={c} className="flex gap-2.5 text-[13px] text-white/60"><Check className="mt-0.5 h-4 w-4 shrink-0 text-bolt" /> {c}</li>
              ))}
            </ul>
          </section>

          <section>
            <H2 id="launch" n="12">Launch & migration</H2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {[
                ['Content migration', 'All 19 SKUs, product photography, portfolio images and blog posts moved into the new catalogue and CMS.'],
                ['Redirects', 'A 1:1 map from every live Wix URL to its new equivalent, plus 301s for legacy pages, verified in staging.'],
                ['DNS & cutover', 'Launch on a staging subdomain, verify checkout and tax, then switch DNS in a low-traffic window.'],
                ['Training', 'Two live sessions (office + field) and recorded SOPs for orders, refunds, dealer approvals and content.'],
                ['Hypercare', '30 days of daily checks, same-day bug fixes and a weekly performance report.'],
                ['Handover', 'Repository, environment access, credentials vault and a written runbook are transferred to you.'],
              ].map(([t, d]) => (
                <div key={t} className="rounded-lg border border-line bg-panel p-4">
                  <div className="text-[12px] font-bold">{t}</div>
                  <p className="mt-1 text-[11px] leading-relaxed text-white/45">{d}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <H2 id="assume" n="13">Assumptions & exclusions</H2>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-line bg-panel p-4">
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Included</div>
                <ul className="mt-2 space-y-1.5 text-[12px] text-white/55">
                  {['Design system & all six surfaces', 'Content & catalogue migration', 'Payment, tax and shipping setup', 'Analytics, roles, audit trail', 'Training + 30-day hypercare'].map((x) => (
                    <li key={x} className="flex gap-2"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" /> {x}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-line bg-panel p-4">
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Not included (available separately)</div>
                <ul className="mt-2 space-y-1.5 text-[12px] text-white/55">
                  {['Native iOS/Android apps (PWA covers field use)', 'Custom ERP build', 'Paid media management', 'Product photography', '3D configurator'].map((x) => (
                    <li key={x} className="flex gap-2"><X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400/80" /> {x}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-3 text-[12px] text-white/40">
              Assumes Stripe for payments, UPS for parcel shipping, and that dealer terms are decided by Thunder Mounts
              (tier thresholds, credit limits).
            </p>
          </section>

          <section>
            <H2 id="faq" n="14">FAQ</H2>
            <div className="mt-3 space-y-3">
              {[
                ['Can we keep the existing Wix site live while this is built?', 'Yes. The new platform is built on a staging domain and nothing changes on the live site until cutover.'],
                ['Do we own the code?', 'Yes — repository, hosting and all accounts are transferred to Thunder Mounts at handover.'],
                ['What happens to our product photography?', 'It migrates. We re-cut the images to the new aspect ratios and add alt text as part of Phase 1.'],
                ['Can dealers see each other’s pricing?', 'No. Dealer users only ever see their own tier, orders and credit. That is enforced server-side, not just hidden in the UI.'],
                ['What if we want to start smaller?', 'The "Storefront first" option delivers Phase 1–2 in six weeks and stands alone. The dealer portal can follow.'],
                ['How is the installer app distributed?', 'It is an installable PWA — no app store, no review delays, works offline on any modern tablet.'],
                ['Who maintains it after launch?', 'Either your team using the runbook and CMS, or the optional monthly retainer.'],
              ].map(([q, a]) => (
                <div key={q} className="rounded-xl border border-line bg-panel p-4">
                  <div className="text-[13px] font-bold">{q}</div>
                  <p className="mt-1 text-[12px] leading-relaxed text-white/50">{a}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="rounded-2xl border border-bolt/25 bg-bolt/[0.05] p-6 no-print">
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-bolt">Next step</div>
            <div className="mt-2 text-[16px] font-extrabold">Book the 45-minute scoping call.</div>
            <p className="mt-1.5 max-w-xl text-[12px] leading-relaxed text-white/60">
              We'll confirm SKUs, dealer tiers, shipping rules and the launch window — then Phase 1 starts the same week.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link to="/pitch" className="btn-primary btn-sm">Open the deck</Link>
              <Link to="/dealer" className="btn-dark btn-sm">Try the dealer portal</Link>
            </div>
          </div>

          <p className="pb-10 text-[11px] text-white/25">
            Prepared for Thunder Mounts Garage Systems LLC · Demo build · All data fictional · {money(0).replace('$0', 'No payment')} is processed anywhere in this demo.
          </p>
        </article>
      </div>
    </div>
  )
}
