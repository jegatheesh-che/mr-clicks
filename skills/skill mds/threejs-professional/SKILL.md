---
name: threejs-professional
description: A professional-level guide to building high-end, highly optimized vanilla Three.js and WebGL scenes. Use this whenever the user requests 3D graphics, shaders, particle systems, or advanced canvas animations without using frameworks like React Three Fiber.
---

# Professional Three.js Architecture & Best Practices

This skill outlines the exact architecture, optimization techniques, and patterns used by high-end creative agencies to build $100k+ Awwwards-winning WebGL experiences using vanilla Three.js.

## 1. Core Architecture (Vanilla JS)
Do not dump all Three.js code into a single `script.js` file. Structure the 3D environment using an Object-Oriented approach or clean modules.
- **App Class**: Manages the renderer, scene, camera, and the main `requestAnimationFrame` loop.
- **World Class**: Handles the addition of meshes, lighting, and environments.
- **Resize Handler**: Always bind a reliable `resize` event to update the camera's aspect ratio and the renderer's pixel ratio.

## 2. Optimization & Performance (CRITICAL)
A premium site MUST run at 60fps.
- **Pixel Ratio Limit**: Never set `renderer.setPixelRatio(window.devicePixelRatio)` without clamping it. High DPI screens (like iPhones) will attempt to render 3x the pixels and lag. ALWAYS use `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))`.
- **Geometry & Materials**: Reuse geometries and materials whenever possible. Do not create a new `MeshBasicMaterial` inside a loop.
- **Dispose of Memory**: When removing objects from a scene, you MUST manually call `.dispose()` on their geometry, material, and textures to prevent massive memory leaks.
- **Visible Check**: If a 3D object is scrolled out of the viewport, set `mesh.visible = false` or pause the render loop completely using an Intersection Observer on the canvas container.

## 3. High-End Shaders (GLSL)
Premium websites rely on Custom Shaders, not standard materials.
- Use `ShaderMaterial` or `RawShaderMaterial` for liquid image transitions, custom noise, grain, and particle physics.
- **Uniforms**: Pass time (`uTime`), mouse coordinates (`uMouse`), and scroll progress (`uScroll`) into your shaders as uniforms to create interactive distortions.
- Always use `highp` precision for vertices and `mediump` precision for fragments to balance quality and performance on mobile.

## 4. Integrating with GSAP
Three.js and GSAP are a match made in heaven.
- Animate Three.js properties (like `camera.position.z` or a shader uniform `material.uniforms.uProgress.value`) directly using GSAP timelines.
- Tie GSAP `ScrollTrigger` to a Three.js camera to create a cinematic 3D scroll experience.
- **Pro Tip**: Use `gsap.ticker.add(render)` instead of a standard `requestAnimationFrame` if you want perfectly synchronized DOM and WebGL animations.

## 5. Post-Processing & Lighting
- **Environment Maps**: Use an HDRI environment map for realistic lighting and reflections instead of placing dozens of heavy point lights.
- **Post-Processing**: If using the `EffectComposer` (for Bloom, DOF, Film Grain), be extremely careful with performance. Post-processing requires rendering the scene multiple times per frame. Limit passes on mobile devices.

## 6. Asset Loading
- Never load massive 15MB GLTF models. Compress models using Draco compression.
- Always use `THREE.LoadingManager` to track loading progress and display a premium custom loading screen before revealing the 3D canvas.
