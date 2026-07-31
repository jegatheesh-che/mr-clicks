# View Transitions API

Native browser API for animated page/state swaps — no page-transition-overlay JS needed (compare to the `motion-scroll` skill's manual overlay approach, which is the fallback for non-Chromium browsers). Chromium-only currently; Safari has partial same-document support, Firefox is behind a flag.

## Same-Document Swap (SPA-style state change, no full navigation)

Use for filter/tab switches, image gallery changes, or any DOM update that should morph rather than snap — works within a single page load, no router needed.

HTML:
```html
<div class="gallery">
  <img src="photo-1.jpg" class="gallery-active" style="view-transition-name: gallery-image">
</div>
<button class="next-btn">Next</button>
```

JS:
```js
const images = ['photo-1.jpg', 'photo-2.jpg', 'photo-3.jpg'];
let index = 0;
const imgEl = document.querySelector('.gallery-active');
const nextBtn = document.querySelector('.next-btn');

nextBtn.addEventListener('click', () => {
  index = (index + 1) % images.length;

  if (!document.startViewTransition) {
    imgEl.src = images[index]; // fallback: instant swap, no transition
    return;
  }

  document.startViewTransition(() => {
    imgEl.src = images[index];
  });
});
```

CSS (customize the default cross-fade, optional):
```css
::view-transition-old(gallery-image),
::view-transition-new(gallery-image) {
  animation-duration: 0.5s;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}
```

Gotcha: `view-transition-name` must be **unique** per element at any given moment — if the outgoing and incoming elements share the same name simultaneously (e.g., during a list re-render), the API throws and the transition silently fails. For lists, assign transition names dynamically per-item (`gallery-image-${id}`) and clear them after the transition completes if reused elsewhere.

---

## Cross-Document Swap (real page navigation, MPA)

For vanilla multi-page sites (the common case for client builds without a JS router), enable transitions between full page loads with almost no JS — just an opt-in on both pages.

CSS (add to every page that should participate):
```css
@view-transition {
  navigation: auto;
}
```

That's it for the default cross-fade between pages. To customize the transition (e.g., a shared header that should morph position instead of cross-fade):

```css
/* On the element that exists (with matching content) on both pages */
.site-header {
  view-transition-name: site-header;
}

::view-transition-old(site-header),
::view-transition-new(site-header) {
  animation-duration: 0.4s;
}
```

To detect direction (back vs forward) and customize the animation accordingly:
```js
window.addEventListener('pageswap', (e) => {
  if (e.viewTransition) {
    document.documentElement.dataset.direction = e.navigationType === 'traverse' ? 'back' : 'forward';
  }
});
```

```css
[data-direction="back"]::view-transition-old(root) { animation-name: slide-out-right; }
[data-direction="forward"]::view-transition-old(root) { animation-name: slide-out-left; }
```

Gotcha: cross-document view transitions require **both** the outgoing and incoming page to have the `@view-transition { navigation: auto; }` rule (or matching JS opt-in) — if only one page has it, the browser falls back to a normal hard navigation with no transition, silently. Double check the rule is in the shared CSS file included on every page, not just the homepage.

## When to use this vs. the motion-scroll page-transition overlay

- Use View Transitions API when the target browser is known to be Chromium-heavy (internal demos, client review on your machine, Chrome-first audiences) and you want zero custom JS.
- Use the GSAP overlay approach from `motion-scroll` when the site needs guaranteed cross-browser transition behavior (Safari/Firefox users included) — it works everywhere since it's just a DOM element and a tween, not a browser API.
