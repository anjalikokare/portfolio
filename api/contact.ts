/**
 * POST /api/contact — portfolio contact form backend (Vercel Function).
 *
 * Validates the message, blocks basic spam (honeypot field + per-IP rate limit),
 * then emails it to you through Resend (https://resend.com, free tier is enough).
 *
 * Environment variables (set them in Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY     required  your Resend API key (starts with "re_")
 *   CONTACT_TO_EMAIL   required  where messages are delivered, e.g. your Gmail
 *   CONTACT_FROM_EMAIL optional  sender; defaults to Resend's test sender "onboarding@resend.dev",
 *                                which can only deliver to the email your Resend account uses.
 *
 * If the variables are missing the endpoint answers 503, and the site offers a
 * prefilled email-app link instead of pretending a message was sent.
 */

type Payload = { name?: unknown; email?: unknown; message?: unknown; website?: unknown }

const LIMITS = { name: 80, email: 120, message: 4000 }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Best-effort rate limit: 5 messages per IP per 10 minutes, per warm function instance.
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function rateLimited(ip: string, now = Date.now()): boolean {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > MAX_PER_WINDOW
}

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  })

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

export function validate(body: Payload): { ok: true; data: { name: string; email: string; message: string } } | { ok: false; error: string } {
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const message = typeof body.message === 'string' ? body.message.trim() : ''
  if (!name || !email || !message) return { ok: false, error: 'Please fill in your name, email and message.' }
  if (name.length > LIMITS.name) return { ok: false, error: 'Name is too long.' }
  if (email.length > LIMITS.email || !EMAIL_RE.test(email)) return { ok: false, error: 'Please enter a valid email address.' }
  if (message.length < 10) return { ok: false, error: 'Message is a little short. Add a few more words.' }
  if (message.length > LIMITS.message) return { ok: false, error: `Message is too long (max ${LIMITS.message} characters).` }
  return { ok: true, data: { name, email, message } }
}

export async function POST(request: Request): Promise<Response> {
  let body: Payload
  try {
    body = (await request.json()) as Payload
  } catch {
    return json(400, { error: 'Invalid request.' })
  }

  // Honeypot: real visitors never see or fill the "website" field.
  if (typeof body.website === 'string' && body.website.trim() !== '') return json(200, { ok: true })

  const ip = (request.headers.get('x-forwarded-for') ?? 'unknown').split(',')[0].trim()
  if (rateLimited(ip)) return json(429, { error: 'Too many messages. Please try again in a few minutes.' })

  const v = validate(body)
  if (!v.ok) return json(400, { error: v.error })

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  if (!apiKey || !to) {
    console.error('Contact form is missing RESEND_API_KEY or CONTACT_TO_EMAIL')
    return json(503, { error: 'Email delivery is not configured yet. Please email me directly.', fallback: 'mailto' })
  }

  const { name, email, message } = v.data
  const from = process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>'

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Portfolio message from ${name}`,
      text: `${message}\n\n— ${name} <${email}>`,
      html: `<p style="white-space:pre-wrap;font-family:system-ui,sans-serif">${escapeHtml(message)}</p>
             <p style="font-family:system-ui,sans-serif;color:#666">— ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>`,
    }),
  }).catch(() => null)

  if (!res || !res.ok) {
    const detail = res ? await res.text().catch(() => '') : 'network error'
    console.error('Resend send failed', res?.status, detail.slice(0, 300))
    return json(502, { error: 'Could not send right now. Please email me directly.', fallback: 'mailto' })
  }
  return json(200, { ok: true })
}

export function GET(): Response {
  return json(405, { error: 'Use POST.' })
}
