# Intro to Higher Math — Math102BKK

Teaching materials for [Intro to Higher Math](https://harbour.space/maths-as-a-second-language/courses/intro-to-higher-math-kurtanidze-kereleishvili-1528)
at Harbour.Space Bangkok — 15 sessions, 45 contact hours, 4 ECTS,
7–25 September 2026. Giorgi Kurtanidze · Irakli Kereleishvili.

HS-branded 16:9 slide decks and A4 problem sets, as static HTML. No build
step, no dependencies, no network — KaTeX and Manrope are vendored, so a
classroom with no wifi still gets its mathematics.

## Quick start

```bash
D=.claude/skills/run-intro-to-higher-math/driver.mjs

node $D list                                       # the 15 sessions
node $D open  sessions/session-01/slides.html      # present it
node $D check sessions/session-01/slides.html      # lint it
node $D shot  sessions/session-01/slides.html all  # PNGs -> build/
node $D pdf   sessions/session-01/slides.html      # PDF  -> build/
node $D new   6                                    # scaffold session 6

node .claude/skills/lecture-content/verify.mjs \
     sessions/session-01/slides.html               # is the maths actually true?
```

Every mathematical claim in a deck ships with an executable check beside it,
in a `<script type="application/x-hs-check">` block the browser ignores.
`verify.mjs` runs them all — a wrong identity comes back with a concrete
counterexample — and separately lints whether the slide explains itself.

## Skills

Three Claude Code skills live in `.claude/skills/`:

| Skill | Use it to |
|---|---|
| `/run-intro-to-higher-math` | build, present, screenshot, lint, export |
| `/lecture-content` | verify every claim on a slide is true, and explained |
| `/deck-review` | critique a deck: components, UI/UX, readability, coverage |
| `/tutor-session-deck` | write a session's slides and lesson plan |
| `/tutor-problem-set` | write homework, the midterm, the final, with rubrics |

## Layout

```
brand/     design tokens taken from harbour.space, deck + handout CSS,
           the runtime, a live component gallery, vendored KaTeX/Manrope
course/    course.json — the 15-session curriculum model
sessions/  _template/ scaffolds, session-01/ reference deck + problem set
build/     generated PNGs and PDFs (gitignored)
```

## Branding

Colours are lifted verbatim from the Harbour.Space production stylesheet
(`/_next/static/chunks/4415-*.css`, captured 1 Sep 2026) into
`brand/hs-tokens.css` — purple `#4b2696` primary, fuchsia `#ff3bc7` highlight,
cyan/green/yellow/red support ramps, HS neutrals, radii and the 14px chamfer.
Pick from those ramps; never write a hex value into a deck.

HS's own typeface, Apercu Pro, is licensed and not redistributable here.
Decks use Manrope — which Harbour.Space also ships and which is freely
available — falling back to Arial/Helvetica.
