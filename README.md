# ✨ Anjali Rameshwar Kokare

<div align="center">

### 🚀 Full-Stack Developer · Data Science Enthusiast · Problem Solver

[![Portfolio](https://img.shields.io/badge/Portfolio-Live-ff6b6b?style=for-the-badge&logo=vercel&logoColor=white)](https://anjalikokare.vercel.app)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/anjalikokare)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/anjalikokare)
[![Email](https://img.shields.io/badge/Email-Say_Hello-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:anjalikokare2004@gmail.com)

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=700&size=24&pause=1000&color=FF6B6B&center=true&vCenter=true&width=650&lines=Building+clean+digital+experiences;Turning+data+into+decisions;Writing+code+with+purpose" alt="Typing introduction" />

</div>

---

## 🌈 About the Project

A modern, responsive developer portfolio with expressive typography, smooth reveals, interactive project cards, certificate galleries, and a working contact form.

> Built to feel premium, load fast, and stay easy to customize.

## 🧰 Tech Stack

<div align="center">

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

## 🎨 Highlights

| Section | What it Includes |
|:--|:--|
| 🏠 Hero | Profile introduction, highlights, resume and social CTAs |
| 👩‍💻 About | Personal summary and career focus |
| 💼 Experience | Internships and real-world project work |
| 🛠️ Projects | Expandable project cards with technology tags |
| ⚡ Skills | Core development, data, and engineering tools |
| 🎓 Education | Academic journey and qualifications |
| 🏆 Achievements | Certificates, awards, and recognition |
| 📬 Contact | Interests and a validated email contact form |

## 📸 Preview

<div align="center">

**Add a screenshot here:** `public/portfolio-preview.png`

</div>

## 🚀 Run Locally

**Requirements:** Node.js 18 or newer

```bash
# Clone the repository
git clone https://github.com/anjalikokare/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open **http://localhost:5173** in your browser.

## 📜 Available Scripts

```bash
npm run dev       # Start local development server
npm run build     # Create optimized production build
npm run preview   # Preview the production build
npm run lint      # Run lint checks
npm run typecheck # Run TypeScript checks
npm run test:api  # Run contact API tests
```

## 🗂️ Customize the Portfolio

| Part | File |
|:--|:--|
| Portfolio text and projects | [`src/data/portfolio.ts`](src/data/portfolio.ts) |
| Social and profile links | [`src/data/portfolio.ts`](src/data/portfolio.ts) |
| Global theme and animations | [`src/index.css`](src/index.css) |
| Page title and SEO | [`index.html`](index.html) |
| Resume PDF | [`public/Anjali_Kokare_Resume.pdf`](public/Anjali_Kokare_Resume.pdf) |
| Certificates | [`public/certificates/`](public/certificates/) |
| Contact API | [`api/contact.ts`](api/contact.ts) |

## 📬 Contact Form Setup

The contact form uses a Vercel Function and Resend for email delivery.

1. Create a free [Resend](https://resend.com) account.
2. Generate an API key.
3. Add these variables in Vercel:

   ```env
   RESEND_API_KEY=re_your_api_key
   CONTACT_TO_EMAIL=your-resend-email@example.com
   ```

4. Redeploy the project and test the form from the live site.

The form validates input, includes bot protection, and provides a mail-app fallback if the backend is unavailable.

## ☁️ Deploy to Vercel

1. Push the project to GitHub.
2. Import the repository in [Vercel](https://vercel.com/new).
3. Keep the detected Vite build settings.
4. Add the Resend environment variables.
5. Deploy.

```bash
npm run build
git add .
git commit -m "Update portfolio"
git push
```

## ♿ Accessibility

- Semantic page landmarks
- Keyboard-visible focus states
- Skip navigation link
- Descriptive image alternatives
- Reduced-motion support
- Responsive mobile navigation

---

<div align="center">

**Designed and developed by Anjali Rameshwar Kokare**

⭐ If you like this portfolio, consider starring the repository.

</div>
