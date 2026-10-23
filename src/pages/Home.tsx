import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Ruler,
  ShieldCheck,
  Zap,
  Clock,
  Star,
  Wrench,
  MapPin,
  Box,
  Truck,
  ChevronRight,
  Check,
  Sparkles,
  Camera,
} from 'lucide-react'
import { products, money, recommendSize } from '../data'
import { Section, ArrowLink } from '../components/ui'
import { useStore } from '../store'

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="absolute inset-0">
        <img src="./img/hero-garage.jpg" alt="Thunder Mounts installed in a modern garage" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />
      </div>

      <div className="wrap relative py-20 sm:py-28 lg:py-36">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-bolt/30 bg-bolt/[0.08] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-bolt">
            <Sparkles className="h-3 w-3" /> Proposed redesign · interactive demo
          </div>
          <h1 className="h1">
            BUILT FOR TODAY.
            <br />
            <span className="text-bolt">READY FOR TOMORROW.</span>
          </h1>
          <p className="lead mt-6 max-w-xl">
            The world's first fit-all overhead mounting system for garage door tracks, openers, storage and lighting.
            One engineered system — measured, specified and installed with confidence.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/measure" className="btn-primary px-6 py-3.5 text-[15px]">
              <Ruler className="h-4 w-4" /> Find your mount size
            </Link>
            <Link to="/shop" className="btn-dark px-6 py-3.5 text-[15px]">
              Shop the system <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-6">
            {[
              ['12 ga', 'American steel'],
              ['4.9★', '214 reviews'],
              ['35 min', 'Typical install'],
            ].map(([v, l]) => (
              <div key={l}>
                <div className="text-xl font-extrabold tracking-tight">{v}</div>
                <div className="text-[11px] uppercase tracking-wider text-white/40">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-black/40 backdrop-blur">
        <div className="wrap flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
          <span className="flex items-center gap-2"><Truck className="h-3.5 w-3.5 text-bolt" /> Free UPS over $500</span>
          <span className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-bolt" /> Vibration isolated</span>
          <span className="flex items-center gap-2"><Wrench className="h-3.5 w-3.5 text-bolt" /> Certified installer network</span>
          <span className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-bolt" /> Made in Simi Valley, CA</span>
        </div>
      </div>
    </section>
  )
}

function SystemGrid() {
  const items = [
    { t: 'Track mounts', d: 'Hold both door tracks perfectly square and isolated.', img: './img/product-hardware.jpg', to: '/shop?c=Track Mounts', tag: 'TMGTS · TMGTX · TMGTL' },
    { t: 'Opener mounts', d: 'One multi-fit base for every major opener brand.', img: './img/hero-garage.jpg', to: '/shop?c=Opener Mounts', tag: 'TMS · TMX · TML' },
    { t: 'Openers', d: 'Jackshaft and belt drive units that pair perfectly.', img: './img/opener-unit.jpg', to: '/shop?c=Openers', tag: 'Genie · Marantec' },
    { t: 'Storage & lighting', d: 'Racks and linear LED that clip straight on.', img: './img/storage-rack.jpg', to: '/shop?c=Storage', tag: 'Racks · LED bars' },
  ]
  return (
    <Section
      eyebrow="The system"
      title={<>Four categories. One engineered standard.</>}
      sub="Every part is designed to work with every other part — so a garage upgrade is a single, coherent system instead of a pile of brackets."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((i) => (
          <Link key={i.t} to={i.to} className="group card card-hover overflow-hidden">
            <div className="relative h-40 overflow-hidden">
              <img src={i.img} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/20 to-transparent" />
            </div>
            <div className="p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-bolt/80">{i.tag}</div>
              <h3 className="mt-1.5 text-base font-bold">{i.t}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-mist">{i.d}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-white/70 group-hover:text-bolt">
                Explore <ChevronRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  )
}

function Compare() {
  return (
    <Section className="border-y border-line bg-panel/40">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="eyebrow mb-3">The problem</div>
          <h2 className="h2">
            Angle iron was never designed for this.
          </h2>
          <p className="lead mt-4">
            Punched angle, bent struts, self-tapping screws and exposed wiring. It's the industry default — and it shows.
            It rattles, it rusts, and it leaves an install that looks improvised because it is.
          </p>
          <ul className="mt-6 space-y-2.5">
            {['No vibration isolation — noise transfers into the house', 'Hand-bent brackets, never square', 'Exposed wiring and fasteners', 'Inconsistent from one installer to the next'].map((x) => (
              <li key={x} className="flex gap-2.5 text-sm text-white/55">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-rose-400" /> {x}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <Diagram variant="before" />
          <Diagram variant="after" />
        </div>
      </div>
    </Section>
  )
}

function Diagram({ variant }: { variant: 'before' | 'after' }) {
  const after = variant === 'after'
  return (
    <div className={`overflow-hidden rounded-2xl border ${after ? 'border-bolt/30 bg-bolt/[0.04]' : 'border-line bg-black/40'}`}>
      <div className="flex items-center justify-between border-b border-line/70 px-4 py-2.5">
        <span className={`text-[11px] font-bold uppercase tracking-[0.16em] ${after ? 'text-bolt' : 'text-white/40'}`}>
          {after ? 'Thunder Mounts' : 'Conventional install'}
        </span>
        <span className="text-[10px] uppercase tracking-wider text-white/30">Section view</span>
      </div>
      <svg viewBox="0 0 400 130" className="h-32 w-full">
        <line x1="16" y1="18" x2="384" y2="18" stroke="#3A3A42" strokeWidth="6" />
        {after ? (
          <g>
            <rect x="92" y="18" width="7" height="46" fill="#FFC300" opacity=".9" />
            <rect x="301" y="18" width="7" height="46" fill="#FFC300" opacity=".9" />
            <rect x="84" y="62" width="232" height="8" fill="#FFC300" opacity=".55" />
            <rect x="96" y="70" width="20" height="7" rx="2" fill="#FFC300" />
            <rect x="284" y="70" width="20" height="7" rx="2" fill="#FFC300" />
            <line x1="106" y1="77" x2="106" y2="108" stroke="#FFC300" strokeWidth="5" />
            <line x1="294" y1="77" x2="294" y2="108" stroke="#FFC300" strokeWidth="5" />
            <rect x="88" y="106" width="224" height="5" rx="1" fill="#6E6E7A" />
          </g>
        ) : (
          <g>
            <line x1="120" y1="18" x2="146" y2="70" stroke="#5A5A64" strokeWidth="4" />
            <line x1="290" y1="18" x2="256" y2="70" stroke="#5A5A64" strokeWidth="4" />
            <line x1="146" y1="70" x2="256" y2="70" stroke="#5A5A64" strokeWidth="3" strokeDasharray="4 3" />
            <line x1="160" y1="20" x2="160" y2="92" stroke="#5A5A64" strokeWidth="3" />
            <line x1="200" y1="22" x2="212" y2="88" stroke="#5A5A64" strokeWidth="2" />
            <line x1="262" y1="20" x2="250" y2="90" stroke="#5A5A64" strokeWidth="2" />
            <path d="M100 40 q24 22 58 30" stroke="#7A4A4A" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
            <rect x="88" y="90" width="224" height="4" rx="1" fill="#4A4A52" transform="rotate(-1.6 88 90)" />
            <circle cx="150" cy="60" r="2" fill="#7A4A4A" />
            <circle cx="230" cy="54" r="2" fill="#7A4A4A" />
          </g>
        )}
      </svg>
    </div>
  )
}

function MiniMeasure() {
  const [inches, setInches] = useState(18)
  const rec = recommendSize(inches)
  return (
    <Section className="border-y border-line bg-panel/30">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <div className="eyebrow mb-3">Fitment tool · in this proposal</div>
          <h2 className="h2">Measure once. Buy the right size.</h2>
          <p className="lead mt-4">
            The single biggest support cost today is wrong-size orders. This tool asks two questions, uses the
            measurement, and returns the exact SKU — then keeps that measurement on the customer's garage profile forever.
          </p>
          <ul className="mt-6 space-y-2.5">
            {['Saves the measurement to the account', 'Suggests the companion opener mount', 'Hands off to a local certified installer'].map((t) => (
              <li key={t} className="flex items-center gap-2.5 text-sm text-white/70">
                <Check className="h-4 w-4 text-bolt" /> {t}
              </li>
            ))}
          </ul>
          <Link to="/measure" className="btn-dark mt-7">
            Open the full finder <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="card p-6 sm:p-8">
          <div className="mb-1 flex items-baseline justify-between">
            <label className="label mb-0">Ceiling to track bolt hole</label>
            <span className="font-mono text-lg font-bold text-bolt">{inches}"</span>
          </div>
          <input
            type="range"
            min={8}
            max={38}
            value={inches}
            onChange={(e) => setInches(+e.target.value)}
            className="my-4 w-full accent-bolt"
          />
          <div className="mb-6 flex justify-between text-[10px] uppercase tracking-wider text-white/30">
            <span>8" low ceiling</span>
            <span>24"</span>
            <span>38" high</span>
          </div>

          <div className="rounded-xl border border-bolt/30 bg-bolt/[0.06] p-5">
            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-bolt/80">Recommended</div>
            <div className="mt-1 text-xl font-extrabold">{rec.sku}</div>
            <p className="mt-1 text-[13px] text-white/60">
              Fits measurements 8"–{rec.max}". Add the matching opener mount for a complete system.
            </p>
            <div className="mt-4 flex gap-2">
              <Link to={`/product/${rec.product}`} className="btn-primary btn-sm flex-1">
                View kit
              </Link>
              <Link to="/measure" className="btn-dark btn-sm flex-1">
                Full finder
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

function Bestsellers() {
  const { add } = useStore()
  const picks = products.filter((p) => ['tmgts-12', 'tmx-19', 'tmgtsl-29', 'genie-6170'].includes(p.id))
  return (
    <Section eyebrow="Bestsellers" title="What installers order most" sub="Live stock, real lead times, and every SKU carries its fitment data so the right part is never a guess.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {picks.map((p) => (
          <div key={p.id} className="card card-hover group flex flex-col overflow-hidden">
            <Link to={`/product/${p.id}`} className="relative block h-48 overflow-hidden">
              <img src={p.image} alt={p.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              {p.badge && <span className="absolute left-3 top-3 rounded-full bg-bolt px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-black">{p.badge}</span>}
            </Link>
            <div className="flex flex-1 flex-col p-4">
              <div className="font-mono text-[10px] uppercase tracking-wider text-white/35">{p.sku}</div>
              <Link to={`/product/${p.id}`} className="mt-1 text-[14px] font-bold leading-snug hover:text-bolt">
                {p.name}
              </Link>
              <div className="mt-1 flex items-center gap-1 text-[11px] text-white/45">
                <Star className="h-3 w-3 fill-bolt text-bolt" /> {p.rating} · {p.reviews} reviews
              </div>
              <div className="mt-auto pt-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-extrabold">{money(p.price)}</span>
                  <span className="text-xs text-white/30 line-through">{money(p.msrp)}</span>
                </div>
                <button onClick={() => add(p.id)} className="btn-primary btn-sm mt-3 w-full">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <ArrowLink to="/shop">Browse all 15 products</ArrowLink>
      </div>
    </Section>
  )
}

function Portfolio() {
  const shots = [
    { img: './img/finished-garage.jpg', t: 'Complete system · Simi Valley', d: 'Track mounts + opener mount + overhead rack + LED' },
    { img: './img/hero-garage.jpg', t: 'Dual door · Thousand Oaks', d: 'TMGTX-19 pair with concealed channels' },
    { img: './img/dealer-showroom.jpg', t: 'Dealer showroom · Ventura', d: 'Coastline Overhead display wall' },
  ]
  return (
    <Section className="border-t border-line" eyebrow="Portfolio" title="Value · Safety · Symmetry" sub="The finished result is what the customer actually buys. Every job in the new site can carry photos, SKUs used and the installer who did it.">
      <div className="grid gap-4 md:grid-cols-3">
        {shots.map((s, i) => (
          <div key={s.t} className={`group relative overflow-hidden rounded-2xl border border-line ${i === 0 ? 'md:row-span-2' : ''}`}>
            <img src={s.img} alt={s.t} className={`w-full object-cover transition duration-700 group-hover:scale-105 ${i === 0 ? 'h-72 md:h-[420px]' : 'h-48 md:h-[202px]'}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
            <div className="absolute bottom-0 p-5">
              <div className="text-sm font-bold">{s.t}</div>
              <div className="mt-1 text-[12px] text-white/55">{s.d}</div>
            </div>
            <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/70 backdrop-blur">
              <Camera className="h-3 w-3" /> Job photo
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

function TradeCTA() {
  return (
    <section className="border-t border-line bg-gradient-to-b from-panel to-ink">
      <div className="wrap grid gap-6 py-16 md:grid-cols-2">
        <div className="card relative overflow-hidden p-8">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-bolt/10 blur-2xl" />
          <Wrench className="h-6 w-6 text-bolt" />
          <h3 className="mt-4 text-2xl font-extrabold tracking-tight">Are you a dealer or installer?</h3>
          <p className="mt-2 text-sm leading-relaxed text-mist">
            Get trade pricing, Net 30 terms, live stock, quote tools and leads routed to your ZIP code.
          </p>
          <Link to="/dealer" className="btn-primary mt-6">
            Open dealer portal <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="card relative overflow-hidden p-8">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
          <MapPin className="h-6 w-6 text-white/80" />
          <h3 className="mt-4 text-2xl font-extrabold tracking-tight">Need it installed?</h3>
          <p className="mt-2 text-sm leading-relaxed text-mist">
            Certified installers in 38 states, with fixed pricing and a two-hour window you can trust.
          </p>
          <Link to="/installers" className="btn-dark mt-6">
            Find an installer <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const rows = [
    { q: 'The mount took 30 minutes and the garage finally looks finished. My installer said it was the easiest kit he has fitted.', n: 'Dana W.', r: 'Homeowner · Simi Valley' },
    { q: 'We stock the whole range now. Live availability in the portal means we quote the same day instead of calling the office.', n: 'Summit Garage Doors', r: 'Platinum dealer · CA' },
    { q: 'No more rattle over the bedroom. That alone sold my wife on the upgrade.', n: 'Marcus H.', r: 'Homeowner · Thousand Oaks' },
  ]
  return (
    <Section eyebrow="Reviews" title="4.9 out of 5, from 214 verified jobs" className="border-t border-line">
      <div className="grid gap-4 md:grid-cols-3">
        {rows.map((x) => (
          <figure key={x.n} className="card p-6">
            <div className="flex gap-0.5 text-bolt">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-bolt" />
              ))}
            </div>
            <blockquote className="mt-4 text-[14px] leading-relaxed text-white/80">“{x.q}”</blockquote>
            <figcaption className="mt-5 border-t border-line pt-4">
              <div className="text-[13px] font-bold">{x.n}</div>
              <div className="text-[11px] uppercase tracking-wider text-white/35">{x.r}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  )
}

function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-line">
      <img src="./img/finished-garage.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/60" />
      <div className="wrap relative py-20 text-center sm:py-28">
        <div className="eyebrow mb-4">Start the upgrade</div>
        <h2 className="mx-auto max-w-3xl text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">
          Mount everything above.<br />
          <span className="text-bolt">Clean up everything below.</span>
        </h2>
        <p className="lead mx-auto mt-5 max-w-xl">Free shipping over $500 · 30-day returns · certified installation available.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/shop" className="btn-primary px-7 py-3.5">
            Shop the system <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/measure" className="btn-dark px-7 py-3.5">
            <Ruler className="h-4 w-4" /> Find your size
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <SystemGrid />
      <Compare />
      <MiniMeasure />
      <Bestsellers />
      <Portfolio />
      <Testimonials />
      <TradeCTA />
      <FinalCTA />
    </>
  )
}
