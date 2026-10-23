import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Ruler, Recycle, Award } from 'lucide-react'
import { Section } from '../components/ui'

const timeline = [
  { y: '1991', t: 'The prototype', d: 'Gustavo Estravit builds the first mount for his own home in Simi Valley.' },
  { y: '2007', t: 'Industry recognition', d: 'Professional Door Dealer magazine spotlights the innovation.' },
  { y: '2010', t: 'Thunder Mounts founded', d: 'The system launches commercially and sets a new install standard.' },
  { y: '2019', t: 'Gen 4 retainers', d: 'Dual vibration isolation and the happy-face retainer design.' },
  { y: '2026', t: 'The connected platform', d: 'One system for commerce, dealers, installers and customers.' },
]

export default function Story() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <img src="./img/finished-garage.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/50" />
        <div className="wrap relative py-24">
          <div className="eyebrow mb-3">Our story</div>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.03] tracking-tight sm:text-6xl">
            The missing piece in the garage door industry.
          </h1>
          <p className="lead mt-5 max-w-xl">
            Thunder Mounts is the world's first fit-all overhead garage mounting system — engineered to replace improvised
            angle iron with something you would actually want to look at.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="eyebrow mb-3">Value · Safety · Symmetry</div>
            <h2 className="h2">A standard, not a bracket.</h2>
            <p className="lead mt-4">
              The garage is the largest room in most homes and the last one anyone designs. Thunder Mounts turns the
              installation itself into a feature: symmetrical channels, concealed wiring, isolated tubes, and a chrome
              finish ring that signals the work was done deliberately.
            </p>
            <p className="lead mt-4">
              It's also a safety argument. Square, load-rated, code-friendly mounting is safer than hand-bent hardware —
              and it makes every future upgrade, from a storage rack to lighting, bolt straight on.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { i: <ShieldCheck className="h-5 w-5" />, t: 'Load rated', d: '12 gauge steel, engineered capacity' },
              { i: <Ruler className="h-5 w-5" />, t: 'Adjustable', d: 'Movement in all directions' },
              { i: <Recycle className="h-5 w-5" />, t: 'Reusable', d: 'Upgrade without replacing hardware' },
              { i: <Award className="h-5 w-5" />, t: 'Recognised', d: 'Doors + Openers innovation, 2007' },
            ].map((x) => (
              <div key={x.t} className="card p-5">
                <div className="text-bolt">{x.i}</div>
                <div className="mt-3 text-[13px] font-bold">{x.t}</div>
                <div className="mt-1 text-[12px] leading-relaxed text-white/45">{x.d}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="border-y border-line bg-panel/40" eyebrow="Timeline" title="Built over three decades">
        <div className="relative">
          <div className="absolute left-[70px] top-2 hidden h-[calc(100%-1rem)] w-px bg-line sm:block" />
          <div className="space-y-6">
            {timeline.map((x) => (
              <div key={x.y} className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-8">
                <div className="w-16 shrink-0 text-right font-mono text-[13px] font-bold text-bolt">{x.y}</div>
                <div className="hidden h-2.5 w-2.5 shrink-0 translate-y-1.5 rounded-full bg-bolt ring-4 ring-ink sm:block" />
                <div>
                  <div className="text-[14px] font-bold">{x.t}</div>
                  <div className="mt-0.5 text-[13px] text-white/45">{x.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="card relative overflow-hidden p-8 sm:p-12">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-bolt/10 blur-3xl" />
          <div className="relative grid items-center gap-8 lg:grid-cols-2">
            <div>
              <div className="eyebrow mb-3">Ready to upgrade</div>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Measure your garage in 30 seconds.</h2>
              <p className="mt-3 text-sm leading-relaxed text-mist">
                Two measurements, one recommendation. Then order the kit or hand it to a certified installer.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row lg:justify-end">
              <Link to="/measure" className="btn-primary">Find my size <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/shop" className="btn-dark">Shop the system</Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
