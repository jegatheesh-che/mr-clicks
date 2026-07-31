# Layout & Transition Effects

## Horizontal Scroll Gallery

HTML:
```html
<section class="h-scroll-section">
  <div class="h-scroll-track">
    <div class="h-panel">1</div>
    <div class="h-panel">2</div>
    <div class="h-panel">3</div>
    <div class="h-panel">4</div>
  </div>
</section>
```

CSS:
```css
.h-scroll-section { overflow: hidden; }
.h-scroll-track { display: flex; width: max-content; }
.h-panel { width: 100vw; height: 100vh; flex-shrink: 0; }
```

JS:
```js
const track = document.querySelector('.h-scroll-track');
gsap.to(track, {
  x: () => -(track.scrollWidth - window.innerWidth),
  ease: 'none',
  scrollTrigger: {
    trigger: '.h-scroll-section',
    start: 'top top',
    end: () => `+=${track.scrollWidth - window.innerWidth}`,
    scrub: true,
    pin: true,
    invalidateOnRefresh: true,
  }
});
```

Gotcha: `end` must be recalculated on resize — `invalidateOnRefresh: true` plus a `ScrollTrigger.refresh()` call on window resize (debounced) keeps panel count changes and viewport changes in sync.

---

## Infinite Marquee

HTML (duplicate content once for seamless loop):
```html
<div class="marquee">
  <div class="marquee-track">
    <span>Web Design</span><span>Development</span><span>Branding</span>
    <span>Web Design</span><span>Development</span><span>Branding</span>
  </div>
</div>
```

CSS:
```css
.marquee { overflow: hidden; white-space: nowrap; }
.marquee-track { display: inline-flex; gap: 3rem; }
```

JS:
```js
const track = document.querySelector('.marquee-track');
const totalWidth = track.scrollWidth / 2;

gsap.to(track, {
  x: -totalWidth,
  duration: 20,
  ease: 'none',
  repeat: -1,
});
```

Pause on hover:
```js
const tween = gsap.to(track, { x: -totalWidth, duration: 20, ease: 'none', repeat: -1 });
track.parentElement.addEventListener('mouseenter', () => tween.pause());
track.parentElement.addEventListener('mouseleave', () => tween.resume());
```

Scroll-linked speed boost (marquee reacts to scroll velocity):
```js
let velocity = 0;
lenis.on('scroll', ({ velocity: v }) => { velocity = v; });
gsap.ticker.add(() => {
  tween.timeScale(1 + Math.min(Math.abs(velocity) * 0.05, 3));
});
```

Gotcha: content must be duplicated exactly (same width) or the loop jump is visible — measure `scrollWidth / 2`, don't hardcode a pixel distance.

---

## Page Transition

HTML: a fixed overlay element present on every page.
```html
<div class="page-transition-overlay"></div>
```

CSS:
```css
.page-transition-overlay {
  position: fixed; inset: 0;
  background: #111;
  transform: scaleY(0);
  transform-origin: bottom;
  z-index: 10000;
  pointer-events: none;
}
```

JS (intercept internal links, animate overlay, then navigate):
```js
const overlay = document.querySelector('.page-transition-overlay');

function transitionTo(href) {
  gsap.timeline()
    .set(overlay, { transformOrigin: 'bottom' })
    .to(overlay, { scaleY: 1, duration: 0.6, ease: 'power4.inOut' })
    .call(() => { window.location.href = href; });
}

document.querySelectorAll('a[href^="/"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    transitionTo(link.getAttribute('href'));
  });
});

// On new page load, reverse the overlay out
window.addEventListener('DOMContentLoaded', () => {
  gsap.set(overlay, { transformOrigin: 'top' });
  gsap.to(overlay, { scaleY: 0, duration: 0.6, ease: 'power4.inOut', delay: 0.1 });
});
```

For multi-page vanilla sites (no client-side router) this full-reload approach is the right call — a true morph/shared-element transition needs a SPA router (Barba.js or custom fetch-and-swap), which is heavier than most pitch demos need.

---

## Preloader Sequence

HTML:
```html
<div class="preloader">
  <div class="preloader-count">0%</div>
</div>
```

JS:
```js
window.addEventListener('load', () => {
  const counter = { val: 0 };
  const countEl = document.querySelector('.preloader-count');

  gsap.to(counter, {
    val: 100,
    duration: 1.8,
    ease: 'power2.inOut',
    onUpdate: () => { countEl.textContent = `${Math.floor(counter.val)}%`; },
    onComplete: () => {
      gsap.timeline()
        .to('.preloader-count', { opacity: 0, duration: 0.3 })
        .to('.preloader', { yPercent: -100, duration: 0.8, ease: 'power4.inOut' })
        .from('.hero-content', { opacity: 0, y: 40, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .add(() => document.querySelector('.preloader').remove());
    }
  });
});

// Lock scroll while preloader is active
document.body.style.overflow = 'hidden';
// unlock in the onComplete callback above:
// document.body.style.overflow = '';
```

Gotcha: don't gate the counter on real asset-load progress unless you're actually tracking it (e.g., via the image-sequence loader) — a fake timed counter that doesn't match actual load time reads as broken if the page is still loading content after it hits 100%. For pitch demos with light assets, the timed version above is fine; for image-sequence-heavy builds, drive `counter.val` from actual `Promise.all` image load progress instead.
