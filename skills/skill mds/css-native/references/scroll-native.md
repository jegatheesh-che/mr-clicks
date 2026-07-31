# Native Scroll-Linked Effects

## Native Scroll-Linked Animation

`animation-timeline: scroll()` ties a `@keyframes` animation's progress directly to scroll position — no JS, no ScrollTrigger. Chromium-only currently (Chrome/Edge 115+); always pair with a `@supports` fallback.

HTML:
```html
<div class="scroll-fade-item">Card content</div>
```

CSS:
```css
@keyframes fade-up {
  from { opacity: 0; transform: translateY(60px); }
  to { opacity: 1; transform: translateY(0); }
}

.scroll-fade-item {
  animation: fade-up linear both;
  animation-timeline: scroll(root block);
  animation-range: entry 0% cover 30%;
}

/* Fallback: show content plainly if scroll-timeline isn't supported */
@supports not (animation-timeline: scroll()) {
  .scroll-fade-item { opacity: 1; transform: none; }
}
```

Progress bar tied to page scroll (common use case):
```css
@keyframes grow-progress {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
.scroll-progress-bar {
  position: fixed; top: 0; left: 0; height: 4px; width: 100%;
  transform-origin: left;
  background: linear-gradient(90deg, #ff3d00, #7b2ff7);
  animation: grow-progress auto linear;
  animation-timeline: scroll(root);
}
```

View-based timeline (element progress as it crosses the viewport, independent of full-page scroll — good for per-card reveals in a grid):
```css
.card {
  animation: fade-up linear both;
  animation-timeline: view();
  animation-range: entry 10% cover 40%;
}
```

Gotcha: `scroll()` ties animation progress to the *scroll container's* scroll position (0% to 100% of total scrollable distance), while `view()` ties it to the *element's own position crossing the viewport* — mixing these up is the most common reason the animation fires at the wrong point. Use `scroll()` for whole-page-tied effects (progress bars, hero parallax), `view()` for per-element reveal-on-enter effects (card grids, staggered lists).

---

## Grid Morph Transition

Animate `grid-template-columns` / `grid-template-rows` on a class toggle to morph a layout (e.g., a gallery grid collapsing into a featured single-item view) — no JS animation library, just a CSS transition on the grid properties plus a class toggle (which can be pure `:hover`/`:focus` or a tiny JS toggle).

HTML:
```html
<div class="morph-grid">
  <div class="grid-item featured">A</div>
  <div class="grid-item">B</div>
  <div class="grid-item">C</div>
  <div class="grid-item">D</div>
</div>
```

CSS:
```css
.morph-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1rem;
  transition: grid-template-columns 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.morph-grid.is-expanded {
  grid-template-columns: 3fr 1fr 1fr 1fr;
}

.grid-item {
  transition: grid-column 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
```

```js
// Minimal JS, just a class toggle — no animation engine involved
document.querySelector('.morph-grid').addEventListener('click', (e) => {
  if (e.target.closest('.featured')) e.currentTarget.classList.toggle('is-expanded');
});
```

Item span-change morph (item grows from 1 column to 2 on toggle):
```css
.grid-item { grid-column: span 1; transition: grid-column 0.4s ease; }
.grid-item.is-active { grid-column: span 2; }
```

Gotcha: browsers can animate `grid-template-columns` when both states have the **same number of tracks** (interpolating the size values) — but if the track *count* changes (e.g., 4 columns collapsing to 2), the transition snaps instead of animating smoothly. Keep track count constant and only change the size ratios (`fr` values) for a smooth morph; use `grid-column: span` transitions (shown above) for item-level growth instead.
