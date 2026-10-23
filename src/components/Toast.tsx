import { Check } from 'lucide-react'
import { useStore } from '../store'

export default function Toast() {
  const { toast } = useStore()
  if (!toast) return null
  return (
    <div className="no-print pointer-events-none fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 animate-rise">
      <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white px-4 py-2.5 text-[13px] font-semibold text-black shadow-2xl">
        <Check className="h-4 w-4" strokeWidth={3} />
        {toast}
      </div>
    </div>
  )
}
