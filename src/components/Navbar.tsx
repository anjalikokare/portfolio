import { useEffect, useState } from 'react'
import { Menu, Moon, Sparkles, Sun, X } from 'lucide-react'
import { navItems, profile } from '../data/portfolio'

const sectionIds = navItems.map((item) => item.id)

function useActiveSection() {
  const [active, setActive] = useState(sectionIds[0])

  useEffect(() => {
    const update = () => {
      const marker = window.scrollY + 120
      let current = sectionIds[0]
      for (const id of sectionIds) {
        const section = document.getElementById(id)
        if (section && section.offsetTop <= marker) current = id
      }
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
        current = sectionIds[sectionIds.length - 1]
      }
      setActive(current)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return active
}

export default function Navbar() {
  const active = useActiveSection()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
      setScrolled(window.scrollY > 8)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <>
      <div className="scroll-progress" aria-hidden>
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>
      <header className="fixed inset-x-0 top-3 z-50 px-3 sm:px-5">
        <nav
          aria-label="Main"
          className={`nav-pill relative mx-auto flex h-[3.75rem] max-w-6xl items-center justify-between gap-2 rounded-full border border-white/80 bg-white/[0.88] px-3 backdrop-blur-xl transition-shadow duration-300 sm:h-16 sm:px-5 ${
            scrolled ? 'shadow-[0_12px_34px_-18px_rgba(33,31,46,0.28)]' : 'shadow-[0_5px_20px_-14px_rgba(33,31,46,0.14)]'
          }`}
        >
          <a href="#home" className="group flex min-w-0 shrink-0 items-center gap-2.5 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7c68ee]">
            <span aria-hidden className="brand-mark relative grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-xl font-serif text-[17px] font-semibold italic leading-none text-white shadow-sm transition-transform group-hover:-rotate-6">
              ak
              <Sparkles className="absolute right-[3px] top-[3px] h-[9px] w-[9px] fill-[#ffe6da] text-[#ffe6da]" />
            </span>
            <span className="nav-brand-name hidden text-[13px] font-bold tracking-[-0.02em] text-[#211f2e] sm:block">{profile.name}</span>
            <span className="nav-brand-name text-[13px] font-bold tracking-[-0.02em] text-[#211f2e] sm:hidden">Anjali Kokare</span>
          </a>

          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 xl:flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? 'location' : undefined}
                  className={`block whitespace-nowrap rounded-full px-2.5 py-2 text-[11px] font-semibold transition-colors 2xl:px-3 2xl:text-xs ${
                    active === item.id ? 'bg-[#f4f1ff] text-[#5440c4]' : 'text-[#777188] hover:bg-[#faf8fd] hover:text-[#211f2e]'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => setDark((value) => !value)}
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-pressed={dark}
              className="nav-theme-toggle grid h-10 w-10 place-items-center rounded-full border border-[#e9e5ee] bg-white text-[#5440c4] transition hover:-translate-y-0.5 hover:bg-[#f4f1ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7c68ee]"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <a href="#contact" className="hidden rounded-full bg-[#211f2e] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#373345] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7c68ee] sm:inline-flex">
              Let’s Connect
            </a>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
              className="grid h-10 w-10 place-items-center rounded-full border border-[#e9e5ee] bg-white text-[#211f2e] transition hover:bg-[#f8f6fb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7c68ee] xl:hidden"
            >
              {open ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
            </button>
          </div>

          <div
            id="mobile-menu"
            className={`mobile-menu absolute inset-x-0 top-[calc(100%+0.6rem)] overflow-hidden rounded-[1.5rem] border border-[#eeeaf3] bg-white/95 shadow-[0_22px_50px_-25px_rgba(33,31,46,0.32)] backdrop-blur-xl transition-[opacity,transform,visibility] duration-200 xl:hidden ${
              open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
            }`}
            aria-hidden={!open}
          >
            <ul className="grid grid-cols-2 gap-1 p-3 sm:grid-cols-3">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    tabIndex={open ? 0 : -1}
                    aria-current={active === item.id ? 'location' : undefined}
                    className={`block rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#7c68ee] ${
                      active === item.id ? 'bg-[#f4f1ff] text-[#5440c4]' : 'text-[#6b6879] hover:bg-[#faf8fd] hover:text-[#211f2e]'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="col-span-2 sm:col-span-3">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className="mt-1 block rounded-xl bg-[#211f2e] px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-[#373345] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7c68ee]"
                >
                  Let’s Connect
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  )
}
