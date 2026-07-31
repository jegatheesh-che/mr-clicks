# Pattern 6: Magnetic Button / Cursor Interaction

A button (usually a CTA) subtly pulls toward the cursor as it approaches, and snaps back on leave. Desktop-only — this pattern should never run on touch devices (there's no hover/cursor concept).

## HTML

```html
<button class="magnetic-btn">
  <span class="magnetic-btn-text">Get started</span>
</button>
```

## JS (GSAP 3, vanilla — no plugin needed)

```js
// Guard: skip entirely on touch devices
if (!('ontouchstart' in window)) {
  document.querySelectorAll(".magnetic-btn").forEach((btn) => {
    const strength = 0.4; // how much it follows the cursor, 0-1

    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: relX * strength,
        y: relY * strength,
        duration: 0.4,
        ease: "power2.out"
      });

      // inner text moves slightly less for a subtle parallax-within-the-button feel
      gsap.to(btn.querySelector(".magnetic-btn-text"), {
        x: relX * strength * 0.4,
        y: relY * strength * 0.4,
        duration: 0.4,
        ease: "power2.out"
      });
    });

    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
      gsap.to(btn.querySelector(".magnetic-btn-text"), { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
    });
  });
}
```

Note the ease asymmetry: `power2.out` while following the cursor (smooth tracking), but `elastic.out` on release (a satisfying little snap-back). This asymmetry is what makes it feel "alive" rather than robotic. This is one of the very few places in this entire skill where `elastic` ease is the right call — it's earned here because it's a direct response to a physical gesture (letting go), not a scroll-triggered content entrance.

## Wider "magnetic zone" variant (button pulls from further away)

Detect proximity on the whole nearby area, not just on-hover, for a slightly bigger "reach":

```js
const zone = document.querySelector(".magnetic-zone"); // a larger invisible parent around the button
const btn = zone.querySelector(".magnetic-btn");

zone.addEventListener("mousemove", (e) => {
  const rect = zone.getBoundingClientRect();
  const relX = (e.clientX - rect.left - rect.width / 2) * 0.3;
  const relY = (e.clientY - rect.top - rect.height / 2) * 0.3;
  gsap.to(btn, { x: relX, y: relY, duration: 0.5, ease: "power2.out" });
});
```

## Vibe variants

- **Agency:** strength 0.4-0.5, more pronounced, can extend the magnetic zone beyond the button's own bounds.
- **SaaS:** strength 0.2-0.3, subtle — this pattern is used less often here overall; a simple scale/color hover transition is usually enough and more in keeping with the "quiet precision" vibe.
- **Luxury:** if used, strength 0.25-0.35 with slower duration (0.5-0.6s follow, 0.8s release) — no `elastic` snap-back; use `power2.out` for release too, since Luxury never overshoots.

## Common mistake

Forgetting the touch-device guard. On mobile this listener either does nothing useful or (worse) causes a stuck offset if a touch event partially fires mouse-emulation events. Always gate behind a touch/pointer capability check.
