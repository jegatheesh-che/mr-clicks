# Barba.js Integration

## Required page markup

Every page needs the same wrapper structure with a `data-barba-namespace` that identifies the page:

```html
<body>
  <div data-barba="wrapper">
    <div data-barba="container" data-barba-namespace="home">
      <!-- page content -->
    </div>
  </div>
</body>
```

## Basic init with a GSAP transition

```js
import barba from '@barba/core';
import gsap from 'gsap';

barba.init({
  transitions: [{
    name: 'default-transition',
    leave(data) {
      return gsap.to(data.current.container, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      });
    },
    enter(data) {
      return gsap.from(data.next.container, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      });
    },
  }],
});
```

## Namespace-specific transitions (the "award" moment)

Real agency sites don't use one generic fade for every route — the transition changes based on where you're going (e.g., home → work uses a curtain wipe revealing the 3D scene; work → work-detail uses a shared-element zoom).

```js
barba.init({
  transitions: [
    {
      name: 'home-to-work',
      from: { namespace: ['home'] },
      to: { namespace: ['work'] },
      leave(data) {
        const tl = gsap.timeline();
        tl.to('.curtain', { scaleY: 1, duration: 0.6, ease: 'power3.inOut' });
        return tl;
      },
      enter(data) {
        const tl = gsap.timeline();
        tl.to('.curtain', { scaleY: 0, duration: 0.6, ease: 'power3.inOut', delay: 0.1 });
        return tl;
      },
    },
  ],
});
```

## The #1 mistake: forgetting to re-init page JS

After Barba swaps the container, any JS that ran on `DOMContentLoaded` for the *old* page won't automatically re-run for the *new* one. You must manually re-init inside hooks:

```js
barba.init({
  views: [
    {
      namespace: 'work',
      afterEnter() {
        initWorkGridAnimations(); // re-run scroll triggers, lazy-load, etc. for this page
      },
      beforeLeave() {
        killWorkGridAnimations(); // ScrollTrigger.getAll().forEach(t => t.kill())
      },
    },
  ],
});
```

Forgetting the `beforeLeave` cleanup is why ScrollTriggers "double fire" or feel janky after 2-3 page navigations — dead triggers from the previous page are still listening.

## Combining with Lenis (smooth scroll) and ScrollTrigger

Barba transitions + Lenis + ScrollTrigger all need to be re-synced after each page swap:

```js
barba.hooks.afterEnter(() => {
  ScrollTrigger.refresh();
  lenis.scrollTo(0, { immediate: true }); // reset scroll position on new page
});
```

## Prefetching

`@barba/prefetch` speeds up perceived transition time by fetching linked pages on hover. Skip it on very large sites or when most links point to heavy pages (each hover triggers a real network request).
