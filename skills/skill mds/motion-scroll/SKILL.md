---
name: motion-scroll
description: Library of production-ready GSAP + Lenis scroll/motion effects for vanilla HTML/CSS/JS client sites — hero text reveals, scroll-triggered stagger, pinned scrollytelling, horizontal galleries, clip-path masks, magnetic buttons, custom cursors, page transitions, marquees, SVG draw, parallax, scroll-scrub image sequences, preloaders, and scroll-linked theme transitions. Use this skill any time Jegatheesh is building a hero section, scroll animation, cursor interaction, page transition, or any "make it feel alive" motion request for a client pitch site or portfolio — even if he just says "add some scroll animation" or "make the hero cooler" without naming a specific effect. Also use when speccing a site with web-dev skill and the motion/animation system needs concrete GSAP+Lenis code, not just a description.
---

# Motion Scroll — GSAP + Lenis Effect Library

Drop-in vanilla JS effects for the stack: HTML/CSS/JS + GSAP (ScrollTrigger, SplitText/manual split) + Lenis. Built for client pitch demos — fast to wire up, no framework overhead.

## Setup (always do this first, once per project)

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://unpkg.com/lenis@1.1.13/dist/lenis.min.js"></script>
```

```js
gsap.registerPlugin(ScrollTrigger);

// Lenis + GSAP sync — CRITICAL: only ONE rAF driver. Never call lenis.raf inside
// its own requestAnimationFrame loop AND let GSAP ticker run separately — that's
// the double-loop bug (documented desync issue). Drive Lenis from gsap.ticker only.
const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
lenis.on('scroll', ScrollTrigger.update);
```

Every snippet below assumes this block already ran.

## Effect index

Pick by category, then jump to the matching file in `references/`.

| # | Effect | File | Section |
|---|--------|------|---------|
| 1 | Hero text split reveal (char/line/word stagger) | text-effects.md | Split Reveal |
| 2 | Clip-path mask reveal | text-effects.md | Clip-Path Mask Reveal |
| 3 | SVG path draw / line morph | text-effects.md | SVG Path Draw & Morph |
| 4 | Scroll-triggered fade-up with directional stagger | scroll-effects.md | Directional Fade-Up Stagger |
| 5 | Pinned scrollytelling section | scroll-effects.md | Pinned Scrollytelling |
| 6 | Sticky section pinning with progress-based animation | scroll-effects.md | Sticky Progress Pin |
| 7 | Scroll-driven scale/zoom transform | scroll-effects.md | Scroll Scale/Zoom |
| 8 | Scroll-linked color/theme transition | scroll-effects.md | Scroll Theme Transition |
| 9 | Parallax depth layers | scroll-effects.md | Parallax Layers |
| 10 | Image sequence scroll scrub (canvas frame-by-frame) | scroll-effects.md | Canvas Image Sequence Scrub |
| 11 | Magnetic button/cursor interaction | cursor-effects.md | Magnetic Button |
| 12 | Custom cursor with mix-blend-mode | cursor-effects.md | Custom Blend Cursor |
| 13 | Cursor-follow spotlight/reveal effect | cursor-effects.md | Spotlight Reveal |
| 14 | Horizontal scroll gallery | layout-effects.md | Horizontal Scroll Gallery |
| 15 | Infinite marquee loop | layout-effects.md | Infinite Marquee |
| 16 | Page transition (route morph) | layout-effects.md | Page Transition |
| 17 | Preloader / intro sequence animation | layout-effects.md | Preloader Sequence |

## Usage rules

- Copy the snippet, keep class/ID names consistent with the target markup, or rename both together.
- Always `ScrollTrigger.refresh()` after fonts/images load (`document.fonts.ready` / `window.onload`) — mistimed heights are the #1 cause of janky triggers.
- Kill/reset ScrollTriggers on breakpoint changes if the effect shouldn't run on mobile: wrap in `ScrollTrigger.matchMedia()`.
- For pitch demos, prefer `scrub: true` or a numeric scrub value over duration-based tweens when the effect should feel scroll-tied rather than autoplay-tied.
- Never run two rAF loops (see setup note above) — reuse the single Lenis+GSAP ticker for every effect on the page.
- When combining multiple effects on one page, register all ScrollTriggers before any manual `refresh()` call, and give each trigger a unique `id` for easier debugging.

Read the relevant reference file(s) fully before wiring an effect into a build — snippets include the required HTML structure and gotchas, not just the JS.
