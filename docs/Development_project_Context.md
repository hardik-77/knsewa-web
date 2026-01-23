# Claude Code – Website Development Context
## Project: Khushbu Nirman Sewa (KNS)

---

## 0. Purpose of This Document

This document is the **single source of truth** for building the Khushbu Nirman Sewa website.

Claude Code must:
- Follow this document strictly
- Make no architectural assumptions outside this scope
- Build a **scalable, component-based, CMS-ready** website
- Ensure **clients can manage content later** (blogs, news, projects, locations)

This is **NOT a marketing document**.  
This is **developer execution context**.

---

## 1. Business Context

**Khushbu Nirman Sewa (KNS)** is a **premium construction contractor** based in **Biratnagar, Nepal**, operating for **30 years**.

### Core Focus
- Commercial construction
- Government & institutional construction
- Large-scale projects across Nepal

### Target Users
- Property developers
- Businesses
- Government / institutional procurement teams

### NOT Targeting
- Individual homeowners
- Retail consumers

---

## 2. Website Goals (Priority Order)

1. Trust & credibility (most critical)
2. Portfolio proof (projects)
3. Lead generation (institutional)
4. SEO authority (Nepal + Biratnagar)
5. Long-term content growth (blogs, news)

---

## 3. Primary Conversions

### Primary CTA
- **Request Site Visit**

### Secondary CTA
- **Request Quote**

No aggressive sales UX.  
Institutional, trust-first flow only.

---

## 4. Technology Stack (Fixed)

| Layer | Technology |
|-----|-----------|
| Framework | Next.js 16 (Static Export) |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Icons | Lucide React |
| Hosting | Docker + Nginx |
| Proxy / SSL | Traefik |
| CMS (Later) | Sanity (Headless) |

**Important:**  
The site must work **without a CMS now**, but be **CMS-driven later without refactoring pages**.

---

## 5. Deployment & Infrastructure

This project follows the **Zunkiree Labs standard template**:

- Static export (`output: "export"`)
- Nginx container serving `/out`
- Traefik routing
- Dev + Prod compose files
- Build-time content only (no runtime fetching)

No SSR assumptions.  
No ISR assumptions.

---

## 6. Architectural Principles (NON-NEGOTIABLE)

1. Component-based architecture
2. Content-driven pages
3. No hardcoded copy in JSX
4. File-first content → CMS later
5. Pages are **assemblers only**
6. Layout logic lives in code
7. Content lives outside components

---

## 7. Project Structure (Required)

src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Container.tsx
│   │
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── StatsSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── ProjectGrid.tsx
│   │   ├── CTASection.tsx
│   │
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Typography.tsx
│
├── content/                # SOURCE OF TRUTH (Phase 1)
│   ├── site/
│   │   ├── settings.ts
│   │   └── seo.ts
│   │
│   ├── pages/
│   │   ├── home.ts
│   │   ├── about.ts
│   │   ├── services.ts
│   │   ├── contact.ts
│   │   └── coverage.ts
│   │
│   ├── projects/
│   │   ├── index.ts
│   │   └── [slug].ts
│   │
│   ├── blog/
│   │   ├── posts.ts
│   │   └── categories.ts
│   │
│   └── locations/
│       ├── biratnagar.ts
│       └── nepal.ts
│
├── data/
│   └── adapters/
│       ├── content.adapter.ts
│       └── sanity.adapter.ts (future)
│
├── types/
│   ├── project.ts
│   ├── blog.ts
│   ├── location.ts
│   └── seo.ts



---

## 8. Content Adapter Pattern (CRITICAL)

### Rule
**Pages must never import content files directly.**

Pages must use adapter functions only.

### Required Adapter Functions

getSiteSettings()
getHomePage()
getAboutPage()
getServicesPage()
getProjects()
getProjectBySlug(slug)
getBlogPosts()
getBlogPostBySlug(slug)
getLocations()


### Phase Mapping

| Phase | Source |
|-----|-------|
| Phase 1 | `/src/content/**` |
| Phase 2 | Sanity API |

Function signatures must **remain identical**.

---

## 9. Client-Editable Content (MANDATORY)

The following must be **client-manageable** later via CMS:

### 9.1 Blog / News
- Title
- Slug
- Publish date
- Author
- Category
- Content (rich text)
- SEO metadata

### 9.2 Projects
- Project name
- Slug
- Client type (government / commercial)
- Location
- Scope
- Highlights
- Images
- SEO metadata

### 9.3 Locations
- City / region name
- Coverage description
- SEO metadata

### 9.4 Global Content
- Hero text
- CTAs
- Stats (years, projects, etc.)

**No redeploy should be required to update content once CMS is added.**

---

## 10. Content Model Rules (CMS-Ready)

All content files must mirror CMS schemas.

### Example: Project Model

{
title: string
slug: string
clientType: “government” | “commercial”
location: string
scope: string
highlights: string[]
images: Image[]
seo: {
title: string
description: string
}
}

---

## 11. Page Responsibilities

### Home (`/`)
- Authority positioning
- Trust indicators
- Services overview
- Featured projects
- Nepal-wide coverage
- Primary CTA: Site Visit

### About (`/about`)
- 30-year legacy
- Experience & credibility

### Services (`/services`)
- Commercial construction
- Government construction

### Projects (`/projects`)
- Filterable project grid
- Links to project detail pages

### Project Detail (`/projects/[slug]`)
- Full project information
- Image gallery
- SEO-optimized

### Coverage (`/coverage`)
- Nepal-wide service
- Location blocks (Biratnagar mandatory)

### Blog / News (`/insights`)
- SEO authority
- Informational content

### Contact (`/contact`)
- Contact info
- Lead form

### Request Site Visit (`/request-site-visit`)
- Primary conversion form

### Request Quote (`/request-quote`)
- Secondary conversion form

---

## 12. SEO Rules (Developer-Relevant)

- One H1 per page
- Logical heading hierarchy
- Clean URLs
- Image alt text required
- Internal linking:
  - Projects ↔ Services ↔ Locations
- Schema-ready structure:
  - Organization
  - Project
  - Article (blog)

---

## 13. Design Translation (Dev Terms)

- Visual tone: premium, institutional
- Colors: dark blue / charcoal / neutral greys
- Typography: corporate sans-serif
- Spacing: generous, consistent
- No playful UI
- No bright colors
- No consumer-style visuals

---

## 14. Explicit Constraints

- ❌ No hardcoded text in JSX
- ❌ No CMS logic in UI components
- ❌ No page-specific styling hacks
- ✅ All content abstracted
- ✅ All components reusable
- ✅ CMS swap must be trivial

---

## 15. Future Sanity Integration Notes

- Build-time data fetching only
- Sanity used as **content source only**
- Layout & components remain code-owned
- CMS controls content, not structure

---

## 16. Assumptions

- Logo will be added later
- Content will evolve post-launch
- Projects and blogs will grow continuously
- Multi-location SEO will expand

---

## END OF DOCUMENT

