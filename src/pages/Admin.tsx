import { useState } from 'react'
import {
  LayoutDashboard, ShoppingCart, Boxes, Handshake, Wrench, Users, FileEdit, ShieldCheck,
  TrendingUp, Download, Plus, Search, Check, X, ArrowUpRight, AlertTriangle, Star, Eye, Globe,
  Command, Lock, Layers, RotateCcw, PackageCheck, BadgeCheck,
} from 'lucide-react'
import {
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, AreaChart, Area,
} from 'recharts'
import { PortalShell, PortalLogin, Panel, Table } from '../components/Portal'
import { Badge, Stat, Progress } from '../components/ui'
import {
  adminOrders, dealers, products, money, revenueSeries, channelMix, topSkus, regionSplit, funnel,
  applications, tickets, team, installs, adminActions,
} from '../data'
import { useStore } from '../store'

const nav = [
  { key: 'overview', label: 'Overview', icon: <LayoutDashboard className="h-4 w-4" /> },
  { key: 'actions', label: 'Action centre', icon: <Command className="h-4 w-4" />, group: 'Commerce' },
  { key: 'orders', label: 'Orders', icon: <ShoppingCart className="h-4 w-4" />, badge: 4, group: 'Commerce' },
  { key: 'inventory', label: 'Inventory', icon: <Boxes className="h-4 w-4" />, group: 'Commerce' },
  { key: 'customers', label: 'Customers', icon: <Users className="h-4 w-4" />, group: 'Commerce' },
  { key: 'dealers', label: 'Dealers', icon: <Handshake className="h-4 w-4" />, badge: 3, group: 'Network' },
  { key: 'installs', label: 'Installations', icon: <Wrench className="h-4 w-4" />, group: 'Network' },
  { key: 'content', label: 'Website content', icon: <FileEdit className="h-4 w-4" />, group: 'Manage' },
  { key: 'team', label: 'Team & roles', icon: <ShieldCheck className="h-4 w-4" />, group: 'Manage' },
]

export default function Admin() {
  const { session } = useStore()
  const [tab, setTab] = useState('overview')
  const [authed, setAuthed] = useState(session === 'admin')

  if (!authed) {
    return (
      <PortalLogin
        kind="admin"
        title="The whole business, one screen."
        sub="Orders, stock, dealers, installs and website content — with roles and an audit trail."
        email="gustavo@thundermounts.com"
        image="./img/dealer-showroom.jpg"
        bullets={['Revenue by channel and dealer', 'Live inventory and reorder alerts', 'Approve dealers and route leads', 'Edit the website without a developer']}
        onSuccess={() => setAuthed(true)}
        alternate={{ to: '/dealer', label: 'Dealer login' }}
      />
    )
  }

  return (
    <PortalShell
      role="Owner console"
      roleLabel="Admin"
      nav={nav}
      active={tab}
      onNav={setTab}
      org="Thunder Mounts Garage Systems"
      user={{ name: 'Gustavo Estravit', sub: 'Owner · full access', initials: 'GE' }}
      headerRight={
        <button className="hidden items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-[12px] font-semibold text-white/70 hover:text-white sm:flex">
          <Eye className="h-3.5 w-3.5" /> View site
        </button>
      }
    >
      {tab === 'overview' && <Overview onGo={setTab} />}
      {tab === 'actions' && <ActionCentre />}
      {tab === 'orders' && <Orders />}
      {tab === 'inventory' && <Inventory />}
      {tab === 'customers' && <Customers />}
      {tab === 'dealers' && <Dealers />}
      {tab === 'installs' && <Installs />}
      {tab === 'content' && <Content />}
      {tab === 'team' && <Team />}
    </PortalShell>
  )
}

function Overview({ onGo }: { onGo: (t: string) => void }) {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Good morning, Gustavo</h1>
          <p className="text-[13px] text-mist">Thursday, October 23 · everything across store, dealers and installs.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-dark btn-sm"><Download className="h-3.5 w-3.5" /> Export</button>
          <button onClick={() => onGo('orders')} className="btn-primary btn-sm"><Plus className="h-3.5 w-3.5" /> New order</button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Revenue MTD" value={money(131200)} trend="+22.6%" sub="vs. Sep MTD" icon={<TrendingUp className="h-4 w-4" />} />
        <Stat label="Orders MTD" value="186" trend="+14" sub="42 dealer POs" icon={<ShoppingCart className="h-4 w-4" />} />
        <Stat label="Avg. order value" value={money(705)} trend="+6.1%" sub="store: $642 · dealer: $1,180" icon={<Boxes className="h-4 w-4" />} />
        <Stat label="Installs scheduled" value="27" sub="this week · 3 unassigned" icon={<Wrench className="h-4 w-4" />} />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <Panel title="Revenue by channel" action={<div className="flex items-center gap-3 text-[10px] text-white/40">
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-bolt" /> Dealer</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-white/40" /> Direct</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-white/15" /> Market</span>
        </div>}>
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueSeries} margin={{ top: 8, right: 4, left: -18, bottom: 0 }} barSize={14}>
                <CartesianGrid stroke="#22222A" vertical={false} />
                <XAxis dataKey="m" stroke="#55555F" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#55555F" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip
                  contentStyle={{ background: '#16161A', border: '1px solid #26262C', borderRadius: 10, fontSize: 12 }}
                  formatter={(v: any, n: any) => [money(Number(v)), n]}
                />
                <Bar dataKey="dealer" stackId="a" fill="#FFC300" radius={[0, 0, 0, 0]} />
                <Bar dataKey="store" stackId="a" fill="#8A8A96" />
                <Bar dataKey="marketplace" stackId="a" fill="#34343E" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Channel mix">
          <div className="flex items-center gap-4">
            <div className="h-[140px] w-[140px] shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={channelMix} dataKey="value" innerRadius={44} outerRadius={66} paddingAngle={3} stroke="none">
                    {channelMix.map((c) => <Cell key={c.name} fill={c.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2">
              {channelMix.map((c) => (
                <div key={c.name} className="flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-2 text-white/55"><span className="h-2 w-2 rounded-full" style={{ background: c.color }} /> {c.name}</span>
                  <span className="font-bold">{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 rounded-lg border border-line bg-white/[0.02] p-3 text-[11px] text-white/45">
            Dealer channel is 58% of revenue but only 31% of support load — the portal is doing its job.
          </div>
        </Panel>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Panel title="Top SKUs" action={<button onClick={() => onGo('inventory')} className="text-[11px] font-semibold text-bolt">Inventory</button>}>
          <div className="space-y-3">
            {topSkus.map((s, i) => (
              <div key={s.sku}>
                <div className="mb-1 flex items-center justify-between text-[11px]">
                  <span className="font-mono text-white/70">{s.sku}</span>
                  <span className="text-white/40">{s.units} u · {money(s.revenue)}</span>
                </div>
                <Progress pct={(s.units / topSkus[0].units) * 100} tone={i === 0 ? 'bg-bolt' : 'bg-white/25'} />
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Fitment → purchase funnel">
          <div className="space-y-2.5">
            {funnel.map((f, i) => (
              <div key={f.step} className="flex items-center gap-3">
                <div className="w-20 shrink-0 text-[11px] text-white/45">{f.step}</div>
                <div className="h-6 flex-1 overflow-hidden rounded bg-white/[0.04]">
                  <div className="flex h-full items-center justify-end rounded bg-bolt/80 px-2 text-[10px] font-bold text-black" style={{ width: `${(f.value / funnel[0].value) * 100}%` }}>
                    {f.value.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between rounded-lg border border-bolt/25 bg-bolt/[0.06] px-3 py-2 text-[11px] text-bolt">
            <span>Fitment tool converts at 20.1%</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </Panel>

        <Panel title="Where revenue comes from">
          <div className="space-y-2.5">
            {regionSplit.map((r) => (
              <div key={r.region}>
                <div className="mb-1 flex justify-between text-[11px]"><span className="text-white/55">{r.region}</span><span className="text-white/70">{r.value}%</span></div>
                <Progress pct={r.value * 2} tone="bg-white/25" />
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <Panel title="Needs your attention" pad={false}>
          <div className="divide-y divide-line/70">
            {[
              { i: <FileEdit className="h-4 w-4" />, t: '3 dealer applications waiting', d: 'Front Range Overhead is ready to approve', a: 'Review', k: 'dealers' },
              { i: <AlertTriangle className="h-4 w-4" />, t: 'TMGTL-29 below reorder point', d: '38 units left · 5 day lead time', a: 'Reorder', k: 'inventory' },
              { i: <Star className="h-4 w-4" />, t: '12 new reviews to moderate', d: '4.9 average across the catalogue', a: 'Open', k: 'content' },
            ].map((x) => (
              <div key={x.t} className="flex items-center gap-3 px-5 py-3.5">
                <span className="text-bolt">{x.i}</span>
                <div className="min-w-0 flex-1">
                  <div className="text-[12px] font-semibold">{x.t}</div>
                  <div className="text-[11px] text-white/35">{x.d}</div>
                </div>
                <button onClick={() => onGo(x.k)} className="rounded-lg border border-line px-2.5 py-1 text-[11px] font-semibold text-white/70 hover:border-bolt/50 hover:text-bolt">{x.a}</button>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Support queue" action={<span className="text-[11px] text-white/35">{tickets.length} open</span>}>
          <div className="space-y-2">
            {tickets.slice(0, 3).map((t) => (
              <div key={t.id} className="rounded-lg border border-line p-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-white/35">{t.id}</span>
                  <Badge tone={t.priority}>{t.priority}</Badge>
                </div>
                <div className="mt-1 text-[12px] font-medium leading-snug">{t.subject}</div>
                <div className="mt-0.5 text-[10px] text-white/35">{t.customer} · {t.channel} · {t.age}</div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  )
}


function ActionCentre() {
  const { notify } = useStore()
  const [q, setQ] = useState('')
  const [gi, setGi] = useState('all')
  const [ran, setRan] = useState<string[]>([])
  const [log, setLog] = useState<{ name: string; at: string }[]>([
    { name: 'Approved dealer application AP-117', at: '12m ago' },
    { name: 'Refunded order TM-10424', at: '2h ago' },
    { name: 'Adjusted TMGTL-29 stock +12', at: '5h ago' },
    { name: 'Published homepage hero', at: '8h ago' },
  ])

  const groups = adminActions.filter((g) => gi === 'all' || g.id === gi)
  const term = q.trim().toLowerCase()
  const total = adminActions.reduce((n, g) => n + g.actions.length, 0)

  const run = (name: string) => {
    setRan((r) => (r.includes(name) ? r : [...r, name]))
    setLog((l) => [{ name, at: 'just now' }, ...l].slice(0, 6))
    notify(`${name} — done`)
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Action centre</h1>
          <p className="text-[13px] text-mist">Everything staff can do in the console — {total} actions, all role-checked and audit logged.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/30" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search actions" className="input py-2 pl-8 text-[12px]" />
        </div>
      </div>

      <div className="no-bar flex gap-1.5 overflow-x-auto pb-1">
        <button
          onClick={() => setGi('all')}
          className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold transition ${gi === 'all' ? 'bg-bolt text-black' : 'border border-line text-white/55 hover:text-white'}`}
        >
          All {total}
        </button>
        {adminActions.map((g) => (
          <button
            key={g.id}
            onClick={() => setGi(g.id)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold transition ${gi === g.id ? 'bg-bolt text-black' : 'border border-line text-white/55 hover:text-white'}`}
          >
            {g.group} <span className={gi === g.id ? 'text-black/50' : 'text-white/25'}>{g.actions.length}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          {groups.map((g) => {
            const actions = g.actions.filter((a) => !term || (a.name + a.detail).toLowerCase().includes(term))
            if (actions.length === 0) return null
            return (
              <Panel key={g.id} title={g.group} action={<span className="text-[11px] text-white/30">{g.actions.length} actions</span>}>
                <p className="mb-3 text-[12px] text-white/40">{g.blurb}</p>
                <div className="divide-y divide-line/70">
                  {actions.map((a) => {
                    const isRan = ran.includes(a.name)
                    return (
                      <div key={a.name} className="flex items-start gap-3 py-2.5">
                        <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${isRan ? 'bg-emerald-500/15 text-emerald-400' : 'bg-white/[0.05] text-white/40'}`}>
                          {isRan ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : <Layers className="h-3 w-3" />}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 text-[12px] font-semibold">
                            {a.name}
                            {a.guarded && <Lock className="h-3 w-3 text-amber-400/80" />}
                          </div>
                          <div className="text-[11px] leading-relaxed text-white/40">{a.detail}</div>
                        </div>
                        <button
                          onClick={() => run(a.name)}
                          className={`shrink-0 rounded-lg border px-2.5 py-1 text-[10px] font-bold transition ${
                            isRan ? 'border-emerald-500/30 text-emerald-400' : 'border-line text-white/60 hover:border-bolt/60 hover:text-bolt'
                          }`}
                        >
                          {isRan ? 'Done' : 'Run'}
                        </button>
                      </div>
                    )
                  })}
                </div>
              </Panel>
            )
          })}
          {groups.every((g) => g.actions.filter((a) => !term || (a.name + a.detail).toLowerCase().includes(term)).length === 0) && (
            <div className="card p-10 text-center text-sm text-mist">No actions match “{q}”.</div>
          )}
        </div>

        <div className="space-y-4">
          <Panel title="Session log" action={<span className="flex items-center gap-1 text-[10px] text-emerald-400"><BadgeCheck className="h-3 w-3" /> live</span>}>
            <div className="space-y-2">
              {log.map((l, i) => (
                <div key={`${l.name}-${i}`} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-bolt/70" />
                  <div className="flex-1 text-[11px] leading-snug text-white/60">{l.name}</div>
                  <span className="shrink-0 text-[10px] text-white/25">{l.at}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 border-t border-line pt-3 text-[10px] leading-relaxed text-white/30">
              In production this is the permanent audit trail: actor, action, before/after values and timestamp.
            </p>
          </Panel>

          <Panel title="Guarded actions">
            <div className="space-y-2 text-[11px] text-white/50">
              <div className="flex items-center gap-2"><Lock className="h-3 w-3 text-amber-400" /> Refunds above $1,000 need owner approval</div>
              <div className="flex items-center gap-2"><RotateCcw className="h-3 w-3 text-amber-400" /> Stock adjustments require a reason code</div>
              <div className="flex items-center gap-2"><PackageCheck className="h-3 w-3 text-amber-400" /> Dealer credit limits verified before Net 30 orders</div>
              <div className="flex items-center gap-2"><ShieldCheck className="h-3 w-3 text-amber-400" /> Two-factor required for admin and owner</div>
            </div>
          </Panel>

          <Panel title="Not in the console">
            <p className="text-[11px] leading-relaxed text-white/40">
              Deliberately excluded so the team stays focused: payroll, full accounting, and marketing automation
              beyond the Klaviyo integration. Those stay in the tools that already do them well.
            </p>
          </Panel>
        </div>
      </div>
    </div>
  )
}

function Orders() {
  const [filter, setFilter] = useState('All')
  const list = adminOrders.filter((o) => filter === 'All' || o.status === filter || o.channel === filter)
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Orders</h1>
          <p className="text-[13px] text-mist">Direct, dealer and marketplace orders in one queue.</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {['All', 'Paid', 'Picking', 'Shipped', 'Dealer', 'Direct'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition ${filter === f ? 'bg-bolt text-black' : 'border border-line text-white/55 hover:text-white'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        <Stat label="Open orders" value="12" sub="4 need picking" />
        <Stat label="Shipped today" value="9" />
        <Stat label="Avg. fulfilment" value="1.4 days" trend="-0.3d" />
        <Stat label="Returns MTD" value="1.6%" trend="-0.4 pts" />
      </div>

      <Panel pad={false}>
        <Table head={['Order', 'Customer', 'Channel', 'Items', 'Total', 'Date', 'Status', '']}>
          {list.map((o) => (
            <tr key={o.id} className="hover:bg-white/[0.02]">
              <td className="td font-mono text-bolt">{o.id}</td>
              <td className="td">
                <div className="font-semibold">{o.customer}</div>
                <div className="text-[11px] text-white/35">{o.state}{o.dealer ? ` · ${o.dealer}` : ''}</div>
              </td>
              <td className="td"><span className="rounded-md bg-white/[0.05] px-1.5 py-0.5 text-[10px] font-semibold text-white/60">{o.channel}</span></td>
              <td className="td">{o.items}</td>
              <td className="td font-semibold">{money(o.total)}</td>
              <td className="td text-white/45">{o.date}</td>
              <td className="td"><Badge tone={o.status}>{o.status}</Badge></td>
              <td className="td"><button className="text-[11px] font-semibold text-white/45 hover:text-bolt">Open</button></td>
            </tr>
          ))}
        </Table>
      </Panel>
    </div>
  )
}

function Inventory() {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Inventory</h1>
          <p className="text-[13px] text-mist">One stock pool shared by store, dealers and marketplace.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/30" />
          <input placeholder="Search SKU" className="input py-2 pl-8 text-[12px]" />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        <Stat label="Active SKUs" value={products.length} />
        <Stat label="Units on hand" value={products.reduce((s, p) => s + p.stock, 0)} />
        <Stat label="Stock value" value={money(148600)} />
        <Stat label="Below reorder" value="2" sub="TMGTL-29, TMGTL-34" />
      </div>

      <Panel title="Products" pad={false}>
        <Table head={['SKU', 'Product', 'Category', 'Price', 'MSRP', 'Stock', 'Reorder at', 'Status', '']}>
          {products.map((p) => (
            <tr key={p.id} className="hover:bg-[#ffffff02]">
              <td className="td font-mono text-[11px] text-bolt">{p.sku}</td>
              <td className="td">
                <div className="flex items-center gap-2">
                  <img src={p.image} alt="" className="h-7 w-7 rounded object-cover" />
                  <span className="text-[12px]">{p.name}</span>
                </div>
              </td>
              <td className="td text-white/45">{p.category}</td>
              <td className="td font-semibold">{money(p.price)}</td>
              <td className="td text-white/35 line-through">{money(p.msrp)}</td>
              <td className="td">{p.stock}</td>
              <td className="td text-white/40">25</td>
              <td className="td">
                <Badge tone={p.stock > 30 ? 'Healthy' : p.stock > 10 ? 'Low' : 'Reorder'}>
                  {p.stock > 30 ? 'Healthy' : p.stock > 10 ? 'Low' : 'Reorder'}
                </Badge>
              </td>
              <td className="td"><button className="text-[11px] font-semibold text-white/45 hover:text-bolt">Edit</button></td>
            </tr>
          ))}
        </Table>
      </Panel>
    </div>
  )
}

function Customers() {
  const rows = [
    ['Marcus Hale', 'marcus.hale@gmail.com', 'CA', 3, 2089, 'Gold', 'Repeat'],
    ['Elena Vasquez', 'elena.v@gmail.com', 'TX', 2, 1249, 'Silver', 'Repeat'],
    ['Dana Whitfield', 'dana.w@outlook.com', 'CA', 1, 1049, 'New', 'New'],
    ['Hannah Cole', 'hannah.c@gmail.com', 'OR', 4, 1780, 'Gold', 'Repeat'],
    ['Robert Nakamura', 'r.nakamura@gmail.com', 'NV', 1, 395, 'New', '—'],
  ]
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Customers</h1>
        <p className="text-[13px] text-mist">Accounts with garage profiles, not just email addresses.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-4">
        <Stat label="Accounts" value="2,418" trend="+186" sub="this month" />
        <Stat label="Repeat rate" value="31%" trend="+4 pts" />
        <Stat label="Profiles completed" value="68%" sub="measurements saved" />
        <Stat label="Avg. LTV" value={money(1120)} />
      </div>
      <Panel title="All customers" pad={false}>
        <Table head={['Customer', 'Email', 'State', 'Orders', 'Spend', 'Tier', 'Type', '']}>
          {rows.map((r) => (
            <tr key={r[0] as string} className="hover:bg-white/[0.02]">
              <td className="td font-semibold">{r[0]}</td>
              <td className="td text-white/45">{r[1]}</td>
              <td className="td text-white/45">{r[2]}</td>
              <td className="td">{r[3]}</td>
              <td className="td font-semibold">{money(r[4] as number)}</td>
              <td className="td"><Badge tone={r[5] === 'Gold' ? 'Gold' : 'Silver'}>{r[5]}</Badge></td>
              <td className="td text-white/45">{r[6]}</td>
              <td className="td"><button className="text-[11px] font-semibold text-white/45 hover:text-bolt">View</button></td>
            </tr>
          ))}
        </Table>
      </Panel>
    </div>
  )
}

function Dealers() {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Dealer network</h1>
          <p className="text-[13px] text-mist">Tiers, performance and applications — the whole channel in one view.</p>
        </div>
        <button className="btn-primary btn-sm"><Plus className="h-3.5 w-3.5" /> Invite dealer</button>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        <Stat label="Active dealers" value="7" sub="+1 this quarter" />
        <Stat label="Dealer revenue YTD" value={money(764800)} trend="+19.2%" />
        <Stat label="Top dealer" value="Summit" sub={money(182400)} />
        <Stat label="Avg. conversion" value="30.8%" sub="lead → job" />
      </div>

      <Panel title="Dealer leaderboard" pad={false}>
        <Table head={['Dealer', 'Location', 'Tier', 'YTD revenue', 'Orders', 'Installs', 'Conv.', 'Status', '']}>
          {[...dealers].sort((a, b) => b.ytd - a.ytd).map((d) => (
            <tr key={d.id} className="hover:bg-white/[0.02]">
              <td className="td">
                <div className="font-semibold">{d.name}</div>
                <div className="font-mono text-[10px] text-white/30">{d.id} · rep {d.rep}</div>
              </td>
              <td className="td text-white/45">{d.city}, {d.state}</td>
              <td className="td"><Badge tone={d.tier}>{d.tier}</Badge></td>
              <td className="td font-semibold">{d.ytd ? money(d.ytd) : '—'}</td>
              <td className="td">{d.orders || '—'}</td>
              <td className="td">{d.installs || '—'}</td>
              <td className="td">{d.conversion ? `${d.conversion}%` : '—'}</td>
              <td className="td"><Badge tone={d.status}>{d.status}</Badge></td>
              <td className="td"><button className="text-[11px] font-semibold text-white/45 hover:text-bolt">Manage</button></td>
            </tr>
          ))}
        </Table>
      </Panel>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Applications" pad={false}>
          <Table head={['App', 'Business', 'Submitted', 'Docs', 'Status', '']}>
            {applications.map((a) => (
              <tr key={a.id}>
                <td className="td font-mono text-[11px] text-bolt">{a.id}</td>
                <td className="td">
                  <div className="font-semibold">{a.name}</div>
                  <div className="text-[10px] text-white/35">{a.city}</div>
                </td>
                <td className="td text-white/45">{a.submitted}</td>
                <td className="td">{a.docs}</td>
                <td className="td"><Badge tone={a.status}>{a.status}</Badge></td>
                <td className="td">
                  <div className="flex gap-1">
                    <button className="rounded bg-emerald-500/15 p-1 text-emerald-400 hover:bg-emerald-500/25"><Check className="h-3.5 w-3.5" /></button>
                    <button className="rounded bg-white/5 p-1 text-white/40 hover:bg-white/10"><X className="h-3.5 w-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </Table>
        </Panel>

        <Panel title="Lead routing">
          <p className="text-[12px] leading-relaxed text-white/50">
            Homeowner inquiries from the store locator are matched by ZIP to the nearest active dealer, then escalated
            to the next dealer if untouched for 60 minutes.
          </p>
          <div className="mt-4 space-y-2">
            {dealers.filter((d) => d.status === 'Active').slice(0, 4).map((d) => (
              <div key={d.id} className="flex items-center justify-between rounded-lg border border-line px-3 py-2 text-[12px]">
                <span>{d.name}</span>
                <span className="text-white/35">{d.city}, {d.state}</span>
                <span className="font-semibold text-bolt">{Math.round(38 - d.conversion / 2)}% share</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  )
}

function Installs() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Installations</h1>
        <p className="text-[13px] text-mist">Every job across the network, with technician and status.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-4">
        <Stat label="This week" value="27" sub="3 unassigned" />
        <Stat label="Revenue from installs" value={money(41200)} trend="+12%" sub="MTD" />
        <Stat label="Avg. job value" value={money(1240)} />
        <Stat label="On-time rate" value="94%" trend="+2 pts" />
      </div>
      <Panel title="Job board" pad={false}>
        <Table head={['Job', 'Customer', 'Address', 'Date', 'Window', 'Tech', 'Value', 'Status']}>
          {installs.map((j) => (
            <tr key={j.id} className="hover:bg-white/[0.02]">
              <td className="td font-mono text-bolt">{j.id}</td>
              <td className="td font-semibold">{j.customer}</td>
              <td className="td text-white/45">{j.address}</td>
              <td className="td">{j.date}</td>
              <td className="td text-white/50">{j.window}</td>
              <td className="td">{j.tech}</td>
              <td className="td font-semibold">{money(j.value)}</td>
              <td className="td"><Badge tone={j.status}>{j.status}</Badge></td>
            </tr>
          ))}
        </Table>
      </Panel>
    </div>
  )
}

function Content() {
  const [saved, setSaved] = useState(false)
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Website content</h1>
          <p className="text-[13px] text-mist">Edit the storefront without a developer — changes publish in seconds.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-dark btn-sm"><Globe className="h-3.5 w-3.5" /> Preview</button>
          <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 1800) }} className="btn-primary btn-sm">
            {saved ? <><Check className="h-3.5 w-3.5" /> Published</> : 'Publish changes'}
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Panel title="Homepage hero">
          <div className="space-y-3">
            <div><label className="label">Headline</label><input className="input" defaultValue="BUILT FOR TODAY. READY FOR TOMORROW." /></div>
            <div><label className="label">Sub-headline</label><textarea rows={2} className="input resize-none" defaultValue="The world's first fit-all overhead mounting system for garage door tracks, openers, storage and lighting." /></div>
            <div><label className="label">Primary CTA</label><input className="input" defaultValue="Find your mount size → /measure" /></div>
            <div>
              <label className="label">Hero image</label>
              <div className="flex items-center gap-3 rounded-xl border border-line p-3">
                <img src="./img/hero-garage.jpg" alt="" className="h-14 w-20 rounded-lg object-cover" />
                <div className="flex-1 text-[11px] text-white/40">hero-garage.jpg · 1920×1280</div>
                <button className="btn-dark btn-sm">Replace</button>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-line p-3">
              <div>
                <div className="text-[12px] font-semibold">Announcement bar</div>
                <div className="text-[11px] text-white/35">Free UPS over $500 · ships in 24h</div>
              </div>
              <div className="flex h-5 w-9 items-center rounded-full bg-bolt px-0.5"><div className="ml-auto h-4 w-4 rounded-full bg-black" /></div>
            </div>
          </div>
        </Panel>

        <div className="space-y-4">
          <Panel title="Pages">
            {[
              ['Home', 'Published', '2h ago'],
              ['Shop', 'Published', '1d ago'],
              ['Our story', 'Published', '3d ago'],
              ['Portfolio', 'Draft', '5d ago'],
              ['Powder coating', 'Published', '2w ago'],
              ['Blog', 'Published', '2w ago'],
            ].map(([p, s, u]) => (
              <div key={p} className="flex items-center justify-between border-b border-line/60 py-2.5 last:border-0">
                <div>
                  <div className="text-[12px] font-semibold">{p}</div>
                  <div className="text-[10px] text-white/30">updated {u}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge tone={s === 'Published' ? 'Active' : 'Waiting'}>{s}</Badge>
                  <button className="text-[11px] text-white/40 hover:text-bolt">Edit</button>
                </div>
              </div>
            ))}
          </Panel>
          <Panel title="SEO health">
            <div className="space-y-2.5">
              {[['Meta titles', 96], ['Descriptions', 88], ['Alt text', 74], ['Redirects', 100]].map(([l, v]) => (
                <div key={l as string}>
                  <div className="mb-1 flex justify-between text-[11px]"><span className="text-white/50">{l}</span><span>{v}%</span></div>
                  <Progress pct={v as number} tone={(v as number) > 85 ? 'bg-emerald-400' : 'bg-amber-400'} />
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}

function Team() {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Team & roles</h1>
          <p className="text-[13px] text-mist">Least-privilege access — everyone sees only what they need.</p>
        </div>
        <button className="btn-primary btn-sm"><Plus className="h-3.5 w-3.5" /> Invite member</button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        <Panel title="Members" pad={false}>
          <Table head={['Member', 'Role', 'Access', '']}>
            {team.map((t) => (
              <tr key={t.email}>
                <td className="td">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[10px] font-bold">
                      {t.name.split(' ').map((w) => w[0]).join('')}
                    </span>
                    <div>
                      <div className="font-semibold">{t.name}</div>
                      <div className="text-[10px] text-white/30">{t.email}</div>
                    </div>
                  </div>
                </td>
                <td className="td">{t.role}</td>
                <td className="td text-white/50">{t.access}</td>
                <td className="td"><button className="text-[11px] text-white/40 hover:text-bolt">Edit</button></td>
              </tr>
            ))}
          </Table>
        </Panel>

        <div className="space-y-4">
          <Panel title="Permission sets">
            {[
              ['Owner', 'Everything including billing'],
              ['Ops manager', 'Orders, inventory, installs, dealers'],
              ['Dealer success', 'Dealers, quotes, leads'],
              ['Content editor', 'Website content only'],
              ['Installer', 'Installer app, assigned jobs only'],
            ].map(([r, d]) => (
              <div key={r} className="border-b border-line/60 py-2.5 last:border-0">
                <div className="text-[12px] font-semibold">{r}</div>
                <div className="text-[10px] text-white/35">{d}</div>
              </div>
            ))}
          </Panel>
          <Panel title="Audit trail">
            <div className="space-y-2 text-[11px]">
              {[
                ['GE', 'approved dealer AP-117', '12m ago'],
                ['MC', 'refunded order TM-10424', '2h ago'],
                ['DM', 'edited TMGTL-29 price', '5h ago'],
                ['System', 'Stripe payout settled', '8h ago'],
              ].map(([u, a, t]) => (
                <div key={a} className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[8px] font-bold">{u}</span>
                  <span className="flex-1 text-white/55">{a}</span>
                  <span className="text-white/25">{t}</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}
