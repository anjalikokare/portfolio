# Anjali Rameshwar Kokare — Portfolio

A personal portfolio built with **React 19 + TypeScript + Vite + Tailwind CSS v4**.
All content comes from one data file, so updating the site doesn't require touching components.

## Run it locally

Requires Node.js 18+ (20 or 22 LTS recommended).

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the production build locally
```

## Where to edit things

| What | Where |
| --- | --- |
| All text, numbers, projects, skills, achievements | `src/data/portfolio.ts` |
| GitHub / LinkedIn / LeetCode / Kaggle URLs | `links` in `src/data/portfolio.ts` |
| Project GitHub links | `github` field of each project in `src/data/portfolio.ts` |
| Resume PDF (Download Resume button) | replace `public/Anjali_Kokare_Resume.pdf` |
| Certificate images | `public/certificates/` + `achievements.certificates` in `portfolio.ts` |
| Certificate verification links | `verifyUrl` on each certificate (search `TODO: Add certificate verification URL`) |
| Profile photo (optional) | put it in `public/` and set `profile.profileImage` |
| Colours, fonts, animations | `src/index.css` (`@theme` block) |
| Page title, SEO and Open Graph tags | `index.html` |
| Favicon | `public/favicon.svg` |

Search the project for `TODO:` to find every placeholder:

- `TODO: Add image` — NPTEL certificate images (not in the files provided), Open Graph preview image (`public/og-image.png`, 1200×630).
- `TODO: Add certificate verification URL` — add `verifyUrl` to any certificate.
- `TODO: Replace with your deployed URL` — canonical URL in `index.html`.
- `TODO: Add link` — shown only if a project has no `github` link.

## Contact form backend

`api/contact.ts` is a **Vercel Function** at `POST /api/contact`. It:

- validates name, email and message (length limits, email format),
- ignores bots through a hidden honeypot field and rate-limits each IP (5 messages / 10 min),
- emails the message to you through [Resend](https://resend.com), with **Reply-To** set to the sender,
  so you can answer straight from your inbox.

If the backend isn't configured or is unreachable, the form says so and opens the visitor's own
email app instead. It never shows "sent" unless the server confirmed delivery.

**Turn it on (5 minutes, free):**

1. Sign up at [resend.com](https://resend.com) with the email you want messages delivered to.
2. Resend → API Keys → *Create API key* → copy it (starts with `re_`).
3. Vercel → your project → Settings → Environment Variables, add:
   - `RESEND_API_KEY` = your key
   - `CONTACT_TO_EMAIL` = the same email you signed up to Resend with
4. Redeploy (Deployments → ⋯ → Redeploy). Send yourself a test message from the live site.

Resend's test sender (`onboarding@resend.dev`) only delivers to your own Resend email, which is
exactly what a contact form needs. To send from your own domain later, verify it in Resend and set
`CONTACT_FROM_EMAIL`.

Run the backend tests with `npm run test:api` (8 tests). To run site + API together locally:
`npx vercel dev`.

## Project structure

```
src/
  data/portfolio.ts        ← single source of truth for all content
  lib/ui.tsx               ← shared bits: Section, Reveal, Chip, accent colours, brand icons
  components/
    Navbar.tsx             ← sticky nav, active-section indicator, scroll progress, mobile menu
    Hero.tsx               ← intro, CTA buttons, highlights, code-style profile card
    About.tsx
    Experience.tsx         ← MentorConnect, Smart India Hackathon, Skill Nexis
    Projects.tsx           ← data-driven cards with expandable details
    Skills.tsx
    Education.tsx
    Achievements.tsx       ← achievement cards + certificate gallery with modal
    Contact.tsx            ← interests strip + contact section
  App.tsx                  ← page layout, footer, back-to-top button
api/
  contact.ts               ← contact form backend (Vercel Function)
tests/
  contact.test.ts          ← backend tests (npm run test:api)
public/
  Anjali_Kokare_Resume.pdf
  certificates/            ← real certificate images
  favicon.svg
```

## Put it on GitHub and Vercel

**1. Push to GitHub** (once): create an empty repo named `portfolio` at
[github.com/new](https://github.com/new) (no README), then in this folder:

```bash
git remote add origin https://github.com/anjalikokare/portfolio.git
git branch -M main
git push -u origin main
```

**2. Deploy on Vercel:** sign in to [vercel.com](https://vercel.com) with GitHub → *Add New → Project* →
import `anjalikokare/portfolio` → **Deploy**. `vercel.json` already sets the build. You'll get a
permanent `https://<name>.vercel.app` link, and every `git push` redeploys automatically.

**3. Turn on the contact form:** add the two environment variables above and redeploy.

**4. After it's live:** put the URL in `index.html` (canonical + `og:image`) and on your resume/LinkedIn.

## Accessibility & performance notes

- Semantic landmarks, skip link, visible focus rings, `aria-expanded` on menus and toggles, alt text on images.
- Animations respect `prefers-reduced-motion`.
- Fonts are self-hosted via Fontsource (no external font requests); certificate images lazy-load.
