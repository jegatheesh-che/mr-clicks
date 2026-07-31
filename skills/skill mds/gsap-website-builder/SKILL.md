---
name: gsap-website-builder
description: Build premium, "expensive-feeling" GSAP-animated websites in plain HTML/CSS/JS — the kind of polish clients pay $50k+ agencies for. Use this skill any time the user asks to build, animate, or improve a website, landing page, portfolio, or section using GSAP, ScrollTrigger, or scroll animations — even if they just say "make it feel premium," "add some animation," "make this less boring," or reference Awwwards/agency-style sites. Also use when the user asks for a hero section, scroll reveal, pinned section, horizontal scroll, parallax, marquee, magnetic button, page transition, or SVG animation — these are the skill's 10 core patterns. Trigger this even if the user doesn't say "GSAP" by name — if they want a site to feel high-end, cinematic, or interactive, this is the skill to reach for.
---

# GSAP $50K Website Builder

## What this skill is

Most AI-generated GSAP code is *technically correct but cheap-feeling* — linear-ish easing, everything fades up 20px over 0.5s, no rhythm, no restraint. This skill exists to close that gap. It encodes how a senior agency motion developer actually thinks: which of the 10 patterns to reach for, how they'd tune it for the project's vibe, and — just as important — what they'd deliberately leave alone.

**The core belief this skill operates on: premium ≠ more animation. Premium = restraint + precision.** A $50k site usually has 4-6 animation moments done perfectly, not 20 done adequately. Your job is to pick the right patterns for the brief, not to use all 10 on every project.

## Workflow

1. **Read the brief, pick a vibe.** Don't ask the user to pick unless it's genuinely ambiguous — infer from context (industry, copy tone, any reference sites mentioned) and state your assumption. See `references/vibe-guide.md` for the three vibe profiles (Agency, SaaS, Editorial/Luxury) and how they change easing, duration, and pacing.
2. **Pick 3-6 patterns from the 10**, not all of them. See the pattern table below. Match patterns to what the page actually needs (a one-page portfolio needs different patterns than a SaaS landing page).
3. **Read the specific pattern file(s)** in `patterns/` for the ones you're using — each has working GSAP 3 code, tuning knobs, and vibe-specific variants.
4. **Read `references/technical-rules.md` before writing any ScrollTrigger code** — it covers setup order, cleanup, `matchMedia` for responsive behavior, and the mistakes that make sites feel janky (layout shift, double-firing triggers, scroll jank on mobile).
5. **Build it, then run the restraint check** (bottom of this file) before calling it done.

## The 10 patterns

| # | Pattern | File | Use when |
|---|---------|------|----------|
| 1 | Hero text reveal | `patterns/01-hero-text-reveal.md` | Almost every site — first impression |
| 2 | Scroll fade-up (staggered) | `patterns/02-scroll-fade-up.md` | Content sections, feature grids, cards |
| 3 | Pinned scrollytelling | `patterns/03-pinned-scrollytelling.md` | Story-driven sections, process explainers |
| 4 | Horizontal scroll section | `patterns/04-horizontal-scroll.md` | Portfolios, case studies, product galleries |
| 5 | Clip-path / mask reveal | `patterns/05-clip-path-reveal.md` | Hero images, section transitions |
| 6 | Magnetic button / cursor interaction | `patterns/06-magnetic-button.md` | CTAs, nav items — desktop only |
| 7 | Page/view transition | `patterns/07-page-transition.md` | Multi-page sites, route changes |
| 8 | Marquee / infinite loop | `patterns/08-marquee-loop.md` | Logo walls, tickers, tag lists |
| 9 | SVG path draw / morph | `patterns/09-svg-path-draw.md` | Logos, icons, illustrative diagrams |
| 10 | Parallax layers | `patterns/10-parallax-layers.md` | Hero depth, decorative background elements |

## Non-negotiable technical baseline

- **GSAP 3.x syntax only.** Never write `TweenMax`, `TimelineMax`, `TimelineLite`, or `TweenLite` — those are GSAP 2 and deprecated. Use `gsap.timeline()`, `gsap.to()`, `gsap.from()`, `gsap.fromTo()`.
- **All plugins are free** (GSAP made the full plugin set free in 2025, including ScrollTrigger, SplitText, MorphSVG, DrawSVG) — register what you need with `gsap.registerPlugin(...)`, no license workaround needed.
- **Load via CDN** in plain HTML:
  ```html
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/gsap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/ScrollTrigger.min.js"></script>
  ```
- **Respect `prefers-reduced-motion`.** Every build should check it and shorten/skip non-essential motion — this is a real accessibility requirement, not optional polish. Pattern files show the snippet.
- **Mobile-aware.** Pinning, horizontal scroll, and magnetic buttons often need to be disabled or simplified under ~768px. Use `ScrollTrigger.matchMedia()` — see `references/technical-rules.md`.

## The restraint check (run this before you're done)

Before presenting the result, check the build against these — this is what separates "AI slop with animation" from something that feels expensive:

- [ ] Is any single element animating for longer than ~1.2s outside of a deliberate slow cinematic moment? If so, it's probably too slow.
- [ ] Are more than 2 easing curves used across the whole page? Pick one primary ease (see vibe-guide) and stick to it — variety in easing reads as *inconsistent*, not dynamic.
- [ ] Does everything fade up 20-30px? That's the default AI move and it reads as template-y. At least one moment should do something else (reveal, scale, clip, draw).
- [ ] Is there a stagger anywhere that feels mechanical (identical delay, no `from: "start"`/`"center"`/edge logic)? Real agency staggers usually have a directional or center-out feel, not just top-to-bottom.
- [ ] Would removing 30% of the animations make it feel more premium, not less? If yes, remove them. This is the single highest-leverage question in this whole checklist.

## Reference files

- `references/vibe-guide.md` — the three vibe profiles and how they change every tuning decision
- `references/technical-rules.md` — ScrollTrigger setup order, cleanup, matchMedia, common bugs that break the "expensive" feel
