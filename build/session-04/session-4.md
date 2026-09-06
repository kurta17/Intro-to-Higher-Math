# Session 4 — Function families

**Math102BKK · Session 4 of 15**

**Topics:** polynomial, exponential, logarithmic, and trigonometric functions.

**Goal:** learn the main types of functions, recognise their graphs, and compare how quickly they grow.

---

## Slide 1 — Function families

Today’s question: **What can the shape of a function tell us before we calculate?**

### Presenter notes

Connect to Session 3: students now know what a function is. Today gives them useful families of functions to recognise and compare. State that every graph shown today has a declared domain; when none is written, use the natural real domain of the formula.

---

## Slide 2 — Course outline

| | |
|---|---|
| 1 · Course overview and algebra refresher | 2 · Sets and set operations |
| 3 · Functions | **4 · Function families** |
| 5 · Theorem proving | 6 · Mathematical induction |
| 7 · Combinatorics and the binomial theorem | 8 · Midterm |
| 9 · GCD and divisibility | 10 · Modular arithmetic |
| 11 · Vectors | 12 · Polynomials |
| 13 · Complex numbers | 14 · Course recap and exam preparation |
| 15 · Final exam | |

**Today:** polynomial, exponential/logarithmic, and trigonometric families.

### Presenter notes

Point out the deliberate repeat: polynomials appear today as a function family and return in Session 12 for deeper algebra. The course moves from the language of functions to proof techniques next session.

---

## Slide 3 — One input rule, many possible shapes

Yesterday, a function needed a domain, a codomain, and one output for each input.

Today, compare these rules on $\mathbb{R}$:

| Function | What happens when $x$ is large and positive? |
|---|---|
| $x^2$ | grows like a square |
| $2^x$ | doubles whenever $x$ increases by $1$ |
| $\log_2 x$ | grows slowly; only defined for $x>0$ |
| $\sin x$ | repeats forever between $-1$ and $1$ |

**Warm-up:** Which function will be larger when $x$ becomes very large: $x^2$ or $2^x$? Why is checking only $x=1$ not enough?

### Presenter notes

Ask for predictions, not answers from memory. At $x=1$, $x^2=1$ and $2^x=2$; at $x=3$, $9>8$; at $x=10$, $1024>100$. This makes the need for the word “eventually” visible. Do not yet claim a formal growth theorem; it appears later.

---

## Slide 4 — By the end of today, you can…

- classify a polynomial by degree, and describe its end behaviour and roots;
- use exponent and logarithm laws only when their conditions are true;
- convert logarithms between bases and solve simple exponential or logarithmic equations;
- compare logarithmic, polynomial, and exponential growth for large inputs;
- transform a graph, and read amplitude, period, and shift from a trigonometric model.

**Success means explaining why you may use a rule, not only using it.**

### Presenter notes

Read the objectives aloud. “Possible roots” is deliberate: a degree-$n$ polynomial has at most $n$ distinct real roots, not necessarily exactly $n$. The three family sections each return to the same questions: domain, range, shape, and rate of change.

---

## Slide 5 — One transformation language works for every family

Start with the graph $y=f(x)$. For

$$g(x)=a\,f\bigl(b(x-h)\bigr)+k \qquad (b>0),$$

| Change | Effect on the graph |
|---|---|
| $h$ | move $h$ units horizontally (right if $h>0$) |
| $k$ | move $k$ units vertically (up if $k>0$) |
| $|a|$ | make the graph $|a|$ times taller; if $a<0$, turn it upside down |
| $b$ | make the graph $1/b$ times as wide |

Read from the **inside out**: change $x$ first, then change $y$.

### Presenter notes

Keep $b>0$ on this first-pass transformation rule so that the horizontal reflection case does not distract. Demonstrate with $g(x)=-2f(3(x-1))+4$: right $1$, horizontal compression by factor $1/3$, vertical stretch by $2$, vertical reflection, then up $4$. Emphasise that $f(x-3)$ shifts right, not left: to get the same old output $f(0)$, the new input must be $x=3$.

---

## Slide 6 — Function family I: Polynomials

### Polynomials: the formula tells us about the graph

Examples:

$$3, \qquad -2x+5, \qquad x^2-4x+3, \qquad 2x^5-x$$

In a simplified polynomial, the variable is not in a denominator, under a root, or in an exponent.

**Question:** Which part of a polynomial tells us what its graph does far left and far right?

### Presenter notes

Let students name familiar examples. A constant nonzero polynomial has degree $0$; the zero polynomial is special and does not have a degree under the usual convention, so leave it out of the classification discussion.

---

## Slide 7 — Degree is the largest exponent with a coefficient that is not zero

A polynomial has the form

$$p(x)=a_nx^n+a_{n-1}x^{n-1}+\cdots+a_1x+a_0,$$

where $n\geq 0$ and $a_n\ne0$. Its **degree** is $n$, and $a_n$ is its **leading coefficient**.

For this session, the coefficients $a_i$ are real numbers.

| Polynomial | Degree | Leading coefficient |
|---|---:|---:|
| $-4x^3+7x-1$ | $3$ | $-4$ |
| $5x^2-2x^5$ | $5$ | $-2$ |
| $6$ | $0$ | $6$ |

Write the largest power first before you find the degree.

### Presenter notes

Ask why $5x^2-2x^5$ has degree $5$, not $2$: position in the written expression is irrelevant. Mention that terms with coefficient zero are absent. The zero polynomial is excluded because there is no “largest exponent with nonzero coefficient.”

---

## Slide 8 — The highest-power term tells us what happens at the ends

When $x$ is very large positive or very large negative, $p(x)$ behaves like $a_nx^n$.

| Degree $n$ | Leading coefficient $a_n$ | Left end | Right end |
|---|---|---|---|
| even | positive | up | up |
| even | negative | down | down |
| odd | positive | down | up |
| odd | negative | up | down |

Here, **up** means the value becomes very large positive; **down** means it becomes very large negative.

Example: $p(x)=-2x^5+7x^2-1$ has odd degree and a negative leading coefficient, so it goes **up on the left** and **down on the right**.

### Presenter notes

“Up” means $p(x)\to+\infty$ and “down” means $p(x)\to-\infty$. Explain “leading term wins” informally: dividing by $x^n$ gives $p(x)/x^n=a_n+a_{n-1}/x+\cdots+a_0/x^n$, and all terms after $a_n$ approach $0$ as $|x|\to\infty$. This is a justification, not a slogan.

---

## Slide 9 — Roots are where the graph meets the $x$-axis

A number $r$ is a **root** (or zero) of $p$ when $p(r)=0$.

**Factor theorem**

$$p(r)=0 \quad\Longleftrightarrow\quad (x-r)\text{ is a factor of }p(x).$$

Example:

$$p(x)=x^3-4x=x(x^2-4)=x(x-2)(x+2),$$

so the roots are $-2$, $0$, and $2$.

A nonzero polynomial of degree $n$ has **at most $n$ different real roots**.

### Presenter notes

Substitute each root: $p(-2)=0$, $p(0)=0$, and $p(2)=0$. The “at most” statement is important: $x^2+1$ has no real roots, while $(x-1)^2$ has one distinct real root but degree $2$. Briefly justify the theorem: each distinct root supplies a distinct linear factor, and a degree-$n$ polynomial cannot contain more than $n$ such factors. A full complex-root statement comes in Session 13.

---

## Slide 10 — Activity 1: Read a quadratic from its formula

**Groups of three · 12 minutes**

For

$$q(x)=-(x-2)^2+3,$$

1. State the degree and leading coefficient.
2. Describe the transformation from $y=x^2$.
3. State the vertex and end behaviour.
4. Find the roots in exact form (do not use decimals).

**Share:** one group explains why the two roots are $2\pm\sqrt3$, rather than $\pm\sqrt3$.

### Presenter notes

Expected answer: degree $2$, leading coefficient $-1$; shift right $2$, up $3$, then reflect vertically; vertex $(2,3)$; both ends down. For roots, $-(x-2)^2+3=0$ is equivalent to $(x-2)^2=3$, then $x-2=\pm\sqrt3$, hence $x=2\pm\sqrt3$. The common mistake in the share prompt drops the horizontal shift.

---

## Slide 11 — Function family II: Exponentials and logarithms

### Repeated multiplication and its inverse

If adding $1$ to the input always multiplies the output by the same number, the pattern is exponential.

$$2^0=1,\quad 2^1=2,\quad 2^2=4,\quad 2^3=8$$

A logarithm answers the reverse question:

$$2^x=8 \quad\text{asks: “What exponent gives }8\text{?”}$$

### Presenter notes

This is the break divider. Read the exponent question in words before giving $x=3$. A logarithm is not an arbitrary new operation; it records the exponent in an exponential equation.

---

## Slide 12 — An exponential function has the variable in the exponent

$$f(x)=b^x, \qquad b>0,\; b\ne1$$

| Base | Behaviour | Domain and range |
|---|---|---|
| $b>1$ | growth | domain $\mathbb{R}$, range $(0,\infty)$ |
| $0<b<1$ | decay | domain $\mathbb{R}$, range $(0,\infty)$ |

Every exponential graph passes through $(0,1)$ because $b^0=1$.

The line $y=0$ is a horizontal **asymptote**: the graph approaches it but never reaches it.

### Presenter notes

Contrast $2^x$ with $x^2$: in an exponential, $x$ is in the exponent. Explain the restrictions: a negative real base does not define a real value for every real exponent, and base $1$ gives a constant function, not growth or decay. “Never reaches $0$” follows from $b^x>0$ for all real $x$ when $b>0$.

---

## Slide 13 — An exponential model uses the same multiplier at every step

Use

$$N(t)=N_0r^t,$$

where $N_0>0$ is the starting amount and $r>0$ is the multiplier per time unit.

| Multiplier $r$ | Interpretation |
|---|---|
| $r=1.20$ | increase by $20\%$ per time unit |
| $r=0.85$ | decrease by $15\%$ per time unit |

Example: $N(t)=100(1.2)^t$ gives $N(3)=172.8$.

The time unit must be named: hours, days, years, or something else.

### Presenter notes

Show the multiplication: $100\cdot1.2^3=100\cdot1.728=172.8$. A $20\%$ increase is multiplication by $1+0.20$, while a $15\%$ decrease is multiplication by $1-0.15$. Do not call any steep-looking curve “exponential”; the constant ratio test is the definition in a model.

---

## Slide 14 — Make the bases match, then set the exponents equal

For $b>0$ and $b\ne1$,

$$b^u=b^v \quad\Longrightarrow\quad u=v.$$

**Worked example**

$$\begin{aligned}
3^{2x-1}&=27\\
3^{2x-1}&=3^3\\
2x-1&=3\\
x&=2
\end{aligned}$$

Each line has the same solution as the line before it.

### Presenter notes

State the missing hypothesis before the rule: the base must be positive and different from $1$. Here $27=3^3$, so the exponents may be equated. Confirm by substitution: $3^{2(2)-1}=3^3=27$. For bases that do not conveniently match, logarithms are the next tool.

---

## Slide 15 — A logarithm is an exponent

For $b>0$, $b\ne1$, and $x>0$,

$$\log_b x=y \quad\Longleftrightarrow\quad b^y=x.$$

Examples:

$$\log_2 8=3, \qquad \log_{10}(0.01)=-2, \qquad \ln(e^5)=5.$$

| Function | Domain | Range |
|---|---|---|
| $y=\log_b x$ | $(0,\infty)$ | $\mathbb{R}$ |

There is no real value for $\log_b 0$ or $\log_b(-4)$.

### Presenter notes

Read each example as an exponential equation: $2^3=8$, $10^{-2}=0.01$, and $e^5=e^5$. The domain condition $x>0$ must be said every time a logarithm is introduced. “ln” means logarithm base $e$, where $e\approx2.71828$.

---

## Slide 16 — Log laws change multiplication into addition

For $u>0$ and $v>0$:

$$\log_b(uv)=\log_bu+\log_bv$$

$$\log_b\!\left(\frac{u}{v}\right)=\log_bu-\log_bv$$

$$\log_b(u^c)=c\log_bu$$

**This is usually false:**

$$\log_b(u+v)\ne\log_bu+\log_bv \quad\text{in general.}$$

Counterexample: with $u=v=1$, the two sides are $\log_2(1+1)=1$ and $\log_2 1+\log_2 1=0$.

### Presenter notes

The condition $u,v>0$ makes every displayed logarithm real. The product law follows directly from exponents: if $u=b^r$ and $v=b^s$, then $uv=b^{r+s}$.

---

## Slide 17 — Activity 2: First find the values of $x$ that are allowed

**Pairs · 14 minutes**

Solve over the real numbers:

$$\log_2(x-1)+\log_2(x+1)=3.$$

1. Find the values of $x$ allowed by both logarithms.
2. Combine the logarithms using a log law.
3. Solve the resulting equation.
4. Check every possible solution in the original equation.

**Share:** explain why $x=-3$ is rejected even though it solves the squared equation.

### Presenter notes

Domain: $x-1>0$ and $x+1>0$, so $x>1$. Then $\log_2((x-1)(x+1))=3$, so $x^2-1=8$, then $x^2=9$ and $x=\pm3$. The original domain retains only $x=3$. Check: $\log_2 2+\log_2 4=1+2=3$. This activity makes the log-domain condition operational rather than decorative.

---

## Slide 18 — Change a log base; compare growth only for large $n$

When $x>0$, $a>0$, $b>0$, and neither base is $1$:

$$\log_b x=\frac{\log_a x}{\log_a b}.$$

So changing the log base only multiplies the answer by a constant.

For fixed $d>1$, $k>0$, and $c>1$, when the positive integer $n$ becomes large,

$$\log_d n \quad<\quad n^k \quad<\quad c^n$$

This is called an **eventual** comparison: the inequality is true once $n$ is large enough, but it may not be true for every $n\ge1$.

### Presenter notes

For base change, choose $a=e$ in practice: $\log_bx=\ln x/\ln b$. The growth statement assumes any fixed logarithm base greater than $1$; bases between $0$ and $1$ give negative logarithms for $n>1$ and are not the intended growth convention. Give a finite comparison: $2^3=8<3^2=9$, but $2^{10}=1024>10^2=100$. We use the formal notation $\log n=o(n^k)$ and $n^k=o(c^n)$ only as optional vocabulary, not as required knowledge.

---

## Slide 19 — Activity 3: Rank the functions when $n$ is large

**Groups of three · 12 minutes**

Put these in order from slowest growth to fastest growth when $n$ is large:

$$\log_2n, \qquad n, \qquad n\log_2n, \qquad n^2, \qquad 2^n.$$

Then answer:

1. Why is $n\log_2n$ larger than $n$ once $n$ is large?
2. Why does one numerical example not prove the full ranking?
3. Which expression is most likely to grow too quickly in an algorithm?

**Share:** one group gives the complete ranking and says why “when $n$ is large” matters.

### Presenter notes

Ranking: $\log_2n<n<n\log_2n<n^2<2^n$ eventually. For $n>2$, $\log_2n>1$, so $n\log_2n>n$. The step $n\log n<n^2$ eventually follows from $\log n<n$ eventually. The exponential term is the dangerous one for large inputs, but remind students that implementation constants and input size still matter in real computing.

---

## Slide 20 — Function family III: Trigonometric functions

### Graphs that repeat

From the unit circle:

$$-1\le\sin x\le1, \qquad -1\le\cos x\le1 \qquad (x\in\mathbb{R}).$$

and, in radians,

$$\sin(x+2\pi)=\sin x, \qquad \cos(x+2\pi)=\cos x.$$

Repeating graphs can model cycles: daylight, tides, sound, rotation, and seasonal demand.

### Presenter notes

Session 3 introduced sine and cosine on the unit circle. Here the focus is graph structure and modelling. “Period $2\pi$” means $2\pi$ is the smallest positive period for sine and cosine; the displayed equations only establish that it is a period, so state the smallest-period claim verbally or prove it from one complete unit-circle turn.

---

## Slide 21 — Read a sine model from its parameters

For

$$y=A\sin\bigl(B(x-C)\bigr)+D, \qquad A\ne0,\; B>0,$$

| Feature | Value |
|---|---|
| midline | $y=D$ |
| amplitude (distance from the midline to a peak) | $|A|$ |
| period | $\dfrac{2\pi}{B}$ |
| horizontal shift | move $C$ units horizontally (right if $C>0$) |
| range | $[D-|A|,\;D+|A|]$ |

If $A<0$, the wave is turned upside down before it is moved by $D$.

### Presenter notes

Explain that amplitude is a nonnegative distance from the midline to a peak, so it is $|A|$, not $A$. The period calculation comes from demanding that the input to sine increase by $2\pi$: $B\Delta x=2\pi$, hence $\Delta x=2\pi/B$. The formula is also valid for cosine, with the same parameter meanings but a different starting shape.

---

## Slide 22 — Worked model: daily temperature

Let $t$ be hours after midnight. Consider

$$T(t)=4\sin\!\left(\frac{\pi}{12}(t-3)\right)+28.$$

| Feature | Interpretation |
|---|---|
| amplitude $4$ | temperature varies $4^\circ$ from its average |
| midline $28$ | average temperature is $28^\circ$ |
| period $24$ | one complete cycle takes 24 hours |
| range $[24,32]$ | lowest and highest temperatures predicted by the model |

The maximum occurs at $t=9$ hours; the minimum occurs at $t=21$ hours.

### Presenter notes

Period: $2\pi/(\pi/12)=24$. For a maximum, sine must be $1$: $(\pi/12)(t-3)=\pi/2+2\pi k$, so $t=9+24k$; in one day $t=9$. For a minimum, use $3\pi/2+2\pi k$, giving $t=21+24k$. Make clear that the model’s numerical values are illustrative, not a claim about every city or every day.

---

## Slide 23 — Activity 4: Interpret before calculating

**Pairs · 12 minutes**

For

$$H(t)=1.5\cos\!\left(\frac{\pi}{6}(t-2)\right)+4,$$

1. Find the amplitude, midline, period, and range.
2. When does the first maximum after $t=0$ occur?
3. Sketch one cycle. Label a maximum, a minimum, and two points where the graph crosses its midline.

**Share:** explain why the period is $12$, not $\pi/6$.

### Presenter notes

Amplitude $1.5$, midline $y=4$, period $2\pi/(\pi/6)=12$, range $[2.5,5.5]$. Cosine reaches a maximum when its input is $0+2\pi k$, so $t=2+12k$; the first one after $t=0$ is $t=2$. One cycle can run from $t=2$ to $t=14$: maximum $(2,5.5)$, midline crossings $(5,4)$ and $(11,4)$, minimum $(8,2.5)$, and next maximum $(14,5.5)$.

---

## Slide 24 — Exit ticket: work independently

1. For $p(x)=x^3-4x$, describe what happens on the far left and far right, and find all real roots.

2. Solve $5^{2x}=125$.

3. For

$$y=3\cos\!\left(\frac{\pi}{4}(t+2)\right)-1,$$

state the amplitude, period, horizontal shift, and range.

Write one sentence of justification for each answer. A correct number without its reason is incomplete.

### Presenter notes

1. $x^3-4x=x(x-2)(x+2)$, so roots $-2,0,2$; odd degree with positive leading coefficient means down on the left and up on the right. 2. $125=5^3$, so $2x=3$ and $x=3/2$. 3. Amplitude $3$; period $2\pi/(\pi/4)=8$; $t+2=t-(-2)$ means shift left $2$; range $[-4,2]$. Collect or photograph this as a quick check of where to begin next class.

---

## Slide 25 — What today was about

- The **leading term** tells us what a polynomial graph does at the ends; roots are where it meets the $x$-axis.
- An exponential has a **constant multiplier**. A logarithm records the exponent, and its input must be positive.
- For large inputs: **logarithmic < polynomial < exponential** growth.
- A trigonometric model describes repetition through **amplitude, period, shift, and midline**.

**Homework 4:** growth comparisons, legal logarithm manipulation, and one periodic-model interpretation with written justification.

**Next session:** theorem proving — direct proof, contrapositive, contradiction, and counterexample.

### Presenter notes

Finish by asking students to name one condition they must not omit: $b>0$, $b\ne1$, positive log input, or “eventually” in a growth statement. Preview that the next session asks them to justify claims like the ones made today, rather than merely use them.
