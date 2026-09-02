# Amaya — interior page redesign, integration brief

Redesign of `/blogs`, `/media` and `/founders` to the standard the homepage sets.

This is a **patch, not a rewrite**. Nothing in the existing stylesheet is edited or
removed. The CSS is additive and reuses the tokens already in `:root`
(`--navy`, `--brass`, `--limestone`, `--serif`, `--sans`, `--container`, `--gutter`,
`--ease-out`, `--s*`) and extends the existing `.blog-*`, `.fd-*` and `.btn`
components in place. Motion uses the `[data-reveal]`, `[data-reveal-scale]` and
`[data-hero-line]` attributes already driving the homepage, so no new animation
library is introduced.

## Files

| File | What to do with it |
|---|---|
| `redesign.css` | Append to the site stylesheet, or import after it. Additive. |
| `topics-filter.js` | Load on `/blogs` only. ~2KB, no dependencies. |
| `blogs.markup.html` | Target DOM for `/blogs`. |
| `media.markup.html` | Target DOM for `/media`. |
| `founders.markup.html` | Target DOM for `/founders`. |
| `copy-deck.md` | All final copy. |

The markup files show the DOM each page should produce, with `NEW` marking every
class that `redesign.css` introduces. Everything unmarked already exists. Map them
into whatever components currently render these routes; the class contract is what
matters, not the file shape.

## The core problem

All three pages are built on `.legal-hero` and `.legal-page`, the components behind
`/privacy-policy`. A press index and a founders story are wearing a legal document's
layout, which is why they read as a different site from the homepage.

After this patch, `.legal-hero` should be used only on `/privacy-policy` and
`/terms-and-conditions`.

## Changes by page

### /blogs
- `.legal-hero` becomes `.page-hero`: full-bleed image, gradient scrim, display serif
  headline with an italic second line. Same construction as the existing `.fd-hero`.
- New sticky topic filter. Typographic rather than pill-shaped, because v3 sets button
  radius to 0 and describes accents as a thin brass rule. The active state is a brass
  rule that slides between topics in 280ms on `--ease-out`, snapping under
  `prefers-reduced-motion`. It responds on pointer-down, not on release.
- Card rhythm fixed: a two-line title box and a three-line excerpt box using the
  existing line-heights, with the link pinned by `margin-top: auto` in a stretched row.
  Alignment is therefore structural and survives copy edits.
- A 48px brass accent rule on each card, per the v3 component sheet.

### /media
The weakest of the three. Press coverage currently renders through blog cards with
unrelated project renders as thumbnails, and the intro paragraph is copied verbatim
from `/blogs`.

- Same `.page-hero` treatment.
- New outlet strip: publication wordmarks set in the brand serif.
- One lead story, two image-led stories, then a typographic index of hairline rows
  carrying publication, date, headline and excerpt. Far closer to how press is
  normally presented, and it removes the mismatched thumbnails.
- The Telugu lead gets `lang="te"`, a Telugu face, corrected leading, and a plain
  English gloss line beneath the headline.
- New media enquiries block. A press page should give journalists a contact route.

### /founders
Least structural change; its components are already sound.

- `.fd-hero-media` currently ships with **no `<img>`**, which is the entire reason the
  hero reads as a flat navy band. Adding the image plus a three-item fact strip fixes it.
- Copy cut to roughly half. Every fact, credential and figure is kept; the six-line
  Experience and Education stacks become single middot-separated lines.
- Round chips become rules, per the radius-0 guideline. `.fd-profile-chips` is replaced
  by a `Focus` line; `.fd-institution-focus` pills are restyled in CSS with no markup change.

## Fonts

`/media` needs a Telugu face. Add alongside the existing families:

```
https://fonts.googleapis.com/css2?family=Noto+Serif+Telugu:wght@400;500&display=swap
```

Load it on `/media` only. `redesign.css` already falls back to `var(--serif)` if it
is absent, so this is a refinement rather than a blocker.

## Verified

`redesign.css` and the `/blogs` markup were injected into the live page and measured
in the browser at 1440px, against the real stylesheet, real Cormorant Garamond and
Jost, and real images:

- every card title renders at exactly 52px, two lines
- every excerpt renders at exactly 77px, three lines
- all three "Read More" links in row one share a pixel, both in row two
- the filter rule lands within one pixel of the active topic
- no horizontal overflow

## Open items

1. **Healthcare post image** still points at `amaya-senior-living.vercel.app`, the old
   mockup domain, not your own host. Worth moving before this ships.
2. **Detail-page templates** are untouched. `.blog-article-*` already looks well built,
   so this patch deliberately leaves it alone.
3. **"Load More"** on `/media` should append into `.press-index`. If `/blogs` moves to
   server-side pagination, make each topic a link to `/blogs?topic=<slug>` and delete
   the filtering block in `topics-filter.js`; the sliding rule works either way.
