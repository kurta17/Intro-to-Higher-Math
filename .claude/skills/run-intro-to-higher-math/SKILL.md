---
name: run-intro-to-higher-math
description: Build, preview, screenshot, lint and export the Harbour.Space "Intro to Higher Math" (Math102BKK) slide decks and problem sets. Use when asked to run, present, open, render, screenshot, check, or export to PDF any session deck or handout in this course, or to scaffold a new session.
---

# Run: Intro to Higher Math

Course materials for Harbour.Space Math102BKK — 15 sessions of HS-branded
16:9 slide decks plus A4 problem sets. Everything is static HTML: no build
step, no `npm install`, no dependencies. All assets (KaTeX, Manrope) are
vendored under `brand/vendor/`, so **decks work with no network** — which
matters, because this course is taught offline in a Bangkok classroom.

Decks are driven by **headless Chrome** through
`.claude/skills/run-intro-to-higher-math/driver.mjs`. That is the agent path:
it renders, lints, screenshots and exports without a window ever opening.

All paths below are relative to the unit root
(`Intro-to-Higher-Math/`). Run every command from there.

## Prerequisites

Node 22+ and Google Chrome. Both are already present on this machine —
nothing was installed to make any of this work:

```bash
node --version                                    # v22.14.0
ls "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
```

The driver finds Chrome itself (Chrome → Chromium → Brave → the usual Linux
paths). Override with `CHROME=/path/to/chrome`.

## Run (agent path)

```bash
D=.claude/skills/run-intro-to-higher-math/driver.mjs

node $D list                                       # all 15 sessions, which have decks
node $D check sessions/session-01/slides.html      # lint: renders it, reports problems
node $D shot  sessions/session-01/slides.html all  # PNG per slide -> build/session-01/
node $D shot  sessions/session-01/slides.html 9    # just slide 9
node $D contact sessions/session-01/slides.html    # whole deck in ONE tall PNG
node $D pdf   sessions/session-01/slides.html      # -> build/session-01-slides.pdf
node $D new   6                                    # scaffold session 6 from the template
```

`check` is the one to run after every edit. It loads the deck in headless
Chrome and reports slide count, every slide title, **content that overflows
the 720px slide box**, TeX that failed to render, and console errors.
Exit code 0 = clean, 1 = something to fix:

```
slides: 13
   1. Intro to Higher Math
   ...
katex loaded: yes
unrendered TeX: none
overflow: none
errors: none

OK
```

**Always look at the PNGs you generate** (`Read` them). `check` catches
broken maths and overflow; it cannot tell you a slide is ugly or empty.

`shot all` is one Chrome process **per slide**: on a 21-slide deck that is
minutes, and it will blow a 120-second command timeout. Use `contact` for a
single tall image of the whole deck when you just want to see that nothing
is broken, and `shot <n>` for the slides you actually need to inspect.

### Problem sets

Handouts live beside the deck as `problem-set.html` and use
`brand/handout.css`. Solutions are written inline in `.solution` blocks and
hidden unless asked for, so one file produces both PDFs:

```bash
node $D pdf sessions/session-01/problem-set.html            # student copy
node $D pdf sessions/session-01/problem-set.html solutions  # marker's copy
```

`check` and `shot` are deck-only. For a handout, export the PDF and read it.

### The component gallery

`brand/components.html` renders every available building block — the seven
callout boxes, cards, chips, tables, grid classes, maths, dark and section
slides. Screenshot it before authoring so you pick from what exists:

```bash
node $D shot brand/components.html all       # -> build/brand/
```

## Run (human path)

```bash
node $D open sessions/session-01/slides.html      # opens Chrome, serves over http
node $D serve                                     # static server on 127.0.0.1:8177
```

`open` starts the static server and launches a Chrome window at the deck.
Arrow keys / PageUp / PageDown / click to navigate; `Home` and `End` jump to
the ends. The process stays in the foreground holding the server — Ctrl-C when
the lecture ends. Deck URLs accept `?mode=`:

| mode | what you get |
|---|---|
| `present` (default) | one slide at a time, scaled to the window, keyboard nav |
| `scroll` | every slide stacked — fastest way to review a whole deck |
| `print` | page-break layout used by `pdf` |

Opening the `.html` file directly with `file://` also works (fonts and KaTeX
load fine from it) — the server just gives you a short stable URL.

## Authoring

Don't start from a blank file. Either:

- `node $D new <n>` — scaffolds `sessions/session-NN/slides.html` and
  `problem-set.html` from `sessions/_template/`, pre-filled with the session's
  title and date, and prints the objectives from `course/course.json`; or
- copy `sessions/session-01/` — the reference implementation, a complete
  13-slide deck plus a 10-problem homework with solutions and rubric.

Four skills carry the content: **`/tutor-session-deck`** for a session's
slides, **`/tutor-problem-set`** for homework and exams, **`/lecture-content`**
for whether the mathematics is true and explained, and **`/deck-review`** for
whether the finished deck works — components, UI/UX, readability, coverage.
This skill is only the machinery.

`check` proves a deck *renders*. It says nothing about whether the maths is
right — that is `node .claude/skills/lecture-content/verify.mjs <deck>`,
which executes every claim in the deck. Run both before teaching.

## Gotchas

- **No `<!doctype html>` on line 1 → every formula silently disappears.**
  Chrome falls into quirks mode and KaTeX refuses to parse, logging only
  `KaTeX doesn't work in quirks mode` to a console nobody is reading. This
  cost real time; `check` now reports it as the first error.
- **`<` inside maths must be written `&lt;`.** `$x < 0$` in an HTML file
  truncates the formula at the `<`. Same for `&` outside a `\begin{}` block.
- **Screenshots are one Chrome process per slide, and they go stale.** After
  a CSS change, re-run `shot ... all` — not the single slide you were
  inspecting. Reviewing stale PNGs sent me chasing a layout bug that was
  already fixed.
- **Grid items hug their content by default** (`align-content/items: start`).
  That is deliberate: stretched boxes leave big dead gaps under short text.
  Add `.even` (`<div class="s-body cols-2 even">`) when you want equal-height
  comparison columns.
- **The unrendered-TeX check ignores `<code>`**, mirroring KaTeX's own
  `ignoredTags`. Documenting `$x$` inside `<code>` is not a failure.
- **Outlined roman numerals read as empty boxes.** `.num-badge` is 150px
  transparent-fill text; "II" looks like two blank rectangles. Use digits.
- **Apercu Pro is Harbour.Space's real typeface and is licensed** — it is not
  vendored. Decks use Manrope, which HS also ships and which is freely
  available, falling back to Arial/Helvetica.
- **Never add a CDN link back in.** Everything is vendored under
  `brand/vendor/`. A `<link>` to cdnjs or fonts.googleapis.com turns a
  classroom with no wifi into a deck with no mathematics.
- **Chrome writes noise to stderr on every single run** (`Fontconfig error`,
  DevTools chatter). Ignore it; the exit code is the signal.
- **Do not add `--user-data-dir` to isolate the profile.** It looks like the
  right thing and it is not: pointing Chrome at a fresh profile directory made
  *every* headless launch hang here — a normal 2-second render went to over
  two minutes and had to be killed. Headless Chrome sharing the user's default
  profile is fine, including while they have Chrome open. A hung launch is
  retried once before the run fails.
- **Don't pipe driver output through `tail` when you care whether it worked.**
  The pipeline's exit status is `tail`'s, so a crash halfway through
  `shot all` looks like success and a later `&&` still runs. Check the file
  count, or drop the pipe.

## Troubleshooting

| Symptom | Cause / fix |
|---|---|
| `deck never reported diagnostics - deck.js did not run` | Wrong relative path to `../../brand/deck.js`, or a JS syntax error. The rendered DOM is dumped to `build/.dom.html` — read it. |
| `check` says `unrendered TeX on slides: …` | Missing doctype (see Gotchas), or a raw `<` inside `$…$`. Run Chrome by hand with `--enable-logging=stderr --v=0` and grep for `KaTeX` to get the exact parse error. |
| `check` says `OVERFLOW … slide 7: +64px` | Content is taller than 720px and is being clipped. Split the slide; don't shrink the type. |
| `slide 14 out of range (1..13)` | You asked `shot` for a slide the deck doesn't have. |
| `serve` throws `EADDRINUSE` | Another `serve`/`open` is running. Reuse it, or `PORT=8180 node $D serve`. |
| `spawnSync … ETIMEDOUT` mid-`shot all` | A Chrome launch hung. The driver retries once. If it persists, look for a wedged headless process — `pgrep -fl "headless=new"` — and kill it; a stuck one blocks every launch after it. |
| `No Chrome found` | Set `CHROME=/path/to/chrome`. |
| PDF is one enormous page | The deck lost `@page { size: 1280px 720px }` from `brand/deck.css`, or you exported without `mode=print` (the driver adds it). |

## Layout

```
brand/            hs-tokens.css  design tokens copied from harbour.space
                  deck.css       16:9 slide system
                  deck.js        presenter nav, slide numbers, diagnostics
                  handout.css    A4 problem sets and exams
                  handout.js     solutions toggle
                  components.html  live component gallery
                  vendor/        KaTeX 0.16.9 + Manrope (offline)
course/           course.json    the 15-session curriculum model
sessions/         _template/     scaffolds used by `driver.mjs new`
                  session-01/    reference deck + reference problem set
build/            generated PNGs and PDFs (gitignored)
```
