# Session 5 — Theorem proving

**Math102BKK · Session 5 of 15**

**Topics:** direct proof, contrapositive, proof by contradiction, and disproof by counterexample.

**Goal:** learn standard proof methods, choose the right one for a claim, and write an argument whose definitions, assumptions, and conclusion are all clear.

---

## Slide 1 — Session 5

### Theorem proving

**Direct proof · contrapositive · contradiction · disproof by counterexample**

**Math102BKK · Session 5 of 15**

Today’s goal: turn a mathematical statement into a clear argument that shows **why it must be true in every case it claims**.

A proof is not a list of examples. It is a chain of valid deductions from stated assumptions, definitions, and previously known facts.

### Presenter notes

Set the tone: an answer is not yet a proof. A proof must cover its stated domain, not merely some convenient examples. In this session, students learn a small number of dependable proof structures and practise choosing between them.

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

**Today:** direct proof, contrapositive, contradiction, and counterexamples—the tools used to justify the precise claims introduced in earlier sessions.

### Presenter notes

Session 5 is the course pivot. Sets and functions supplied precise language; today students use that language to justify claims. Session 6 turns one of these proof ideas into a method for infinitely many cases.

---

## Slide 3 — From precise language to proof

In earlier sessions, we learned to name objects precisely:

- a set has elements;
- a function has a domain, codomain, and rule;
- a formula with a variable may be true for some inputs and false for others.

Before proving anything, state the **domain** and the **quantifier**: are we talking about every allowed object, or at least one?

**Today’s question:** Once a claim is written clearly, how do we show it is true in every case it claims?

### Presenter notes

Ask students for the difference between checking three examples and proving a statement. Accept the idea that examples can suggest a pattern, but the proof must cover every allowed case. Point out that the domain is part of the claim: a fact about integers need not hold for real numbers.

---

## Slide 4 — By the end of today, you can…

- state the domain of a claim, and read “for every” ($\forall$) and “there exists” ($\exists$);
- read an “if … then …” statement and distinguish it from its converse and contrapositive;
- write a direct proof with a visible hypothesis and conclusion;
- use a contrapositive when its starting point is simpler;
- use contradiction to rule out an impossible assumption;
- disprove a “for every” statement with one valid counterexample;
- write the **negation** of statements involving “for every” and “there exists.”

**Success:** every line has a reason, and the last line proves exactly the claim that was asked.

### Presenter notes

Explain that students do not need to memorise a proof word for word. They need to recognise the shape of the argument, keep its domain visible, and explain why each line follows.

---

## Slide 5 — A theorem is more than a pattern

A **mathematical statement** is a declarative sentence with a definite truth value: once all variables, domains, and quantifiers are fixed, it is either true or false.

| Sentence | Statement? | Why? |
|---|---:|---|
| “$x+1=4$” | No | It is an **open sentence**: its truth depends on the unspecified value of $x$. |
| “For every real $x$, $x^2\geq0$” | Yes | It makes one claim about all real numbers. |
| “There is an integer $n$ with $n^2=9$” | Yes | It says that at least one integer works. |

A **theorem** is a mathematical statement established by a valid proof from accepted definitions, axioms, and earlier results.

Here, “for every” means **all allowed values**, and “there is” means **at least one allowed value**.

### Presenter notes

Read the quantifiers in ordinary English. For the last row, ask for a **witness** such as $n=3$ or $n=-3$. Explain that assigning $x=3$ would turn the first row into the true statement $3+1=4$, whereas placing a quantifier in front of $x$ makes a different statement. Do not present a proof of $x^2\geq0$ here; it is used as a familiar fact about real numbers.

---

## Slide 6 — An implication has a hypothesis and a conclusion

An implication has the form

$$P\ \Longrightarrow\ Q,$$

read as **“if $P$, then $Q$.”**

- $P$ is the **hypothesis** (or condition).
- $Q$ is the **conclusion**.

When a variable is involved, include its domain:

$$\text{For every }n\in\mathbb Z,\qquad
\text{if }n\text{ is a multiple of }4,\text{ then }n\text{ is even.}$$

Here, $\mathbb Z$ is the set of integers. “Multiple of $4$” means $n=4k$ for some $k\in\mathbb Z$; “even” means $n=2m$ for some $m\in\mathbb Z$.

An implication only tells us what follows **when its hypothesis holds**. It does not say that every even integer is a multiple of $4$.

### Presenter notes

Ask students to identify $P$ and $Q$ in the example. The definitions at the bottom prepare a direct proof without using unfamiliar divisibility notation. Stress that the claim is about every integer satisfying $P$, not about the integers for which $P$ fails.

---

## Slide 7 — Do not confuse an implication with its converse

Fix one domain and consider an implication $P\Rightarrow Q$ in that domain. Here, $\neg P$ means “not $P$.”

| Name | Form |
|---|---|
| original statement | $P\Rightarrow Q$ |
| converse | $Q\Rightarrow P$ |
| contrapositive | $\neg Q\Rightarrow\neg P$ |

The original statement and its contrapositive are **logically equivalent**: over the same domain, they are always both true or both false. The converse is a different statement and may have a different truth value.

Example: “multiple of $4\Rightarrow$ even” is true. Its converse, “even $\Rightarrow$ multiple of $4$,” is false: $2$ is even and is not a multiple of $4$.

### Presenter notes

The counterexample $2$ is enough because the converse makes a claim about every even integer. Keep the domain $\mathbb Z$ in view: words such as “even” and “multiple of $4$” have been defined there. Leave the inverse form for a later logic course; it is not needed for today’s proof methods.

---

## Slide 8 — Activity 1 · Read the logical direction

**Pairs · 10 minutes**

Let $P(n)$ mean “$n$ is even” and $Q(n)$ mean “$n^2$ is even,” where $n\in\mathbb Z$.

1. Write the converse of $P(n)\Rightarrow Q(n)$ in words.
2. Write the contrapositive of $P(n)\Rightarrow Q(n)$ in words.
3. For “if $n$ is a multiple of $4$, then $n$ is even,” test its converse over $\mathbb Z$. Is it true or false? Justify your answer.

**Share:** explain why a counterexample to a converse does not disprove the original implication.

### Presenter notes

Pairs should write complete sentences, not only symbols. Encourage them to keep $P(n)$, $Q(n)$, and the domain visible while reversing and negating them.

---

## Slide 9 — Activity 1 · How to change an implication

### Converse: swap. Contrapositive: swap and negate.

For an implication $P\Rightarrow Q$:

1. **Converse:** swap the two parts: $Q\Rightarrow P$.
2. **Contrapositive:** swap the parts **and** negate both: $\neg Q\Rightarrow\neg P$.

For $t\in\mathbb Z$, “$t$ is odd” means $t=2k+1$ for some $k\in\mathbb Z$. Every integer is either even or odd, not both. Thus “not even” means “odd,” and “not odd” means “even”—a parity fact that is special to integers.

For the activity:

| Requested statement | Answer |
|---|---|
| converse of “even $\Rightarrow$ square even” | “if $n^2$ is even, then $n$ is even” |
| contrapositive | “if $n^2$ is odd, then $n$ is odd” |
| converse of “multiple of $4\Rightarrow$ even” | false; $n=2$ is a counterexample |

**Key point:** proving a converse proves a different statement. To prove $P\Rightarrow Q$, prove $P\Rightarrow Q$ itself or prove its equivalent contrapositive $\neg Q\Rightarrow\neg P$.

### Presenter notes

Reveal the answers only after pairs have committed. Point to the displayed parity fact: the replacement of “not even” by “odd” is justified because the domain is the integers, not because negations can always be replaced by a convenient word.

---

## Slide 10 — Direct proof: start from the hypothesis

To prove a universal implication

$$\text{for every }x\in D,\qquad P(x)\Rightarrow Q(x),$$

use this reliable structure:

1. Let $x\in D$ be **arbitrary**, and assume $P(x)$.
2. Replace words in the hypothesis by their definitions.
3. Use algebra or facts already known to be true.
4. Show $Q(x)$. Because $x$ was arbitrary, the claim holds for every $x\in D$.

The hypothesis may provide new numbers. For example, “$a$ is even” supplies an integer $r$ with $a=2r$; $r$ is not a conveniently chosen value.

Never assume $Q(x)$ at the start: that is the conclusion you are trying to prove.

### Presenter notes

The word “arbitrary” is essential: a proof about every integer cannot secretly choose a convenient integer. Point out that definitions turn informal labels such as “even” into algebra that can be used, and that the new letters introduced by a definition are witnesses guaranteed by the hypothesis.

---

## Slide 11 — Direct proof · the sum of two even integers is even

**Claim.** For every $a,b\in\mathbb Z$, if $a$ and $b$ are even, then $a+b$ is even.

**Proof.** Let $a,b\in\mathbb Z$ be arbitrary and assume that both are even. By the definition of even, there are integers $r$ and $s$ such that

$$a=2r \quad\text{and}\quad b=2s$$

Therefore

$$a+b=2r+2s=2(r+s).$$

Since $r+s\in\mathbb Z$, the number $a+b$ is $2$ times an integer. This is exactly the definition of “$a+b$ is even.” $\square$

### Presenter notes

Trace the proof’s shape: the hypothesis supplies the witnesses $r,s\in\mathbb Z$; the calculation produces the definition of “even” for $a+b$. The sentence “$r+s$ is an integer” closes a common hidden gap.

---

## Slide 12 — Activity 2 · Write a short direct proof

**Pairs · 12 minutes**

Prove the following statement directly:

> If $a$ is an even integer and $b$ is an integer, then $ab$ is even.

Use this checklist:

1. Let $a,b\in\mathbb Z$ be arbitrary and assume that $a$ is even.
2. Use the definition: write $a=2k$ for some $k\in\mathbb Z$.
3. Rewrite $ab$ in the form $2\times(\text{an integer})$.

**Share:** name the expression that must be an integer before the proof is complete.

### Presenter notes

Do not give the answer immediately. If a pair writes $a=2k$ but does not say $k\in\mathbb Z$, prompt them to make the definition explicit. Ask why $a$ and $b$ must be arbitrary rather than selected examples.

---

## Slide 13 — Activity 2 · A direct-proof walkthrough

### Method

1. Open with arbitrary allowed values and the hypothesis, not the conclusion.
2. Substitute the definition into the expression you need to study.
3. Finish by showing that your answer has the form required by the conclusion.

### Proof

Let $a,b\in\mathbb Z$ be arbitrary, and assume $a$ is even. Since $a$ is even, $a=2k$ for some $k\in\mathbb Z$. Thus

$$ab=(2k)b=2(kb).$$

Because $k,b\in\mathbb Z$, we have $kb\in\mathbb Z$. Therefore $ab$ is $2$ times an integer, so $ab$ is even. $\square$

**The trap:** $2(kb)$ only proves “even” after we state that $kb$ is an integer.

### Presenter notes

Ask one pair to identify the exact line that uses the hypothesis. Emphasise that the proof works for every integer $b$, including negative values and zero, because no special property of $b$ was assumed.

---

## Slide 14 — Section 2

### When a direct proof is not the clearest route

Sometimes it is hard to work forwards from the hypothesis to the conclusion. For a claim $P\Rightarrow Q$, compare the starting points:

| Method | Start by assuming | Aim |
|---|---|---|
| direct proof | $P$ | derive $Q$ |
| contrapositive | $\neg Q$ | derive $\neg P$ |
| contradiction | $P$ and $\neg Q$ | derive something impossible |

The contradiction row uses the fact that the negation of an implication $P\Rightarrow Q$ is “$P$ is true **and** $Q$ is false.”

### Presenter notes

Take the scheduled break before this section. On return, connect the new methods to the same goal: make an implication unavoidable. These are choices of route, not different standards of proof; each must still use valid definitions and deductions.

---

## Slide 15 — Contrapositive: prove the equivalent statement

For each $x$ in a fixed domain $D$, the statements

$$P(x)\Rightarrow Q(x) \qquad\text{and}\qquad \neg Q(x)\Rightarrow\neg P(x)$$

say the same thing in a different form: they are both true or both false. The original fails exactly when $P(x)$ is true and $Q(x)$ is false. The contrapositive fails in exactly that same situation.

So, to prove a universal implication by contraposition:

1. Let $x\in D$ be arbitrary and assume $\neg Q(x)$.
2. Deduce $\neg P(x)$.
3. Because $x$ was arbitrary, conclude $P(x)\Rightarrow Q(x)$ for every $x\in D$.

Use this method when “not $Q$” is easier to work with than $P$. You prove the contrapositive, not the converse.

### Presenter notes

The “same failure situation” is a compact proof of the equivalence: the contrapositive fails when $\neg Q$ is true and $\neg P$ is false, which means $Q$ is false and $P$ is true. Do not call contraposition a trick; it is an equivalence. Make students state the domain before swapping and negating.

---

## Slide 16 — Contrapositive proof · if $n^2$ is even, then $n$ is even

**Claim.** For every $n\in\mathbb Z$, if $n^2$ is even, then $n$ is even.

Instead of starting from “$n^2$ is even,” prove the contrapositive:

> If $n$ is odd, then $n^2$ is odd.

For integers, “not even” means “odd,” and “not odd” means “even.” Let $n$ be an arbitrary odd integer. By definition, $n=2k+1$ for some $k\in\mathbb Z$. Hence

$$\begin{aligned}
n^2&=(2k+1)^2\\
&=4k^2+4k+1\\
&=2(2k^2+2k)+1.
\end{aligned}$$

Because $k\in\mathbb Z$, we have $k^2\in\mathbb Z$, and hence $j=2k^2+2k\in\mathbb Z$. Thus $n^2=2j+1$, so $n^2$ is odd. This proves the contrapositive; therefore the original claim is true. $\square$

### Presenter notes

Define odd as “$2k+1$ for an integer $k$.” The last sentence is not a new, unsupported jump: it uses the logical equivalence on the previous slide and the displayed fact that every integer is even or odd.

---

## Slide 17 — Proof by contradiction: an impossible assumption

To prove a target statement $S$ by contradiction:

1. Assume that $S$ is false; that is, assume $\neg S$.
2. Reason carefully from that assumption.
3. Reach a contradiction: for example, both $R$ and $\neg R$, or a fact known to be impossible.
4. Therefore the assumption $\neg S$ was false, so $S$ is true.

For a conditional target $P\Rightarrow Q$, assuming its negation means assuming **both** $P$ and $\neg Q$.

The contradiction must be a consequence of the assumption, not merely a surprising result.

### Presenter notes

Point out the difference between a contradiction proof and an invalid proof that quietly assumes two incompatible things. The goal is to show that the chosen negation cannot occur. A contradiction can be a violation of a definition, a known theorem, or the simultaneous conclusion of $R$ and $\neg R$.

---

## Slide 18 — Contradiction proof · set up $\sqrt2$

**Claim.** $\sqrt2$ is irrational.

A real number is **rational** if it can be written as $p/q$, where $p,q\in\mathbb Z$ and $q\ne0$. It is **irrational** if it is not rational.

Any rational number can be written in **lowest terms**: no positive integer greater than $1$ divides both its numerator and denominator.

Assume, for contradiction, that $\sqrt2$ is rational.

1. Choose integers $p,q$ with $q\ne0$, no common positive divisor greater than $1$, and

   $$\sqrt2=\frac{p}{q}$$

2. Square both sides and use $(\sqrt2)^2=2$:

   $$2=\frac{p^2}{q^2},\qquad\text{so}\qquad 2q^2=p^2.$$

3. Since $q^2\in\mathbb Z$, this shows that $p^2$ is even. By the theorem on Slide 16, $p$ is even.

### Presenter notes

Explain why squaring is legal: both sides of $\sqrt2=p/q$ are equal, so their squares are equal. The “lowest terms” condition is the fact we will contradict; students should see it before the algebra begins. Explain that choosing such a fraction is legitimate because common factors can be divided out of any rational representation.

---

## Slide 19 — Contradiction proof · finish $\sqrt2$

Since $p$ is even, write $p=2k$ for some $k\in\mathbb Z$. Substitute this into $2q^2=p^2$:

$$2q^2=(2k)^2=4k^2,$$

so

$$q^2=2(k^2).$$

Since $k^2\in\mathbb Z$, the number $q^2$ is even. Because $q\in\mathbb Z$, the theorem on Slide 16 now tells us that $q$ is even as well.

Both $p$ and $q$ are divisible by $2$. This contradicts the choice of a fraction in lowest terms, which has no common positive divisor greater than $1$. Therefore the assumption that $\sqrt2$ is rational is false, and $\sqrt2$ is irrational. $\square$

### Presenter notes

Make the contradiction explicit: “no common positive divisor greater than $1$” conflicts with “both are divisible by $2$.” The proof uses the contrapositive theorem twice; this shows that proof methods can support each other.

---

## Slide 20 — Activity 3 · Choose a proof method before writing

**Groups of three · 12 minutes**

For each claim, choose the proof method that makes the starting condition easiest to use. Then write the first two lines, including the domain and the assumption.

| Claim | Your method |
|---|---|
| If $a,b\in\mathbb Z$ are odd, then $a+b$ is even. | ? |
| For every $n\in\mathbb Z$, if $n^2$ is odd, then $n$ is odd. | ? |
| $\sqrt2$ is irrational. | ? |

**Share:** one group explains the method choice, not only the first calculation.

### Presenter notes

Explain that more than one method can sometimes work; students should select the method that makes the starting assumption usable. The efficient choices are direct proof, contrapositive, and contradiction respectively.

---

## Slide 21 — Activity 3 · Why these methods fit

| Claim | Good way to start |
|---|---|
| odd $a,b\in\mathbb Z\Rightarrow a+b$ even | **Direct:** let $a=2r+1$ and $b=2s+1$ for $r,s\in\mathbb Z$. |
| $n^2$ odd $\Rightarrow n$ odd, $n\in\mathbb Z$ | **Contrapositive:** prove “$n$ even $\Rightarrow n^2$ even.” Let $n=2k$ for $k\in\mathbb Z$; then $n^2=2(2k^2)$ and $2k^2\in\mathbb Z$. |
| $\sqrt2$ irrational | **Contradiction:** assume it is rational and choose $\sqrt2=p/q$ in lowest terms. |

**Choosing a method is part of writing a proof.** Ask: which starting assumption gives me algebra I can use straight away, and what definition will my final line need?

### Presenter notes

For the first row, invite the room to finish: $a+b=2(r+s+1)$. For the second, point out that $2k^2\in\mathbb Z$, so the displayed equation really proves evenness; the contrapositive avoids expanding an odd square. For the third, state that the rest of the proof was just completed.

---

## Slide 22 — A counterexample can disprove a “for every” claim

The negation rules explain what a disproof must do:

$$\neg\bigl(\text{for every }x\in D,\ P(x)\bigr)
\quad\Longleftrightarrow\quad
\text{there exists }x\in D\text{ for which }P(x)\text{ is false},$$

$$\neg\bigl(\text{there exists }x\in D\text{ for which }P(x)\bigr)
\quad\Longleftrightarrow\quad
\text{for every }x\in D,\ P(x)\text{ is false}.$$

So, to disprove “for every $x\in D$, $P(x)$,” give a **counterexample**: a value $a$ for which

1. $a\in D$;
2. $P(a)$ is false.

Here, $D$ is the set of allowed values.

| False “for every” statement | Counterexample |
|---|---|
| Every prime number is odd. | $2$ is prime and even. |
| For every real $x$, $x^2\geq x$. | At $x=\tfrac12$, $x^2=\tfrac14<\tfrac12=x$. |

One allowed value $a\in D$ for which $P(a)$ is true proves the existential claim $\exists x\in D,\ P(x)$. One example normally does **not** prove a claim about every value. To disprove an existential claim, show that no allowed value works.

### Presenter notes

Read the domain carefully before accepting a counterexample. For example, $x=-1$ would not disprove a claim only about positive real numbers. Contrast the two directions of quantifiers: one witness disproves “for every,” but does not disprove “there exists.” In the displayed identities, explain that “there exists” is the logical negation of “for every,” with the property also negated.

---

## Slide 23 — Activity 4 · Disprove, prove, or explain why one example is not enough

**Pairs · 12 minutes**

For each statement, decide whether it is true or false. Give the requested justification. When using a counterexample, name the value, confirm that it is in the domain, and show the failed equality or inequality.

1. For every real $x$, $x^2\geq0$. If true, state the known fact you use.
2. For every integer $n$, $n^2+n$ is odd. If false, give a counterexample.
3. For every real $x$, $(x+1)^2=x^2+1$. If false, give a counterexample.
4. There exists a real $x$ with $x^2=-1$. Explain why checking a few values is not a disproof; use a fact about **every** real $x$ instead.

**Share:** give one valid counterexample and name the statement type it disproves.

### Presenter notes

Students may use $n=1$ or $n=0$ in item 2. For item 4, encourage the class to use the universal fact from item 1, rather than a list of unsuccessful trials. Remind them that “there exists” is not refuted until all allowed values have been ruled out.

---

## Slide 24 — Activity 4 · Check “every” or “there exists” first

| Item | Reasoning |
|---|---|
| 1 | True. A square of a real number is non-negative: $x^2\geq0$ for every $x\in\mathbb R$. |
| 2 | False. The allowed integer $n=1$ gives $n^2+n=2$, which is even, not odd. |
| 3 | False. The allowed real number $x=1$ gives left side $4$ and right side $2$. |
| 4 | False. For every $x\in\mathbb R$, $x^2\geq0>-1$, so no real $x$ can satisfy $x^2=-1$. |

For item 4, a single failed trial is not enough: the claim says **there exists** a value. We disprove it by showing that **every** real value fails.

### Presenter notes

Make students say the domain in item 4: real numbers. Connect the final sentence directly to Slide 22: it is a proof of the negation of an existential statement.

---

## Slide 25 — Four common proof mistakes

Recall: for the same domain, **not (every value has the property)** means **there exists a failure**; **not (there exists a value with the property)** means **every value fails**.

| Pitfall | Fix |
|---|---|
| Proving $Q\Rightarrow P$ when the question asks for $P\Rightarrow Q$. | Label the hypothesis and conclusion before you start. |
| Assuming the conclusion. | Begin with $P$ in a direct proof, with $\neg Q$ in a contrapositive proof, or with the negation of the whole target in a contradiction proof. |
| Negating “every” or “there exists” incorrectly. | Use the recall above: negating “for every” changes it to “there exists,” and vice versa. |
| Giving a few examples as a proof for all values. | Examples test an idea; a proof must cover every case. |

### Presenter notes

For the last row, add the boundary: checking every member can prove a statement when the stated domain is finite. In this course, “a few examples” is never a proof of an infinite universal statement. In a contradiction proof of $P\Rightarrow Q$, the full negation is $P\land\neg Q$, not merely an unlabelled “opposite.”

---

## Slide 26 — Exit ticket · work independently

Complete questions 3 and 4. Then choose **one** full proof from questions 1 and 2.

1. Prove directly: if $m,n\in\mathbb Z$ are odd, then $m+n$ is even.
2. Prove by contraposition: for every $n\in\mathbb Z$, if $n^2$ is even, then $n$ is even.
3. Disprove: for every real $x$, $x^2+1>2x$.
4. Write the **logical negation** of: “For every real $x$, $x^2>x$.”

Write the method name and at least one sentence explaining why your proof or counterexample works. For a counterexample, state why the chosen value belongs to the stated domain.

### Presenter notes

Expected proof options: 1. $m+n=2(r+s+1)$ after writing $m=2r+1$, $n=2s+1$. 2. Use the proof from Slide 16. Quick checks: 3. At $x=1$, both sides equal $2$, so the strict inequality fails. 4. “There exists a real $x$ such that $x^2\leq x$.” Collect a small sample before students leave.

---

## Slide 27 — What today was about

- State the **domain** and quantifier first. An implication has a **hypothesis** and a **conclusion**.
- Its converse is a different statement; over the same domain, its contrapositive is true in exactly the same cases.
- A **direct proof** starts from the hypothesis; a **contrapositive proof** starts from “not the conclusion”; a **contradiction proof** starts from the negation of the whole target.
- One valid **counterexample**—an allowed value where the property fails—disproves a statement that claims something is true for every allowed value.
- Remember: “not every” means “there exists a failure,” and “not ‘there exists’” means “every value fails.”

**Homework 5:** eight statements to prove or disprove. Name the method at the top of each solution and explain each key step.

**Next session:** mathematical induction — a method for proving a statement for infinitely many integers.

### Presenter notes

Close by asking students to name one situation in which they would choose a counterexample rather than a proof. Remind them that the homework mark is for reasoning as well as the final answer, and that Session 6 will apply the same explicit-assumption discipline to infinitely many integer cases.
