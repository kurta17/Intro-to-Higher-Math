# Session 2 · Lecturer speech

## Building new sets from old ones

So far, we have talked about what a set is and how membership works. Now we can use old sets to build new ones. There are three operations to know: union, intersection, and difference.

The union, (A \cup B), contains everything that is in (A), in (B), or in both. In mathematics, “or” is inclusive, so an element is still in the union if it belongs to both sets. The intersection, (A \cap B), contains only the elements the two sets share. The difference, (A \setminus B), means: start with (A), then remove anything that is also in (B).

Let’s use the example on the slide together. For the union, call out every number that appears in either set, but do not write duplicates. For the intersection, keep only the numbers that appear in both. Finally, compare (A \setminus B) with (B \setminus A). They are different, so set difference is not reversible.

## Complement and symmetric difference

Before we use a complement, we must say what the universe is. A complement means all the elements in the universe that are not in the set. Without a universe, the symbol (A^c) is incomplete. For example, the complement of the even integers inside the integers is the odd integers. But inside the real numbers, it also includes numbers such as one half.

The symmetric difference means elements that are in exactly one of the two sets. Think of it as the union without the overlap. In our example, the shared elements 3 and 4 disappear, so we keep 1, 2, and 5. This is the set version of “either one, but not both.”

## What a Venn diagram shows you

A Venn diagram gives us a picture of the set operations. Draw two overlapping circles inside a rectangle for the universe. There are four possible regions: in both sets, in (A) only, in (B) only, and in neither set.

The overlap is (A \cap B). The left-only region is (A \setminus B), and the right-only region is (B \setminus A). Everything outside both circles is the complement of (A \cup B). Which parts show the symmetric difference? It is the two outside crescents, because those elements are in exactly one set.

## …and why it is not a proof

Venn diagrams are helpful, but they are not a proof of a statement about all sets. A diagram shows one example, with one particular arrangement of sets. A theorem must work for every possible arrangement.

Use a diagram to help you guess an identity. Then prove it using definitions, one element at a time. That written proof is what you should submit. For three sets there are eight possible regions; for four there are sixteen. A hand-drawn picture can easily miss a case, so it is a good thinking tool but not final evidence.

## Translate: prose into notation, notation into prose

Work in groups of three for twelve minutes. Our universe is the numbers from 1 to 10. Let (E) be the even numbers, and let (T) be the multiples of 3. First write both sets in roster form and in set-builder form.

Then calculate each operation carefully. For every answer, ask what the symbol means in words before listing numbers. Finally, translate the English sentence into notation and translate the notation back into English. When you share, I want to hear not only the set you found, but also the sentence that explains what it represents.

## Both directions of the translation

Let’s check the answers. The even numbers are (E=\{2,4,6,8,10\}), and the multiples of three are (T=\{3,6,9\}). Their only shared element is 6, so (E \cap T=\{6\}). For (E \setminus T), we keep the even numbers that are not multiples of three: (\{2,4,8,10\}).

Now read the last expression slowly: ((E \cup T)^c) means the numbers that are not even and not multiples of three. In ordinary English, that is “neither even nor a multiple of three,” giving \(\{1,5,7\}\). Notice how translating carefully from symbols to words makes the meaning clear. Also remember that a complement is always taken inside the stated universe, which here is 1 to 10.
