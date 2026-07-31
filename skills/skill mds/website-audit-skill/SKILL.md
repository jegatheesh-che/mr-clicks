---
name: website-audit-skill
description: Produces a complete, machine-readable design audit of a live website including colors, typography, spacing, layout, components, assets, and animation behavior.
---
# Skill: Website Design Audit (Clone-Ready)

## Objective
Given a URL, produce a complete, machine-readable design audit of the live website —
colors, typography, spacing, layout, components, assets, and all animation/motion
behavior (load, scroll, hover) — detailed enough that another agent could rebuild a
visually and behaviorally faithful clone from the output alone.

This is a two-pass audit. Do NOT skip either pass. Source inspection alone misses
behavior; browser inspection alone misses exact token values. You need both.

---

## Inputs
- `url`: the target website (ask the user if not given)
- `pages` (optional): additional paths to audit beyond the homepage (e.g. `/pricing`).
  If not given, audit only the given URL.
- `viewports` (optional): defaults to `[1440x900, 768x1024, 375x812]` (desktop, tablet, mobile)

## Output
A single JSON file at `production_artifacts/audit_<domain>_<timestamp>.json`
following the schema in `@schema.json` in this skill folder.
Also save every screenshot taken to `production_artifacts/screenshots/` and
reference their filenames from the JSON so a human can visually cross-check
any extracted value.

---

## Step 1 — Source Pass (terminal, no browser yet)

1. `curl -sL <url>` the page HTML. Save it locally.
2. Find every linked stylesheet and JS bundle in the HTML (`<link rel=stylesheet>`,
   `<script src>`). Fetch each one with `curl`.
3. In the CSS:
   - Extract all `:root` / custom properties (`--color-*`, `--font-*`, `--space-*`) — these
     are gold, they're literally the author's design tokens.
   - Extract every `@font-face` (font family, weight, src) and every Google
     Fonts `<link>` in the HTML head.
   - Note the breakpoints used in `@media` queries.
4. In the JS bundles, grep (even if minified) for animation library fingerprints:
   - GSAP: `gsap.to(`, `gsap.from(`, `gsap.timeline(`, `ScrollTrigger.create(`,
     `scrub:`, `pin:`, `stagger:`, `ease:`, `duration:`
   - Framer Motion: `whileInView`, `variants`, `transition:`
   - AOS / Locomotive / Lenis / other scroll libraries: their init calls
   - Even in minified code these are often still string literals — capture any
     `duration`, `ease`, `delay`, `trigger`, `start`, `end` values you find verbatim
     and note which selector/class they're attached to if determinable.
5. Record everything found in this pass — even partial info is useful for Step 3.

## Step 2 — Browser Pass (use browser primitives — invoke with `/browser` if needed)

For each viewport in `viewports`, for each page in `pages`:

1. Navigate to the URL. Wait for network idle.
2. **Load/entrance state**: screenshot immediately, then screenshot again at
   +500ms, +1000ms, +2000ms after load, to capture any entrance animation
   (hero fade-ins, staggered reveals, preloaders). Note what changed between
   frames (opacity, transform, position) and estimate duration/easing/stagger
   from the frame deltas.
3. **Computed styles**: for the hero section, navbar, primary buttons, cards,
   and any other visually distinct component, capture computed styles via the
   browser's dev tools / JS evaluation — not just what's in the CSS source
   (specifically: color, background-color, font-family, font-size, font-weight,
   line-height, letter-spacing, padding, margin, border-radius, box-shadow,
   gap). Do this in addition to Step 1's source values, since computed values
   are ground truth (they account for cascade, resets, and JS-applied inline
   styles that source inspection can miss).
4. **Scroll behavior**: scroll down the page in ~10 increments (or by section).
   At each increment, screenshot and note anything that visibly animates in,
   pins, parallaxes, or changes on scroll. Cross-reference against the
   ScrollTrigger/AOS config found in Step 1 to attach exact numbers where
   possible; where no source match exists, describe the effect in structured
   terms anyway (type: fade-in/slide-up/scale/parallax, approximate distance,
   approximate duration inferred from how many scroll-increments it takes to
   complete).
5. **Hover/interaction states**: hover over nav links, buttons, and cards.
   Screenshot before/after. Note transform, color, shadow, or scale changes
   and their approximate transition duration (test by hovering and immediately
   un-hovering, observing if it snaps or eases).
6. **Assets**: list every `<img>`, background-image, and inline `<svg>` visible
   in the viewport, with its rendered dimensions, `object-fit`, and alt text.
   Note icon usage (icon font vs inline SVG vs sprite sheet).
7. **Layout**: for each major section, record display mode (flex/grid), direction,
   justify/align values, gap, and container max-width. Walk sections top to
   bottom in DOM order.

## Step 3 — Reconcile and Build the JSON

Merge Step 1 (exact source values) and Step 2 (computed/behavioral values).
Where they conflict, prefer Step 2 (browser ground truth) for anything visual,
but keep Step 1's exact animation-library parameters (duration/ease/scrub)
since those are more precise than frame-diffing estimates.

Write the final JSON to `production_artifacts/` following `@schema.json`.
Do not fabricate values you couldn't determine — mark them `null` with a
`"confidence": "estimated"` or `"unknown"` flag rather than guessing silently.

## Step 4 — Report

In your final chat response, summarize:
- Number of pages/viewports audited
- Design tokens found (short list of key colors/fonts)
- Number of animation instances detected and how many were source-confirmed
  vs behaviorally-estimated
- Link to the JSON file and the screenshots folder

// turbo
Run all `curl` and file-read/write commands automatically without asking for
approval. Always ask for approval before running anything that installs new
global packages.
