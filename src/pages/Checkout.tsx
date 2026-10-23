import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Lock, Check, CreditCard, Truck, ArrowRight, Package, ShieldCheck, ChevronLeft } from 'lucide-react'
import { useStore } from '../store'
import { products, money } from '../data'

const steps = ['Contact', 'Shipping', 'Payment']

export default function Checkout() {
  const { cart, clear, signIn } = useStore()
  const [step, setStep] = useState(0)
  const [placed, setPlaced] = useState(false)
  const [ship, setShip] = useState('ground')
  const [account, setAccount] = useState(true)

  const lines = cart.map((l) => ({ ...l, product: products.find((p) => p.id === l.id)! })).filter((l) => l.product)
  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0)
  const shipping = ship === 'express' ? 48 : subtotal > 500 || subtotal === 0 ? 0 : 18
  const tax = +(subtotal * 0.0825).toFixed(2)
  const total = subtotal + shipping + tax

  if (placed) {
    return (
      <div className="wrap max-w-2xl py-20">
        <div className="card p-8 text-center sm:p-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
            <Check className="h-7 w-7" strokeWidth={3} />
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight">Order confirmed</h1>
          <p className="mt-2 text-sm text-mist">
            Order <span className="font-mono font-bold text-white">#TM-10432</span> · a confirmation is on its way to your inbox.
          </p>

          <div className="mt-6 rounded-xl border border-line bg-white/[0.02] p-4 text-left">
            <div className="text-[11px] font-bold uppercase tracking-wider text-white/40">What happens next</div>
            <ol className="mt-3 space-y-3">
              {[
                ['Packing today', 'Ships from Simi Valley within 24 hours'],
                ['Tracking by email', 'UPS ground · arrives in 2–4 business days'],
                ['Install option', 'Add a certified install any time from your account'],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-bolt/15 text-[10px] font-bold text-bolt">{i + 1}</span>
                  <div>
                    <div className="text-[13px] font-semibold">{t}</div>
                    <div className="text-[12px] text-white/40">{d}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <button
              onClick={() => {
                signIn('customer')
                window.location.hash = '#/account'
              }}
              className="btn-primary flex-1"
              type="button"
            >
              Open my account <ArrowRight className="h-4 w-4" />
            </button>
            <Link to="/shop" className="btn-dark flex-1">Keep shopping</Link>
          </div>
        </div>
      </div>
    )
  }

  if (lines.length === 0) {
    return (
      <div className="wrap max-w-xl py-24 text-center">
        <Package className="mx-auto h-8 w-8 text-white/25" />
        <h1 className="mt-4 text-2xl font-extrabold">Your cart is empty</h1>
        <p className="mt-2 text-sm text-mist">Add a mount kit to see the checkout flow.</p>
        <Link to="/shop" className="btn-primary mt-6">Shop the system</Link>
      </div>
    )
  }

  return (
    <>
      <div className="border-b border-line bg-panel/40">
        <div className="wrap flex items-center justify-between py-6">
          <div>
            <Link to="/shop" className="flex items-center gap-1 text-[12px] text-white/40 hover:text-white">
              <ChevronLeft className="h-3.5 w-3.5" /> Back to shop
            </Link>
            <h1 className="mt-1 text-2xl font-extrabold tracking-tight">Secure checkout</h1>
          </div>
          <div className="flex items-center gap-3">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${i <= step ? 'bg-bolt text-black' : 'border border-line text-white/30'}`}>
                  {i < step ? <Check className="h-3 w-3" strokeWidth={3} /> : i + 1}
                </span>
                <span className={`hidden text-[12px] font-semibold sm:block ${i <= step ? 'text-white' : 'text-white/30'}`}>{s}</span>
                {i < 2 && <span className="h-px w-6 bg-line" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="wrap grid gap-8 py-10 lg:grid-cols-[1fr_400px]">
        <div className="space-y-4">
          {step === 0 && (
            <div className="card p-6">
              <h2 className="text-lg font-bold">Contact details</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div><label className="label">First name</label><input className="input" defaultValue="Marcus" /></div>
                <div><label className="label">Last name</label><input className="input" defaultValue="Hale" /></div>
                <div className="sm:col-span-2"><label className="label">Email</label><input className="input" defaultValue="marcus.hale@gmail.com" /></div>
                <div className="sm:col-span-2"><label className="label">Phone</label><input className="input" defaultValue="(805) 555-0142" /></div>
              </div>
              <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-xl border border-line p-3.5">
                <input type="checkbox" checked={account} onChange={(e) => setAccount(e.target.checked)} className="mt-0.5 h-4 w-4 accent-bolt" />
                <span className="text-[12px] leading-relaxed text-white/70">
                  <b className="text-white">Create an account</b> and save this garage's measurements so future orders are one click.
                </span>
              </label>
              <button onClick={() => setStep(1)} className="btn-primary mt-5 w-full sm:w-auto">Continue to shipping</button>
            </div>
          )}

          {step === 1 && (
            <div className="card p-6">
              <h2 className="text-lg font-bold">Shipping</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="sm:col-span-2"><label className="label">Address</label><input className="input" defaultValue="1127 Sinaloa Rd" /></div>
                <div><label className="label">City</label><input className="input" defaultValue="Simi Valley" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="label">State</label><input className="input" defaultValue="CA" /></div>
                  <div><label className="label">ZIP</label><input className="input" defaultValue="93065" /></div>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <div className="label">Method</div>
                {[
                  { id: 'ground', t: 'UPS Ground', d: '2–4 business days', p: subtotal > 500 ? 'Free' : '$18' },
                  { id: 'express', t: 'UPS Next Day Air', d: 'Order by 2pm PT', p: '$48' },
                ].map((o) => (
                  <button
                    key={o.id}
                    onClick={() => setShip(o.id)}
                    className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition ${ship === o.id ? 'border-bolt bg-bolt/[0.06]' : 'border-line'}`}
                  >
                    <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${ship === o.id ? 'border-bolt' : 'border-white/30'}`}>
                      {ship === o.id && <span className="h-2 w-2 rounded-full bg-bolt" />}
                    </span>
                    <span className="flex-1">
                      <span className="block text-[13px] font-semibold">{o.t}</span>
                      <span className="block text-[11px] text-white/40">{o.d}</span>
                    </span>
                    <span className="text-[13px] font-bold">{o.p}</span>
                  </button>
                ))}
              </div>

              <div className="mt-5 flex gap-2">
                <button onClick={() => setStep(0)} className="btn-dark flex-1">Back</button>
                <button onClick={() => setStep(2)} className="btn-primary flex-1">Continue to payment</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Payment</h2>
                <span className="flex items-center gap-1.5 text-[11px] text-white/40"><Lock className="h-3 w-3" /> 256-bit encrypted</span>
              </div>

              <div className="mt-4 grid gap-3">
                <div><label className="label">Card number</label><input className="input font-mono" defaultValue="4242 4242 4242 4242" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="label">Expiry</label><input className="input font-mono" defaultValue="12 / 28" /></div>
                  <div><label className="label">CVC</label><input className="input font-mono" defaultValue="123" /></div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {['Visa', 'Mastercard', 'Amex', 'Apple Pay'].map((m) => (
                  <span key={m} className="rounded-md border border-line px-2.5 py-1 text-[10px] font-semibold text-white/45">{m}</span>
                ))}
              </div>

              <div className="mt-4 rounded-xl border border-line bg-white/[0.02] p-3 text-[11px] text-white/45">
                Demo checkout — card fields are pre-filled and no charge is made.
              </div>

              <button
                onClick={() => {
                  setPlaced(true)
                  clear()
                }}
                className="btn-primary mt-5 w-full"
              >
                <Lock className="h-4 w-4" /> Place order · {money(total)}
              </button>
              <button onClick={() => setStep(1)} className="btn-ghost mt-2 w-full">Back to shipping</button>
            </div>
          )}

          <div className="grid grid-cols-3 gap-2">
            {[
              { i: <ShieldCheck className="h-4 w-4" />, t: '30-day returns' },
              { i: <Truck className="h-4 w-4" />, t: 'Tracked shipping' },
              { i: <CreditCard className="h-4 w-4" />, t: 'Secure payment' },
            ].map((x) => (
              <div key={x.t} className="flex flex-col items-center gap-1.5 rounded-xl border border-line py-3 text-[11px] text-white/50">
                <span className="text-bolt">{x.i}</span>
                {x.t}
              </div>
            ))}
          </div>
        </div>

        <aside className="card sticky top-32 h-fit p-5">
          <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/40">Order summary</div>
          <div className="mt-4 space-y-3">
            {lines.map((l) => (
              <div key={l.id} className="flex gap-3">
                <div className="relative">
                  <img src={l.product.image} alt="" className="h-14 w-14 rounded-lg border border-line object-cover" />
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black">{l.qty}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[12px] font-semibold">{l.product.name}</div>
                  <div className="font-mono text-[10px] text-white/30">{l.product.sku}</div>
                </div>
                <div className="text-[12px] font-bold">{money(l.product.price * l.qty)}</div>
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-2 border-t border-line pt-4 text-[12px]">
            <div className="flex justify-between"><span className="text-white/45">Subtotal</span><span>{money(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-white/45">Shipping</span><span>{shipping === 0 ? 'Free' : money(shipping)}</span></div>
            <div className="flex justify-between"><span className="text-white/45">Tax (8.25%)</span><span>{money(tax)}</span></div>
            <div className="flex justify-between border-t border-line pt-2 text-[15px] font-extrabold"><span>Total</span><span>{money(total)}</span></div>
          </div>

          <div className="mt-4 rounded-lg border border-bolt/25 bg-bolt/[0.06] px-3 py-2 text-[11px] text-bolt">
            You're saving {money(lines.reduce((s, l) => s + (l.product.msrp - l.product.price) * l.qty, 0))} versus list price.
          </div>
        </aside>
      </div>
    </>
  )
}
