import { useState, type FormEvent } from 'react'
import { AlertCircle, Check, CheckCircle2, Copy, Loader2, Mail, Send } from 'lucide-react'
import { interests, links, profile } from '../data/portfolio'
import { GithubIcon, LinkedinIcon, Reveal, Section, Sparkle } from '../lib/ui'

export function Interests() {
  return (
    <section aria-labelledby="interests-title" className="py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="rounded-3xl border border-line bg-white p-7 sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-sm">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-lavender-700">Learning & interests</p>
              <h2 id="interests-title" className="mt-2 text-2xl font-bold tracking-tight">Areas I want to go deeper in</h2>
            </div>
            <ul className="flex max-w-2xl flex-wrap gap-2.5">
              {interests.map((it, i) => (
                <li
                  key={it}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5 ${
                    ['bg-lavender-50 text-lavender-700', 'bg-peach-50 text-peach-700', 'bg-mint-50 text-mint-700', 'bg-sky-50 text-sky-700'][i % 4]
                  }`}
                >
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const socials = [
  { label: 'GitHub', href: links.github, icon: <GithubIcon className="h-5 w-5" /> },
  { label: 'LinkedIn', href: links.linkedin, icon: <LinkedinIcon className="h-5 w-5" /> },
  { label: 'LeetCode', href: links.leetcode, icon: <span className="font-mono text-sm font-bold">LC</span> },
  { label: 'Kaggle', href: links.kaggle, icon: <span className="font-mono text-sm font-bold">K</span> },
]

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '', website: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error' | 'fallback'>('idle')
  const [error, setError] = useState('')

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard unavailable; the email is still visible on the page */
    }
  }

  const emailDraftUrl = () => {
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    return `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  /**
   * Sends the message to the backend at /api/contact (api/contact.ts, a Vercel Function).
   * If the backend isn't configured or reachable, it offers an email-app link instead.
   * It never shows "sent" unless the server confirmed delivery.
   */
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', message: '', website: '' })
        return
      }
      if (res.status === 400 || res.status === 429) {
        setStatus('error')
        setError(data.error || 'Please check your message and try again.')
        return
      }
      if (res.status === 503 || data.fallback === 'mailto') {
        setStatus('fallback')
        setError(data.error || 'The message service is unavailable. Please email me directly.')
        return
      }
      throw new Error('backend unavailable')
    } catch {
      setStatus('fallback')
      setError('Could not reach the message service. Please email me directly.')
    }
  }

  const input = 'w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm outline-none transition placeholder:text-muted/70 focus:border-lavender-300 focus:ring-4 focus:ring-lavender-100'

  return (
    <Section id="contact" eyebrow="Contact" title={<>Let’s build something <span className="font-serif font-normal italic text-lavender-700">meaningful.</span></>}>
      <div className="relative grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <Sparkle className="absolute -top-16 right-4 h-6 w-6 animate-float text-peach-300" />
        <Reveal>
          <div className="h-full rounded-3xl bg-ink p-6 text-paper sm:p-10">
            <p className="text-lg leading-relaxed text-paper/80">
              I’m looking for internships and entry-level roles in software engineering, full-stack, data science and ML.
              The fastest way to reach me is email.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-2">
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 break-all rounded-full bg-paper px-4 py-2.5 text-sm font-semibold text-ink transition hover:-translate-y-0.5">
                <Mail className="h-4 w-4 shrink-0" /> {profile.email}
              </a>
              <button type="button" onClick={copy} aria-label="Copy email address" className="grid h-10 w-10 place-items-center rounded-full border border-paper/20 transition hover:bg-paper/10">
                {copied ? <Check className="h-4 w-4 text-mint-300" /> : <Copy className="h-4 w-4" />}
              </button>
              <span role="status" className="sr-only">{copied ? 'Email copied' : ''}</span>
            </div>
            <ul className="mt-8 grid grid-cols-2 gap-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl border border-paper/15 px-4 py-3 text-sm font-medium transition hover:-translate-y-0.5 hover:bg-paper/10">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-paper/10">{s.icon}</span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <form onSubmit={onSubmit} className="relative h-full rounded-3xl border border-line bg-white p-6 sm:p-10" aria-describedby="form-note">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5 text-sm font-medium">
                Name
                <input required className={input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" autoComplete="name" />
              </label>
              <label className="grid gap-1.5 text-sm font-medium">
                Email
                <input required type="email" className={input} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" autoComplete="email" />
              </label>
            </div>
            {/* Honeypot: hidden from people, bots fill it in and get ignored */}
            <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
              <label>
                Website
                <input tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
              </label>
            </div>
            <label className="mt-4 grid gap-1.5 text-sm font-medium">
              Message
              <textarea required rows={5} className={`${input} resize-none`} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Hi Anjali, I’d love to talk about…" />
            </label>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-lavender-500 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-lavender-700 disabled:cursor-wait disabled:opacity-70 sm:w-auto"
            >
              {status === 'sending' ? <>Sending <Loader2 className="h-4 w-4 animate-spin" /></> : <>Send Message <Send className="h-4 w-4" /></>}
            </button>
            <div role="status" aria-live="polite" className="mt-4 min-h-[1.25rem]">
              {status === 'sent' && (
                <p className="flex items-start gap-2 rounded-2xl bg-mint-50 px-4 py-3 text-sm font-medium text-mint-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> Thanks! Your message reached me. I’ll reply by email soon.
                </p>
              )}
              {status === 'error' && (
                <p className="flex items-start gap-2 rounded-2xl bg-peach-50 px-4 py-3 text-sm font-medium text-peach-700">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}
                </p>
              )}
              {status === 'fallback' && (
                <p className="flex items-start gap-2 rounded-2xl bg-sky-50 px-4 py-3 text-sm font-medium text-sky-700">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0" /> {error}
                  <a className="ml-1 shrink-0 underline underline-offset-2" href={emailDraftUrl()}>Open email</a>
                </p>
              )}
            </div>
            <p id="form-note" className="mt-1 text-xs text-muted">Messages go straight to my inbox. You can also email me directly.</p>
          </form>
        </Reveal>
      </div>
    </Section>
  )
}
