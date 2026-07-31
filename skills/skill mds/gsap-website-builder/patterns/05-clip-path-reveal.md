# Pattern 5: Clip-Path / Mask Reveal

An image or block reveals via an animated clip-path rather than a plain fade — this is one of the highest "expensive-feeling per line of code" techniques available, and it's underused by AI-generated code because it requires knowing the clip-path syntax cold.

## HTML

```html
<div class="reveal-image">
  <img src="hero.jpg" alt="" />
</div>
```

## CSS (starting clipped state)

```css
.reveal-image {
  clip-path: inset(0 0 100% 0); /* fully hidden, revealing from top */
  overflow: hidden;
}
```

## JS (GSAP 3)

```js
gsap.registerPlugin(ScrollTrigger);

gsap.to(".reveal-image", {
  clipPath: "inset(0 0 0% 0)",
  duration: 1.2,
  ease: "power3.inOut",
  scrollTrigger: {
    trigger: ".reveal-image",
    start: "top 80%",
    once: true
  }
});
```

## Variant: reveal + subtle counter-scale (adds depth)

The single best upgrade to this pattern — the image scales slightly *against* the reveal direction, so it feels like it's settling into place rather than just appearing:

```js
gsap.fromTo(".reveal-image img",
  { scale: 1.15 },
  {
    scale: 1,
    duration: 1.4,
    ease: "power3.out",
    scrollTrigger: { trigger: ".reveal-image", start: "top 80%", once: true }
  }
);

gsap.to(".reveal-image", {
  clipPath: "inset(0 0 0% 0)",
  duration: 1.2,
  ease: "power3.inOut",
  scrollTrigger: { trigger: ".reveal-image", start: "top 80%", once: true }
});
```

## Variant: directional wipe (left-to-right instead of bottom-to-top)

```css
.reveal-image { clip-path: inset(0 100% 0 0); }
```
```js
gsap.to(".reveal-image", { clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "power3.inOut", /* ... */ });
```

Match the wipe direction to the layout — reveal in the direction the user's eye is already moving (e.g. left-to-right for a left-aligned heading next to the image), not arbitrarily.

## Vibe variants

- **Agency:** full-bleed hero images, dramatic directional wipes, sometimes combined with a horizontal-scroll panel transition (pattern 4) for a signature moment.
- **SaaS:** used sparingly — mostly for product screenshots. Keep the counter-scale subtle (1.05 → 1, not 1.15 → 1) and duration on the shorter end (0.6-0.8s).
- **Luxury:** the single most-used image technique for this vibe. Slow (1.4-1.8s), `power2.inOut` or `sine.inOut`, generous counter-scale (1.1-1.2 → 1) for that "breathing" quality.

## Common mistake

Using `clip-path` on an element with a box-shadow or that needs to overflow visually (e.g. a card with a drop shadow) — clip-path will cut off the shadow too. Wrap the image in a clipping container and keep the shadow on a separate outer element if you need both.
