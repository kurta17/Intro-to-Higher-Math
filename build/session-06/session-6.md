# Session 6 — Mathematical induction

**Math102BKK · Session 6 of 15**

**Topics:** ordinary induction, strong induction, sums, divisibility, and common errors.

**Goal:** prove a statement for infinitely many whole numbers with one careful argument.

---

## Slide 1 — Session 6

### Mathematical induction

**Base case · inductive hypothesis · inductive step · strong induction**

**Math102BKK · Session 6 of 15**

Today’s goal: prove a claim for every whole number from a starting value onward, without checking the numbers one by one.

### Presenter notes

Say that induction is a proof method, not a shortcut for guessing formulas. Students will use the proof language from Session 5, especially the idea of starting from an explicit assumption.

---

## Slide 2 — Course outline

| | |
|---|---|
| 1 · Course overview and school-maths refresher | 2 · Sets and set operations |
| 3 · Functions | 4 · Function families |
| 5 · Theorem proving | **6 · Mathematical induction** |
| 7 · Elementary combinatorics and binomial theorem | 8 · Midterm |
| 9 · GCD and divisibility | 10 · Modular arithmetic |
| 11 · Vectors | 12 · Polynomials |
| 13 · Complex numbers | 14 · Course recap and exam preparation |
| 15 · Final exam | |

**Today:** ordinary induction, strong induction, and how to spot a broken induction proof.

### Presenter notes

Connect backward: Session 5 gave several ways to prove one claim. Induction is the method for a sequence of claims indexed by integers. Connect forward: counting formulas in Session 7 are often proved by induction.

---

## Slide 3 — Yesterday’s proof methods, today’s new question

In Session 5, we learned how to prove one claim or disprove it with a counterexample.

Today, suppose we want to prove a statement for

$$n=1,2,3,4,\ldots$$

How can we prove all of these infinitely many cases without writing infinitely many separate proofs?

### Presenter notes

Ask for examples of statements that depend on a whole number $n$: a sum of the first $n$ numbers, or a divisibility claim for every $n$. Do not introduce the formal induction principle until students feel the problem it solves.

---

## Slide 4 — By the end of today, you can…

- state the induction principle and name its three parts;
- prove a formula about a sum by induction;
- prove a claim about multiples by induction;
- use strong induction when one earlier case is not enough;
- find the first wrong line in a failed induction proof.

**Success:** the base case, the assumption, and the next case are all visible.

### Presenter notes

The phrase “all visible” is deliberate. Students often write correct algebra but hide the logical structure that makes it an induction proof.

---

## Slide 5 — A pattern suggests a formula; it does not prove it

Consider the claim

$$1+2+\cdots+n=\frac{n(n+1)}2.$$

| $n$ | Left side | Right side |
|---:|---:|---:|
| $1$ | $1$ | $1$ |
| $2$ | $3$ | $3$ |
| $3$ | $6$ | $6$ |
| $4$ | $10$ | $10$ |

The examples make the formula believable. They do **not** prove it for every positive integer $n$.

### Presenter notes

Ask what might happen at $n=100$. The point is not that the formula is doubtful; it is that four checks cannot cover an infinite set of inputs.

---

## Slide 6 — The domino picture

Imagine an endless line of dominoes numbered $1,2,3,\ldots$.

1. Show that domino $1$ falls.
2. Show that whenever domino $k$ falls, domino $k+1$ also falls.

Then every domino falls.

In induction, “domino $n$ falls” becomes “the statement $P(n)$ is true.”

**The dominoes are only an analogy.** A mathematical proof must still show the base case and the step from $k$ to $k+1$.

### Presenter notes

Use the analogy only to make the chain visible. Emphasise that the second condition must work for every allowed integer $k$, not for one chosen example.

---

## Slide 7 — The principle of mathematical induction

Let $P(n)$ mean a statement about an integer $n$, starting at a whole number $n_0$.

1. **Base case:** show that $P(n_0)$ is true.
2. **Inductive step:** take any integer $k\geq n_0$. Assume $P(k)$ is true. Use this to show that $P(k+1)$ is true.
3. **Conclusion:** $P(n)$ is true for every integer $n\geq n_0$.

This is the induction rule. It is a basic property of the whole numbers.

### Presenter notes

Read the symbols slowly. The base number $n_0$ is not always $1$; later slides use $2$ and $12$. This is a proof principle, not a formula to substitute into.

---

## Slide 8 — First name the statement $P(n)$

We will prove, for every integer $n\geq1$,

$$1+2+\cdots+n=\frac{n(n+1)}2.$$

Let $P(n)$ mean this exact statement.

For example, $P(4)$ means

$$1+2+3+4=\frac{4(4+1)}2.$$

The label $P(n)$ tells us exactly what we assume and exactly what we must prove next.

### Presenter notes

Ask students to calculate both sides of $P(4)$. Stress that $P(n)$ is a label for a complete sentence, not a number or an algebraic expression.

---

## Slide 9 — Base case: start at the stated first value

For the sum formula, the claim starts at $n=1$.

$$P(1):\qquad 1=\frac{1(1+1)}2=1.$$

So $P(1)$ is true.

This starts the chain. A correct calculation at $n=2$ would not replace the required base case at $n=1$.

### Presenter notes

Point to $n_0=1$ on Slide 7. This slide addresses a frequent error: checking a convenient value instead of the first value named in the claim.

---

## Slide 10 — Inductive hypothesis: one temporary assumption

Let $k\geq1$ be **any** integer. Assume that $P(k)$ is true:

$$1+2+\cdots+k=\frac{k(k+1)}2.$$

This is the **inductive hypothesis**.

We may use it in this step to prove $P(k+1)$. We are **not** assuming the formula is already true for every $n$.

### Presenter notes

Make the distinction explicit: “Assume $P(k)$ for an arbitrary $k$” is allowed inside the inductive step. “Assume the formula for all $n$” would assume the conclusion before proving it.

---

## Slide 11 — Inductive step: use the hypothesis once

Starting with the left side of $P(k+1)$,

$$\begin{aligned}
1+2+\cdots+k+(k+1)
&=\frac{k(k+1)}2+(k+1) &&\text{by }P(k)\\
&=\frac{(k+1)(k+2)}2.
\end{aligned}$$

This is exactly the right side of $P(k+1)$. Therefore $P(k)\Rightarrow P(k+1)$.

### Presenter notes

Circle the line marked “by $P(k)$.” It is the line that makes this an induction proof. Without it, students have not used their temporary assumption.

---

## Slide 12 — Finish the proof with the induction principle

We have shown:

- $P(1)$ is true.
- For every integer $k\geq1$, $P(k)\Rightarrow P(k+1)$.

Therefore, by mathematical induction,

$$1+2+\cdots+n=\frac{n(n+1)}2$$

for every integer $n\geq1$. $\square$

### Presenter notes

This conclusion is where the infinite claim enters. The algebra in the step proves only a link; the induction principle turns the base and all links into a statement about every $n\geq1$.

---

## Slide 13 — Activity 1 · Build an induction proof

**Pairs · 12 minutes**

Prove, for every integer $n\geq1$,

$$1+3+5+\cdots+(2n-1)=n^2.$$

1. Write $P(n)$ in words or symbols.
2. Check the base case.
3. State the inductive hypothesis.
4. Add the next odd number and prove $P(k+1)$.

**Share:** point to the line where the inductive hypothesis is used.

### Presenter notes

Pairs should leave space between the hypothesis and the calculation. The next odd number after $2k-1$ is $2k+1$; this is the key detail to watch for.

---

## Slide 14 — Activity 1 · A complete walkthrough

Let $P(n)$ be the displayed statement.

- **Base case:** $P(1)$ says $1=1^2$, which is true.
- **Hypothesis:** assume $1+3+\cdots+(2k-1)=k^2$ for some $k\geq1$.
- **Step:**

$$\begin{aligned}
1+3+\cdots+(2k-1)+(2k+1)
&=k^2+2k+1\\
&=(k+1)^2.
\end{aligned}$$

So $P(k+1)$ is true. Induction proves $P(n)$ for every $n\geq1$. $\square$

### Presenter notes

Reveal this after the share. Ask why $2k+1$ appears: replacing $n$ by $k+1$ in $2n-1$ gives $2(k+1)-1=2k+1$.

---

## Slide 15 — Section 2

### Induction can prove more than sum formulas

The same structure works for multiples and for statements that need an earlier case other than $P(k)$.

Next, we will prove a divisibility statement, then learn **strong induction**.

### Presenter notes

Take the scheduled break before this section. On return, remind students that the base, hypothesis, and next case remain the same; only the algebra changes.

---

## Slide 16 — Divisibility: make the required multiple appear

**Claim.** For every integer $n\geq1$, $n^3-n$ is a multiple of $3$.

“A multiple of $3$” means “$3$ times an integer.”

**Base case:**

$$1^3-1=0=3\cdot0.$$

So the claim is true when $n=1$.

### Presenter notes

Say that $0$ is a multiple of every integer: $0=3\cdot0$. The target form in the inductive step will be $3\times(\text{an integer})$.

---

## Slide 17 — Divisibility: the inductive step

Take any integer $k\geq1$. Assume the claim is true for $k$. Then $k^3-k=3m$ for some integer $m$. Therefore

$$\begin{aligned}
(k+1)^3-(k+1)
&=(k^3-k)+3k(k+1)\\
&=3m+3k(k+1)\\
&=3\bigl(m+k(k+1)\bigr).
\end{aligned}$$

The number in brackets is an integer. So the claim is true for $k+1$. By induction, $3$ divides $n^3-n$ for every $n\geq1$. $\square$

### Presenter notes

Students may need to expand $(k+1)^3-(k+1)$ on the board first. State that the first line is an algebra identity; the second line uses the inductive hypothesis.

---

## Slide 18 — Activity 2 · Find the first wrong line

**Groups of three · 10 minutes**

Someone claims that, for every $n\geq1$,

$$1+2+\cdots+n=n^2.$$

Their base case $n=1$ is correct. They assume the claim for $k$ and then write

$$1+2+\cdots+k+(k+1)=k^2+(k+1)=(k+1)^2.$$

1. Find the first false equality.
2. Explain why the base case does not save the proof.
3. State the correct formula for $1+2+\cdots+n$.

**Share:** explain the error in one complete sentence.

### Presenter notes

Ask groups to test the false equality with $k=1$. The activity teaches that an induction proof can look structurally correct but still fail through one algebra mistake.

---

## Slide 19 — Activity 2 · Diagnose and repair

The first false equality is

$$k^2+k+1=(k+1)^2.$$

But

$$ (k+1)^2=k^2+2k+1,$$

so the two expressions differ by $k$.

The claimed formula is already false at $n=2$:

$$1+2=3\ne4=2^2.$$

The correct formula is

$$1+2+\cdots+n=\frac{n(n+1)}2.$$

### Presenter notes

Make a sharp distinction: a base case shows only one case. Both the statement and every algebraic line in the step must be correct.

---

## Slide 20 — Strong induction: use all earlier cases when needed

Ordinary induction assumes $P(k)$ to prove $P(k+1)$.

**Strong induction** assumes the statement is true for every integer from $n_0$ to $k$:

$$P(n_0),P(n_0+1),\ldots,P(k)$$

to prove $P(k+1)$.

The conclusion is the same: $P(n)$ is true for every $n\geq n_0$.

Use strong induction when the next case needs an earlier result, such as $P(k-3)$, not only $P(k)$.

### Presenter notes

“Strong” does not mean the conclusion is stronger. It gives more information in the inductive hypothesis. The next two slides show why a factorisation proof needs it.

---

## Slide 21 — Prime factorisation: the statement and its words

A positive integer greater than $1$ is **prime** if its only positive factors are $1$ and itself.

It is **composite** if it can be written as

$$n=ab \qquad\text{with}\qquad 1<a,b<n.$$

**Claim.** Every integer $n\geq2$ is a product of prime numbers. A prime number itself counts as a product with one factor.

### Presenter notes

Give examples: $13$ is prime, while $12=3\cdot4$ is composite. “A product of prime numbers” may have one factor, so the prime number $2$ is itself a product consisting of one prime.

---

## Slide 22 — Strong-induction proof · prime factorisation

**Base case:** $2$ is prime, so it is a product with one prime factor.

Take any integer $k\geq2$. Assume every integer from $2$ to $k$ is a product of primes. Consider $k+1$.

- If $k+1$ is prime, we are done.
- If $k+1$ is composite, write $k+1=ab$ with $2\leq a,b\leq k$.

By the hypothesis, both $a$ and $b$ are products of primes. Therefore $ab=k+1$ is a product of primes.

Strong induction proves the claim for every integer $n\geq2$. $\square$

### Presenter notes

Ask why $a,b\leq k$: since both are greater than $1$ and their product is $k+1$, neither can equal $k+1$. This is exactly where the full hypothesis, not merely $P(k)$, is used.

---

## Slide 23 — Activity 3 · When strong induction is useful

**Pairs · 14 minutes**

Prove that every integer $n\geq12$ can be written as

$$n=4a+5b$$

for non-negative integers $a$ and $b$.

Here, non-negative means $0,1,2,\ldots$.

1. Check the four base cases $12,13,14,15$.
2. State a strong inductive hypothesis.
3. For $k\geq15$, make $k+1$ by adding $4$ to the earlier amount $k-3$.

**Share:** explain why knowing only $P(k)$ does not help with $k-3$.

### Presenter notes

Clarify that non-negative means $0,1,2,\ldots$. Students should write each base case as a sum of fours and fives before moving to the general step.

---

## Slide 24 — Activity 3 · A strong-induction walkthrough

The four base cases are

$$12=3\cdot4,\quad13=2\cdot4+5,\quad14=4+2\cdot5,\quad15=3\cdot5.$$

Take any integer $k\geq15$. Assume every integer from $12$ to $k$ has the form $4a+5b$.

Since $12\leq k-3\leq k$, write $k-3=4a+5b$. Then

$$k+1=(k-3)+4=4(a+1)+5b.$$

So $k+1$ also has the required form. Strong induction proves the claim for all $n\geq12$. $\square$

### Presenter notes

The step looks back four places, so four base cases are needed. This is a good place to ask students to identify the exact earlier statement used: $P(k-3)$.

---

## Slide 25 — Five induction mistakes to catch early

| Mistake | Fix |
|---|---|
| Starting at the wrong value. | Prove the base case at the first stated value $n_0$. |
| Hiding the inductive hypothesis. | Write “assume $P(k)$” or state the equation you may use. |
| Using the hypothesis for every $n$. | Assume it only for one allowed integer $k$, chosen freely. |
| Never using the hypothesis. | Mark the line where $P(k)$ is used. |
| Proving the wrong next statement. | Check that the final line is exactly $P(k+1)$. |

### Presenter notes

The third and fourth errors are different: the first assumes too much, while the second assumes the right thing but does not use it. Invite students to find these errors in old work.

---

## Slide 26 — Exit ticket · work independently

1. For $1+3+\cdots+(2n-1)=n^2$, write the base case and the inductive hypothesis.
2. Complete the step: if $2^k\geq k+1$ for $k\geq0$, explain why

$$2^{k+1}=2\cdot2^k\geq2(k+1)\geq k+2.$$

3. In the postage activity, which earlier statement is used to prove $P(k+1)$?

Write one sentence explaining why a base case alone is not an induction proof.

### Presenter notes

Expected answers: 1. $P(1):1=1^2$; assume the identity for $k\geq1$. 2. The first inequality uses the hypothesis; the second follows because $k\geq0$. 3. $P(k-3)$. A base case proves one case, not the link to the next case.

---

## Slide 27 — What today was about

- **Induction** proves a statement for every integer from a stated starting value onward.
- A complete proof needs a **base case**, an **inductive hypothesis**, and an **inductive step**.
- **Strong induction** lets the next case use any earlier case in the stated range.
- A proof that skips a base case, hides its hypothesis, or makes a false algebra step is not complete.

**Homework 6:** six induction proofs, including one strong-induction proof, plus one broken proof to diagnose.

**Next session:** elementary combinatorics and the binomial theorem.

### Presenter notes

End by asking students to say the difference between ordinary and strong induction in one sentence. Reinforce that the conclusion in both methods is the same; only the information available in the step changes.
