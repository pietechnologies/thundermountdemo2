import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight, ArrowLeft, X, Zap, ShoppingCart, User, Handshake, LayoutDashboard, Wrench,
  Check, AlertTriangle, TrendingUp, Clock, Globe, Lock, Smartphone, Database, Cloud, CreditCard,
  Package, Mail, MessageSquare, BarChart3, Play, ChevronRight, Sparkles, Target, Layers, MapPin,
} from 'lucide-react'
import { gaps, phases, integrations, kpisForPitch, money } from '../data'

type Slide = { id: string; label: string; render: () => React.ReactNode }

const surfaceCards = [
  { icon: <ShoppingCart className="h-5 w-5" />, title: 'Storefront', desc: 'Catalogue, fitment finder, checkout, installer locator', to: '/shop', tag: 'Public' },
  { icon: <User className="h-5 w-5" />, title: 'Customer account', desc: 'Orders, garage profile, installs, support', to: '/account', tag: 'Signed in' },
  { icon: <Handshake className="h-5 w-5" />, title: 'Dealer portal', desc: 'Trade pricing, quotes, stock, credit terms', to: '/dealer', tag: 'Trade' },
  { icon: <LayoutDashboard className="h-5 w-5" />, title: 'Owner console', desc: 'Orders, inventory, dealers, content, analytics', to: '/admin', tag: 'Internal' },
  { icon: <Smartphone className="h-5 w-5" />, title: 'Installer app', desc: 'Route, checklist, photos, signature, close-out', to: '/field', tag: 'Field' },
  { icon: <Globe className="h-5 w-5" />, title: 'Marketing site', desc: 'Story, portfolio, blog, SEO, content CMS', to: '/our-story', tag: 'Public' },
]

function SlideShell({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1180px] px-6 py-10 sm:px-10 sm:py-14 ${className}`}>{children}</div>
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-bolt">{children}</div>
}

const slides: Slide[] = [
  {
    id: 'cover',
    label: 'Cover',
    render: () => (
      <div className="relative flex min-h-[calc(100vh-48px)] items-center overflow-hidden">
        <img src="./img/hero-garage.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/40" />
        <SlideShell>
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-bolt/30 bg-bolt/[0.08] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-bolt">
              <Sparkles className="h-3 w-3" /> Proposal · October 2026
            </div>
            <h1 className="text-4xl font-extrabold leading-[0.98] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
              THE CONNECTED
              <br />
              <span className="text-bolt">THUNDER MOUNTS.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              A storefront, customer accounts, a dealer portal, an owner console and an installer app — one platform
              replacing the brochure site with a system that sells, services and scales.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))}
                className="btn-primary px-6 py-3.5 text-[15px]"
              >
                <Play className="h-4 w-4" /> Walk through the proposal
              </button>
              <Link to="/" className="btn-dark px-6 py-3.5 text-[15px]">
                Open the live demo <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-[11px] uppercase tracking-[0.18em] text-white/35">
              <span>Prepared for Thunder Mounts Garage Systems</span>
              <span className="hidden h-3 w-px bg-white/20 sm:block" />
              <span>Simi Valley, California</span>
            </div>
          </div>
        </SlideShell>
      </div>
    ),
  },
  {
    id: 'today',
    label: 'Today',
    render: () => (
      <SlideShell>
        <Eyebrow>01 · Where you are today</Eyebrow>
        <h2 className="max-w-3xl text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
          A great product behind a website that can't keep up.
        </h2>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-mist">
          The current site is a Wix build that tells the story well, but it stops where the business starts: no dealer
          login, no customer accounts, no install scheduling, and no shared view of orders or stock.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ['No dealer login', 'Trade orders arrive by phone and email. Pricing, terms and availability are handled by hand.'],
            ['No customer accounts', 'Guest checkout only — no order history, no garage profile, no reorders.'],
            ['Mixed legacy pages', 'Duplicate product pages, dead links, $0.00 placeholders, inconsistent copy across SKUs.'],
            ['No fitment logic', 'The measure guide is an image and a paragraph. Wrong-size orders reach support.'],
            ['No install workflow', 'Scheduling happens in a calendar and a text thread.'],
            ['Blind reporting', 'Wix stats only — no dealer vs. direct split, no SKU margin, no funnel.'],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-line bg-panel p-5">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              <div className="mt-3 text-[13px] font-bold">{t}</div>
              <p className="mt-1.5 text-[12px] leading-relaxed text-white/45">{d}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl border border-line bg-panel p-5">
          <span className="text-[13px] text-white/60">Want the detailed audit?</span>
          <Link to="/today" className="btn-dark btn-sm">View current site vs. proposed <ArrowRight className="h-3.5 w-3.5" /></Link>
        </div>
      </SlideShell>
    ),
  },
  {
    id: 'cost',
    label: 'The cost',
    render: () => (
      <SlideShell>
        <Eyebrow>02 · What the gaps cost</Eyebrow>
        <h2 className="max-w-3xl text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
          The leaks are measurable — and they're all in the same place.
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { v: '~9 hrs', l: 'per week', d: 'Manual dealer orders, pricing and availability checks' },
            { v: '21%', l: 'of tickets', d: 'Are sizing questions a fitment tool would answer instantly' },
            { v: '58%', l: 'of revenue', d: 'Comes from dealers with zero self-serve tools' },
            { v: '0', l: 'customer accounts', d: 'No garage data captured — every order starts from scratch' },
          ].map((x) => (
            <div key={x.l} className="rounded-2xl border border-line bg-panel p-6">
              <div className="text-4xl font-extrabold tracking-tight text-bolt">{x.v}</div>
              <div className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white/35">{x.l}</div>
              <p className="mt-3 text-[12px] leading-relaxed text-white/50">{x.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-bolt/25 bg-bolt/[0.05] p-6">
          <div className="flex items-start gap-3">
            <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-bolt" />
            <p className="text-[14px] leading-relaxed text-white/75">
              <b className="text-white">The compounding problem:</b> the dealer channel is the growth engine, but it's the
              least supported part of the business. Every new dealer adds manual work unless the portal exists first.
            </p>
          </div>
        </div>
      </SlideShell>
    ),
  },
  {
    id: 'vision',
    label: 'Vision',
    render: () => (
      <SlideShell>
        <Eyebrow>03 · The proposal</Eyebrow>
        <h2 className="max-w-3xl text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
          One platform. Six surfaces. One source of truth.
        </h2>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-mist">
          Everything shares the same catalogue, the same stock and the same customers. A dealer order, a direct sale and
          an install job all update the same record — which is what makes the dashboards trustworthy.
        </p>

        <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {surfaceCards.map((s, i) => (
            <Link key={s.title} to={s.to} className="group rounded-2xl border border-line bg-panel p-5 transition hover:-translate-y-0.5 hover:border-bolt/50">
              <div className="flex items-start justify-between">
                <span className="rounded-xl border border-line bg-white/[0.03] p-2.5 text-bolt">{s.icon}</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/25">{s.tag}</span>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-[15px] font-bold">
                {s.title}
                <ArrowRight className="h-3.5 w-3.5 text-white/25 transition group-hover:translate-x-0.5 group-hover:text-bolt" />
              </div>
              <p className="mt-1 text-[12px] leading-relaxed text-white/45">{s.desc}</p>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2 text-[11px] text-white/35">
          <span className="chip"><Database className="h-3 w-3" /> One catalogue</span>
          <span className="chip"><Package className="h-3 w-3" /> One stock pool</span>
          <span className="chip"><Users2 /> One customer record</span>
          <span className="chip"><BarChart3 className="h-3 w-3" /> One reporting layer</span>
        </div>
      </SlideShell>
    ),
  },
  {
    id: 'storefront',
    label: 'Storefront',
    render: () => (
      <Surface
        eyebrow="04 · Surface one"
        title="A storefront that sells the system, not a list of parts."
        points={[
          'Catalogue with fitment data on every SKU — size, ceiling, opener compatibility',
          'Measure-to-mount finder that returns the exact kit and saves the measurement',
          'Real stock, lead times and installation time on the product page',
          'Certified installer locator with fixed pricing and 2-hour windows',
          'Dealer / trade price surfaced on the same PDP, gated by login',
        ]}
        image="./img/hero-garage.jpg"
        to="/"
        cta="Open the storefront"
      />
    ),
  },
  {
    id: 'customer',
    label: 'Customer',
    render: () => (
      <Surface
        eyebrow="05 · Surface two"
        title="Customers who can serve themselves stay customers."
        points={[
          'Order history with live tracking and one-click reorder',
          'Garage profile: doors, ceiling height, measurements, installed SKUs',
          'Install scheduling, reschedule and job photos in one place',
          'Support tickets that arrive with the garage context attached',
          'Loyalty points and credit that drive the next purchase',
        ]}
        image="./img/finished-garage.jpg"
        to="/account"
        cta="Open the customer dashboard"
        reverse
      />
    ),
  },
  {
    id: 'dealer',
    label: 'Dealer',
    render: () => (
      <Surface
        eyebrow="06 · Surface three"
        title="The dealer portal is where the revenue lives."
        points={[
          'Platinum / Gold / Silver tiers with automatic trade pricing',
          'Live stock and lead times — quote the same day, not next week',
          'Net 30 credit line, statements and invoice history',
          'Quote pipeline with leads routed automatically by ZIP',
          'Co-branded catalogues and bulk order pads for truck stock',
        ]}
        image="./img/dealer-showroom.jpg"
        to="/dealer"
        cta="Open the dealer portal"
      />
    ),
  },
  {
    id: 'admin',
    label: 'Owner',
    render: () => (
      <Surface
        eyebrow="07 · Surface four"
        title="One console for orders, stock, dealers and the website."
        points={[
          'Revenue by channel, dealer leaderboard and SKU performance',
          'Shared inventory with reorder alerts and marketplace sync',
          'Dealer applications, approvals and network management',
          'Website CMS — hero, pages, products and SEO without a developer',
          'Roles, permissions and an audit trail on every change',
        ]}
        image="./img/product-hardware.jpg"
        to="/admin"
        cta="Open the owner console"
        reverse
      />
    ),
  },
  {
    id: 'field',
    label: 'Installer',
    render: () => (
      <Surface
        eyebrow="08 · Surface five"
        title="Installers finish the job in the app, not on paper."
        points={[
          'Today’s route with windows, addresses and job value',
          'Guided checklist — the same steps on every install',
          'Before / after photo capture filed to the customer record',
          'On-screen signature and instant job close-out',
          'Works offline on a tablet, syncs when signal returns',
        ]}
        image="./img/installer.jpg"
        to="/field"
        cta="Open the installer app"
      />
    ),
  },
  {
    id: 'compare',
    label: 'Before / after',
    render: () => (
      <SlideShell>
        <Eyebrow>09 · Before and after</Eyebrow>
        <h2 className="text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">The difference, side by side.</h2>

        <div className="mt-8 overflow-hidden rounded-2xl border border-line">
          <div className="grid grid-cols-[140px_1fr_1fr] bg-white/[0.03] text-[10px] font-bold uppercase tracking-[0.16em] text-white/40 sm:grid-cols-[180px_1fr_1fr]">
            <div className="px-4 py-3">Area</div>
            <div className="border-l border-line px-4 py-3">Today</div>
            <div className="border-l border-line px-4 py-3 text-bolt">Proposed</div>
          </div>
          {gaps.map((g, i) => (
            <div key={g.area} className={`grid grid-cols-[140px_1fr_1fr] text-[11px] sm:text-[12px] ${i % 2 ? 'bg-white/[0.015]' : ''}`}>
              <div className="border-t border-line px-4 py-4">
                <div className="font-bold">{g.area}</div>
                <div className="mt-1 text-[9px] font-semibold uppercase tracking-wider text-bolt/80">{g.impact}</div>
              </div>
              <div className="border-l border-t border-line px-4 py-4 leading-relaxed text-white/40">{g.today}</div>
              <div className="border-l border-t border-line px-4 py-4 leading-relaxed text-white/80">{g.tomorrow}</div>
            </div>
          ))}
        </div>
      </SlideShell>
    ),
  },
  {
    id: 'outcomes',
    label: 'Outcomes',
    render: () => (
      <SlideShell>
        <Eyebrow>10 · What it changes</Eyebrow>
        <h2 className="max-w-3xl text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
          Fewer hours on admin. More dealers without more headcount.
        </h2>
        <div className="mt-9 grid gap-4 lg:grid-cols-3">
          {[
            {
              icon: <TrendingUp className="h-5 w-5" />,
              t: 'Revenue',
              items: ['Dealer self-serve ordering lifts reorder rate', 'Fitment tool removes the #1 abandonment reason', 'Install upsell attached to every order', 'Marketplace + store on one stock pool'],
            },
            {
              icon: <Clock className="h-5 w-5" />,
              t: 'Operations',
              items: ['~9 manual hours/week recovered', 'One stock pool — no double-selling', 'Install dispatch visible in real time', 'Dealer onboarding in days, not weeks'],
            },
            {
              icon: <Target className="h-5 w-5" />,
              t: 'Customers',
              items: ['Answers before they have to call', 'Garage data saved for the next purchase', 'Transparent install windows', 'Fewer wrong-size orders and returns'],
            },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-line bg-panel p-6">
              <span className="inline-flex rounded-xl border border-line bg-white/[0.03] p-2.5 text-bolt">{c.icon}</span>
              <h3 className="mt-4 text-lg font-extrabold">{c.t}</h3>
              <ul className="mt-3 space-y-2">
                {c.items.map((i) => (
                  <li key={i} className="flex gap-2 text-[12px] leading-relaxed text-white/55">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-bolt" /> {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-4">
          {kpisForPitch.map((k) => (
            <div key={k.label} className="rounded-xl border border-line bg-white/[0.02] px-4 py-3">
              <div className="text-2xl font-extrabold text-bolt">{k.value}</div>
              <div className="text-[10px] uppercase tracking-wider text-white/35">{k.label}</div>
            </div>
          ))}
        </div>
      </SlideShell>
    ),
  },
  {
    id: 'tech',
    label: 'Technology',
    render: () => (
      <SlideShell>
        <Eyebrow>11 · Technology</Eyebrow>
        <h2 className="max-w-3xl text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
          Boring, proven infrastructure — chosen so it doesn't need a team.
        </h2>
        <div className="mt-9 grid gap-4 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-3">
            {[
              { i: <Globe className="h-4 w-4" />, t: 'Next.js + TypeScript on Vercel', d: 'Fast, SEO-strong storefront with edge caching and instant deploys.' },
              { i: <Database className="h-4 w-4" />, t: 'Postgres (managed)', d: 'Products, orders, dealers, jobs and garage profiles in one schema.' },
              { i: <Lock className="h-4 w-4" />, t: 'Role-based auth', d: 'Customer, dealer-user, installer, staff and owner permission sets.' },
              { i: <Cloud className="h-4 w-4" />, t: 'Cloudflare in front', d: 'CDN, WAF, image optimisation and uptime monitoring included.' },
              { i: <Smartphone className="h-4 w-4" />, t: 'Installable PWA for field', d: 'No app-store review, installs from a link, works offline.' },
            ].map((x) => (
              <div key={x.t} className="flex gap-3 rounded-xl border border-line bg-panel p-4">
                <span className="text-bolt">{x.i}</span>
                <div>
                  <div className="text-[13px] font-bold">{x.t}</div>
                  <div className="mt-0.5 text-[12px] leading-relaxed text-white/45">{x.d}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-line bg-panel p-6">
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/40">Integrations</div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {integrations.map((i) => (
                <div key={i.name} className="rounded-lg border border-line bg-white/[0.02] px-3 py-2">
                  <div className="text-[12px] font-semibold">{i.name}</div>
                  <div className="text-[10px] text-white/35">{i.role}</div>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-lg border border-bolt/25 bg-bolt/[0.05] px-3 py-2.5 text-[11px] leading-relaxed text-bolt/90">
              Existing Wix content, products and images migrate automatically — plus 301 redirects so nothing loses
              its Google ranking.
            </div>
          </div>
        </div>
      </SlideShell>
    ),
  },
  {
    id: 'plan',
    label: 'Plan',
    render: () => (
      <SlideShell>
        <Eyebrow>12 · Delivery plan</Eyebrow>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
            14 weeks, five phases, weekly demos.
          </h2>
          <div className="flex gap-2 text-[11px]">
            <span className="chip">No big-bang launch</span>
            <span className="chip">You approve each phase</span>
          </div>
        </div>

        <div className="mt-9 space-y-3">
          {phases.map((p) => (
            <div key={p.n} className="grid gap-3 rounded-2xl border border-line bg-panel p-5 sm:grid-cols-[80px_1fr]">
              <div>
                <div className="text-2xl font-extrabold text-white/15">{p.n}</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-bolt">{p.weeks}</div>
              </div>
              <div>
                <div className="text-[15px] font-bold">{p.title}</div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {p.items.map((i) => (
                    <span key={i} className="rounded-md border border-line bg-white/[0.02] px-2 py-1 text-[11px] text-white/50">{i}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SlideShell>
    ),
  },
  {
    id: 'investment',
    label: 'Investment',
    render: () => (
      <SlideShell>
        <Eyebrow>13 · Engagement options</Eyebrow>
        <h2 className="max-w-3xl text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
          Start where it hurts most, or do the whole thing.
        </h2>
        <p className="mt-3 text-[13px] text-mist">Indicative ranges — final quote confirmed after a 45-minute scoping call.</p>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {[
            {
              name: 'Storefront first',
              price: '$18k – $26k',
              time: '6 weeks',
              desc: 'The site, catalogue and fitment tool. Immediate conversion win.',
              items: ['Design system + storefront', 'Catalogue & fitment finder', 'Checkout + shipping/tax', 'Customer accounts', 'Content migration + SEO'],
              cta: 'Phase 1–2',
            },
            {
              name: 'Full platform',
              price: '$48k – $62k',
              time: '14 weeks',
              desc: 'Everything in this demo — all six surfaces, one system.',
              items: ['Everything in Storefront', 'Dealer portal + trade pricing', 'Owner console & roles', 'Installer app', 'Analytics, integrations, training'],
              cta: 'Recommended',
              featured: true,
            },
            {
              name: 'Platform + growth',
              price: '$6k – $9k / mo',
              time: 'Ongoing',
              desc: 'We keep improving it after launch instead of handing over a PDF.',
              items: ['Hosting & monitoring', 'Monthly CRO experiments', 'New features backlog', 'Content & SEO support', 'Priority support'],
              cta: 'Retainer',
            },
          ].map((p) => (
            <div key={p.name} className={`relative rounded-2xl border p-6 ${p.featured ? 'border-bolt/60 bg-bolt/[0.05]' : 'border-line bg-panel'}`}>
              {p.featured && (
                <div className="absolute -top-2.5 left-6 rounded-full bg-bolt px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-black">
                  Recommended
                </div>
              )}
              <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/35">{p.cta}</div>
              <h3 className="mt-2 text-xl font-extrabold">{p.name}</h3>
              <div className="mt-2 text-2xl font-extrabold text-bolt">{p.price}</div>
              <div className="text-[11px] text-white/35">{p.time}</div>
              <p className="mt-3 text-[12px] leading-relaxed text-white/50">{p.desc}</p>
              <ul className="mt-4 space-y-1.5">
                {p.items.map((i) => (
                  <li key={i} className="flex gap-2 text-[12px] text-white/65"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-bolt" /> {i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SlideShell>
    ),
  },
  {
    id: 'next',
    label: 'Next steps',
    render: () => (
      <SlideShell>
        <Eyebrow>14 · Next steps</Eyebrow>
        <h2 className="max-w-3xl text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
          Three decisions and we can start Monday.
        </h2>

        <div className="mt-9 grid gap-4 lg:grid-cols-3">
          {[
            ['01', 'Scoping call', '45 minutes. We confirm SKUs, pricing tiers, shipping rules and the dealer list.'],
            ['02', 'Pick the scope', 'Storefront first or the full platform. Either way, Phase 1 starts the same week.'],
            ['03', 'Kickoff', 'Design system in week one, first demo at the end of week two.'],
          ].map(([n, t, d]) => (
            <div key={n} className="rounded-2xl border border-line bg-panel p-6">
              <div className="text-[11px] font-bold text-bolt">{n}</div>
              <div className="mt-2 text-[15px] font-bold">{t}</div>
              <p className="mt-1.5 text-[12px] leading-relaxed text-white/50">{d}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 rounded-2xl border border-line bg-gradient-to-br from-panel to-ink p-7 sm:grid-cols-[1.4fr_1fr]">
          <div>
            <h3 className="text-xl font-extrabold">Explore it yourself first.</h3>
            <p className="mt-2 max-w-md text-[13px] leading-relaxed text-mist">
              Every surface in this deck is clickable. Use the surface switcher in the black bar at the top — or jump
              straight in below. All data is sample data.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link to="/" className="btn-primary btn-sm">Storefront</Link>
              <Link to="/account" className="btn-dark btn-sm">Customer</Link>
              <Link to="/dealer" className="btn-dark btn-sm">Dealer</Link>
              <Link to="/admin" className="btn-dark btn-sm">Owner</Link>
              <Link to="/field" className="btn-dark btn-sm">Installer</Link>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-2 rounded-xl border border-line bg-white/[0.02] p-5 text-[12px]">
            <div className="flex items-center gap-2 text-white/60"><Mail className="h-3.5 w-3.5 text-bolt" /> hello@thundermounts.com</div>
            <div className="flex items-center gap-2 text-white/60"><MessageSquare className="h-3.5 w-3.5 text-bolt" /> Reply to this demo link</div>
            <div className="flex items-center gap-2 text-white/60"><MapPin className="h-3.5 w-3.5 text-bolt" /> Simi Valley, CA</div>
            <Link to="/docs" className="mt-2 flex items-center gap-1 text-[12px] font-bold text-bolt">
              Read the full scope document <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <a href="./proposal.md" download className="flex items-center gap-1 text-[12px] font-semibold text-white/50 hover:text-white">
              Download proposal.md
            </a>
          </div>
        </div>
      </SlideShell>
    ),
  },
]

function Users2() {
  return <User className="h-3 w-3" />
}

function Surface({
  eyebrow,
  title,
  points,
  image,
  to,
  cta,
  reverse,
}: {
  eyebrow: string
  title: string
  points: string[]
  image: string
  to: string
  cta: string
  reverse?: boolean
}) {
  return (
    <SlideShell>
      <div className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-[42px]">{title}</h2>
          <ul className="mt-6 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex gap-3 text-[14px] leading-relaxed text-white/70">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-bolt/15 text-bolt">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <Link to={to} className="btn-primary mt-7">
            {cta} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-line">
          <img src={image} alt="" className="aspect-[4/3] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/70 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-bolt" /> Live in this demo
          </div>
        </div>
      </div>
    </SlideShell>
  )
}

export default function Pitch() {
  const [i, setI] = useState(0)
  const nav = useNavigate()

  const go = useCallback(
    (n: number) => setI((c) => Math.max(0, Math.min(slides.length - 1, n))),
    [],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault()
        setI((c) => Math.min(slides.length - 1, c + 1))
      }
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') setI((c) => Math.max(0, c - 1))
      if (e.key === 'Home') setI(0)
      if (e.key === 'End') setI(slides.length - 1)
      if (e.key === 'Escape') nav('/')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [nav])

  return (
    <div className="min-h-screen bg-ink">
      <div className="flex min-h-[calc(100vh-48px)] flex-col">
        {/* deck top bar */}
        <div className="no-print sticky top-12 z-40 flex h-12 items-center gap-3 border-b border-line bg-black/70 px-4 backdrop-blur-xl sm:px-6">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/50">
            <Zap className="h-3.5 w-3.5 text-bolt" fill="currentColor" /> Proposal deck
          </div>
          <div className="hidden items-center gap-1.5 sm:flex">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => go(idx)}
                title={s.label}
                className={`h-1.5 rounded-full transition-all ${idx === i ? 'w-6 bg-bolt' : idx < i ? 'w-3 bg-white/35' : 'w-3 bg-white/10'} hover:bg-bolt/70`}
              />
            ))}
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="mr-1 font-mono text-[11px] text-white/35">{String(i + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
            <button onClick={() => go(i - 1)} disabled={i === 0} className="rounded-lg border border-line p-1.5 text-white/60 transition hover:text-white disabled:opacity-30">
              <ArrowLeft className="h-3.5 w-3.5" />
            </button>
            <button onClick={() => go(i + 1)} disabled={i === slides.length - 1} className="rounded-lg border border-line p-1.5 text-white/60 transition hover:text-white disabled:opacity-30">
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <Link to="/" className="ml-1 rounded-lg border border-line p-1.5 text-white/60 hover:text-white" title="Exit deck">
              <X className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <div className="relative flex-1 overflow-hidden">
          {slides.map((s, idx) => (
            <div
              key={s.id}
              className={`${idx === i ? 'block animate-rise' : 'hidden'} h-full overflow-y-auto`}
              aria-hidden={idx !== i}
            >
              {s.render()}
            </div>
          ))}
        </div>

        {/* bottom nav */}
        <div className="no-print sticky bottom-0 z-40 flex items-center justify-between gap-3 border-t border-line bg-black/70 px-4 py-2.5 backdrop-blur-xl sm:px-6">
          <div className="hidden text-[11px] text-white/30 sm:block">
            Use <kbd className="rounded border border-line px-1 py-0.5 text-[10px]">←</kbd>{' '}
            <kbd className="rounded border border-line px-1 py-0.5 text-[10px]">→</kbd> to navigate · <kbd className="rounded border border-line px-1 py-0.5 text-[10px]">Esc</kbd> to exit
          </div>
          <div className="flex w-full items-center gap-2 sm:w-auto">
            <button onClick={() => go(i - 1)} disabled={i === 0} className="btn-dark btn-sm flex-1 disabled:opacity-30 sm:flex-none">
              <ArrowLeft className="h-3.5 w-3.5" /> Back
            </button>
            {i < slides.length - 1 ? (
              <button onClick={() => go(i + 1)} className="btn-primary btn-sm flex-1 sm:flex-none">
                {slides[i + 1].label} <ArrowRight className="h-3.5 w-3.5" />
              </button>
            ) : (
              <Link to="/docs" className="btn-primary btn-sm flex-1 sm:flex-none">
                Read the scope <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
