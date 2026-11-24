import { useId, useState, type MouseEvent } from 'react'
import { ChevronDown } from 'lucide-react'
import { projects, type Project } from '../data/portfolio'
import { accentStyles, Chip, CountUp, GithubIcon, icons, Reveal, Section } from '../lib/ui'

function ProjectCard({ p }: { p: Project }) {
  const [open, setOpen] = useState(false)
  const detailsId = useId()
  const a = accentStyles[p.accent]
  const Icon = icons[p.icon]

  // Soft spotlight that follows the cursor across the card.
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <article
      onMouseMove={onMove}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white p-5 transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-28px_rgba(33,31,46,0.4)] sm:p-7"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'radial-gradient(380px circle at var(--mx) var(--my), rgb(124 104 238 / 0.08), transparent 60%)' }}
        aria-hidden
      />
      <div className={`absolute inset-x-0 top-0 h-36 bg-gradient-to-b ${a.grad} opacity-80 transition-opacity [mask-image:linear-gradient(to_bottom,black_40%,transparent)] group-hover:opacity-100`} aria-hidden />

      <div className="relative flex items-start justify-between gap-4">
        <span className={`grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-sm ring-1 ${a.ring} ${a.text} transition-transform group-hover:-rotate-6`}>
          <Icon className="h-6 w-6" aria-hidden />
        </span>
        <div className="text-right">
          <CountUp value={p.metric.value} className={`block text-2xl font-extrabold tracking-tight sm:text-3xl ${a.text}`} />
          <p className="text-xs font-medium text-muted">{p.metric.label}</p>
        </div>
      </div>

      <h3 className="relative mt-5 text-lg font-bold leading-snug tracking-tight sm:text-xl">{p.name}</h3>
      <p className="relative mt-2 text-sm leading-relaxed text-muted">{p.tagline}</p>

      {p.metricCards && (
        <dl className="relative mt-5 grid grid-cols-2 gap-2">
          {p.metricCards.map((m) => (
            <div key={m.label} className={`rounded-2xl px-3.5 py-3 ${a.soft}`}>
              <dt className="sr-only">{m.label}</dt>
              <dd>
                <CountUp value={m.value} className={`block text-lg font-extrabold sm:text-xl ${a.text}`} />
                <span className="block text-[11px] font-medium text-muted">{m.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      )}

      <ul className="relative mt-5 space-y-2">
        {p.highlights.map((h) => (
          <li key={h} className="flex gap-2.5 text-sm leading-relaxed">
            <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${a.dot}`} aria-hidden />
            {h}
          </li>
        ))}
      </ul>

      <div
        id={detailsId}
        className={`relative grid transition-[grid-template-rows,opacity] duration-300 ${open ? 'mt-3 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <ul className="space-y-2 overflow-hidden">
          {p.details.map((d) => (
            <li key={d} className="flex gap-2.5 text-sm leading-relaxed text-ink/80">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-line" aria-hidden />
              {d}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mt-5 flex flex-wrap gap-1.5">
        {p.tech.map((t) => <Chip key={t}>{t}</Chip>)}
      </div>

      <div className="relative mt-auto flex items-center justify-between gap-3 pt-6">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={detailsId}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink/80 hover:text-ink"
        >
          {open ? 'Hide details' : 'View details'}
          <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden />
        </button>
        {p.github ? (
          <a
            href={p.github}
            target="_blank"
            rel="noreferrer"
            aria-label={`${p.name} on GitHub (opens in new tab)`}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-paper transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <GithubIcon className="h-4 w-4" /> GitHub
          </a>
        ) : (
          // TODO: Add link — set `github` for this project in src/data/portfolio.ts
          <span className="rounded-full border border-dashed border-line px-4 py-2 text-xs text-muted">GitHub link coming soon</span>
        )}
      </div>
    </article>
  )
}

export default function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title={<>Things I’ve <span className="font-serif font-normal italic text-peach-700">built</span> and analyzed</>}
      intro="Full-stack platforms, an NLP model on a Kaggle leaderboard and a real retail business analysis. Each one comes with the numbers behind it."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={(i % 2) * 100} className="h-full">
            <ProjectCard p={p} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
