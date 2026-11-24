import { skills } from '../data/portfolio'
import { accentStyles, icons, Reveal, Section } from '../lib/ui'

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Technical skills"
      title="My toolkit"
      intro="Grouped by what I use them for. Every item here appears in my projects or coursework."
      className="bg-gradient-to-b from-transparent via-white/60 to-transparent"
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((g, i) => {
          const Icon = icons[g.icon]
          const a = accentStyles[g.accent]
          return (
            <Reveal key={g.group} delay={i * 70} className={i === 0 ? 'lg:row-span-1' : ''}>
              <div className="h-full rounded-3xl border border-line bg-white p-6 transition hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-center gap-3">
                  <span className={`grid h-10 w-10 place-items-center rounded-xl ${a.soft} ${a.text}`}>
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="font-bold">{g.group}</h3>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <li key={s} className={`rounded-full px-3 py-1.5 text-xs font-medium transition hover:-translate-y-0.5 ${a.chip}`}>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )
        })}
        <Reveal delay={350}>
          <div className="flex h-full flex-col justify-center rounded-3xl border border-dashed border-lavender-300 bg-lavender-50/60 p-6">
            <p className="font-serif text-2xl italic text-lavender-700">Always learning.</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Currently in the Degree Level at IIT Madras, adding to this list one project at a time.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
