# CLAUDE.md - KNSEWA Website

## Overview
**KNSEWA (Khushbu Nirman Sewa)** - Construction company website by **Zunkireelabs**.

| Tech | Details |
|------|---------|
| Framework | Next.js 15 (TypeScript), Static Export (`output: "export"`) |
| Styling | Tailwind CSS 4.0 + CSS Variables |
| Animation | GSAP + Lenis (smooth scroll) + Framer Motion |
| Deployment | Docker + Nginx + Traefik |

**URLs:**
- Production: https://knsewa.com
- Development: https://knsewa-dev.zunkireelabs.com

---

## Commands

```bash
# Build static site (outputs to /out)
npm run build

# Lint
npm run lint
```

---

## Deployment

### VPS Server (Production/Staging)
On the VPS, always deploy to the dev URL first for testing:

```bash
# Deploy to development (https://knsewa-dev.zunkireelabs.com)
./deploy.sh dev

# Deploy to production (https://knsewa.com) - confirms before deploying
./deploy.sh prod
```

**How it works:**
- Traefik handles SSL and routing by hostname
- Containers connect to `hosting` network (no port exposure needed)
- deploy.sh builds Next.js → Docker → restarts container

### Local Development
For local development on your machine:

```bash
# Run dev server on localhost:3010
npm run dev
```

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (wraps Header, Footer, AnimationProvider)
│   ├── page.tsx            # Homepage (imports all sections)
│   └── globals.css         # Fonts, CSS variables, base styles
│
├── components/
│   ├── layout/             # Header, Footer, MegaMenu, ContactPanel
│   ├── sections/           # Page sections (HeroSection, ServicesSection, etc.)
│   └── ui/                 # Reusable: AnimatedElement, Button, Icons
│
├── content/
│   ├── pages/home.ts       # Homepage content data
│   └── site/settings.ts    # Site settings, navigation
│
├── data/adapters/
│   └── content.adapter.ts  # Content fetching layer (for future CMS)
│
├── hooks/                  # useParallax, useScrollTrigger
├── providers/              # AnimationProvider (Lenis + GSAP)
└── types/content.ts        # All TypeScript interfaces

public/
├── images/                 # Static images
└── fonts/                  # Apercu Pro, Rockness

nginx/static.conf           # Nginx config for Docker
out/                        # Build output (generated)
```

---

## Key Patterns

### Component Pattern
All sections receive typed content as props:
```tsx
export function ServicesSection({ content }: { content: ServicesContent }) {
  // ...
}
```

### Content Flow
```
src/content/*.ts → src/data/adapters/content.adapter.ts → Components
```
Content adapter methods: `getSiteSettings()`, `getMainNavigation()`, `getHomePage()`

### Animation
- Wrap app with `AnimationProvider` (already in layout.tsx)
- Use `<FadeUp>`, `<SlideLeft>`, `<StaggerContainer>` from `AnimatedElement.tsx`
- Hooks: `useScrollTrigger`, `useParallax`, `useCounterAnimation`

### Styling
- Fluid typography: `text-fs-16` to `text-fs-90` (uses clamp)
- CSS variables in `globals.css`: `--color-primary`, `--color-accent`
- Breakpoints: `mobile`, `tablet`, `desktop`, `large`

---

## Git Commit Convention

When making commits, use the git user's configured name and email for the Co-Authored-By line:

1. Get user info: `git config user.name` and `git config user.email`
2. Use format:
```
Co-Authored-By: {user.name} <{user.email}>
```

**Do NOT use** `Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>`

---

## Style Guide

**IMPORTANT:** Always refer to the style guide before styling any component.

📄 **Location:** `/docs/STYLE-GUIDE.md`

### Workflow for Styling Changes
1. **Check style guide first** - Find current values for typography, spacing, colors
2. **Make the change** - Update component/CSS
3. **Update style guide** - Keep it in sync with actual code
4. **Confirm** - "Style guide updated ✓"

### Quick Reference
| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| Section Label | 16px | 500 | 1.5 |
| Section Title (H2) | 45px | 300 | 1.1 |
| Card Title | 24px | 500 | 1.2 |
| Body Text | 16px | 400 | 1.6 |
| Link/CTA | 16px | 500 | 1.5 |

---

## Critical Notes

1. **Static Export** - No SSR, no API routes, no dynamic routes without `generateStaticParams()`
2. **Images unoptimized** - Next.js image optimization disabled
3. **Port 3010** - Local dev only (`npm run dev`), not used on VPS
4. **VPS Deployment** - Always use `./deploy.sh dev` on VPS, never manually expose ports
5. **Traefik handles SSL** - On VPS, containers use `hosting` network, Traefik routes by hostname
6. **Style Guide** - Always check `/docs/STYLE-GUIDE.md` before styling changes

---

## Port Registry
| Port | Project |
|------|---------|
| 3000/3001 | Avantra |
| 3005 | WhatsApp Frontend |
| 3010 | knsewa-web |
| 4000 | WhatsApp Backend |
