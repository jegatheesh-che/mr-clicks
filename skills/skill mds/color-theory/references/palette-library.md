# Palette Library — Reference

Twelve structural palette formulas seen repeatedly in high-end, Awwwards-caliber web design. Each includes real hex values, the **value logic** (why it works, not just what it is), and where it tends to show up. Use these as starting scaffolds — always shift the exact hues to fit the brief rather than reusing verbatim across unrelated projects.

Each recipe follows the same slots so they're easy to swap:
- **bg** — dominant background
- **surface** — cards/panels/sections sitting on bg
- **text** — primary body text
- **muted** — secondary text/borders/dividers
- **accent** — the one high-saturation focal-point color (used sparingly)

---

### 1. Editorial Mono
Cream base, near-black text, a single restrained accent. The "quiet confidence" formula — lets typography and whitespace carry the design.
- bg `#F7F4EE` · surface `#FFFFFF` · text `#1A1815` · muted `#8A8478` · accent `#B23A2E` (brick red, use on <5% of elements)
- Value logic: extremely narrow value range across bg/surface (both light) makes the near-black text and single accent do all the contrast work. Best for editorial, publishing, premium consumer brands.

### 2. Warm Luxury
Deep neutral base with a warm metallic-adjacent accent. Reads expensive without going full "dark mode SaaS."
- bg `#1C1815` · surface `#2A241E` · text `#F2EBDF` · muted `#9C9187` · accent `#C9A265` (muted gold)
- Value logic: dark but warm-tinted (not blue-black), so it feels rich rather than cold. Gold accent kept desaturated/muted, not shiny-metallic-literal, which reads more sophisticated than a bright yellow-gold.

### 3. Cyber Noir
Near-black with one electric accent. High drama, high contrast, built for a single hero moment.
- bg `#0B0B0F` · surface `#16161D` · text `#E8E8ED` · muted `#5C5C68` · accent `#39FF88` (acid green) or swap for `#7A5CFF` (electric violet)
- Value logic: the entire palette sits at very low value except the accent, which sits at maximum saturation and high value — creates a stark, unmissable focal point. Common in tech, gaming, music, streetwear.

### 4. Neo-Brutalist Acid
Off-white or true white with hard black and one clashing, loud accent — sometimes two.
- bg `#FFFFFF` · surface `#EFEFEF` · text `#0A0A0A` · muted `#6B6B6B` · accent `#FF3B1F` (vermilion) + optional secondary `#FFE600` (acid yellow) used only as a small pop, never load-bearing
- Value logic: intentionally breaks the "smooth luxury" playbook — hard-edged black on white with zero gradients, high-saturation accents used flat (no soft shadows). Works when the brief wants "loud and unapologetic," not premium-quiet.

### 5. Soft Clinical
Very light, cool-neutral, minimal saturation anywhere. Built for trust without coldness.
- bg `#F5F7F8` · surface `#FFFFFF` · text `#22282D` · muted `#7C878E` · accent `#2E7D6B` (muted teal-green)
- Value logic: narrow, high value range throughout with a single low-saturation accent — nothing shouts. Common in health, fintech-for-trust, B2B SaaS that wants to avoid "generic blue corporate."

### 6. Earthy Organic
Warm, desaturated neutrals across the board — no true black or white anywhere.
- bg `#EDE6DA` · surface `#DED3C1` · text `#3A3128` · muted `#8C7F6C` · accent `#8A5A3B` (terracotta/walnut)
- Value logic: every value in the palette is desaturated and warm-shifted, including "text" — avoids pure black for a softer, more human feel. Common in sustainability, food, wellness, craft/heritage brands.

### 7. Scandinavian Minimal
Cool near-whites with a single desaturated blue or sage accent. Maximum restraint.
- bg `#FAFAF9` · surface `#F0F0EE` · text `#2B2B2B` · muted `#A3A39D` · accent `#5B7B7A` (sage-teal)
- Value logic: color is nearly absent — the "accent" is barely more saturated than the neutrals. Relies entirely on typography, spacing, and photography to carry personality. High risk of looking generic if executed without a strong typographic signature (pair carefully — see typography-pairing.md).

### 8. Retro-Futurism
Warm mid-value base with a period-correct duo (not just one) accent pair.
- bg `#E8DCC8` · surface `#D4C4A8` · text `#2E2418` · muted `#8A7A5C` · accent primary `#D4573F` (burnt orange) + accent secondary `#3E6B5E` (deep teal)
- Value logic: unusually, this formula supports two accents at similar weight because they're period-matched (70s/80s-adjacent) rather than fighting — the "rule of one accent" bends when the two colors are drawn from the same era-specific story.

### 9. Maximalist Gradient
Deliberately breaks the restraint rule — but still needs ONE anchor neutral so it doesn't collapse into noise.
- anchor/text `#0F0F12` (near-black, used for all body copy regardless of gradient background) · gradient stops `#FF6B9D → #C060F5 → #4D7FFF` · surface (card on top of gradient) `#FFFFFF` at 92% opacity
- Value logic: the gradient supplies the "loud" energy; the anchor neutral for text and the near-opaque white surfaces are what keep it legible and prevent it from reading as chaotic. Never place body text directly on the raw gradient — always on a neutral surface layered above it.

### 10. Dark Glass (Glassmorphism)
Deep background with translucent, blurred surface panels and one saturated accent glow.
- bg `#0E0E14` · surface `rgba(255,255,255,0.06)` with backdrop-blur · text `#F0F0F5` · muted `#888896` · accent `#5B8CFF` (used as glow/border, not fill)
- Value logic: depth comes from blur and translucency layering rather than flat value steps — surfaces read as "floating" above the background. Needs real backdrop-filter support and restraint (2-3 glass layers max) or it collapses into visual mud.

### 11. High-Contrast Monochrome
Pure black and white, zero color, typography and imagery carry 100% of the personality.
- bg `#FFFFFF` · surface `#F5F5F5` · text `#000000` · muted `#767676` (meets AA on white) · accent — none; if one is needed, use black itself at varying weight/size rather than introducing hue
- Value logic: the absence of color is the choice, not a placeholder for one. Only works when typography is genuinely excellent (a strong display face doing real work) — this is the least forgiving formula on the list.

### 12. Bio-Luminescent (Nature-Tech)
Deep forest/ocean base with a bright, almost-glowing natural accent — nature and tech signaling at once.
- bg `#0D1B16` · surface `#152922` · text `#E4F0EA` · muted `#6E8C81` · accent `#4DFFB8` (glowing mint)
- Value logic: same low-value/high-accent-contrast logic as Cyber Noir, but the hue family (deep green + mint) signals nature/biotech instead of pure digital-tech. Common in climate tech, biotech, outdoor/adventure brands wanting a premium-tech edge.

---

## Choosing and customizing

1. Match the brief's emotional thesis to a formula using the quick-reference table in the main SKILL.md.
2. Shift the specific hues — don't just copy hex codes. If "Warm Luxury" fits the structure but the brand isn't gold-associated, keep the value logic (dark warm neutral + one muted, low-saturation accent) and swap in a different muted accent hue that fits the brand.
3. Re-run the contrast check in the main SKILL.md workflow (step 5) after any hue swap — shifting a hue can quietly break AA contrast even when the original recipe passed.
