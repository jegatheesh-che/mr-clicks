# Text Effects

## Split Reveal

HTML:
```html
<h1 class="split-target">Engineering Excellence</h1>
```

JS (no SplitText plugin needed — manual split, works without GSAP Club):
```js
function splitText(el, mode = 'chars') {
  const words = el.textContent.trim().split(/\s+/);
  el.innerHTML = '';
  words.forEach((word, wi) => {
    const wordSpan = document.createElement('span');
    wordSpan.style.display = 'inline-block';
    wordSpan.style.overflow = 'hidden';
    if (mode === 'chars') {
      [...word].forEach(ch => {
        const c = document.createElement('span');
        c.textContent = ch;
        c.style.display = 'inline-block';
        c.style.transform = 'translateY(110%)';
        wordSpan.appendChild(c);
      });
    } else {
      wordSpan.textContent = word;
      wordSpan.style.transform = 'translateY(110%)';
    }
    el.appendChild(wordSpan);
    if (wi < words.length - 1) el.appendChild(document.createTextNode(' '));
  });
  return mode === 'chars' ? [...el.querySelectorAll('span span')] : [...el.querySelectorAll(':scope > span')];
}

const targets = splitText(document.querySelector('.split-target'), 'chars');
gsap.to(targets, {
  y: '0%',
  duration: 0.9,
  stagger: 0.03,
  ease: 'power4.out',
  scrollTrigger: { trigger: '.split-target', start: 'top 85%' }
});
```

Line mode: split by `<br>`-wrapped lines instead of words if line-level stagger is needed — wrap each visual line in its own overflow-hidden span server-side (safer than JS re-flow measuring for pitch demos).

Gotcha: `overflow:hidden` on the word span clips descenders (g, y, p) slightly on some fonts — add 2-4px bottom padding to the parent line-height if it's visible in the chosen typeface.

---

## Clip-Path Mask Reveal

HTML:
```html
<div class="mask-reveal">
  <img src="hero.jpg" alt="">
</div>
```

CSS:
```css
.mask-reveal { clip-path: inset(0 0 100% 0); }
```

JS:
```js
gsap.to('.mask-reveal', {
  clipPath: 'inset(0 0 0% 0)',
  duration: 1.4,
  ease: 'power4.inOut',
  scrollTrigger: { trigger: '.mask-reveal', start: 'top 80%' }
});
```

Variant — reveal from center out:
```js
// start state: clip-path: inset(45% 45% 45% 45%)
gsap.to('.mask-reveal', {
  clipPath: 'inset(0% 0% 0% 0%)',
  duration: 1.2,
  ease: 'expo.inOut',
  scrollTrigger: { trigger: '.mask-reveal', start: 'top 80%' }
});
```

Gotcha: animating `clip-path` directly (not `clipPath` shorthand percentages that change unit types mid-tween) needs matching unit types on both ends or GSAP can't interpolate — always start and end in the same unit (`%` to `%`).

---

## SVG Path Draw & Morph

HTML:
```html
<svg viewBox="0 0 400 100">
  <path class="draw-path" d="M10,50 Q200,10 390,50" fill="none" stroke="currentColor" stroke-width="2"/>
</svg>
```

JS (no DrawSVG plugin needed — stroke-dash trick):
```js
document.querySelectorAll('.draw-path').forEach(path => {
  const len = path.getTotalLength();
  path.style.strokeDasharray = len;
  path.style.strokeDashoffset = len;
  gsap.to(path, {
    strokeDashoffset: 0,
    duration: 1.6,
    ease: 'power2.inOut',
    scrollTrigger: { trigger: path, start: 'top 85%' }
  });
});
```

Path morph (two paths, same point count) without MorphSVG plugin:
```js
// Simplest fallback: crossfade two paths instead of true morph
gsap.timeline({ scrollTrigger: { trigger: '.morph-wrap', start: 'top 70%' } })
  .to('.path-a', { opacity: 0, duration: 0.6 })
  .to('.path-b', { opacity: 1, duration: 0.6 }, '<');
```

Gotcha: true point-to-point morphing needs the MorphSVG club plugin — without it, matched-point-count `d` tweening only works if both paths were exported with identical anchor counts (e.g., from the same Figma boolean op). Otherwise use the crossfade fallback above.
