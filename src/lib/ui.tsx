import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react'
import {
  Award, BarChart3, Brain, Cloud, Code2, Database, GraduationCap, Layers, LayoutDashboard,
  LineChart, Radio, Server, ShieldCheck, Trophy, Wrench, type LucideIcon,
} from 'lucide-react'
import type { Accent } from '../data/portfolio'

/** Full class strings per accent, written out so Tailwind can see them. */
export const accentStyles: Record<Accent, { soft: string; chip: string; text: string; ring: string; dot: string; grad: string }> = {
  lavender: {
    soft: 'bg-lavender-50', chip: 'bg-lavender-100 text-lavender-700', text: 'text-lavender-700',
    ring: 'ring-lavender-300', dot: 'bg-lavender-500', grad: 'from-lavender-100 to-lavender-50',
  },
  peach: {
    soft: 'bg-peach-50', chip: 'bg-peach-100 text-peach-700', text: 'text-peach-700',
    ring: 'ring-peach-300', dot: 'bg-peach-500', grad: 'from-peach-100 to-peach-50',
  },
  mint: {
    soft: 'bg-mint-50', chip: 'bg-mint-100 text-mint-700', text: 'text-mint-700',
    ring: 'ring-mint-300', dot: 'bg-mint-500', grad: 'from-mint-100 to-mint-50',
  },
  sky: {
    soft: 'bg-sky-50', chip: 'bg-sky-100 text-sky-700', text: 'text-sky-700',
    ring: 'ring-sky-300', dot: 'bg-sky-500', grad: 'from-sky-100 to-sky-50',
  },
  butter: {
    soft: 'bg-butter-50', chip: 'bg-butter-100 text-butter-700', text: 'text-butter-700',
    ring: 'ring-butter-300', dot: 'bg-butter-500', grad: 'from-butter-100 to-butter-50',
  },
}

export const icons: Record<string, LucideIcon> = {
  Award, BarChart3, Brain, Cloud, Code2, Database, GraduationCap, Layers, LayoutDashboard,
  LineChart, Radio, Server, ShieldCheck, Trophy, Wrench,
}

/** Fades children in once they scroll into view. */
export function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }: {
  children: ReactNode; delay?: number; className?: string; as?: 'div' | 'li' | 'article'
}) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect() } },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag
      ref={ref as never}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  )
}

export function Section({ id, eyebrow, title, intro, children, className = '' }: {
  id: string; eyebrow: string; title: ReactNode; intro?: string; children: ReactNode; className?: string
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`relative py-16 sm:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mb-10 max-w-2xl sm:mb-12">
          <p className="mb-3 inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-lavender-700">
            <span className="h-1.5 w-1.5 rounded-full bg-peach-500" aria-hidden />
            {eyebrow}
          </p>
          <h2 id={`${id}-title`} className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          {intro && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{intro}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  )
}

export function Chip({ children, accent }: { children: ReactNode; accent?: Accent }) {
  const cls = accent ? accentStyles[accent].chip : 'bg-white text-ink ring-1 ring-line'
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${cls}`}>
      {children}
    </span>
  )
}

/** Animates a number from 0 to its value the first time it scrolls into view.
 *  Keeps any prefix/suffix and formatting, e.g. "35+", "₹6.35L", "6,465", "0.82629". */
export function CountUp({ value, className = '' }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const match = value.match(/^([^\d]*)([\d,]*\.?\d+)(.*)$/)
  const [shown, setShown] = useState(value)

  useEffect(() => {
    const el = ref.current
    if (!el || !match) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const [, pre, num, post] = match
    const target = parseFloat(num.replace(/,/g, ''))
    const decimals = num.includes('.') ? num.split('.')[1].length : 0
    const commas = num.includes(',')
    const fmt = (n: number) => {
      const s = n.toFixed(decimals)
      return commas ? Number(s).toLocaleString('en-IN') : s
    }
    setShown(pre + fmt(0) + post)
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const dur = 1100
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / dur)
        const eased = 1 - Math.pow(1 - p, 3)
        setShown(p < 1 ? pre + fmt(target * eased) + post : value)
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{value}</span>
      <span aria-hidden className="tabular-nums">{shown}</span>
    </span>
  )
}

/** Brand marks (Lucide no longer ships brand icons). */
export function GithubIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  )
}

export function LinkedinIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}

/** Small hand-drawn style sparkle used as a decorative accent. */
export function Sparkle({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M12 0c.6 5.6 2.4 9.4 12 12-9.6 2.6-11.4 6.4-12 12-.6-5.6-2.4-9.4-12-12C9.6 9.4 11.4 5.6 12 0Z" />
    </svg>
  )
}
