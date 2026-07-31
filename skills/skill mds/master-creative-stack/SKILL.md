---
name: master-creative-stack
description: Master-level skill for combining Lenis (smooth scrolling), Lucide (icons), GSAP (animations & parallax), and Three.js (WebGL) to create $100k+ high-end agency websites without frameworks. Use this whenever the user requests the ultimate agency stack.
---

# Master Creative Stack: Lenis, Lucide, GSAP, Three.js

This skill defines the ultimate no-framework architecture for high-end web experiences. When combining these specific technologies, you must adhere to these strict integration patterns to maintain 60fps performance and perfect synchronization.

## 1. The Stack
- **Lenis**: Physics-based smooth scrolling (replaces native scroll).
- **GSAP (ScrollTrigger)**: Binds animations and parallax effects to the scroll position.
- **Three.js**: Renders the background/foreground WebGL environment.
- **Lucide Icons**: A clean, lightweight, SVG-based icon system.

## 2. Lenis & GSAP Integration (The Golden Rule)
You MUST synchronize Lenis with GSAP's internal ticker and ScrollTrigger. If you do not do this, ScrollTrigger animations will jitter violently.

**Always use this setup template:**
```javascript
// 1. Initialize Lenis
const lenis = new Lenis({
  duration: 1.2, // Smoothness
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
});

// 2. Sync Lenis to GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

// 3. Sync GSAP Ticker to Lenis RequestAnimationFrame
gsap.ticker.add((time)=>{
  lenis.raf(time * 1000);
});

// 4. Disable GSAP's default lag smoothing
gsap.ticker.lagSmoothing(0);
```

## 3. High-End Parallax with GSAP
Do not use CSS `background-attachment: fixed` or native CSS parallax. It causes jittering and is bad for performance on mobile.
**Use GSAP ScrollTrigger for Parallax:**
```javascript
gsap.utils.toArray('.parallax-element').forEach(layer => {
  const depth = layer.dataset.depth || 0.2; // e.g., 0.1 to 1.0 (1.0 is background)
  const movement = -(layer.offsetHeight * depth);
  
  gsap.to(layer, {
    y: movement,
    ease: "none",
    scrollTrigger: {
      trigger: layer.parentElement,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
});
```

## 4. Three.js Integration
If using Three.js alongside Lenis/GSAP, sync the Three.js render loop to the same GSAP ticker to avoid dropped frames.
```javascript
// Instead of standard requestAnimationFrame(render):
gsap.ticker.add(() => {
   // Update uniforms, rotation, etc.
   renderer.render(scene, camera);
});
```

## 5. Lucide Icons Setup
To use Lucide in vanilla HTML, include the CDN script at the bottom of the body and call `lucide.createIcons()`.
```html
<script src="https://unpkg.com/lucide@latest"></script>
<script>
  lucide.createIcons();
</script>
```
In your HTML, use icons like this: `<i data-lucide="camera"></i>`

## 6. HTML Structure for the Stack
Always separate your `<canvas>` (for Three.js) from your scrollable content.
```html
<body>
  <!-- Fixed WebGL Background -->
  <canvas id="webgl-canvas" style="position:fixed; top:0; left:0; width:100%; height:100%; z-index:-1;"></canvas>
  
  <!-- Lenis Scrollable Container -->
  <main id="smooth-wrapper">
    <!-- Your content here -->
    <i data-lucide="mouse"></i>
  </main>
</body>
```
