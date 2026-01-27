# KNSEWA Design System & Style Guide

> **Version:** 1.1.0
> **Last Updated:** January 26, 2026
> **Based on:** Turner Construction Design System

---

## Table of Contents

1. [Design Philosophy](#1-design-philosophy)
2. [Typography](#2-typography)
3. [Colors](#3-colors)
4. [Spacing System](#4-spacing-system)
5. [Layout & Grid](#5-layout--grid)
6. [Components](#6-components)
7. [Effects & Motion](#7-effects--motion)
8. [Iconography](#8-iconography)
9. [Imagery](#9-imagery)
10. [CSS Reference](#10-css-reference)

---

## 1. Design Philosophy

### Brand Attributes
- **Professional** - Clean, corporate aesthetic
- **Trustworthy** - Solid, reliable visual language
- **Modern** - Contemporary with timeless appeal
- **Bold** - Strong typography and confident layouts

### Design Principles
1. **Clarity over decoration** - Every element serves a purpose
2. **Generous whitespace** - Let content breathe
3. **Strong typography** - Type is the primary design element
4. **Subtle motion** - Enhance, don't distract

---

## 2. Typography

### Font Families

| Font | Usage | Fallback Stack |
|------|-------|----------------|
| **Apercu Pro** | Primary (all text) | -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif |
| **Rockness** | Display/Accent (decorative) | Georgia, serif |

### Font Weights

| Weight | Value | CSS Variable | Usage |
|--------|-------|--------------|-------|
| Extra Light | 200 | `font-extralight` | Large decorative headlines |
| Light | 300 | `font-light` | **Section titles, H2 headings** |
| Regular | 400 | `font-normal` | Body text, paragraphs |
| Medium | 500 | `font-medium` | **Labels, links, nav items, buttons** |
| Bold | 700 | `font-bold` | Strong emphasis only |

### Type Scale

| Token | Size (px) | Size (rem) | Fluid (clamp) | Usage |
|-------|-----------|------------|---------------|-------|
| `--fs-90` | 90px | 5.625rem | `clamp(3rem, 6vw, 5.625rem)` | Hero headlines |
| `--fs-70` | 70px | 4.375rem | `clamp(2.5rem, 5vw, 4.375rem)` | Large section titles |
| `--fs-45` | 45px | 2.8125rem | `clamp(2rem, 3vw, 2.8125rem)` | **Section headings (H2)** |
| `--fs-40` | 40px | 2.5rem | `clamp(1.75rem, 2.5vw, 2.5rem)` | Subsection headings |
| `--fs-32` | 32px | 2rem | - | Large card titles |
| `--fs-30` | 30px | 1.875rem | `clamp(1.5rem, 2vw, 1.875rem)` | **Card titles (featured)** |
| `--fs-24` | 24px | 1.5rem | - | **Card titles (standard)** |
| `--fs-23` | 23px | 1.4375rem | `clamp(1.125rem, 1.5vw, 1.4375rem)` | Subheadings |
| `--fs-19` | 19px | 1.1875rem | `clamp(1rem, 1.2vw, 1.1875rem)` | Lead paragraphs |
| `--fs-16` | 16px | 1rem | `clamp(0.875rem, 1vw, 1rem)` | **Body text, links, buttons** |
| `--fs-14` | 14px | 0.875rem | - | Small text, captions |
| `--fs-12` | 12px | 0.75rem | - | Labels, meta text |

### Line Heights

| Type | Value | Usage |
|------|-------|-------|
| `1.0` | Tight | Hero headlines (90px+) |
| `1.05` | Very tight | Large headings (70px) |
| `1.1` | Tight | Section titles |
| `1.2` | Snug | Card titles, subheadings |
| `1.3` | Normal | Lead paragraphs |
| `1.5` | Relaxed | Body text |
| `1.6` | Loose | Long-form content |

### Letter Spacing

| Type | Value | Usage |
|------|-------|-------|
| `-0.03em` | Tight | Hero headlines |
| `-0.01em` | Slight tight | Section titles |
| `0` | Normal | Body text |
| `0.1em` | Wide | **Uppercase labels** |

### Text Styles Reference

```
HERO HEADLINE
├── Font: Apercu Pro
├── Size: 90px (--fs-90)
├── Weight: 500 (medium)
├── Line-height: 1.05
├── Letter-spacing: -0.03em
└── Color: white (#ffffff)

SECTION LABEL (e.g., "STAY UPDATED WITH...")
├── Font: Apercu Pro
├── Size: 16px (--fs-16)
├── Weight: 500 (medium)
├── Line-height: 1.5
├── Letter-spacing: 0.1em
├── Transform: uppercase
└── Color: accent (#0b5dd0)

SECTION TITLE (e.g., "News & Insights")
├── Font: Apercu Pro
├── Size: 45px (--fs-45)
├── Weight: 300 (light)
├── Line-height: 1.1
├── Letter-spacing: -0.01em
└── Color: primary (#17171b)

CARD TITLE (Featured/Large)
├── Font: Apercu Pro
├── Size: 30px (--fs-30)
├── Weight: 500 (medium)
├── Line-height: 1.2
├── Letter-spacing: 0
└── Color: primary (#17171b)

CARD TITLE (Standard)
├── Font: Apercu Pro
├── Size: 24px (--fs-24)
├── Weight: 500 (medium)
├── Line-height: 1.2
├── Letter-spacing: 0
└── Color: primary (#17171b)

BODY TEXT
├── Font: Apercu Pro
├── Size: 16px (--fs-16)
├── Weight: 400 (regular)
├── Line-height: 1.6
├── Letter-spacing: 0
└── Color: primary (#17171b)

LINK / CTA TEXT
├── Font: Apercu Pro
├── Size: 16px (--fs-16)
├── Weight: 500 (medium)
├── Line-height: 1.5
├── Letter-spacing: 0
├── Color: primary (#17171b)
└── Hover: accent (#0b5dd0)

READ MORE LINK (Uppercase)
├── Font: Apercu Pro
├── Size: 14px
├── Weight: 500 (medium)
├── Line-height: 1.5
├── Letter-spacing: 0.05em
├── Transform: uppercase
├── Color: primary (#17171b)
└── Hover: accent (#0b5dd0)

CATEGORY LABEL
├── Font: Apercu Pro
├── Size: 12px
├── Weight: 500 (medium)
├── Line-height: 1.5
├── Letter-spacing: 0.1em
├── Transform: uppercase
└── Color: accent (#0b5dd0)

META TEXT (Date, etc.)
├── Font: Apercu Pro
├── Size: 14px
├── Weight: 400 (regular)
├── Line-height: 1.5
└── Color: gray-500 (#73737b)
```

---

## 3. Colors

### Primary Palette

| Name | Hex | RGB | CSS Variable | Usage |
|------|-----|-----|--------------|-------|
| Primary (Dark) | `#17171b` | 23, 23, 27 | `--color-primary` | Headings, body text, dark backgrounds |
| Primary Light | `#1c1c21` | 28, 28, 33 | `--color-primary-light` | Hover states on dark |
| White | `#ffffff` | 255, 255, 255 | `--color-white` | Backgrounds, light text |

### Accent Colors

| Name | Hex | RGB | CSS Variable | Usage |
|------|-----|-----|--------------|-------|
| Accent Blue | `#0b5dd0` | 11, 93, 208 | `--color-accent` | **Links, CTAs, labels, highlights** |
| Accent Hover | `#1a6ee0` | 26, 110, 224 | `--color-accent-hover` | Hover states |
| Secondary Blue | `#012471` | 1, 36, 113 | `--color-secondary` | Alternative accent |
| Blue Light | `#bfd2e4` | 191, 210, 228 | `--color-blue-light` | Light backgrounds |

### Gray Scale

| Name | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| Gray 100 | `#f6f6f6` | `--color-gray-100` | Light backgrounds |
| Gray 200 | `#dcdcdc` | `--color-gray-200` | Borders, dividers |
| Gray 300 | `#c4c4c4` | `--color-gray-300` | Disabled states |
| Gray 400 | `#8b8b8d` | `--color-gray-400` | Placeholder text |
| Gray 500 | `#73737b` | `--color-gray-500` | **Secondary text, meta** |
| Gray 600 | `#525252` | `--color-gray-600` | Muted text |
| Gray 700 | `#404040` | `--color-gray-700` | Dark muted |
| Gray 800 | `#262626` | `--color-gray-800` | Very dark |
| Gray 900 | `#17171b` | `--color-gray-900` | Same as primary |
| Black | `#000000` | `--color-black` | Pure black |

### Semantic Colors

| Purpose | Color | Hex |
|---------|-------|-----|
| Success | Green | `#22c55e` |
| Error | Red | `#ef4444` |
| Warning | Amber | `#f59e0b` |
| Info | Blue | `#0b5dd0` |

### Color Usage Guidelines

```
BACKGROUNDS
├── Page background: white (#ffffff)
├── Section alternate: gray-100 (#f6f6f6)
├── Dark sections: primary (#17171b)
└── Accent sections: accent (#0b5dd0)

TEXT ON WHITE BACKGROUND
├── Headings: primary (#17171b)
├── Body text: primary (#17171b)
├── Secondary text: gray-500 (#73737b)
├── Links: primary → accent on hover
└── Labels: accent (#0b5dd0)

TEXT ON DARK BACKGROUND
├── Headings: white (#ffffff)
├── Body text: white (#ffffff) or white/70
├── Links: white → accent on hover
└── Labels: white (#ffffff)
```

---

## 4. Spacing System

### Base Unit
**8px grid system** - All spacing values are multiples of 8px.

### Spacing Scale

| Token | Value (rem) | Value (px) | CSS Variable | Usage |
|-------|-------------|------------|--------------|-------|
| xs | 0.5rem | 8px | `--spacing-xs` | Tight gaps, icon padding |
| sm | 1rem | 16px | `--spacing-sm` | Small gaps, button padding |
| md | 1.5rem | 24px | `--spacing-md` | **Label to heading gap** |
| lg | 2rem | 32px | `--spacing-lg` | Component gaps |
| xl | 3rem | 48px | `--spacing-xl` | Section internal spacing |
| 2xl | 4rem | 64px | `--spacing-2xl` | Section padding |
| 3xl | 6rem | 96px | `--spacing-3xl` | **Section vertical padding** |
| 4xl | 8rem | 128px | `--spacing-4xl` | Large section padding |

### Section Spacing

```
SECTION VERTICAL PADDING
├── Desktop: 96px - 128px (6rem - 8rem)
├── Tablet: 64px - 96px (4rem - 6rem)
└── Mobile: 48px - 64px (3rem - 4rem)

SECTION INTERNAL SPACING
├── Label to Title: 24px (1.5rem / --spacing-md)
├── Title to Content: 48px (3rem / --spacing-xl)
├── Between Cards: 32px (2rem / --spacing-lg)
└── Card internal padding: 24px (1.5rem)

COMPONENT SPACING
├── Button padding: 16px 32px
├── Input padding: 16px
├── Card padding: 24px - 32px
└── Nav item padding: 24px horizontal
```

### Margin Rules

```
HEADINGS
├── Section label margin-bottom: 24px (--spacing-md)
├── Section title margin-bottom: 48px (--spacing-xl)
├── Card title margin-bottom: 16px (--spacing-sm)
└── Paragraph margin-bottom: 24px (--spacing-md)

LISTS
├── List item margin-bottom: 12px
└── List margin-bottom: 24px

IMAGES
├── Image margin-bottom: 24px (to title below)
└── Image in card: no margin (flex handles it)
```

---

## 5. Layout & Grid

### Container

| Property | Value | CSS Variable |
|----------|-------|--------------|
| Max Width | 1440px | `--container-max` |
| Padding | 32px (2rem) | `--container-padding` |
| Mobile Padding | 16px (1rem) | - |

### Breakpoints

| Name | Min Width | Max Width | CSS |
|------|-----------|-----------|-----|
| Mobile | - | 719px | `@media (max-width: 719px)` |
| Tablet | 720px | 1024px | `@media (min-width: 720px) and (max-width: 1024px)` |
| Desktop | 1025px | - | `@media (min-width: 1025px)` |
| Large | 1281px | - | `@media (min-width: 1281px)` |

### Tailwind Breakpoints

| Token | Value |
|-------|-------|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1440px |

### Column System

| Class | Width | Usage |
|-------|-------|-------|
| `col-d-25` | 25% | Quarter width |
| `col-d-33` | 33.333% | Third width |
| `col-d-36` | 36% | Custom |
| `col-d-50` | 50% | Half width |
| `col-d-64` | 64% | Custom (featured) |
| `col-d-67` | 66.666% | Two-thirds |
| `col-d-75` | 75% | Three-quarters |
| `col-d-100` | 100% | Full width |

### Common Layouts

```
TWO COLUMN (Featured + List)
├── Featured: 50% - 60%
├── List: 40% - 50%
└── Gap: 48px - 64px

NEWS & INSIGHTS LAYOUT (with Sticky Scroll)
├── Section padding: 96px vertical
├── Title margin-bottom: 64px
├── Featured article (left): 50%
│   └── PINNED on scroll (desktop only)
├── Grid articles (right): 50%
│   └── 2x3 grid (2 columns, 3 rows = 6 items)
│       └── Gap: 40px (lg:gap-10)
├── Gap between columns: 64px
├── Sticky Scroll Effect (GSAP ScrollTrigger):
│   ├── Left column pins when section reaches 100px from top
│   ├── Right column scrolls normally
│   ├── Pin duration: rightHeight - leftHeight
│   └── Only on desktop (min-width: 1024px)
├── Cards: Vertical (image top, text below)
│   ├── Image: aspect-ratio 16/10
│   ├── Image margin-bottom: 24px (featured) / 16px (grid)
│   ├── Title margin-bottom: 16px (featured) / 12px (grid)
│   └── READ MORE: 14px (featured) / 12px (grid)
└── Mobile: Stack to 100%, no sticky effect

THREE COLUMN GRID
├── Each column: 33.333%
├── Gap: 32px
└── Mobile: Stack to 100%

FOUR COLUMN GRID
├── Each column: 25%
├── Gap: 24px
├── Tablet: 2x2 (50% each)
└── Mobile: Stack to 100%

NEWS & INSIGHTS LAYOUT
├── Featured article: 50%
├── Grid articles: 50% (2x2 grid inside)
├── Gap between: 64px
├── Grid gap: 32px
└── Mobile: All stack to 100%
```

---

## 6. Components

### Buttons

#### Primary Button
```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
  background-color: #0b5dd0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s ease;
}
.btn-primary:hover {
  background-color: #1a6ee0;
}
```

#### Link Button (with arrow)
```css
.btn-link {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  font-weight: 500;
  color: #17171b;
  text-decoration: none;
  transition: 0.3s ease;
}
.btn-link:hover {
  color: #0b5dd0;
}
.btn-link svg {
  width: 35px;
  height: 14px;
  transition: transform 0.3s ease;
}
.btn-link:hover svg {
  transform: translateX(5px);
}
```

### Cards

#### News Card (Grid - 2x2 layout)
```
┌─────────────────────────┐
│                         │
│        [IMAGE]          │  ← aspect-ratio: 16/10
│                         │
├─────────────────────────┤
│                         │
│ Card Title Here That    │  ← 18px (1.125rem), medium, line-height 1.3
│ Can Span Two Lines      │     line-clamp: 2
│                         │
│ READ MORE  →            │  ← 12px, uppercase, letter-spacing 0.05em
└─────────────────────────┘

Specs:
- Image aspect ratio: 16:10
- Image margin-bottom: 16px
- Title margin-bottom: 12px
- Title: font-medium, color: primary
- Hover: scale image 1.05, title/link turns accent
```

#### News Card (Featured - large)
```
╭─────────────────────────────────────╮
│                                     │
│                                     │
│            [LARGE IMAGE]            │  ← aspect-ratio: 16/10
│                                     │  ← rounded corners (16px / rounded-2xl)
│                                     │  ← shadow-lg
╰─────────────────────────────────────╯
│                 ↕ 24px (mb-6)
│ Featured Article Title That Can     │  ← 32px (clamp 1.5-2rem), font-normal (400)
│ Span Multiple Lines Here            │     line-height 1.25
│                 ↕ 24px (mb-6)
│ READ MORE  ───→                     │  ← 14px, uppercase, accent color
└─────────────────────────────────────┘

Specs:
- Image aspect ratio: 16:10
- Image border-radius: 16px (rounded-2xl)
- Image shadow: shadow-lg
- Image margin-bottom: 24px (mb-6)
- Title font-weight: 400 (font-normal)
- Title font-size: clamp(1.5rem, 2.5vw, 2rem)
- Title margin-bottom: 24px (mb-6)
- Title color: primary, hover: accent
- READ MORE: 14px, uppercase, accent color (#0b5dd0)
- Arrow: long line style (40px × 12px), accent color
- Hover: scale image 1.05, arrow translateX(8px)
```

#### News Card (Legacy - horizontal, deprecated)
```
Horizontal cards are no longer used.
Use vertical cards (image on top) for all news layouts.
```

#### Project Card
```
┌─────────────────────────┐
│                         │
│        [IMAGE]          │  ← aspect-ratio: 4/3 or 16/10
│                         │
├─────────────────────────┤
│ PROJECT TITLE           │  ← 24px, medium
│                         │
│ Location • Scope        │  ← 14px, gray-500
└─────────────────────────┘

Specs:
- Image aspect ratio: 4:3 or 16:10
- Card padding: 0 (image bleeds)
- Text padding: 0 (below image)
- Gap image to category: 16px
- Gap category to title: 8px
- Gap title to link: 16px
```

#### News Card (Featured - large)
```
┌─────────────────────────────────────┐
│                                     │
│                                     │
│            [LARGE IMAGE]            │  ← aspect-ratio: 16/9
│                                     │
│                                     │
├─────────────────────────────────────┤
│ Featured Article Title              │  ← 30px, medium
│ Spans Multiple Lines                │
│                                     │
│ READ MORE  →                        │  ← 16px, with arrow
└─────────────────────────────────────┘
```

### Navigation

#### Header Nav Item
```
Default:
├── Font-size: 16px
├── Font-weight: 500
├── Color: white (on dark) / primary (on light)
├── Padding: 0 24px
└── Height: full header height

Active/Hover (with mega menu):
├── Background: white
├── Color: primary
├── Border-top: 4px solid accent
└── Extends to top of viewport
```

#### Mega Menu
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ┌──────────────┬──────────────────────────────┬─────────────┐ │
│  │              │                              │             │ │
│  │  BLUE        │     WHITE CONTENT AREA       │  FEATURED   │ │
│  │  SIDEBAR     │     (Navigation Columns)     │  PROJECT    │ │
│  │  (26%)       │     (Flexible)               │  (300px)    │ │
│  │              │                              │             │ │
│  └──────────────┴──────────────────────────────┴─────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Specs:
- Total width: 100%
- Blue sidebar: 26%
- Content padding: 60px top/bottom, 48px sides
- Column gap: 112px (gap-28)
- Shadow: xl
```

### Forms

#### Text Input
```css
input[type="text"],
input[type="email"],
textarea {
  width: 100%;
  padding: 16px;
  font-size: 16px;
  font-family: 'Apercu Pro';
  border: 1px solid #dcdcdc;
  background: #ffffff;
  transition: border-color 0.3s ease;
}
input:focus,
textarea:focus {
  outline: none;
  border-color: #0b5dd0;
}
```

#### Form Label
```css
label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #17171b;
  margin-bottom: 8px;
}
```

---

## 7. Effects & Motion

### Box Shadows

| Name | Value | Usage |
|------|-------|-------|
| sm | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| md | `0 4px 6px rgba(0,0,0,0.1)` | Cards |
| lg | `0 10px 15px rgba(0,0,0,0.1)` | Dropdowns |
| xl | `0 20px 25px rgba(0,0,0,0.15)` | **Mega menu, modals** |

### Border Radius

| Token | Value | CSS Variable | Usage |
|-------|-------|--------------|-------|
| sm | 4px | `--radius-sm` | Buttons, inputs |
| md | 8px | `--radius-md` | Cards |
| lg | 12px | `--radius-lg` | Larger cards |
| xl | 16px | `--radius-xl` | Modals |
| full | 9999px | - | Pills, circles |

### Transitions

| Token | Duration | Easing | CSS Variable | Usage |
|-------|----------|--------|--------------|-------|
| fast | 200ms | ease | `--transition-fast` | Hover states |
| base | 300ms | ease | `--transition-base` | **Default for all** |
| slow | 500ms | ease | `--transition-slow` | Page transitions |
| slower | 800ms | ease | `--transition-slower` | Scroll animations |

### Animation Presets

| Name | Description | Duration |
|------|-------------|----------|
| `fade-in` | Opacity 0 → 1 | 600ms |
| `fade-up` | Opacity + translateY(30px → 0) | 600ms |
| `fade-down` | Opacity + translateY(-30px → 0) | 600ms |
| `slide-in-left` | Opacity + translateX(-50px → 0) | 600ms |
| `slide-in-right` | Opacity + translateX(50px → 0) | 600ms |
| `scale-up` | Opacity + scale(0.95 → 1) | 600ms |

### Hover States

```
BUTTONS
├── Background: darken or accent-hover
├── Transform: none
└── Transition: 0.3s ease

LINKS
├── Color: accent (#0b5dd0)
├── Arrow: translateX(5px)
└── Transition: 0.3s ease

CARDS
├── Image: scale(1.05)
├── Shadow: increase
└── Transition: 0.5s ease

NAV ITEMS
├── Color: accent
└── Transition: 0.3s ease
```

---

## 8. Iconography

### Icon Sizes

| Size | Pixels | Usage |
|------|--------|-------|
| xs | 12px | Inline text |
| sm | 16px | Buttons, nav |
| md | 20px | Default |
| lg | 24px | Feature icons |
| xl | 32px | Large features |
| 2xl | 48px | Hero icons |

### Arrow Icons

| Type | Dimensions | Usage |
|------|------------|-------|
| Link arrow | 35px × 14px | CTA links, "Read More" |
| Nav chevron | 16px × 16px | Dropdown indicators |
| Button arrow | 20px × 20px | Button with icon |

### Icon Colors

- Default: `currentColor` (inherits text color)
- Interactive: follows link color rules
- On dark: white
- On light: primary or accent

---

## 9. Imagery

### Aspect Ratios

| Ratio | Usage |
|-------|-------|
| 16:9 | Hero images, featured images |
| 16:10 | Card images (default) |
| 4:3 | Thumbnails, grid images |
| 1:1 | Avatars, icons |
| 3:2 | Project galleries |

### Image Treatments

```
HERO IMAGES
├── Full bleed
├── Overlay: linear-gradient with opacity
└── Object-fit: cover

CARD IMAGES
├── Contained within card
├── Object-fit: cover
├── Hover: scale(1.05) with overflow hidden
└── Transition: 0.5s ease

BACKGROUND IMAGES
├── Object-fit: cover
├── Optional: parallax effect
└── Usually with overlay
```

### Overlay Gradients

```css
/* Hero overlay (dark) */
background: linear-gradient(
  to right,
  rgba(23, 23, 27, 0.85) 0%,
  rgba(23, 23, 27, 0.6) 50%,
  rgba(23, 23, 27, 0.4) 100%
);

/* Card overlay (on hover) */
background: linear-gradient(
  to top,
  rgba(0, 0, 0, 0.7) 0%,
  transparent 50%
);
```

---

## 10. CSS Reference

### CSS Variables (Complete List)

```css
:root {
  /* Colors */
  --color-primary: #17171b;
  --color-primary-light: #1c1c21;
  --color-secondary: #012471;
  --color-accent: #0b5dd0;
  --color-accent-hover: #1a6ee0;
  --color-blue: #0b5dd0;
  --color-blue-light: #bfd2e4;
  --color-white: #ffffff;
  --color-gray-100: #f6f6f6;
  --color-gray-200: #dcdcdc;
  --color-gray-300: #c4c4c4;
  --color-gray-400: #8b8b8d;
  --color-gray-500: #73737b;
  --color-gray-600: #525252;
  --color-gray-700: #404040;
  --color-gray-800: #262626;
  --color-gray-900: #17171b;
  --color-black: #000000;

  /* Typography */
  --font-family: 'Apercu Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --fs-16: 1rem;
  --fs-19: 1.1875rem;
  --fs-23: 1.4375rem;
  --fs-24: 1.5rem;
  --fs-30: 1.875rem;
  --fs-32: 2rem;
  --fs-40: 2.5rem;
  --fs-45: 2.8125rem;
  --fs-70: 4.375rem;
  --fs-90: 5.625rem;

  /* Spacing */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
  --spacing-2xl: 4rem;
  --spacing-3xl: 6rem;
  --spacing-4xl: 8rem;

  /* Transitions */
  --transition-fast: 0.2s ease;
  --transition-base: 0.3s ease;
  --transition-slow: 0.5s ease;
  --transition-slower: 0.8s ease;

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;

  /* Layout */
  --container-max: 1440px;
  --container-padding: 2rem;
}
```

### Utility Classes

```css
/* Typography */
.fs-16, .fs-19, .fs-23, .fs-24, .fs-30, .fs-32, .fs-40, .fs-45, .fs-70, .fs-90

/* Text styles */
.title          /* font-weight: 300, line-height: 1.1 */
.para           /* font-weight: 400, line-height: 1.5 */
.section-label  /* uppercase, 16px, medium, letter-spacing: 0.1em */

/* Colors */
.white          /* color: white */
.dark           /* color: primary */
.accent         /* color: accent */

/* Layout */
.wrapper        /* max-width container with padding */
.prel           /* position: relative */
.ov-hidden      /* overflow: hidden */

/* Columns */
.col-d-25, .col-d-33, .col-d-50, .col-d-67, .col-d-75, .col-d-100
```

### Tailwind Custom Classes

```
/* Font sizes with line-height */
text-fs-16, text-fs-19, text-fs-23, text-fs-30, text-fs-40, text-fs-45, text-fs-70, text-fs-90

/* Line heights */
leading-tight-08, leading-tight-1, leading-tight-11, leading-tight-12, leading-normal-13, leading-normal-15

/* Custom spacing */
p-18, p-22, p-30, p-34, p-38 (and m-, gap- variants)
```

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.1.0 | Jan 26, 2026 | Updated Featured Card: rounded corners, shadow, font-normal title, 24px spacing |
| 1.0.0 | Jan 25, 2026 | Initial style guide created |

---

> **Note:** This style guide should be updated whenever styling changes are made to the codebase. Keep it in sync with `globals.css` and component styles.
