---
name: lecture-content
description: Prepare and verify the mathematical content of a lecture for Harbour.Space "Intro to Higher Math" (Math102BKK) so that every claim on a slide is provably correct and explained for students. Use when writing, fact-checking, proofreading, reviewing or correcting the mathematics of a session, when asked to make sure slides are right, or before teaching or publishing a deck.
---

# Lecturer: correct content, explained

Two failure modes ruin a maths lecture, and they are different problems:

- **A slide is wrong.** An exponent slips, a solution set drops a case, an
  exercise has no answer. Students copy it into their notes and it surfaces
  in the exam.
- **A slide is right but teaches nothing.** A theorem with no proof, a
  definition with no instance, a wall of symbols nobody can parse at the back
  of the room.

Neither is fixed by reading carefully. The first is fixed by **executing**
every claim; the second by **structural rules** you can check. This skill is
both, plus the judgement the machine can't apply.

```bash
V=.claude/skills/lecture-content/verify.mjs

node $V sessions/session-01/slides.html            # both passes
node $V sessions/session-01/slides.html --math     # just the mathematics
node $V sessions/session-01/slides.html --explain  # just the pedagogy
node $V sessions/session-01/slides.html --strict   # warnings fail the run too
```

Exit 0 = every check passed. Rendering, screenshots and PDFs belong to
**`/run-intro-to-higher-math`**; slide structure and lesson design to
**`/tutor-session-deck`**. This skill owns *truth* and *explanation*.

## 1 · Every claim carries an executable check

Claims live in the deck next to the maths, inside a block the browser
ignores (it doesn't recognise the MIME type, so nothing renders and nothing
loads):

```html
<script type="application/x-hs-check">
  claim("8^(2/3)·2^(-1)/4^(1/2) = 1",
    () => Math.pow(8, 2/3) * Math.pow(2, -1) / Math.pow(4, 1/2), 1);
  identity("sqrt(x^2) = |x|", x => Math.sqrt(x*x), x => Math.abs(x));
  counterexample("sqrt(x^2) = x is false", x => Math.sqrt(x*x) === x, -3);
</script>
```

`verify.mjs` extracts each block and runs it against
`.claude/skills/lecture-content/checklib.mjs`. Nothing is symbolic: identities
are settled by randomised testing at hundreds of points, integers and counts
exactly with BigInt. For the polynomial, rational, modular and combinatorial
claims in this syllabus that is decisive — a false identity is found with a
concrete counterexample, which is exactly what you want to see:

```
FAIL  log(a+b) = log a + log b   — at (1.6831186, 5.1763664): 1.9256324 ≠ 2.1647518
FAIL  gcd(1071,462) = 20         — got 21, expected 20
```

Runs are seeded, so a failure reproduces. `--seed N` to vary it.

### The vocabulary

| Assertion | Use it for |
|---|---|
| `claim(label, fn, expected?)` | one concrete computation; `fn` returns a value or `true` |
| `identity(label, f, g, opts)` | two expressions agree everywhere — random points |
| `equivalent(label, p, q, opts)` | **a solution set**: predicate ⟺ your claimed answer |
| `setIdentity(label, f, g, opts)` | a set identity, over random subsets of a universe |
| `forallInt(label, pred, opts)` | a statement over integers, checked exhaustively on a range |
| `counterexample(label, pred, witness)` | a claim that is meant to be **false**, and the witness you show |
| `counts(label, formula, bruteForce)` | a counting formula against brute-force enumeration |

`opts`: `{ n, lo, hi, arity, domain: 'real'|'int', avoid: [0], universe }`.

Helpers in scope: `gcd lcm egcd mod modpow modinv isPrime primeFactors`,
`fact C P`, `dot norm angle`, `cx cadd csub cmul cabs carg cpow ceq`,
`S union inter diff symdiff subset seteq`, `eq`.

### What to check, session by session

- **Sets** — `setIdentity` over a 6-element universe settles De Morgan,
  distributivity and every identity students prove by double inclusion.
- **Functions** — `identity` for compositions; `forallInt` to confirm an
  injectivity claim has no small counterexample.
- **Function families** — growth comparisons as `forallInt` past the
  crossover point; log laws as `identity` with `lo: 0.2` to stay in domain.
- **Proof techniques** — every "disprove" example gets a `counterexample`
  with the exact witness the slide shows.
- **Induction** — `forallInt(…, { lo: 1, hi: 500 })` on the closed form.
  This does not prove the theorem; it proves the *statement you wrote down*
  is the one that's true, which is where the errors actually are.
- **Combinatorics** — `counts`: formula vs enumeration. Catches every
  order/repetition mix-up.
- **GCD, modular** — exact integer helpers; verify Bézout coefficients
  really satisfy `ax + by = g`.
- **Vectors** — `dot`, `norm`, `angle`; check projections decompose.
- **Polynomials** — evaluate claimed roots and confirm they are zero;
  `identity` for a claimed factorisation.
- **Complex** — `cpow`/`ceq`; verify all n roots, not just the principal one.

### Rules

- Write raw `<` and `>` inside a check block. Inside `<script>` the HTML
  parser does not decode entities, so `&lt;` reaches JavaScript literally and
  the block fails to parse. (`verify.mjs` decodes them anyway, but don't.)
- **Check the exercises too.** Every `.box.try` problem gets an `equivalent`
  or `identity` for the answer you expect. A problem you cannot state an
  answer for is a problem that isn't ready for the room.
- Label each assertion with the claim **as the slide states it**. The label is
  what a reader sees; make it match the slide word for word.

## 2 · Explained, not just true

`--explain` enforces the structural half. Each rule exists because its
absence produces a specific bad lecture:

| Rule | Fires when |
|---|---|
| `unverified` | a slide makes a mathematical claim with no check block |
| `unproved` | a theorem with no proof, no `data-proof="…"`, no deferral in the text |
| `abstract` | a definition with no example within the next two slides |
| `density` | a content slide over 120 visible words |
| `notes` | a content slide with no `<div class="notes">` |
| `unlabelled` | a callout box with no `<span class="tag">` |
| `structure` | a content slide with no `<h2>`; a deck with no title slide |
| `practice` | a deck with no `.box.try` — students never work anything |

`data-proof` is the honest escape hatch when the proof happens live:

```html
<div class="box thm" data-proof="board: complete the square on ax^2+bx+c=0">
```

Speaker notes are not optional. Two people teach this course; a deck with no
`<div class="notes">` cannot be picked up by the other one.

## 3 · What the machine cannot check

Run these by hand, on the screenshots, before you teach:

1. **Is every symbol introduced before it is used?** The commonest reason a
   student loses the thread is a letter that appeared without being named.
2. **Does the example come before the abstraction?** For this cohort —
   strong at computation, new to proof — a concrete instance first, then the
   general statement, works far better than the reverse.
3. **Is the hypothesis visible?** Every rule they memorised at school has
   one. Naming it is the course's whole thesis.
4. **Could a student who missed the class reconstruct the argument from this
   slide alone?** If not, the missing step belongs on the slide or in the notes.
5. **Is there one idea per slide?** Two ideas means two slides.
6. **Would this survive an AI?** Students may use AI tools and must explain
   every line. Prefer "which step is illegal and why" over "compute this".

## Workflow

```bash
D=.claude/skills/run-intro-to-higher-math/driver.mjs
V=.claude/skills/lecture-content/verify.mjs

node $D new 9                       # scaffold from the template
# … write the slides, with a check block on every claim …
node $V sessions/session-09/slides.html --strict    # true and explained
node $D check sessions/session-09/slides.html       # renders, nothing overflows
node $D shot  sessions/session-09/slides.html all   # then READ the PNGs
```

Both gates must pass before a deck is taught. `verify` says the mathematics
is right; `check` says it is on the screen; your eyes say it teaches.

## Gotchas

- **A slide with no check block is not a correct slide, it is an unchecked
  one.** `--explain` lists exactly which ones.
- `identity` treats "both sides undefined" as agreement (e.g. both `NaN`).
  If a domain boundary is the point of the slide, assert it with `claim`.
- Floating point: comparisons use a relative tolerance of `1e-9`. For claims
  that must be exact, use the BigInt helpers (`C`, `fact`, `P`) or integers.
- Randomised testing can miss a measure-zero counterexample. Where a claim
  hinges on one special value (`x = 0`, `n = 1`, the empty set), assert that
  case explicitly with `claim` in addition to the sampled `identity`.
- The verifier strips HTML comments before splitting on `<section>` — a
  template that *documents* `<section class="slide">` used to be counted as a
  slide.
