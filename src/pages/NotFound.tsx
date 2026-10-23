import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="wrap flex min-h-[70vh] flex-col items-center justify-center text-center">
      <Compass className="h-8 w-8 text-bolt" />
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight">Page not found</h1>
      <p className="mt-2 max-w-md text-sm text-mist">
        This route isn't part of the demo. Try the storefront, the proposal deck, or pick another surface from the demo bar.
      </p>
      <div className="mt-6 flex gap-2">
        <Link to="/" className="btn-primary">Storefront</Link>
        <Link to="/pitch" className="btn-dark">Proposal deck</Link>
      </div>
    </div>
  )
}
