// Backend tests for api/contact.ts. Run: npm run test:api
import { test, beforeEach } from 'node:test'
import assert from 'node:assert/strict'
import { POST, validate } from '../api/contact.ts'

let ipCounter = 0
const req = (body: unknown, ip = `10.0.0.${++ipCounter}`) =>
  new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': ip },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  })

const good = { name: 'Recruiter', email: 'hr@example.com', message: 'Hi Anjali, we would love to talk about an internship.' }
const realFetch = globalThis.fetch

beforeEach(() => {
  process.env.RESEND_API_KEY = 're_test'
  process.env.CONTACT_TO_EMAIL = 'me@example.com'
  globalThis.fetch = realFetch
})

test('validate accepts a good message and trims it', () => {
  const r = validate({ ...good, name: '  Recruiter  ' })
  assert.equal(r.ok, true)
  if (r.ok) assert.equal(r.data.name, 'Recruiter')
})

test('validate rejects missing fields, bad email, short and long messages', () => {
  assert.equal(validate({}).ok, false)
  assert.equal(validate({ ...good, email: 'not-an-email' }).ok, false)
  assert.equal(validate({ ...good, message: 'hi' }).ok, false)
  assert.equal(validate({ ...good, message: 'x'.repeat(4001) }).ok, false)
  assert.equal(validate({ ...good, name: 123 }).ok, false)
})

test('invalid JSON returns 400', async () => {
  const res = await POST(req('{nope'))
  assert.equal(res.status, 400)
})

test('honeypot submissions are silently accepted and never emailed', async () => {
  let called = false
  globalThis.fetch = (async () => { called = true; return new Response('{}') }) as typeof fetch
  const res = await POST(req({ ...good, website: 'spam.example' }))
  assert.equal(res.status, 200)
  assert.equal(called, false)
})

test('missing configuration returns 503 with a mailto fallback', async () => {
  delete process.env.RESEND_API_KEY
  const res = await POST(req(good))
  assert.equal(res.status, 503)
  assert.equal((await res.json()).fallback, 'mailto')
})

test('sends the email through Resend with reply_to and escaped HTML', async () => {
  let sent: { url: string; init: RequestInit } | null = null
  globalThis.fetch = (async (url: string, init: RequestInit) => {
    sent = { url, init }
    return new Response(JSON.stringify({ id: 'email_1' }), { status: 200 })
  }) as typeof fetch
  const res = await POST(req({ ...good, message: 'Hello <script>alert(1)</script> there!' }))
  assert.equal(res.status, 200)
  assert.ok(sent)
  const s = sent as unknown as { url: string; init: RequestInit }
  assert.equal(s.url, 'https://api.resend.com/emails')
  assert.equal((s.init.headers as Record<string, string>).Authorization, 'Bearer re_test')
  const payload = JSON.parse(String(s.init.body))
  assert.deepEqual(payload.to, ['me@example.com'])
  assert.equal(payload.reply_to, 'hr@example.com')
  assert.ok(!payload.html.includes('<script>'))
  assert.ok(payload.html.includes('&lt;script&gt;'))
})

test('provider failure returns 502 with a fallback', async () => {
  globalThis.fetch = (async () => new Response('bad key', { status: 401 })) as typeof fetch
  const res = await POST(req(good))
  assert.equal(res.status, 502)
})

test('rate limit kicks in after 5 messages from one IP', async () => {
  globalThis.fetch = (async () => new Response('{}', { status: 200 })) as typeof fetch
  const statuses: number[] = []
  for (let i = 0; i < 6; i++) statuses.push((await POST(req(good, '203.0.113.9'))).status)
  assert.deepEqual(statuses, [200, 200, 200, 200, 200, 429])
})
