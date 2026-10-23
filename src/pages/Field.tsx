import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Wifi, WifiOff, MapPin, Phone, Camera, Check, ChevronRight, ArrowLeft, Clock, Package,
  PenLine, Navigation, CameraIcon, AlertCircle, Battery, Signal, CircleCheck, Truck,
} from 'lucide-react'
import { PortalShell } from '../components/Portal'
import { useStore } from '../store'
import { money } from '../data'
import { Badge } from '../components/ui'

type Job = {
  id: string
  customer: string
  phone: string
  address: string
  window: string
  kit: string[]
  notes: string
  value: number
  status: 'Next' | 'Scheduled' | 'Complete'
}

const jobs: Job[] = [
  {
    id: 'J-2208',
    customer: 'Dana Whitfield',
    phone: '(805) 555-0188',
    address: '88 Katherine Rd, Simi Valley',
    window: '8:00 – 10:00 AM',
    kit: ['TMGTX-19 × 1', 'TMS-12 × 1', 'Chrome finish ring × 1'],
    notes: 'Two-car garage, 9ft ceiling. Customer wants the old angle iron hauled away.',
    value: 1049,
    status: 'Next',
  },
  {
    id: 'J-2206',
    customer: 'P. Okafor',
    phone: '(805) 555-0119',
    address: '412 Erbes Rd, Thousand Oaks',
    window: '1:00 – 3:00 PM',
    kit: ['TMGTL-29 × 2', 'TM-LED-4 × 2'],
    notes: 'Vaulted ceiling — bring the long tubes and the extra ladder.',
    value: 2340,
    status: 'Scheduled',
  },
  {
    id: 'J-2205',
    customer: 'L. Brennan',
    phone: '(805) 555-0177',
    address: '19 Las Flores, Camarillo',
    window: '10:00 – 12:00 PM',
    kit: ['GENIE-6170 × 2', 'TMGTX-19 × 2'],
    notes: 'Wall mount install. Photos signed off.',
    value: 7150,
    status: 'Complete',
  },
]

const checklist = [
  'Confirm measurement on site',
  'Photograph existing installation',
  'Remove old angle iron / hardware',
  'Locate ceiling joists and mark centres',
  'Mount channels and verify level',
  'Fit vibration isolators and tubes',
  'Align door tracks / opener rail',
  'Test door balance and safety reverse',
  'Photograph completed installation',
  'Customer walkthrough + signature',
]

export default function Field() {
  const { notify } = useStore()
  const [open, setOpen] = useState<string | null>(null)
  const [done, setDone] = useState<string[]>(['Confirm measurement on site', 'Photograph existing installation'])
  const [offline, setOffline] = useState(false)
  const [stage, setStage] = useState<'list' | 'job' | 'complete'>('list')
  const [signed, setSigned] = useState(false)

  const job = jobs.find((j) => j.id === open)
  const pct = Math.round((done.length / checklist.length) * 100)

  const Device = (
    <div className="mx-auto w-full max-w-[1024px]">
      {/* tablet chrome */}
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2 text-[11px] text-white/35">
          <span className="flex gap-1"><span className="h-1.5 w-1.5 rounded-full bg-white/20" /><span className="h-1.5 w-1.5 rounded-full bg-white/20" /><span className="h-1.5 w-1.5 rounded-full bg-white/20" /></span>
          Thunder Field · v2.4 · Rosa Diaz
        </div>
        <div className="flex items-center gap-3 text-white/35">
          <Battery className="h-3.5 w-3.5" />
          <Signal className="h-3.5 w-3.5" />
          <button onClick={() => setOffline(!offline)} className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${offline ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/15 text-emerald-400'}`}>
            {offline ? <><WifiOff className="h-3 w-3" /> Offline</> : <><Wifi className="h-3 w-3" /> Synced</>}
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-[26px] border border-line bg-ink shadow-2xl">
        {stage === 'list' && (
          <>
            <div className="flex flex-wrap items-center gap-4 border-b border-line bg-panel/60 px-5 py-4">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">Thursday, Oct 23</div>
                <div className="text-lg font-extrabold">Today's route · 2 jobs</div>
              </div>
              <div className="ml-auto flex gap-2">
                <div className="rounded-lg border border-line px-3 py-1.5 text-center">
                  <div className="text-[9px] uppercase text-white/35">Miles</div>
                  <div className="text-[13px] font-bold">34.2</div>
                </div>
                <div className="rounded-lg border border-line px-3 py-1.5 text-center">
                  <div className="text-[9px] uppercase text-white/35">Value</div>
                  <div className="text-[13px] font-bold">{money(3389)}</div>
                </div>
                <button className="btn-primary btn-sm"><Navigation className="h-3.5 w-3.5" /> Start route</button>
              </div>
            </div>

            <div className="grid gap-4 p-5 lg:grid-cols-[1.3fr_1fr]">
              <div className="space-y-3">
                {jobs.map((j) => (
                  <button
                    key={j.id}
                    onClick={() => {
                      setOpen(j.id)
                      setStage('job')
                      setDone(j.status === 'Complete' ? checklist : ['Confirm measurement on site'])
                    }}
                    className={`w-full rounded-2xl border p-4 text-left transition ${
                      j.status === 'Next' ? 'border-bolt/50 bg-bolt/[0.05]' : 'border-line bg-panel hover:border-white/25'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${j.status === 'Complete' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-bolt/15 text-bolt'}`}>
                        {j.status === 'Complete' ? <CircleCheck className="h-5 w-5" /> : <Truck className="h-5 w-5" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] text-white/35">{j.id}</span>
                          <Badge tone={j.status === 'Complete' ? 'Complete' : 'Scheduled'}>{j.status}</Badge>
                        </div>
                        <div className="mt-0.5 text-[14px] font-bold">{j.customer}</div>
                        <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-white/40"><MapPin className="h-3 w-3" /> {j.address}</div>
                        <div className="mt-1 flex items-center gap-1.5 text-[11px] text-white/40"><Clock className="h-3 w-3" /> {j.window}</div>
                      </div>
                      <ChevronRight className="mt-2 h-4 w-4 text-white/25" />
                    </div>
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                <div className="rounded-2xl border border-line bg-panel p-4">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-white/40">Truck stock</div>
                  {[
                    ['TMGTX-19', 4], ['TMS-12', 3], ['TMGTL-29', 2], ['TM-RING-01', 8], ['GENIE-6170', 2],
                  ].map(([s, n]) => (
                    <div key={s as string} className="flex items-center justify-between border-b border-line/60 py-2 text-[12px] last:border-0">
                      <span className="font-mono text-white/70">{s}</span>
                      <span className="text-white/40">{n} on truck</span>
                    </div>
                  ))}
                  <button onClick={() => notify('Restock request sent to warehouse')} className="btn-dark btn-sm mt-3 w-full">
                    Request restock
                  </button>
                </div>
                <div className="rounded-2xl border border-line bg-panel p-4">
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-white/40"><AlertCircle className="h-3.5 w-3.5 text-bolt" /> Safety checklist</div>
                  <ul className="mt-2 space-y-1.5 text-[11px] text-white/55">
                    <li className="flex items-center gap-2"><Check className="h-3 w-3 text-emerald-400" /> Ladder inspected</li>
                    <li className="flex items-center gap-2"><Check className="h-3 w-3 text-emerald-400" /> Door locked out</li>
                    <li className="flex items-center gap-2"><Check className="h-3 w-3 text-emerald-400" /> PPE on site</li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}

        {stage === 'job' && job && (
          <>
            <div className="flex items-center gap-3 border-b border-line bg-panel/60 px-5 py-3">
              <button onClick={() => setStage('list')} className="rounded-lg p-1.5 text-white/50 hover:bg-white/5 hover:text-white">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div className="min-w-0">
                <div className="font-mono text-[10px] text-white/35">{job.id} · {job.window}</div>
                <div className="truncate text-[14px] font-bold">{job.customer}</div>
              </div>
              <div className="ml-auto flex gap-2">
                <a href={`tel:${job.phone}`} className="btn-dark btn-sm"><Phone className="h-3.5 w-3.5" /> Call</a>
                <button className="btn-dark btn-sm"><Navigation className="h-3.5 w-3.5" /> Navigate</button>
              </div>
            </div>

            <div className="grid gap-4 p-5 lg:grid-cols-[1.1fr_1fr]">
              <div className="space-y-4">
                <div className="rounded-2xl border border-line bg-panel p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-white/40">Job checklist</div>
                    <div className="text-[11px] font-bold text-bolt">{pct}%</div>
                  </div>
                  <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-bolt transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="space-y-1">
                    {checklist.map((c) => {
                      const isDone = done.includes(c)
                      return (
                        <button
                          key={c}
                          onClick={() => setDone((d) => (isDone ? d.filter((x) => x !== c) : [...d, c]))}
                          className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-white/[0.03]"
                        >
                          <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${isDone ? 'border-bolt bg-bolt text-black' : 'border-white/20'}`}>
                            {isDone && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                          </span>
                          <span className={`text-[12px] ${isDone ? 'text-white/35 line-through' : 'text-white/80'}`}>{c}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="rounded-2xl border border-line bg-panel p-4">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-white/40">Job notes</div>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-white/60">{job.notes}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {job.kit.map((k) => (
                      <span key={k} className="rounded-md border border-line bg-white/[0.03] px-2 py-1 font-mono text-[10px] text-white/60">{k}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-line bg-panel p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-white/40">Photos</div>
                    <span className="text-[10px] text-white/30">2 before · 0 after</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="relative overflow-hidden rounded-lg border border-line">
                      <img src="./img/hero-garage.jpg" alt="" className="h-16 w-full object-cover" />
                      <span className="absolute bottom-0.5 left-0.5 rounded bg-black/70 px-1 text-[8px] font-bold text-white/70">BEFORE</span>
                    </div>
                    <div className="relative overflow-hidden rounded-lg border border-line">
                      <img src="./img/product-hardware.jpg" alt="" className="h-16 w-full object-cover" />
                      <span className="absolute bottom-0.5 left-0.5 rounded bg-black/70 px-1 text-[8px] font-bold text-white/70">BEFORE</span>
                    </div>
                    <button
                      onClick={() => notify(offline ? 'Photo saved locally — will upload when online' : 'Photo uploaded to job')}
                      className="flex h-16 flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-white/20 text-white/40 hover:border-bolt hover:text-bolt"
                    >
                      <Camera className="h-4 w-4" />
                      <span className="text-[9px] font-semibold">Capture</span>
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl border border-line bg-panel p-4">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-white/40">Customer signature</div>
                  {signed ? (
                    <div className="mt-2 rounded-lg border border-emerald-500/25 bg-emerald-500/[0.08] px-3 py-6 text-center">
                      <PenLine className="mx-auto h-5 w-5 text-emerald-400" />
                      <div className="mt-1 text-[12px] font-semibold text-emerald-300">Signed by {job.customer}</div>
                      <div className="text-[10px] text-white/35">Oct 23, 10:42 AM · {job.id}</div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setSigned(true)}
                      className="mt-2 flex h-20 w-full items-center justify-center rounded-lg border border-dashed border-white/20 text-[11px] text-white/35 hover:border-bolt/60 hover:text-bolt"
                    >
                      <PenLine className="mr-1.5 h-3.5 w-3.5" /> Tap to sign on screen
                    </button>
                  )}
                </div>

                <button
                  onClick={() => {
                    setStage('complete')
                    notify(offline ? 'Saved offline — sync pending' : 'Job closed and synced to the office')
                  }}
                  className="btn-primary w-full"
                >
                  <Check className="h-4 w-4" /> Complete job
                </button>
                <p className="text-center text-[10px] text-white/30">Closes the job, emails the customer a receipt and draws stock from the truck.</p>
              </div>
            </div>
          </>
        )}

        {stage === 'complete' && job && (
          <div className="p-10 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
              <Check className="h-8 w-8" strokeWidth={3} />
            </div>
            <h2 className="mt-5 text-2xl font-extrabold tracking-tight">Job {job.id} complete</h2>
            <p className="mx-auto mt-2 max-w-sm text-[13px] text-mist">
              Invoice sent to {job.customer}. Stock drawn from the truck, photos filed to the job record, and the office
              dashboard updated in real time.
            </p>
            <div className="mx-auto mt-6 grid max-w-md grid-cols-3 gap-2 text-left">
              {[['Photos', '2 before · 2 after'], ['Signature', 'Captured'], ['Invoice', money(job.value)]].map(([k, v]) => (
                <div key={k} className="rounded-lg border border-line p-3">
                  <div className="text-[9px] uppercase tracking-wider text-white/35">{k}</div>
                  <div className="mt-0.5 text-[11px] font-semibold">{v}</div>
                </div>
              ))}
            </div>
            <button onClick={() => { setStage('list'); setSigned(false) }} className="btn-dark mt-6">Back to route</button>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <PortalShell
      role="Installer app"
      roleLabel="Field"
      nav={[{ key: 'field', label: 'Today', icon: <Navigation className="h-4 w-4" /> }]}
      active="field"
      onNav={() => {}}
      org="Summit Garage Doors"
      user={{ name: 'Rosa Diaz', sub: 'Lead installer', initials: 'RD' }}
      headerRight={<Link to="/admin" className="hidden rounded-full border border-line px-3 py-1.5 text-[11px] font-semibold text-white/60 hover:text-white sm:block">Office view</Link>}
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Installer app</h1>
          <p className="text-[13px] text-mist">Tablet-first, works offline, syncs when the truck gets signal.</p>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-white/35">
          <span className="chip">Offline-ready</span>
          <span className="chip">Signature capture</span>
          <span className="chip">Photo evidence</span>
        </div>
      </div>
      {Device}
    </PortalShell>
  )
}
