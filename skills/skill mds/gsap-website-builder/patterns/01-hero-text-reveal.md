# Pattern 1: Hero Text Reveal

The first thing a visitor sees animate. Gets disproportionate weight in how "premium" a site feels — get this one right even if you cut everything else.

## HTML

```html
<h1 class="hero-title">
  <span class="line"><span class="line-inner">Design that moves</span></span>
  <span class="line"><span class="line-inner">people, not just pixels</span></span>
</h1>
```

The nested span structure (`line` with `overflow: hidden`, `line-inner` that actually translates) is what gives the clean "rising out from behind a mask" look instead of a plain fade — it's the single biggest upgrade over the default "fade + translateY" AI reaches for.

## CSS

```css
.hero-title .line {
  display: block;
  overflow: hidden;
}
.hero-title .line-inner {
  display: block;
  transform: translateY(110%);
}
```

## JS (GSAP 3)

```js
gsap.registerPlugin(ScrollTrigger); // not required for this pattern alone, but usually present

const tl = gsap.timeline({ delay: 0.2 });

tl.to(".hero-title .line-inner", {
  y: "0%",
  duration: 1,
  ease: "power4.out",
  stagger: 0.12
});
```

That's the whole thing. Resist the urge to add character-level splitting for most projects — line-level reveal already reads as premium and is far more robust (no SplitText plugin dependency, no font-loading race conditions).

## When to go character/word level instead

Only for Agency-vibe hero moments where the headline IS the design statement (e.g. a single big word). Use SplitText (free as of the 2025 GSAP plugin release):

```js
gsap.registerPlugin(SplitText);

const split = new SplitText(".hero-title", { type: "chars, words" });

gsap.from(split.chars, {
  y: 60,
  opacity: 0,
  duration: 0.8,
  ease: "power3.out",
  stagger: 0.02
});
```

## Vibe variants

- **Agency:** `power4.out`, duration 1-1.2s, stagger 0.12-0.15s. Consider pairing with a subtle scale-in on a background element simultaneously.
- **SaaS:** `power2.out`, duration 0.5-0.6s, stagger 0.04s. Keep it fast — the user has seen this exact site pattern before and doesn't need it slowed down for drama.
- **Luxury:** `power1.out` or `sine.out`, duration 1.2-1.6s, stagger 0.2s. Let each line fully settle before the next starts — don't overlap them much.

## Common mistake

Don't animate opacity AND the mask-reveal translateY AND a scale, all at once, on the hero title. Pick the mask reveal (this pattern) OR a simple fade+rise — combining several techniques on the single most-noticed element of the page reads as busy, not impressive.
