# Moment Selection

Cross-reference the chosen vibe and hero concept against this map. Pick 4-6 total moments across the whole site — not per section. Every row you select must state why it serves the hero concept (Step 4's justification test).

## Section → Pattern map

| Section | Typical pattern (from gsap-website-builder's 10) | Notes |
|---|---|---|
| Hero | #1 Hero text reveal, or #5 Clip-path/mask reveal | Pick ONE, not both. This is usually where the hero concept shows up most directly. |
| Hero background depth | #10 Parallax layers | Only if the vibe is Editorial/Luxury or Portfolio/Cinematic — skip for Agency/Bold or SaaS/Clean, where a static or video hero often reads as more premium than layered parallax. |
| Work / project grid | #2 Scroll fade-up (staggered), or #4 Horizontal scroll | Horizontal scroll only for portfolios with ≤8-10 items; more than that becomes tedious to navigate. |
| Story / process section | #3 Pinned scrollytelling | Highest-cost pattern to build well — only use if the hero concept is explicitly narrative (see hero-concept.md, source #3). Don't use it just because it "looks cool" in isolation. |
| CTA / nav elements | #6 Magnetic button | Desktop only, disable under 768px. Use on ONE element max (usually the primary CTA) — using it on multiple buttons dilutes the effect. |
| Multi-page navigation | #7 Page transition | Only relevant for multi-page sites. |
| Logo wall / tags / credits | #8 Marquee/infinite loop | Cheap to build, easy to overuse — one marquee per site, not one per section. |
| Icon / logo reveal | #9 SVG path draw | Best for a single brand mark or a small icon set, not body content. |
| Footer | Usually static, or a subtle #2 fade-up | Footers rarely need their own signature moment — spend the budget elsewhere. |

## When three.js is actually worth it (vs. just decoration)

Three.js adds real build cost (asset loading, performance budget, mobile fallback). Only reach for it when:
- The hero concept is fundamentally spatial/3D (a product that needs to be seen from multiple angles, an abstract particle field that IS the metaphor, a environment/world the brand lives in).
- A 2D equivalent (parallax layers, clip-path, video) genuinely couldn't express the same idea.

Skip three.js when:
- It's being added "because it looks impressive" without tying to the hero concept — this is the single most common way sites get slow and generic-feeling despite using an impressive tool.
- The site is content/text-heavy (editorial, SaaS) — a 3D scene competing with reading content usually hurts more than it helps.

If using three.js: budget for a lightweight fallback (static image or CSS gradient) for low-end devices and `prefers-reduced-motion`, and keep it to ONE scene, not scattered 3D elements throughout.

## Final selection format

Present as a table:

| Section | Pattern | Why it serves the hero concept |
|---|---|---|
| Hero | Clip-path reveal shaped like [X] | Directly expresses the [metaphor] from the hero concept |
| ... | ... | ... |

Anything that can't fill in the third column honestly gets cut.
