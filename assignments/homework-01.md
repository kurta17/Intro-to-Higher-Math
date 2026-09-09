# Homework 1 — Sessions 1 & 2

**Math102BKK · Harbour.Space Bangkok** · Set Tue 8 Sep 2026

*Markdown mirror of `assignments/homework-01.html`, which is the source of truth
(it also carries the worked solutions). Rebuild the PDFs with:*

```bash
D=.claude/skills/run-intro-to-higher-math/driver.mjs
node $D pdf assignments/homework-01.html             # student copy, no solutions
node $D pdf assignments/homework-01.html solutions   # marker's copy
```

---

## Part A · Session 1 — algebra, order and justification

### 1. Exponents

Simplify $\dfrac{16^{3/4} \cdot 2^{-3}}{8^{1/3}}$, naming the exponent law used at each step, and say which step would break if the base were negative.

### 2. Missing hypothesis

Each line below is wrong as written. For each, give a counterexample, then either add a hypothesis that makes it true or explain why no such repair exists.

a. $\sqrt{ab} = \sqrt{a}\,\sqrt{b}$
b. $\dfrac{1}{a+b} = \dfrac{1}{a} + \dfrac{1}{b}$

### 3. Absolute value

Write "$x$ is at least $5$ away from $-2$" as an absolute-value inequality and solve it, marking each step $\Longleftrightarrow$ or $\Longrightarrow$. Say in one sentence why the solution set is two rays rather than a single interval.

### 4. Completing the square

Write $2x^{2} - 12x + 23$ in the form $a(x-h)^{2} + k$ and read off its minimum value and where it occurs. Justify why no other $x$ gives a smaller value.

### 5. Rational inequality

Find all real $x$ with $\dfrac{2}{x-1} \le 1$. Handle the sign of $x - 1$ explicitly; do not multiply through by an expression whose sign you do not know.

### 6. Quadratic reasoning

Solve

$$2x^2 - 8x + 3 = 0$$

by completing the square. Do not use the quadratic formula.

a. Calculate the discriminant and state what it tells you about the number of real solutions.

b. Find the roots by completing the square, writing each line as an equivalence.

---

## Part B · Session 2 — sets, operations and double inclusion

### 7. $\in$ vs $\subseteq$

Let $C = \{\, 1,\ \{1\},\ \{1,2\},\ \varnothing \,\}$. Decide true or false, and in each case quote the definition that settles it: $1 \in C$, $\{1\} \subseteq C$, $\{1,2\} \subseteq C$, $\varnothing \subseteq C$.

### 8. Operations

Let $U = \{1,2,\dots,15\}$, $A = \{\, x \in U : x \text{ is a multiple of } 3 \,\}$ and $B = \{\, x \in U : x \text{ is odd} \,\}$. Write $A$ and $B$ in roster notation, compute $A \triangle B$ and $(A \cup B)^{c}$, then describe $(A \cup B)^{c}$ in plain English and name the law that turns "not (a multiple of $3$ or odd)" into a statement with "and" in it.

### 9. Power set

a. With $A = \{a,b\}$ and $B = \{b,c\}$, list $\mathcal{P}(A \cap B)$ and $\mathcal{P}(A) \cap \mathcal{P}(B)$ in full, and check they agree.

b. Prove that $\mathcal{P}(A \cap B) = \mathcal{P}(A) \cap \mathcal{P}(B)$ for *all* sets $A, B$, by double inclusion.

### 10. De Morgan

Let $A, B \subseteq U$. Prove that $(A \cap B)^{c} = A^{c} \cup B^{c}$, by double inclusion. The word **arbitrary** must appear in each direction.

### 11. Disprove, then repair

a. Disprove: $(A \cup B) \setminus B = A$ for all sets $A, B$. Name your sets, compute both sides, and point at an element that separates them.

b. State the extra condition on $A$ and $B$ that makes the identity true, and prove it under that condition.

### 12. Application · campus data

A campus card system records, for one week, which of the $200$ students used the gym and which used the library. Take $U$ to be the set of all $200$ students, $G \subseteq U$ those who used the gym and $L \subseteq U$ those who used the library. The logs give

$$|G| = 120, \qquad |L| = 95, \qquad |G \cap L| = 60.$$

a. The two sets cut $U$ into four regions. Name each one in set notation and give its size, explaining where each number comes from.

b. Every visit is logged as an ordered pair (student, facility), the facility drawn from $F = \{\text{gym}, \text{library}, \text{pool}\}$. How many such pairs are possible in principle? Name the theorem that gives the count, and say why the pairs must be ordered.
