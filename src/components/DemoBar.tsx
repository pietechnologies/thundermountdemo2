import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, Presentation, BookOpen, Zap, Menu, X } from 'lucide-react'

const surfaces = [
  { to: '/', label: 'Storefront', hint: 'Public website + shop' },
  { to: '/account', label: 'Customer', hint: 'Account & garage profile' },
  { to: '/dealer', label: 'Dealer portal', hint: 'Tiered pricing & quotes' },
  { to: '/admin', label: 'Admin console', hint: 'Owner operations' },
  { to: '/field', label: 'Installer app', hint: 'Tablet field workflow' },
  { to: '/today', label: 'Current site', hint: 'Before / after audit' },
]

export default function DemoBar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const active = surfaces.find((s) => (s.to === '/' ? pathname === '/' : pathname.startsWith(s.to)))

  return (
    <div className="no-print sticky top-0 z-50">
      <div className="border-b border-line bg-black/85 backdrop-blur-xl">
        <div className="mx-auto flex h-12 w-full max-w-[1400px] items-center gap-3 px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-bolt">
              <Zap className="h-4 w-4" fill="currentColor" />
            </span>
            <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-white">Demo</span>
            <span className="hidden text-[11px] font-medium text-white/35 sm:inline">Thunder Mounts platform</span>
          </Link>

          <span className="mx-1 hidden h-4 w-px bg-line sm:block" />

          {/* desktop surface picker */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setOpen((o) => !o)}
              className="flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3 py-1.5 text-[12px] font-semibold text-white/80 transition hover:border-white/25"
            >
              {active?.label ?? 'Choose a surface'}
              <ChevronDown className={`h-3.5 w-3.5 transition ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
                <div className="absolute left-0 top-11 z-20 w-72 overflow-hidden rounded-2xl border border-line bg-panel shadow-2xl">
                  {surfaces.map((s) => (
                    <Link
                      key={s.to}
                      to={s.to}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 transition hover:bg-white/5 ${
                        active?.to === s.to ? 'bg-white/[0.04]' : ''
                      }`}
                    >
                      <span>
                        <span className="block text-[13px] font-semibold">{s.label}</span>
                        <span className="block text-[11px] text-white/40">{s.hint}</span>
                      </span>
                      {active?.to === s.to && <span className="h-1.5 w-1.5 rounded-full bg-bolt" />}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="ml-auto flex items-center gap-1">
            <Link to="/pitch" className="btn btn-sm border border-bolt/40 text-bolt hover:bg-bolt/10">
              <Presentation className="h-3.5 w-3.5" /> Proposal deck
            </Link>
            <Link to="/docs" className="btn btn-sm hidden text-white/60 hover:text-white md:inline-flex">
              <BookOpen className="h-3.5 w-3.5" /> Docs
            </Link>
            <button className="ml-1 rounded-full p-2 text-white/60 sm:hidden" onClick={() => setOpen((o) => !o)}>
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-line bg-panel px-4 py-2 sm:hidden">
            <div className="grid grid-cols-2 gap-1">
              {surfaces.map((s) => (
                <Link
                  key={s.to}
                  to={s.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-[13px] font-semibold text-white/75 hover:bg-white/5"
                >
                  {s.label}
                </Link>
              ))}
              <Link to="/docs" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-[13px] font-semibold text-white/75">
                Docs
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
