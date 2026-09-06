# Homework 5 — Theorem proving

**Math102BKK · Harbour.Space Bangkok**

**Session 5 · Set:** Friday 11 September 2026

**Due:** Monday 14 September 2026, at the start of class

**Time guide:** 60–90 minutes · **Total:** 24 marks

## How to answer

Every answer needs a reason. A correct final statement without a proof earns only part of the marks.

At the top of every proof, name the method: **direct proof**, **contrapositive**, **contradiction**, or **counterexample**.

For a direct proof, start with the hypothesis. For a contrapositive proof, state the contrapositive. For a contradiction proof, state the false assumption you will rule out. A counterexample must be in the stated domain.

You may discuss the questions and use AI tools, but you must be able to explain every line you submit.

---

## Part A · Build the basic proof habits — 6 marks

### 1. Even plus odd — 2 marks

**Method: direct proof.** Prove that if $a$ is an even integer and $b$ is an odd integer, then $a+b$ is odd.

Use the definitions $a=2r$ and $b=2s+1$ for integers $r$ and $s$.

### 2. Odd times odd — 2 marks

**Method: direct proof.** Prove that if $m$ and $n$ are odd integers, then $mn$ is odd.

End by writing $mn$ in the form $2q+1$ for an integer $q$.

### 3. Original statement, converse, and contrapositive — 2 marks

Let $P$ be “an integer $n$ is a multiple of $4$,” and let $Q$ be “$n$ is even.”

1. Write the converse of $P\Rightarrow Q$ in words.
2. Write the contrapositive of $P\Rightarrow Q$ in words.
3. Give a counterexample to the converse.
4. A student says, “I proved the converse, so I proved the original statement.” Explain the error in one sentence.

---

## Part B · Choose a proof method and use it carefully — 12 marks

### 4. An even square — 4 marks

**Method: contrapositive.** Prove that if $n^2$ is even for an integer $n$, then $n$ is even.

Write the contrapositive first. Use the definition of an odd integer.

### 5. No smallest positive rational number — 4 marks

**Method: contradiction.** Prove that there is no smallest positive rational number.

If $r$ were the smallest positive rational number, compare $r$ with $r/2$. State why $r/2$ is both rational and positive.

### 6. The number $\sqrt2$ is irrational — 4 marks

**Method: contradiction.** Prove that $\sqrt2$ is irrational.

You may use this result from class: if $t^2$ is even for an integer $t$, then $t$ is even.

Write a rational number in lowest terms as $p/q$, where $p,q\in\mathbb Z$, $q\ne0$, and $p$ and $q$ have no common factor greater than $1$.

---

## Part C · Disprove and correct — 6 marks

### 7. Two counterexamples — 3 marks

Disprove each claim with one counterexample. For each counterexample, state why it is allowed and show the calculation that makes the claim false.

1. For every nonzero real number $x$, $\dfrac1x<x$.
2. For every positive integer $n$, $n^2+n+1$ is even.

### 8. Negating “for every” correctly — 3 marks

Consider the statement

$$S:\qquad \text{For every real }x,\ x^2>x.$$

A student writes its opposite as “For every real $x$, $x^2\leq x$.”

1. Write the correct opposite statement.
2. Give a value of $x$ that shows $S$ is false.
3. Explain why the same value also proves that your opposite statement is true.

---

# Instructor solution and marking guide

## Marking principles

Award method marks when the structure is correct, even if there is one small algebra error later. Do not award the conclusion mark when the proof assumes what it needs to prove, proves only the converse, or does not state why a new variable is an integer.

## Part A solutions — 6 marks

### 1. Even plus odd — 2 marks

**Method: direct proof.** Let $a$ be even and $b$ be odd. Then $a=2r$ and $b=2s+1$ for some integers $r,s$. Therefore

$$a+b=2r+(2s+1)=2(r+s)+1.$$

Since $r+s$ is an integer, $a+b$ has the form $2q+1$ for an integer $q$. Therefore $a+b$ is odd. $\square$

**Marks:** 0.5 correct definitions, 1 correct algebraic form, 0.5 states why the bracket is an integer and concludes.

### 2. Odd times odd — 2 marks

**Method: direct proof.** Let $m=2r+1$ and $n=2s+1$ for some integers $r,s$. Then

$$\begin{aligned}
mn&=(2r+1)(2s+1)\\
&=4rs+2r+2s+1\\
&=2(2rs+r+s)+1.
\end{aligned}$$

The number $2rs+r+s$ is an integer. Therefore $mn$ is odd. $\square$

**Marks:** 0.5 correct definitions, 1 correct expansion and factorisation, 0.5 states why the bracket is an integer and concludes.

### 3. Original statement, converse, and contrapositive — 2 marks

1. The converse is: “If $n$ is even, then $n$ is a multiple of $4$.”
2. The contrapositive is: “If $n$ is not even, then $n$ is not a multiple of $4$.” For integers, this can also be written: “If $n$ is odd, then $n$ is not a multiple of $4$.”
3. The converse is false. At $n=2$, $n$ is even but is not a multiple of $4$.
4. The converse is a different statement from the original implication. A proof of the converse does not prove the original statement.

**Marks:** 0.5 correct converse, 0.5 correct contrapositive, 0.5 valid counterexample, 0.5 clear explanation.

## Part B solutions — 12 marks

### 4. An even square — 4 marks

**Method: contrapositive.** The contrapositive is: if $n$ is odd, then $n^2$ is odd.

Let $n$ be odd. Then $n=2k+1$ for some integer $k$. Therefore

$$\begin{aligned}
n^2&=(2k+1)^2\\
&=4k^2+4k+1\\
&=2(2k^2+2k)+1.
\end{aligned}$$

The number $2k^2+2k$ is an integer, so $n^2$ is odd. Therefore the contrapositive is true. Hence, if $n^2$ is even, then $n$ is even. $\square$

**Marks:** 1 correct contrapositive, 1 correct definition of odd, 1.5 correct algebra and integer reason, 0.5 conclusion about the original claim.

### 5. No smallest positive rational number — 4 marks

**Method: contradiction.** Assume that $r$ is the smallest positive rational number. Since $r$ is rational, $r/2$ is rational. Since $r>0$, we have

$$0<\frac r2<r.$$

Thus $r/2$ is a positive rational number smaller than $r$. This contradicts that $r$ was the smallest positive rational number. Therefore no smallest positive rational number exists. $\square$

**Marks:** 1 clear false assumption, 1 shows $r/2$ is rational and positive, 1 obtains $r/2<r$, 1 states the contradiction and conclusion.

### 6. The number $\sqrt2$ is irrational — 4 marks

**Method: contradiction.** Assume that $\sqrt2$ is rational. Write

$$\sqrt2=\frac{p}{q}$$

in lowest terms, where $p,q\in\mathbb Z$, $q\ne0$, and $p$ and $q$ have no common factor greater than $1$. Squaring gives

$$p^2=2q^2.$$

Thus $p^2$ is even. By the class result, $p$ is even, so $p=2r$ for some integer $r$. Substitute into $p^2=2q^2$:

$$4r^2=2q^2,$$

so $q^2=2r^2$. Thus $q^2$ is even, and the class result shows that $q$ is even.

Both $p$ and $q$ are divisible by $2$. This contradicts that $p/q$ is in lowest terms. Therefore $\sqrt2$ is irrational. $\square$

**Marks:** 1 valid lowest-terms assumption, 1 obtains that $p$ is even, 1 obtains that $q$ is even, 1 states the contradiction and conclusion.

## Part C solutions — 6 marks

### 7. Two counterexamples — 3 marks

1. Take $x=1$. It is a nonzero real number, but

$$\frac11=1\not<1.$$

So the claim is false.

2. Take $n=1$. It is a positive integer, but

$$n^2+n+1=1+1+1=3,$$

which is odd, not even. So the claim is false.

**Marks:** 1.5 for each: 0.5 an allowed counterexample, 0.5 correct calculation, 0.5 clear conclusion.

### 8. Negating “for every” correctly — 3 marks

1. The correct opposite statement is: “There exists a real $x$ such that $x^2\leq x$.”
2. Take $x=1$. Then $1^2=1$, so $1^2>1$ is false. Thus $S$ is false.
3. The same value gives $1^2\leq1$, so it makes the correct opposite statement true.

**Marks:** 1 correct opposite statement, 1 valid counterexample to $S$, 1 clear explanation of why it proves the opposite statement.

---

## Marks summary

| Part | Questions | Marks |
|---|---:|---:|
| A · Build the basic proof habits | 1–3 | 6 |
| B · Choose a proof method and use it carefully | 4–6 | 12 |
| C · Disprove and correct | 7–8 | 6 |
| **Total** |  | **24** |

## Self-check before submitting

- Did I name a proof method at the top of every proof?
- Did I start from the correct hypothesis or false assumption?
- Did I state why each new expression is an integer when that matters?
- Did I prove the original statement, not only its converse?
- Is every counterexample inside the stated domain?
