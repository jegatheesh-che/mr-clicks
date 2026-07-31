# Pattern 4: Horizontal Scroll Section

Vertical page scroll drives a horizontally-scrolling panel — common for portfolios, case study galleries, product showcases. High "wow" factor but also high risk of feeling gimmicky if overused or poorly tuned.

## HTML

```html
<section class="horizontal-container">
  <div class="horizontal-track">
    <div class="panel">Project 1</div>
    <div class="panel">Project 2</div>
    <div class="panel">Project 3</div>
    <div class="panel">Project 4</div>
  </div>
</section>
```

## CSS

```css
.horizontal-container { overflow: hidden; }
.horizontal-track {
  display: flex;
  width: max-content; /* let it size to content, not viewport */
}
.panel {
  width: 100vw;
  height: 100vh;
  flex-shrink: 0;
}
```

## JS (GSAP 3 + ScrollTrigger)

```js
gsap.registerPlugin(ScrollTrigger);

const track = document.querySelector(".horizontal-track");
const panels = gsap.utils.toArray(".panel");

gsap.to(track, {
  x: () => -(track.scrollWidth - window.innerWidth),
  ease: "none",
  scrollTrigger: {
    trigger: ".horizontal-container",
    start: "top top",
    end: () => "+=" + (track.scrollWidth - window.innerWidth),
    pin: true,
    anticipatePin: 1,
    scrub: 1,
    invalidateOnRefresh: true // recalculates scrollWidth correctly on resize
  }
});
```

`invalidateOnRefresh: true` matters here specifically — without it, resizing the window (or rotating a tablet) leaves the scroll math stale and the track either stops short or overshoots.

## Individual panel reveals as they enter

Combine with pattern 2 logic for content *inside* each panel:

```js
panels.forEach((panel) => {
  gsap.from(panel.querySelectorAll(".panel-content > *"), {
    opacity: 0,
    y: 30,
    duration: 0.6,
    stagger: 0.08,
    ease: "power2.out",
    scrollTrigger: {
      trigger: panel,
      containerAnimation: gsap.getById("horizontalScroll"), // if you named the tween above
      start: "left 80%",
      toggleActions: "play none none reverse"
    }
  });
});
```

Note the `containerAnimation` option — required when the trigger element scrolls horizontally rather than vertically, since ScrollTrigger's default math assumes vertical scroll.

## Mobile handling — mandatory matchMedia

Horizontal scroll on touch devices is disorienting (fights against natural vertical swipe) and often has scroll-hijacking accessibility issues. Always wrap in `ScrollTrigger.matchMedia()` and give mobile a simple vertical stack with fade-up reveals instead — see the full example in `references/technical-rules.md`.

## Vibe variants

- **Agency:** this is a natural home for the "signature move" — large, bold panels, maybe with scale or rotation on panels as they pass center.
- **SaaS:** rarely used. If used at all, keep panels small (feature comparison cards) and scrub tight/fast, not a big cinematic showcase.
- **Luxury:** slower scrub (1.5-2), larger imagery, more negative space per panel — fewer, bigger panels rather than many small ones.

## Common mistake

Forgetting `end: () => "+=" + ...` as a function. If you hardcode a pixel value instead of a function, it breaks the moment content changes or the viewport resizes. Always compute scroll distance dynamically from the actual track width.
