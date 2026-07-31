# Overlay Effects

## Blend Mode Text/Image Overlay

Large text overlapping an image, inverting/blending against it — no JS needed.

HTML:
```html
<div class="blend-hero">
  <img src="hero.jpg" alt="">
  <h1 class="blend-text">STUDIO</h1>
</div>
```

CSS:
```css
.blend-hero {
  position: relative;
  isolation: isolate; /* contains the blend mode to this stacking context */
}
.blend-hero img {
  width: 100%;
  display: block;
}
.blend-text {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: #fff;
  mix-blend-mode: difference;
  font-size: clamp(3rem, 12vw, 10rem);
  font-weight: 800;
  margin: 0;
  pointer-events: none;
}
```

Gotcha: without `isolation: isolate` on the parent, `mix-blend-mode` can blend against *everything* behind it in the stacking context (other sections, background), not just the image directly underneath — always scope it.

Two-color duotone variant (blend two overlapping divs instead of text):
```css
.duotone-wrap { position: relative; isolation: isolate; }
.duotone-wrap img { filter: grayscale(1) contrast(1.1); display: block; width: 100%; }
.duotone-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, #ff3d00, #7b2ff7);
  mix-blend-mode: color;
}
```

---

## Clip-Path Polygon Reveal

Angular reveal using `polygon()` — good for section dividers, image reveals, or hover states, entirely CSS-driven via a class toggle or `:hover`.

HTML:
```html
<div class="polygon-reveal">
  <img src="feature.jpg" alt="">
</div>
```

CSS (hover-triggered):
```css
.polygon-reveal {
  clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
  transition: clip-path 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.polygon-reveal.is-visible {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}
```

```js
// Trigger with IntersectionObserver instead of scroll library — no GSAP needed
const el = document.querySelector('.polygon-reveal');
new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting) el.classList.add('is-visible');
}, { threshold: 0.3 }).observe(el);
```

Diagonal section divider (static, no JS):
```css
.diagonal-section {
  clip-path: polygon(0 5%, 100% 0, 100% 95%, 0% 100%);
}
```

Gotcha: `polygon()` point coordinates must stay in the same order (clockwise or counter-clockwise consistently) between the start and end state, or the CSS transition interpolates points in a way that makes the shape twist/invert mid-animation instead of growing cleanly.

---

## Glassmorphism Panel

HTML:
```html
<div class="glass-panel">
  <p>Frosted glass card content</p>
</div>
```

CSS:
```css
.glass-panel {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(16px) saturate(160%);
  -webkit-backdrop-filter: blur(16px) saturate(160%);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
}
```

Fallback for browsers without `backdrop-filter` support:
```css
@supports not (backdrop-filter: blur(1px)) {
  .glass-panel {
    background: rgba(20, 20, 20, 0.75); /* solid dark fallback instead of transparent+no-blur */
  }
}
```

Gotcha: `backdrop-filter` only blurs what's *behind* the element in the same stacking context — if the panel sits on a `position: fixed` layer above content that hasn't rendered yet at that scroll position (e.g., inside a `transform`-ed ancestor, which creates a new containing block), the blur can visibly fail or blur the wrong layer. Test with real scroll content behind it, not a flat background color, before shipping.
