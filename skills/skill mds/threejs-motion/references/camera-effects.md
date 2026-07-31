# Camera Effects

## Dolly Zoom Walk-In

The classic "Vertigo effect" — move the camera forward while adjusting FOV so the subject stays the same size but the background compresses/expands. Also used more simply here as a straight room walk-in (move camera forward through a modeled space).

Straight walk-in (simpler, most common for room/space reveals):
```js
import gsap from 'gsap';

camera.position.set(0, 1.6, 8); // start further back, eye height ~1.6
camera.lookAt(0, 1.4, 0);

gsap.to(camera.position, {
  z: 1.5,
  duration: 2.4,
  ease: 'power2.inOut',
  scrollTrigger: { trigger: '.canvas-wrap', start: 'top top', end: '+=150%', scrub: true }
});
```

True dolly zoom (position + FOV counter-animated):
```js
const state = { z: 8, fov: 35 };
gsap.to(state, {
  z: 2,
  fov: 70,
  duration: 2,
  ease: 'power1.inOut',
  onUpdate: () => {
    camera.position.z = state.z;
    camera.fov = state.fov;
    camera.updateProjectionMatrix();
  },
  scrollTrigger: { trigger: '.canvas-wrap', start: 'top top', end: '+=150%', scrub: true }
});
```

Gotcha: `camera.updateProjectionMatrix()` must be called every frame the FOV changes — forgetting it is the #1 reason a dolly zoom "does nothing."

---

## Scroll Camera Path

Move the camera along a predefined curve as the user scrolls — used for architectural walk-throughs or multi-scene product reveals.

```js
import * as THREE from 'three';
import gsap from 'gsap';

const curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 1.6, 10),
  new THREE.Vector3(3, 2, 4),
  new THREE.Vector3(-2, 1.5, 0),
  new THREE.Vector3(0, 1.2, -6),
]);

const lookTargets = [
  new THREE.Vector3(0, 1, 0),
  new THREE.Vector3(0, 1, 0),
  new THREE.Vector3(2, 1, -2),
  new THREE.Vector3(0, 1, -10),
];

const progress = { t: 0 };
gsap.to(progress, {
  t: 1,
  ease: 'none',
  scrollTrigger: {
    trigger: '.scroll-path-section',
    start: 'top top',
    end: '+=400%',
    scrub: 0.5, // slight smoothing lag, not instant snap
  },
  onUpdate: () => {
    const pos = curve.getPointAt(progress.t);
    camera.position.copy(pos);

    // interpolate look target between nearest two anchor points
    const segCount = lookTargets.length - 1;
    const segT = progress.t * segCount;
    const idx = Math.min(Math.floor(segT), segCount - 1);
    const localT = segT - idx;
    const look = lookTargets[idx].clone().lerp(lookTargets[idx + 1], localT);
    camera.lookAt(look);
  }
});
```

Gotcha: `CatmullRomCurve3.getPointAt(t)` uses arc-length parameterization (constant speed along the curve) — use `getPoint(t)` instead only if you specifically want speed to vary with control-point spacing (rare; usually a bug when speed feels uneven).

---

## Scroll DoF Focus Pull

Requires `postprocessing` addon (`BokehPass` or the newer `three/addons/postprocessing/`). Ties focus distance to scroll so a specific object comes into focus while foreground/background blur.

```js
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';
import gsap from 'gsap';

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bokehPass = new BokehPass(scene, camera, {
  focus: 10.0,
  aperture: 0.0005,
  maxblur: 0.01,
});
composer.addPass(bokehPass);

// scroll-driven focus pull: blur everything, then rack focus onto the subject
gsap.fromTo(bokehPass.uniforms.focus, { value: 15 }, {
  value: 4.2, // distance from camera to the in-focus subject
  ease: 'power2.inOut',
  scrollTrigger: { trigger: '.focus-section', start: 'top center', end: 'bottom center', scrub: true }
});

// in the render loop, use composer.render() instead of renderer.render(scene, camera)
```

Gotcha: `aperture` controls blur intensity, not depth — increasing it past ~0.001 on typical scenes produces an unusably strong blur; tune in small increments (0.0001 steps).
