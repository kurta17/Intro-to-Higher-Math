# Session 5 — Theorem proving

**Math102BKK · Session 5 of 15**

**Topics:** direct proof, contrapositive, proof by contradiction, and disproof by counterexample.

**Goal:** learn standard proof methods, choose the right one for a claim, and write each argument clearly.

---

## Slide 1 — Session 5

### Theorem proving

**Direct proof · contrapositive · contradiction · disproof by counterexample**

**Math102BKK · Session 5 of 15**

Today’s goal: turn a mathematical statement into a clear argument that shows **why it must be true**.

### Presenter notes

Set the tone: an answer is not yet a proof. In this session, students learn a small number of dependable proof structures and practise choosing between them.

---

## Slide 2 — Course outline

| | |
|---|---|
| 1 · Course overview and school-maths refresher | 2 · Sets and set operations |
| 3 · Functions | 4 · Function families |
| **5 · Theorem proving** | 6 · Mathematical induction |
| 7 · Elementary combinatorics and binomial theorem | 8 · Midterm |
| 9 · GCD and divisibility | 10 · Modular arithmetic |
| 11 · Vectors | 12 · Polynomials |
| 13 · Complex numbers | 14 · Course recap and exam preparation |
| 15 · Final exam | |

**Today:** direct proof, contrapositive, contradiction, and counterexamples.

### Presenter notes

Session 5 is the course pivot. Sets and functions supplied precise language; today students use that language to justify claims. Session 6 turns one of these proof ideas into a method for infinitely many cases.

---

## Slide 3 — From precise language to proof

In earlier sessions, we learned to name objects precisely:

- a set has elements;
- a function has a domain, codomain, and rule;
- a formula may be true for some inputs and false for others.

**Today’s question:** Once a statement is written clearly, how do we show it is true in every case it claims?

### Presenter notes

Ask students for the difference between checking three examples and proving a statement. Accept the idea that examples can suggest a pattern, but the proof must cover every allowed case.

---

## Slide 4 — By the end of today, you can…

- read an “if … then …” statement and distinguish it from its converse and contrapositive;
- write a direct proof with a visible hypothesis and conclusion;
- use a contrapositive when its starting point is simpler;
- use contradiction to rule out an impossible assumption;
- disprove a “for every” statement with one valid counterexample;
- write the opposite of statements involving “for every” and “there exists.”

**Success:** every line of a proof has a reason.

### Presenter notes

Explain that students do not need to memorise a proof word for word. They need to recognise the shape of the argument and explain why each line follows.

---

## Slide 5 — A theorem is more than a pattern

A **statement** is a sentence that is either true or false.

| Sentence | Statement? | Why? |
|---|---:|---|
| “$x+1=4$” | No | The value of $x$ is not specified. |
| “For every real $x$, $x^2\geq0$” | Yes | It makes one claim about all real numbers. |
| “There is an integer $n$ with $n^2=9$” | Yes | It says that at least one integer works. |

A **theorem** is a true mathematical statement with a proof.

### Presenter notes

Read the quantifiers in ordinary English. For the last row, ask for a witness such as $n=3$ or $n=-3$. Do not present a proof of $x^2\geq0$ here; it is used as a familiar fact about real numbers.

---

## Slide 6 — An implication has a hypothesis and a conclusion

An implication has the form

$$P\ \Longrightarrow\ Q,$$

read as **“if $P$, then $Q$.”**

- $P$ is the **hypothesis** (or condition).
- $Q$ is the **conclusion**.

Example: **If an integer $n$ is a multiple of $4$, then $n$ is even.**

Here, “multiple of $4$” means $n=4k$ for some integer $k$; “even” means $n=2m$ for some integer $m$.

### Presenter notes

Ask students to identify $P$ and $Q$ in the example. The definitions at the bottom prepare a direct proof without using unfamiliar divisibility notation.

---

## Slide 7 — Do not confuse an implication with its converse

For an implication $P\Rightarrow Q$:

Here, $\neg P$ means “not $P$.”

| Name | Form |
|---|---|
| original statement | $P\Rightarrow Q$ |
| converse | $Q\Rightarrow P$ |
| contrapositive | $\neg Q\Rightarrow\neg P$ |

The original statement and its contrapositive are always either both true or both false.

Example: “multiple of $4\Rightarrow$ even” is true, but its converse is false: $2$ is even and is not a multiple of $4$.

### Presenter notes

The counterexample $2$ is enough because the converse makes a claim about every even integer. Leave the inverse form for a later logic course; it is not needed for today’s proof methods.

---

## Slide 8 — Activity 1 · Read the logical direction

**Pairs · 10 minutes**

Let $P$ be “$n$ is even” and $Q$ be “$n^2$ is even,” where $n$ is an integer.

1. Write the converse of $P\Rightarrow Q$ in words.
2. Write the contrapositive of $P\Rightarrow Q$ in words.
3. For “if $n$ is a multiple of $4$, then $n$ is even,” test its converse. Is it true or false? Justify your answer.

**Share:** explain why a counterexample to a converse does not disprove the original implication.

### Presenter notes

Pairs should write complete sentences, not only symbols. Encourage them to keep $P$ and $Q$ visible while reversing and negating them.

---

## Slide 9 — Activity 1 · How to change an implication

### Keep the order when you negate

For $P\Rightarrow Q$:

1. **Converse:** swap the two parts: $Q\Rightarrow P$.
2. **Contrapositive:** swap the parts **and** negate both: $\neg Q\Rightarrow\neg P$.

For the activity:

| Requested statement | Answer |
|---|---|
| converse of “even $\Rightarrow$ square even” | “if $n^2$ is even, then $n$ is even” |
| contrapositive | “if $n^2$ is odd, then $n$ is odd” |
| converse of “multiple of $4\Rightarrow$ even” | false; $n=2$ is a counterexample |

**Key point:** proving a converse proves a different statement. To prove $P\Rightarrow Q$, prove $P\Rightarrow Q$ itself or prove $\neg Q\Rightarrow\neg P$.

### Presenter notes

Reveal the answers only after pairs have committed. “Not even” and “odd” are equivalent for integers; say that this equivalence is special to integers, not to all number systems.

---

## Slide 10 — Direct proof: start from the hypothesis

To prove

$$\text{for every object, if }P\text{ then }Q,$$

use this reliable structure:

1. Choose any allowed object that satisfies $P$.
2. Replace words in $P$ by their definitions.
3. Use algebra or known facts.
4. Reach $Q$ and say why it is true for this object.

Never assume $Q$ at the start: that is the conclusion you are trying to prove.

### Presenter notes

The word “arbitrary” is essential: a proof about every integer cannot secretly choose a convenient integer. Point out that definitions turn informal labels such as “even” into algebra that can be used.

---

## Slide 11 — Direct proof · the sum of two even integers is even

**Claim.** If $a$ and $b$ are even integers, then $a+b$ is even.

**Proof.** Let $a$ and $b$ be any even integers. Then

$$a=2r \quad\text{and}\quad b=2s$$

for some integers $r$ and $s$. Therefore

$$a+b=2r+2s=2(r+s).$$

Since $r+s$ is an integer, $a+b$ is $2$ times an integer. Hence $a+b$ is even. $\square$

### Presenter notes

Trace the proof’s shape: the hypothesis supplies $a=2r$ and $b=2s$; the calculation produces the definition of “even” for $a+b$. The sentence “$r+s$ is an integer” closes a common hidden gap.

---

## Slide 12 — Activity 2 · Write a short direct proof

**Pairs · 12 minutes**

Prove the following statement directly:

> If $a$ is an even integer and $b$ is an integer, then $ab$ is even.

Use this checklist:

1. Start with any $a$ and $b$ that satisfy the hypothesis.
2. Write $a=2k$ for an integer $k$.
3. Rewrite $ab$ in the form $2\times(\text{an integer})$.

**Share:** name the expression that must be an integer before the proof is complete.

### Presenter notes

Do not give the answer immediately. If a pair writes $a=2k$ but does not say $k\in\mathbb Z$, prompt them to make the definition explicit.

---

## Slide 13 — Activity 2 · A direct-proof walkthrough

### Method

1. Open with the hypothesis, not the conclusion.
2. Substitute the definition into the expression you need to study.
3. Finish by showing that your answer has the form required by the conclusion.

### Proof

Let $a$ be an even integer and let $b$ be an integer. Since $a$ is even, $a=2k$ for some $k\in\mathbb Z$. Thus

$$ab=(2k)b=2(kb).$$

Because $k,b\in\mathbb Z$, we have $kb\in\mathbb Z$. Therefore $ab$ is even. $\square$

**The trap:** $2(kb)$ only proves “even” after we state that $kb$ is an integer.

### Presenter notes

Ask one pair to identify the exact line that uses the hypothesis. Emphasise that the proof works for every integer $b$, including negative values and zero.

---

## Slide 14 — Section 2

### When a direct proof is not the clearest route

Sometimes it is hard to work forwards from the hypothesis to the conclusion. Then we change the viewpoint:

- prove the **contrapositive**;
- or assume the claim is false and reach a **contradiction**.

### Presenter notes

Take the scheduled break before this section. On return, connect the new methods to the same goal: make an implication unavoidable.

---

## Slide 15 — Contrapositive: prove the equivalent statement

The statements

$$P\Rightarrow Q \qquad\text{and}\qquad \neg Q\Rightarrow\neg P$$

say the same thing in a different form: they are both true or both false. They fail only when $P$ is true and $Q$ is false.

So, to prove $P\Rightarrow Q$ by contraposition:

1. Assume $\neg Q$.
2. Deduce $\neg P$.
3. Conclude that $P\Rightarrow Q$ is true.

Use this method when “not $Q$” is easier to work with than $P$.

### Presenter notes

The “same failure situation” is a compact proof of the equivalence: the contrapositive fails when $\neg Q$ is true and $\neg P$ is false, which means $Q$ is false and $P$ is true. Do not call contraposition a trick; it is an equivalence.

---

## Slide 16 — Contrapositive proof · if $n^2$ is even, then $n$ is even

Instead of starting from “$n^2$ is even,” prove the contrapositive:

> If $n$ is odd, then $n^2$ is odd.

Let $n$ be odd. Then $n=2k+1$ for some $k\in\mathbb Z$. Hence

$$\begin{aligned}
n^2&=(2k+1)^2\\
&=4k^2+4k+1\\
&=2(2k^2+2k)+1.
\end{aligned}$$

The number $2k^2+2k$ is an integer, so $n^2$ is odd. Therefore, if $n^2$ is even, then $n$ is even. $\square$

### Presenter notes

Define odd as “$2k+1$ for an integer $k$.” The last sentence is not a new, unsupported jump: it uses the logical equivalence on the previous slide.

---

## Slide 17 — Proof by contradiction: an impossible assumption

To prove a statement $P$ by contradiction:

1. Assume that $P$ is false; that is, assume $\neg P$.
2. Reason carefully from that assumption.
3. Reach a contradiction: for example, a statement and “not that statement,” or a fact known to be impossible.
4. Therefore the assumption $\neg P$ was false, so $P$ is true.

The contradiction must be a consequence of the assumption, not merely a surprising result.

### Presenter notes

Point out the difference between a contradiction proof and an invalid proof that quietly assumes two incompatible things. The goal is to show that the chosen negation cannot occur.

---

## Slide 18 — Contradiction proof · set up $\sqrt2$

**Claim.** $\sqrt2$ is irrational.

A rational number can be written as $p/q$, where $p,q\in\mathbb Z$ and $q\ne0$.

**Irrational** means “not rational.”

Assume, for contradiction, that

$$\sqrt2=\frac{p}{q}$$

where $p$ and $q$ have no common whole-number factor greater than $1$ (the fraction is in lowest terms). Squaring gives

$$2q^2=p^2.$$

Thus $p^2$ is even. By the previous theorem, $p$ is even.

### Presenter notes

Explain why squaring is legal: both sides of $\sqrt2=p/q$ are equal, so their squares are equal. The “lowest terms” condition is the fact we will contradict; students should see it before the algebra begins.

---

## Slide 19 — Contradiction proof · finish $\sqrt2$

Since $p$ is even, write $p=2k$ for some $k\in\mathbb Z$. From $2q^2=p^2$,

$$2q^2=(2k)^2=4k^2,$$

so

$$q^2=2k^2.$$

Thus $q^2$ is even, and therefore $q$ is even as well.

Both $p$ and $q$ are divisible by $2$. This contradicts that $p/q$ was in lowest terms. Therefore $\sqrt2$ is irrational. $\square$

### Presenter notes

Make the contradiction explicit: “no common factor greater than $1$” conflicts with “both are divisible by $2$.” The proof uses the contrapositive theorem twice; this shows that proof methods can support each other.

---

## Slide 20 — Activity 3 · Choose a proof method before writing

**Groups of three · 12 minutes**

For each claim, choose the proof method that makes the starting condition easiest to use. Then write the first two lines.

| Claim | Your method |
|---|---|
| If $a$ and $b$ are odd integers, then $a+b$ is even. | ? |
| If $n^2$ is odd, then $n$ is odd. | ? |
| $\sqrt2$ is irrational. | ? |

**Share:** one group explains the method choice, not only the first calculation.

### Presenter notes

Explain that more than one method can sometimes work; students should select the method that makes the hypothesis usable. The expected choices are direct proof, contrapositive, and contradiction respectively.

---

## Slide 21 — Activity 3 · Why these methods fit

| Claim | Good way to start |
|---|---|
| odd $a$, odd $b\Rightarrow a+b$ even | **Direct:** let $a=2r+1$ and $b=2s+1$. |
| $n^2$ odd $\Rightarrow n$ odd | **Contrapositive:** assume $n$ is even, so $n=2k$ and $n^2=2(2k^2)$ is even. |
| $\sqrt2$ irrational | **Contradiction:** assume $\sqrt2=p/q$ in lowest terms. |

**Choosing a method is part of writing a proof.** Ask: which assumption gives me algebra I can use straight away?

### Presenter notes

For the first row, invite the room to finish: $a+b=2(r+s+1)$. For the second, point out that the contrapositive does not require expanding an odd square. For the third, state that the rest of the proof was just completed.

---

## Slide 22 — A counterexample can disprove a “for every” claim

To disprove a statement that says

$$\text{“for every }x\in D,\ P(x)\text{”},$$

find one allowed value $a\in D$ for which $P(a)$ is false.

Here, $D$ is the set of allowed values.

| False “for every” statement | Counterexample |
|---|---|
| Every prime number is odd. | $2$ is prime and even. |
| For every real $x$, $x^2\geq x$. | At $x=\tfrac12$, $x^2=\tfrac14<\tfrac12=x$. |

One example that works does **not** prove a statement about every value. To disprove a statement that says “there exists,” show that no allowed value works.

### Presenter notes

Read the domain carefully before accepting a counterexample. For example, $x=-1$ would not disprove a claim only about positive real numbers. Contrast the two directions of quantifiers: one witness disproves “for every,” but does not disprove “there exists.”

---

## Slide 23 — Activity 4 · Disprove, prove, or explain why one example is not enough

**Pairs · 12 minutes**

For each statement, decide whether it is true or false. Give the requested justification.

1. For every real $x$, $x^2\geq0$. If true, state the known fact you use.
2. For every integer $n$, $n^2+n$ is odd. If false, give a counterexample.
3. For every real $x$, $(x+1)^2=x^2+1$. If false, give a counterexample.
4. There exists a real $x$ with $x^2=-1$. Explain why checking a few values is not a disproof.

**Share:** give one valid counterexample and name the statement type it disproves.

### Presenter notes

Students may use $n=1$ or $n=0$ in item 2. For item 4, encourage the class to use the universal fact from item 1, rather than a list of unsuccessful trials.

---

## Slide 24 — Activity 4 · Check “every” or “there exists” first

| Item | Reasoning |
|---|---|
| 1 | True. For every real $x$, the square $x^2$ is non-negative. |
| 2 | False. At $n=1$, $n^2+n=2$, which is even. |
| 3 | False. At $x=1$, the left side is $4$ and the right side is $2$. |
| 4 | False. Since every real square is at least $0$, no real square can equal $-1$. |

For item 4, a single failed trial is not enough: the claim says **there exists** a value. We disprove it by showing that **every** real value fails.

### Presenter notes

Make students say the domain in item 4: real numbers. The final sentence is a preview of the quantifier-negation rule on the next slide.

---

## Slide 25 — Four common proof mistakes

| Pitfall | Fix |
|---|---|
| Proving $Q\Rightarrow P$ when the question asks for $P\Rightarrow Q$. | Label the hypothesis and conclusion before you start. |
| Assuming the conclusion. | Begin with $P$, or with $\neg Q$ in a contrapositive proof. |
| Negating “every” or “there exists” incorrectly. | “Not every $x\in D$ has $P(x)$” means that at least one $x\in D$ makes $P(x)$ false. “No $x\in D$ has $P(x)$” means $P(x)$ is false for every $x\in D$. |
| Giving a few examples as a proof for all values. | Examples test an idea; a proof must cover every case. |

### Presenter notes

For the last row, add the boundary: checking every member can prove a statement when the stated domain is finite. In this course, “a few examples” is never a proof of an infinite universal statement.

---

## Slide 26 — Exit ticket · work independently

1. Prove directly: if $m$ and $n$ are odd integers, then $m+n$ is even.
2. Prove by contraposition: if $n^2$ is even, then $n$ is even.
3. Disprove: for every real $x$, $x^2+1>2x$.
4. Write the opposite statement: “For every real $x$, $x^2>x$.”

Write the method name and at least one sentence explaining why your proof or counterexample works.

### Presenter notes

Expected results: 1. $m+n=2(r+s+1)$ after writing $m=2r+1$, $n=2s+1$. 2. Use the proof from Slide 16. 3. $x=1$ gives $2>2$, which is false. 4. “There exists a real $x$ such that $x^2\leq x$.” Collect a small sample before students leave.

---

## Slide 27 — What today was about

- An implication has a **hypothesis** and a **conclusion**. Its converse is a different statement; its contrapositive is true in exactly the same cases.
- A **direct proof** starts from the hypothesis and reaches the conclusion.
- A **contradiction proof** assumes the claim is false and shows that assumption is impossible.
- One valid **counterexample** disproves a statement that claims something is true for every allowed value.

**Homework 5:** eight statements to prove or disprove. Name the method at the top of each solution and explain each key step.

**Next session:** mathematical induction — a method for proving a statement for infinitely many integers.

### Presenter notes

Close by asking students to name one situation in which they would choose a counterexample rather than a proof. Remind them that the homework mark is for reasoning as well as the final answer.
