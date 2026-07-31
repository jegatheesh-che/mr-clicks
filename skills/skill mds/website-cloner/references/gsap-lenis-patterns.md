# GSAP + Lenis Patterns for Vanilla Clone Builds

## 1. Correct Lenis + GSAP ScrollTrigger setup (single instance only)

The #1 bug in vanilla GSAP+Lenis builds is initializing Lenis more than once,
or letting both Lenis's own RAF loop and GSAP's ticker fight each other.
This causes scroll desync, jittery pinning, and ScrollTrigger positions
going stale on resize. Only ever create ONE Lenis instance, and drive it
from GSAP's ticker — don't call `requestAnimationFrame` yourself for Lenis.

```js
// main.js
gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

// Drive Lenis from GSAP's ticker instead of its own rAF loop
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// Keep ScrollTrigger in sync with Lenis's scroll position
lenis.on('scroll', ScrollTrigger.update);
```

Do NOT also run `function raf(time){ lenis.raf(time); requestAnimationFrame(raf); } requestAnimationFrame(raf);`
alongside the gsap.ticker version above — that's the double-loop bug. Pick
ONE driver (gsap.ticker is preferred since ScrollTrigger already listens to it).

## 2. Hero load-in animation

```js
const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
heroTl
  .from('.hero-nav', { y: -20, opacity: 0, duration: 0.6 })
  .from('.hero-title', { y: 40, opacity: 0, duration: 0.8 }, '-=0.3')
  .from('.hero-subtitle', { y: 20, opacity: 0, duration: 0.6 }, '-=0.5')
  .from('.hero-cta', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4');
```

## 3. Scroll-triggered section reveal (fade + rise, staggered)

```js
document.querySelectorAll('.reveal-group').forEach((group) => {
  gsap.from(group.querySelectorAll('.reveal-item'), {
    scrollTrigger: {
      trigger: group,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
    y: 30,
    opacity: 0,
    duration: 0.7,
    stagger: 0.12,
    ease: 'power2.out',
  });
});
```

## 4. Parallax (background or image layer)

```js
gsap.utils.toArray('.parallax-layer').forEach((layer) => {
  const speed = layer.dataset.speed || 0.3; // 0 = static, 1 = normal scroll
  gsap.to(layer, {
    yPercent: -100 * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: layer.closest('.parallax-section'),
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
});
```

## 5. Sticky section (pin) — e.g. a sticky feature showcase

```js
ScrollTrigger.create({
  trigger: '.sticky-section',
  start: 'top top',
  end: '+=100%',
  pin: true,
  pinSpacing: true,
});
```

## 6. Sticky/shrinking nav on scroll

```js
ScrollTrigger.create({
  start: 'top -80',
  end: 99999,
  toggleClass: { className: 'nav--scrolled', targets: '.site-nav' },
});
```

## 7. Marquee / infinite ticker text

```js
gsap.to('.marquee-track', {
  xPercent: -50,
  repeat: -1,
  duration: 20,
  ease: 'none',
});
```
CSS: duplicate the track content once inside `.marquee-track` so the `-50%`
loop point lines up seamlessly (`display:flex; width: max-content;`).

## 8. Resize handling

Always refresh ScrollTrigger after layout-affecting changes (fonts loading,
images loading, window resize):

```js
window.addEventListener('load', () => ScrollTrigger.refresh());
window.addEventListener('resize', () => ScrollTrigger.refresh());
```

## 9. Respect reduced motion

```js
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.globalTimeline.timeScale(50); // effectively skip animations
  lenis.destroy(); // fall back to native scroll
}
```

## Common bugs checklist
- [ ] Only one Lenis instance exists on the page
- [ ] Lenis driven by `gsap.ticker`, not a second manual `requestAnimationFrame` loop
- [ ] `ScrollTrigger.update` wired to `lenis.on('scroll', ...)`
- [ ] `ScrollTrigger.refresh()` called after `window.load` and on resize
- [ ] No `overflow: hidden` on `html`/`body` conflicting with Lenis's wrapper
- [ ] Anchor links (`<a href="#section">`) use `lenis.scrollTo(target)` instead
      of default jump, so smooth scroll isn't bypassed
