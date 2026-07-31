# Scroll Effects

## Directional Fade-Up Stagger

HTML:
```html
<div class="stagger-group">
  <div class="stagger-item">Card 1</div>
  <div class="stagger-item">Card 2</div>
  <div class="stagger-item">Card 3</div>
</div>
```

JS:
```js
gsap.from('.stagger-item', {
  y: 60,
  opacity: 0,
  duration: 0.8,
  ease: 'power3.out',
  stagger: 0.15,
  scrollTrigger: { trigger: '.stagger-group', start: 'top 80%' }
});
```

Directional variant (alternate left/right based on index):
```js
document.querySelectorAll('.stagger-item').forEach((item, i) => {
  gsap.from(item, {
    x: i % 2 === 0 ? -40 : 40,
    y: 40,
    opacity: 0,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: { trigger: item, start: 'top 85%' }
  });
});
```

---

## Pinned Scrollytelling

HTML:
```html
<section class="story-pin">
  <div class="story-visual"><!-- image/canvas/svg that changes --></div>
  <div class="story-steps">
    <div class="step" data-step="0">Step one copy</div>
    <div class="step" data-step="1">Step two copy</div>
    <div class="step" data-step="2">Step three copy</div>
  </div>
</section>
```

JS:
```js
const steps = gsap.utils.toArray('.step');
ScrollTrigger.create({
  trigger: '.story-pin',
  start: 'top top',
  end: () => `+=${steps.length * 100}%`,
  pin: '.story-visual',
  scrub: true,
});

steps.forEach((step, i) => {
  ScrollTrigger.create({
    trigger: step,
    start: 'top center',
    end: 'bottom center',
    onEnter: () => setActiveStep(i),
    onEnterBack: () => setActiveStep(i),
  });
});

function setActiveStep(i) {
  steps.forEach((s, idx) => s.classList.toggle('active', idx === i));
  // swap visual content/state here based on i
}
```

Gotcha: `end` needs to scale with the number of steps or the pin releases too early/late — always derive it from `steps.length`, never hardcode a pixel value.

---

## Sticky Progress Pin

JS:
```js
ScrollTrigger.create({
  trigger: '.progress-section',
  start: 'top top',
  end: 'bottom bottom',
  pin: '.progress-visual',
  onUpdate: (self) => {
    gsap.set('.progress-bar', { scaleX: self.progress });
    gsap.set('.progress-visual', { rotate: self.progress * 360 });
  }
});
```

Use `self.progress` (0 to 1) to drive any property — rotation, scale, color, filter — for a single-pin scroll-scrubbed sequence.

---

## Scroll Scale/Zoom

HTML:
```html
<div class="zoom-wrap"><img src="showcase.jpg" alt=""></div>
```

JS:
```js
gsap.fromTo('.zoom-wrap img',
  { scale: 1.3 },
  {
    scale: 1,
    ease: 'none',
    scrollTrigger: { trigger: '.zoom-wrap', start: 'top bottom', end: 'top top', scrub: true }
  }
);
```

Full-bleed zoom-in-then-pin (common hero-to-content transition):
```js
gsap.timeline({
  scrollTrigger: { trigger: '.zoom-hero', start: 'top top', end: '+=100%', scrub: true, pin: true }
})
.to('.zoom-hero img', { scale: 2.4, ease: 'none' })
.to('.zoom-hero', { opacity: 0, ease: 'none' }, 0.7);
```

---

## Scroll Theme Transition

HTML: sections carry a `data-theme` attribute.
```html
<section data-theme="light">...</section>
<section data-theme="dark">...</section>
```

JS:
```js
document.querySelectorAll('[data-theme]').forEach(section => {
  ScrollTrigger.create({
    trigger: section,
    start: 'top center',
    end: 'bottom center',
    onEnter: () => document.documentElement.setAttribute('data-active-theme', section.dataset.theme),
    onEnterBack: () => document.documentElement.setAttribute('data-active-theme', section.dataset.theme),
  });
});
```

CSS handles the actual color swap via `[data-active-theme="dark"] { --bg: #0a0a0a; --fg: #fff; }` with a transition on `background-color, color` (0.6s) on `body` so it eases instead of snapping.

---

## Parallax Layers

HTML:
```html
<div class="parallax-wrap">
  <div class="layer" data-speed="0.2">Back</div>
  <div class="layer" data-speed="0.5">Mid</div>
  <div class="layer" data-speed="0.9">Front</div>
</div>
```

JS:
```js
gsap.utils.toArray('.layer').forEach(layer => {
  const speed = parseFloat(layer.dataset.speed);
  gsap.to(layer, {
    y: () => (1 - speed) * -200,
    ease: 'none',
    scrollTrigger: { trigger: '.parallax-wrap', start: 'top bottom', end: 'bottom top', scrub: true }
  });
});
```

Lower `data-speed` = moves less = feels further back. Keep speed values between 0.1–0.9; 0 or 1 disables the effect visually.

---

## Canvas Image Sequence Scrub

HTML:
```html
<canvas class="seq-canvas" width="1920" height="1080"></canvas>
```

JS:
```js
const canvas = document.querySelector('.seq-canvas');
const ctx = canvas.getContext('2d');
const frameCount = 120;
const currentFrame = i => `/frames/frame_${i.toString().padStart(4, '0')}.jpg`;

const images = [];
const seq = { frame: 0 };
for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

function render() {
  const img = images[seq.frame];
  if (img && img.complete) ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}
images[0].onload = render;

gsap.to(seq, {
  frame: frameCount - 1,
  snap: 'frame',
  ease: 'none',
  scrollTrigger: { trigger: '.seq-canvas', start: 'top top', end: '+=300%', scrub: true, pin: true },
  onUpdate: render
});
```

Gotcha: preload frames (or at least the first + a handful ahead) before enabling scroll, or early scrubbing shows blank/blurry frames. For 100+ frame sequences, compress to WebP and consider a loading gate (see Preloader in layout-effects.md) that blocks scroll until images finish fetching.
