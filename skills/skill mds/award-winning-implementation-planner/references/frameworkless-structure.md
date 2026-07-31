# Frameworkless Structure

This skill never outputs a framework (no React/Vue/Svelte/Next.js/Nuxt/etc.) and never requires a build step (no Vite/Webpack/npm run build) just to view the site. Everything is plain HTML/CSS/JS that opens directly in a browser or via a simple static file server.

## Standard file tree

```
project/
├── index.html
├── css/
│   ├── main.css          # resets, layout, typography, color tokens (CSS custom properties)
│   └── animations.css    # any CSS-only transitions/keyframes (hover states, simple fades)
├── js/
│   ├── main.js           # DOM setup, general page logic
│   └── animations.js     # GSAP timelines, ScrollTrigger setup, three.js scene if used
└── assets/
    ├── images/
    └── fonts/             # if self-hosting; otherwise use a font CDN link in <head>
```

For multi-page sites, add one `.html` per page (`about.html`, `work.html`, etc.) sharing the same `css/` and `js/` — do not introduce a router or templating engine; duplicate shared markup (nav, footer) across files, or note it as a manual step if the user wants to manage that themselves.

## Loading libraries (CDN only, no package manager required)

```html
<!-- GSAP -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/ScrollTrigger.min.js"></script>

<!-- three.js (only if the hero concept genuinely needs it — see moment-selection.md) -->
<script src="https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js"></script>
```

Load these in `<head>` (or right before `</body>`) — no bundler, no `import` from `node_modules`, no `package.json` needed for the site to run. If the user's own dev workflow uses ES modules, `<script type="module">` with CDN ESM URLs (e.g. `https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js`) is fine — that's still frameworkless, just modern vanilla JS.

## HTML outline discipline

- Use semantic tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) rather than nested `<div>` soup — this makes ScrollTrigger selectors (Step 4 patterns) far easier to target cleanly and keeps the plan legible to hand off.
- Give every section that will be an animation "moment" a clear, stable `id` or data attribute (e.g. `<section id="hero" data-anim="clip-reveal">`) so the JS in `animations.js` has obvious hooks — decide these names in the plan itself, not improvised during the build.

## Build order (so animation work has a stable target)

1. **Static HTML first** — full semantic structure for every section, real (or realistic placeholder) copy and image dimensions, zero animation. Verify it reads well and scrolls correctly with no JS at all.
2. **CSS layout and type** — get spacing, grid, and typography matching the vibe profile before any motion is added. A layout that looks good static is much easier to animate well than one that's being fixed and animated at the same time.
3. **CSS-only micro-interactions** — simple hover/focus states via `animations.css`, no GSAP yet.
4. **GSAP moments, one at a time** — implement each selected moment from Step 4's table in order of appearance on the page (hero first), testing scroll behavior after each addition rather than wiring all of them at once.
5. **three.js scene** (if used) — added last, since it's the highest-risk-of-breaking-things piece; make sure the rest of the page works with it disabled/fallback before finalizing.
6. **Mobile pass** — use `ScrollTrigger.matchMedia()` (see gsap-website-builder's `technical-rules.md`) to disable/simplify pinning, horizontal scroll, and magnetic buttons under ~768px; confirm `prefers-reduced-motion` is respected.
7. **Restraint check** — run the checklist from this skill's SKILL.md Step 6 and from gsap-website-builder's restraint check before calling it done.
