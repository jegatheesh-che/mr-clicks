# Technical Rules

Read this before writing any ScrollTrigger code. These are the mistakes that make an otherwise good animation feel janky or break entirely.

## Setup order

```js
gsap.registerPlugin(ScrollTrigger);

// Wait for fonts/images if layout depends on them, otherwise ScrollTrigger
// calculates trigger positions before content has its final size/position
document.fonts.ready.then(() => {
  ScrollTrigger.refresh();
});
```

If images affect layout height (e.g. hero images without explicit height/aspect-ratio), either set explicit dimensions in CSS or call `ScrollTrigger.refresh()` in the image's `onload`. This is the #1 cause of triggers firing at the wrong scroll position.

## Cleanup and re-runs

In plain JS (non-SPA), you generally don't need cleanup — the page reloads on navigation. But if the site has any client-side view switching (tabs, filtered content that re-renders, infinite scroll loading new sections), kill and rebuild triggers:

```js
function buildAnimations() {
  // ... gsap.to / ScrollTrigger.create calls
}

function teardownAnimations() {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
}
```

Never call `ScrollTrigger.create()` in a loop that re-runs (e.g. on resize or re-render) without killing the previous instances first — you'll get duplicate triggers stacking up and firing multiple times.

## Responsive behavior — always use matchMedia

Never write manual `window.innerWidth` checks scattered through your animation code. Use `ScrollTrigger.matchMedia()` so GSAP handles the breakpoint switching (including on resize/rotate) for you:

```js
ScrollTrigger.matchMedia({
  // Desktop: full effect
  "(min-width: 769px)": function() {
    gsap.to(".panel", {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".horizontal-container",
        pin: true,
        scrub: 1,
        end: () => "+=" + document.querySelector(".horizontal-container").offsetWidth
      }
    });
  },
  // Mobile: simplified fallback — never just hide the section, give it a
  // normal vertical-scroll treatment instead
  "(max-width: 768px)": function() {
    gsap.from(".panel", {
      opacity: 0,
      y: 30,
      stagger: 0.15,
      scrollTrigger: { trigger: ".horizontal-container", start: "top 80%" }
    });
  }
});
```

This applies especially to: horizontal scroll (pattern 4), pinned sections (pattern 3), and magnetic buttons (pattern 6 — cursor-following makes no sense on touch devices, disable entirely below 769px).

## Accessibility — prefers-reduced-motion

Every build should include this near the top of the animation script:

```js
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion) {
  gsap.globalTimeline.timeScale(0); // or set very short durations / skip scroll-scrub effects
}
```

For scroll-scrubbed animations specifically, either skip `scrub` entirely and just reveal content on trigger with a quick fade, or set durations to near-zero. Never force a user who's requested reduced motion through a slow pinned scrollytelling sequence.

## Common bugs that break the "expensive" feel

1. **Layout shift from animating `width`/`height`/`top`/`left`.** Always animate `transform` (x, y, scale, rotate) and `opacity` instead — GPU-accelerated, no reflow, no jank. Use `xPercent`/`yPercent` for responsive-safe transforms instead of pixel values when the element size varies.
2. **`will-change` overuse.** Only set `will-change: transform` on elements actively mid-animation, and remove it after (`clearProps: "willChange"` in the tween's `onComplete`, or just don't set it globally in CSS on dozens of elements — it eats memory).
3. **FOUC on scroll-reveal elements.** If an element is meant to fade in on scroll but starts as `opacity: 1` in your CSS, it'll flash visible before JS runs. Set the initial hidden state in CSS (`.reveal { opacity: 0; }`) as a fallback, not just in the `gsap.from()` call, so it's correct even if JS loads slowly.
4. **Double-firing on fast scroll / trigger start miscalculation.** Use `once: true` on triggers that should only ever play once (most entrance animations) rather than relying on `toggleActions` defaults, which is a common source of animations replaying oddly on scroll-up.
5. **Pinning without `anticipatePin`.** On fast scroll, pinned sections can visibly jump/snap. Add `anticipatePin: 1` to pinned ScrollTriggers to smooth this out.
6. **Nesting ScrollTrigger pins inside other scroll containers** (e.g. a pinned section inside a `overflow: scroll` div) — this breaks in confusing ways. Pins should generally live in the natural document scroll flow.
