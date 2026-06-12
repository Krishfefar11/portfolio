# 🚀 Deployment Guide — Krish Fefar Portfolio

## Prerequisites
- Node.js 18.17+ installed
- npm 9+ or pnpm
- Git installed
- Vercel account (free)

---

## 1. Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:3000
```

---

## 2. Personalize Your Content

All content is driven by data files — no component editing needed:

| File | What to edit |
|------|-------------|
| `constants/index.ts` | Name, GitHub, LinkedIn, email, hero roles |
| `data/projects.ts` | Project titles, descriptions, tech, GitHub links |
| `data/skills.ts` | Skills, levels, categories |
| `data/experience.ts` | Work experience, education, achievements |

### Add Your Photo
Replace the gradient initials avatar in `components/sections/About.tsx`:
```tsx
// Find this block and replace with:
<Image src="/assets/profile.jpg" alt="Krish Fefar" fill className="object-cover" />
```
Then drop `profile.jpg` into `public/assets/`.

### Add Real GitHub Links for Projects
In `data/projects.ts`, update:
```ts
github: "https://github.com/Krishfefar11/SwitchOn",
demo: "https://switchon.vercel.app",
```

---

## 3. Connect Contact Form (Optional)

The form currently simulates submission. To make it live, use **EmailJS** (free):

1. Sign up at [emailjs.com](https://www.emailjs.com)
2. Create a service + template
3. Add to `.env.local`:
   ```
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxx
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxx
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```
4. In `Contact.tsx`, replace the `await new Promise(...)` with:
   ```ts
   await emailjs.send(serviceId, templateId, formState, publicKey);
   ```

---

## 4. Deploy to Vercel (Recommended)

### Option A: Vercel CLI (fastest)
```bash
npm i -g vercel
vercel
# Follow prompts — auto-detects Next.js
```

### Option B: GitHub + Vercel Dashboard
```bash
# Initialize git
git init
git add .
git commit -m "Initial portfolio commit"

# Push to GitHub
git remote add origin https://github.com/Krishfefar11/portfolio.git
git push -u origin main
```
Then:
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repo
3. Framework: **Next.js** (auto-detected)
4. Add environment variable: `NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app`
5. Click **Deploy** ✓

### Option C: Custom Domain
After deploying to Vercel, go to:
**Project Settings → Domains → Add `krishfefar.dev`** (or any domain)

---

## 5. Environment Variables

Create `.env.local` (copy from `.env.example`):
```env
NEXT_PUBLIC_BASE_URL=https://krishfefar.vercel.app
```

---

## 6. Build for Production Locally

```bash
npm run build
npm run start
# → http://localhost:3000
```

---

## 7. Performance Checklist

- [ ] Add real profile photo (WebP format, ~200KB)
- [ ] Add project screenshots to `public/assets/`
- [ ] Update `app/layout.tsx` OG image path
- [ ] Set real GitHub links in `data/projects.ts`
- [ ] Add real domain to `NEXT_PUBLIC_BASE_URL`
- [ ] Enable contact form via EmailJS

---

## Project Structure

```
portfolio/
├── app/
│   ├── globals.css          # Global styles + CSS variables
│   ├── layout.tsx           # Root layout + SEO metadata
│   └── page.tsx             # Page composition
├── components/
│   ├── ui/
│   │   ├── Navbar.tsx       # Sticky nav with section tracking
│   │   ├── BackgroundBlobs.tsx
│   │   ├── GradientButton.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── ScrollProgress.tsx
│   │   ├── SectionWrapper.tsx
│   │   └── SmoothScroll.tsx
│   ├── sections/
│   │   ├── Hero.tsx         # Full viewport hero
│   │   ├── About.tsx        # Profile + animated counters
│   │   ├── Skills.tsx       # Tabbed skills grid
│   │   ├── Projects.tsx     # Project cards
│   │   ├── Experience.tsx   # Timeline + achievements
│   │   └── Contact.tsx      # Form + contact cards
│   └── Footer.tsx
├── constants/index.ts       # Navigation, socials, personal info
├── data/
│   ├── projects.ts
│   ├── skills.ts
│   └── experience.ts
├── hooks/
│   ├── useActiveSection.ts
│   └── useScrollProgress.ts
├── lib/
│   ├── animations.ts        # Framer Motion variants
│   └── utils.ts
├── types/index.ts
└── vercel.json
```
