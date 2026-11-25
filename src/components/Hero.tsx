import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { ArrowRight, Download, MapPin, Sparkles } from 'lucide-react'
import { education, links, profile, skills } from '../data/portfolio'
import { CountUp, GithubIcon, LinkedinIcon, Sparkle } from '../lib/ui'

const rotatingLines = [
  'secure full-stack apps',
  'tested REST APIs',
  'ML & NLP pipelines',
  'data-driven dashboards',
]

const proof = [
  { value: '65', label: 'API endpoints', note: 'MentorConnect' },
  { value: '90', label: 'pytest tests', note: 'all passing' },
  { value: '0.82629', label: 'Kaggle score', note: 'NLP ensemble' },
  { value: '9', label: 'certificates', note: 'HackerRank · NPTEL · AWS' },
]

function StudentBadge() {
  const badgeRef = useRef<HTMLDivElement>(null)

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    event.currentTarget.style.setProperty('--tilt-x', `${-y * 10}deg`)
    event.currentTarget.style.setProperty('--tilt-y', `${x * 10}deg`)
  }

  const resetPointer = () => {
    badgeRef.current?.style.setProperty('--tilt-x', '0deg')
    badgeRef.current?.style.setProperty('--tilt-y', '0deg')
  }

  return (
    <div className="badge-sway relative mx-auto w-full max-w-[25rem] pt-10 sm:pt-12" aria-label="Anjali's IIT Madras student profile card">
      <div className="lanyard-strap lanyard-left" aria-hidden />
      <div className="lanyard-strap lanyard-right" aria-hidden />
      <div className="lanyard-clip" aria-hidden />

      <div
        ref={badgeRef}
        className="student-badge relative isolate overflow-hidden rounded-[1.75rem] border border-[#ebe6f4] bg-white shadow-[0_28px_70px_-35px_rgba(84,64,196,0.42)]"
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPointer}
      >
        <div className="badge-band relative h-36 overflow-hidden px-5 pt-5 sm:px-7">
          <div className="relative z-10 flex items-start justify-between gap-2">
            <div className="font-mono text-[10px] font-semibold uppercase leading-5 tracking-[0.16em] text-white/90">
              <span className="block">Student</span>
              <span className="block">IIT Madras</span>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/20 px-2.5 py-1.5 text-[10px] font-bold text-white backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d9f3e6]" />
              Open to work
            </span>
          </div>
          <svg className="absolute -bottom-px left-0 h-9 w-full text-white" viewBox="0 0 400 44" preserveAspectRatio="none" aria-hidden>
            <path fill="currentColor" d="M0 22C70 43 125 4 200 20s132 29 200 0v24H0Z" />
          </svg>
        </div>

        <div className="relative px-5 pb-5 pt-1 sm:px-7 sm:pb-6">
          <div className="badge-avatar absolute -top-[4.2rem] left-6 grid h-[5.5rem] w-[5.5rem] place-items-center overflow-hidden rounded-full border-[5px] border-white bg-gradient-to-br from-[#fbbfa3] via-[#f6d77a] to-[#f6d77a] shadow-md">
            {profile.profileImage ? (
              <img src={profile.profileImage} alt="Anjali Kokare" className="h-full w-full object-cover" />
            ) : (
              <span className="font-serif text-[2.7rem] italic leading-none text-[#5440c4]">ak</span>
            )}
          </div>

          <span className="badge-sticker badge-sticker-mint absolute right-4 top-[-2.8rem] z-10 -rotate-2 rounded-xl border border-[#c7e9d8] bg-[#eefaf4] px-3 py-2 text-[11px] font-bold text-[#1d7a54] shadow-sm">
            ✓ 90 tests passing
          </span>

          <div className="min-h-[4.35rem] pl-[7.1rem] pt-1">
            <p className="student-name font-serif text-[1.65rem] italic leading-tight text-[#211f2e]">{profile.shortName}</p>
            <p className="student-degree mt-1 text-[11px] leading-4 text-[#6b6879]">B.S. Data Science & Applications</p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <InfoTile label="Level" value={education.status[0]} />
            <InfoTile label="CGPA" value={education.cgpa} />
            <InfoTile label="Builds" value="Full-stack · ML" />
            <InfoTile label="Based in" value="Maharashtra" />
          </div>

          <div className="mt-4 flex items-end justify-between border-t border-[#eeeaf3] pt-3">
            <p className="font-mono text-[9px] uppercase tracking-[0.13em] text-[#777188]">BS · Data Science · 2024</p>
            <div className="barcode h-7 w-[4.5rem] opacity-60" aria-hidden />
          </div>
        </div>
      </div>

      <span className="badge-sticker badge-sticker-butter absolute -bottom-4 right-1 z-10 rotate-2 rounded-xl border border-[#f1dfaa] bg-[#fffaea] px-3 py-2 text-[11px] font-bold text-[#94700a] shadow-sm sm:right-0">
        Kaggle 0.82629 🏅
      </span>
    </div>
  )
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="info-tile rounded-xl bg-[#f8f6fb] px-3 py-2.5">
      <p className="info-label text-[9px] font-bold uppercase tracking-[0.12em] text-[#898498]">{label}</p>
      <p className="info-value mt-1 text-[11px] font-semibold leading-4 text-[#302d3e]">{value}</p>
    </div>
  )
}

function TechStack() {
  return (
    <section className="tech-stack-section border-y border-[#eeeaf3] bg-white/60 py-8 sm:py-10" aria-label="Technology stack">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7c68ee]">My toolkit</p>
            <h2 className="mt-1 font-serif text-2xl italic text-[#211f2e] sm:text-[1.75rem]">Tools I build with</h2>
          </div>
          <p className="hidden pb-1 text-xs text-[#898498] sm:block">From first query to finished product</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {skills.map((group) => (
            <div className="tech-group rounded-2xl border border-[#eeeaf3] bg-white/90 p-3.5 transition hover:-translate-y-0.5 hover:border-[#d8cff7] hover:shadow-[0_12px_28px_-20px_rgba(84,64,196,0.5)] sm:p-4" key={group.group}>
              <h3 className="mb-3 text-[10px] font-bold uppercase leading-4 tracking-[0.1em] text-[#777188]">{group.group}</h3>
              <ul className="flex flex-wrap gap-1.5">
                {group.items.slice(0, 3).map((item) => (
                  <li className="tech-chip rounded-full bg-[#f4f1ff] px-2.5 py-1 text-[10px] font-semibold leading-4 text-[#5440c4] sm:text-[11px]" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Hero() {
  const [lineIndex, setLineIndex] = useState(0)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduceMotion.matches) return
    const timer = window.setInterval(() => {
      setLineIndex((index) => (index + 1) % rotatingLines.length)
    }, 2600)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <>
      <section id="home" aria-label="Introduction" className="hero-shell relative isolate overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32">
        <div className="hero-dot-grid absolute inset-0 -z-10" aria-hidden />
        <div className="hero-blob hero-blob-lavender absolute -right-36 -top-32 -z-10 h-[28rem] w-[28rem] rounded-full" aria-hidden />
        <div className="hero-blob hero-blob-peach absolute -left-44 top-[38%] -z-10 h-[25rem] w-[25rem] rounded-full" aria-hidden />
        <Sparkle className="absolute right-[12%] top-32 h-3 w-3 text-[#ec7f58]/70" />
        <Sparkle className="absolute left-[46%] top-[67%] h-2.5 w-2.5 text-[#7c68ee]/50" />

        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-8 md:grid-cols-[1.1fr_0.9fr] md:gap-8 lg:gap-10">
          <div className="relative z-10 min-w-0">
            <p className="hero-status mb-5 inline-flex items-center gap-2 rounded-full border border-[#ebe6f4] bg-white/85 px-3.5 py-2 text-xs font-semibold text-[#5440c4] shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-[#ec7f58]" aria-hidden />
              Open to internships · 2026
            </p>

            <h1 className="hero-heading max-w-[12ch] text-[3.1rem] font-extrabold leading-[0.98] tracking-[-0.06em] text-[#211f2e] sm:text-6xl lg:text-[4.25rem]">
              Hi, I’m{' '}
              <span className="hero-name relative inline-block font-serif font-normal italic tracking-[-0.035em] text-[#7c68ee]">
                Anjali
                <svg className="hero-underline absolute -bottom-2 left-0 h-3 w-full text-[#fbbfa3]" viewBox="0 0 170 14" preserveAspectRatio="none" aria-hidden>
                  <path d="M3 10C37 2 88 4 125 8c17 2 29 1 42-3" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="5" />
                </svg>
              </span>
              <span className="hero-wave ml-1 inline-block origin-[70%_75%]" aria-hidden>👋</span>
            </h1>

            <p className="hero-build mt-7 min-h-8 text-lg font-semibold tracking-tight text-[#302d3e] sm:text-xl">
              <span className="sr-only">I build secure full-stack apps, tested REST APIs, ML &amp; NLP pipelines, and data-driven dashboards.</span>
              <span aria-hidden>I build </span>
              <span className="hero-rotating-line inline-block text-[#5440c4]" aria-hidden key={lineIndex}>
                {rotatingLines[lineIndex]}
              </span>
            </p>

            <p className="hero-copy mt-4 max-w-[38rem] text-sm leading-7 text-[#6b6879] sm:text-base sm:leading-7">
              IIT Madras Data Science student. I write FastAPI and Flask backends with JWT and role-based access, React and Vue.js frontends, and machine learning models, and I test what I ship.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-2.5">
              <a href="#projects" className="hero-work-button inline-flex items-center gap-2 rounded-full bg-[#211f2e] px-5 py-3 text-sm font-bold text-white shadow-[0_10px_25px_-15px_rgba(33,31,46,0.6)] transition hover:-translate-y-0.5 hover:bg-[#373345] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7c68ee]">
                See my work <ArrowRight className="h-4 w-4" />
              </a>
              <a href={profile.resumeUrl} download className="hero-resume-button inline-flex items-center gap-2 rounded-full border border-[#e4deed] bg-white px-4 py-3 text-sm font-semibold text-[#302d3e] shadow-sm transition hover:-translate-y-0.5 hover:border-[#c3b5fb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7c68ee]">
                <Download className="h-4 w-4 text-[#7c68ee]" /> Resume
              </a>
              <span className="mx-1 hidden h-7 w-px bg-[#e4deed] sm:block" aria-hidden />
              <div className="flex shrink-0 items-center gap-2">
                <a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub profile" className="hero-social-button grid h-11 w-11 place-items-center rounded-full border border-[#e4deed] bg-white text-[#5440c4] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f4f1ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7c68ee]">
                  <GithubIcon className="h-[18px] w-[18px]" />
                </a>
                <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile" className="hero-social-button grid h-11 w-11 place-items-center rounded-full border border-[#e4deed] bg-white text-[#5440c4] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f4f1ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7c68ee]">
                  <LinkedinIcon className="h-[18px] w-[18px]" />
                </a>
              </div>
            </div>

            <div className="hero-proof mt-8 grid max-w-[37rem] grid-cols-2 overflow-hidden rounded-2xl border border-[#e8e3ef] bg-white/75 sm:grid-cols-4">
              {proof.map((item, index) => (
                <div key={item.label} className={`hero-proof-cell min-w-0 px-3 py-3.5 sm:px-3.5 ${index % 2 === 1 ? 'border-l border-[#e8e3ef] sm:border-l-0' : ''} ${index > 1 ? 'border-t border-[#e8e3ef] sm:border-t-0' : ''} ${index > 0 ? 'sm:border-l sm:border-[#e8e3ef]' : ''}`}>
                  <p className="hero-proof-value font-serif text-[1.45rem] leading-none text-[#5440c4] sm:text-[1.55rem]">
                    <CountUp value={item.value} />
                  </p>
                  <p className="mt-2 text-[10px] font-bold leading-4 text-[#302d3e] sm:text-[11px]">{item.label}</p>
                  <p className="mt-0.5 text-[9px] leading-3.5 text-[#898498]">{item.note}</p>
                </div>
              ))}
            </div>

            <p className="hero-location mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-[#777188]">
              <MapPin className="h-3.5 w-3.5 text-[#ec7f58]" aria-hidden /> {profile.location}
            </p>
          </div>

          <div className="relative z-10 min-w-0 px-1 sm:px-4 md:px-0">
            <StudentBadge />
          </div>
        </div>
      </section>
      <TechStack />
    </>
  )
}
