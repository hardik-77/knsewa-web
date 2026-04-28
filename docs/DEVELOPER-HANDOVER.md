# Developer Handover — KNSEWA Website

**Project:** KNSEWA (Khushbu Nirman Sewa) — construction company website
**Built by:** Zunkireelabs
**Handover date:** 2026-04-28
**Last commit at handover:** `b8cdffa` on `main`

---

## 1. Status at handover

| Item | Status |
|------|--------|
| Source code | Committed and pushed to GitHub |
| Dev environment (`https://knsewa-dev.zunkireelabs.com`) | Live and serving the latest build |
| Production container (`knsewa-web-prod`) | Running on the VPS, healthy, returns 200 via Host header |
| Production URL (`https://knsewa.com`) | **NOT live** — blocked on DNS (see Section 9) |

The full app stack (build → Docker image → Traefik routing → TLS) is deployed and healthy. The only remaining blocker is a DNS A record on the authoritative nameservers.

---

## 2. URLs

| Purpose | URL |
|---------|-----|
| Production | https://knsewa.com (pending DNS) |
| Development | https://knsewa-dev.zunkireelabs.com |
| GitHub repo | https://github.com/hardik-77/knsewa-web |

> Repo currently sits under the `hardik-77` personal account. If `Zunkireelabs` org ownership is preferred long-term, transfer via GitHub UI.

---

## 3. Tech stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 15 (App Router, TypeScript) |
| Build mode | Static export (`output: "export"` in `next.config.ts`) |
| Styling | Tailwind CSS 4.0 + CSS variables |
| Animation | GSAP + `@gsap/react` + Lenis (smooth scroll) + Framer Motion |
| Icons | lucide-react |
| Carousel | swiper |
| Containerization | Docker + Nginx (`nginx:alpine`) |
| Reverse proxy / TLS | Traefik (shared `hosting` Docker network on the VPS) |

`npm scripts`:
```
npm run dev      # local dev server on port 3010
npm run build    # static export to /out
npm run lint     # next lint
npm start        # next start (rarely used since this is static export)
```

---

## 4. Local development

```bash
git clone https://github.com/hardik-77/knsewa-web.git
cd knsewa-web
npm install
npm run dev
# open http://localhost:3010
```

No `.env` is required — there are no runtime secrets, all content is in source under `src/content/`.

---

## 5. Project structure

```
src/
├── app/                       # Next.js App Router
│   ├── layout.tsx             # root layout (Header, Footer, AnimationProvider)
│   ├── page.tsx               # homepage
│   ├── about/                 # /about
│   ├── services/              # /services
│   ├── projects/              # /projects, /projects/[slug]
│   ├── insights/              # /insights
│   ├── error.tsx              # error boundary
│   └── globals.css            # fonts, CSS variables, base styles
│
├── components/
│   ├── layout/                # Header, Footer, MegaMenu, ContactPanel
│   ├── sections/              # page sections (Hero, Services, Projects, etc.)
│   │   ├── about/             # About-page-specific sections
│   │   ├── services/          # Services-page-specific sections
│   │   ├── projects/          # Projects-page-specific sections
│   │   └── insights/          # Insights-page-specific sections
│   └── ui/                    # AnimatedElement, Button, Icons, Breadcrumbs, SectionHeader, GridLines
│
├── content/
│   ├── pages/                 # per-page content (home, about, services, projects, insights)
│   ├── projects.ts            # project list (drives /projects/[slug])
│   └── site/settings.ts       # site-wide settings + navigation
│
├── data/adapters/
│   └── content.adapter.ts     # content fetching layer (CMS-ready abstraction)
│
├── hooks/                     # useParallax, useScrollTrigger, useCounterAnimation
├── providers/                 # AnimationProvider (Lenis + GSAP setup)
└── types/content.ts           # all TypeScript content interfaces

public/
├── images/                    # static images (organized by category)
├── fonts/                     # Apercu Pro, Rockness
└── videos/                    # hero-bg.mp4

nginx/static.conf              # nginx config used inside Docker image
docs/                          # this file + style guide + templates
out/                            # build output (gitignored)
```

### Component pattern
Sections receive typed content as props:

```tsx
export function ServicesSection({ content }: { content: ServicesContent }) { ... }
```

### Content flow
```
src/content/*.ts  →  src/data/adapters/content.adapter.ts  →  Components
```
Adapter methods today: `getSiteSettings()`, `getMainNavigation()`, `getHomePage()`, `getAboutPage()`, etc. Designed so a future CMS can swap in without touching components.

### Animations
Wrap with `<AnimationProvider>` (already in `layout.tsx`). Use `<FadeUp>`, `<SlideLeft>`, `<StaggerContainer>` from `src/components/ui/AnimatedElement.tsx`. For custom timelines, use `useScrollTrigger`/`useParallax` hooks.

### Styling
- Fluid typography utility classes: `text-fs-16` to `text-fs-90` (clamp-based)
- Design tokens in `src/app/globals.css` (`--color-primary`, `--color-accent`, etc.)
- Breakpoints: `mobile`, `tablet`, `desktop`, `large`
- Full reference: `docs/STYLE-GUIDE.md` — **read this before making styling changes**

---

## 6. Editing content

All copy / images / project data is in `src/content/`:

| To change | Edit |
|-----------|------|
| Homepage copy | `src/content/pages/home.ts` |
| About copy | `src/content/pages/about.ts` |
| Services copy | `src/content/pages/services.ts` |
| Insights / blog list | `src/content/pages/insights.ts` |
| Projects list (drives /projects/[slug]) | `src/content/projects.ts` |
| Projects landing copy | `src/content/pages/projects.ts` |
| Header / Footer / Nav / Site meta | `src/content/site/settings.ts` |

After editing content, rebuild and redeploy (Section 7). Static export means content changes do not appear until a new build is deployed.

Image assets go under `public/images/<category>/`. Reference them with `/images/<category>/<file>`.

---

## 7. Deployment

### VPS

| Item | Value |
|------|-------|
| Host | VPS at `94.136.189.213` (`vmi2955062`) |
| Working dir | `/home/zunkireelabs/devprojects/websiteprojects/knsewa-web-dev` |
| User | `hardik` (group `zunkiree-dev-team`) |
| Network | Containers attach to the external Docker network `hosting`, where Traefik runs |
| TLS | Traefik issues Let's Encrypt certs automatically per hostname |

### How the deploy works

`./deploy.sh dev` and `./deploy.sh prod` perform:

1. `npm install`
2. `npm run build` (produces `/out/`)
3. `docker compose -f <compose-file> build --no-cache`
4. `docker compose -f <compose-file> down && up -d`

The compose files attach Traefik labels:
- `docker-compose.yml` → `Host(knsewa.com)` → container `knsewa-web-prod`
- `docker-compose.dev.yml` → `Host(knsewa-dev.zunkireelabs.com)` → container `knsewa-web-dev`

### Standard workflow

```bash
# Always test on dev first
./deploy.sh dev
# Visit https://knsewa-dev.zunkireelabs.com, QA

# Then promote to prod
./deploy.sh prod
# Will prompt: "Are you sure? (y/n)" — answer y
```

### Deploy after pulling new code

```bash
git pull
./deploy.sh dev      # validate
./deploy.sh prod     # ship
```

### Container names (for `docker logs` / `docker exec`)

```
knsewa-web-dev    — dev container (nginx serving /out)
knsewa-web-prod   — prod container (nginx serving /out)
knsewa-old        — legacy nginx container, no Traefik labels (safe to remove once prod is verified live)
```

---

## 8. Git conventions

- Primary branch: `main` (deploys are made off `main`)
- Co-author footer in commits per `CLAUDE.md`:
  ```
  Co-Authored-By: <git config user.name> <<git config user.email>>
  ```
  e.g., `Co-Authored-By: Hardik <hardik@zunkireelabs.com>`
- `.claude/` is gitignored (Claude Code session config, not project content)
- `node_modules/`, `.next/`, `out/`, `.env*` already in `.gitignore`

---

## 9. Outstanding action items (priority order)

### 9.1 [BLOCKER] Add DNS A record for knsewa.com

**Symptom:** `https://knsewa.com` does not resolve. Public DNS query returns `NXDOMAIN`.

**Diagnosis:** The cPanel Zone Editor for `knsewa.com` shows `A: knsewa.com → 94.136.189.213`, but **that cPanel is not authoritative**. The domain's actual nameservers (per registrar OwnRegistrar.com) are:

```
4055.dns1.managedns.org   (138.68.134.109)
4055.dns2.managedns.org   (167.71.111.26)
4055.dns3.managedns.org   (172.233.81.45)
4055.dns4.managedns.org   (172.235.27.249)
```

The SOA email for the zone is `info@himalayanhost.com`. SOA serial is `2025010906` (Jan 9, 2025) — i.e., not updated since.

**Fix:** Log in to **himalayanhost.com** (DNS host) and add:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | `@` (or `knsewa.com`) | `94.136.189.213` | 3600 |
| A | `www` | `94.136.189.213` | 3600 |

Once published, propagation takes minutes. Traefik will issue the Let's Encrypt cert automatically on first request.

**Verify:**
```bash
dig +short @8.8.8.8 knsewa.com A             # expect 94.136.189.213
curl -sI https://knsewa.com/                  # expect 200
```

**Alternative path (slower):** Change the registrar's NS records (at OwnRegistrar.com) to point to the cPanel's nameservers, making the cPanel zone authoritative. Not recommended unless you also want to migrate DNS off himalayanhost — NS changes take 24–48hr to propagate.

### 9.2 [Optional] Repo ownership

Repo is at `https://github.com/hardik-77/knsewa-web` (personal). If org ownership is desired, transfer to `Zunkireelabs` via GitHub Settings → Transfer ownership.

### 9.3 [Optional] Clean up legacy `knsewa-old` container

Once `knsewa.com` is verified live on `knsewa-web-prod`, the `knsewa-old` container can be removed:

```bash
docker stop knsewa-old && docker rm knsewa-old
```

It currently has no Traefik labels, so it's not interfering, but it occupies resources.

### 9.4 [Optional] Address `metadataBase` warning

Build emits:
```
metadataBase property in metadata export is not set ... using "http://localhost:3000"
```

Fix in `src/app/layout.tsx` by setting:
```ts
export const metadata: Metadata = {
  metadataBase: new URL("https://knsewa.com"),
  // ...
};
```
Affects only OG / Twitter image URL resolution. Non-blocking.

---

## 10. Credentials the receiving developer needs

Provide separately (do **not** commit):

- [ ] VPS SSH access (`hardik@94.136.189.213` or equivalent account; ensure they're in `zunkiree-dev-team` group for write access to the project dir)
- [ ] GitHub repo collaborator invite on `https://github.com/hardik-77/knsewa-web` (or transfer ownership per 9.2)
- [ ] himalayanhost.com login (for DNS edits — see 9.1)
- [ ] OwnRegistrar.com login (for domain renewal / NS changes)
- [ ] cPanel login at `192.250.235.244` (mail / FTP / etc., though not used for DNS in practice)
- [ ] Google Workspace admin (MX is `SMTP.GOOGLE.com` — owner of the Workspace account that handles `@knsewa.com` mail)

---

## 11. Reference

- `CLAUDE.md` — project overview, port registry, deploy commands, style-guide pointer
- `docs/STYLE-GUIDE.md` — typography, spacing, colors, components — **always consult before styling changes**
- `docs/Development_project_Context.md` — original brief / project context
- `docs/NEXTJS-STATIC-DOCKER-TEMPLATE.md` — generic template this project was bootstrapped from
- `docs/reference-turner/` — design reference (turnerconstruction.com archive); KNSEWA layouts are modeled on Turner's patterns

---

## 12. Quick commands cheat sheet

```bash
# Local dev
npm run dev                                          # http://localhost:3010

# Build static site
npm run build                                        # outputs to /out

# Deploy (run on VPS)
./deploy.sh dev                                      # ships to knsewa-dev.zunkireelabs.com
./deploy.sh prod                                     # ships to knsewa.com (prompts y/n)

# Inspect containers
docker ps --filter name=knsewa
docker logs knsewa-web-prod --tail 100
docker logs knsewa-web-dev  --tail 100

# DNS sanity checks
dig +short @8.8.8.8 knsewa.com A                     # public DNS
dig +short @4055.dns1.managedns.org knsewa.com A     # authoritative

# Verify site (DNS-bypass test, useful while DNS is in flux)
curl -sI --resolve knsewa.com:443:94.136.189.213 -k https://knsewa.com/
```

---

## 13. Contact during transition

For questions on architectural decisions, content shape, or build conventions during handover, reach out via the Zunkireelabs team channel (or the contact in the project agreement). Original developer: Hardik (`hardik@zunkireelabs.com`).
