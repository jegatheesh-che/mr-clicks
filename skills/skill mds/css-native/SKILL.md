---
name: css-native
description: Library of production-ready native CSS effects (zero JS dependencies) for vanilla client sites — mix-blend-mode text/image overlays, clip-path polygon reveals, backdrop-filter glassmorphism, native scroll-timeline/animation-timeline scroll animation, CSS grid morph transitions, and the View Transitions API for page swaps. Use this skill any time Jegatheesh wants a visual effect without pulling in GSAP/Lenis/Three.js — lighter, faster-loading pitch demos, effects that should work with JS disabled, or when he says things like "can this be pure CSS", "no library for this one", "lightweight version", or is speccing a fast/minimal client site. Also consult when the motion-scroll or threejs-motion skill effect could be achieved natively instead — flag the tradeoff (browser support, no scrub-fine-control) so he can choose.
---

# CSS-Native Effects Library

Effects that ship with zero JS dependency — no GSAP, no Lenis, no Three.js. Use for lightweight client builds, when JS-disabled fallback matters, or when an effect genuinely doesn't need a JS library's control (native CSS now handles scroll-linked animation and page transitions on its own in Chromium browsers).

## Browser support reality check (check before committing to any of these for a client build)

- `mix-blend-mode`, `clip-path`, `backdrop-filter`: full modern support, safe to use everywhere.
- `scroll-timeline` / `animation-timeline: scroll()`: Chromium-only as of writing (no Firefox/Safari) — always pair with a `@supports` fallback or accept Chromium-only enhancement.
- View Transitions API (same-document and cross-document): Chromium-only, Safari has partial same-document support, Firefox behind a flag. Treat as progressive enhancement, never the only interaction path.
- CSS Grid morph via `grid-template` transitions: broad support for the animatable grid properties used below, but complex track-count changes may need a fallback layout for older engines.

For client pitch demos this is usually fine (client watches on your machine/a modern browser), but flag Chromium-only effects explicitly if the site ships to production for a broad audience.

## Effect index

| # | Effect | File | Section |
|---|--------|------|---------|
| 1 | mix-blend-mode text/image overlay | overlay-effects.md | Blend Mode Text/Image Overlay |
| 2 | clip-path polygon reveal | overlay-effects.md | Clip-Path Polygon Reveal |
| 3 | backdrop-filter glassmorphism | overlay-effects.md | Glassmorphism Panel |
| 4 | scroll-timeline / animation-timeline (native scroll animation) | scroll-native.md | Native Scroll-Linked Animation |
| 5 | CSS grid morph transition | scroll-native.md | Grid Morph Transition |
| 6 | View Transitions API page swap | view-transitions.md | Same-Document & Cross-Document Swap |

## Usage rules

- Prefer these over a JS library whenever the effect is a one-shot state change (hover, class toggle, page swap) rather than something needing frame-by-frame scrub control tied precisely to scroll position — that's still GSAP/ScrollTrigger territory (see `motion-scroll` skill).
- Always wrap Chromium-only features in `@supports` so the fallback is a static (non-broken) state, never a missing/broken layout.
- `backdrop-filter` is GPU-expensive when stacked on many elements or animated continuously — use sparingly on scroll-heavy pages, and never animate `backdrop-filter` blur radius every frame; toggle between two fixed states instead.
- View Transitions API cross-document swaps require both pages to opt in via `@view-transition { navigation: auto; }` — same-document swaps use `document.startViewTransition()` in a few lines of JS but no animation library.
- Test grid morph transitions with real content lengths, not lorem-ipsum placeholders — reflow behavior during the transition differs a lot with real copy length.

Read the relevant reference file(s) fully before wiring an effect in — snippets include required HTML structure, fallback code, and browser-support gotchas.
