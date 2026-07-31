# Pattern 3: Pinned Scrollytelling

A section pins in place while scroll progress drives an animation (image sequence, step-through process, changing text). This is a signature "wow" moment — use once per page, maybe twice on a long Agency-vibe page. Never more.

## HTML

```html
<section class="story-section">
  <div class="story-pin">
    <div class="story-visual">
      <img class="story-img" src="step-1.jpg" alt="" />
    </div>
    <div class="story-steps">
      <div class="story-step" data-step="1">First, we research</div>
      <div class="story-step" data-step="2">Then, we design</div>
      <div class="story-step" data-step="3">Finally, we ship</div>
    </div>
  </div>
</section>
```

## CSS

```css
.story-section { height: 300vh; } /* scroll distance = 100vh per step, tune to step count */
.story-pin { height: 100vh; display: flex; align-items: center; }
.story-step { opacity: 0.2; transition: opacity 0.3s; }
.story-step.active { opacity: 1; }
```

## JS (GSAP 3 + ScrollTrigger)

```js
gsap.registerPlugin(ScrollTrigger);

const steps = gsap.utils.toArray(".story-step");

ScrollTrigger.create({
  trigger: ".story-section",
  start: "top top",
  end: "bottom bottom",
  pin: ".story-pin",
  anticipatePin: 1,
  scrub: 1,
  onUpdate: (self) => {
    const stepIndex = Math.min(
      steps.length - 1,
      Math.floor(self.progress * steps.length)
    );
    steps.forEach((step, i) => step.classList.toggle("active", i === stepIndex));
  }
});
```

## Variant: driving a timeline with scrub instead of manual step logic

If the "story" is really just one continuous animation (e.g. an SVG drawing itself, or an image sequence crossfading) rather than discrete text steps, scrub a timeline directly instead of the `onUpdate` step-index approach:

```js
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".story-section",
    start: "top top",
    end: "bottom bottom",
    pin: ".story-pin",
    anticipatePin: 1,
    scrub: 1
  }
});

tl.to(".story-img", { opacity: 0, duration: 1 })
  .to(".story-img-2", { opacity: 1, duration: 1 }, "<")
  .to(".story-img-2", { opacity: 0, duration: 1 })
  .to(".story-img-3", { opacity: 1, duration: 1 }, "<");
```

## Scroll distance math

`.story-section` height controls how much scrolling the whole sequence takes. Rule of thumb: ~80-100vh of scroll per distinct "beat" in the story. Too short and it feels rushed/glitchy; too long and users get bored and scroll-jack past it impatiently. Test with real scrolling, not just eyeballing the code.

## Mobile handling

Pinned scrollytelling is often genuinely bad on mobile (janky, disorienting, eats a huge amount of scroll real estate on a small screen). Default to disabling the pin below 769px and showing the steps as a normal vertical-scroll fade-up sequence instead (see `references/technical-rules.md` matchMedia example). Don't just force the desktop version onto mobile "because it still technically works."

## Vibe variants

- **Agency:** the main showcase moment of the page. `scrub: true` (tight, 1:1 with scroll) or `scrub: 0.5` for slight smoothing. Bold visual changes between steps.
- **SaaS:** used sparingly if at all — a 3-step "how it works" is about the ceiling. `scrub: 1` for a bit of smoothing so it doesn't feel jerky/technical.
- **Luxury:** `scrub: 1.5-2` for a slow, cinematic lag between scroll and visual response — this deliberate lag is what makes it feel unhurried rather than reactive.

## Common mistake

Setting `scrub: true` (exactly tied to scroll, zero smoothing) on a Luxury or Agency-vibe site. A tiny bit of scrub smoothing (`scrub: 0.5` to `2`, a number not `true`/`false`) is almost always what makes it feel expensive instead of like a slideshow being dragged around.
