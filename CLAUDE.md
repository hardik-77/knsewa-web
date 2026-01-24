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
# Development (port 3010)
npm run dev

# Build static site (outputs to /out)
npm run build

# Deploy
./deploy.sh dev    # Development
./deploy.sh prod   # Production (confirms first)
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

## Critical Notes

1. **Static Export** - No SSR, no API routes, no dynamic routes without `generateStaticParams()`
2. **Images unoptimized** - Next.js image optimization disabled
3. **Port 3010** - Configured in `.env.local`, avoid conflicts
4. **Deploy builds first** - `deploy.sh` runs `npm run build` → Docker build → deploy
5. **Traefik handles SSL** - Don't expose ports directly, use `hosting` network

---

## Port Registry
| Port | Project |
|------|---------|
| 3000/3001 | Avantra |
| 3005 | WhatsApp Frontend |
| 3010 | knsewa-web |
| 4000 | WhatsApp Backend |
