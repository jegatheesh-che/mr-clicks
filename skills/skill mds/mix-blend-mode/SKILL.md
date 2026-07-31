---
name: mix-blend-mode
description: Professional usage of CSS mix-blend-mode for agency-tier web design. Covers text inversion, custom magnetic cursors, and resolving stacking context bugs. Use this whenever building high-end interactive websites that require dynamic contrast.
---

# Mix-Blend-Mode (Agency Standard)

## What this skill is
CSS `mix-blend-mode` is a hallmark of premium web design, primarily used to create elements that dynamically invert or adapt their color based on what is behind them. It is most commonly used for **custom cursors**, **sticky navigation text**, and **overlapping typography**.

## Core Agency Patterns

### 1. The Inverting Custom Cursor
This is the most common use case on Awwwards sites. A white cursor that turns black when hovering over a white image, or inverts text underneath it.
```css
.custom-cursor {
  position: fixed;
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  pointer-events: none; /* Critical: prevents cursor from blocking clicks */
  z-index: 9999;
  
  /* The Magic */
  mix-blend-mode: difference;
}
```
*Note: For `difference` to work perfectly, the background beneath must be either purely black (`#000`) or white (`#FFF`). If the background is gray, the cursor will turn a muddy color.*

### 2. High-Contrast Sticky Headers
When a fixed header scrolls over alternating light and dark sections.
```css
.sticky-header {
  position: fixed;
  top: 0;
  color: white;
  mix-blend-mode: difference;
  z-index: 100;
}
```

### 3. Text Over Video/Images
Making massive hero typography punch through complex imagery.
```css
.hero-text {
  color: white;
  mix-blend-mode: overlay; /* or 'exclusion' for a softer difference effect */
}
```

## The "Gotchas" (Stacking Context Bugs)
`mix-blend-mode` is notoriously fragile because of CSS Stacking Contexts. If it's not working, one of these is happening:

1. **Background Color Isolation:** `mix-blend-mode: difference` requires the parent elements to NOT have a background color that isolates the blending. If a parent container has `background-color: white`, the blend mode will stop at that container and won't interact with the body background.
2. **Opacity / Transforms:** If any parent element has `opacity < 1`, `transform`, `filter`, or `will-change`, it creates a new stacking context. The blend mode will ONLY blend with elements inside that same stacking context.
3. **The Fix (Isolation):** You can force a stacking context intentionally using `isolation: isolate;` on a parent if you *want* the blending to stop at a specific container.

## Best Practices
- **Always pair with `pointer-events: none;`** on decorative blended elements (like cursors or overlays) so they don't block user clicks.
- Use `mix-blend-mode: difference` with pure white (`#FFFFFF`) or pure black (`#000000`) for the cleanest inversion.
- For subtle image tinting, use `multiply` (darkens) or `screen` (lightens), just like in Photoshop.
