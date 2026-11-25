import { useEffect, useState } from 'react'
import { ArrowRight, ArrowUp, Heart } from 'lucide-react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Education from './components/Education'
import Achievements from './components/Achievements'
import Contact, { Interests } from './components/Contact'
import { links, profile } from './data/portfolio'
import { GithubIcon, LinkedinIcon } from './lib/ui'

function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <a
      href="#home"
      aria-label="Back to top"
      className={`fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-ink text-paper shadow-lg transition-all hover:-translate-y-1 ${
        show ? 'opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
      tabIndex={show ? 0 : -1}
    >
      <ArrowUp className="h-5 w-5" />
    </a>
  )
}

function Footer() {
  return (
    <footer className="site-footer border-t border-line py-8 sm:py-12">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="footer-invite relative overflow-hidden rounded-[1.75rem] border border-[#e9e2f5] bg-gradient-to-br from-[#f4f1ff] via-[#fffaf7] to-[#fff4ee] p-6 sm:rounded-[2rem] sm:p-9">
          <div className="footer-glow absolute -right-14 -top-20 h-52 w-52 rounded-full bg-[#d9d0ff]/60 blur-3xl" aria-hidden />
          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7c68ee]">Thanks for stopping by</p>
              <h2 className="mt-2 font-serif text-3xl italic leading-tight text-[#211f2e] sm:text-4xl">Good things start with a hello.</h2>
              <p className="mt-2 text-sm text-[#6b6879]">I’d love to hear what you’re working on.</p>
            </div>
            <a href="#contact" className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-[#211f2e] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#373345] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7c68ee]">
              Say hello <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="footer-bottom mt-6 flex flex-col items-center justify-between gap-4 text-xs text-muted sm:flex-row">
          <a href="#home" className="flex items-center gap-2.5 rounded-full font-semibold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7c68ee]">
            <span aria-hidden className="brand-mark grid h-8 w-8 place-items-center rounded-[0.7rem] font-serif text-[15px] font-semibold italic leading-none text-white shadow-sm">
              ak
            </span>
            {profile.name}
          </a>
          <p>Built with React + TypeScript <Heart className="inline h-3.5 w-3.5 fill-peach-300 text-peach-500" aria-hidden /> · © 2026</p>
          <div className="flex items-center gap-2">
            <a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="grid h-9 w-9 place-items-center rounded-full border border-line transition hover:border-lavender-300 hover:bg-lavender-50 hover:text-lavender-700"><GithubIcon /></a>
            <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid h-9 w-9 place-items-center rounded-full border border-line transition hover:border-lavender-300 hover:bg-lavender-50 hover:text-lavender-700"><LinkedinIcon /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Achievements />
        <Interests />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
