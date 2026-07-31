# Pattern 9: SVG Path Draw / Morph

A line or logo appears to draw itself, or one shape morphs into another. High-impact for logos, diagrams, and icon reveals. Uses the (now free) DrawSVG and MorphSVG plugins.

## Path draw-on (DrawSVG)

### HTML

```html
<svg viewBox="0 0 200 100" class="draw-svg">
  <path class="draw-path" d="M10,50 Q100,10 190,50" fill="none" stroke="currentColor" stroke-width="3" />
</svg>
```

### JS (GSAP 3 + DrawSVGPlugin)

```js
gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger);

gsap.set(".draw-path", { drawSVG: "0%" });

gsap.to(".draw-path", {
  drawSVG: "100%",
  duration: 1.5,
  ease: "power2.inOut",
  scrollTrigger: {
    trigger: ".draw-svg",
    start: "top 80%",
    once: true
  }
});
```

`drawSVG: "0%"` hides the path (zero-length visible stroke); animating to `"100%"` reveals it progressively along its length — this works for any path shape, not just straight lines, including complex logo marks.

### No-plugin fallback (pure CSS + GSAP, if you want to avoid the DrawSVG dependency)

Every SVG path has a real, measurable length — use it directly:

```js
const path = document.querySelector(".draw-path");
const length = path.getTotalLength();

gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

gsap.to(path, {
  strokeDashoffset: 0,
  duration: 1.5,
  ease: "power2.inOut",
  scrollTrigger: { trigger: ".draw-svg", start: "top 80%", once: true }
});
```

This achieves the identical visual result to DrawSVG using only native SVG properties — use this version by default; reach for the DrawSVG plugin specifically when you need partial-segment control (e.g. `drawSVG: "20% 80%"`, revealing a *middle* segment) which the manual dasharray approach can't easily do.

## Morph between two shapes (MorphSVG)

### HTML

```html
<svg viewBox="0 0 100 100">
  <path id="shape-a" d="M10,10 L90,10 L90,90 L10,90 Z" fill="currentColor" />
</svg>
```

### JS

```js
gsap.registerPlugin(MorphSVGPlugin);

gsap.to("#shape-a", {
  morphSVG: "M50,10 L90,90 L10,90 Z", // triangle path data
  duration: 1,
  ease: "power2.inOut",
  scrollTrigger: { trigger: "svg", start: "top 80%", once: true }
});
```

MorphSVG handles differing point counts between the two path shapes automatically — you don't need matching numbers of anchor points in the source and target `d` attributes.

## Scroll-scrubbed variant (draws in sync with scroll position, not on trigger)

```js
gsap.to(path, {
  strokeDashoffset: 0,
  ease: "none",
  scrollTrigger: {
    trigger: ".draw-svg",
    start: "top 80%",
    end: "bottom 20%",
    scrub: 1
  }
});
```

Good for a diagram that should feel "connected" to the reading pace, e.g. a process flow diagram alongside explanatory text.

## Vibe variants

- **Agency:** morph patterns, complex multi-path logo draw-ons, often combined as the "signature move" for a hero or brand-reveal moment.
- **SaaS:** simple line/icon draw-ons for diagrams (e.g. an architecture diagram, a workflow icon) — functional clarity over spectacle.
- **Luxury:** slow single-path draws (a monogram, a wordmark), duration 1.5-2.5s, `power1.inOut` — this pattern pairs exceptionally well with the Luxury vibe's patience.

## Common mistake

Forgetting `fill="none"` on a path meant to be stroke-drawn — if the shape has a fill, the fill renders immediately and fully visible while only the stroke animates, which defeats the entire effect (the shape appears "already there," just gaining an outline).
