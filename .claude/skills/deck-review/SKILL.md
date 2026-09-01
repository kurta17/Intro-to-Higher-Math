---
name: deck-review
description: Review and critique a Harbour.Space "Intro to Higher Math" (Math102BKK) slide deck on four axes - component usage, slide UI/UX measured in a real browser, whether the wording is understandable for students, and whether the content is enough. Use when asked to review, critique, audit, assess, improve or give feedback on a deck, its design, layout, readability, contrast, or coverage, or before teaching a session.
---

# Deck review

Four questions about a finished deck, answered by measurement rather than
opinion:

| Axis | Question | How it is answered |
|---|---|---|
| **COMPONENTS** | Is the design system used the way it was meant to be? | `<div>`-depth parse of the deck source |
| **UI / UX** | Does it work on a projector? | Rendered in headless Chrome; real type sizes, WCAG contrast, text coverage, line lengths |
| **CLARITY** | Can a student read it? | Sentence lengths, Flesch reading ease, jargon never defined |
| **COVERAGE** | Is the content enough? | Every objective, key term and pitfall in `course/course.json`, plus a time budget |

**Correctness of the mathematics is not here.** That is
`/lecture-content` (`verify.mjs`), which executes every claim. Run both —
this skill will happily pass a deck full of true-looking falsehoods.

Paths are relative to the unit root (`Intro-to-Higher-Math/`).

## Prerequisites

Node 22+ and Google Chrome, both already present. Nothing to install.

## Run (agent path)

```bash
R=.claude/skills/deck-review/review.mjs

node $R sessions/session-01/slides.html                    # all four axes
node $R sessions/session-01/slides.html --ui               # one axis
node $R sessions/session-01/slides.html --components --clarity --coverage
node $R sessions/session-01/slides.html --ui --data        # per-slide measurements
node $R sessions/session-01/slides.html --strict           # notes and warns fail too
node $R brand/components.html                              # works on any deck
```

Exit 0 unless a **blocker** fires (or anything fires under `--strict`).
Findings are grouped: a colour that fails on nineteen slides is reported once
as one defect with the slide list, because it is one line of CSS, not
nineteen slide problems.

```
UI / UX      measured in the browser
  NEEDS WORK   0 blocker, 1 warn, 2 note
  density: 22% average ink, tail gap 215px average
     ! slide 18: 47% text coverage — dense; consider splitting
     · 2× (slide 15, slide 19): 308px empty below the content — room for an example
```

`--data` prints what the browser actually measured, which is how the
thresholds below were set:

```
  slide  kind      ink%  tailGap  bottom  sizes  els  heading
     11  content     31      235     417      7  123  Every rule is a theorem with a hyp
     18  content     47      182     470      6  123  Where the quadratic formula comes
```

### What each axis checks

**COMPONENTS** — unknown `.box` variants; boxes with no `<span class="tag">`;
a `.box.def` tagged as a theorem (or the reverse); nested callouts; more than
one `.card.solid` on a slide; an `.activity` with no `.share`, no time or no
grouping; heavy inline `style=`.

**UI / UX** — content overflowing 720px; WCAG contrast per text run against
its **composited** background (blocker under 3:1, warn under 4.5:1); body text
under 17px; text coverage of the slide (dense over 42%, sparse under 9%);
measured characters per line; count of authored font sizes; empty space below
the content.

**CLARITY** — sentences over 32 words; slides over 125 words; Flesch reading
ease for the deck; key terms from `course.json` that are used but never appear
inside a definition or theorem box.

**COVERAGE** — each objective, pitfall and key term for that session matched
against the deck (including its TeX); activity count; and a time estimate as a
**range**, because how long a slide takes depends on the room. It complains
only at the extremes.

## Run (human path)

There is none — the output is a report. To look at what it is describing:

```bash
node .claude/skills/run-intro-to-higher-math/driver.mjs contact sessions/session-01/slides.html
```

## Gotchas

- **The probe measures a temp copy written next to the deck**
  (`sessions/session-01/.review-slides.html`), deleted on the way out. It has
  to live there: the deck loads `../../brand/deck.js`, and a `<base href>` does
  **not** rescue those on `file://` — Chrome renders the page and every
  relative asset silently 404s, so the probe never runs.
- **Do not use `requestAnimationFrame` in the probe.** Under
  `--virtual-time-budget` the callback is starved often enough that roughly
  every other run produced no output at all. Poll with `setTimeout` from the
  `load` event; `getBoundingClientRect` forces layout synchronously anyway.
- **The probe's own source is in the dumped DOM.** Any check for a marker
  string must be anchored to the `<html>` tag, or it matches the string literal
  inside the injected script and fires every time.
- **Ink coverage must be measured with `Range.getClientRects()`, not element
  boxes.** Summing element rects double-counts every `<strong>` inside a `<p>`;
  the first version reported "90% ink", which is impossible.
- **KaTeX is excluded from the font-size histogram** — it nests spans at many
  intrinsic sizes and would make every maths slide look undisciplined.
- **Strip `<div class="notes">` before turning `</div>` into a full stop.**
  Get that order wrong and the speaker notes are graded as if they were on the
  slide: a 46-word "sentence" that is really three cards, and 203-word slides.
- **Coverage matches against the TeX source, clarity does not.** A pitfall
  about `sqrt(x^2)` is only found if the matcher can see `\sqrt{x^2}`; the
  readability numbers would be nonsense if they counted it as words.
- The `used:` line lists component counts, not a score. A deck with one box
  type is not worse than one with seven — slide 2 of `brand/components.html`
  legitimately uses all of them.

## Troubleshooting

| Symptom | Cause / fix |
|---|---|
| `probe never reported after 3 attempts` | The deck did not load `../../brand/deck.js`. The rendered DOM is written to `build/review-dump.html` — open it and check the asset paths. |
| `(probe produced nothing, retry 1/2)` then success | Known Chrome flakiness under virtual time; the retry is why it is there. |
| `warning: measured before the deck reported ready` | `data-deck-ready` never appeared within the poll budget — usually a JS error in the deck. Run `driver.mjs check` first. |
| Every slide reports the same contrast failure | That is the point — it is one value in `brand/deck.css`. Fix the token, not the slides. |
| A `.review-*.html` file is left in `sessions/` | The probe crashed. Safe to delete; the next run overwrites it. |

## What it found on its first real run

Worth knowing, because these were defects in the deck system itself, not in
any one deck:

- the slide footer at **2.43:1** on white (`--hs-neutral-500`) — invisible on a
  projector, on all 19 content slides;
- muted body text at **4.35:1** (`#797979`, Harbour.Space's own web token) —
  below AA, so decks now darken it while `brand/hs-tokens.css` keeps the brand
  value untouched;
- callout **tag chips at 4.1–4.3:1** — white on the vivid accent; the chip now
  uses a `--tag-bg` one ramp step darker while the rule keeps the accent;
- **12px** activity-header text;
- and, after the first two fixes, two **regressions on dark slides** where the
  newly darkened muted colour became unreadable.
