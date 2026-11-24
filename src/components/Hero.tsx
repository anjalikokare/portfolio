import { ArrowDown, Download, MapPin } from 'lucide-react'
import { heroHighlights, links, profile } from '../data/portfolio'
import { GithubIcon, LinkedinIcon } from '../lib/ui'

function IdentityCard() {
  return (
    <div className="relative mx-auto w-full max-w-[29rem]" aria-label="Anjali's professional profile card">
      <div className="identity-card relative isolate min-h-[31rem] overflow-hidden rounded-[2.25rem] border border-white/10 bg-[#171c2b] shadow-[0_40px_100px_-45px_rgba(0,0,0,0.9)] sm:min-h-[35rem]">
        <div className="identity-grid absolute inset-0 opacity-60" aria-hidden />
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border-[40px] border-[#ff7557]/85" aria-hidden />
        <div className="absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-[#b9f29a]" aria-hidden />

        <div className="absolute left-5 right-5 top-5 flex items-center justify-between sm:left-7 sm:right-7 sm:top-7">
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70 backdrop-blur">
            Portfolio / 2026
          </span>
          <span className="flex items-center gap-2 text-xs font-bold text-[#dff8cf]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#b9f29a]" /> Available
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#b9f29a]">Data · Software · ML</p>
          <p className="mt-3 max-w-[10ch] font-serif text-[4.7rem] leading-[0.76] text-white sm:text-[6.4rem]">
            <span className="block">Anjali</span>
          </p>
          <div className="mt-7 flex items-end justify-between border-t border-white/15 pt-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/50">IIT Madras</p>
              <p className="mt-1 text-sm font-medium text-white/85">Data Science & Applications</p>
            </div>
            <div className="grid h-14 w-14 place-items-center rounded-full border border-white/20 bg-white/10 font-serif text-2xl italic text-white backdrop-blur">
              AK
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -left-2 top-[38%] -rotate-3 rounded-2xl border border-black/5 bg-[#ff7557] px-4 py-3 text-sm font-extrabold text-[#171c2b] shadow-xl sm:-left-12">
        90 pytest ✓
      </div>
      <div className="absolute -right-2 top-[29%] rotate-3 rounded-2xl border border-black/5 bg-[#b9f29a] px-4 py-3 text-sm font-extrabold text-[#171c2b] shadow-xl sm:-right-10">
        0.82629 Kaggle
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="home" aria-label="Introduction" className="hero-shell relative isolate min-h-[calc(100svh-4rem)] overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20">
      <div className="hero-noise absolute inset-0 -z-10 opacity-30" aria-hidden />
      <div className="hero-orbit absolute -right-32 top-20 -z-10 h-[26rem] w-[26rem] rounded-full border border-[#ff7557]/20" aria-hidden />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.12fr_0.88fr]">
        <div className="relative z-10">
          <p className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-bold text-white/75 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-[#b9f29a] shadow-[0_0_16px_rgba(185,242,154,0.8)]" />
            Open to internships · 2026
          </p>

          <h1 className="max-w-[11ch] text-[3.35rem] font-extrabold leading-[0.92] tracking-[-0.06em] text-white sm:text-[5.4rem] lg:text-[6.25rem]">
            I turn ideas into
            <span className="mt-2 block font-serif font-normal italic text-[#ff9b80]">working products.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
            I’m <strong className="font-bold text-white">{profile.name}</strong>, an IIT Madras Data Science student
            building secure full-stack applications and practical machine learning systems.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#projects" className="hero-primary inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-sm font-extrabold text-[#171c2b] transition hover:-translate-y-1 hover:shadow-[0_16px_38px_-16px_rgba(185,242,154,0.7)]">
              Explore my work <ArrowDown className="h-4 w-4" />
            </a>
            <a href={profile.resumeUrl} download className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3.5 text-sm font-bold text-white transition hover:-translate-y-1 hover:border-white/40 hover:bg-white/[0.06]">
              <Download className="h-4 w-4" /> Résumé
            </a>
            <a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub profile" className="grid h-12 w-12 place-items-center rounded-full border border-white/15 text-white transition hover:-translate-y-1 hover:bg-white hover:text-[#171c2b]">
              <GithubIcon className="h-5 w-5" />
            </a>
            <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile" className="grid h-12 w-12 place-items-center rounded-full border border-white/15 text-white transition hover:-translate-y-1 hover:bg-[#ff7557] hover:text-white">
              <LinkedinIcon className="h-5 w-5" />
            </a>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4">
            {heroHighlights.slice(0, 4).map((highlight) => (
              <div key={highlight.label} className="min-h-20 bg-[#171c2b]/80 px-3 py-4 backdrop-blur">
                <p className="text-[10px] font-bold uppercase leading-4 tracking-[0.12em] text-white/45">{highlight.label}</p>
              </div>
            ))}
          </div>

          <p className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-white/45">
            <MapPin className="h-3.5 w-3.5" /> {profile.location}
          </p>
        </div>

        <IdentityCard />
      </div>
    </section>
  )
}
