# Portfolio

Personal portfolio for Adam El-Kadri. A six-panel slide deck built with Next.js
(App Router, static export), TypeScript, and Tailwind CSS v4.

```bash
npm run dev
```

```bash
npm run build
```

`npm run build` writes a fully static site to `out/`, deployable to Vercel,
Netlify, GitHub Pages, or any static host.

## Content

All copy comes from `lib/content.ts`, transcribed from `Adam_El-Kadri_CV.pdf`.
Nothing on the site is invented: if a fact is not on the CV it does not appear
here. Edit that one file to update the site.

The two project URLs come from the link annotations embedded in the PDF rather
than its visible text, which only shows the labels "Website" and "Source Code".

## Metadata and social card

`app/layout.tsx` sets the page metadata. The social share card (LinkedIn, X,
iMessage, Slack) is generated at build time by `app/opengraph-image.tsx` using
`next/og` and the IBM Plex Mono TTFs in `assets/`, so it matches the deck's own
tokens instead of being a generic placeholder. `app/twitter-image.tsx` reuses
it, and `app/icon.tsx` renders the "ae" browser-tab favicon the same way.

`lib/content.ts` exports `siteUrl`, which drives the canonical URL and the
absolute image URLs crawlers fetch. **It is a placeholder** (`adam-el-kadri.vercel.app`):
set it to the real deployment URL after the first Vercel deploy. That one line
is the only value tied to the domain. Re-share the link through the
[LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) once live so
the card cache picks up the correct image.

One deliberate omission: the phone number on the CV is not published. It is left
out of `lib/content.ts` entirely, so it is absent from the JavaScript bundle and
not just hidden in the markup. The CV itself is served at
`public/adam-el-kadri-cv.pdf` and linked from the contact panel, so re-export it
there whenever the CV changes.

## Design system

Everything visual is defined in `app/globals.css`. The palette is strictly
monochrome, with no accent colour in either theme:

| Token | Light | Dark |
| --- | --- | --- |
| `--bg` | `#f0f0f0` | `#1a1a1a` |
| `--bg-secondary` | `#e8e8e8` | `#222222` |
| `--text-primary` | `#1a1a1a` | `#f0f0f0` |
| `--text-secondary` | `#666666` | `#999999` |
| `--line` | `rgba(0,0,0,.08)` | `rgba(255,255,255,.08)` |

Typography is IBM Plex Mono throughout, loaded via `next/font`. Spacing follows
a 4px grid and transitions use `0.15s`/`0.2s` with
`cubic-bezier(0.4, 0, 0.2, 1)`.

Motion is plain CSS rather than an animation library. The `hero-drop`,
`pill-pop`, `pill-float`, and `arrow-float` keyframes are all in the same file
alongside the tokens.

## Cursor

`components/Cursor.tsx` replaces the system cursor with a white disc that trails
the pointer and expands over the menu bar. It has no colour of its own: it is
white in `mix-blend-mode: difference`, which inverts whatever it covers, so the
nav label reads through it in both themes.

The disc is always 32px and scaled down, so the size change animates on
`transform` alone rather than on width and height. It rests at 10px and fills
the box on hover; adjust both from the scale values on `.cursor-dot`. Position is written straight
to the DOM once per animation frame and the loop parks itself when the cursor
catches up, so none of this re-renders the deck.

It applies only under `(hover: hover) and (pointer: fine)`; touch and coarse
pointers keep their native behaviour and the listeners are never attached. Under
`prefers-reduced-motion` the disc tracks the pointer exactly, with no trailing
and no scale animation.

To make anything else grow the cursor, put `data-cursor-zoom` on a container.
Any `button` or `a` inside it will trigger the zoom.

## Navigation

The deck responds to arrow keys, `Home`/`End`, the mouse wheel, horizontal
swipes, the dot pager, and the nav links. Slides taller than the viewport scroll
their own content first and only advance once the scroll reaches its edge.
Everything animated is disabled under `prefers-reduced-motion`.
