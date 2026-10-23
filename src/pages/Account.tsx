import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  LayoutDashboard, Package, Warehouse, Wrench, LifeBuoy, Truck, Check, ChevronRight, Star,
  Download, MapPin, Clock, Camera, Plus, Ruler, ArrowRight, FileText, Calendar, MessageSquare,
} from 'lucide-react'
import { PortalShell, PortalLogin, Panel, Table } from '../components/Portal'
import { Badge, Stat, Progress } from '../components/ui'
import { customer, customerOrders, products, money, installs } from '../data'
import { useStore } from '../store'

const nav = [
  { key: 'overview', label: 'Overview', icon: <LayoutDashboard className="h-4 w-4" /> },
  { key: 'orders', label: 'Orders', icon: <Package className="h-4 w-4" />, badge: 3 },
  { key: 'garage', label: 'My garage', icon: <Warehouse className="h-4 w-4" /> },
  { key: 'installs', label: 'Installations', icon: <Wrench className="h-4 w-4" />, badge: 1 },
  { key: 'support', label: 'Support', icon: <LifeBuoy className="h-4 w-4" /> },
]

export default function Account() {
  const { session } = useStore()
  const [tab, setTab] = useState('overview')
  const [authed, setAuthed] = useState(session === 'customer')

  if (!authed) {
    return (
      <div className="pt-0">
        <PortalLogin
          kind="customer"
          title="Your garage, remembered."
          sub="Sign in to track orders, keep your measurements and book installs."
          email="marcus.hale@gmail.com"
          image="./img/finished-garage.jpg"
          bullets={['Order history and live tracking', 'Saved garage measurements & fitment', 'Install booking and service history', 'Reorder in one click']}
          onSuccess={() => setAuthed(true)}
          alternate={{ to: '/dealer', label: 'I’m a dealer — trade login' }}
        />
      </div>
    )
  }

  return (
    <PortalShell
      role="Customer account"
      roleLabel="Customer"
      nav={nav}
      active={tab}
      onNav={setTab}
      user={{ name: customer.name, sub: customer.email, initials: 'MH' }}
      headerRight={
        <Link to="/shop" className="hidden rounded-full bg-white px-3.5 py-1.5 text-[12px] font-bold text-black hover:bg-white/90 sm:block">
          Shop
        </Link>
      }
    >
      {tab === 'overview' && <Overview onGo={setTab} />}
      {tab === 'orders' && <Orders />}
      {tab === 'garage' && <Garage />}
      {tab === 'installs' && <Installs />}
      {tab === 'support' && <Support />}
    </PortalShell>
  )
}

function Overview({ onGo }: { onGo: (t: string) => void }) {
  const job = installs[0]
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold tracking-tight">Hey Marcus — your garage is 82% finished.</h1>
        <p className="text-[13px] text-mist">Two doors mounted, one opener upgrade booked. Here's where everything stands.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Open orders" value="1" sub="ships Oct 25" icon={<Package className="h-4 w-4" />} />
        <Stat label="Next install" value="Nov 2" sub={`${job.window} · ${job.tech}`} icon={<Calendar className="h-4 w-4" />} />
        <Stat label="Garage points" value={customer.points} sub="$25 credit available" trend="+40 this month" icon={<Star className="h-4 w-4" />} />
        <Stat label="Measurements saved" value="2" sub="TMGTX-19 · TMS-12" icon={<Ruler className="h-4 w-4" />} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Panel title="Shipment tracking" action={<Link to="/account" className="text-[11px] font-semibold text-bolt">Details</Link>}>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-white/35">Order TM-10428</div>
              <div className="mt-0.5 text-[15px] font-bold">TMGTX-19 · TMS-12 · Finish ring</div>
            </div>
            <Badge tone="Shipped">In transit</Badge>
          </div>
          <div className="mt-6">
            <div className="flex items-center justify-between">
              {['Packed', 'Picked up', 'In transit', 'Out for delivery', 'Delivered'].map((s, i) => (
                <div key={s} className="flex flex-1 flex-col items-center">
                  <div className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${i <= 2 ? 'bg-bolt text-black' : 'border border-line text-white/30'}`}>
                    {i < 2 ? <Check className="h-3 w-3" strokeWidth={3} /> : i + 1}
                  </div>
                  <div className={`mt-2 text-center text-[9px] font-semibold uppercase tracking-wide ${i <= 2 ? 'text-white/70' : 'text-white/25'}`}>{s}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between rounded-lg border border-line bg-white/[0.02] px-3 py-2 text-[11px]">
              <span className="flex items-center gap-1.5 text-white/50"><Truck className="h-3.5 w-3.5 text-bolt" /> UPS 1Z999AA10123456784</span>
              <span className="font-semibold">Arrives Oct 25</span>
            </div>
          </div>
        </Panel>

        <Panel title="Garage profile">
          <div className="space-y-2.5">
            {[
              ['Doors', `${customer.garage.doors} · 8 ft wide`],
              ['Ceiling height', customer.garage.ceiling],
              ['Opener', customer.garage.opener],
              ['Measured drop', customer.garage.measured],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between border-b border-line/60 pb-2 text-[12px] last:border-0 last:pb-0">
                <span className="text-white/40">{k}</span>
                <span className="font-semibold">{v}</span>
              </div>
            ))}
          </div>
          <button onClick={() => onGo('garage')} className="btn-dark btn-sm mt-4 w-full">Edit garage profile</button>
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
        <Panel title="Your setup" pad={false}>
          <div className="relative">
            <img src="./img/hero-garage.jpg" alt="" className="h-40 w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-panel via-transparent" />
            <div className="absolute bottom-3 left-4">
              <div className="text-[11px] font-bold">2-door system installed</div>
              <div className="text-[10px] text-white/50">Job J-1902 · Mar 2024 · Summit Garage Doors</div>
            </div>
          </div>
          <div className="space-y-2 p-4">
            {['TMGTX-19 × 2', 'TMS-12 × 2', 'Chrome finish rings'].map((x) => (
              <div key={x} className="flex items-center gap-2 text-[12px] text-white/60"><Check className="h-3.5 w-3.5 text-bolt" /> {x}</div>
            ))}
            <button onClick={() => onGo('garage')} className="btn-dark btn-sm mt-2 w-full">View build sheet</button>
          </div>
        </Panel>

        <Panel title="Recommended next" action={<span className="text-[11px] text-white/35">Based on your garage</span>}>
          <div className="space-y-3">
            {[products.find((p) => p.id === 'vevor-rack')!, products.find((p) => p.id === 'tm-led')!].map((p, i) => (
              <div key={p.id} className="flex items-center gap-3 rounded-xl border border-line p-3">
                <img src={p.image} alt="" className="h-16 w-16 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-bold leading-snug">{p.name}</div>
                  <div className="mt-0.5 text-[11px] text-white/40">{i === 0 ? 'Clips to your existing TMGTX channels' : 'Uses the same channel mounts'}</div>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-[13px] font-extrabold">{money(p.price)}</span>
                    <span className="text-[10px] text-white/30 line-through">{money(p.msrp)}</span>
                  </div>
                </div>
                <Link to={`/product/${p.id}`} className="btn-dark btn-sm">View</Link>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  )
}

function Orders() {
  const [open, setOpen] = useState<string | null>('TM-10428')
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Orders</h1>
        <p className="text-[13px] text-mist">Every purchase, with tracking and a one-click reorder.</p>
      </div>
      <div className="space-y-3">
        {customerOrders.map((o) => (
          <div key={o.id} className="card overflow-hidden">
            <button onClick={() => setOpen(open === o.id ? null : o.id)} className="flex w-full flex-wrap items-center gap-4 p-4 text-left hover:bg-white/[0.02]">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-bolt">
                <Package className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[13px] font-bold">{o.id}</span>
                  <Badge tone={o.status}>{o.status}</Badge>
                </div>
                <div className="mt-0.5 truncate text-[11px] text-white/40">{o.date} · {o.items.join(' · ')}</div>
              </div>
              <div className="text-right">
                <div className="text-[15px] font-extrabold">{money(o.total)}</div>
                <div className="text-[10px] text-white/35">{o.eta}</div>
              </div>
              <ChevronRight className={`h-4 w-4 text-white/25 transition ${open === o.id ? 'rotate-90' : ''}`} />
            </button>
            {open === o.id && (
              <div className="grid gap-4 border-t border-line bg-black/20 p-4 sm:grid-cols-3">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-white/35">Tracking</div>
                  <div className="mt-1 font-mono text-[12px] text-white/80">{o.tracking}</div>
                  <div className="mt-1 text-[11px] text-white/40">{o.eta}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-white/35">Fulfilled by</div>
                  <div className="mt-1 text-[12px] text-white/80">{o.dealer}</div>
                  <div className="mt-1 text-[11px] text-white/40">Shipped from Simi Valley, CA</div>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="btn-dark btn-sm"><FileText className="h-3.5 w-3.5" /> Invoice PDF</button>
                  <button className="btn-primary btn-sm">Reorder items</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function Garage() {
  const { notify } = useStore()
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">My garage</h1>
          <p className="text-[13px] text-mist">Saved once, reused for every order, install and support ticket.</p>
        </div>
        <button onClick={() => notify('Garage profile saved')} className="btn-primary btn-sm">Save changes</button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        <Panel title="Measurements">
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ['Ceiling height', '9 ft 4 in'],
              ['Track bolt to ceiling', '18 in'],
              ['Opener attach to ceiling', '11 in'],
              ['Mounting style', 'Below ceiling'],
            ].map(([l, v]) => (
              <div key={l}>
                <label className="label">{l}</label>
                <input className="input" defaultValue={v} />
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-bolt/25 bg-bolt/[0.06] p-3 text-[12px] text-bolt">
            Your 18" measurement maps to <b>TMGTX-19</b> for track and <b>TMS-12</b> for openers.
          </div>
          <button className="btn-dark btn-sm mt-3"><Ruler className="h-3.5 w-3.5" /> Re-run fitment finder</button>
        </Panel>

        <div className="space-y-4">
          <Panel title="Doors & openers">
            <div className="space-y-3">
              {[
                { d: 'Door 1 — 8 × 7 ft', o: 'LiftMaster 8500W', s: 'Installed 2024' },
                { d: 'Door 2 — 8 × 7 ft', o: 'Chamberlain B970', s: 'Installed 2024' },
              ].map((x) => (
                <div key={x.d} className="flex items-center justify-between rounded-lg border border-line px-3 py-2.5">
                  <div>
                    <div className="text-[12px] font-semibold">{x.d}</div>
                    <div className="text-[10px] text-white/40">{x.o} · {x.s}</div>
                  </div>
                  <Badge tone="Available">Mounted</Badge>
                </div>
              ))}
              <button className="btn-dark btn-sm w-full"><Plus className="h-3.5 w-3.5" /> Add door</button>
            </div>
          </Panel>

          <Panel title="Photos & documents">
            <div className="grid grid-cols-3 gap-2">
              {['./img/hero-garage.jpg', './img/finished-garage.jpg', './img/product-hardware.jpg'].map((s) => (
                <div key={s} className="overflow-hidden rounded-lg border border-line">
                  <img src={s} alt="" className="h-16 w-full object-cover" />
                </div>
              ))}
              <button className="flex h-16 flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-line text-[10px] text-white/35 hover:border-bolt/50 hover:text-bolt">
                <Camera className="h-4 w-4" /> Add
              </button>
            </div>
            <div className="mt-3 flex items-center gap-2 text-[11px] text-white/40"><FileText className="h-3.5 w-3.5" /> Install record J-1902.pdf</div>
          </Panel>
        </div>
      </div>
    </div>
  )
}

function Installs() {
  const stages = ['Requested', 'Scheduled', 'On the way', 'In progress', 'Complete']
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Installations</h1>
        <p className="text-[13px] text-mist">Track your installer, reschedule, and keep the job photos.</p>
      </div>

      <div className="card overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line p-5">
          <div>
            <div className="font-mono text-[11px] text-white/35">Job J-2211 · Nov 2</div>
            <div className="mt-1 text-lg font-extrabold">Genie 6170 install</div>
            <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-white/45">
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 9:00 – 11:00 AM</span>
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> 1127 Sinaloa Rd, Simi Valley</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-wider text-white/35">Installer</div>
              <div className="text-[13px] font-semibold">Rosa Diaz · Summit</div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bolt/15 text-[12px] font-bold text-bolt">RD</div>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between">
            {stages.map((s, i) => (
              <div key={s} className="flex flex-1 items-center">
                <div className="flex flex-col items-center gap-1.5">
                  <div className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold ${i <= 1 ? 'bg-bolt text-black' : 'border border-line text-white/25'}`}>
                    {i <= 1 ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
                  </div>
                  <div className={`text-center text-[9px] font-semibold uppercase tracking-wide ${i <= 1 ? 'text-white/70' : 'text-white/25'}`}>{s}</div>
                </div>
                {i < stages.length - 1 && <div className={`mx-1 h-px flex-1 ${i < 1 ? 'bg-bolt/50' : 'bg-line'}`} />}
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <button className="btn-primary btn-sm">Reschedule</button>
            <button className="btn-dark btn-sm">Message installer</button>
            <button className="btn-dark btn-sm"><Download className="h-3.5 w-3.5" /> Job sheet</button>
          </div>
        </div>
      </div>

      <Panel title="Service history" pad={false}>
        <Table head={['Job', 'Date', 'Work', 'Installer', 'Status']}>
          {[
            ['J-1902', 'Mar 12, 2024', 'TMGTX-19 × 2 + TMS-12 × 2', 'Summit Garage Doors', 'Complete'],
            ['J-1664', 'Aug 3, 2023', 'Opener service + mounts', 'Summit Garage Doors', 'Complete'],
          ].map((r) => (
            <tr key={r[0]} className="hover:bg-white/[0.02]">
              <td className="td font-mono text-bolt">{r[0]}</td>
              <td className="td">{r[1]}</td>
              <td className="td">{r[2]}</td>
              <td className="td text-white/60">{r[3]}</td>
              <td className="td"><Badge tone={r[4]}>{r[4]}</Badge></td>
            </tr>
          ))}
        </Table>
      </Panel>
    </div>
  )
}

function Support() {
  const { notify } = useStore()
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Support</h1>
        <p className="text-[13px] text-mist">We answer in under an hour during business hours — and we already know your garage.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <Panel title="Open a ticket">
          <div className="space-y-3">
            <div><label className="label">Topic</label>
              <select className="input"><option>Fitment question</option><option>Order or shipping</option><option>Installation issue</option><option>Return / warranty</option></select>
            </div>
            <div><label className="label">Related order</label>
              <select className="input"><option>TM-10428</option><option>TM-10391</option><option>Not order related</option></select>
            </div>
            <div><label className="label">Message</label><textarea rows={4} className="input resize-none" placeholder="Tell us what's happening…" /></div>
            <button onClick={() => notify('Ticket T-553 created')} className="btn-primary w-full"><MessageSquare className="h-4 w-4" /> Submit ticket</button>
          </div>
        </Panel>

        <div className="space-y-4">
          <Panel title="Your tickets" pad={false}>
            <Table head={['Ticket', 'Subject', 'Updated', 'Status']}>
              {[
                ['T-545', 'Install reschedule request', '1d ago', 'Waiting'],
                ['T-512', 'Finish ring finish question', '2w ago', 'Open'],
              ].map((r) => (
                <tr key={r[0]}>
                  <td className="td font-mono text-bolt">{r[0]}</td>
                  <td className="td">{r[1]}</td>
                  <td className="td text-white/40">{r[2]}</td>
                  <td className="td"><Badge tone={r[3]}>{r[3]}</Badge></td>
                </tr>
              ))}
            </Table>
          </Panel>

          <Panel title="Quick answers">
            <div className="space-y-2">
              {['How do I measure for a mount?', 'What size do I need for a 9ft ceiling?', 'Can I install above drywall?', 'Warranty and returns'].map((q) => (
                <div key={q} className="flex items-center justify-between rounded-lg border border-line px-3 py-2.5 text-[12px]">
                  <span>{q}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-white/25" />
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}
