import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, Star, Check, ChevronDown } from 'lucide-react'
import { categories, products, money } from '../data'
import { useStore } from '../store'

const sorts = ['Featured', 'Price: low to high', 'Price: high to low', 'Top rated'] as const

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const [q, setQ] = useState(params.get('q') ?? '')
  const [cat, setCat] = useState((params.get('c') as string) ?? 'All')
  const [sort, setSort] = useState<(typeof sorts)[number]>('Featured')
  const [maxPrice, setMaxPrice] = useState(2500)
  const { add } = useStore()
  const [added, setAdded] = useState<string | null>(null)

  const list = useMemo(() => {
    let out = products.filter((p) => (cat === 'All' ? true : p.category === cat))
    out = out.filter((p) => p.price <= maxPrice)
    if (q.trim()) {
      const s = q.toLowerCase()
      out = out.filter((p) => (p.name + p.sku + p.fits + p.category).toLowerCase().includes(s))
    }
    if (sort === 'Price: low to high') out = [...out].sort((a, b) => a.price - b.price)
    if (sort === 'Price: high to low') out = [...out].sort((a, b) => b.price - a.price)
    if (sort === 'Top rated') out = [...out].sort((a, b) => b.rating - a.rating)
    return out
  }, [cat, q, sort, maxPrice])

  const pickCat = (c: string) => {
    setCat(c)
    const next = new URLSearchParams(params)
    c === 'All' ? next.delete('c') : next.set('c', c)
    setParams(next, { replace: true })
  }

  return (
    <>
      <div className="border-b border-line bg-panel/40">
        <div className="wrap py-10">
          <div className="eyebrow mb-2">Shop</div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">The complete Thunder Mounts system</h1>
          <p className="mt-2 max-w-2xl text-sm text-mist">
            15 products, every one with live stock, fitment data and installation time. Free UPS ground shipping over $500.
          </p>
        </div>
      </div>

      <div className="wrap grid gap-8 py-8 lg:grid-cols-[240px_1fr]">
        {/* filters */}
        <aside className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products"
              className="input pl-9"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/40">
              <SlidersHorizontal className="h-3 w-3" /> Category
            </div>
            <div className="space-y-1">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => pickCat(c)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[13px] font-medium transition ${
                    cat === c ? 'bg-white/[0.07] text-white' : 'text-white/55 hover:bg-white/[0.03] hover:text-white'
                  }`}
                >
                  {c}
                  <span className="text-[11px] text-white/30">
                    {c === 'All' ? products.length : products.filter((p) => p.category === c).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white/40">Max price · {money(maxPrice)}</div>
            <input type="range" min={0} max={2500} step={50} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} className="w-full accent-bolt" />
          </div>

          <div className="rounded-xl border border-line bg-panel p-4">
            <div className="text-[12px] font-bold">Not sure which size?</div>
            <p className="mt-1 text-[12px] leading-relaxed text-white/45">Use the fitment finder — two questions and you get the exact SKU.</p>
            <Link to="/measure" className="btn-primary btn-sm mt-3 w-full">
              Find my size
            </Link>
          </div>
        </aside>

        {/* products */}
        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="text-[13px] text-white/45">
              <b className="text-white">{list.length}</b> products
              {cat !== 'All' && <span> in {cat}</span>}
            </div>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as any)}
                className="appearance-none rounded-full border border-line bg-panel py-2 pl-3.5 pr-9 text-[12px] font-semibold text-white/80 focus:outline-none"
              >
                {sorts.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/40" />
            </div>
          </div>

          {list.length === 0 ? (
            <div className="card p-16 text-center text-sm text-mist">No products match those filters.</div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {list.map((p) => (
                <div key={p.id} className="card card-hover group flex flex-col overflow-hidden">
                  <Link to={`/product/${p.id}`} className="relative block h-44 overflow-hidden bg-black/30">
                    <img src={p.image} alt={p.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-panel/80 to-transparent" />
                    {p.badge && (
                      <span className="absolute left-3 top-3 rounded-full bg-bolt px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-black">
                        {p.badge}
                      </span>
                    )}
                    {p.stock < 25 && (
                      <span className="absolute right-3 top-3 rounded-full bg-black/70 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-300 backdrop-blur">
                        Low stock
                      </span>
                    )}
                  </Link>
                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-white/35">{p.sku}</span>
                      <span className="flex items-center gap-0.5 text-[11px] text-white/45">
                        <Star className="h-2.5 w-2.5 fill-bolt text-bolt" /> {p.rating}
                      </span>
                    </div>
                    <Link to={`/product/${p.id}`} className="mt-1 line-clamp-2 text-[14px] font-bold leading-snug hover:text-bolt">
                      {p.name}
                    </Link>
                    <div className="mt-1.5 line-clamp-1 text-[11px] text-white/40">{p.fits}</div>
                    <div className="mt-auto flex items-end justify-between pt-4">
                      <div>
                        <div className="text-[17px] font-extrabold">{money(p.price)}</div>
                        <div className="text-[10px] text-white/30 line-through">{money(p.msrp)}</div>
                      </div>
                      <button
                        onClick={() => {
                          add(p.id)
                          setAdded(p.id)
                          window.setTimeout(() => setAdded(null), 1400)
                        }}
                        className={`btn btn-sm ${added === p.id ? 'bg-emerald-500 text-black' : 'bg-white text-black hover:bg-white/90'}`}
                      >
                        {added === p.id ? <><Check className="h-3.5 w-3.5" /> Added</> : 'Add'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
