import { useEffect, useRef, useState } from 'react'
import { ExternalLink, ImageOff, X, ZoomIn } from 'lucide-react'
import { achievements, type Accent, type Certificate } from '../data/portfolio'
import { accentStyles, icons, Reveal, Section } from '../lib/ui'

function CertificateModal({ cert, onClose }: { cert: Certificate | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (cert && !d.open) d.showModal()
    if (!cert && d.open) d.close()
  }, [cert])
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-label={cert ? `${cert.title} certificate` : 'Certificate'}
      className="m-auto w-[min(92vw,900px)] rounded-3xl border border-line bg-white p-0 shadow-2xl backdrop:bg-ink/50 backdrop:backdrop-blur-sm"
    >
      {cert && (
        <div className="p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted">{cert.issuer}</p>
              <p className="text-lg font-bold">{cert.title}</p>
            </div>
            <button type="button" onClick={onClose} aria-label="Close certificate" className="grid h-10 w-10 place-items-center rounded-full border border-line hover:bg-paper">
              <X className="h-5 w-5" />
            </button>
          </div>
          <img src={cert.image} alt={`${cert.title} certificate issued by ${cert.issuer} to Anjali Rameshwar Kokare`} className="max-h-[70vh] w-full rounded-2xl object-contain" />
          {cert.verifyUrl && (
            <a href={cert.verifyUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-lavender-700">
              Verify certificate <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      )}
    </dialog>
  )
}

export default function Achievements() {
  const [active, setActive] = useState<Certificate | null>(null)
  const filters = ['All', 'HackerRank', 'NPTEL', 'Other'] as const
  const [filter, setFilter] = useState<(typeof filters)[number]>('All')
  const certs = achievements.certificates.filter((c) =>
    filter === 'All' ? true
    : filter === 'HackerRank' ? c.issuer.startsWith('HackerRank')
    : filter === 'NPTEL' ? c.issuer.startsWith('NPTEL')
    : !c.issuer.startsWith('HackerRank') && !c.issuer.startsWith('NPTEL'))

  return (
    <Section
      id="achievements"
      eyebrow="Certifications & achievements"
      title={<>Proof of <span className="font-serif font-normal italic text-mint-700">practice</span></>}
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.groups.map((g, i) => {
          const Icon = icons[g.icon]
          const a = accentStyles[g.accent as Accent]
          return (
            <Reveal key={g.title} delay={i * 70} className={g.title === 'NPTEL' ? 'sm:col-span-2' : ''}>
              <div className={`h-full rounded-3xl p-6 ring-1 ring-line transition hover:-translate-y-1 hover:shadow-md ${a.soft}`}>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className={`grid h-10 w-10 place-items-center rounded-xl bg-white ${a.text}`}>
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="font-bold">{g.title}</h3>
                  </div>
                  {'link' in g && g.link && (
                    <a href={g.link} target="_blank" rel="noreferrer" aria-label={`${g.title} profile (opens in new tab)`} className={`${a.text} hover:opacity-70`}>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
                <ul className="mt-4 space-y-2">
                  {g.items.map((it) => (
                    <li key={it} className="flex gap-2.5 text-sm font-medium leading-relaxed">
                      <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${a.dot}`} aria-hidden />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )
        })}
      </div>

      {/* Certificate gallery */}
      <Reveal className="mt-14">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold">Certificate gallery</h3>
            <p className="text-xs text-muted">{achievements.certificates.length} certificates · tap one to view it</p>
          </div>
          <div role="group" aria-label="Filter certificates" className="flex flex-wrap gap-1.5 rounded-full border border-line bg-white p-1">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${filter === f ? 'bg-ink text-paper' : 'text-muted hover:text-ink'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {certs.map((c) => (
            <li key={c.title} className="min-w-0">
              {c.image ? (
                <button
                  type="button"
                  onClick={() => setActive(c)}
                  className="group block w-full overflow-hidden rounded-2xl border border-line bg-white text-left transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-paper">
                    <img src={c.image} alt={`${c.title} certificate from ${c.issuer}`} loading="lazy" className="h-full w-full object-contain p-2 transition duration-500 group-hover:scale-105" />
                    <span className="absolute inset-0 grid place-items-center bg-ink/0 opacity-0 transition group-hover:bg-ink/20 group-hover:opacity-100">
                      <ZoomIn className="h-7 w-7 text-white" aria-hidden />
                    </span>
                  </div>
                  <div className="px-3 py-2.5 sm:px-4 sm:py-3">
                    <p className="line-clamp-2 text-sm font-semibold leading-snug">{c.title}</p>
                    <p className="mt-0.5 text-xs text-muted">{c.issuer}</p>
                  </div>
                </button>
              ) : (
                // TODO: Add image — place the certificate in /public/certificates and set `image` in portfolio.ts
                <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-dashed border-line bg-white/60">
                  <div className="grid aspect-[4/3] place-items-center text-muted">
                    <ImageOff className="h-7 w-7" aria-hidden />
                  </div>
                  <div className="px-3 py-2.5 sm:px-4 sm:py-3">
                    <p className="text-sm font-semibold">{c.title}</p>
                    <p className="text-xs text-muted">Image coming soon</p>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </Reveal>

      <CertificateModal cert={active} onClose={() => setActive(null)} />
    </Section>
  )
}
