/* ============================================================
   checklib - the assertion vocabulary available inside a deck's
   <script type="application/x-hs-check"> blocks.

   Nothing here is symbolic. Identities are established by
   randomised testing at many points, which for the polynomial /
   rational / modular claims in this syllabus is decisive in
   practice; integer and combinatorial claims are checked exactly
   with BigInt. Every run is seeded, so a failure is reproducible.
   ============================================================ */

/* ---------- seeded PRNG (reproducible failures) ---------- */
let _seed = 0x2f6e2b1;
export function reseed(s) { _seed = s >>> 0; }
function rnd() {                                  // mulberry32
  _seed |= 0; _seed = (_seed + 0x6D2B79F5) | 0;
  let t = Math.imul(_seed ^ (_seed >>> 15), 1 | _seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
const uniform = (lo, hi) => lo + rnd() * (hi - lo);
const randint = (lo, hi) => Math.floor(uniform(lo, hi + 1));

/* ---------- numeric comparison ---------- */
const TOL = 1e-9;
export function eq(a, b, tol = TOL) {
  if (typeof a === 'bigint' || typeof b === 'bigint') return BigInt(a) === BigInt(b);
  if (!isFinite(a) || !isFinite(b)) return a === b || (isNaN(a) && isNaN(b));
  return Math.abs(a - b) <= tol * Math.max(1, Math.abs(a), Math.abs(b));
}

/* ---------- number theory (exact) ---------- */
export function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; }
export function lcm(a, b) { return Math.abs(a * b) / (gcd(a, b) || 1); }
export function egcd(a, b) {              // returns [g, x, y] with ax + by = g
  if (!b) return [Math.abs(a), a < 0 ? -1 : 1, 0];
  const [g, x, y] = egcd(b, a % b);
  return [g, y, x - Math.floor(a / b) * y];
}
export function mod(a, n) { return ((a % n) + n) % n; }
export function modpow(b, e, n) {
  b = BigInt(b); e = BigInt(e); n = BigInt(n);
  let r = 1n; b %= n;
  while (e > 0n) { if (e & 1n) r = r * b % n; b = b * b % n; e >>= 1n; }
  return Number(r);
}
export function modinv(a, n) {
  const [g, x] = egcd(mod(a, n), n);
  return g === 1 ? mod(x, n) : null;
}
export function isPrime(n) {
  if (n < 2) return false;
  for (let d = 2; d * d <= n; d++) if (n % d === 0) return false;
  return true;
}
export function primeFactors(n) {
  const f = []; n = Math.abs(n);
  for (let d = 2; d * d <= n; d++) while (n % d === 0) { f.push(d); n /= d; }
  if (n > 1) f.push(n);
  return f;
}

/* ---------- combinatorics (exact, BigInt) ---------- */
export function fact(n) { let r = 1n; for (let i = 2n; i <= BigInt(n); i++) r *= i; return r; }
export function C(n, k) {
  if (k < 0 || k > n) return 0n;
  let r = 1n; k = Math.min(k, n - k);
  for (let i = 0n; i < BigInt(k); i++) r = r * (BigInt(n) - i) / (i + 1n);
  return r;
}
export function P(n, k) { let r = 1n; for (let i = 0; i < k; i++) r *= BigInt(n - i); return r; }

/* ---------- vectors ---------- */
export const dot = (u, v) => u.reduce((s, x, i) => s + x * v[i], 0);
export const norm = (u) => Math.sqrt(dot(u, u));
export const angle = (u, v) => Math.acos(dot(u, v) / (norm(u) * norm(v)));

/* ---------- complex ---------- */
export const cx = (re, im = 0) => ({ re, im });
export const cadd = (a, b) => cx(a.re + b.re, a.im + b.im);
export const csub = (a, b) => cx(a.re - b.re, a.im - b.im);
export const cmul = (a, b) => cx(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
export const cabs = (a) => Math.hypot(a.re, a.im);
export const carg = (a) => Math.atan2(a.im, a.re);
export const cpow = (a, n) => {
  const r = Math.pow(cabs(a), n), t = carg(a) * n;
  return cx(r * Math.cos(t), r * Math.sin(t));
};
export const ceq = (a, b, tol = 1e-9) => eq(a.re, b.re, tol) && eq(a.im, b.im, tol);

/* ---------- sets ---------- */
export const S = (...xs) => new Set(xs.flat());
export const union = (a, b) => new Set([...a, ...b]);
export const inter = (a, b) => new Set([...a].filter(x => b.has(x)));
export const diff = (a, b) => new Set([...a].filter(x => !b.has(x)));
export const symdiff = (a, b) => union(diff(a, b), diff(b, a));
export const subset = (a, b) => [...a].every(x => b.has(x));
export const seteq = (a, b) => subset(a, b) && subset(b, a);
export function randomSubset(universe) {
  return new Set(universe.filter(() => rnd() < 0.5));
}

/* ---------- the assertions ---------- */
/* Each returns {label, ok, detail}. The runner collects them. */
const results = [];
export function _results() { return results; }
export function _reset() { results.length = 0; reseed(0x2f6e2b1); }
function push(label, ok, detail = '') { results.push({ label, ok, detail }); return ok; }

/** A single concrete claim: fn() must return true (or a number equal to `expected`). */
export function claim(label, fn, expected) {
  try {
    const v = fn();
    const ok = expected === undefined ? v === true : eq(v, expected);
    return push(label, ok, ok ? '' : `got ${fmt(v)}${expected === undefined ? '' : `, expected ${fmt(expected)}`}`);
  } catch (e) { return push(label, false, 'threw: ' + e.message); }
}

/** Two expressions agree everywhere: f and g sampled at N random points. */
export function identity(label, f, g, opts = {}) {
  const { n = 300, lo = -6, hi = 6, domain = 'real', avoid = [], arity = f.length } = opts;
  try {
    for (let i = 0; i < n; i++) {
      const args = [];
      for (let a = 0; a < arity; a++) {
        let v, guard = 0;
        do { v = domain === 'int' ? randint(lo, hi) : uniform(lo, hi); }
        while (avoid.some(z => eq(v, z)) && ++guard < 100);
        args.push(v);
      }
      const l = f(...args), r = g(...args);
      if (!isFinite(l) && !isFinite(r)) continue;         // both undefined: not a counterexample
      if (!eq(l, r)) return push(label, false, `at (${args.map(fmt).join(', ')}): ${fmt(l)} ≠ ${fmt(r)}`);
    }
    return push(label, true, `${n} random points`);
  } catch (e) { return push(label, false, 'threw: ' + e.message); }
}

/** Two predicates describe the same set: p(x) <-> q(x) at N sampled points. */
export function equivalent(label, p, q, opts = {}) {
  const { n = 2000, lo = -12, hi = 12, domain = 'real', avoid = [] } = opts;
  try {
    for (let i = 0; i < n; i++) {
      let x, guard = 0;
      do { x = domain === 'int' ? randint(lo, hi) : uniform(lo, hi); }
      while (avoid.some(z => eq(x, z)) && ++guard < 100);
      const a = !!p(x), b = !!q(x);
      if (a !== b) return push(label, false, `at x = ${fmt(x)}: statement is ${a}, claimed set says ${b}`);
    }
    return push(label, true, `${n} sampled points`);
  } catch (e) { return push(label, false, 'threw: ' + e.message); }
}

/** A set identity, checked over random subsets of a small universe. */
export function setIdentity(label, f, g, opts = {}) {
  const { universe = [1, 2, 3, 4, 5, 6], n = 400, arity = f.length } = opts;
  try {
    for (let i = 0; i < n; i++) {
      const args = Array.from({ length: arity }, () => randomSubset(universe));
      if (!seteq(f(...args), g(...args))) {
        return push(label, false, 'differs on ' + args.map(s => `{${[...s]}}`).join(', '));
      }
    }
    return push(label, true, `${n} random subsets of {${universe}}`);
  } catch (e) { return push(label, false, 'threw: ' + e.message); }
}

/** A universally quantified statement over integers. */
export function forallInt(label, pred, opts = {}) {
  const { lo = 1, hi = 200, all = true } = opts;
  try {
    for (let k = lo; k <= hi; k++) {
      if (!pred(k)) return push(label, false, `fails at n = ${k}`);
    }
    return push(label, true, `n = ${lo}..${hi}${all ? '' : ' (sampled)'}`);
  } catch (e) { return push(label, false, 'threw: ' + e.message); }
}

/** A claim that is meant to be FALSE: the slide's counterexample must work. */
export function counterexample(label, pred, witness) {
  try {
    const ok = !pred(witness);
    return push(label, ok, ok ? `witness ${fmt(witness)} refutes it` : `witness ${fmt(witness)} does NOT refute it`);
  } catch (e) { return push(label, false, 'threw: ' + e.message); }
}

/** A counting formula, verified against brute-force enumeration. */
export function counts(label, formula, bruteForce) {
  try {
    const a = BigInt(formula()), b = BigInt(bruteForce());
    return push(label, a === b, a === b ? `${a} both ways` : `formula ${a}, enumeration ${b}`);
  } catch (e) { return push(label, false, 'threw: ' + e.message); }
}

function fmt(v) {
  if (typeof v === 'bigint') return v.toString();
  if (typeof v === 'number') return Number.isInteger(v) ? String(v) : v.toPrecision(8);
  if (v && typeof v === 'object' && 're' in v) return `${fmt(v.re)}${v.im < 0 ? '' : '+'}${fmt(v.im)}i`;
  return String(v);
}
