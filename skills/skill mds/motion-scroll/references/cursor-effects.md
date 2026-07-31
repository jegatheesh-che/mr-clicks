# Cursor Effects

## Magnetic Button

HTML:
```html
<button class="magnetic-btn"><span>Get in touch</span></button>
```

JS:
```js
document.querySelectorAll('.magnetic-btn').forEach(btn => {
  const strength = 0.4;
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, { x: x * strength, y: y * strength, duration: 0.4, ease: 'power2.out' });
    gsap.to(btn.querySelector('span'), { x: x * strength * 0.5, y: y * strength * 0.5, duration: 0.4, ease: 'power2.out' });
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
    gsap.to(btn.querySelector('span'), { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
  });
});
```

Strength 0.3–0.5 feels magnetic without being floaty; above 0.6 the button overshoots the cursor and feels broken.

---

## Custom Blend Cursor

HTML:
```html
<div class="custom-cursor"></div>
```

CSS:
```css
.custom-cursor {
  position: fixed;
  top: 0; left: 0;
  width: 24px; height: 24px;
  border-radius: 50%;
  background: #fff;
  mix-blend-mode: difference;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
}
```

JS:
```js
const cursor = document.querySelector('.custom-cursor');
const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const mouse = { x: pos.x, y: pos.y };

window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

gsap.ticker.add(() => {
  pos.x += (mouse.x - pos.x) * 0.15;
  pos.y += (mouse.y - pos.y) * 0.15;
  gsap.set(cursor, { x: pos.x, y: pos.y });
});

// Scale up on interactive elements
document.querySelectorAll('a, button, [data-cursor-hover]').forEach(el => {
  el.addEventListener('mouseenter', () => gsap.to(cursor, { scale: 2.5, duration: 0.3 }));
  el.addEventListener('mouseleave', () => gsap.to(cursor, { scale: 1, duration: 0.3 }));
});
```

Hide native cursor on desktop only: `@media (hover: hover) { body { cursor: none; } }` — never hide it on touch devices (no `:hover` support means the custom cursor won't hide itself correctly there anyway; gate the whole feature behind `matchMedia('(hover: hover) and (pointer: fine)')`).

---

## Spotlight Reveal

HTML:
```html
<div class="spotlight-section">
  <div class="spotlight-mask"></div>
  <div class="hidden-content">Secret content revealed under cursor</div>
</div>
```

CSS:
```css
.spotlight-section { position: relative; overflow: hidden; }
.spotlight-mask {
  position: absolute; inset: 0;
  background: #111;
  -webkit-mask: radial-gradient(circle 120px at var(--x, 50%) var(--y, 50%), transparent 98%, black 100%);
  mask: radial-gradient(circle 120px at var(--x, 50%) var(--y, 50%), transparent 98%, black 100%);
  pointer-events: none;
}
```

JS:
```js
const section = document.querySelector('.spotlight-section');
const mask = document.querySelector('.spotlight-mask');
section.addEventListener('mousemove', (e) => {
  const rect = section.getBoundingClientRect();
  gsap.to(mask, {
    '--x': `${e.clientX - rect.left}px`,
    '--y': `${e.clientY - rect.top}px`,
    duration: 0.3,
    ease: 'power2.out',
    overwrite: 'auto'
  });
});
```

Gotcha: GSAP can tween CSS custom properties directly (as shown) as long as the property is referenced inside a value GSAP understands (`px` here) — don't try to tween unitless custom props used as raw numbers without a companion `@property` registration in CSS, `mask` radius math won't resolve.
