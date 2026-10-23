import { useState } from 'react'
import { MapPin, Star, Search, Wrench, Check, Calendar, Clock, ShieldCheck, Phone, ArrowRight } from 'lucide-react'
import { dealers } from '../data'

const services = ['Track mounts', 'Opener mounts', 'Doors', 'Epoxy floors', 'Racks & lighting']

export default function Installers() {
  const [zip, setZip] = useState('93065')
  const [searched, setSearched] = useState(true)
  const [picked, setPicked] = useState<string | null>(null)
  const [date, setDate] = useState('2026-11-03')
  const [window, setWindow] = useState('9:00 – 11:00 AM')
  const [done, setDone] = useState(false)

  const list = dealers.filter((d) => d.status === 'Active')

  return (
    <>
      <div className="border-b border-line bg-panel/40">
        <div className="wrap py-10">
          <div className="eyebrow mb-2">Installer network</div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Certified installers, fixed pricing</h1>
          <p className="mt-2 max-w-2xl text-sm text-mist">
            Every Thunder Mounts dealer on this list is trained on the system and carries stock. Book a two-hour window
            and the installer brings everything — including the hardware you already ordered.
          </p>
        </div>
      </div>

      <div className="wrap grid gap-8 py-10 lg:grid-cols-[1fr_380px]">
        <div>
          <div className="mb-6 flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
              <input value={zip} onChange={(e) => setZip(e.target.value)} placeholder="ZIP code" className="input pl-9" />
            </div>
            <button onClick={() => setSearched(true)} className="btn-primary px-6">Find installers</button>
          </div>

          {/* fake map */}
          <div className="relative mb-6 h-56 overflow-hidden rounded-2xl border border-line bg-[#0B0B0F]">
            <div className="absolute inset-0 grid-lines opacity-60" />
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 220">
              <path d="M-20 150 C 120 120, 180 60, 300 90 S 480 160, 620 100" stroke="#22222A" strokeWidth="14" fill="none" />
              <path d="M60 220 L 200 0" stroke="#1A1A20" strokeWidth="8" fill="none" />
              <path d="M400 220 L 520 0" stroke="#1A1A20" strokeWidth="8" fill="none" />
            </svg>
            {[
              { x: '32%', y: '46%', n: 'Summit' },
              { x: '58%', y: '30%', n: 'Coastline' },
              { x: '72%', y: '62%', n: 'Bay Line' },
            ].map((m, i) => (
              <div key={m.n} className="absolute -translate-x-1/2 -translate-y-full" style={{ left: m.x, top: m.y }}>
                <div className={`rounded-full border px-2.5 py-1 text-[10px] font-bold backdrop-blur ${i === 0 ? 'border-bolt bg-bolt text-black' : 'border-line bg-panel/90 text-white/70'}`}>
                  <MapPin className="mr-1 inline h-3 w-3" /> {m.n}
                </div>
                <div className={`mx-auto h-2 w-2 rotate-45 border-b border-r ${i === 0 ? 'border-bolt bg-bolt' : 'border-line bg-panel'}`} />
              </div>
            ))}
            <div className="absolute bottom-3 left-3 rounded-lg bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/50 backdrop-blur">
              {zip || '93065'} · {list.length} certified dealers
            </div>
          </div>

          <div className="space-y-3">
            {list.map((d, i) => (
              <div key={d.id} className={`card p-4 transition ${picked === d.id ? 'border-bolt/60' : 'card-hover'}`}>
                <div className="flex flex-wrap items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-sm font-extrabold text-bolt">
                    {d.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-[15px] font-bold">{d.name}</h3>
                      <span className={`badge ${d.tier === 'Platinum' ? 'bg-bolt/20 text-bolt' : 'bg-white/10 text-white/70'}`}>{d.tier}</span>
                    </div>
                    <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-white/45">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {d.city}, {d.state} · {(2.1 + i * 3.4).toFixed(1)} mi</span>
                      <span className="flex items-center gap-1 text-bolt"><Star className="h-3 w-3 fill-bolt" /> {(4.6 + (i % 4) * 0.1).toFixed(1)} ({(68 + i * 23)} jobs)</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Next slot Tue</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {services.slice(0, 3 + (i % 2)).map((s) => (
                        <span key={s} className="rounded-md bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium text-white/50">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] text-white/35">Install from</div>
                    <div className="text-lg font-extrabold">${[249, 279, 259][i % 3]}</div>
                    <button onClick={() => setPicked(d.id)} className="btn-primary btn-sm mt-2">
                      Request
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside>
          <div className="card sticky top-32 p-5">
            {done ? (
              <div className="py-4 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                  <Check className="h-6 w-6" />
                </div>
                <h3 className="mt-3 text-lg font-bold">Request sent</h3>
                <p className="mt-1.5 text-[12px] leading-relaxed text-white/50">
                  Summit Garage Doors will confirm your {window} window on {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}.
                  Track it any time from your account.
                </p>
                <div className="mt-4 rounded-lg border border-line bg-white/[0.02] p-3 text-left text-[11px]">
                  <div className="flex justify-between py-0.5"><span className="text-white/40">Job number</span><span className="font-mono">J-2211</span></div>
                  <div className="flex justify-between py-0.5"><span className="text-white/40">Status</span><span className="text-bolt">Scheduled</span></div>
                </div>
                <button onClick={() => { setDone(false); setPicked(null) }} className="btn-dark btn-sm mt-4 w-full">Start over</button>
              </div>
            ) : (
              <>
                <h3 className="text-[15px] font-bold">{picked ? 'Book your install' : 'Select an installer'}</h3>
                <p className="mt-1 text-[12px] text-white/45">
                  {picked ? 'Choose a window. The installer confirms by text within 1 hour.' : 'Pick a dealer on the left to see available windows.'}
                </p>

                <div className={`mt-4 space-y-3 ${picked ? '' : 'pointer-events-none opacity-40'}`}>
                  <div>
                    <label className="label">Preferred date</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input" />
                  </div>
                  <div>
                    <label className="label">Window</label>
                    <div className="space-y-1.5">
                      {['8:00 – 10:00 AM', '9:00 – 11:00 AM', '1:00 – 3:00 PM'].map((w) => (
                        <button
                          key={w}
                          onClick={() => setWindow(w)}
                          className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-[12px] font-semibold transition ${
                            window === w ? 'border-bolt bg-bolt/10 text-bolt' : 'border-line text-white/60'
                          }`}
                        >
                          {w} {window === w && <Check className="h-3.5 w-3.5" />}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="label">Job notes</label>
                    <textarea rows={3} placeholder="Two doors, 9ft ceiling, existing LiftMaster 8500W…" className="input resize-none" />
                  </div>
                  <div className="rounded-lg border border-line bg-white/[0.02] p-3 text-[11px]">
                    <div className="flex justify-between py-0.5"><span className="text-white/40">Install fee</span><span>$249</span></div>
                    <div className="flex justify-between py-0.5"><span className="text-white/40">Haul away old hardware</span><span className="text-emerald-400">Included</span></div>
                  </div>
                  <button onClick={() => setDone(true)} className="btn-primary w-full">
                    Confirm request <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-5 space-y-2 border-t border-line pt-4 text-[11px] text-white/45">
                  <div className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-bolt" /> Workmanship guaranteed 12 months</div>
                  <div className="flex items-center gap-2"><Calendar className="h-3.5 w-3.5 text-bolt" /> Free reschedule up to 24h</div>
                  <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-bolt" /> Office: 805-262-2895</div>
                </div>
              </>
            )}
          </div>
        </aside>
      </div>
    </>
  )
}
