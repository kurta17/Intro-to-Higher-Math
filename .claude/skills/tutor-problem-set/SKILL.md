---
name: tutor-problem-set
description: Write homework, the midterm, or the final exam for Harbour.Space "Intro to Higher Math" (Math102BKK), with worked solutions and a marking rubric, as a branded A4 handout. Use when asked to create, draft, mark or review problem sets, assignments, quizzes, the midterm or the final exam for this course.
---

# Tutor: problem sets and exams

Homework is **60% of the grade** — more than both exams combined. That is
deliberate: proof is a skill, and skills are built by repetition. Treat every
problem set as the main teaching instrument, not as an afterthought to the
lecture.

Read `course/course.json` for the session's `objectives`, `pitfalls` and the
one-line `homework` brief. Read `sessions/session-01/problem-set.html` as the
reference implementation, and `brand/handout.css` for what's available.
Machinery lives in **`/run-intro-to-higher-math`**.

## The marking contract

Printed at the top of every handout, and it governs how you write questions:

> Every answer carries one sentence of justification. A correct value with no
> reasoning scores half. A wrong value with a clear, nearly-correct argument
> scores most of the marks. You may discuss problems with anyone and may use
> AI tools — but you must be able to explain every line you submit.

So: **never write a question whose full answer is a number.** Every item asks
for the number *and* the reason — name the law, state the hypothesis, say
which step is an equivalence, give the counterexample.

## Shape of a set

Aim at ~24 marks, 60–90 minutes of student work, three parts:

| Part | What it does |
|---|---|
| A · Mechanics | 3–4 short items on the session's computations. Each still demands a justification clause. |
| B · Reasoning | 3–4 items where the technique must be chosen, cases split, or a claim proved or disproved. |
| C · Communication | 1–2 items: rewrite a sloppy statement precisely, find the broken step in a wrong proof, or reflect in prose. Always include at least one. |

Difficulty runs strictly upward within a part, and Part A's first item should
be solvable by anyone who attended.

### Question types that work in this course

- **Prove or disprove**, technique named at the top of the solution.
- **Find the error** — hand them a plausible wrong argument (an AI-flavoured
  one is fair game) and ask which step fails and why.
- **State the hypothesis** — "this identity is false in general; add the
  condition that makes it true."
- **Two ways** — prove the same identity algebraically and combinatorially.
- **Rewrite precisely** — turn a sloppy sentence into a true one.
- **Reflection**, marked by rubric rather than answer key. Include a
  `<div class="space tall">` so there is room to write.

Avoid: anything answerable by pattern-matching, long computations that test
stamina, and questions that a solver can finish without ever writing a
sentence.

## Solutions and rubric

Write the full solution inline in a `.solution` block for **every** item,
including the reflective ones (there, the block holds the rubric, not an
answer). Add `<span class="marks-note">` saying where the marks sit —
"1 mark value, 1 mark for naming the laws". Two people mark this course;
the rubric is what keeps them consistent.

Solutions are hidden in the student PDF and revealed in the marker's PDF from
the same source file — there is only ever one file to keep in sync.

## Assessments

- **Session 8, midterm** — covers sessions 1–7 (sets, functions, function
  families, proof techniques, induction, counting). 10% of the grade.
- **Session 15, final** — the full syllabus, weighted toward proof. 20%.
- Exams use the same handout markup; add `<div class="space">` under each
  item and drop the collaboration sentence from the rubric strip.
- For the midterm and final, print a `table.marks-table` blueprint of
  topic × marks on the first page so students can budget time.

## Build it

```bash
D=.claude/skills/run-intro-to-higher-math/driver.mjs

node $D new 9                                                # scaffolds the handout
node $D pdf sessions/session-09/problem-set.html             # student copy
node $D pdf sessions/session-09/problem-set.html solutions   # marker's copy
```

Then **read both PDFs**. Check that no `.problem` splits across a page break
(they're set `break-inside: avoid`, but a long solution can still push one),
that the marks in the part headings add up to the total in the masthead, and
that every item really does demand a sentence.

## Gotchas

- `<!doctype html>` on line 1, or no maths renders at all.
- `<` inside maths must be `&lt;` — very common in inequality-heavy sets,
  which is most of them.
- Write solutions as you write questions. A question you cannot solve cleanly
  in the `.solution` block is a question that isn't ready.
