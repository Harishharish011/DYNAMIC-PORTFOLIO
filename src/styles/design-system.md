# Portfolio Design System (Visual Language)

This document defines the **design system only** (no page/section UI).

It is designed for a dark, premium, galaxy-inspired portfolio using:
- Tailwind CSS + CSS variables
- Subtle glassmorphism
- Purple/Blue cosmic accents
- Motion standards (documented now; implemented later)

---

## 1) Color System (Semantic Tokens)

All colors must be referenced as semantic variables from `src/styles/theme.css`.

Core semantic variables:
- `--color-background` / `--color-background-deep` / `--color-background-surface`
- `--color-primary-purple` / `--color-secondary-purple`
- `--color-accent-blue` / `--color-accent-blue-soft`
- `--color-text-primary` / `--color-text-secondary` / `--color-text-muted`

Usage rules:
- Components should **never** hardcode raw hex values.
- Prefer semantic tokens when styling in CSS or Tailwind utilities.

---

## 2) Typography System

Typography hierarchy (tokens for later Tailwind mapping):
- **Hero XL** / **Hero Large** / **Hero Medium**
- **Heading XL** / **Heading Large** / **Heading Medium**
- **Body Large** / **Body Medium**
- **Caption**
- **Buttons**

Clamp recommendations (responsive scaling):
- Hero XL: `clamp(4.5rem, 7vw, 14rem)`
- Hero Large: `clamp(3.5rem, 5vw, 10rem)`
- Hero Medium: `clamp(2.75rem, 3.8vw, 6.5rem)`
- Heading XL: `clamp(2rem, 2.6vw, 3.25rem)`
- Heading Large: `clamp(1.5rem, 2vw, 2.25rem)`
- Heading Medium: `clamp(1.25rem, 1.6vw, 1.75rem)`
- Body Large: `clamp(1rem, 1.2vw, 1.125rem)`
- Body Medium: `1rem` line-height `1.6`
- Caption: `0.875rem`

Font:
- Inter (load in Phase 1/HTML later if needed)

---

## 3) Spacing System

Use spacious, breathable rhythm.
Canonical spacing tokens exist in `theme.css`:
- `--space-1` .. `--space-12`

Layout tokens:
- Container max width: `--container-max`
- Section vertical padding:
  - Desktop: `--section-y`
  - Mobile: `--section-y-mobile`

Rules:
- Prefer `--space-*` tokens for paddings/gaps.
- Avoid cramped values for galaxy visuals.

---

## 4) Glassmorphism System

Goal:
- Subtle blur
- Low opacity
- Purple edge glow
- Premium, not “neon overload”

Utilities:
- `.glass-card`
- `.glass-panel`
- `.glass-edge`

Rules:
- Blur should remain gentle (e.g., ~10px).
- Border opacity stays low using `--glass-border`.

---

## 5) Glow + Shadow System

Glows (use sparingly):
- `--glow-purple-small`
- `--glow-purple-medium`
- `--glow-blue`
- `--glow-cosmic`

Shadows:
- `--shadow-glass`
- `--shadow-soft`

Rules:
- Focus ring: consistent purple glow
- Hover: small lift + glow
- Card depth: `--shadow-glass`

---

## 6) Button System (Visual Standards Only)

Classes (system-level only):
- `.btn`
- `.btn-primary`
- `.btn-secondary`
- `.btn-ghost`

Hover/focus behavior (standards):
- Hover lifts slightly
- Focus uses purple glow + ring
- No JS magnetic behavior yet

---

## 7) Card System (Visual Standards Only)

Classes (system-level only):
- `.card`
- `.card-glass`
- `.card-interactive`

Rules:
- Premium radius from `--radius-*`
- Hover uses lift + subtle glow

---

## 8) Motion Design System (Documentation only)

Global timing:
- Fast: `--motion-fast` (micro-interactions)
- Normal: `--motion-normal` (UI response)
- Slow: `--motion-slow` (cinematic reveals)

Easing strategy:
- Premium ease-out curve:
  - `cubic-bezier(0.25, 0.46, 0.45, 0.94)`

Animation standards (conceptual definitions):
- Fade Up: opacity 0→1, y 14→0
- Fade In: opacity 0→1
- Slide Left/Right: x ±18→0
- Reveal: opacity + small translate + stagger-ready
- Scale: 0.98→1
- Hover Lift: translateY(-2px) + glow
- Card Float: subtle, non-distracting (future)

---

## 9) Parallax Layer Planning (Documentation only)

Layer strategy (Galaxy depth model):
1. Layer 1 — Galaxy Video (slowest movement)
2. Layer 2 — Dark Overlay (contrast stability)
3. Layer 3 — Nebula Overlay (medium movement)
4. Layer 4 — Particles (subtle, low intensity)
5. Layer 5 — Content (minimal offsets, accessibility-first)

Movement relationships:
- Layer 1 < Layer 2–3 < Layer 4 < Layer 5 (content minimal)

---

## 10) Future Section Standards (No UI implemented)

Hero / About / Skills / Projects / Contact / Footer standards:
- Layout philosophy: spacious, premium hierarchy
- Typography hierarchy: strong title > supporting text > metadata
- Visual treatment:
  - galaxy background + dark overlays
  - glass panels for content
  - glow accents for focus/CTA
- Responsive strategy:
  - reduce animation intensity on mobile
  - clamp typography for cinematic scale without overflow
