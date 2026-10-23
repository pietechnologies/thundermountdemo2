import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Ruler, ArrowRight, ArrowLeft, Check, Printer, Wrench, ShoppingCart, Sparkles, Info } from 'lucide-react'
import { products, money, recommendSize } from '../data'
import { useStore } from '../store'

const brands = ['LiftMaster', 'Chamberlain', 'Genie', 'Marantec', 'Sommer', 'Ryobi', 'Other / not sure']
const mounts = [
  { id: 'below', label: 'Below ceiling', desc: 'Channels bolt to the ceiling joists and drop down to the track.' },
  { id: 'above', label: 'Above ceiling', desc: 'Channels mount inside the ceiling cavity — cleanest finish.' },
]

export default function Measure() {
  const [step, setStep] = useState(0)
  const [inches, setInches] = useState(18)
  const [mount, setMount] = useState('below')
  const [brand, setBrand] = useState('LiftMaster')
  const [needOpenerMount, setNeedOpenerMount] = useState(true)
  const { add, notify, setDrawer } = useStore()

  const rec = recommendSize(inches)
  const track = products.find((p) => p.id === rec.product)!
  const openerMount = products.find((p) => p.id === 'tmx-19')!
  const total = track.price + (needOpenerMount ? openerMount.price : 0)

  return (
    <>
      <div className="border-b border-line bg-panel/40">
        <div className="wrap py-10">
          <div className="eyebrow mb-2">Fitment finder</div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">What size do you purchase? Let's measure.</h1>
          <p className="mt-2 max-w-2xl text-sm text-mist">
            Measure from the ceiling to the garage door track bolt holes — or to the opener attach bolts for below-ceiling installs.
            For inside-the-ceiling mounts, include the drywall thickness.
          </p>
        </div>
      </div>

      <div className="wrap grid gap-8 py-10 lg:grid-cols-[1fr_380px]">
        <div>
          {/* stepper */}
          <div className="mb-8 flex items-center gap-2">
            {['Measure', 'Your setup', 'Your kit'].map((s, i) => (
              <div key={s} className="flex flex-1 items-center gap-2">
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-bold ${
                    i < step ? 'bg-bolt text-black' : i === step ? 'border border-bolt text-bolt' : 'border border-line text-white/30'
                  }`}
                >
                  {i < step ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
                </div>
                <span className={`text-[12px] font-semibold ${i <= step ? 'text-white' : 'text-white/30'}`}>{s}</span>
                {i < 2 && <div className={`h-px flex-1 ${i < step ? 'bg-bolt/60' : 'bg-line'}`} />}
              </div>
            ))}
          </div>

          {step === 0 && (
            <div className="card p-6 sm:p-8">
              <h2 className="text-xl font-bold">1. Take the measurement</h2>
              <p className="mt-1 text-[13px] text-white/50">Use a tape measure from the ceiling surface down to the centre of the track bolt hole.</p>

              <div className="mt-6 flex items-center gap-4">
                <input
                  type="number"
                  min={6}
                  max={45}
                  value={inches}
                  onChange={(e) => setInches(Math.max(0, Math.min(48, +e.target.value)))}
                  className="input max-w-[120px] text-center text-lg font-bold"
                />
                <span className="text-sm text-white/40">inches</span>
                <div className="ml-auto flex gap-2">
                  {[12, 18, 24, 29].map((v) => (
                    <button key={v} onClick={() => setInches(v)} className="rounded-lg border border-line px-2.5 py-1.5 text-[11px] font-semibold text-white/60 hover:border-bolt/50 hover:text-bolt">
                      {v}"
                    </button>
                  ))}
                </div>
              </div>

              <input type="range" min={6} max={40} value={Math.min(inches, 40)} onChange={(e) => setInches(+e.target.value)} className="mt-5 w-full accent-bolt" />

              <div className="mt-6 flex justify-center">
                <MeasureDiagram inches={inches} />
              </div>

              <div className="mt-8 flex justify-end">
                <button onClick={() => setStep(1)} className="btn-primary">
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="card p-6 sm:p-8">
              <h2 className="text-xl font-bold">2. Tell us about the setup</h2>

              <div className="mt-6">
                <div className="label">Mounting style</div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {mounts.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setMount(m.id)}
                      className={`rounded-xl border p-4 text-left transition ${
                        mount === m.id ? 'border-bolt bg-bolt/[0.06]' : 'border-line hover:border-white/25'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-bold">{m.label}</span>
                        {mount === m.id && <Check className="h-4 w-4 text-bolt" />}
                      </div>
                      <p className="mt-1 text-[12px] leading-relaxed text-white/45">{m.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <div className="label">Opener brand</div>
                <div className="flex flex-wrap gap-2">
                  {brands.map((b) => (
                    <button
                      key={b}
                      onClick={() => setBrand(b)}
                      className={`rounded-full border px-3.5 py-2 text-[12px] font-semibold transition ${
                        brand === b ? 'border-bolt bg-bolt text-black' : 'border-line text-white/60 hover:border-white/25'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-xl border border-line p-4">
                <input type="checkbox" checked={needOpenerMount} onChange={(e) => setNeedOpenerMount(e.target.checked)} className="mt-1 h-4 w-4 accent-bolt" />
                <span>
                  <span className="block text-[13px] font-bold">I also need an opener mount</span>
                  <span className="block text-[12px] text-white/45">Recommended for a complete, symmetrical install.</span>
                </span>
              </label>

              <div className="mt-8 flex justify-between">
                <button onClick={() => setStep(0)} className="btn-ghost">
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                <button onClick={() => setStep(2)} className="btn-primary">
                  See my kit <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="card overflow-hidden">
                <div className="flex items-center gap-2 border-b border-bolt/25 bg-bolt/[0.08] px-5 py-3 text-[12px] font-bold text-bolt">
                  <Sparkles className="h-4 w-4" /> Your recommended system for a {inches}" measurement
                </div>
                <div className="divide-y divide-line">
                  {[track, ...(needOpenerMount ? [openerMount] : [])].map((p, i) => (
                    <div key={p.id} className="flex items-center gap-4 p-4">
                      <img src={p.image} alt="" className="h-20 w-20 rounded-xl border border-line object-cover" />
                      <div className="min-w-0 flex-1">
                        <div className="font-mono text-[10px] uppercase tracking-wider text-white/35">
                          {i === 0 ? 'Track system' : 'Opener mount'} · {p.sku}
                        </div>
                        <div className="text-[14px] font-bold leading-snug">{p.name}</div>
                        <div className="mt-0.5 text-[12px] text-white/45">{p.fits}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[15px] font-extrabold">{money(p.price)}</div>
                        <div className="text-[10px] text-white/30">qty 1</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-line bg-white/[0.02] px-5 py-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-white/35">Kit total</div>
                    <div className="text-xl font-extrabold">{money(total)}</div>
                  </div>
                  <button
                    onClick={() => {
                      add(track.id)
                      if (needOpenerMount) add(openerMount.id)
                      setDrawer(true)
                      notify('Measurements saved to your garage profile')
                    }}
                    className="btn-primary"
                  >
                    <ShoppingCart className="h-4 w-4" /> Add both to cart
                  </button>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="card p-5">
                  <div className="text-[12px] font-bold">Specification sheet</div>
                  <table className="mt-3 w-full text-[12px]">
                    <tbody className="divide-y divide-line/60">
                      {[
                        ['Measured drop', `${inches}"`],
                        ['Mount style', mount === 'above' ? 'Above ceiling' : 'Below ceiling'],
                        ['Opener', brand],
                        ['Recommended', rec.sku],
                        ['Install time', track.installTime],
                      ].map(([k, v]) => (
                        <tr key={k}>
                          <td className="py-1.5 text-white/40">{k}</td>
                          <td className="py-1.5 text-right font-semibold">{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button onClick={() => window.print()} className="btn-dark btn-sm mt-3 w-full">
                    <Printer className="h-3.5 w-3.5" /> Save as PDF
                  </button>
                </div>
                <div className="card flex flex-col p-5">
                  <div className="text-[12px] font-bold">Want it installed?</div>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-white/45">
                    Summit Garage Doors is certified in your area. Fixed price, next-day availability, old hardware hauled away.
                  </p>
                  <div className="mt-auto pt-4">
                    <Link to="/installers" className="btn-dark btn-sm w-full">
                      <Wrench className="h-3.5 w-3.5" /> Book an installer
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button onClick={() => setStep(1)} className="btn-ghost">
                  <ArrowLeft className="h-4 w-4" /> Change setup
                </button>
                <button
                  onClick={() => {
                    setStep(0)
                    setInches(18)
                  }}
                  className="btn-ghost"
                >
                  Start over
                </button>
              </div>
            </div>
          )}
        </div>

        {/* side help */}
        <aside className="space-y-4">
          <div className="card overflow-hidden">
            <div className="border-b border-line px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white/40">How to measure</div>
            <div className="p-5">
              <MeasureDiagram inches={inches} large />
              <ol className="mt-4 space-y-2.5 text-[12px] text-white/60">
                {[
                  'Open the garage door and stand under the tracks.',
                  'Measure from the ceiling surface to the track bolt hole centre.',
                  'Repeat for the opener attach bolts if you are mounting below the ceiling.',
                  'Going above the ceiling? Add the drywall thickness to your reading.',
                ].map((t, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/10 text-[9px] font-bold text-white/70">{i + 1}</span>
                    {t}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="rounded-xl border border-line bg-panel p-4">
            <div className="flex items-center gap-2 text-[12px] font-bold"><Info className="h-3.5 w-3.5 text-bolt" /> Size reference</div>
            <table className="mt-2 w-full text-[11px]">
              <tbody className="divide-y divide-line/60">
                {[['≤ 14"', 'TMGTS-12'], ['15–21"', 'TMGTX-19'], ['22–26"', 'TMGTL-24'], ['27–31"', 'TMGTL-29'], ['32–40"', 'TMGTL-34']].map(([a, b]) => (
                  <tr key={b}>
                    <td className="py-1.5 text-white/40">{a}</td>
                    <td className={`py-1.5 text-right font-mono ${rec.sku === b ? 'text-bolt' : 'text-white/60'}`}>{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </aside>
      </div>
    </>
  )
}

function MeasureDiagram({ inches, large = false }: { inches: number; large?: boolean }) {
  const h = Math.min(38, Math.max(8, inches))
  const bar = (h / 40) * 110 + 20
  return (
    <svg viewBox="0 0 220 170" className={large ? 'w-full max-w-[220px]' : 'w-[240px]'}>
      <rect x="0" y="0" width="220" height="14" fill="#2A2A31" />
      <text x="6" y="10" fill="#6E6E7A" fontSize="7">CEILING</text>
      <line x1="110" y1="14" x2="110" y2={14 + bar} stroke="#FFC300" strokeWidth="5" strokeLinecap="round" />
      <line x1="60" y1="14" x2="110" y2="14" stroke="#FFC300" strokeWidth="2" opacity=".5" strokeDasharray="3 3" />
      <line x1="110" y1="14" x2="160" y2="14" stroke="#FFC300" strokeWidth="2" opacity=".5" strokeDasharray="3 3" />
      <rect x="92" y={14 + bar} width="36" height="9" rx="2" fill="#9A9AA5" />
      <rect x="30" y={32 + bar} width="160" height="4" rx="1" fill="#3A3A42" />
      <rect x="30" y={36 + bar} width="160" height="70" fill="#1A1A1F" stroke="#2A2A31" />
      <g stroke="#2A2A31">
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1="30" y1={52 + i * 17 + bar} x2="190" y2={52 + i * 17 + bar} />
        ))}
      </g>
      <line x1="196" y1="14" x2="196" y2={14 + bar} stroke="#FFC300" strokeWidth="1" />
      <line x1="192" y1="14" x2="200" y2="14" stroke="#FFC300" strokeWidth="1" />
      <line x1="192" y1={14 + bar} x2="200" y2={14 + bar} stroke="#FFC300" strokeWidth="1" />
      <text x="204" y={14 + bar / 2} fill="#FFC300" fontSize="11" fontWeight="bold" textAnchor="middle" transform={`rotate(90 204 ${14 + bar / 2})`}>
        {h}"
      </text>
      <text x="110" y="166" fill="#6E6E7A" fontSize="7" textAnchor="middle">GARAGE DOOR TRACK</text>
    </svg>
  )
}
