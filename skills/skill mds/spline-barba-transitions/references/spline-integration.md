# Spline Integration

## Vanilla JS embed

```html
<canvas id="spline-canvas"></canvas>
<script type="module">
  import { Application } from 'https://unpkg.com/@splinetool/runtime/build/runtime.js';

  const canvas = document.getElementById('spline-canvas');
  const app = new Application(canvas);

  app.load('https://prod.spline.design/XXXXX/scene.splinecode')
    .then(() => {
      document.body.classList.add('spline-loaded'); // fade in via CSS, gate on this
    });
</script>
```

## React embed

```jsx
import Spline from '@splinetool/react-spline';

function Scene() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={loaded ? 'scene-loaded' : 'scene-loading'}>
      <Spline
        scene="https://prod.spline.design/XXXXX/scene.splinecode"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
```

## Controlling the scene from outside code

This is the part that separates a static embed from an interactive "award" moment. Spline exposes named objects and variables you set up inside the editor (name your objects in Spline first — `Camera`, `Room`, etc.).

```js
app.load(sceneUrl).then(() => {
  const camera = app.findObjectByName('Camera');

  // Drive camera position from scroll, GSAP, whatever
  gsap.to(camera.position, {
    z: 200,
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });
});
```

You can also trigger Spline's own internal animation states/events:

```js
app.emitEvent('mouseDown', 'ObjectName'); // fires an interaction defined in the Spline editor
```

## Loading gate pattern (don't skip this)

```css
.spline-canvas-wrapper { opacity: 0; transition: opacity 0.6s ease; }
body.spline-loaded .spline-canvas-wrapper { opacity: 1; }
```

Show a lightweight branded loader (logo mark, not a generic spinner) while waiting — Spline runtime + scene assets commonly take 1-4 seconds even on decent connections.

## Performance notes

- Export at the lowest polygon/texture budget that still looks intentional — Spline's export panel shows an estimated file size, keep an eye on it.
- Disable scenes entirely on low-end mobile: check `navigator.hardwareConcurrency`, viewport width, or use a simple feature-detection library, and swap in a static poster image + CSS-only parallax as fallback.
- Only one Spline `Application` instance should be running at a time. If your Barba setup risks loading a second scene on a page transition before disposing the first, you'll silently degrade performance page over page.
