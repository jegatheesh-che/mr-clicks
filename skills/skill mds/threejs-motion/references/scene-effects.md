# Scene Effects

## Model Load Entrance

Load a GLTF model, hold it invisible/scaled-down, then animate in once loaded (never animate a model that hasn't finished loading — the entrance will fire on nothing or pop in mid-tween).

```js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import gsap from 'gsap';

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco/');

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);

loader.load('/models/product.glb', (gltf) => {
  const model = gltf.scene;
  model.scale.setScalar(0.01); // start tiny
  model.traverse(child => { if (child.isMesh) child.material.transparent = true, child.material.opacity = 0; });
  scene.add(model);

  const tl = gsap.timeline({ delay: 0.2 });
  tl.to(model.scale, { x: 1, y: 1, z: 1, duration: 1.4, ease: 'power4.out' }, 0);
  model.traverse(child => {
    if (child.isMesh) tl.to(child.material, { opacity: 1, duration: 1.2, ease: 'power2.out' }, 0.2);
  });
}, undefined, (err) => console.error('Model load failed:', err));
```

Gotcha: setting `material.transparent = true` on a model that will stay fully opaque afterward hurts render performance (transparent objects sort differently and disable some depth optimizations) — flip it back to `false` once opacity reaches 1, via `tl.eventCallback('onComplete', () => { ...set transparent = false... })`.

---

## Drag/Scroll Object Rotation

Rotate a hero object based on horizontal drag (desktop + touch) and/or scroll position.

Drag-based:
```js
let isDragging = false;
let lastX = 0;
const rotationSpeed = 0.01;

renderer.domElement.addEventListener('pointerdown', (e) => { isDragging = true; lastX = e.clientX; });
window.addEventListener('pointerup', () => { isDragging = false; });
window.addEventListener('pointermove', (e) => {
  if (!isDragging) return;
  const deltaX = e.clientX - lastX;
  model.rotation.y += deltaX * rotationSpeed;
  lastX = e.clientX;
});
```

Scroll-based (rotation tied to scroll position, common for product reveals):
```js
gsap.to(model.rotation, {
  y: Math.PI * 2, // one full turn
  ease: 'none',
  scrollTrigger: { trigger: '.product-section', start: 'top top', end: 'bottom bottom', scrub: true }
});
```

Combined — idle auto-rotate that pauses on user drag:
```js
let autoRotate = true;
function animate() {
  requestAnimationFrame(animate);
  if (autoRotate) model.rotation.y += 0.003;
  renderer.render(scene, camera);
}
renderer.domElement.addEventListener('pointerdown', () => { autoRotate = false; });
// resume after a few seconds of inactivity
let idleTimer;
window.addEventListener('pointerup', () => {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => { autoRotate = true; }, 2500);
});
```

Gotcha: on touch devices, `pointermove` fires during page-scroll gestures too — if the drag target is full-width, call `e.preventDefault()` on `pointerdown` (with `{ passive: false }` on the listener) to stop the page from scrolling while the user is rotating the model, or gate rotation to only fire when the drag started inside the canvas bounding box.

---

## HDRI Lighting Reveal

Load an HDRI environment map for realistic reflections/lighting, and animate its intensity/exposure in on scroll or load for a "lights coming up" reveal.

```js
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import gsap from 'gsap';

new RGBELoader().load('/hdri/studio.hdr', (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = texture;
  // optionally also set scene.background = texture for a visible backdrop

  renderer.toneMappingExposure = 0; // start dark
  gsap.to(renderer, {
    toneMappingExposure: 1,
    duration: 2,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.canvas-wrap', start: 'top 80%' }
  });
});

// required for HDRI to look correct:
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;
```

Gotcha: without setting `toneMapping` to `ACESFilmicToneMapping` (or similar) and the correct `outputColorSpace`, HDRI environments look blown-out or flat/grey regardless of exposure animation — this is the most common "HDRI looks wrong" bug and has nothing to do with the HDR file itself.
