# Postprocessing & Particles

## Postprocessing Stack

Bloom + film grain + chromatic aberration combined via `EffectComposer`. Use the built-in `UnrealBloomPass` for bloom; grain and chromatic aberration need small custom `ShaderPass` definitions (Three.js doesn't ship them by default).

```js
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import * as THREE from 'three';

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

// Bloom
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(innerWidth, innerHeight),
  0.8,  // strength
  0.4,  // radius
  0.85  // threshold
);
composer.addPass(bloomPass);

// Chromatic Aberration (custom shader)
const chromaticAberrationShader = {
  uniforms: { tDiffuse: { value: null }, amount: { value: 0.0025 } },
  vertexShader: `
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float amount;
    varying vec2 vUv;
    void main() {
      vec2 dir = vUv - 0.5;
      float r = texture2D(tDiffuse, vUv - dir * amount).r;
      float g = texture2D(tDiffuse, vUv).g;
      float b = texture2D(tDiffuse, vUv + dir * amount).b;
      gl_FragColor = vec4(r, g, b, 1.0);
    }
  `
};
const chromaticPass = new ShaderPass(chromaticAberrationShader);
composer.addPass(chromaticPass);

// Film Grain (custom shader)
const grainShader = {
  uniforms: { tDiffuse: { value: null }, amount: { value: 0.06 }, time: { value: 0 } },
  vertexShader: `
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float amount;
    uniform float time;
    varying vec2 vUv;
    float rand(vec2 co) { return fract(sin(dot(co, vec2(12.9898,78.233))) * 43758.5453 + time); }
    void main() {
      vec4 color = texture2D(tDiffuse, vUv);
      float grain = (rand(vUv) - 0.5) * amount;
      gl_FragColor = vec4(color.rgb + grain, color.a);
    }
  `
};
const grainPass = new ShaderPass(grainShader);
grainPass.renderToScreen = true; // last pass in the chain
composer.addPass(grainPass);

// in the animate loop:
function animate() {
  requestAnimationFrame(animate);
  grainPass.uniforms.time.value = performance.now() * 0.001;
  composer.render(); // replaces renderer.render(scene, camera)
}
```

Gotchas:
- Only the **last** pass in the composer chain should have `renderToScreen = true` (or none, if using the default last-pass-auto-renders behavior in newer Three versions) — setting it on multiple passes causes double-draws or a blank canvas.
- `UnrealBloomPass` threshold (3rd param) needs bright enough materials/emissive values to trigger — bloom on a normally-lit scene often does nothing until an emissive material or a very bright light pushes pixel values over the threshold.
- Resize handler must also call `composer.setSize(innerWidth, innerHeight)`, not just `renderer.setSize`, or postprocessing passes render at stale resolution after a window resize.

---

## Particle Field Background

GPU-instanced point cloud for ambient background motion — cheap for large counts (10k+) since it's a single draw call.

```js
import * as THREE from 'three';

const count = 4000;
const positions = new Float32Array(count * 3);
for (let i = 0; i < count; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 20;
  positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.03,
  transparent: true,
  opacity: 0.6,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

// gentle drift in the render loop
function animate() {
  requestAnimationFrame(animate);
  particles.rotation.y += 0.0006;
  particles.rotation.x += 0.0002;
  renderer.render(scene, camera);
}
```

Scroll-reactive variant (particles speed up / spread on scroll):
```js
import gsap from 'gsap';

gsap.to(particles.scale, {
  x: 1.4, y: 1.4, z: 1.4,
  ease: 'none',
  scrollTrigger: { trigger: '.canvas-wrap', start: 'top top', end: 'bottom top', scrub: true }
});
```

Gotcha: `AdditiveBlending` with `depthWrite: false` is what gives particles their soft glow-through look — leaving `depthWrite: true` (the default) makes overlapping particles hard-clip against each other and look flat/wrong. Mobile: drop `count` to 1000–1500 and skip additive blending on lower-end GPUs (check `navigator.hardwareConcurrency` or gate behind the same `matchMedia` check used for postprocessing).
