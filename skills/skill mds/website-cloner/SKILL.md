---
name: website-cloner
description: Use this skill whenever the user pastes a website URL and asks to clone it, rebuild it, copy its design, use it "as reference," or recreate its look/feel/animations — with NO framework (no React/Next/Vue). Output is always plain HTML, CSS, and vanilla JavaScript, using GSAP (+ ScrollTrigger) and Lenis for any animation or smooth-scroll behavior. Trigger this for phrases like "clone this site", "make a site like this url", "rebuild this landing page", "copy this design in html css js", or any request to reverse-engineer a live website into a static build. Do NOT use this for building a website from scratch with no reference URL — that's the web-dev skill instead.
---

# Website Cloner (Framework-Free)

Reverse-engineers a live website from a URL into a clean, production-ready
**vanilla HTML/CSS/JS** rebuild — no React, no Next.js, no build step required.
Animation and scroll behavior are implemented with **GSAP** (+ ScrollTrigger)
and **Lenis** for smooth scroll, matching Jegatheesh Web Studio's normal stack.

## When to use this
- User pastes a URL and says clone / copy / recreate / "make one like this"
- User wants a client pitch demo built fast from a reference site
- User wants only ONE section cloned (hero, nav, pricing table, etc.) — same
  process, just scoped to that section

## Workflow

### Step 1 — Confirm scope (skip if obvious)
If the user just pastes a bare URL with no other context, assume: full page,
single working prototype, GSAP + Lenis, output as one project folder. Only
ask a clarifying question if they gave conflicting or ambiguous instructions
(e.g. two URLs with no indication of which one, or "clone it" with no URL).

### Step 2 — Fetch & inspect the target site
Use `web_fetch` on the URL to get the rendered page. If you need actual
computed CSS values, asset URLs, or JS behavior that aren't visible from a
plain fetch, use `bash_tool` with `curl` to pull the raw HTML/CSS/JS source
(respect robots.txt; only clone content the user has rights to reference —
this is for personal portfolios, client pitches, and educational rebuilds,
not for shipping someone else's copyrighted content as-is).

Extract and note down:
1. **Design tokens** — color palette (hex values), font families + weights
   (check Google Fonts links or @font-face), spacing scale, border-radius
   values, shadow styles
2. **Layout structure** — section-by-section breakdown (nav, hero, features,
   testimonials, footer, etc.), grid/flex structure, breakpoints
3. **Assets** — image URLs, icon sets (SVG vs icon font vs Lucide/Feather),
   logo, favicon
4. **Behavior** — anything that moves: scroll-triggered reveals, parallax,
   sticky nav, hover states, marquee/ticker text, page-load intro animation,
   smooth scroll. For each, note the trigger (on load / on scroll position /
   on hover) and the visual effect (fade, slide, scale, stagger).

Keep this inspection note short and practical — a bullet list is enough,
not a formal spec document, unless the user asks for one.

### Step 3 — Scaffold the project
Create a plain folder structure, no build tools, no npm required to run it:

```
project/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── assets/
│   ├── images/
│   └── fonts/       (only if self-hosting fonts instead of Google Fonts CDN)
```

Load GSAP and Lenis via CDN in `index.html`:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://unpkg.com/lenis@1.1.13/dist/lenis.min.js"></script>
```

For the Lenis + GSAP ScrollTrigger sync pattern, and common animation
recipes (hero intro, scroll reveals, parallax, sticky sections, marquee),
read `references/gsap-lenis-patterns.md` before writing `main.js` — it also
documents the double-Lenis-instance bug so you don't reintroduce it.

### Step 4 — Build section by section
Write `index.html` and `style.css` first (get the static layout and design
tokens matching), THEN wire up `main.js` for behavior. Building animation
before layout is stable wastes time — always static-correct first, animated
second.

Match the extracted design tokens as CSS custom properties at the top of
`style.css`:

```css
:root {
  --color-bg: #...;
  --color-primary: #...;
  --font-heading: '...', sans-serif;
  --font-body: '...', sans-serif;
  --radius-md: ...px;
}
```

### Step 5 — Rebuild, don't screenshot
Never ship a static image standing in for a section. Every section should be
real HTML/CSS so it's responsive and editable. If an asset (e.g. a specific
paid font, a proprietary illustration) can't be legally reused, substitute
the closest free alternative (e.g. a similar Google Font) and tell the user
what you swapped and why.

### Step 6 — Deliver
Save the finished project under `/mnt/user-data/outputs/`, then use
`present_files` to hand it over. If it's a single simple page, a single
self-contained `index.html` (inline `<style>`/`<script>`) is fine instead of
a folder — ask which the user prefers only if it's not obvious from context
(a multi-page site implies a folder; a one-pager pitch demo implies a single
file).

## Notes specific to Jegatheesh's workflow
- Default stack is vanilla HTML/CSS/JS + GSAP + Lenis — this matches his
  usual client builds (SESPL, cafe sites, photography portfolios), so don't
  suggest React/Next unless he explicitly asks for it this time.
- If the clone is for cold-outreach/pitch purposes (e.g. "clone this so I
  can show a photographer what their site could look like"), keep it to a
  single working page — speed matters more than exhaustive section coverage.
- If GSAP/Lenis animations feel off (scroll desync, double-firing triggers),
  check `references/gsap-lenis-patterns.md` — it documents the exact double
  Lenis-loop bug encountered before on a contact page build.
