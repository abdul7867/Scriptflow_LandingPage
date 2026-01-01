# ScriptFlow Landing Page

A high-fidelity, production-ready landing page for ScriptFlow - the AI-powered tool that turns any viral video into your next script.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Deployment to Vercel

### Option 1: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/scriptflow-landing)

### Option 2: CLI Deploy
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

### Option 3: Git Integration
1. Push your code to GitHub/GitLab/Bitbucket
2. Import project in [Vercel Dashboard](https://vercel.com/new)
3. Set environment variables in Vercel dashboard
4. Vercel auto-detects Next.js and deploys

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   └── waitlist/route.ts  # Waitlist signup API
│   ├── globals.css            # Global styles + mobile optimizations
│   ├── layout.tsx             # Root layout with fonts + SEO
│   ├── page.tsx               # Main landing page
│   └── sitemap.ts             # Dynamic sitemap
├── components/
│   ├── hero/                  # Hero section components
│   │   ├── HeroOrchestrator.tsx
│   │   └── HeroHeading.tsx    # Main headline
│   ├── ui/                    # Reusable UI components
│   ├── FAQ.tsx                # FAQ accordion
│   ├── FoundersManifesto.tsx  # Paper aesthetic founder story
│   ├── SignupModal.tsx        # Waitlist signup modal
│   └── ...
├── context/
│   └── SignupContext.tsx      # Global signup modal state
├── public/
│   ├── og-image.png           # Social sharing image
│   ├── manifest.json          # PWA manifest
│   ├── robots.txt             # SEO robots file
│   └── ...
├── vercel.json                # Vercel deployment config
├── next.config.mjs            # Next.js production config
└── .env.example               # Environment variables template
```

## 🔧 Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SITE_URL` | Your production URL | Yes |
| `ADMIN_KEY` | Secret key for waitlist API access | Yes (for admin) |

## 📊 Waitlist Data Collection

User signups are collected via the `/api/waitlist` endpoint:

**POST /api/waitlist**
```json
// Request
{ "name": "John", "email": "john@example.com", "instagramId": "johndoe" }

// Response
{ "success": true, "spotNumber": 42, "spotsRemaining": 58 }
```

**GET /api/waitlist?key=preview** → Get count only
**GET /api/waitlist?key=ADMIN_KEY** → Get full list (admin)

### Database Upgrade (Production)
Replace JSON file storage with:
- **Supabase** (recommended)
- **PlanetScale** (MySQL)
- **Neon** (PostgreSQL)
- **MongoDB Atlas**

## 📱 Mobile Responsiveness

Fully responsive with optimizations:
- Prevented horizontal scroll
- Touch-optimized buttons
- Responsive typography (14px base on mobile)
- Smooth font rendering
- Tap highlight removal

**Breakpoints:**
- Mobile: < 640px (`sm:`)
- Tablet: 640px - 1024px (`md:`)
- Desktop: > 1024px (`lg:`, `xl:`)

## 🎨 Design System

### Colors
| Name | Value | Usage |
|------|-------|-------|
| Lime | `#ccff00` | Primary accent, CTAs |
| Magenta | `#FF00FF` | Secondary accent |
| Dark | `#050505` | Background |
| Paper | `#f4f4f0` | Manifesto card |

### Fonts
- **Headings**: Space Grotesk (700)
- **Body**: Geist Sans
- **Manifesto**: Playfair Display (italic), Inter

## 🔒 Security Features

Built-in via `vercel.json`:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- API routes have `Cache-Control: no-store`

## ✅ Production Checklist

- [x] Hero copy optimized for conversions
- [x] Mobile responsive design
- [x] SEO metadata (title, description, keywords)
- [x] Open Graph + Twitter cards
- [x] Robots.txt configured
- [x] Sitemap auto-generated
- [x] PWA manifest
- [x] Security headers
- [x] Waitlist API with validation
- [x] Vercel deployment config
- [ ] Set environment variables in Vercel
- [ ] Configure custom domain
- [ ] Replace JSON with database
- [ ] Add analytics (optional)
- [ ] Add error monitoring (optional)
- [ ] Run Lighthouse audit

## 📈 Performance Optimizations

- Next.js 14 with React Server Components
- CSS optimization enabled
- Image optimization (AVIF/WebP)
- Console logs stripped in production
- Lazy loading animations
- Preloaded fonts

## 🛠 Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Google Fonts (via next/font)
- **Deployment**: Vercel

---

Built with ❤️ by Rehman
