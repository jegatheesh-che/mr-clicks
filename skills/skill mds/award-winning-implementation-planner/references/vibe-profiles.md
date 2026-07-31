# Vibe Profiles

Pick exactly ONE. Mixing vibes is the #1 way a site ends up feeling generic — every tuning decision downstream (easing, duration, type, color, spacing) should trace back to this single choice.

## 1. Editorial / Luxury
- **Feel:** slow, confident, a lot of whitespace, nothing rushes.
- **Pacing:** longer reveals (0.8-1.2s), generous scroll distance between moments.
- **Easing:** one soft, decelerating ease throughout (e.g. `power2.out` / custom cubic-bezier close to `ease-out-quart`). No bounce, no elastic.
- **Type:** a serif or high-contrast display face for headlines, paired with a quiet grotesk for body. Large type scale jumps (headline vs body should feel like two different worlds).
- **Color:** near-monochrome with one accent used sparingly (often just for a single CTA or hover state).
- **Good for:** photography, fashion, architecture, high-end product, personal portfolio for a senior creative.

## 2. Agency / Bold
- **Feel:** confident, a little aggressive, wants to be remembered in 3 seconds.
- **Pacing:** snappier (0.4-0.7s), but still only 1.2s max on any single element.
- **Easing:** one primary ease with more energy (e.g. `power3.out` or a custom overshoot on ONE hero moment only — not everywhere).
- **Type:** large, condensed or heavy display type; big type-scale contrast; often all-caps headlines.
- **Color:** high contrast — dark background + one loud accent, or stark black/white with a single color pop.
- **Good for:** agencies, studios, event/launch sites, anything meant to feel like a statement.

## 3. Portfolio / Cinematic
- **Feel:** story-driven, scroll feels like watching something unfold.
- **Pacing:** varies deliberately — slow cinematic hero (1-1.5s, the one exception to the "1.2s max" rule), then snappier pacing once the story is moving.
- **Easing:** one primary ease; pinned/scrollytelling sections tie animation progress directly to scroll position rather than time-based duration.
- **Type:** flexible — often pairs a striking display face for section titles with clean body type.
- **Color:** mood-driven — usually darker, moodier palettes with imagery doing most of the work.
- **Good for:** photography, film/video, personal narrative portfolios, case-study-led project sites.

## 4. SaaS / Clean
- **Feel:** trustworthy, fast, no-nonsense — motion supports clarity, never distracts from it.
- **Pacing:** fast and light (0.3-0.5s), motion should almost feel invisible.
- **Easing:** simple `power1.out` or `power2.out`, consistent everywhere.
- **Type:** clean grotesk/sans throughout, moderate scale contrast, high readability.
- **Color:** brand color + neutral grays, generous use of white/light backgrounds.
- **Good for:** product landing pages, B2B tools, apps — least "flashy" but still needs to feel premium and current.

## How to choose
Infer from the brief:
- Photography / personal brand / fashion → Editorial/Luxury or Portfolio/Cinematic (ask which if genuinely ambiguous — luxury = static elegance, cinematic = scroll-driven story)
- Studio / agency / event → Agency/Bold
- Product / tool / app → SaaS/Clean

State the chosen vibe explicitly at the top of the plan, e.g.: **"Vibe: Portfolio/Cinematic — slow story-driven scroll, moody palette, imagery-led."** Every later decision should be checkable against this line.
