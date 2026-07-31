---
name: threejs-motion
description: Library of production-ready Three.js (r160+, ES modules) effects for client sites and agency showcase builds — camera dolly zoom / room walk-throughs, scroll-linked camera path animation, model load entrances, postprocessing (bloom/grain/chromatic aberration), drag/scroll object rotation, depth-of-field focus pull tied to scroll, WebGL particle field backgrounds, and HDRI/environment lighting reveals. Use this skill any time Jegatheesh is building a 3D hero, product viewer, architectural walkthrough, or "make it feel premium/cinematic" request involving Three.js — even if he just says "add a 3D element" or "make the hero more immersive" without naming the specific technique. Pairs with the motion-scroll skill (GSAP+Lenis) for combined DOM+3D scroll choreography — use both together when a build needs synced HTML scroll effects and WebGL scenes.
---

# Three.js Motion — 3D Effect Library

Drop-in Three.js effects for premium/agency-grade builds. Assumes ES module imports from a CDN (jsdelivr/unpkg) or a bundler if the project has one. Pairs with GSAP + ScrollTrigger for scroll-driven timing (see `motion-scroll` skill) — Three.js handles the render loop and 3D transforms, GSAP drives the values.

## Setup (always do this first, once per project)

```html
<script type="importmap">
{
  "imports": {
    "three": "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js",
    "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"
  }
}
</script>
<script type="module" src="main.js"></script>
```

```js
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 100);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2)); // cap DPR — 3+ tanks mobile GPUs
document.querySelector('.canvas-wrap').appendChild(renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});
```

Every snippet below assumes this scene/camera/renderer already exists unless noted.

## Effect index

| # | Effect | File | Section |
|---|--------|------|---------|
| 1 | Camera dolly zoom (room walk-in/out) | camera-effects.md | Dolly Zoom Walk-In |
| 2 | 3D scroll-linked camera path animation | camera-effects.md | Scroll Camera Path |
| 3 | Depth-of-field focus pull on scroll | camera-effects.md | Scroll DoF Focus Pull |
| 4 | Model load + fade/scale entrance | scene-effects.md | Model Load Entrance |
| 5 | Interactive 3D object rotation on drag/scroll | scene-effects.md | Drag/Scroll Object Rotation |
| 6 | Environment/HDRI lighting reveal | scene-effects.md | HDRI Lighting Reveal |
| 7 | Postprocessing bloom/grain/chromatic aberration | postfx-particles.md | Postprocessing Stack |
| 8 | Particle field background (WebGL) | postfx-particles.md | Particle Field Background |

## Usage rules

- **Performance first.** Cap `setPixelRatio` at 2. Dispose geometries/materials/textures (`.dispose()`) on any element removed from the DOM (SPA route changes) or GPU memory leaks across a session.
- **Load models async**, always behind a loading gate — never let ScrollTrigger or camera animation start before the GLTF/HDRI finishes loading, or the effect fires on nothing.
- **One render loop.** If combining with `motion-scroll` (GSAP+Lenis), drive the Three.js render call from `gsap.ticker.add()` too, not a separate `requestAnimationFrame` — same one-driver rule as the DOM scroll skill, avoids two competing loops causing jitter.
- **Mobile fallback**: postprocessing (bloom, DoF, chromatic aberration) and dense particle fields are expensive — gate them behind `matchMedia('(min-width: 768px) and (pointer: fine)')` or reduce particle count / drop passes on smaller screens.
- **Lighting**: prefer HDRI environment maps over manual light rigs for realistic materials (metal, glass) — manual lights are fine for stylized/flat-shaded scenes.
- Always test with the actual client asset (their real 3D model/HDRI) before finalizing timing — placeholder cube/sphere timing rarely matches once real geometry/texture weight is in.

Read the relevant reference file(s) fully before wiring an effect in — snippets include required imports, HTML structure, and gotchas, not just the animation code.
