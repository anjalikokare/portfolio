import { Calendar, MapPin, Trophy } from 'lucide-react'
import { experience, type ExperienceItem } from '../data/portfolio'
import { accentStyles, Chip, CountUp, Reveal, Section } from '../lib/ui'

function Header({ item }: { item: ExperienceItem }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h3 className="text-xl font-bold tracking-tight sm:text-2xl">
          {item.role} <span className="font-serif font-normal italic text-muted">at</span>{' '}
          <span className={accentStyles[item.accent].text}>{item.org}</span>
        </h3>
        <p className="mt-1 text-sm text-muted">{item.context}</p>
      </div>
      <div className="flex flex-col items-end gap-1 text-xs font-medium text-muted">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1">
          <Calendar className="h-3.5 w-3.5" aria-hidden /> {item.period}
        </span>
        {item.location && (
          <span className="inline-flex items-center gap-1.5 px-1">
            <MapPin className="h-3.5 w-3.5" aria-hidden /> {item.location}
          </span>
        )}
      </div>
    </div>
  )
}

function MentorConnect({ item }: { item: ExperienceItem }) {
  return (
    <article className="relative overflow-hidden rounded-3xl border border-lavender-100 bg-white p-5 shadow-[0_18px_50px_-30px_rgba(84,64,196,0.45)] sm:p-8">
      <div className="absolute right-0 top-0 h-40 w-40 rounded-bl-[5rem] bg-gradient-to-br from-lavender-100 to-transparent" aria-hidden />
      <span className="relative mb-4 inline-flex items-center rounded-full bg-lavender-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-lavender-700">
        Team Project
      </span>
      <div className="relative"><Header item={item} /></div>

      <dl className="relative mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {item.metrics?.map((m) => (
          <div key={m.label} className="rounded-2xl bg-gradient-to-br from-lavender-50 to-white p-4 ring-1 ring-lavender-100">
            <dt className="sr-only">{m.label}</dt>
            <dd>
              <CountUp value={m.value} className="block text-3xl font-extrabold tracking-tight text-lavender-700 sm:text-4xl" />
              <span className="mt-1 block text-xs font-medium text-muted">{m.label}</span>
            </dd>
          </div>
        ))}
      </dl>

      <div className="relative mt-7 grid gap-4 md:grid-cols-2">
        {item.groups?.map((g) => (
          <div key={g.title} className="rounded-2xl border border-line bg-paper/60 p-5">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-lavender-700">{g.title}</h4>
            <ul className="mt-3 space-y-2">
              {g.points.map((p) => (
                <li key={p} className="flex gap-2.5 text-sm leading-relaxed text-ink/85">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lavender-500" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="relative mt-6 flex flex-wrap gap-2">
        {item.tags.map((t) => <Chip key={t}>{t}</Chip>)}
      </div>
    </article>
  )
}

function Hackathon({ item }: { item: ExperienceItem }) {
  return (
    <article className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-peach-100 via-peach-50 to-butter-50 p-5 ring-1 ring-peach-300/60 sm:p-8">
      <span className="relative mb-4 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-peach-700 shadow-sm">
        <Trophy className="h-3.5 w-3.5" aria-hidden /> Selected · SIH26191
      </span>
      <div className="relative"><Header item={item} /></div>
      <ul className="relative mt-6 grid gap-2.5 sm:grid-cols-2">
        {item.points?.map((p) => (
          <li key={p} className="flex gap-2.5 rounded-2xl bg-white/70 px-4 py-3 text-sm leading-relaxed backdrop-blur">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-peach-500" aria-hidden />
            {p}
          </li>
        ))}
      </ul>
    </article>
  )
}

function Compact({ item }: { item: ExperienceItem }) {
  return (
    <article className="rounded-3xl border border-line bg-white p-5 sm:p-7">
      <Header item={item} />
      <div className="mt-5 flex flex-wrap gap-2">
        {item.tags.map((t) => <Chip key={t} accent={item.accent}>{t}</Chip>)}
      </div>
    </article>
  )
}

export default function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I’ve been building"
      intro="A full-stack team project, a Smart India Hackathon selection and a data science internship."
      className="bg-gradient-to-b from-transparent via-white/60 to-transparent"
    >
      <ol className="relative space-y-6 border-l-2 border-dashed border-line pl-5 sm:space-y-8 sm:pl-10">
        {experience.map((item, i) => (
          <Reveal as="li" key={item.id} delay={i * 80} className="relative">
            <span
              className={`absolute -left-[29px] top-8 grid h-4 w-4 place-items-center rounded-full ring-4 ring-paper sm:-left-[49px] ${accentStyles[item.accent].dot}`}
              aria-hidden
            />
            {item.id === 'mentorconnect' ? <MentorConnect item={item} /> : item.id === 'sih' ? <Hackathon item={item} /> : <Compact item={item} />}
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
