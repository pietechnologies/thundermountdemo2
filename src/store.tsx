import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type CartLine = { id: string; qty: number }
export type Session = null | 'customer' | 'dealer' | 'admin' | 'field'

type Store = {
  cart: CartLine[]
  add: (id: string, qty?: number) => void
  setQty: (id: string, qty: number) => void
  remove: (id: string) => void
  clear: () => void
  count: number
  session: Session
  signIn: (s: Exclude<Session, null>) => void
  signOut: () => void
  toast: string | null
  notify: (m: string) => void
  drawer: boolean
  setDrawer: (v: boolean) => void
}

const Ctx = createContext<Store | null>(null)

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('tm_cart') || '[]')
    } catch {
      return []
    }
  })
  const [session, setSession] = useState<Session>(() => {
    try {
      const v = localStorage.getItem('tm_session')
      return (v as Session) ?? null
    } catch {
      return null
    }
  })
  const [toast, setToast] = useState<string | null>(null)
  const [drawer, setDrawer] = useState(false)

  useEffect(() => {
    localStorage.setItem('tm_cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    try {
      if (session) localStorage.setItem('tm_session', session)
      else localStorage.removeItem('tm_session')
    } catch {
      /* ignore */
    }
  }, [session])

  const notify = (m: string) => {
    setToast(m)
    window.setTimeout(() => setToast(null), 2600)
  }

  const value = useMemo<Store>(
    () => ({
      cart,
      add: (id, qty = 1) => {
        setCart((c) => {
          const found = c.find((l) => l.id === id)
          return found ? c.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l)) : [...c, { id, qty }]
        })
        notify('Added to cart')
      },
      setQty: (id, qty) => setCart((c) => (qty <= 0 ? c.filter((l) => l.id !== id) : c.map((l) => (l.id === id ? { ...l, qty } : l)))),
      remove: (id) => setCart((c) => c.filter((l) => l.id !== id)),
      clear: () => setCart([]),
      count: cart.reduce((s, l) => s + l.qty, 0),
      session,
      signIn: (s) => {
        setSession(s)
        notify('Signed in — demo session started')
      },
      signOut: () => {
        setSession(null)
        notify('Signed out')
      },
      toast,
      notify,
      drawer,
      setDrawer,
    }),
    [cart, session, toast, drawer],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useStore() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useStore outside provider')
  return v
}
