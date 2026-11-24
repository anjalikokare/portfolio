import { useEffect, useState } from 'react'
import { ArrowDown, Download, MapPin } from 'lucide-react'
import { heroHighlights, links, profile } from '../data/portfolio'
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

function CodeCard() {
  const stats = [
    { value: '90', label: 'tests', accent: 'lavender' },
    { value: '65', label: 'endpoints', accent: 'peach' },
    { value: '0.82629', label: 'Kaggle', accent: 'mint' },
  ]
  return (
    <div className="relative mx-auto w-full max-w-[31rem]">
      <div className="profile-glow absolute -inset-8 -z-10 rounded-[3rem]" aria-hidden />
      <figure className="relative overflow-hidden rounded-[2rem] border border-line bg-white p-5 shadow-[0_28px_70px_-35px_rgba(33,31,46,0.55)] sm:p-7" aria-label="Anjali's current focus and portfolio highlights">
        <div className="flex items-center justify-between border-b border-line pb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">Profile / 2026</p>
            <p className="mt-1 text-lg font-bold">Building in public</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-mint-50 px-3 py-1.5 text-xs font-bold text-mint-700">
            <span className="h-2 w-2 rounded-full bg-mint-500" /> Available
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 py-5">
          {stats.map((stat) => (
            <div key={stat.label} className={`rounded-2xl px-2 py-4 text-center ${accentStyles[stat.accent as keyof typeof accentStyles].soft}`}>
              <strong className={`block text-lg font-extrabold sm:text-2xl ${accentStyles[stat.accent as keyof typeof accentStyles].text}`}>{stat.value}</strong>
              <span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-muted sm:text-xs">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="relative rounded-2xl border border-line bg-ink p-5 text-paper">
          <div className="absolute right-4 top-4 flex gap-1.5" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-peach-300" />
            <span className="h-2 w-2 rounded-full bg-butter-300" />
            <span className="h-2 w-2 rounded-full bg-mint-300" />
          </div>
          <p className="font-mono text-xs text-paper/55">~/current-focus</p>
          <p className="mt-4 max-w-sm font-serif text-2xl leading-tight sm:text-[1.65rem]">
            Secure systems.<br />
            Useful data.<br />
            <span className="text-peach-300">Thoughtful software.</span>
          </p>
          <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4 font-mono text-[10px] text-paper/60 sm:text-xs">
            <span className="h-2 w-2 animate-pulse rounded-full bg-mint-300" />
            Seeking internships
          </div>
        </div>
      </figure>

      <div className="absolute -left-3 -top-4 hidden rotate-[-3deg] rounded-2xl border border-line bg-white px-4 py-3 text-xs font-bold shadow-lg sm:block">
        🎓 IIT Madras
      </div>
      <div className="absolute -bottom-4 -right-2 hidden rotate-3 rounded-2xl border border-line bg-white px-4 py-3 text-xs font-bold shadow-lg sm:block">
        <span className="text-mint-500">●</span> Open to work
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
