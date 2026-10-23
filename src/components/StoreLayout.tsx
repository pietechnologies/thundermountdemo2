import { useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { ShoppingCart, Menu, X, User, Store, Search, Truck, ShieldCheck, Phone, Mail, MapPin, Minus, Plus, Trash2, ArrowRight } from 'lucide-react'
import { useStore } from '../store'
import { products, money } from '../data'
import { Logo } from './ui'

const nav = [
  { to: '/shop', label: 'Shop' },
  { to: '/measure', label: 'Find your size' },
  { to: '/installers', label: 'Find an installer' },
  { to: '/our-story', label: 'The system' },
]

export function StoreNav() {
  const { count, setDrawer, session } = useStore()
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const nav2 = useNavigate()
  const { pathname } = useLocation()

  return (
    <header className="no-print sticky top-12 z-40 border-b border-line/80 bg-ink/90 backdrop-blur-xl">
      <div className="wrap flex h-16 items-center gap-4">
        <Link to="/" aria-label="Thunder Mounts home">
          <Logo />
        </Link>

        <nav className="ml-4 hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `rounded-full px-3.5 py-2 text-[13px] font-semibold transition ${
                  isActive ? 'bg-white/[0.06] text-white' : 'text-white/60 hover:text-white'
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              nav2(`/shop?q=${encodeURIComponent(q)}`)
            }}
            className="hidden items-center gap-2 rounded-full border border-line bg-panel px-3 py-1.5 focus-within:border-white/25 md:flex"
          >
            <Search className="h-3.5 w-3.5 text-white/40" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search TMGTX-19…"
              className="w-36 bg-transparent text-[12px] text-white placeholder:text-white/30 focus:outline-none"
            />
          </form>

          <Link to="/dealer" className="hidden rounded-full px-3 py-2 text-[13px] font-semibold text-white/60 hover:text-white sm:block">
            Dealer login
          </Link>

          <Link
            to="/account"
            className="flex items-center gap-1.5 rounded-full px-3 py-2 text-[13px] font-semibold text-white/70 hover:text-white"
          >
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">{session === 'customer' ? 'My account' : 'Sign in'}</span>
          </Link>

          <button
            onClick={() => setDrawer(true)}
            className="relative flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[13px] font-bold text-black transition hover:bg-white/90"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span className="ml-0.5 rounded-full bg-black px-1.5 text-[11px] font-bold leading-5 text-bolt">{count}</span>
            )}
          </button>

          <button className="rounded-full p-2 text-white/70 lg:hidden" onClick={() => setOpen((o) => !o)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-panel px-5 py-3 lg:hidden">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-white/80">
              {n.label}
            </Link>
          ))}
          <Link to="/dealer" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-white/80">
            Dealer login
          </Link>
        </div>
      )}
      {pathname === '/' && <div className="h-px w-full bg-gradient-to-r from-transparent via-bolt/40 to-transparent" />}
    </header>
  )
}

export function CartDrawer() {
  const { drawer, setDrawer, cart, setQty, remove } = useStore()
  const lines = cart.map((l) => ({ ...l, product: products.find((p) => p.id === l.id)! })).filter((l) => l.product)
  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0)

  if (!drawer) return null
  return (
    <div className="no-print fixed inset-0 z-[70]">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setDrawer(false)} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-line bg-panel">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <div className="text-sm font-bold uppercase tracking-[0.14em]">Your cart</div>
          <button onClick={() => setDrawer(false)} className="rounded-full p-2 hover:bg-white/5">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <ShoppingCart className="h-8 w-8 text-white/25" />
              <p className="text-sm text-mist">Your cart is empty.</p>
              <Link to="/shop" onClick={() => setDrawer(false)} className="btn-primary btn-sm">
                Shop mounts
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {lines.map((l) => (
                <div key={l.id} className="flex gap-3">
                  <img src={l.product.image} alt="" className="h-20 w-20 rounded-xl border border-line object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between gap-2">
                      <div className="text-[13px] font-semibold leading-tight">{l.product.name}</div>
                      <button onClick={() => remove(l.id)} className="text-white/30 hover:text-rose-400">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-white/35">{l.product.sku}</div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-line">
                        <button onClick={() => setQty(l.id, l.qty - 1)} className="p-1.5 hover:text-bolt">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-semibold">{l.qty}</span>
                        <button onClick={() => setQty(l.id, l.qty + 1)} className="p-1.5 hover:text-bolt">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="text-sm font-bold">{money(l.product.price * l.qty)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-line p-5">
            <div className="mb-1 flex justify-between text-sm">
              <span className="text-mist">Subtotal</span>
              <span className="font-bold">{money(subtotal)}</span>
            </div>
            <div className="mb-4 flex justify-between text-xs text-white/40">
              <span>Shipping</span>
              <span>{subtotal > 500 ? 'Free (UPS Ground)' : 'Calculated at checkout'}</span>
            </div>
            <Link to="/checkout" onClick={() => setDrawer(false)} className="btn-primary w-full">
              Checkout <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-3 text-center text-[11px] text-white/35">Demo checkout — no payment is taken.</p>
          </div>
        )}
      </aside>
    </div>
  )
}

export function StoreFooter() {
  return (
    <footer className="no-print border-t border-line bg-panel">
      <div className="wrap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-white/45">
            The world's first fit-all overhead garage door and opener mounting system. Value · Safety · Symmetry.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="chip">
              <ShieldCheck className="h-3 w-3" /> Made in USA
            </span>
            <span className="chip">
              <Truck className="h-3 w-3" /> Ships in 24h
            </span>
          </div>
        </div>
        <div>
          <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">Shop</div>
          <ul className="space-y-2 text-[13px] text-white/60">
            <li><Link className="hover:text-bolt" to="/shop">All products</Link></li>
            <li><Link className="hover:text-bolt" to="/shop?c=Track%20Mounts">Track mounts</Link></li>
            <li><Link className="hover:text-bolt" to="/shop?c=Opener%20Mounts">Opener mounts</Link></li>
            <li><Link className="hover:text-bolt" to="/shop?c=Storage">Storage & lighting</Link></li>
          </ul>
        </div>
        <div>
          <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">Trade</div>
          <ul className="space-y-2 text-[13px] text-white/60">
            <li><Link className="hover:text-bolt" to="/dealer">Dealer portal</Link></li>
            <li><Link className="hover:text-bolt" to="/dealer">Become a dealer</Link></li>
            <li><Link className="hover:text-bolt" to="/installers">Installer locator</Link></li>
            <li><Link className="hover:text-bolt" to="/admin">Owner console</Link></li>
          </ul>
        </div>
        <div>
          <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">Company</div>
          <ul className="space-y-2 text-[13px] text-white/60">
            <li className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> 805-338-6680</li>
            <li className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" /> hello@thundermounts.com</li>
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-3.5 w-3.5" /> 1712 Sinaloa Rd<br />Simi Valley, CA 93065</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line py-5">
        <div className="wrap flex flex-col items-center justify-between gap-2 text-[11px] text-white/30 sm:flex-row">
          <span>© 2026 Thunder Mounts Garage Systems LLC. Demo build — not the live site.</span>
          <span className="flex items-center gap-3">
            <Link to="/pitch" className="hover:text-white">Proposal</Link>
            <Link to="/docs" className="hover:text-white">Documentation</Link>
            <Link to="/today" className="hover:text-white">Current site audit</Link>
          </span>
        </div>
      </div>
    </footer>
  )
}

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <StoreNav />
      <main className="flex-1">{children}</main>
      <StoreFooter />
      <CartDrawer />
    </div>
  )
}
