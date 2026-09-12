# Homework 2 — Sessions 3, 4 & 5

**Math102BKK · Harbour.Space Bangkok** · Set Fri 11 Sep 2026

*Markdown mirror of `assignments/homework-02.html`, which is the source of truth
(it also carries the worked solutions). Rebuild the PDFs with:*

```bash
D=.claude/skills/run-intro-to-higher-math/driver.mjs
node $D pdf assignments/homework-02.html             # student copy, no solutions
node $D pdf assignments/homework-02.html solutions   # marker's copy
```

---

## Part A · Session 3 — functions, composition and the unit circle

### 1. Image and preimage

Let $f : \mathbb{R} \to \mathbb{R}$ be given by $f(x) = x^{2} - 6x + 5$.

a. Find the image of $f$ and prove your answer. State clearly which part of the argument shows the image is contained in your set, and which shows every element of your set is attained.

b. Compute $f^{-1}(\{0\})$ and $f^{-1}(\{-5\})$. Explain in one sentence what the second answer says about the relationship between the image and the codomain.

### 2. Restriction and inverse

Keep $f(x) = x^{2} - 6x + 5$.

a. Show that $f : \mathbb{R} \to \mathbb{R}$ is not injective, with an explicit witness.

b. Choose a domain $D$ and codomain $C$ making $f : D \to C$ a bijection, and prove *both* halves.

c. Write down the inverse function explicitly, and verify one composite.

### 3. Composition

Let $g(x) = 2x - 1$ and $h(x) = x^{2} + 1$, both from $\mathbb{R}$ to $\mathbb{R}$.

a. Compute $h \circ g$ and $g \circ h$ as explicit formulas, and give a value of $x$ at which they differ. What does this show about composition?

b. Prove that $g$ is a bijection and find $g^{-1}$.

c. Prove or disprove: $h \circ g$ is injective on $\mathbb{R}$.

### 4. Unit circle

Derive each value from the unit circle. For each, state the quadrant and the reference angle before giving the number; a recalled value with no working is not a derivation.

a. $\cos\dfrac{5\pi}{6}$
b. $\sin\dfrac{7\pi}{4}$
c. $\tan\dfrac{2\pi}{3}$
d. $\cos\dfrac{11\pi}{6}$

Then explain, in one sentence each, why $\sin$ is not injective on $\mathbb{R}$ and what restriction of its domain makes it so.

### 5. Classification

For each function, decide whether it is injective, surjective, both, or neither. Prove every positive claim; disprove every negative one with an explicit witness.

a. $f : \mathbb{Z} \to \mathbb{Z}$, $f(n) = 3n - 7$
b. $f : \mathbb{R} \to \mathbb{R}$, $f(x) = x^{3} + x$
c. $f : \mathbb{R}\setminus\{2\} \to \mathbb{R}\setminus\{1\}$, $f(x) = \dfrac{x+3}{x-2}$

---

## Part B · Session 4 — polynomials, exponentials, logarithms and models

### 6. Polynomial structure

Let $p(x) = 2x^{3} - 3x^{2} - 11x + 6$.

a. State the degree and leading coefficient, and describe the end behaviour with a reason.

b. Given that $x = 3$ is a root, factor $p$ completely over $\mathbb{R}$ and list all roots.

c. Sketch the graph, marking every $x$-intercept and the $y$-intercept.

### 7. Exponential equation

Solve over the reals:

$$3^{2x} - 12\cdot 3^{x} + 27 = 0.$$

Justify the substitution you use, and say why *both* resulting values must be checked before you convert back.

### 8. Logarithmic equation

Solve exactly for $x$:

$$\log_3(x+6) - \log_3(x-2) = 2.$$

State the domain restriction *before* you combine the logarithms, and check your answer in the original equation.

### 9. Change of base

a. Compute $\log_8 32$ and $\log_9 27$ exactly, showing the change-of-base step.

b. Prove that $\log_a b \cdot \log_b a = 1$ for all valid bases $a, b$, and state exactly which conditions on $a$ and $b$ the proof needs.

### 10. Growth comparison

Consider $2^{n}$ and $n^{3}$ for positive integers $n$.

a. Find the smallest $n_0$ such that $2^{n} > n^{3}$ for every $n \geq n_0$. Give the two computations either side of the crossover, then give a short argument that the inequality continues to hold for every later $n$.

b. Explain why checking a handful of values does not establish the claim for all $n \geq n_0$, and name the proof technique that would.

### 11. Application · periodic model

Bangkok's temperature over one day is modelled by

$$T(t) = 8\sin\!\left(\frac{\pi(t-9)}{12}\right) + 22,$$

with $T$ in °C and $t$ the hour, $0 \leq t \leq 24$.

a. State the amplitude, midline and period, showing how you get the period from the coefficient.

b. Give the maximum and minimum temperatures and the times at which they occur.

c. The model has period $24$ hours. What does that say about $T(0)$ and $T(24)$, and is that physically reasonable?

---

## Part C · Session 5 — proof techniques

### 12. Contrapositive

Prove that for every integer $n$, if $n^{3}$ is odd then $n$ is odd.

a. State the contrapositive of the claim.

b. Prove the contrapositive, and say in one sentence why proving it settles the original.

c. Would a direct proof have been harder? Say why.

### 13. Contradiction

Prove that $\sqrt{3}$ is irrational.

a. Write out the proof by contradiction in full.

b. Your argument will use the fact that if $3 \mid a^{2}$ then $3 \mid a$. State where you used it, and why the analogous step would fail if $3$ were replaced by $4$.

### 14. Counterexample

Consider the claim: *for every non-negative integer $n$, the value $n^{2} - n + 41$ is prime.*

a. Verify the claim for $n = 0, 1, 2$ and $3$.

b. The claim is nevertheless false. Find a counterexample and show it fails.

c. In two or three sentences, say what this example shows about the relationship between evidence and proof.

### 15. Quantifiers and WLOG

a. Write the negation of each statement, in words, without using the phrase "it is not the case that":

   i. for every real $x$, there exists an integer $n$ with $n > x$;
   ii. there exists a real $x$ such that for every real $y$, $xy = y$.

b. Prove: for all real $a, b$, equality holds in $|a+b| \leq |a| + |b|$ if and only if $ab \geq 0$. You may use "without loss of generality" — if you do, name the symmetry that licenses it.
