# Pattern 10: Parallax Layers

Background/foreground elements move at different speeds relative to scroll, creating depth. Very easy to overdo — this pattern has the highest ratio of "looks amateurish when wrong" to "looks premium when right" of anything in this skill.

## HTML

```html
<div class="parallax-hero">
  <div class="parallax-layer" data-speed="0.2">
    <img src="bg-mountains.jpg" alt="" />
  </div>
  <div class="parallax-layer" data-speed="0.5">
    <img src="mid-clouds.png" alt="" />
  </div>
  <div class="parallax-layer" data-speed="0.9">
    <h1>Foreground heading</h1>
  </div>
</div>
```

## CSS

```css
.parallax-hero {
  position: relative;
  height: 100vh;
  overflow: hidden;
}
.parallax-layer {
  position: absolute;
  inset: 0;
  will-change: transform;
}
```

## JS (GSAP 3 + ScrollTrigger)

```js
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".parallax-layer").forEach((layer) => {
  const speed = parseFloat(layer.dataset.speed);

  gsap.to(layer, {
    yPercent: (1 - speed) * -30, // layers closer to speed=1 move less
    ease: "none",
    scrollTrigger: {
      trigger: ".parallax-hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });
});
```

`ease: "none"` and `scrub: true` (not a smoothed number) are both correct here specifically — parallax should track scroll position exactly, 1:1, with zero lag or easing curve. Any easing or scrub-smoothing on parallax reads as laggy/broken rather than "cinematic," which is the opposite of the pattern-3 pinned scrollytelling advice — the difference is that parallax is meant to feel like physical depth responding instantly to the camera (scroll), while scrollytelling is meant to feel like a guided narrative.

## "Breathing" hero image variant (Luxury signature move)

A slow continuous scale on a hero background, independent of scroll — combine with the layer parallax above for a very expensive-feeling hero:

```js
gsap.to(".parallax-layer[data-speed='0.2'] img", {
  scale: 1.1,
  duration: 8,
  ease: "sine.inOut",
  repeat: -1,
  yoyo: true
});
```

## Mouse-parallax variant (cursor moves layers instead of/in addition to scroll)

```js
document.querySelector(".parallax-hero").addEventListener("mousemove", (e) => {
  const { innerWidth, innerHeight } = window;
  const xPct = (e.clientX / innerWidth - 0.5) * 2;
  const yPct = (e.clientY / innerHeight - 0.5) * 2;

  gsap.utils.toArray(".parallax-layer").forEach((layer) => {
    const speed = parseFloat(layer.dataset.speed);
    gsap.to(layer, {
      x: xPct * speed * 20,
      y: yPct * speed * 20,
      duration: 0.6,
      ease: "power2.out"
    });
  });
});
```

## Vibe variants

- **Agency:** larger speed differentials between layers (0.1 to 1.0 range), sometimes combined with the mouse-parallax variant for an interactive hero.
- **SaaS:** used lightly if at all — a single subtle background layer at most (speed 0.3-0.5 vs foreground at 1.0). Multiple parallax layers rarely suit the "quiet precision" feel.
- **Luxury:** the "breathing" scale variant is close to mandatory for hero imagery; scroll-parallax speed differentials kept moderate (0.3-0.7) so it reads as depth, not a gimmick.

## Common mistake

More than 3 parallax layers moving at meaningfully different speeds. Beyond 3, the eye can't parse it as "depth" anymore — it just reads as everything wobbling independently, which is disorienting rather than immersive. Two layers (background + foreground) is often enough; three is close to the ceiling.
