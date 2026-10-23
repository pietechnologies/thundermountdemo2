import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bell, Search, ChevronDown, ArrowLeft, Lock, ArrowRight, Check, ShieldCheck } from 'lucide-react'
import { Logo } from './ui'
import { useStore } from '../store'

export type NavItem = { key: string; label: string; icon: React.ReactNode; badge?: string | number; group?: string }

export function PortalShell({
  role,
  roleLabel,
  nav,
  active,
  onNav,
  user,
  org,
  children,
  accent = 'bolt',
  headerRight,
}: {
  role: string
  roleLabel: string
  nav: NavItem[]
  active: string
  onNav: (k: string) => void
  user: { name: string; sub: string; initials: string }
  org?: string
  children: React.ReactNode
  accent?: string
  headerRight?: React.ReactNode
}) {
  const { signOut, notify } = useStore()
  const [menu, setMenu] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const groups = Array.from(new Set(nav.map((n) => n.group ?? '')))

  const Side = (
    <>
      <div className="flex h-16 items-center border-b border-line px-5">
        <Link to="/"><Logo size={24} /></Link>
      </div>
      <div className="px-3 py-3">
        <div className="flex items-center gap-2 rounded-lg border border-line bg-white/[0.03] px-3 py-2">
          <span className={`flex h-6 w-6 items-center justify-center rounded-md ${accent === 'bolt' ? 'bg-bolt/15 text-bolt' : 'bg-white/10 text-white'} text-[10px] font-extrabold`}>
            {roleLabel.slice(0, 2).toUpperCase()}
          </span>
          <div className="min-w-0">
            <div className="truncate text-[11px] font-bold uppercase tracking-wider text-white/70">{roleLabel}</div>
            {org && <div className="truncate text-[10px] text-white/35">{org}</div>}
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-4 overflow-y-auto px-3 pb-4">
        {groups.map((g) => (
          <div key={g}>
            {g && <div className="mb-1 px-3 text-[9px] font-bold uppercase tracking-[0.18em] text-white/25">{g}</div>}
            <div className="space-y-0.5">
              {nav.filter((n) => (n.group ?? '') === g).map((n) => (
                <button
                  key={n.key}
                  onClick={() => {
                    onNav(n.key)
                    setMobileOpen(false)
                  }}
                  className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-[13px] font-medium transition ${
                    active === n.key ? 'bg-white/[0.07] text-white' : 'text-white/50 hover:bg-white/[0.03] hover:text-white/85'
                  }`}
                >
                  <span className={active === n.key ? 'text-bolt' : 'text-white/35 group-hover:text-white/60'}>{n.icon}</span>
                  <span className="flex-1 truncate">{n.label}</span>
                  {n.badge !== undefined && (
                    <span className="rounded-full bg-bolt/15 px-1.5 py-0.5 text-[10px] font-bold text-bolt">{n.badge}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-line p-3">
        <div className="mb-2 flex items-center gap-2 rounded-lg px-2 py-1.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-[11px] font-bold">{user.initials}</div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[12px] font-semibold">{user.name}</div>
            <div className="truncate text-[10px] text-white/35">{user.sub}</div>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-white/30" />
        </div>
        <button
          onClick={() => {
            signOut()
            window.location.hash = '#/'
          }}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-[12px] font-medium text-white/45 hover:bg-white/[0.03] hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Exit demo session
        </button>
      </div>
    </>
  )

  return (
    <div className="flex min-h-screen bg-ink">
      <aside className="no-print sticky top-12 hidden h-[calc(100vh-3rem)] w-[232px] shrink-0 flex-col border-r border-line bg-panel/60 lg:flex">{Side}</aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/70" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 flex h-full w-[260px] flex-col border-r border-line bg-panel">{Side}</aside>
        </div>
      )}

      <div className="min-w-0 flex-1">
        <header className="no-print sticky top-12 z-30 flex h-16 items-center gap-3 border-b border-line bg-ink/90 px-4 backdrop-blur-xl sm:px-6">
          <button className="rounded-lg p-2 text-white/60 lg:hidden" onClick={() => setMobileOpen(true)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
          </button>
          <div className="min-w-0">
            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/30">{role}</div>
            <div className="truncate text-[15px] font-bold">{nav.find((n) => n.key === active)?.label ?? 'Overview'}</div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-line bg-panel px-3 py-1.5 md:flex">
              <Search className="h-3.5 w-3.5 text-white/30" />
              <input placeholder="Search…" className="w-32 bg-transparent text-[12px] placeholder:text-white/25 focus:outline-none" />
            </div>
            {headerRight}
            <button onClick={() => notify('3 new notifications · demo')} className="relative rounded-full border border-line p-2 text-white/50 hover:text-white">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-bolt" />
            </button>
            <button onClick={() => setMenu((m) => !m)} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-[11px] font-bold" onBlur={() => setTimeout(() => setMenu(false), 150)}>
              {user.initials}
            </button>
            {menu && (
              <div className="absolute right-4 top-14 w-56 overflow-hidden rounded-xl border border-line bg-panel shadow-2xl">
                <div className="border-b border-line px-4 py-3">
                  <div className="text-[12px] font-semibold">{user.name}</div>
                  <div className="text-[10px] text-white/35">{user.sub}</div>
                </div>
                <Link to="/" className="block px-4 py-2.5 text-[12px] text-white/70 hover:bg-white/5">Back to storefront</Link>
                <Link to="/pitch" className="block px-4 py-2.5 text-[12px] text-white/70 hover:bg-white/5">Proposal deck</Link>
                <button
                  onClick={() => {
                    signOut()
                    window.location.hash = '#/'
                  }}
                  className="block w-full px-4 py-2.5 text-left text-[12px] text-white/70 hover:bg-white/5"
                >
                  Exit demo session
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  )
}

export function PortalLogin({
  kind,
  title,
  sub,
  email,
  image,
  bullets,
  onSuccess,
  alternate,
}: {
  kind: string
  title: string
  sub: string
  email: string
  image: string
  bullets: string[]
  onSuccess: () => void
  alternate?: { to: string; label: string }
}) {
  const { signIn } = useStore()
  const [pw, setPw] = useState('demo1234')
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    window.setTimeout(() => {
      signIn(kind as any)
      onSuccess()
      setLoading(false)
    }, 550)
  }

  return (
    <div className="grid min-h-[calc(100vh-48px)] lg:grid-cols-2">
      <div className="relative hidden overflow-hidden lg:block">
        <img src={image} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
        <div className="absolute inset-0 flex flex-col justify-between p-10">
          <Logo />
          <div>
            <div className="eyebrow mb-3">{kind === 'dealer' ? 'Trade access' : kind === 'admin' ? 'Operations' : 'Your garage'}</div>
            <h2 className="max-w-sm text-3xl font-extrabold leading-tight tracking-tight">{title}</h2>
            <ul className="mt-6 space-y-2.5">
              {bullets.map((b) => (
                <li key={b} className="flex items-center gap-2.5 text-[13px] text-white/65">
                  <Check className="h-4 w-4 text-bolt" /> {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-white/35">
            <ShieldCheck className="h-3.5 w-3.5" /> Demo environment · sample data only
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center px-5 py-14">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden"><Logo /></div>
          <div className="eyebrow mb-2">Sign in</div>
          <h1 className="text-2xl font-extrabold tracking-tight">{kind === 'dealer' ? 'Dealer portal' : kind === 'admin' ? 'Owner console' : 'Customer account'}</h1>
          <p className="mt-1.5 text-[13px] text-mist">{sub}</p>

          <form onSubmit={submit} className="mt-7 space-y-3">
            <div>
              <label className="label">Email</label>
              <input className="input" defaultValue={email} />
            </div>
            <div>
              <label className="label">Password</label>
              <input className="input font-mono" type="password" value={pw} onChange={(e) => setPw(e.target.value)} />
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <label className="flex items-center gap-2 text-white/45">
                <input type="checkbox" defaultChecked className="h-3.5 w-3.5 accent-bolt" /> Keep me signed in
              </label>
              <button type="button" className="text-white/45 hover:text-bolt">Forgot password?</button>
            </div>
            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? 'Signing in…' : <>Sign in <ArrowRight className="h-4 w-4" /></>}
            </button>
          </form>

          <button
            onClick={() => {
              signIn(kind as any)
              onSuccess()
            }}
            className="btn-dark mt-2 w-full"
            type="button"
          >
            Continue as demo user
          </button>

          <div className="mt-5 flex items-center gap-3 text-[10px] uppercase tracking-wider text-white/25">
            <span className="h-px flex-1 bg-line" /> demo credentials prefilled <span className="h-px flex-1 bg-line" />
          </div>
          <div className="mt-4 rounded-xl border border-line bg-panel p-3.5">
            <div className="flex items-center gap-2 text-[11px] font-semibold text-white/60"><Lock className="h-3 w-3 text-bolt" /> {email}</div>
            <div className="mt-1 font-mono text-[11px] text-white/30">password · demo1234</div>
          </div>

          <div className="mt-6 flex flex-col gap-1.5 text-center text-[12px]">
            {alternate && (
              <Link to={alternate.to} className="text-white/45 hover:text-white">
                {alternate.label} →
              </Link>
            )}
            <button onClick={() => nav('/')} className="text-white/30 hover:text-white">← Back to the storefront</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Panel({ title, action, children, className = '', pad = true }: { title?: string; action?: React.ReactNode; children: React.ReactNode; className?: string; pad?: boolean }) {
  return (
    <section className={`card overflow-hidden ${className}`}>
      {title && (
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
          <h3 className="text-[12px] font-bold uppercase tracking-[0.14em] text-white/50">{title}</h3>
          {action}
        </div>
      )}
      <div className={pad ? 'p-5' : ''}>{children}</div>
    </section>
  )
}

export function Table({ head, children }: { head: string[]; children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px]">
        <thead className="bg-white/[0.02]">
          <tr>{head.map((h) => <th key={h} className="th">{h}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-line/70">{children}</tbody>
      </table>
    </div>
  )
}
