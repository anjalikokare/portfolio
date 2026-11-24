import { useEffect, useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { navItems, profile } from '../data/portfolio'

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.35
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= y) current = id
      }
      // Bottom of the page: highlight the last section.
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) current = ids[ids.length - 1]
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids])
  return active
}

const ids = navItems.map((n) => n.id)

export default function Navbar() {
  const active = useActiveSection(ids)
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
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
      setScrolled(window.scrollY > 8)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-line/80 bg-paper/80 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      {/* Scroll progress */}
      <div
        className="absolute left-0 top-0 h-[3px] bg-gradient-to-r from-lavender-500 via-peach-500 to-mint-500 transition-[width] duration-150"
        style={{ width: `${progress * 100}%` }}
        aria-hidden
      />
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#home" className="group flex items-center gap-2.5 font-semibold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-ink font-serif text-lg italic text-paper transition-transform group-hover:-rotate-6">
            a
          </span>
          <span className="text-sm sm:text-[15px]">{profile.name}</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? 'true' : undefined}
                className={`relative rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors ${
                  active === item.id ? 'bg-lavender-100 text-lavender-700' : 'text-muted hover:text-ink'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setDark((value) => !value)}
            aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-muted transition hover:-translate-y-0.5 hover:text-ink"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            href="#contact"
            className="hidden rounded-full bg-ink px-4 py-2 text-[13px] font-semibold text-paper shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:inline-flex"
          >
            Let’s Connect
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-line bg-paper/95 backdrop-blur-xl transition-[max-height] duration-300 lg:hidden ${
          open ? 'max-h-[32rem] border-b' : 'max-h-0'
        }`}
      >
        <ul className="mx-auto grid max-w-6xl gap-1 px-5 pb-5 pt-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className={`block rounded-xl px-4 py-2.5 text-sm font-medium ${
                  active === item.id ? 'bg-lavender-100 text-lavender-700' : 'text-ink hover:bg-white'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              className="mt-2 block rounded-xl bg-ink px-4 py-2.5 text-center text-sm font-semibold text-paper"
            >
              Let’s Connect
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
