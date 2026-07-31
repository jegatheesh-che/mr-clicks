---
name: color-theory
description: >
  Pro-level color psychology, value theory, and award-winning color/typography
  combinations for web design. Use this whenever building or restyling a
  website, landing page, app UI, pitch deck, or brand system — especially when
  the goal is a distinctive, premium, "Awwwards-caliber" look, or when the
  user asks about color palettes, color psychology, brand colors,
  contrast/value, or font pairing. Trigger this even if the user only says
  something like "make this look more premium," "pick better colors," "what
  fonts go with this," or "make it feel expensive" — those are
  color/typography requests even without the words "color theory." Use
  alongside frontend-design, which handles overall UI craft — this skill
  supplies the deep palette science, curated high-end palette recipes with
  hex values, and typography pairings that back up those choices.
---

# Color Theory & Typography for High-End Design

Think like a color director at a top-tier brand studio, not like someone picking colors that "look nice." The gap between an amateur palette and an award-winning one is rarely hue choice — it's **value structure**, **restraint**, and **an emotional thesis the palette is actually arguing for**. This skill gives you the psychology, the value discipline, and a library of proven high-end combos so every palette you produce is a deliberate choice, not a default.

## Workflow

Work in this order — value and intent come before specific hues, because a good value structure with mediocre hues still looks premium, while great hues with a flat value structure never do.

**1. Pin the emotional thesis.** Before touching hex codes, state in one sentence what the palette needs to make someone feel and who it's for (e.g. "trustworthy but not corporate, for a fintech targeting freelancers" vs. "loud, kinetic, for a sneaker drop landing page"). Read `references/color-psychology.md` to ground hue choices in what they actually signal, including where associations shift by culture or context — don't guess.

**2. Choose the value structure first.** This is the single highest-leverage decision and the one generic palettes skip. Decide:
   - **Light, dark, or split?** (dominant background value)
   - **Contrast ratio between background and dominant surface** — subtle (low-drama, editorial) vs. stark (high-drama, bold)
   - **Where does the eye land first?** — pick ONE element that gets the highest-contrast, highest-saturation treatment. Everything else stays quieter than you think it should. This is what separates "premium" from "busy."

   A palette with five saturated hues at equal value all competing for attention is the #1 tell of an unrefined design. Award-winning palettes are usually 80-90% restrained neutrals/near-neutrals doing the value work, with color deployed in one or two disciplined moves.

**3. Pick a palette formula.** Don't invent from scratch every time — start from a proven structural formula, then customize the actual hues to the brief. Read `references/palette-library.md` for 12 named, high-end palette systems with real hex values, organized by mood/category (editorial, luxury, cyber, organic, brutalist, etc.), each with the value logic that makes it work.

**4. Pair typography to the palette's personality.** Color and type need to argue the same thesis — a maximalist neon palette with a timid humanist sans reads as confused, not bold. Read `references/typography-pairing.md` for pairing logic and specific recipes (display + body + mono/utility combos) matched to each palette mood from the library.

**5. Validate before finalizing.**
   - Body text on background: WCAG AA minimum is 4.5:1 contrast (large text/UI elements: 3:1). Check this even for "vibey" palettes — inaccessible text isn't a stylistic risk, it's a bug.
   - Squint test: does one clear focal point emerge, or does everything fight for attention?
   - Desaturate the whole palette to grayscale (mentally or in a tool) — if the value structure doesn't hold up in grayscale, the color is doing too much of the work and it will look muddy or flat in practice, especially for colorblind users (~8% of men).

## Quick reference: what to reach for

| Brief signal | Value structure | Starting point in the library |
|---|---|---|
| "Trustworthy, premium, not boring" | Warm light or deep neutral + one confident accent | Warm Luxury, Editorial Mono |
| "Bold, loud, gen-z, kinetic" | High-contrast dark + acid/neon accent | Cyber Noir, Neo-Brutalist Acid |
| "Calm, clinical, high-trust (health/finance)" | Very light, low-saturation, cool-neutral base | Soft Clinical, Scandinavian Minimal |
| "Organic, human, sustainable" | Warm mid-value neutrals, desaturated earth hues | Earthy Organic |
| "Nostalgic but fresh" | Mid-value warm base + a period-correct accent pair | Retro-Futurism |
| "Maximalist, expressive, art-led" | Deliberately breaks the "one focal point" rule — but still needs an anchor neutral | Maximalist Gradient |

Don't stop at this table — it's a starting point, not the answer. The actual differentiator is customizing hues, exact values, and type pairing to the specific brief in `references/`, not reusing a recipe verbatim across projects. If you reuse the same 2-3 recipes for every brief, you've reproduced the "templated AI design" problem this skill exists to avoid.

## A note on restraint

The most common failure mode isn't picking bad colors — it's picking too many good ones at equal weight. If you find yourself with more than 2 saturated accent colors, or unsure which element is the focal point, cut back. A one-accent palette executed with confidence beats a five-accent palette every time.
