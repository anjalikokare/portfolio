import { BookOpen, Calendar, GraduationCap, MapPin } from 'lucide-react'
import { education } from '../data/portfolio'
import { Reveal, Section } from '../lib/ui'

export default function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Where I’m learning">
      <Reveal>
        <article className="relative overflow-hidden rounded-3xl border border-line bg-white">
          <div className="grid lg:grid-cols-[1fr_1.4fr]">
            <div className="relative flex flex-col justify-between gap-8 bg-gradient-to-br from-lavender-500 to-lavender-700 p-8 text-white sm:p-10">
              <GraduationCap className="absolute -right-8 -bottom-8 h-48 w-48 text-white/10" aria-hidden />
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/70">Indian Institute of Technology</p>
                <h3 className="mt-2 text-5xl font-extrabold tracking-tight sm:text-6xl">
                  {education.short}
                </h3>
                <p className="mt-3 text-base text-white/85">{education.degree}</p>
              </div>
              <div className="relative flex items-end gap-3">
                <div className="rounded-2xl bg-white/15 px-5 py-4 backdrop-blur">
                  <p className="text-xs font-medium uppercase tracking-wider text-white/70">CGPA</p>
                  <p className="text-3xl font-extrabold">{education.cgpa}</p>
                </div>
              </div>
            </div>

            <div className="p-8 sm:p-10">
              <p className="text-lg font-bold">{education.school}</p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
                <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" aria-hidden /> {education.period}</span>
                <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" aria-hidden /> {education.location}</span>
              </div>

              {/* Progress through the BS programme */}
              <ol className="mt-7 grid gap-3 sm:grid-cols-2" aria-label="Programme progress">
                <li className="rounded-2xl bg-mint-50 p-4 ring-1 ring-mint-100">
                  <p className="text-xs font-semibold uppercase tracking-wider text-mint-700">✓ Completed</p>
                  <p className="mt-1 font-semibold">Diploma Level</p>
                </li>
                <li className="rounded-2xl bg-butter-50 p-4 ring-1 ring-butter-100">
                  <p className="text-xs font-semibold uppercase tracking-wider text-butter-700">● In progress</p>
                  <p className="mt-1 font-semibold">Degree Level</p>
                </li>
              </ol>

              <h4 className="mt-8 inline-flex items-center gap-2 text-sm font-bold">
                <BookOpen className="h-4 w-4 text-lavender-700" aria-hidden /> Relevant coursework
              </h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {education.coursework.map((c) => (
                  <li key={c} className="rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-medium">{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </Reveal>
    </Section>
  )
}
