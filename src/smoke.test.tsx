import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest'
import { render, cleanup, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { StoreProvider } from './store'
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

// jsdom lacks these; recharts and a few effects need them.
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (q: string) => ({ matches: false, media: q, onchange: null, addListener: vi.fn(), removeListener: vi.fn(), addEventListener: vi.fn(), removeEventListener: vi.fn(), dispatchEvent: vi.fn() }),
  })
  ;(globalThis as any).ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  window.scrollTo = vi.fn() as any
  window.print = vi.fn()
})

afterEach(() => {
  cleanup()
  localStorage.clear()
  sessionStorage.clear()
})

function renderAt(path: string, ui: React.ReactElement) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <StoreProvider>{ui}</StoreProvider>
    </MemoryRouter>,
  )
}

const publicPages: [string, React.ReactElement, RegExp][] = [
  ['/', <Home />, /BUILT FOR TODAY/i],
  ['/shop', <Shop />, /complete Thunder Mounts system/i],
  ['/measure', <Measure />, /What size do you purchase/i],
  ['/installers', <Installers />, /Certified installers/i],
  ['/our-story', <Story />, /missing piece/i],
  ['/checkout', <Checkout />, /cart is empty/i],
  ['/pitch', <Pitch />, /THE CONNECTED/i],
  ['/docs', <Docs />, /Scope & platform specification/i],
  ['/today', <Today />, /what it becomes/i],
]

describe('public pages render', () => {
  for (const [path, el, text] of publicPages) {
    it(`${path} renders`, () => {
      renderAt(path, el)
      expect(screen.getByText(text)).toBeTruthy()
    })
  }
})

describe('product page', () => {
  it('renders a real product', () => {
    render(
      <MemoryRouter initialEntries={['/product/tmgtx-19']}>
        <StoreProvider>
          <Routes>
            <Route path="/product/:id" element={<Product />} />
          </Routes>
        </StoreProvider>
      </MemoryRouter>,
    )
    expect(screen.getAllByText(/TMGTX-19/).length).toBeGreaterThan(0)
  })
})

describe('gated portals', () => {
  it('customer shows login when signed out', () => {
    renderAt('/account', <Account />)
    expect(screen.getByText(/Customer account/i)).toBeTruthy()
  })
  it('dealer shows login when signed out', () => {
    renderAt('/dealer', <Dealer />)
    expect(screen.getByText(/Dealer portal/i)).toBeTruthy()
  })
  it('admin shows login when signed out', () => {
    renderAt('/admin', <Admin />)
    expect(screen.getByText(/Owner console/i)).toBeTruthy()
  })
  it('customer dashboard renders when signed in', () => {
    localStorage.setItem('tm_session', 'customer')
    renderAt('/account', <Account />)
    expect(screen.getByText(/Hey Marcus/i)).toBeTruthy()
  })
  it('dealer dashboard renders when signed in', () => {
    localStorage.setItem('tm_session', 'dealer')
    renderAt('/dealer', <Dealer />)
    expect(screen.getAllByText(/Summit Garage Doors/i).length).toBeGreaterThan(0)
  })
  it('admin dashboard renders when signed in', () => {
    localStorage.setItem('tm_session', 'admin')
    renderAt('/admin', <Admin />)
    expect(screen.getByText(/Good morning/i)).toBeTruthy()
  })
  it('admin action centre is reachable and lists actions', async () => {
    localStorage.setItem('tm_session', 'admin')
    renderAt('/admin', <Admin />)
    const btn = screen.getByRole('button', { name: /Action centre/i })
    btn.click()
    expect(await screen.findByRole('heading', { name: /Action centre/i })).toBeTruthy()
    expect(screen.getAllByRole('button', { name: /^Run$/i }).length).toBeGreaterThan(10)
  })
  it('field app renders', () => {
    renderAt('/field', <Field />)
    expect(screen.getAllByText(/Today.s route/i).length).toBeGreaterThan(0)
  })
})

describe('fallback', () => {
  it('renders 404', () => {
    renderAt('/nope', <NotFound />)
    expect(screen.getByText(/Page not found/i)).toBeTruthy()
  })
})
