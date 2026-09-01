#!/usr/bin/env node
/* ============================================================
   verify.mjs - does this deck say things that are TRUE, and does
   it explain them?

   Two passes over one deck:

   MATH     Every <script type="application/x-hs-check"> block in a
            slide is executed against checklib.mjs. The browser
            ignores that MIME type, so the checks ship inside the
            deck and never render. A claim that cannot be executed
            is a claim nobody has checked.

   EXPLAIN  Structural rules that correlate with a slide a student
            can actually learn from: a theorem is proved or its
            proof is explicitly deferred, a definition is followed
            by an example, boxes are labelled, slides are not walls
            of text, speaker notes exist, students get to practise.

   Usage: node .claude/skills/lecture-content/verify.mjs <deck.html>
                [--math] [--explain] [--strict] [--seed N]
   Default runs both. --strict makes EXPLAIN warnings fail the run.
   ============================================================ */
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as L from './checklib.mjs';

const SKILL_DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(SKILL_DIR, '../../..');

const argv = process.argv.slice(2);
const file = argv.find(a => !a.startsWith('-'));
const flag = (f) => argv.includes(f);
const seedArg = argv.indexOf('--seed');
const doMath = flag('--math') || !(flag('--math') || flag('--explain'));
const doExplain = flag('--explain') || !(flag('--math') || flag('--explain'));
const strict = flag('--strict');

if (!file) { console.error('usage: verify.mjs <deck.html> [--math] [--explain] [--strict]'); process.exit(2); }
const path = resolve(ROOT, file);
if (!existsSync(path)) { console.error('no such deck: ' + file); process.exit(2); }
// Strip HTML comments first: the deck template documents `<section class="slide">`
// inside a comment, and a naive split counts that as a slide.
const html = readFileSync(path, 'utf8').replace(/<!--[\s\S]*?-->/g, '');

/* ---------- split into slides ---------- */
const slides = [...html.matchAll(/<section\b([^>]*)>([\s\S]*?)<\/section>/g)].map((m, i) => ({
  n: i + 1,
  attrs: m[1],
  html: m[2],
  kind: /class="[^"]*\bslide\b[^"]*\btitle\b/.test(m[1]) ? 'title'
      : /class="[^"]*\bslide\b[^"]*\bsection\b/.test(m[1]) ? 'section' : 'content',
}));
if (!slides.length) { console.error('no <section class="slide"> found - is this a deck?'); process.exit(2); }

const heading = (s) => (s.html.match(/<h[12][^>]*>([\s\S]*?)<\/h[12]>/) || [, '(untitled)'])[1]
  .replace(/<[^>]+>/g, '').trim();

/* ---------- pass 1: MATH ---------- */
const CHECK_RE = /<script[^>]*type="application\/x-hs-check"[^>]*>([\s\S]*?)<\/script>/g;
const helpers = Object.keys(L).filter(k => !k.startsWith('_'));
let mathFail = 0, mathPass = 0, slidesWithChecks = 0;

function runChecks(slide) {
  // An author who habitually escapes < in HTML gets away with it: inside a
  // <script> the parser never decodes entities, so JS would see "&lt;".
  const blocks = [...slide.html.matchAll(CHECK_RE)].map(m => m[1]
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"'));
  if (!blocks.length) return null;
  slidesWithChecks++;
  L._reset();
  if (seedArg > -1) L.reseed(Number(argv[seedArg + 1]));
  for (const code of blocks) {
    try {
      // eslint-disable-next-line no-new-func
      new Function(...helpers, code)(...helpers.map(k => L[k]));
    } catch (e) {
      L._results().push({ label: '(block failed to run)', ok: false, detail: e.message });
    }
  }
  return L._results().map(r => ({ ...r }));
}

/* ---------- pass 2: EXPLAIN ---------- */
const DEFER = /(we (will|shall) prove|proved in session|proof (is )?(deferred|omitted|in the notes)|without proof|beyond the scope|you will prove)/i;
const warnings = [];
function warn(n, rule, msg) { warnings.push({ n, rule, msg }); }

function visibleText(h) {
  return h
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<div class="notes"[\s\S]*?<\/div>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/g, ' ')
    .replace(/\s+/g, ' ').trim();
}

function explain(slide, idx) {
  const h = slide.html;
  const words = visibleText(h).split(' ').filter(Boolean).length;

  if (slide.kind === 'content') {
    if (!/<h2[\s>]/.test(h)) warn(slide.n, 'structure', 'content slide has no <h2> - students need a claim in the title');
    if (words > 120) warn(slide.n, 'density', `${words} words on one slide; a slide is a visual aid, not a paragraph`);
    if (!/<div class="notes"/.test(h)) warn(slide.n, 'notes', 'no <div class="notes"> - the next lecturer cannot teach from this');
  }

  // a theorem must be proved here, or its proof explicitly deferred
  if (/class="box thm"/.test(h) && !/class="box proof"/.test(h)
      && !DEFER.test(visibleText(h)) && !/data-proof=/.test(h)) {
    warn(slide.n, 'unproved',
      'states a theorem with no proof, no data-proof="…" declaring where it is proved, ' +
      'and no explicit deferral in the text');
  }

  // a definition needs an instance nearby
  if (/class="box def"/.test(h)) {
    const window = slides.slice(idx, idx + 3).map(s => s.html).join(' ');
    if (!/class="box example"/.test(window) && !/class="box try"/.test(window)) {
      warn(slide.n, 'abstract', 'definition with no example within the next two slides');
    }
  }

  // every callout should say what kind of thing it is
  const boxes = [...h.matchAll(/<div class="box ([a-z]+)"[^>]*>([\s\S]*?)<\/div>/g)];
  for (const b of boxes) if (!/class="tag"/.test(b[2])) warn(slide.n, 'unlabelled', `.box.${b[1]} has no <span class="tag">`);

  // mathematical assertions with nothing verifying them
  // display maths is always a claim; a themed box counts only if the slide
  // actually contains maths (a .box.pitfall can be course policy, not a claim)
  const hasClaim = /\$\$/.test(h)
    || (/class="box (thm|example|pitfall)"/.test(h) && /\$/.test(h))
    || (/class="activity"/.test(h) && /\$/.test(h));   // an activity's answers must be verified
  if (hasClaim && !CHECK_RE.test(h)) {
    CHECK_RE.lastIndex = 0;
    warn(slide.n, 'unverified', 'makes a mathematical claim with no x-hs-check block');
  }
  CHECK_RE.lastIndex = 0;
}

/* ---------- run ---------- */
console.log(`deck: ${relative(ROOT, path)}   (${slides.length} slides)\n`);

if (doMath) {
  console.log('MATH');
  for (const s of slides) {
    const res = runChecks(s);
    if (!res) continue;
    console.log(`  slide ${s.n} · ${heading(s)}`);
    for (const r of res) {
      console.log(`    ${r.ok ? 'ok  ' : 'FAIL'}  ${r.label}${r.detail ? '   — ' + r.detail : ''}`);
      r.ok ? mathPass++ : mathFail++;
    }
  }
  if (!slidesWithChecks) console.log('  (no checks in this deck)');
  console.log(`  ${mathPass} passed, ${mathFail} failed, across ${slidesWithChecks} slides\n`);
}

if (doExplain) {
  slides.forEach(explain);
  if (!slides.some(s => /class="box try"/.test(s.html)))
    warn(0, 'practice', 'deck has no .box.try - students never work anything in the room');
  if (!slides.some(s => s.kind === 'title')) warn(0, 'structure', 'deck has no title slide');

  console.log('EXPLAIN');
  if (!warnings.length) console.log('  no warnings');
  const byRule = {};
  for (const w of warnings) (byRule[w.rule] ||= []).push(w);
  for (const [rule, ws] of Object.entries(byRule)) {
    console.log(`  ${rule} (${ws.length})`);
    for (const w of ws) console.log(`    ${w.n ? 'slide ' + w.n : 'deck'}: ${w.msg}`);
  }
  console.log('');
}

const failed = mathFail > 0 || (strict && warnings.length > 0);
console.log(failed ? 'FAIL' : 'OK');
process.exit(failed ? 1 : 0);
