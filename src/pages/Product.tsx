import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Star, Truck, ShieldCheck, Ruler, Minus, Plus, Check, ArrowLeft, Wrench, BadgeCheck, Package, Clock, ChevronRight, FileDown,
} from 'lucide-react'
import { products, money, recommendSize } from '../data'
import { useStore } from '../store'
import { Tabs } from '../components/ui'

export default function Product() {
  const { id } = useParams()
  const p = products.find((x) => x.id === id)
  const { add, setDrawer } = useStore()
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState('Overview')
  const [zip, setZip] = useState('')
  const [zipOk, setZipOk] = useState(false)

  if (!p) {
    return (
      <div className="wrap py-24 text-center">
        <p className="text-mist">Product not found.</p>
        <Link to="/shop" className="btn-primary mt-4">Back to shop</Link>
      </div>
    )
  }

  const related = products.filter((x) => x.id !== p.id && x.category === p.category).slice(0, 3)
  const savings = Math.round(((p.msrp - p.price) / p.msrp) * 100)

  return (
    <>
      <div className="wrap flex items-center gap-2 py-4 text-[12px] text-white/35">
        <Link to="/shop" className="hover:text-white">Shop</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to={`/shop?c=${encodeURIComponent(p.category)}`} className="hover:text-white">{p.category}</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-white/70">{p.sku}</span>
      </div>

      <div className="wrap grid gap-10 pb-16 lg:grid-cols-2">
        {/* gallery */}
        <div className="space-y-3">
          <div className="relative overflow-hidden rounded-2xl border border-line bg-black/30">
            <img src={p.image} alt={p.name} className="aspect-[4/3] w-full object-cover" />
            {savings > 0 && (
              <div className="absolute left-4 top-4 rounded-full bg-bolt px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-black">
                Save {savings}%
              </div>
            )}
            <div className="absolute bottom-4 right-4 rounded-full bg-black/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/70 backdrop-blur">
              Installed view
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[p.image, './img/finished-garage.jpg', './img/product-hardware.jpg'].map((img, i) => (
              <div key={i} className="overflow-hidden rounded-xl border border-line">
                <img src={img} alt="" className="h-24 w-full object-cover opacity-80 transition hover:opacity-100" />
              </div>
            ))}
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-2 text-[12px] font-bold text-bolt"><Wrench className="h-4 w-4" /> Professional install available</div>
            <p className="mt-1 text-[12px] leading-relaxed text-white/50">
              Fixed-price install by a certified Thunder Mounts dealer. Enter your ZIP to see availability and a 2-hour window.
            </p>
            <div className="mt-3 flex gap-2">
              <input value={zip} onChange={(e) => setZip(e.target.value)} placeholder="ZIP code" className="input flex-1 py-2 text-[13px]" />
              <button onClick={() => setZipOk(zip.length >= 5)} className="btn-dark btn-sm">Check</button>
            </div>
            {zipOk && (
              <div className="mt-3 rounded-lg border border-emerald-500/25 bg-emerald-500/[0.08] px-3 py-2 text-[12px] text-emerald-300">
                Summit Garage Doors covers {zip}. Next window: Tue Nov 3, 9–11 AM · $249 flat.
              </div>
            )}
          </div>
        </div>

        {/* buy box */}
        <div>
          <div className="flex items-center gap-2">
            <span className="chip">{p.category}</span>
            {p.badge && <span className="badge bg-bolt/15 text-bolt">{p.badge}</span>}
          </div>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">{p.name}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-[12px]">
            <span className="flex items-center gap-1 text-bolt">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-bolt" />)}
              <span className="ml-1 text-white/60">{p.rating} ({p.reviews} reviews)</span>
            </span>
            <span className="font-mono uppercase tracking-wider text-white/35">SKU {p.sku}</span>
          </div>

          <div className="mt-5 flex items-end gap-3">
            <div className="text-4xl font-extrabold tracking-tight">{money(p.price)}</div>
            {p.msrp > p.price && <div className="pb-1 text-sm text-white/30 line-through">{money(p.msrp)}</div>}
            <div className="pb-1.5 text-[11px] text-white/40">+ free UPS ground</div>
          </div>
          <p className="mt-1 text-[11px] text-white/35">Excluding sales tax · 4 interest-free payments of {money(Math.round(p.price / 4))}</p>

          <p className="mt-5 text-[14px] leading-relaxed text-white/75">{p.blurb}</p>

          <div className="mt-5 grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-line bg-panel px-3 py-2.5">
              <div className="text-[10px] uppercase tracking-wider text-white/35">Fits</div>
              <div className="mt-0.5 text-[12px] font-semibold leading-snug">{p.fits}</div>
            </div>
            <div className="rounded-xl border border-line bg-panel px-3 py-2.5">
              <div className="text-[10px] uppercase tracking-wider text-white/35">Install time</div>
              <div className="mt-0.5 text-[12px] font-semibold">{p.installTime}</div>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 text-[12px]">
            <span className={`h-2 w-2 rounded-full ${p.stock > 20 ? 'bg-emerald-400' : p.stock > 5 ? 'bg-amber-400' : 'bg-rose-400'}`} />
            <span className="text-white/60">
              {p.stock > 20 ? 'In stock — ships within 24 hours' : p.stock > 5 ? `Only ${p.stock} left in stock` : `Low stock — ${p.stock} remaining`}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="flex items-center rounded-full border border-line bg-panel">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 text-white/60 hover:text-white"><Minus className="h-4 w-4" /></button>
              <span className="w-8 text-center text-sm font-bold">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="p-3 text-white/60 hover:text-white"><Plus className="h-4 w-4" /></button>
            </div>
            <button
              onClick={() => {
                add(p.id, qty)
                setDrawer(true)
              }}
              className="btn-primary flex-1 px-8"
            >
              Add to cart
            </button>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <Link to="/measure" className="btn-dark btn-sm">
              <Ruler className="h-4 w-4" /> Check my fitment
            </Link>
            <Link to="/installers" className="btn-dark btn-sm">
              <Wrench className="h-4 w-4" /> Book install
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2 border-t border-line pt-5 text-center">
            {[
              { i: <Truck className="h-4 w-4" />, t: 'Free shipping', s: 'Orders $500+' },
              { i: <ShieldCheck className="h-4 w-4" />, t: 'Lifetime warranty', s: 'On the channel' },
              { i: <BadgeCheck className="h-4 w-4" />, t: 'Made in USA', s: '12 ga steel' },
            ].map((x) => (
              <div key={x.t} className="flex flex-col items-center gap-1.5 text-bolt">
                {x.i}
                <div className="text-[11px] font-semibold text-white/75">{x.t}</div>
                <div className="-mt-1 text-[10px] text-white/35">{x.s}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-line bg-panel p-4">
            <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/40">Dealer / trade price</div>
            <div className="mt-2 flex items-baseline justify-between">
              <div className="text-lg font-extrabold text-bolt">{money(Math.round(p.price * 0.68))}</div>
              <span className="text-[11px] text-white/40">32% Platinum discount</span>
            </div>
            <Link to="/dealer" className="mt-2 inline-flex items-center gap-1 text-[12px] font-semibold text-bolt hover:underline">
              Sign in to order at trade price <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* tabs */}
      <div className="border-t border-line bg-panel/30">
        <div className="wrap py-10">
          <Tabs tabs={['Overview', 'What’s in the box', 'Specs', 'Fitment', 'Reviews']} active={tab} onChange={setTab} />

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="text-[14px] leading-relaxed text-white/70">
              {tab === 'Overview' && (
                <div className="space-y-4">
                  <p>{p.blurb}</p>
                  <p>
                    Thunder Mounts replace punched angle iron with a channel-and-tube system engineered for alignment.
                    Dual vibration isolation keeps noise out of the living space, while the powder-coated finish and
                    chrome detail make the installation something to look at rather than hide.
                  </p>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {[
                      'Dual vibration isolation',
                      'Fits all major opener brands',
                      'Adjustable in all directions',
                      'Powder-coated, corrosion resistant',
                      'Code-friendly installation',
                      'Full hardware kit included',
                    ].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-[13px]">
                        <Check className="h-4 w-4 text-bolt" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {tab === 'What’s in the box' && (
                <ul className="space-y-2">
                  {p.includes.map((x) => (
                    <li key={x} className="flex items-center gap-2 border-b border-line/60 pb-2 text-[13px]">
                      <Package className="h-3.5 w-3.5 text-bolt" /> {x}
                    </li>
                  ))}
                  <li className="flex items-center gap-2 pt-1 text-[12px] text-white/40">
                    <FileDown className="h-3.5 w-3.5" /> Printed instructions + digital install guide included
                  </li>
                </ul>
              )}
              {tab === 'Specs' && (
                <dl className="divide-y divide-line/70 text-[13px]">
                  {[
                    ['Material', '12 gauge cold-rolled steel'],
                    ['Finish', 'Matte black powder coat'],
                    ['Max span', p.maxLength ? `${p.maxLength} inches` : '—'],
                    ['Weight capacity', 'Door track load per pair'],
                    ['Hardware', 'Stainless, included'],
                    ['Origin', 'Made in Simi Valley, California'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between py-2.5">
                      <dt className="text-white/40">{k}</dt>
                      <dd className="font-medium text-white/85">{v}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {tab === 'Fitment' && (
                <div>
                  <p>Measure from the ceiling to the door track bolt holes, then confirm your size.</p>
                  <div className="mt-4 overflow-hidden rounded-xl border border-line">
                    <table className="w-full text-[13px]">
                      <thead className="bg-white/[0.03]">
                        <tr><th className="th">Measurement</th><th className="th">SKU</th></tr>
                      </thead>
                      <tbody>
                        {[
                          ['up to 14"', 'TMGTS-12'],
                          ['15" – 21"', 'TMGTX-19'],
                          ['22" – 26"', 'TMGTL-24'],
                          ['27" – 31"', 'TMGTL-29'],
                          ['32" – 40"', 'TMGTL-34'],
                        ].map(([r, s]) => (
                          <tr key={s} className="border-t border-line/60">
                            <td className="td">{r}</td>
                            <td className="td font-mono text-bolt">{s}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Link to="/measure" className="btn-dark btn-sm mt-4">Run the interactive finder</Link>
                </div>
              )}
              {tab === 'Reviews' && (
                <div className="space-y-4">
                  {[
                    { n: 'Dana W.', r: 'Verified purchase', t: 'Installed in under 40 minutes. Everything lined up first try.', s: 5 },
                    { n: 'R. Diaz', r: 'Certified installer', t: 'We fit these on every job now. The isolation washers make a real difference on second floors.', s: 5 },
                    { n: 'Ken P.', r: 'Verified purchase', t: 'Great product. Instructions could be a little clearer on the above-ceiling option.', s: 4 },
                  ].map((r) => (
                    <div key={r.n} className="border-b border-line/70 pb-4">
                      <div className="flex items-center justify-between">
                        <div className="text-[13px] font-bold">{r.n} <span className="font-normal text-white/30">· {r.r}</span></div>
                        <div className="flex gap-0.5 text-bolt">{Array.from({ length: r.s }).map((_, i) => <Star key={i} className="h-3 w-3 fill-bolt" />)}</div>
                      </div>
                      <p className="mt-1.5 text-[13px] text-white/60">{r.t}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <aside className="card h-fit p-5">
              <div className="text-[12px] font-bold">Need help sizing?</div>
              <p className="mt-1.5 text-[12px] leading-relaxed text-white/45">
                Our team answers in under an hour during business hours, and the fitment tool is instant.
              </p>
              <div className="mt-4 space-y-2 text-[12px]">
                <div className="flex justify-between border-b border-line/60 pb-2"><span className="text-white/40">Ships</span><span>Same day if ordered by 2pm PT</span></div>
                <div className="flex justify-between border-b border-line/60 pb-2"><span className="text-white/40">Returns</span><span>30 days</span></div>
                <div className="flex justify-between"><span className="text-white/40">Warranty</span><span>Lifetime on channel</span></div>
              </div>
              <Link to="/measure" className="btn-primary btn-sm mt-4 w-full">
                <Ruler className="h-3.5 w-3.5" /> Find my size
              </Link>
            </aside>
          </div>
        </div>
      </div>

      {/* related */}
      {related.length > 0 && (
        <div className="wrap py-12">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="h3">Pairs well with</h2>
            <Link to="/shop" className="text-[12px] font-semibold text-bolt">View all</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <Link key={r.id} to={`/product/${r.id}`} className="card card-hover flex gap-3 p-3">
                <img src={r.image} alt="" className="h-20 w-20 rounded-lg object-cover" />
                <div>
                  <div className="font-mono text-[10px] text-white/35">{r.sku}</div>
                  <div className="mt-0.5 line-clamp-2 text-[13px] font-bold leading-snug">{r.name}</div>
                  <div className="mt-1 text-[13px] font-extrabold">{money(r.price)}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
