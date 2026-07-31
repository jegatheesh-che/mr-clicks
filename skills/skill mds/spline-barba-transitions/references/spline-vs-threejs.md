# Spline vs. Raw Three.js — When to Use Which

Tell the user directly which one fits their brief instead of defaulting to Spline just because they mentioned it.

## Reach for Spline when:
- The scene is a designed asset — a stylized room, product, abstract shape, character — built by someone thinking visually, not writing shader code.
- The team wants to iterate on lighting/materials/composition quickly without a code round-trip.
- Interactions needed are within Spline's built-in event system (hover, click, scroll-linked state changes, simple physics).
- Time budget favors design-tool speed over custom engineering.

## Reach for raw Three.js when:
- The effect needs custom GLSL shaders (fluid sims, custom distortion, generative/procedural visuals) — Spline doesn't expose shader-level control.
- The scene is data-driven (visualizing real datasets, generating geometry from an API response at runtime).
- Performance needs to be hand-tuned beyond what Spline's exporter allows (very high object counts, custom LOD systems, instanced rendering at scale).
- The project needs full control over the render loop to sync tightly with something Spline can't natively drive (e.g., WebXR, custom post-processing chains beyond bloom/grain presets).

## Hybrid is common and fine

Export a Spline scene, then load its `.splinecode` inside a Three.js scene alongside custom shader-based elements (Spline's runtime can coexist with a Three.js renderer if scoped carefully) — but this adds real complexity. Only suggest it if the brief genuinely needs both a designed asset AND custom shader work; otherwise it's over-engineering for a portfolio site.
