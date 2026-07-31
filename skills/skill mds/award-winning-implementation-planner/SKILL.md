---
name: award-winning-implementation-planner
description: Use this skill whenever the user wants to plan, structure, or build an "award-winning," "Awwwards-style," "premium," "$50k agency-level," or "creative" website — before or alongside writing any code. Trigger on phrases like "make it feel expensive," "award winning," "creative direction," "implementation plan," "site of the day," or any request to build a portfolio/agency/photography/brand site with GSAP, three.js, or parallax that should NOT look like generic templated AI output. This skill turns a rough brief into a concrete creative-direction + build plan (vibe, hero concept, animation moments, layout, tech choices) BEFORE code is written. It always outputs plain HTML/CSS/JS — no React, Vue, Next.js, or any other framework, and no build tooling (no bundlers, no npm install step required to run it). Use this alongside (not instead of) the gsap-website-builder and frontend-design skills — this skill decides WHAT to build and in what order; those skills supply the HOW (pattern code, easing, tokens).
---

# Award-Winning Website Implementation Planner

## What this skill is

AI-generated "award-winning" website requests almost always fail for the same reason: the AI jumps straight to code (a hero + parallax + GSAP scroll reveals) without ever deciding *what the site is actually about*. Awwwards-tier sites are built around **one strong idea**, expressed through restraint, not a checklist of effects bolted onto a template.

This skill's job is to sit **before the code**. It forces a real creative-direction pass and turns it into a concrete, ordered implementation plan — sections, hero concept, the 4-6 animation moments (max), layout rules, and plain HTML/CSS/JS file structure — that you (or another skill) then build from.

**Hard constraint: no frameworks, ever.** Every plan this skill produces assumes plain `.html` / `.css` / `.js` files, vanilla DOM APIs, and libraries loaded via `<script>` CDN tags only (GSAP, three.js, etc. are fine — a JS *framework* like React/Vue/Svelte/Next.js is not, and neither is a bundler/build step like Vite or Webpack). If the user's project already has a framework, flag it and ask whether they want the plan adapted or whether they want a frameworkless rebuild.

## Workflow

### Step 1 — Extract the brief
Pull from the conversation (or ask, max 2-3 questions, only if genuinely missing):
- What is the site for? (photography, agency, product launch, portfolio, event, brand)
- Any reference sites / Awwwards links they admire?
- Single page or multi-page?

Don't over-ask — infer tone from context (a "Surya photography" site implies visual/portfolio-led; a "SaaS launch" implies conversion-led) and state assumptions rather than blocking on questions.

### Step 2 — Pick ONE vibe (never blend more than one)
Read `references/vibe-profiles.md`. Pick exactly one of: **Editorial/Luxury**, **Agency/Bold**, **Portfolio/Cinematic**, or **SaaS/Clean**. This single choice determines pacing, easing, type scale, and color approach for the entire plan — do not mix vibes.

### Step 3 — Define the hero concept
Every award-winning site has ONE big idea the whole site orbits — not a list of features. Read `references/hero-concept.md` for how to derive this (a visual metaphor, a single interaction, or a narrative through-line) and write it as 1-2 sentences before doing anything else. Everything else in the plan must serve this concept — if a proposed section or effect doesn't serve it, cut it.

### Step 4 — Select 4-6 animation moments (not more)
Cross-reference the vibe against `references/moment-selection.md`, which maps site sections (hero, work grid, about, footer, etc.) to the right pattern from the gsap-website-builder skill's 10 patterns, plus when a three.js scene is actually worth its cost vs. when it's just decoration. Output a table: **Section → Pattern → Why it serves the hero concept**. If you can't justify a moment against the hero concept, drop it.

### Step 5 — Lay out the frameworkless build plan
Read `references/frameworkless-structure.md`. Produce:
- File tree (plain HTML/CSS/JS only — e.g. `index.html`, `css/main.css`, `js/main.js`, `js/animations.js`, no `package.json` required to view it — CDN script tags handle GSAP/three.js)
- Section-by-section HTML outline (semantic tags, not divs-on-divs)
- Build order (what to build/verify first so later animation work has stable DOM to hook into)

### Step 6 — Run the restraint + frameworkless check before presenting the plan
- [ ] Is there exactly one vibe, one hero concept, and ≤6 animation moments?
- [ ] Does every moment trace back to the hero concept? Cut any that don't.
- [ ] Is the plan 100% plain HTML/CSS/JS — zero framework, zero required build step?
- [ ] Could this plan be handed to gsap-website-builder / three.js code directly, section by section, without further creative decisions needed?

## Handoff

Once the plan is approved, build section-by-section using the `gsap-website-builder` skill for animation patterns and `frontend-design` skill for visual/typography polish — this skill's plan is the spec they both build against. Don't re-decide creative direction mid-build; if new ideas come up, run them back through Step 4's justification test first.

## Reference files
- `references/vibe-profiles.md` — the 4 vibe profiles and what each locks in (pacing, easing, palette approach, type scale)
- `references/hero-concept.md` — how to derive the one big idea a site orbits
- `references/moment-selection.md` — mapping sections → GSAP/three.js patterns, and a three.js cost/benefit test
- `references/frameworkless-structure.md` — plain HTML/CSS/JS file structure, CDN loading, and build order
