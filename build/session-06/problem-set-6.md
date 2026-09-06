# Homework 6 — Mathematical induction

**Math102BKK · Harbour.Space Bangkok**

**Session 6 · Set:** Monday 14 September 2026

**Due:** Tuesday 15 September 2026, at the start of class
**Time guide:** 60–90 minutes · **Total:** 24 marks

## How to answer

Every answer needs a reason. A correct final formula without a proof earns only part of the marks.

**Notation:** $d\mid N$ means that $N=dq$ for some integer $q$. In words, “$d$ divides $N$” means that $N$ is a multiple of $d$.

For each induction proof, make these parts easy to find:

1. the statement $P(n)$ and its starting value;
2. the base case;
3. the inductive hypothesis for an arbitrary allowed integer $k$;
4. the inductive step from $P(k)$ to $P(k+1)$;
5. the conclusion by induction.

You may discuss the questions and use AI tools, but you must be able to explain every line you submit.

---

## Part A · Start with the structure — 6 marks

### 1. Name the three main parts — 2 marks

For the claim

$$1+2+\cdots+n=\frac{n(n+1)}2 \qquad (n\geq1),$$

write:

1. the base-case statement $P(1)$;
2. the inductive hypothesis $P(k)$;
3. the exact statement $P(k+1)$ that you must prove.

Do not prove the claim in this question. Write the three statements clearly.

### 2. Sum of odd numbers — 2 marks

Prove by induction that, for every integer $n\geq1$,

$$1+3+5+\cdots+(2n-1)=n^2.$$

In your inductive step, explain why the next term is $2k+1$.

### 3. An exponential inequality — 2 marks

Prove by induction that, for every integer $n\geq0$,

$$2^n\geq n+1.$$

In the inductive step, state why $2(k+1)\geq k+2$.

---

## Part B · Write complete proofs — 14 marks

### 4. Divisibility with an exponential — 3 marks

Prove by induction that, for every integer $n\geq1$,

$$5\mid(6^n-1).$$

Write the inductive hypothesis in the form $6^k-1=5m$ for some integer $m$. In the next case, end with $5$ times an integer.

### 5. Sum of squares — 3 marks

Prove by induction that, for every integer $n\geq1$,

$$1^2+2^2+\cdots+n^2=\frac{n(n+1)(2n+1)}6.$$

In the inductive step, factor out $k+1$ before simplifying.

### 6. A polynomial is always divisible by $3$ — 3 marks

Prove by induction that, for every integer $n\geq1$,

$$3\mid(n^3-n).$$

Write the inductive hypothesis in the form $k^3-k=3m$ for some integer $m$.

### 7. Strong induction — postage using $4$ and $5$ — 5 marks

Prove by **strong induction** that every integer $n\geq12$ can be written as

$$n=4a+5b$$

for non-negative integers $a$ and $b$.

Here, non-negative means $0,1,2,\ldots$.

1. Show the four base cases $n=12,13,14,15$.
2. For the step, let $k\geq15$ and assume that every integer from $12$ to $k$ has this form.
3. Use the earlier number $k-3$ to prove the result for $k+1$.

State why the strong hypothesis includes $k-3$.

---

## Part C · Read a proof critically — 4 marks

### 8. The “all horses have the same colour” error — 4 marks

Someone tries to prove the false claim below by induction.

> **Claim $P(n)$:** Every group of $n$ horses has horses of only one colour.

**Base case:** A group of one horse has only one colour.

**Inductive step:** Assume $P(k)$. Take a group of $k+1$ horses. The first $k$ horses have one colour by $P(k)$. The last $k$ horses also have one colour by $P(k)$. These two groups share $k-1$ horses, so all $k+1$ horses have the same colour.

Answer all three questions.

1. Which value of $k$ makes the inductive step fail?
2. Why does the “shared horses” sentence fail at this value?
3. Explain why adding more base cases cannot prove the original claim.

---

# Instructor solution and marking guide

## Marking principles

Award method marks when the proof structure is clear, even if a later algebra line contains a small error. Do not award the conclusion mark when the base case, the inductive step, or the stated range is missing.

## Part A solutions — 6 marks

### 1. Name the three main parts — 2 marks

$$\begin{aligned}
P(1):&\quad 1=\frac{1(1+1)}2.\\
P(k):&\quad 1+2+\cdots+k=\frac{k(k+1)}2 \quad\text{for some }k\geq1.\\
P(k+1):&\quad 1+2+\cdots+k+(k+1)=\frac{(k+1)(k+2)}2.
\end{aligned}$$

**Marks:** 0.5 for a correct base case, 0.75 for a correct hypothesis with $k\geq1$, and 0.75 for the exact next statement.

### 2. Sum of odd numbers — 2 marks

Let $P(n)$ be

$$1+3+5+\cdots+(2n-1)=n^2.$$

**Base case:** for $n=1$, the left side is $1$ and the right side is $1^2=1$.

**Inductive hypothesis:** let $k\geq1$ and assume

$$1+3+\cdots+(2k-1)=k^2.$$

The next term is $2(k+1)-1=2k+1$. Therefore

$$\begin{aligned}
1+3+\cdots+(2k-1)+(2k+1)
&=k^2+2k+1\\
&=(k+1)^2.
\end{aligned}$$

This proves $P(k+1)$. By induction, $P(n)$ is true for every integer $n\geq1$. $\square$

**Marks:** 0.5 base case, 0.5 valid hypothesis, 0.75 valid step using the hypothesis, 0.25 conclusion.

### 3. An exponential inequality — 2 marks

Let $P(n)$ be $2^n\geq n+1$ for $n\geq0$.

**Base case:** $2^0=1\geq0+1$.

**Inductive hypothesis:** let $k\geq0$ and assume $2^k\geq k+1$. Then

$$2^{k+1}=2\cdot2^k\geq2(k+1).$$

Because $k\geq0$, we have $2(k+1)=2k+2\geq k+2$. Thus $2^{k+1}\geq k+2$, which is $P(k+1)$.

By induction, $2^n\geq n+1$ for every integer $n\geq0$. $\square$

**Marks:** 0.5 base case, 0.5 valid hypothesis, 0.75 correct inequalities in the step, 0.25 conclusion.

## Part B solutions — 14 marks

### 4. Divisibility with an exponential — 3 marks

Let $P(n)$ be $5\mid(6^n-1)$ for $n\geq1$.

**Base case:** $6^1-1=5=5\cdot1$, so $P(1)$ is true.

**Inductive hypothesis:** let $k\geq1$ and assume $6^k-1=5m$ for some integer $m$. Then

$$\begin{aligned}
6^{k+1}-1
&=6\cdot6^k-1\\
&=6(6^k-1)+5\\
&=6(5m)+5\\
&=5(6m+1).
\end{aligned}$$

Since $6m+1$ is an integer, $5\mid(6^{k+1}-1)$. By induction, $5\mid(6^n-1)$ for every integer $n\geq1$. $\square$

**Marks:** 0.5 base case, 0.75 valid hypothesis, 1.25 step in the form $5\times(\text{integer})$, 0.5 conclusion.

### 5. Sum of squares — 3 marks

Let $P(n)$ be

$$1^2+2^2+\cdots+n^2=\frac{n(n+1)(2n+1)}6$$

for $n\geq1$.

**Base case:**

$$1^2=1=\frac{1\cdot2\cdot3}{6}.$$

**Inductive hypothesis:** let $k\geq1$ and assume

$$1^2+2^2+\cdots+k^2=\frac{k(k+1)(2k+1)}6.$$

Then

$$\begin{aligned}
1^2+\cdots+k^2+(k+1)^2
&=\frac{k(k+1)(2k+1)}6+(k+1)^2\\
&=\frac{(k+1)\bigl(k(2k+1)+6(k+1)\bigr)}6\\
&=\frac{(k+1)(2k^2+7k+6)}6\\
&=\frac{(k+1)(k+2)(2k+3)}6.
\end{aligned}$$

This is the formula with $n=k+1$. By induction, $P(n)$ is true for every integer $n\geq1$. $\square$

**Marks:** 0.5 base case, 0.75 valid hypothesis, 1.25 correct algebra in the step, 0.5 conclusion.

### 6. A polynomial is always divisible by $3$ — 3 marks

Let $P(n)$ be $3\mid(n^3-n)$ for $n\geq1$.

**Base case:** $1^3-1=0=3\cdot0$.

**Inductive hypothesis:** let $k\geq1$ and assume $k^3-k=3m$ for some integer $m$. Then

$$\begin{aligned}
(k+1)^3-(k+1)
&=(k^3-k)+3k(k+1)\\
&=3m+3k(k+1)\\
&=3\bigl(m+k(k+1)\bigr).
\end{aligned}$$

The number in brackets is an integer. Thus $3\mid((k+1)^3-(k+1))$. By induction, $3\mid(n^3-n)$ for every integer $n\geq1$. $\square$

**Marks:** 0.5 base case, 0.75 valid hypothesis, 1.25 correct use of the hypothesis, 0.5 conclusion.

### 7. Strong induction — postage using $4$ and $5$ — 5 marks

Let $P(n)$ mean that $n=4a+5b$ for some non-negative integers $a,b$.

**Base cases:**

$$12=3\cdot4,\qquad13=2\cdot4+5,\qquad14=4+2\cdot5,\qquad15=3\cdot5.$$

**Strong inductive hypothesis:** let $k\geq15$ and assume that $P(m)$ is true for every integer $m$ with $12\leq m\leq k$.

Since $k\geq15$,

$$12\leq k-3\leq k.$$

So the hypothesis applies to $k-3$. Write $k-3=4a+5b$ for some non-negative integers $a,b$. Then

$$k+1=(k-3)+4=4(a+1)+5b.$$

The integers $a+1$ and $b$ are non-negative. Thus $P(k+1)$ is true. By strong induction, every integer $n\geq12$ has the required form. $\square$

**Marks:** 1.5 all four base cases, 1 correct strong hypothesis and range, 1 correct use of $12\leq k-3\leq k$, 1 correct next-case algebra, 0.5 conclusion.

## Part C solution — 4 marks

### 8. The “all horses have the same colour” error — 4 marks

1. The step fails at $k=1$.
2. At $k=1$, the first group of $k$ horses and the last group of $k$ horses share $k-1=0$ horses. There is no shared horse that links the colours of the two one-horse groups.
3. More base cases cannot prove the original claim, because the claim itself is false: a group of two horses can contain horses of different colours. The step from $k=1$ to $k=2$ must be valid, and it is not.

**Marks:** 1 correct value $k=1$, 2 clear explanation that the overlap is empty, 1 explains both why extra bases do not repair the false claim and why the step must cover $k=1$.

---

## Marks summary

| Part | Questions | Marks |
|---|---:|---:|
| A · Start with the structure | 1–3 | 6 |
| B · Write complete proofs | 4–7 | 14 |
| C · Read a proof critically | 8 | 4 |
| **Total** |  | **24** |

## Self-check before submitting

- Did I write the correct starting value for every proof?
- Did I state an inductive hypothesis for one allowed integer $k$?
- Did I use that hypothesis in the step?
- Did I prove the exact next statement, $P(k+1)$?
- Did I write a conclusion that gives the correct range of $n$?
