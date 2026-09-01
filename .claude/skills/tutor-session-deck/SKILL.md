---
name: tutor-session-deck
description: Author a teaching deck for one session of Harbour.Space "Intro to Higher Math" (Math102BKK) - sets, functions, proof techniques, induction, combinatorics, GCD, modular arithmetic, vectors, polynomials, complex numbers. Use when asked to write, plan, draft or improve the slides or lesson plan for a session of this course.
---

# Tutor: session deck

You are writing three hours of class for students who can compute but have
never been asked to justify. The whole course exists to move them from
"getting the answer" to "knowing why the answer is right" — every slide
should be answerable to that.

Read `course/course.json` first. It holds the session's `goal`, `objectives`,
`keyTerms`, `boardExamples`, `pitfalls` and `homework`, plus the grading
weights and the standard 3-hour block structure. It is the spec; the deck is
an implementation of it.

## Before you write

```bash
D=.claude/skills/run-intro-to-higher-math/driver.mjs
node $D list                                  # where this session sits
node $D shot brand/components.html all        # what you can build with
```

Then read `sessions/session-01/slides.html` — the reference deck — and the
PNGs of it in `build/session-01/`. Match that density and voice. Machinery
(commands, modes, troubleshooting) lives in **`/run-intro-to-higher-math`**.

## Shape of a session

3 contact hours, and nobody absorbs three hours of lecture. The rhythm in
`course.json → sessionShape` is: warm-up 10 · concept 45 · practice 25 ·
break 10 · concept 40 · practice 30 · wrap-up 15. A deck that mirrors it runs
roughly 12–18 slides:

| Slides | Purpose |
|---|---|
| 1 | Title (`.slide.title`) — session number, date, one-line goal |
| 2 | Recap + **the question today answers**. Never open cold. |
| 3 | Objectives, lifted from `course.json` |
| 4–7 | Concept I: definition → example → theorem → proof |
| 8 | `.slide.section` divider (this is where the break falls) |
| 9–12 | Concept II, same arc |
| 13 | Pitfalls, straight from `course.json → pitfalls` |
| 14 | `.box.try` practice — what students do in the room |
| 15 | `.slide.dark` wrap-up: three takeaways, key terms as chips, homework brief |

## Rules that make it this course and not a generic maths deck

1. **Every definition earns its keep.** State it in a `.box.def`, then
   immediately show one object that satisfies it and one that doesn't.
2. **Never state a theorem without proving it or saying when you will.**
   `.box.thm` followed by `.box.proof`. If the proof is out of scope, say so
   on the slide — that's honest, and it models how mathematicians talk.
3. **One pitfall slide minimum.** They're pre-written in `course.json`; each
   is a mark students actually lose. Pair `.box.pitfall` (the trap) with
   `.box.note` (the fix).
4. **Students work in the room.** Practice is a third of the contact hours,
   so a three-hour session carries **three or four `.activity` blocks**, not
   one exercise slide. Use `.box.try` for a short individual burst or an exit
   ticket; use `.activity` for structured group work:

   ```html
   <div class="activity">
     <header><span>Activity 1</span><span class="who">groups of three</span><span class="time">12 min</span></header>
     <div class="a-body">
       One sentence of task framing, then numbered steps.
       <ol><li>…</li></ol>
       <div class="share"><b>Share:</b> what gets presented to the room.</div>
     </div>
   </div>
   ```

   Every activity states **how long, who with, and what gets shared** — the
   `.share` line is not decoration. The course is graded 10% on participation
   and its method is "students present and explain their reasoning"; an
   activity with no share step is just silent homework done early.

   Activity types that work here, in rough order of usefulness:

   | Type | Shape |
   |---|---|
   | Spot the missing hypothesis | false statements; students supply a counterexample, then repair the statement |
   | Always / sometimes / never | sort operations into three buckets and justify the boundary cases |
   | Find the broken step | a plausible wrong proof; students locate the first false line |
   | Derive it yourselves | close the slides and reconstruct a result you just showed |
   | Translate | turn prose into notation, or notation into prose |
   | Two ways | prove the same thing algebraically and combinatorially, then compare |

   Put the expected answers in `<div class="notes">` **and** verify them with
   a check block — an activity whose answer you have not verified is an
   activity that will go wrong in front of twenty people.
5. **Justification is the assessed object.** Where a worked example has a
   subtle step, name it on the slide ("every step here is an equivalence, so
   nothing is gained or lost"). 60% of the grade is homework marked this way.
6. **Connect backwards and forwards.** Slide 2 says what yesterday gives you;
   the last slide names tomorrow's session. The syllabus is one argument
   running sets → functions → proof → induction → counting → number theory →
   vectors → polynomials → ℂ.
7. **AI is allowed, so aim above it.** Students may use AI tools; they must be
   able to explain every line. Favour "why is this step legal", "find the
   broken step", "state the hypothesis you used" over "compute this".

## Writing the file

```bash
node $D new 6                                 # scaffolds slides + problem set
```

- `<!doctype html>` stays on line 1. Without it KaTeX renders nothing.
- One `<section class="slide">` per slide. Nothing may exceed 720px tall.
- Maths: `$inline$` and `$$display$$`. Write `<` as `&lt;`.
- Colour comes only from `brand/hs-tokens.css`. Never write a hex value.
- Speaker notes go in `<div class="notes">` — never rendered, required on
  every content slide, and the only way the other lecturer can teach your deck.
- Every claim gets a check block. See `/lecture-content`.
- Footers and slide numbers are injected; don't write them.

## Then verify — this part is not optional

```bash
V=.claude/skills/lecture-content/verify.mjs
R=.claude/skills/deck-review/review.mjs
node $V sessions/session-06/slides.html --strict   # is it TRUE, and explained?
node $R sessions/session-06/slides.html            # does it WORK as a deck?
node $D check sessions/session-06/slides.html      # does it RENDER?
node $D contact sessions/session-06/slides.html    # see all of it at once
```

**`/deck-review`** is the last gate: it measures contrast and type size in a
real browser, checks the components are used as intended, scores readability,
and matches the deck against every objective and pitfall in `course.json`.

Every mathematical claim on a slide must carry an executable check in a
`<script type="application/x-hs-check">` block, and every content slide must
carry `<div class="notes">`. **`/lecture-content`** owns that contract and the
assertion vocabulary — read it before writing the maths.

Then **read the PNGs**. `check` proves the maths rendered and nothing
overflows; only your eyes catch a slide that is technically valid and
pedagogically empty. Ask of each one: *could a student who missed this class
reconstruct the argument from this slide alone?*
