# Pattern 2: Scroll Fade-Up (Staggered)

The workhorse pattern — cards, feature grids, list items animating in as the user scrolls to them. This will be 50%+ of most builds. The difference between this looking cheap or expensive is almost entirely in the tuning numbers, not the technique.

## HTML

```html
<div class="feature-grid">
  <div class="feature-card">...</div>
  <div class="feature-card">...</div>
  <div class="feature-card">...</div>
</div>
```

## CSS (fallback hidden state — important, see technical-rules.md FOUC note)

```css
.feature-card {
  opacity: 0;
}
```

## JS (GSAP 3 + ScrollTrigger)

```js
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".feature-card").forEach((card, i) => {
  gsap.from(card, {
    opacity: 0,
    y: 24,
    duration: 0.6,
    ease: "power2.out",
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
      once: true
    }
  });
});
```

## Better: stagger the whole grid together instead of per-card triggers

Per-card triggers (above) are fine, but for a genuinely tight, intentional-feeling reveal, trigger the whole group once and let GSAP's stagger handle timing — this reads as more "designed" than each card independently noticing it entered the viewport:

```js
ScrollTrigger.batch(".feature-card", {
  start: "top 85%",
  once: true,
  onEnter: (batch) => {
    gsap.from(batch, {
      opacity: 0,
      y: 24,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.08
    });
  }
});
```

`ScrollTrigger.batch` is the right tool whenever you have more than ~3 similar elements — it groups elements that enter the viewport around the same scroll moment into one stagger, rather than each having its own independent trigger (which can look uncoordinated if the user scrolls fast).

## Directional stagger (upgrade over top-to-bottom default)

For a grid (not a single column), stagger from the center out or from one edge — this is the detail that separates agency work from tutorial code:

```js
gsap.from(".feature-card", {
  opacity: 0,
  y: 24,
  duration: 0.6,
  ease: "power2.out",
  stagger: {
    each: 0.08,
    from: "center" // or "edges", "start", "end", or [x,y] grid-aware
  },
  scrollTrigger: { trigger: ".feature-grid", start: "top 80%", once: true }
});
```

## Vibe variants

- **Agency:** y: 40-60px, duration 0.8-1s, stagger 0.1-0.15s, consider `from: "edges"` for a converging effect.
- **SaaS:** y: 12-16px, duration 0.4-0.5s, stagger 0.03-0.05s. Very subtle — should feel like content settling into place, not "flying in."
- **Luxury:** y: 20-30px, duration 1-1.3s, stagger 0.15-0.2s, often combined with a slight opacity-only treatment for text blocks vs. the y-translate for images.

## Common mistake

Using the exact same y-distance, duration, and ease for a 3-word tag AND a full image card AND a large heading. Scale the animation to the element's visual weight — bigger elements can support slightly more movement and duration; small text elements should move less and faster, or the small elements will look like they're "lagging behind" the eye's expectation.
