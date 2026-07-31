# Pattern: Spline Scene Persisting Across Barba Transitions

The signature "award" moment: a 3D scene that doesn't reload between pages — it stays alive and the *camera* or *scene state* changes as Barba swaps the surrounding page chrome. This reads as one continuous world, not five separate page loads.

## Two approaches — pick based on the brief

### Approach A: Scene lives outside Barba's container (persistent canvas)

Put the `<canvas>` for Spline OUTSIDE `data-barba="container"`, in the wrapper itself, so Barba never touches or reloads it. Only the content around it swaps.

```html
<div data-barba="wrapper">
  <canvas id="spline-canvas"></canvas> <!-- persists across all transitions -->
  <div data-barba="container" data-barba-namespace="home">
    <!-- this swaps -->
  </div>
</div>
```

Then drive camera changes from Barba's hooks:

```js
barba.init({
  views: [
    {
      namespace: 'work',
      afterEnter() {
        const camera = splineApp.findObjectByName('Camera');
        gsap.to(camera.position, { z: 350, duration: 1.2, ease: 'power3.inOut' });
      },
    },
    {
      namespace: 'about',
      afterEnter() {
        const camera = splineApp.findObjectByName('Camera');
        gsap.to(camera.position, { z: 80, x: 40, duration: 1.2, ease: 'power3.inOut' });
      },
    },
  ],
});
```

**Use this when**: the brief is "one continuous 3D world you navigate through" (e.g., a virtual gallery/room where each page = a different camera position in the same room).

### Approach B: Scene reloads per page, transition masks the swap

Each page has its own Spline embed (possibly a different scene/variant). Barba's transition (a curtain, wipe, or morph shape) fully covers the viewport at the crossover point, hiding the moment the old scene is destroyed and the new one initializes.

```js
transitions: [{
  leave(data) {
    const tl = gsap.timeline();
    tl.to('.transition-mask', { scaleY: 1, duration: 0.5, ease: 'power3.in' });
    tl.call(() => { splineApp.dispose(); }); // clean up old scene ONLY once fully covered
    return tl;
  },
  enter(data) {
    const tl = gsap.timeline();
    tl.call(() => { initSplineForNamespace(data.next.namespace); });
    tl.to('.transition-mask', { scaleY: 0, duration: 0.5, ease: 'power3.out', delay: 0.3 });
    return tl;
  },
}],
```

**Use this when**: each page needs a genuinely different 3D scene/asset (product A vs. product B), so persistence isn't meaningful — the mask sells the illusion of continuity even though the underlying scene is swapped.

## Timing rule

Whichever approach: the transition mask/curtain duration should be ≥ the time the heaviest operation takes (scene dispose + new scene first-frame render for Approach B; camera tween settle for Approach A). If the curtain opens before the 3D scene is actually ready, you'll expose a pop-in or a frozen frame — instantly reads as unpolished.

## Testing checklist specific to this combo

- Navigate A → B → A → B rapidly (double-click links before transition finishes) — this is where WebGL context leaks and race conditions between Barba's `leave`/`enter` and Spline's `load`/`dispose` show up.
- Check DevTools → Performance → GPU memory across 5+ navigations. Rising baseline = a leak (usually a Spline `Application` not being disposed in Approach B, or an orphaned event listener from a previous `afterEnter`).
- Confirm `beforeLeave` kills any ScrollTrigger tied to the old camera-scroll animation before `afterEnter` sets up new ones.
