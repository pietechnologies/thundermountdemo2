import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { statusColor } from '../data'

export function Badge({ children, tone = '' }: { children: React.ReactNode; tone?: string }) {
  const cls = statusColor[tone] || 'bg-white/10 text-white/70'
  return <span className={`badge ${cls}`}>{children}</span>
}

export function Stat({
  label,
  value,
  sub,
  icon,
  trend,
}: {
  label: string
  value: React.ReactNode
  sub?: string
  icon?: React.ReactNode
  trend?: string
}) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">{label}</div>
          <div className="mt-2 text-2xl font-extrabold tracking-tight sm:text-[26px]">{value}</div>
        </div>
        {icon && <div className="rounded-xl border border-line bg-white/[0.03] p-2 text-bolt">{icon}</div>}
      </div>
      <div className="mt-2 flex items-center gap-2 text-xs">
        {trend && <span className="font-semibold text-emerald-400">{trend}</span>}
        {sub && <span className="text-white/40">{sub}</span>}
      </div>
    </div>
  )
}

export function Section({
  eyebrow,
  title,
  sub,
  children,
  className = '',
  id,
}: {
  eyebrow?: string
  title?: React.ReactNode
  sub?: string
  children?: React.ReactNode
  className?: string
  id?: string
}) {
  return (
    <section id={id} className={`wrap py-16 sm:py-24 ${className}`}>
      {(eyebrow || title || sub) && (
        <div className="mb-10 max-w-3xl">
          {eyebrow && <div className="eyebrow mb-3">{eyebrow}</div>}
          {title && <h2 className="h2">{title}</h2>}
          {sub && <p className="lead mt-4">{sub}</p>}
        </div>
      )}
      {children}
    </section>
  )
}

export function Progress({ pct, tone = 'bg-bolt' }: { pct: number; tone?: string }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
      <div className={`h-full rounded-full ${tone}`} style={{ width: `${Math.min(100, Math.max(0, pct))}%` }} />
    </div>
  )
}

export function DemoNote({ children, title = 'Demo data' }: { children?: React.ReactNode; title?: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-bolt/25 bg-bolt/[0.06] px-4 py-3 text-[13px] text-bolt/90">
      <span className="mt-0.5 text-base leading-none">ⓘ</span>
      <p>
        <b className="font-semibold">{title}.</b> {children}
      </p>
    </div>
  )
}

export function PageHeader({
  eyebrow,
  title,
  sub,
  actions,
}: {
  eyebrow?: string
  title: string
  sub?: string
  actions?: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <div className="eyebrow mb-2">{eyebrow}</div>}
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-[32px]">{title}</h1>
        {sub && <p className="mt-1.5 text-sm text-mist">{sub}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  )
}

export function CheckRow({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-sm text-white/75">
      <Check className="mt-0.5 h-4 w-4 shrink-0 text-bolt" />
      <span>{children}</span>
    </li>
  )
}

export function ArrowLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="group inline-flex items-center gap-1.5 text-sm font-semibold text-bolt">
      {children}
      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
    </Link>
  )
}

export function Logo({ size = 26, showText = true }: { size?: number; showText?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
        <rect width="100" height="100" rx="22" fill="#0B0B0E" stroke="#2A2A31" />
        <path d="M58 10 24 57h19l-3 33 34-47H54z" fill="#FFC300" />
      </svg>
      {showText && (
        <span className="leading-none">
          <span className="block text-[15px] font-extrabold tracking-[-0.02em] text-white">THUNDER MOUNTS</span>
          <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.28em] text-white/40">Garage Systems</span>
        </span>
      )}
    </span>
  )
}

export function Tabs({
  tabs,
  active,
  onChange,
}: {
  tabs: readonly string[]
  active: string
  onChange: (t: string) => void
}) {
  return (
    <div className="no-bar flex gap-1 overflow-x-auto rounded-full border border-line bg-panel p-1">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`shrink-0 rounded-full px-4 py-2 text-[13px] font-semibold transition ${
            active === t ? 'bg-bolt text-black' : 'text-white/60 hover:text-white'
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  )
}

export function Empty({ icon, title, sub, action }: { icon?: React.ReactNode; title: string; sub?: string; action?: React.ReactNode }) {
  return (
    <div className="card flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      {icon && <div className="rounded-2xl border border-line bg-white/[0.03] p-4 text-white/50">{icon}</div>}
      <div className="text-lg font-bold">{title}</div>
      {sub && <p className="max-w-md text-sm text-mist">{sub}</p>}
      {action}
    </div>
  )
}
