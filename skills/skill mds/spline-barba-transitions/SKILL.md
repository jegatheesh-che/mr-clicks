---
name: spline-barba-transitions
description: Build Awwwards-caliber websites that combine Spline 3D scenes with Barba.js page transitions — the "3D room zoom" and "smooth page swap" combo seen on award-winning agency/portfolio sites. Use this skill whenever the user asks to embed a Spline 3D scene, wants camera zoom/dolly/orbit effects tied to scroll or navigation, wants smooth AJAX-style page transitions on a multi-page (non-SPA) site, or references Awwwards, Site of the Day, FWA, or "award-winning" site quality. Also trigger for requests involving 3D room/product reveals, curtain/wipe page transitions, or combining 3D scenes with page routing. No skill guarantees an award — judging is subjective — but this encodes the technical patterns and restraint discipline that consistently place well.
---

# Spline + Barba.js: 3D Scenes with Cinematic Page Transitions

## What this skill is

Two tools, one job: make a multi-page site feel like a single cinematic experience.

- **Spline** — visual 3D editor. You design the scene (room, product, abstract object) in the browser, export a `.splinecode` runtime file, embed it with a few lines of JS.
- **Barba.js** — intercepts internal link clicks, fetches the next page's HTML via AJAX, swaps DOM content, and gives you `leave()`/`enter()` hooks to animate the transition — so navigating between plain HTML pages feels like an SPA.

Combined: a Spline 3D scene persists or morphs across a Barba-driven page transition (e.g., the camera "flies through" a 3D room as the page swaps behind it), which is exactly the kind of moment that gets a site noticed.

**Reality check to give the user if they haven't heard it already:** award sites win on originality + craft + a coherent idea, not on stacking every effect in this file. Pick 1-2 signature moments and execute them precisely. State this once, then get on with building.

## Workflow

1. **Clarify the signature moment.** Ask (or infer from context): what's the ONE 3D moment this site is built around? (e.g., "camera flies into a product," "scroll-controlled room walkthrough," "abstract shape morphs between page states"). Everything else supports that moment — don't design five different 3D beats.
2. **Scope Spline vs. hand-code.** Spline is for designed/artistic scenes (rooms, products, organic shapes, stylized environments). If the ask is data-driven or needs custom shaders/physics beyond Spline's toolset, say so and suggest raw Three.js instead — see `references/spline-vs-threejs.md`.
3. **Read `references/spline-integration.md`** before writing any embed code — covers runtime setup, loading states, and controlling Spline objects from outside code (the part people get wrong).
4. **Read `references/barba-integration.md`** before writing transition code — covers container/namespace setup, GSAP-timeline transitions, and the #1 mistake (not re-initializing page-specific JS after a Barba transition).
5. **Read `patterns/spline-barba-combo.md`** for the actual recipe that ties them together — persisting a Spline canvas across a Barba transition vs. re-loading it per page, and how to sync camera animation to transition timing.
6. **Build it, then run the restraint check** below.

## Non-negotiable technical baseline

- **Spline runtime**: load via `@splinetool/runtime` (vanilla) or `@splinetool/react-spline` (React). CDN option: `https://unpkg.com/@splinetool/runtime/build/runtime.js`. Never scrape/embed a `.splinecode` URL without the user's own exported scene — that file is their design asset, not a stock resource.
- **Barba.js**: current major version is Barba 2.x. Load via CDN (`https://unpkg.com/@barba/core`) or npm (`@barba/core`). Pair with `@barba/prefetch` only if the site is small enough that prefetching every link won't bloat bandwidth.
- **Always show a loading state for Spline.** Runtime files can be 1-5MB+; a scene popping in unstyled reads as broken, not premium. Use Spline's `onLoad` event to gate a fade-in.
- **`prefers-reduced-motion`**: both the Barba transition timeline and any Spline camera animation driven by your own JS must check this and shorten/skip. Real accessibility requirement.
- **Mobile**: 3D scenes are expensive. Provide a fallback — a poster image or a simplified/static Spline export — under a device/viewport check. Full room-flythroughs on mid-range mobile GPUs janks and kills the "premium" feel instantly.
- **Cleanup discipline**: Barba's `enter()`/`leave()` hooks must properly dispose of the old page's event listeners and any Spline instance not being reused, or you'll leak WebGL contexts across navigations (this is the single most common bug in this combo — browsers cap concurrent WebGL contexts).

## The restraint check (run before calling it done)

- [ ] Is there exactly one primary 3D moment the site is "about," or did this turn into a demo reel of five different effects competing for attention?
- [ ] Does the Barba transition duration match the weight of the 3D moment — a heavy camera flythrough needs a transition timeline that gives it room (800ms-1.5s), not a snappy 300ms fade that fights it?
- [ ] Only one easing curve family used across both the Spline camera tweens and the Barba/GSAP transition timeline? Mismatched easing between the 3D motion and the page-chrome motion is the #1 tell of a bolted-together demo rather than one considered piece.
- [ ] Did you test navigating back and forth (not just once)? WebGL context leaks and double-fired ScrollTriggers only show up on the second or third transition.
- [ ] Mobile fallback in place and tested on an actual throttled/mid-tier profile, not just "resized the browser window"?
- [ ] Would removing the loading spinner/poster-image gate make the 3D scene ever appear to "pop in" unstyled? If yes, it's not done.

## Reference files

- `references/spline-integration.md` — runtime setup, embed code, loading gates, controlling Spline objects (camera, variables, events) from your own JS
- `references/barba-integration.md` — container/namespace setup, transition hooks, GSAP-timeline transitions, re-init pitfalls
- `patterns/spline-barba-combo.md` — the combined recipe: persisting vs. reloading the Spline canvas across a Barba transition, syncing camera moves to transition timing
- `references/spline-vs-threejs.md` — when to reach for Spline vs. when the ask actually needs raw Three.js
