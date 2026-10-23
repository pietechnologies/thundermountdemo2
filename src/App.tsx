import { useEffect, useState } from 'react'
import { Route, Routes, useLocation, Link } from 'react-router-dom'
import { ArrowRight, X } from 'lucide-react'
import DemoBar from './components/DemoBar'
import Toast from './components/Toast'
import StoreLayout from './components/StoreLayout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import Measure from './pages/Measure'
import Installers from './pages/Installers'
import Story from './pages/Story'
import Checkout from './pages/Checkout'
import Account from './pages/Account'
import Dealer from './pages/Dealer'
import Admin from './pages/Admin'
import Field from './pages/Field'
import Pitch from './pages/Pitch'
import Docs from './pages/Docs'
import Today from './pages/Today'
import NotFound from './pages/NotFound'

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])
  return null
}

function Welcome() {
  const { pathname } = useLocation()
  const [show, setShow] = useState(false)
  useEffect(() => {
    if (!sessionStorage.getItem('tm_welcomed') && pathname === '/') {
      const t = window.setTimeout(() => setShow(true), 700)
      return () => window.clearTimeout(t)
    }
  }, [pathname])
  if (!show) return null
  const close = () => {
    sessionStorage.setItem('tm_welcomed', '1')
    setShow(false)
  }
  return (
    <div className="no-print fixed inset-0 z-[90] flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm sm:items-center">
      <div className="relative w-full max-w-lg animate-rise overflow-hidden rounded-3xl border border-line bg-panel p-7 shadow-2xl">
        <button onClick={close} className="absolute right-4 top-4 rounded-full p-1.5 text-white/40 hover:bg-white/5 hover:text-white">
          <X className="h-4 w-4" />
        </button>
        <div className="eyebrow mb-3">Interactive proposal</div>
        <h2 className="text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
          One platform.<br />
          <span className="text-bolt">Six connected surfaces.</span>
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-mist">
          This is a working prototype built for Thunder Mounts. Browse the new storefront, sign in as a customer, dealer
          or the owner, open the installer app, then read the 14-week delivery plan.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-2 text-[12px]">
          {['Storefront & shop', 'Customer dashboard', 'Dealer portal', 'Admin console', 'Installer app', 'Proposal deck'].map((s) => (
            <div key={s} className="flex items-center gap-2 rounded-lg border border-line bg-white/[0.02] px-3 py-2 text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-bolt" /> {s}
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <Link to="/pitch" onClick={close} className="btn-primary flex-1">
            Start the pitch <ArrowRight className="h-4 w-4" />
          </Link>
          <button onClick={close} className="btn-dark flex-1">
            Explore on my own
          </button>
        </div>
        <p className="mt-4 text-center text-[11px] text-white/30">Sample data · no payments taken · nothing is saved to a server</p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <>
      <ScrollTop />
      <DemoBar />
      <Routes>
        <Route
          path="/"
          element={
            <StoreLayout>
              <Home />
            </StoreLayout>
          }
        />
        <Route path="/shop" element={<StoreLayout><Shop /></StoreLayout>} />
        <Route path="/product/:id" element={<StoreLayout><Product /></StoreLayout>} />
        <Route path="/measure" element={<StoreLayout><Measure /></StoreLayout>} />
        <Route path="/installers" element={<StoreLayout><Installers /></StoreLayout>} />
        <Route path="/our-story" element={<StoreLayout><Story /></StoreLayout>} />
        <Route path="/checkout" element={<StoreLayout><Checkout /></StoreLayout>} />
        <Route path="/account" element={<Account />} />
        <Route path="/dealer" element={<Dealer />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/field" element={<Field />} />
        <Route path="/pitch" element={<Pitch />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/today" element={<Today />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toast />
      <Welcome />
    </>
  )
}
