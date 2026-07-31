# Pattern 7: Page / View Transition

A transition that plays when navigating between pages (or major view states in a single-page site), instead of a jarring instant swap. In plain multi-page HTML sites (no framework router), this means intercepting link clicks.

## HTML

```html
<div id="page-transition-overlay"></div>
```

```css
#page-transition-overlay {
  position: fixed;
  inset: 0;
  background: #0a0a0a;
  transform: translateY(100%);
  z-index: 9999;
  pointer-events: none;
}
```

## JS (GSAP 3) — intercepting navigation on a plain multi-page site

```js
gsap.registerPlugin(ScrollTrigger);

const overlay = document.getElementById("page-transition-overlay");

// Entrance: play when the new page loads
window.addEventListener("DOMContentLoaded", () => {
  gsap.to(overlay, {
    yPercent: -100,
    duration: 0.8,
    ease: "power3.inOut",
    onComplete: () => {
      overlay.style.pointerEvents = "none";
    }
  });
});

// Exit: play before navigating away, then follow the link
document.querySelectorAll("a[href]:not([target='_blank'])").forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("mailto:")) return;

    e.preventDefault();
    overlay.style.pointerEvents = "all";

    gsap.fromTo(overlay,
      { yPercent: 100 },
      {
        yPercent: 0,
        duration: 0.6,
        ease: "power3.inOut",
        onComplete: () => { window.location.href = href; }
      }
    );
  });
});
```

Reset the overlay's starting position (`translateY(100%)`) via CSS so the entrance animation on the *next* page load has something to animate from — the exit tween on the current page ends at `yPercent: 0` (fully covering), and the browser navigates while that's true, so the next page's `DOMContentLoaded` entrance naturally starts covered and reveals.

## Simpler variant: content-only fade (no full-screen overlay)

For sites where a heavy overlay transition feels like overkill (most SaaS sites), just fade the page content out/in:

```js
document.body.style.opacity = 0;
window.addEventListener("DOMContentLoaded", () => {
  gsap.to(document.body, { opacity: 1, duration: 0.4, ease: "power1.out" });
});
```

## Vibe variants

- **Agency:** full overlay wipe, sometimes with a logo mark that scales in/out during the transition, duration 0.7-0.9s.
- **SaaS:** usually the simple content-fade variant, or no page transition at all — instant navigation is often the "correct" SaaS choice since users prioritize speed over ceremony.
- **Luxury:** overlay wipe with a slower duration (1-1.2s) and a `power2.inOut` ease, sometimes with the site logo or a single word fading in during the covered moment.

## Common mistake

Adding a page transition that makes navigation feel *slower* without adding any perceived value — if the transition exceeds ~0.8-1s round trip, most users will experience it as friction, not polish. This is one pattern where a Cowork/SaaS-style skip is often the right agency-level judgment call, not a failure to use the pattern.
