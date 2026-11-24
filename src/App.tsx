import { useEffect, useState } from 'react'
import { ArrowUp, Heart } from 'lucide-react'
import Navbar from './components/Navbar'
import Hero, { TechMarquee } from './components/Hero'
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
    <footer className="border-t border-line py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 text-sm text-muted sm:flex-row sm:px-8">
        <p>© 2026 {profile.name}</p>
        <p className="inline-flex items-center gap-1.5">
          Built with React + TypeScript <Heart className="h-3.5 w-3.5 fill-peach-300 text-peach-500" aria-hidden />
        </p>
        <div className="flex items-center gap-2">
          <a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="grid h-9 w-9 place-items-center rounded-full hover:bg-white hover:text-ink"><GithubIcon /></a>
          <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid h-9 w-9 place-items-center rounded-full hover:bg-white hover:text-ink"><LinkedinIcon /></a>
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
        <TechMarquee />
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
