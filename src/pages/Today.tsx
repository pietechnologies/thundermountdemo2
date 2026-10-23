import { Link } from 'react-router-dom'
import { ArrowRight, AlertTriangle, Check, X, ExternalLink, Monitor, Smartphone, Globe, ShoppingBag } from 'lucide-react'
import { gaps } from '../data'
import { DemoNote } from '../components/ui'

function BrowserFrame({ label, tone = 'dark', children }: { label: string; tone?: 'dark' | 'light'; children: React.ReactNode }) {
  return (
    <div className={`overflow-hidden rounded-2xl border ${tone === 'dark' ? 'border-line' : 'border-white/15'}`}>
      <div className={`flex items-center gap-2 px-3 py-2 ${tone === 'dark' ? 'border-b border-line bg-panel2' : 'border-b border-white/10 bg-[#f1f1f1]'}`}>
        <span className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        </span>
        <span className={`flex-1 truncate rounded-md px-2 py-0.5 text-[10px] ${tone === 'dark' ? 'bg-black/40 text-white/40' : 'bg-white text-black/50'}`}>
          {label}
        </span>
      </div>
      {children}
    </div>
  )
}

/** A deliberately faithful-in-spirit recreation of the current Wix site. */
function CurrentSiteMock() {
  return (
    <BrowserFrame label="www.thundermounts.com" tone="light">
      <div className="bg-white text-[#111]">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="text-[10px] font-bold tracking-[0.12em]">THUNDER MOUNTS</div>
          <div className="flex gap-3 text-[8px] uppercase tracking-wide text-black/60">
            {['Home', 'Shop', 'About', 'Portfolio', 'Blog', 'Contact'].map((x) => (
              <span key={x}>{x}</span>
            ))}
          </div>
        </div>

        <div className="relative h-40 overflow-hidden bg-[#1b1b1b]">
          <img src="./img/hero-garage.jpg" alt="" className="h-full w-full object-cover opacity-60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-center">
            <div className="text-[17px] font-black leading-tight tracking-tight text-white">BUILT FOR TODAY.</div>
            <div className="text-[17px] font-black leading-tight tracking-tight text-white">READY FOR TOMARROW.</div>
            <div className="mt-1 text-[7px] uppercase tracking-[0.2em] text-white/60">(sic — live site typo)</div>
            <div className="mt-2 rounded-sm bg-white px-3 py-1 text-[7px] font-bold text-black">SHOP NOW</div>
          </div>
        </div>

        <div className="px-4 py-4">
          <div className="text-[9px] font-bold uppercase tracking-wider text-black/50">All Products</div>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {[
              ['TMX - 19', '$523.00', '$395.00'],
              ['TML -29', '$523.00', '$420.00'],
              ['TMGTS-12', '$715.00', '$499.99'],
              ['TMS-12', '$490.00', '$392.00'],
              ['Marantec 370', '$450.00', ''],
              ['VEVOR Rack', '$220.00', '$198.00'],
            ].map(([n, a, b], i) => (
              <div key={n} className="border border-black/10">
                <div className="h-10 bg-[#f3f3f3]" />
                <div className="p-1.5">
                  <div className="text-[7px] font-bold">{n}</div>
                  <div className="text-[6px] text-black/50">
                    <span className="line-through">{a}</span> <span className="font-bold text-black">{b}</span>
                  </div>
                  <div className="text-[5.5px] text-black/35">Excluding Sales Tax |</div>
                  {i === 4 && <div className="mt-0.5 inline-block bg-black px-1 py-0.5 text-[5px] font-bold text-white">$0.00</div>}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2 border-t border-black/10 pt-2 text-[6.5px] text-black/40">
            <span className="rounded bg-[#f3f3f3] px-1.5 py-0.5">19 results</span>
            <span className="rounded bg-[#f3f3f3] px-1.5 py-0.5">Filter by</span>
            <span className="rounded bg-[#f3f3f3] px-1.5 py-0.5">Price $198–$2,200</span>
            <span className="ml-auto text-[6px] text-red-500">/shop → 404</span>
          </div>
        </div>
      </div>
    </BrowserFrame>
  )
}

function ProposedMock() {
  return (
    <BrowserFrame label="proposed — storefront" tone="dark">
      <div className="bg-ink">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="flex h-4 w-4 items-center justify-center rounded bg-bolt text-[7px] font-black text-black">T</span>
            <span className="text-[9px] font-extrabold tracking-tight">THUNDER MOUNTS</span>
          </div>
          <div className="flex items-center gap-2 text-[7px] uppercase tracking-wider text-white/45">
            {['Shop', 'Find your size', 'Installers', 'The system'].map((x) => <span key={x}>{x}</span>)}
            <span className="rounded bg-white px-1.5 py-0.5 text-[6.5px] font-bold text-black">CART · 2</span>
          </div>
        </div>

        <div className="relative h-40 overflow-hidden">
          <img src="./img/hero-garage.jpg" alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-4">
            <div className="text-[6px] font-bold uppercase tracking-[0.2em] text-bolt">Proposed redesign</div>
            <div className="mt-1 max-w-[70%] text-[15px] font-black leading-[1.05] tracking-tight text-white">
              BUILT FOR TODAY.<br /><span className="text-bolt">READY FOR TOMORROW.</span>
            </div>
            <div className="mt-2 flex gap-1.5">
              <span className="rounded-full bg-bolt px-2 py-0.5 text-[6px] font-bold text-black">Find your mount size</span>
              <span className="rounded-full border border-white/20 px-2 py-0.5 text-[6px] font-bold text-white/70">Shop the system</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-1.5 px-3 py-3">
          {[
            ['Track mounts', './img/product-hardware.jpg'],
            ['Opener mounts', './img/hero-garage.jpg'],
            ['Openers', './img/opener-unit.jpg'],
            ['Storage', './img/storage-rack.jpg'],
          ].map(([t, img]) => (
            <div key={t} className="overflow-hidden rounded-md border border-line">
              <img src={img} alt="" className="h-10 w-full object-cover" />
              <div className="px-1 py-1 text-[6px] font-bold">{t}</div>
            </div>
          ))}
        </div>

        <div className="mx-3 mb-3 rounded-md border border-bolt/30 bg-bolt/[0.07] px-2 py-1.5">
          <div className="flex items-center justify-between">
            <div className="text-[6.5px] font-bold text-bolt">Fitment finder · 18" → TMGTX-19</div>
            <div className="text-[6px] text-white/40">saved to your garage</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1.5 px-3 pb-3">
          {[['TMGTX-19', '$499.99', 'In stock'], ['TMS-12', '$395.00', 'In stock'], ['TMGTL-29', '$599.99', '8 left']].map(([n, p, s]) => (
            <div key={n} className="rounded-md border border-line bg-panel p-1.5">
              <div className="text-[6px] font-mono text-white/35">{n}</div>
              <div className="text-[7px] font-extrabold">{p}</div>
              <div className="text-[5.5px] text-emerald-400">{s} · ships 24h</div>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  )
}

const audit = [
  { area: 'Navigation & IA', now: 'Mixed Wix pages, duplicate "about" URLs (about-3, about-5-1), inconsistent naming', next: 'One coherent menu: Shop · Find your size · Installers · The system', sev: 'High' },
  { area: 'Product data', now: 'Same copy repeated across SKUs, $0.00 placeholders, no specs or fitment fields', next: 'Structured catalogue: SKU, max span, fitment, stock, install time, reviews', sev: 'High' },
  { area: 'Buying path', now: 'Cart exists; /shop 404s; no account, no fitment help, no install option', next: 'Fitment → cart → checkout → account → install booking, all connected', sev: 'High' },
  { area: 'Dealer experience', now: 'No trade login, no pricing tiers, no POs, no credit terms', next: 'Full dealer portal with tiers, quotes, stock and Net 30', sev: 'Critical' },
  { area: 'Trust', now: 'Typo in the headline ("TOMARROW"), broken pages, dead links', next: 'Consistent brand system, real reviews, warranty and install proof', sev: 'Medium' },
  { area: 'Content ops', now: 'Any change needs a developer or Wix editor training', next: 'CMS with hero, pages, products and SEO editable by the team', sev: 'Medium' },
  { area: 'Measurement', now: 'No funnel, no channel split, no dealer leaderboard', next: 'Owner dashboard with channel, SKU, funnel and dealer reporting', sev: 'Medium' },
]

export default function Today() {
  return (
    <div className="mx-auto max-w-[1180px] px-5 py-10 sm:px-8 sm:py-14">
      <div className="mb-8">
        <div className="eyebrow mb-2">Current site audit</div>
        <h1 className="max-w-3xl text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
          What you have today — and what it becomes.
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-mist">
          The existing site is a strong story with a weak system underneath. Nothing here is a criticism of the brand —
          it's the gap between a brochure and a business.
        </p>
      </div>

      <DemoNote title="About this comparison">
        The left panel is a recreation of the current thundermounts.com layout and content, used here to show the
        contrast. The live site itself is unchanged.
      </DemoNote>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <div>
          <div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/40">
            <X className="h-3.5 w-3.5 text-rose-400" /> Today
          </div>
          <CurrentSiteMock />
          <ul className="mt-3 space-y-1.5">
            {['No dealer or customer login', 'Product pages lack fitment data', 'No install scheduling', 'Reporting limited to Wix stats'].map((x) => (
              <li key={x} className="flex items-center gap-2 text-[12px] text-white/45"><X className="h-3.5 w-3.5 text-rose-400/70" /> {x}</li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-bolt">
            <Check className="h-3.5 w-3.5" /> Proposed
          </div>
          <ProposedMock />
          <ul className="mt-3 space-y-1.5">
            {['Customer, dealer and admin logins', 'Fitment data on every SKU', 'Install booking + installer app', 'Owner analytics across channels'].map((x) => (
              <li key={x} className="flex items-center gap-2 text-[12px] text-white/60"><Check className="h-3.5 w-3.5 text-bolt" /> {x}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-3">
        {[
          { i: <Monitor className="h-4 w-4" />, t: 'Desktop', d: '1200–1920px, every surface' },
          { i: <Smartphone className="h-4 w-4" />, t: 'Mobile', d: '360px+ storefront & accounts' },
          { i: <Globe className="h-4 w-4" />, t: 'Performance', d: '90+ Lighthouse target' },
        ].map((x) => (
          <div key={x.t} className="flex items-center gap-3 rounded-xl border border-line bg-panel p-4">
            <span className="text-bolt">{x.i}</span>
            <div>
              <div className="text-[12px] font-bold">{x.t}</div>
              <div className="text-[11px] text-white/40">{x.d}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-extrabold tracking-tight">Detailed audit</h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-line">
          <div className="hidden grid-cols-[1.1fr_1.4fr_1.4fr_90px] bg-white/[0.03] sm:grid">
            {['Area', 'Today', 'Proposed', 'Priority'].map((h) => (
              <div key={h} className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">{h}</div>
            ))}
          </div>
          {audit.map((a, i) => (
            <div key={a.area} className={`grid gap-2 px-4 py-4 sm:grid-cols-[1.1fr_1.4fr_1.4fr_90px] sm:gap-4 ${i % 2 ? 'bg-white/[0.015]' : ''} border-t border-line first:border-0`}>
              <div className="text-[12px] font-bold">{a.area}</div>
              <div className="text-[12px] leading-relaxed text-white/40">{a.now}</div>
              <div className="text-[12px] leading-relaxed text-white/75">{a.next}</div>
              <div>
                <span className={`badge ${a.sev === 'Critical' ? 'bg-rose-500/15 text-rose-300' : a.sev === 'High' ? 'bg-amber-500/15 text-amber-300' : 'bg-white/10 text-white/60'}`}>{a.sev}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {gaps.slice(0, 6).map((g) => (
          <div key={g.area} className="rounded-2xl border border-line bg-panel p-5">
            <div className="flex items-center justify-between">
              <div className="text-[13px] font-bold">{g.area}</div>
              <span className="rounded-full bg-bolt/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-bolt">{g.impact}</span>
            </div>
            <p className="mt-2 text-[12px] leading-relaxed text-white/45">{g.tomorrow}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-3 rounded-2xl border border-line bg-panel p-6">
        <ShoppingBag className="h-5 w-5 text-bolt" />
        <div className="flex-1">
          <div className="text-[14px] font-bold">See the difference in the demo</div>
          <div className="text-[12px] text-white/45">Start at the storefront, then try the dealer portal — it's the biggest change.</div>
        </div>
        <Link to="/" className="btn-primary btn-sm">Open the storefront <ArrowRight className="h-3.5 w-3.5" /></Link>
        <Link to="/dealer" className="btn-dark btn-sm">Dealer portal <ExternalLink className="h-3.5 w-3.5" /></Link>
      </div>
    </div>
  )
}
