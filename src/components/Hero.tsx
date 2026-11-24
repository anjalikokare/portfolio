import { useEffect, useState } from 'react'
import { ArrowDown, Download, MapPin } from 'lucide-react'
import { heroHighlights, links, profile, skills } from '../data/portfolio'
import { accentStyles, GithubIcon, LinkedinIcon, Sparkle } from '../lib/ui'

/** Cycles through the headline roles with a soft slide. */
function RotatingRole() {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setI((n) => (n + 1) % profile.headline.length), 2400)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="relative inline-grid overflow-hidden align-bottom">
      {profile.headline.map((h, idx) => (
        <span
          key={h}
          aria-hidden={idx !== i}
          className={`col-start-1 row-start-1 whitespace-nowrap bg-gradient-to-r from-lavender-500 via-peach-500 to-mint-500 bg-clip-text text-transparent transition-all duration-500 ${
            idx === i ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}
        >
          {h}
        </span>
      ))}
    </span>
  )
}

/** Endless strip of the tech I use, taken from the skills list. */
export function TechMarquee() {
  const items = skills.flatMap((g) => g.items).filter((x) => !['Excel', 'VS Code', 'HTML/CSS', 'Relational Schema Design', 'Ensemble Modeling'].includes(x))
  const row = [...items, ...items]
  return (
    <div className="group relative overflow-hidden border-y border-line bg-white/70 py-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]" aria-label="Technologies I use">
      <ul className="flex w-max animate-marquee gap-3 group-hover:[animation-play-state:paused]">
        {row.map((t, i) => (
          <li key={i} aria-hidden={i >= items.length} className="flex items-center gap-3 whitespace-nowrap text-sm font-semibold text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-lavender-300" aria-hidden />
            {t}
          </li>
        ))}
      </ul>
    </div>
  )
}

function CodeCard() {
  // A playful "developer profile" card in place of a photo.
  return (
    <div className="relative">
      <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-lavender-100 via-peach-50 to-mint-100 blur-2xl" aria-hidden />
      <figure
        className="overflow-hidden rounded-3xl border border-line bg-white shadow-[0_20px_60px_-25px_rgba(33,31,46,0.35)]"
        aria-label="Code-style profile card summarizing Anjali's profile"
      >
        <div className="flex items-center gap-2 border-b border-line bg-paper px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-peach-300" />
          <span className="h-3 w-3 rounded-full bg-butter-300" />
          <span className="h-3 w-3 rounded-full bg-mint-300" />
          <span className="ml-3 font-mono text-xs text-muted">anjali.py</span>
        </div>
        <pre className="overflow-x-auto px-5 py-5 font-mono text-[11px] leading-[1.7] sm:text-[13px] sm:leading-6">
          <code>
            <span className="text-lavender-700">class</span> <span className="text-sky-700">Anjali</span>:{'\n'}
            {'    '}school = <span className="text-mint-700">"IIT Madras"</span>{'\n'}
            {'    '}degree = <span className="text-mint-700">"B.S. Data Science & Applications"</span>{'\n'}
            {'    '}builds = [{'\n'}
            {'        '}<span className="text-mint-700">"secure full-stack apps"</span>,{'\n'}
            {'        '}<span className="text-mint-700">"ML & NLP pipelines"</span>,{'\n'}
            {'    '}]{'\n'}
            {'    '}stack = {'{'}{'\n'}
            {'        '}<span className="text-peach-700">"backend"</span>: [<span className="text-mint-700">"FastAPI"</span>, <span className="text-mint-700">"Flask"</span>],{'\n'}
            {'        '}<span className="text-peach-700">"frontend"</span>: [<span className="text-mint-700">"React"</span>, <span className="text-mint-700">"Vue.js"</span>],{'\n'}
            {'        '}<span className="text-peach-700">"ml"</span>: [<span className="text-mint-700">"scikit-learn"</span>, <span className="text-mint-700">"LightGBM"</span>],{'\n'}
            {'    '}{'}'}{'\n'}
            {'    '}kaggle_score = <span className="text-butter-700">0.82629</span>{'\n'}
            {'    '}tests_passing = <span className="text-butter-700">90</span>{'\n'}
            {'\n'}
            <span className="text-muted">&gt;&gt;&gt; </span>Anjali().status(){'\n'}
            <span className="text-mint-700">'open to internships'</span>
            <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-lavender-500" aria-hidden />
          </code>
        </pre>
      </figure>

      {/* Floating stickers */}
      <div className="absolute -left-6 -top-5 hidden animate-float rounded-2xl border border-line bg-white px-3 py-2 text-xs font-semibold shadow-lg sm:block">
        <span className="mr-1" aria-hidden>🎓</span> IIT Madras
      </div>
      <div className="absolute -right-4 bottom-16 hidden animate-float-slow rounded-2xl border border-line bg-white px-3 py-2 text-xs font-semibold shadow-lg sm:block">
        <span className="mr-1" aria-hidden>✅</span> 90 tests passing
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="home" aria-label="Introduction" className="relative overflow-hidden pt-24 pb-14 sm:pt-36 sm:pb-24">
      {/* Background decoration */}
      <div className="dot-grid absolute inset-0 -z-20 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" aria-hidden />
      <div className="absolute -top-24 right-[-10%] -z-10 h-[28rem] w-[28rem] animate-drift rounded-full bg-lavender-100/70 blur-3xl" aria-hidden />
      <div className="absolute top-40 left-[-12%] -z-10 h-[22rem] w-[22rem] animate-drift rounded-full bg-peach-100/60 blur-3xl [animation-delay:-6s]" aria-hidden />
      <Sparkle className="absolute left-[8%] top-32 hidden h-5 w-5 animate-float text-butter-300 sm:block" />
      <Sparkle className="absolute right-[6%] top-[70%] h-4 w-4 animate-float-slow text-lavender-300" />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_1fr] [&>*]:min-w-0">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-3 py-1.5 text-xs font-medium text-muted shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint-500 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-mint-500" />
            </span>
            Open to internships · Software, Full-Stack, Data & ML
          </p>

          <h1 className="text-[2.6rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
            Hi, I’m{' '}
            <span className="relative whitespace-nowrap">
              <span className="font-serif text-[1.12em] font-normal italic text-lavender-700">Anjali</span>
              <svg className="absolute -bottom-2 left-0 w-full text-peach-300" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden>
                <path d="M2 9c40-6 120-8 196-3" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
            </span>
            <span className="sr-only"> ({profile.name})</span>
          </h1>
          <p className="mt-3 text-base font-medium text-muted">{profile.name}</p>

          <p className="mt-6 text-lg font-bold sm:text-2xl">
            <span className="sr-only">{profile.headline.join(' · ')}</span>
            <span aria-hidden className="text-ink">I’m a </span>
            <span aria-hidden><RotatingRole /></span>
          </p>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{profile.intro}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects" className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper shadow-md transition hover:-translate-y-0.5 hover:shadow-lg">
              View My Projects <ArrowDown className="h-4 w-4" />
            </a>
            <a href={profile.resumeUrl} download className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-lavender-300 hover:shadow-md">
              <Download className="h-4 w-4" /> Download Resume
            </a>
            <a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub profile (opens in new tab)" className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white transition hover:-translate-y-0.5 hover:shadow-md">
              <GithubIcon className="h-5 w-5" />
            </a>
            <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile (opens in new tab)" className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-sky-700 transition hover:-translate-y-0.5 hover:shadow-md">
              <LinkedinIcon className="h-5 w-5" />
            </a>
          </div>

          <ul className="mt-9 flex flex-wrap gap-2" aria-label="Highlights">
            {heroHighlights.map((h) => (
              <li key={h.label} className={`rounded-full px-3.5 py-1.5 text-xs font-semibold ${accentStyles[h.accent].chip}`}>
                {h.label}
              </li>
            ))}
          </ul>

          <p className="mt-6 inline-flex items-center gap-1.5 text-xs text-muted">
            <MapPin className="h-3.5 w-3.5" /> {profile.location}
          </p>
        </div>

        <CodeCard />
      </div>
    </section>
  )
}
