import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  LayoutDashboard, ShoppingBag, FileText, Boxes, Wrench, BookOpen, UserCog, TrendingUp, Plus,
  Download, ArrowUpRight, Truck, AlertTriangle, Check, Clock, MapPin, Search,
} from 'lucide-react'
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { PortalShell, PortalLogin, Panel, Table } from '../components/Portal'
import { Badge, Stat, Progress } from '../components/ui'
import { dealerAccount, dealerOrders, dealerQuotes, dealerInventory, installs, products, money } from '../data'
import { useStore } from '../store'

const nav = [
  { key: 'overview', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
  { key: 'orders', label: 'Orders & POs', icon: <ShoppingBag className="h-4 w-4" />, badge: 2, group: 'Buy' },
  { key: 'quotes', label: 'Quotes & leads', icon: <FileText className="h-4 w-4" />, badge: 6, group: 'Buy' },
  { key: 'catalog', label: 'Price list', icon: <BookOpen className="h-4 w-4" />, group: 'Buy' },
  { key: 'inventory', label: 'My inventory', icon: <Boxes className="h-4 w-4" />, group: 'Run' },
  { key: 'installs', label: 'Install jobs', icon: <Wrench className="h-4 w-4" />, badge: 3, group: 'Run' },
  { key: 'account', label: 'Account & terms', icon: <UserCog className="h-4 w-4" />, group: 'Run' },
]

const dealerTrend = [
  { m: 'May', v: 12400 }, { m: 'Jun', v: 16800 }, { m: 'Jul', v: 19200 },
  { m: 'Aug', v: 15400 }, { m: 'Sep', v: 22100 }, { m: 'Oct', v: 18400 },
]

export default function Dealer() {
  const { session } = useStore()
  const [tab, setTab] = useState('overview')
  const [authed, setAuthed] = useState(session === 'dealer')

  if (!authed) {
    return (
      <PortalLogin
        kind="dealer"
        title="Everything your crew needs, priced for trade."
        sub="Trade pricing, live stock, quotes and install jobs — in one portal."
        email="orders@summitgaragedoors.com"
        image="./img/dealer-showroom.jpg"
        bullets={['Platinum pricing — 32% off list', 'Net 30 terms & credit line', 'Live stock and lead times', 'Leads routed by ZIP code']}
        onSuccess={() => setAuthed(true)}
        alternate={{ to: '/admin', label: 'Owner / admin login' }}
      />
    )
  }

  return (
    <PortalShell
      role="Dealer portal"
      roleLabel="Dealer"
      nav={nav}
      active={tab}
      onNav={setTab}
      org={dealerAccount.name}
      user={{ name: 'Rosa Diaz', sub: `${dealerAccount.name} · Platinum`, initials: 'RD' }}
      headerRight={
        <button className="hidden items-center gap-1.5 rounded-full bg-bolt px-3.5 py-1.5 text-[12px] font-bold text-black hover:bg-bolt2 sm:flex">
          <Plus className="h-3.5 w-3.5" /> New order
        </button>
      }
    >
      {tab === 'overview' && <Overview onGo={setTab} />}
      {tab === 'orders' && <Orders />}
      {tab === 'quotes' && <Quotes />}
      {tab === 'catalog' && <Catalog />}
      {tab === 'inventory' && <Inventory />}
      {tab === 'installs' && <Installs />}
      {tab === 'account' && <AccountTab />}
    </PortalShell>
  )
}

function Overview({ onGo }: { onGo: (t: string) => void }) {
  const pct = Math.round((dealerAccount.ytd / dealerAccount.goal) * 100)
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">{dealerAccount.name}</h1>
          <p className="text-[13px] text-mist">Platinum tier · 32% trade discount · Net 30 · rep {dealerAccount.rep}</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-dark btn-sm"><Download className="h-3.5 w-3.5" /> Statement</button>
          <button onClick={() => onGo('quotes')} className="btn-primary btn-sm"><Plus className="h-3.5 w-3.5" /> New quote</button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="YTD purchases" value={money(dealerAccount.ytd)} trend="+18.4%" sub="vs. last year" icon={<TrendingUp className="h-4 w-4" />} />
        <Stat label="Open quotes" value={dealerAccount.openQuotes} sub={`${money(32400)} in pipeline`} icon={<FileText className="h-4 w-4" />} />
        <Stat label="Install jobs" value={dealerAccount.pendingInstalls} sub="3 today, 8 this week" icon={<Wrench className="h-4 w-4" />} />
        <Stat label="Credit available" value={money(dealerAccount.creditLimit - dealerAccount.creditUsed)} sub={`of ${money(dealerAccount.creditLimit)} limit`} icon={<Boxes className="h-4 w-4" />} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <Panel title="Purchase trend" action={<span className="text-[11px] text-white/35">Last 6 months</span>}>
          <div className="h-[190px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dealerTrend} margin={{ top: 6, right: 4, left: -22, bottom: 0 }}>
                <defs>
                  <linearGradient id="dv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFC300" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#FFC300" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#22222A" vertical={false} />
                <XAxis dataKey="m" stroke="#55555F" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#55555F" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip
                  contentStyle={{ background: '#16161A', border: '1px solid #26262C', borderRadius: 10, fontSize: 12 }}
                  formatter={(v: any) => money(Number(v))}
                />
                <Area type="monotone" dataKey="v" stroke="#FFC300" strokeWidth={2} fill="url(#dv)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Annual goal">
          <div className="text-center">
            <div className="text-3xl font-extrabold tracking-tight">{pct}%</div>
            <div className="text-[11px] uppercase tracking-wider text-white/35">of {money(dealerAccount.goal)}</div>
          </div>
          <div className="mt-4"><Progress pct={pct} /></div>
          <div className="mt-2 flex justify-between text-[11px] text-white/40">
            <span>{money(dealerAccount.ytd)} earned</span>
            <span>{money(dealerAccount.goal - dealerAccount.ytd)} to go</span>
          </div>
          <div className="mt-5 space-y-2 border-t border-line pt-4 text-[12px]">
            <div className="flex justify-between"><span className="text-white/40">Tier</span><span className="font-semibold text-bolt">Platinum</span></div>
            <div className="flex justify-between"><span className="text-white/40">Next tier at</span><span className="font-semibold">$250k · 34%</span></div>
            <div className="flex justify-between"><span className="text-white/40">Reorder rate</span><span className="font-semibold">{dealerAccount.reorderRate}%</span></div>
          </div>
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        <Panel title="Open orders" pad={false} action={<button onClick={() => onGo('orders')} className="text-[11px] font-semibold text-bolt">View all</button>}>
          <Table head={['Order', 'Date', 'Items', 'Total', 'Status']}>
            {dealerOrders.slice(0, 3).map((o) => (
              <tr key={o.id} className="hover:bg-white/[0.02]">
                <td className="td font-mono text-bolt">{o.id}</td>
                <td className="td text-white/50">{o.date}</td>
                <td className="td">{o.items}</td>
                <td className="td font-semibold">{money(o.total)}</td>
                <td className="td"><Badge tone={o.status}>{o.status}</Badge></td>
              </tr>
            ))}
          </Table>
        </Panel>

        <Panel title="Stock alerts" action={<button onClick={() => onGo('inventory')} className="text-[11px] font-semibold text-bolt">Manage</button>}>
          <div className="space-y-2">
            {dealerInventory.filter((i) => i.status !== 'Healthy').map((i) => (
              <div key={i.sku} className="flex items-center gap-3 rounded-lg border border-line p-2.5">
                <AlertTriangle className={`h-4 w-4 ${i.status === 'Reorder' ? 'text-rose-400' : 'text-amber-400'}`} />
                <div className="min-w-0 flex-1">
                  <div className="font-mono text-[11px] font-bold">{i.sku}</div>
                  <div className="text-[10px] text-white/40">{i.onHand} on hand · reorder at {i.reorderAt}</div>
                </div>
                <button className="rounded-md border border-line px-2 py-1 text-[10px] font-bold text-white/70 hover:border-bolt/50 hover:text-bolt">Reorder</button>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-lg bg-white/[0.03] p-3 text-[11px] text-white/45">
            Auto-replenish is on for 4 SKUs. Lead time 3–5 days from Simi Valley.
          </div>
        </Panel>
      </div>
    </div>
  )
}

function Orders() {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Orders & purchase orders</h1>
          <p className="text-[13px] text-mist">Trade pricing applied automatically. Net 30 invoicing.</p>
        </div>
        <button className="btn-primary btn-sm"><Plus className="h-3.5 w-3.5" /> Create order</button>
      </div>

      <Panel title="Recent orders" pad={false}>
        <Table head={['Order', 'Your PO', 'Date', 'Items', 'Total', 'Invoice', 'Status', '']}>
          {dealerOrders.map((o) => (
            <tr key={o.id} className="hover:bg-white/[0.02]">
              <td className="td font-mono text-bolt">{o.id}</td>
              <td className="td font-mono text-white/50">{o.po}</td>
              <td className="td text-white/50">{o.date}</td>
              <td className="td">{o.items}</td>
              <td className="td font-semibold">{money(o.total)}</td>
              <td className="td"><span className={o.invoice === 'Paid' ? 'text-emerald-400' : 'text-white/60'}>{o.invoice}</span></td>
              <td className="td"><Badge tone={o.status}>{o.status}</Badge></td>
              <td className="td"><button className="text-[11px] font-semibold text-white/50 hover:text-bolt">Reorder</button></td>
            </tr>
          ))}
        </Table>
      </Panel>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { t: 'Bulk order pad', d: 'Paste SKUs and quantities, or upload a CSV.', a: 'Open pad' },
          { t: 'Saved lists', d: 'Your standard truck stock, one click to reorder.', a: 'View 3 lists' },
          { t: 'Co-branded catalogue', d: 'PDF with your logo and pricing for homeowners.', a: 'Generate' },
        ].map((c) => (
          <div key={c.t} className="card p-5">
            <div className="text-[13px] font-bold">{c.t}</div>
            <p className="mt-1 text-[12px] text-white/45">{c.d}</p>
            <button className="mt-3 text-[12px] font-semibold text-bolt">{c.a} →</button>
          </div>
        ))}
      </div>
    </div>
  )
}

function Quotes() {
  const stages = ['New lead', 'Site survey', 'Quote sent', 'Won', 'Lost']
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Quotes & leads</h1>
        <p className="text-[13px] text-mist">Homeowner leads from the Thunder Mounts store locator, plus your own pipeline.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        <Stat label="Pipeline value" value={money(32400)} sub="6 open" />
        <Stat label="Win rate" value="61%" trend="+7 pts" sub="last 90 days" />
        <Stat label="Avg. quote" value={money(4380)} />
        <Stat label="Response time" value="42 min" sub="target 1 hr" />
      </div>

      <div className="grid gap-3 lg:grid-cols-5">
        {stages.map((s) => {
          const items = dealerQuotes.filter((q) => q.stage === s)
          return (
            <div key={s} className="rounded-xl border border-line bg-panel/50 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-white/50">{s}</span>
                <span className="text-[10px] text-white/30">{items.length}</span>
              </div>
              <div className="space-y-2">
                {items.map((q) => (
                  <div key={q.id} className="rounded-lg border border-line bg-panel p-2.5">
                    <div className="text-[12px] font-semibold leading-tight">{q.customer}</div>
                    <div className="mt-0.5 text-[10px] text-white/35">{q.address}</div>
                    <div className="mt-1.5 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-bolt">{money(q.value)}</span>
                      <span className="text-[9px] text-white/25">{q.updated}</span>
                    </div>
                  </div>
                ))}
                {items.length === 0 && <div className="rounded-lg border border-dashed border-line py-4 text-center text-[10px] text-white/20">Empty</div>}
              </div>
            </div>
          )
        })}
      </div>

      <Panel title="Lead inbox" pad={false} action={<span className="text-[11px] text-white/35">Auto-routed by ZIP</span>}>
        <Table head={['Quote', 'Customer', 'Source', 'Owner', 'Value', 'Stage']}>
          {dealerQuotes.map((q) => (
            <tr key={q.id} className="hover:bg-white/[0.02]">
              <td className="td font-mono text-bolt">{q.id}</td>
              <td className="td">
                <div className="font-semibold">{q.customer}</div>
                <div className="text-[11px] text-white/35">{q.address}</div>
              </td>
              <td className="td text-white/50">{q.source}</td>
              <td className="td text-white/50">{q.owner}</td>
              <td className="td font-semibold">{money(q.value)}</td>
              <td className="td"><Badge tone={q.stage}>{q.stage}</Badge></td>
            </tr>
          ))}
        </Table>
      </Panel>
    </div>
  )
}

function Catalog() {
  const [q, setQ] = useState('')
  const list = products.filter((p) => (p.name + p.sku).toLowerCase().includes(q.toLowerCase()))
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Trade price list</h1>
          <p className="text-[13px] text-mist">Platinum pricing shown. Retail price is what your customer sees.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/30" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search SKU" className="input py-2 pl-8 text-[12px]" />
        </div>
      </div>

      <Panel pad={false}>
        <Table head={['SKU', 'Product', 'List', 'Your price', 'Margin', 'Stock', '']}>
          {list.map((p) => {
            const trade = Math.round(p.price * 0.68)
            const margin = Math.round(((p.price - trade) / p.price) * 100)
            return (
              <tr key={p.id} className="hover:bg-white/[0.02]">
                <td className="td font-mono text-[11px] text-bolt">{p.sku}</td>
                <td className="td">
                  <div className="flex items-center gap-2">
                    <img src={p.image} alt="" className="h-8 w-8 rounded object-cover" />
                    <span className="text-[12px]">{p.name}</span>
                  </div>
                </td>
                <td className="td text-white/40">{money(p.price)}</td>
                <td className="td font-bold">{money(trade)}</td>
                <td className="td text-emerald-400">{margin}%</td>
                <td className="td">
                  <span className={p.stock > 20 ? 'text-white/60' : 'text-amber-400'}>{p.stock}</span>
                </td>
                <td className="td"><button className="btn-dark btn-sm py-1">Add</button></td>
              </tr>
            )
          })}
        </Table>
      </Panel>
    </div>
  )
}

function Inventory() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">My inventory</h1>
        <p className="text-[13px] text-mist">Truck stock synced with the portal — jobs draw down automatically when closed.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-4">
        <Stat label="SKUs stocked" value="6" />
        <Stat label="Units on hand" value={dealerInventory.reduce((s, i) => s + i.onHand, 0)} />
        <Stat label="Below reorder" value="2" sub="needs attention" />
        <Stat label="Stock value" value={money(8420)} />
      </div>
      <Panel title="Stock levels" pad={false}>
        <Table head={['SKU', 'Product', 'On hand', 'Committed', 'Available', 'Reorder at', 'Status', '']}>
          {dealerInventory.map((i) => (
            <tr key={i.sku}>
              <td className="td font-mono text-[11px] text-bolt">{i.sku}</td>
              <td className="td">{i.name}</td>
              <td className="td font-semibold">{i.onHand}</td>
              <td className="td text-white/50">{i.committed}</td>
              <td className="td">{i.onHand - i.committed}</td>
              <td className="td text-white/40">{i.reorderAt}</td>
              <td className="td"><Badge tone={i.status}>{i.status}</Badge></td>
              <td className="td">
                <button className="rounded-md border border-line px-2 py-1 text-[10px] font-bold text-white/70 hover:border-bolt/50 hover:text-bolt">Reorder</button>
              </td>
            </tr>
          ))}
        </Table>
      </Panel>
    </div>
  )
}

function Installs() {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Install jobs</h1>
          <p className="text-[13px] text-mist">Dispatch board for today and the week ahead.</p>
        </div>
        <button className="btn-primary btn-sm"><Plus className="h-3.5 w-3.5" /> Schedule job</button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <Panel title="Schedule" pad={false}>
          <Table head={['Job', 'Customer', 'Date', 'Window', 'Tech', 'Value', 'Status']}>
            {installs.map((j) => (
              <tr key={j.id} className="hover:bg-white/[0.02]">
                <td className="td font-mono text-bolt">{j.id}</td>
                <td className="td">
                  <div className="font-semibold">{j.customer}</div>
                  <div className="text-[11px] text-white/35">{j.address}</div>
                </td>
                <td className="td">{j.date}</td>
                <td className="td text-white/50">{j.window}</td>
                <td className="td">{j.tech}</td>
                <td className="td font-semibold">{money(j.value)}</td>
                <td className="td"><Badge tone={j.status}>{j.status}</Badge></td>
              </tr>
            ))}
          </Table>
        </Panel>

        <div className="space-y-4">
          <Panel title="Crew today">
            {[
              { n: 'Rosa Diaz', j: 2, st: 'On site' },
              { n: 'Tom Boone', j: 2, st: 'En route' },
              { n: 'Crew B', j: 1, st: 'Complete' },
            ].map((c) => (
              <div key={c.n} className="flex items-center justify-between border-b border-line/60 py-2.5 last:border-0">
                <div>
                  <div className="text-[12px] font-semibold">{c.n}</div>
                  <div className="text-[10px] text-white/35">{c.j} jobs today</div>
                </div>
                <Badge tone={c.st === 'Complete' ? 'Complete' : 'In progress'}>{c.st}</Badge>
              </div>
            ))}
          </Panel>
          <Panel title="Week load">
            <div className="space-y-2.5">
              {[['Mon', 4], ['Tue', 6], ['Wed', 3], ['Thu', 5], ['Fri', 7]].map(([d, v]) => (
                <div key={d as string}>
                  <div className="mb-1 flex justify-between text-[11px]"><span className="text-white/50">{d}</span><span className="text-white/70">{v} jobs</span></div>
                  <Progress pct={(v as number) * 12} tone={(v as number) > 5 ? 'bg-amber-400' : 'bg-bolt'} />
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}

function AccountTab() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Account & terms</h1>
        <p className="text-[13px] text-mist">Tier, credit, billing and users for {dealerAccount.name}.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Trade terms">
          <div className="space-y-3 text-[12px]">
            {[
              ['Dealer ID', dealerAccount.dealerId],
              ['Tier', 'Platinum · 32% off list'],
              ['Payment terms', 'Net 30'],
              ['Credit limit', money(dealerAccount.creditLimit)],
              ['Credit used', money(dealerAccount.creditUsed)],
              ['Account rep', dealerAccount.rep],
              ['Address', dealerAccount.address],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-line/60 pb-2 last:border-0">
                <span className="text-white/40">{k}</span>
                <span className="text-right font-semibold">{v}</span>
              </div>
            ))}
          </div>
        </Panel>

        <div className="space-y-4">
          <Panel title="Users">
            {[
              ['Rosa Diaz', 'Owner · full access'],
              ['Tom Boone', 'Installer · jobs only'],
              ['Accounts', 'Billing · invoices only'],
            ].map(([n, r]) => (
              <div key={n} className="flex items-center justify-between border-b border-line/60 py-2.5 last:border-0">
                <div>
                  <div className="text-[12px] font-semibold">{n}</div>
                  <div className="text-[10px] text-white/35">{r}</div>
                </div>
                <button className="text-[11px] text-white/40 hover:text-bolt">Edit</button>
              </div>
            ))}
            <button className="btn-dark btn-sm mt-3 w-full"><Plus className="h-3.5 w-3.5" /> Invite user</button>
          </Panel>
          <Panel title="Invoices">
            <div className="space-y-2">
              {[['INV-2291', 'Oct 23', 7420, 'Open'], ['INV-2287', 'Oct 21', 5240, 'Open'], ['INV-2280', 'Oct 16', 3110, 'Paid']].map(([n, d, v, s]) => (
                <div key={n as string} className="flex items-center justify-between rounded-lg border border-line px-3 py-2 text-[12px]">
                  <span className="font-mono text-white/70">{n}</span>
                  <span className="text-white/35">{d}</span>
                  <span className="font-semibold">{money(v as number)}</span>
                  <Badge tone={s === 'Paid' ? 'Paid' : 'Waiting'}>{s}</Badge>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}
