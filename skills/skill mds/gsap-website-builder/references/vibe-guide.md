# Vibe Guide

Every animation decision — duration, ease, stagger amount, how much movement — should trace back to one of these three vibes. Pick one per project (or per section, if the brief genuinely spans both, e.g. a luxury brand with a SaaS-y pricing page). State which vibe you picked and why before building.

## 1. Agency / Awwwards (bold, experimental)

**Feel:** confident, a little unexpected, willing to break grid conventions. Think design-studio portfolios, creative agencies, product launches for design-forward brands.

- **Primary ease:** `power4.out` for entrances, `power2.inOut` for scroll-scrubbed motion
- **Duration:** entrances 0.8-1.4s, micro-interactions 0.3-0.5s
- **Stagger:** larger and more visible — 0.08-0.15s between elements, often center-out or edge-out rather than top-to-bottom
- **Movement scale:** larger — 60-100px translates, full clip-path reveals, bold scale changes (0.8 → 1)
- **Signature move:** at least one moment of controlled "showing off" — a pinned horizontal section, a big clip-path hero reveal, or an SVG draw. This is the one place where more animation is the right call — but still just one or two moments, not five.
- **Color/timing pairing note:** bold vibe often pairs with dark backgrounds and high-contrast type reveals — make sure the animation supports the drama already in the design, not fighting it.

## 2. Premium SaaS (Linear / Stripe-like)

**Feel:** precise, confident, quiet. Nothing wobbles, nothing overshoots by accident. Every motion should feel like it was tuned by someone with very good taste and very little patience for excess.

- **Primary ease:** `power2.out` for entrances, `power1.inOut` for scroll-scrubbed motion. Avoid `elastic`, `bounce`, `back` entirely — SaaS sites never overshoot.
- **Duration:** entrances 0.4-0.7s, micro-interactions 0.15-0.25s — noticeably snappier than Agency
- **Stagger:** tight — 0.03-0.06s, almost imperceptible as "stagger," reads more as a ripple
- **Movement scale:** small — 12-24px translates, subtle opacity + slight scale (0.98 → 1), never full-screen dramatic reveals
- **Signature move:** the fade-up grid (pattern 2) and a very clean hero text reveal (pattern 1) are usually 80% of the build. Restraint IS the signature move here — resist the urge to add a horizontal scroll section just because it's in the pattern list.
- **Common mistake to avoid:** treating this like Agency vibe with smaller numbers. It's not just "smaller Agency" — the whole point is that the user should barely register that something animated; they should just feel like the page responded to them.

## 3. Editorial / Luxury (minimal, cinematic)

**Feel:** unhurried, confident enough to let things breathe. Think fashion houses, high-end real estate, hospitality, fine goods.

- **Primary ease:** `power1.out` or even `sine.inOut` — the goal is smoothness, not snap
- **Duration:** entrances 1.0-1.8s — deliberately slower than the other two vibes. This is the one vibe where slow reads as expensive rather than sluggish.
- **Stagger:** slow and generous — 0.15-0.25s, giving each element room to be noticed individually
- **Movement scale:** medium but full-bleed — large images doing slow parallax or scale (1.1 → 1 "breathing" zoom on hero images is a signature Luxury move), text usually just fades/rises gently rather than doing anything showy
- **Signature move:** parallax layers (pattern 10) and clip-path image reveals (pattern 5), both slowed down. Typography reveals should be understated — no character-by-character bounce, just clean line-by-line rises.
- **Common mistake to avoid:** adding SaaS-speed micro-interactions on hover states. Even hovers should feel unhurried here (0.4-0.6s instead of 0.15-0.2s).

## Quick decision table

| Signal in the brief | Likely vibe |
|---|---|
| "Portfolio", "case study", "creative", "bold" | Agency |
| "SaaS", "dashboard", "product", "clean", "modern" | SaaS |
| "Luxury", "fashion", "hotel", "real estate", "editorial" | Editorial/Luxury |
| No clear signal | Default to SaaS — it's the safest, most broadly "expensive-feeling" default and least likely to look try-hard |
