# Pattern 8: Marquee / Infinite Loop

Continuously scrolling content — logo walls, tag lists, ticker text. Simple in concept, but the naive implementation (CSS animation restarting) causes a visible "jump" at the loop point. Do it properly with duplicated content and GSAP's modifiers or `gsap.utils.wrap`.

## HTML (duplicate the content once so the loop is seamless)

```html
<div class="marquee">
  <div class="marquee-track">
    <div class="marquee-item">Logo 1</div>
    <div class="marquee-item">Logo 2</div>
    <div class="marquee-item">Logo 3</div>
    <div class="marquee-item">Logo 4</div>
  </div>
  <div class="marquee-track" aria-hidden="true">
    <div class="marquee-item">Logo 1</div>
    <div class="marquee-item">Logo 2</div>
    <div class="marquee-item">Logo 3</div>
    <div class="marquee-item">Logo 4</div>
  </div>
</div>
```

## CSS

```css
.marquee {
  display: flex;
  overflow: hidden;
  width: 100%;
}
.marquee-track {
  display: flex;
  flex-shrink: 0;
  gap: 4rem;
}
```

## JS (GSAP 3)

```js
const tracks = gsap.utils.toArray(".marquee-track");

gsap.to(tracks, {
  xPercent: -100,
  repeat: -1,
  duration: 20, // lower = faster; tune per content width
  ease: "none" // linear is CORRECT here — this is the one pattern in the whole skill
               // where "none"/linear ease is the right call, since any easing would
               // create a visible speed-up/slow-down each loop, which reads as a bug
});
```

Because there are two identical tracks placed side by side and both animate together with `xPercent: -100`, the moment the first track fully exits, the second is in exactly the position the first started in — the loop is invisible.

## Pause on hover (common, expected UX for logo walls)

```js
const marquee = document.querySelector(".marquee");
const tween = gsap.to(tracks, { xPercent: -100, repeat: -1, duration: 20, ease: "none" });

marquee.addEventListener("mouseenter", () => tween.pause());
marquee.addEventListener("mouseleave", () => tween.resume());
```

## Scroll-linked speed variant (marquee speeds up/reverses with scroll direction)

A nice Agency-vibe touch — the marquee's speed responds to how fast/which direction the user is scrolling:

```js
gsap.registerPlugin(ScrollTrigger);

let scrollTween = gsap.to(tracks, { xPercent: -100, repeat: -1, duration: 20, ease: "none" });

ScrollTrigger.create({
  onUpdate: (self) => {
    const speedMultiplier = 1 + Math.abs(self.getVelocity() / 300);
    gsap.to(scrollTween, { timeScale: self.direction === 1 ? speedMultiplier : -speedMultiplier, duration: 0.3 });
  }
});
```

## Vibe variants

- **Agency:** consider the scroll-linked speed variant above for a memorable, interactive-feeling logo wall or tag section.
- **SaaS:** plain constant-speed marquee, moderate speed (25-35s per loop, not frantic), used mainly for "trusted by" logo walls.
- **Luxury:** slower still (35-45s per loop) — a marquee here should feel like ambient motion in the background, not something demanding attention.

## Common mistake

Using an eased tween (`power1.inOut` etc.) for the core infinite-loop motion. Any non-linear ease on a `repeat: -1` tween causes a visible stutter every time it loops back, because velocity isn't continuous across the repeat boundary. Keep the base loop `ease: "none"`; add personality via the scroll-linked speed variant instead, which changes `timeScale` (a proportional speed multiplier) rather than the base ease.
