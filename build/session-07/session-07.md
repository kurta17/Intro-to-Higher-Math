# Slide 01 / 30 — Session 7

## Elementary combinatorics and the binomial theorem

**Sum rule · product rule · permutations · combinations · binomial coefficients**

**Math102BKK · Session 7 of 15**

Today’s goal: translate a counting question into a clear model, then use a rule that counts each allowed outcome exactly once.

### Presenter notes

Counting is not about choosing a formula first. Students should first say what one outcome is, whether order matters, and whether repetition is allowed.

---

# Slide 02 / 30 — Course outline

| | |
|---|---|
| 1 · Course overview and school-maths refresher | 2 · Sets and set operations |
| 3 · Functions | 4 · Function families |
| 5 · Theorem proving | 6 · Mathematical induction |
| **7 · Elementary combinatorics and binomial theorem** | 8 · Midterm |
| 9 · GCD and divisibility | 10 · Modular arithmetic |
| 11 · Vectors | 12 · Polynomials |
| 13 · Complex numbers | 14 · Course recap and exam preparation |
| 15 · Final exam | |

**Today:** count by cases, count in stages, arrange, select, and expand powers such as $(a+b)^n$.

### Presenter notes

Connect backwards to induction: many counting formulas can later be proved by induction. Connect forwards to the midterm: students need to justify why their chosen counting rule matches the question.

---

# Slide 03 / 30 — A counting problem is a modelling problem

Before calculating, answer three questions.

1. **What is one outcome?** A code, a seating order, a committee, or a hand of cards?
2. **Does order matter?** Is AB different from BA?
3. **Is repetition allowed?** May an object be used more than once?

Two questions can use the same objects but have different answers because they describe different outcomes.

### Presenter notes

Use two names, A and B. Choosing a two-person committee gives one outcome, but choosing a president and a secretary gives two possible ordered outcomes. This distinction drives the rest of the lesson.

---

# Slide 04 / 30 — By the end of today, you can…

- use the **sum rule** for disjoint cases;
- use the **product rule** for a sequence of choices;
- distinguish **permutations** from **combinations**;
- calculate $\binom{n}{k}$ and explain what it counts;
- use Pascal’s triangle and the **binomial theorem**;
- prove a simple counting identity by counting the same set in two ways.

**Success:** your solution names the objects being counted and explains why no outcome is missed or counted twice.

### Presenter notes

Read “disjoint” in everyday language: one outcome cannot belong to two cases at the same time. This is the condition students often omit when using addition.

---

# Slide 05 / 30 — A small example: choose or arrange?

From the three students A, B, and C:

| Question | Outcomes | Count |
|---|---|---:|
| Choose a two-person committee. | ${A,B},{A,C},{B,C}$ | $3$ |
| Choose a president and a secretary. | AB, AC, BA, BC, CA, CB | $6$ |

For a committee, AB and BA describe the same group. For two different roles, they describe different assignments.

### Presenter notes

This slide is deliberately concrete. Ask the class to explain why the first list uses braces and the second does not. Braces represent an unordered set.

---

# Slide 06 / 30 — Sum rule: count one disjoint case or another

If an outcome is in **exactly one** of two disjoint cases, and the cases contain $m$ and $n$ outcomes, then the total is

$$m+n.$$

**Example.** A student chooses one elective. There are $3$ programming electives and $2$ design electives, and no course is in both lists.

$$3+2=5$$

possible choices.

### Presenter notes

Stress the condition. If a course were listed in both groups, adding would count it twice. Inclusion–exclusion is the repair for overlapping cases, but it is beyond today’s core material.

---

# Slide 07 / 30 — Product rule: count a sequence of choices

If a process has two stages:

- $m$ choices for the first stage; and
- for **each** first choice, $n$ choices for the second stage,

then there are

$$m\cdot n$$

complete outcomes.

**Example.** With $3$ shirts and $4$ pairs of trousers, there are

$$3\cdot4=12$$

outfits.

### Presenter notes

The phrase “for each first choice” matters. The rule still works if the number of second-stage choices changes, but then multiply the relevant branch sizes and add the disjoint branches.

---

# Slide 08 / 30 — Activity 1 · Build a code carefully

**Pairs · 8 minutes**

A code has two uppercase English letters followed by three digits.

1. How many codes are possible if letters and digits may repeat?
2. How many codes are possible if neither letters nor digits may repeat?

Assume there are $26$ letters and $10$ digits. A code may begin with the digit $0$ in its digit part.

**Share:** name the choice at each of the five positions.

### Presenter notes

Ask pairs not to calculate immediately. They should first write five multiplication slots. The statement about zero prevents students from treating the code as a five-digit number.

---

# Slide 09 / 30 — Activity 1 · Count the code positions

| Rule | Number of codes | Reason |
|---|---:|---|
| Repetition allowed | $26^2\cdot10^3$ | Each letter position has $26$ choices; each digit position has $10$. |
| No repetition | $26\cdot25\cdot10\cdot9\cdot8$ | Each later position has one fewer permitted choice of the same kind. |

The product rule works because every finished code is produced by one unique sequence of five choices.

### Presenter notes

Point out that choosing the first letter does not reduce the digit choices: letters and digits are different kinds of symbols. Only a previous letter restricts a later letter here.

---

# Slide 10 / 30 — Factorials count full arrangements

For a positive integer $n$,

$$n!=n(n-1)(n-2)\cdots2\cdot1.$$

It counts the ways to arrange $n$ **distinct** objects in a row.

For example, five distinct books can be arranged in

$$5!=5\cdot4\cdot3\cdot2\cdot1=120$$

orders.

By definition, $0!=1$. There is one way to arrange no objects: the empty arrangement.

### Presenter notes

The word “distinct” is essential. Do not apply $n!$ unchanged when some objects are identical. The definition of $0!$ is useful for binomial coefficients later.

---

# Slide 11 / 30 — Permutations: arrange some of the objects

An ordered selection of $r$ distinct objects from $n$ distinct objects is a **permutation**:

$$P(n,r)=n(n-1)\cdots(n-r+1)=\frac{n!}{(n-r)!}.$$

**Example.** From $6$ students, assign president, secretary, and treasurer:

$$P(6,3)=6\cdot5\cdot4=120.$$

The roles are different, so order matters.

### Presenter notes

Read $P(6,3)$ as “permutations of 6 things taken 3 at a time.” The formula assumes $0\le r\le n$ and distinct candidates.

---

# Slide 12 / 30 — Activity 2 · Which counting model?

**Groups of three · 10 minutes**

For each question, decide whether the result should be a permutation, a combination, or neither. Explain why.

1. From $8$ distinct books, place $5$ on a shelf in a row.
2. From $8$ distinct books, choose $5$ for a reading list.
3. From $6$ students, assign president, secretary, and treasurer.

Then calculate the answers for questions 1 and 3.

### Presenter notes

Students should write “order matters” or “order does not matter” before any formula. Question 2 deliberately introduces combinations before the formula appears; it should be identified, not yet calculated.

---

# Slide 13 / 30 — Activity 2 · Answers and the key distinction

| Question | Model | Count |
|---|---|---:|
| Place $5$ of $8$ books on a shelf. | Permutation | $P(8,5)=8\cdot7\cdot6\cdot5\cdot4=6{,}720$ |
| Choose $5$ of $8$ books for a list. | Combination | Order does not matter. |
| Assign three different roles from $6$ students. | Permutation | $P(6,3)=120$ |

The same five books can make $5!=120$ different shelf orders, but they make only one five-book reading list.

### Presenter notes

This is the bridge to combinations. The final sentence explains exactly why a permutation count is too large for an unordered selection.

---

# Slide 14 / 30 — Section 2

## Combinations: select without order

When a group is all that matters, an arrangement counts the same group many times.

Next, we will divide out that overcounting and introduce the binomial coefficient.

### Presenter notes

Take the scheduled break before this section. On return, ask for the number of shelf orders of the particular five books A, B, C, D, E: it is $5!$. This motivates the division in the next slide.

---

# Slide 15 / 30 — Combinations and binomial coefficients

The number of ways to choose $r$ objects from $n$ distinct objects, when order does not matter, is

$$\binom{n}{r}=\frac{n!}{r!(n-r)!},\qquad 0\le r\le n.$$

It is read as **“$n$ choose $r$.”**

Why divide by $r!$? Every chosen group of $r$ objects was counted in $r!$ different orders by $P(n,r)$.

### Presenter notes

Link directly to the previous slide: $P(n,r)=n!/(n-r)!$, then divide by $r!$. Give the small example that ABC, ACB, BAC, BCA, CAB, and CBA are the six orders of the same three-person group.

---

# Slide 16 / 30 — Example: a five-card hand with exactly two aces

A standard deck has $4$ aces and $48$ non-aces.

To form an unordered five-card hand with exactly two aces:

1. choose $2$ of the $4$ aces;
2. choose $3$ of the $48$ non-aces.

Therefore the number of hands is

$$\binom42\binom{48}{3}=6\cdot17{,}296=103{,}776.$$

### Presenter notes

Students often multiply by an unnecessary $5!$. A hand has no first card, second card, and so on, so both choices are combinations. The two stages produce disjoint card types, so the product rule connects them.

---

# Slide 17 / 30 — Activity 3 · Order or no order?

**Pairs · 10 minutes**

1. A four-digit PIN uses four different digits. Zero is allowed in the first position. How many PINs are possible?
2. From $20$ candidates, choose $3$ student representatives. How many groups are possible?
3. From $20$ candidates, choose a chairperson, a secretary, and a treasurer. How many assignments are possible?

For each answer, write the rule or formula you used.

### Presenter notes

All digits and candidates are distinct. The contrast between items 2 and 3 should be made explicit: the same three people can form one representatives group but six different three-role assignments.

---

# Slide 18 / 30 — Activity 3 · Answers

| Question | Count | Why |
|---|---:|---|
| Four-digit PIN, no repeated digits | $P(10,4)=10\cdot9\cdot8\cdot7=5{,}040$ | Positions are ordered. |
| Three representatives from $20$ | $\binom{20}{3}=1{,}140$ | Only the group matters. |
| Three different roles from $20$ | $P(20,3)=20\cdot19\cdot18=6{,}840$ | The roles distinguish the choices. |

For the same three people, there are

$$3!=6$$

ways to assign three different roles.

### Presenter notes

Check the arithmetic on the board: $\binom{20}{3}=20\cdot19\cdot18/(3\cdot2\cdot1)=1{,}140$. This makes the “divide by $3!$” idea concrete.

---

# Slide 19 / 30 — A useful identity: choose or leave out

For $0\le k\le n$,

$$\binom{n}{k}=\binom{n}{n-k}.$$

**Algebraically:**

$$\frac{n!}{k!(n-k)!}=\frac{n!}{(n-k)!k!}.$$

**Combinatorially:** choosing the $k$ people who attend an event determines exactly the $n-k$ people who do not attend. This matching is reversible.

### Presenter notes

Name the reversible matching: take a selected subset and send it to its complement. This is a bijection, so the two sets of choices have equal size. Both proofs are deliberately short and visible.

---

# Slide 20 / 30 — Double counting: all subsets of an $n$-element set

Count the set of all subsets of an $n$-element set in two ways.

- **By size:** there are $\binom{n}{k}$ subsets with exactly $k$ elements, so the total is

$$\binom n0+\binom n1+\cdots+\binom nn.$$

- **By decisions:** for each of the $n$ elements, choose “in” or “out,” giving $2^n$ subsets.

Therefore,

$$\sum_{k=0}^{n}\binom{n}{k}=2^n.$$

### Presenter notes

This is double counting: both methods count the same collection, not two different collections that happen to have the same answer. For $n=3$, students can list the eight subsets as a check.

---

# Slide 21 / 30 — Section 3

## Pascal’s triangle and the binomial theorem

The same binomial coefficients that count groups also appear when we expand $(a+b)^n$.

We will first see the coefficients in Pascal’s triangle, then explain why they occur.

### Presenter notes

The word “binomial” means an expression with two terms, such as $a+b$. Do not assume students know this vocabulary.

---

# Slide 22 / 30 — Pascal’s triangle

Each row gives the binomial coefficients $\binom nk$ for one value of $n$.

| $n$ | Coefficients |
|---:|---|
| $0$ | $1$ |
| $1$ | $1\quad1$ |
| $2$ | $1\quad2\quad1$ |
| $3$ | $1\quad3\quad3\quad1$ |
| $4$ | $1\quad4\quad6\quad4\quad1$ |
| $5$ | $1\quad5\quad10\quad10\quad5\quad1$ |

Every interior entry is the sum of the two entries directly above it:

$$\binom nk=\binom{n-1}{k-1}+\binom{n-1}{k},
\qquad 1\le k\le n-1.$$

### Presenter notes

Use the row $n=4$ to read $\binom42=6$. The last formula is Pascal’s identity; its usual combinatorial proof separates a $k$-person choice according to whether one particular person is selected.

---

# Slide 23 / 30 — The binomial theorem

For every non-negative integer $n$ and real numbers $a,b$,

$$
(a+b)^n
=\sum_{k=0}^{n}\binom nk a^{\,n-k}b^k.
$$

Written out, this is

$$
(a+b)^n
=\binom n0a^n+\binom n1a^{n-1}b+\cdots+\binom nn b^n.
$$

The exponents of $a$ go down from $n$ to $0$; the exponents of $b$ go up from $0$ to $n$.

### Presenter notes

First check $n=2$: $(a+b)^2=a^2+2ab+b^2$. The formula includes the endpoints because $\binom n0=\binom nn=1$ and $a^0=b^0=1$.

---

# Slide 24 / 30 — Worked expansion: $(x+2)^5$

Pascal’s row for $n=5$ is

$$1, 5, 10, 10, 5, 1.$$

Therefore

$$
\begin{aligned}
(x+2)^5
&=x^5+5x^4(2)+10x^3(2^2)\\
&\quad+10x^2(2^3)+5x(2^4)+2^5\\
&=x^5+10x^4+40x^3+80x^2+80x+32.
\end{aligned}
$$

### Presenter notes

Keep the unsimplified line visible long enough for students to trace the source of every term. In particular, the exponent on $x$ plus the exponent on $2$ is always $5$.

---

# Slide 25 / 30 — Why is the coefficient $\binom nk$?

Write

$$
(a+b)^n=(a+b)(a+b)\cdots(a+b).
$$

To create the term $a^{n-k}b^k$:

- choose $b$ from exactly $k$ of the $n$ factors;
- choose $a$ from the remaining $n-k$ factors.

There are $\binom nk$ choices of those $k$ factors. Thus $\binom nk$ is the coefficient of $a^{n-k}b^k$.

### Presenter notes

Give the example $(a+b)^3$. The term $ab^2$ comes from choosing $b$ from exactly two factors; the possible choices are factors $12$, $13$, and $23$, so its coefficient is $3=\binom32$.

---

# Slide 26 / 30 — Activity 4 · Expand with the theorem

**Work independently · 8 minutes**

Use the binomial theorem to expand

$$
(2x-3)^4.
$$

Checklist:

1. Write the row of Pascal’s triangle for $n=4$.
2. Keep the negative sign with $-3$.
3. Simplify each term only after writing its coefficient.

**Share:** which powers of $x$ have negative coefficients, and why?

### Presenter notes

Do not let students distribute only once and stop. The sign alternates because the power of $-3$ alternates between positive and negative values.

---

# Slide 27 / 30 — Activity 4 · Walkthrough

Using the coefficients $1,4,6,4,1$,

$$
\begin{aligned}
(2x-3)^4
&=(2x)^4+4(2x)^3(-3)+6(2x)^2(-3)^2\\
&\quad+4(2x)(-3)^3+(-3)^4\\
&=16x^4-96x^3+216x^2-216x+81.
\end{aligned}
$$

The $x^3$ and $x$ coefficients are negative because they include an odd power of $-3$.

### Presenter notes

Invite students to check one middle coefficient independently: $6(2x)^2(-3)^2=6\cdot4x^2\cdot9=216x^2$. This isolates a common arithmetic error.

---

# Slide 28 / 30 — Pigeonhole principle

If more than $m$ objects are placed into $m$ boxes, then at least one box contains at least two objects.

**Example.** Among $13$ people, at least two were born in the same month.

- objects: the $13$ people;
- boxes: the $12$ birth months;
- since $13>12$, one month contains at least two people.

The conclusion is about a shared **month**, not necessarily a shared birthday.

### Presenter notes

This principle guarantees that a repeated category exists; it does not identify which category. The last sentence prevents a common overstatement of the conclusion.

---

# Slide 29 / 30 — Exit ticket · show your model

1. A café offers $4$ hot drinks and $3$ cold drinks. A customer chooses one drink. How many choices are there, and which rule applies?
2. From $9$ distinct students, how many three-person committees are possible?
3. Find the coefficient of $x^3$ in $(x+2)^5$.
4. Explain in one sentence why $\binom{8}{3}$ is not the answer to “arrange $3$ of $8$ books on a shelf.”

Write one sentence of reasoning for each answer.

### Presenter notes

Expected answers: 1. $4+3=7$, sum rule, because the drink types are disjoint choices. 2. $\binom93=84$. 3. $\binom52x^3(2^2)$ gives coefficient $40$. 4. A shelf order matters, so each chosen group has $3!$ different orders.

---

# Slide 30 / 30 — What today was about

- Use the **sum rule** for disjoint alternatives and the **product rule** for stages of a process.
- Use a **permutation** when order matters; use a **combination** when it does not.
- $\binom nk$ counts $k$-element selections from $n$ distinct objects.
- Pascal’s triangle gives binomial coefficients, and the **binomial theorem** expands $(a+b)^n$.
- Counting one collection in two ways can prove an identity.

**Homework 7:** ten counting problems. For every answer, state the rule used and explain why the cases are disjoint or why order matters.

**Next session:** Midterm — Sessions 1–7.

### Presenter notes

End by asking students to say the key diagnostic question before choosing a formula: “Does order matter?” Remind them that a correct number with an unexplained model earns less credit than a justified solution.
