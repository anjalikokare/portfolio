import { about, education } from '../data/portfolio'
import { accentStyles, icons, Reveal, Section } from '../lib/ui'

export default function About() {
  return (
    <Section id="about" eyebrow="About me" title={<>Building software that is <span className="font-serif font-normal italic text-lavender-700">useful</span> and <span className="font-serif font-normal italic text-peach-700">trustworthy</span></>}>
      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <Reveal className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
          {about.paragraphs.map((p) => <p key={p}>{p}</p>)}
          <div className="flex flex-wrap gap-3 pt-2">
            <div className="rounded-2xl border border-line bg-white px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wider text-muted">Studying at</p>
              <p className="mt-0.5 font-semibold text-ink">{education.short}</p>
            </div>
            <div className="rounded-2xl border border-line bg-white px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wider text-muted">Level</p>
              <p className="mt-0.5 font-semibold text-ink">Diploma done · Degree ongoing</p>
            </div>
            <div className="rounded-2xl border border-line bg-white px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wider text-muted">CGPA</p>
              <p className="mt-0.5 font-semibold text-ink">{education.cgpa}</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="rounded-3xl border border-line bg-white p-6 shadow-sm">
            <h3 className="font-serif text-2xl italic">What I enjoy building</h3>
            <ul className="mt-5 grid gap-2.5">
              {about.enjoyBuilding.map((item) => {
                const Icon = icons[item.icon]
                const a = accentStyles[item.accent]
                return (
                  <li key={item.title} className={`group flex items-center gap-3 rounded-2xl px-3 py-2.5 transition hover:translate-x-1 ${a.soft}`}>
                    <span className={`grid h-9 w-9 place-items-center rounded-xl bg-white ${a.text}`}>
                      <Icon className="h-[18px] w-[18px]" aria-hidden />
                    </span>
                    <span className="text-sm font-semibold">{item.title}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
