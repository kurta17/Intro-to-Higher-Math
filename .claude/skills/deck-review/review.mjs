#!/usr/bin/env node
/* ============================================================
   review.mjs - a critique of a deck across four axes.

   1 COMPONENTS  is the design system used the way it was meant to be
   2 UI / UX     measured in a real browser: type sizes, contrast,
                 how much of the 1280x720 box is used, line lengths
   3 CLARITY     can a student read it: sentence length, reading ease,
                 jargon used before it is defined
   4 COVERAGE    is it ENOUGH: every objective, key term and pitfall in
                 course/course.json, plus a time budget against 180 min

   Correctness of the mathematics is NOT here - that is
   .claude/skills/lecture-content/verify.mjs. Run both.

   Usage: node .claude/skills/deck-review/review.mjs <deck.html>
              [--components] [--ui] [--clarity] [--coverage] [--strict]
   ============================================================ */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { dirname, resolve, basename, join, relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const SKILL = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(SKILL, '../../..');
const BUILD = join(ROOT, 'build');
const argv = process.argv.slice(2);
const file = argv.find(a => !a.startsWith('-'));
const has = f => argv.includes(f);
const only = ['--components', '--ui', '--clarity', '--coverage'].filter(has);
const want = s => only.length === 0 || has('--' + s);
const strict = has('--strict');
const showData = has('--data');

if (!file) { console.error('usage: review.mjs <deck.html> [--components|--ui|--clarity|--coverage] [--strict]'); process.exit(2); }
const path = resolve(ROOT, file);
if (!existsSync(path)) { console.error('no such deck: ' + file); process.exit(2); }
const raw = readFileSync(path, 'utf8');
const src = raw.replace(/<!--[\s\S]*?-->/g, '');

/* ---------- findings ---------- */
const F = [];
const add = (axis, level, where, msg) => F.push({ axis, level, where, msg });
const BLOCK = 'blocker', WARN = 'warn', NOTE = 'note';

/* ---------- slice into slides (source side) ---------- */
const slides = [...src.matchAll(/<section\b([^>]*)>([\s\S]*?)<\/section>/g)].map((m, i) => ({
  n: i + 1, attrs: m[1], html: m[2],
}));
if (!slides.length) { console.error('no <section class="slide"> found'); process.exit(2); }
const BLOCK_END = /<\/(p|li|h[1-4]|td|th|tr|div|section|ul|ol|table)>/gi;
const visible = h => h
  // Order matters: strip scripts and speaker notes BEFORE turning </div> into a
  // full stop, or the notes-stripper has no closing tag left to match and the
  // whole of <div class="notes"> is graded as if it were on the slide.
  .replace(/<script[\s\S]*?<\/script>/g, ' ')
  .replace(/<div class="notes"[\s\S]*?<\/div>/g, ' ')
  .replace(BLOCK_END, '. ')                      // a card is not a clause
  .replace(/\$\$[\s\S]*?\$\$/g, ' ')            // display maths is not prose
  .replace(/\$[^$]*\$/g, ' MATH ')              // inline maths counts as one token
  .replace(/<[^>]+>/g, ' ')
  .replace(/&[a-z]+;/g, ' ')
  .replace(/\s*\.\s*(?=\.)/g, '')             // collapse the runs of '.' that leaves
  .replace(/\s+/g, ' ').trim();
const deckText = slides.map(s => visible(s.html)).join(' ').toLowerCase();
// Same text but with the TeX left in, for coverage matching only.
const deckSource = src
  .replace(/<script[\s\S]*?<\/script>/g, ' ')
  .replace(/<[^>]+>/g, ' ').replace(/[\\{}^_]/g, ' ')
  .replace(/\s+/g, ' ').toLowerCase();

/* ============================================================
   1 · COMPONENTS
   ============================================================ */
const KNOWN_BOX = ['def', 'thm', 'proof', 'example', 'try', 'pitfall', 'note'];

/* Walk <div> depth to get each box's OWN content. A regex that grabs the next
   N characters runs straight into the following sibling box, which is how the
   first version reported nested boxes and mislabelled definitions. */
function extractBoxes(html) {
  const out = [];
  const tag = /<(\/?)div\b([^>]*)>/g;
  let m, depth = 0, open = [];
  while ((m = tag.exec(html))) {
    if (m[1]) {
      depth--;
      if (open.length && open[open.length - 1].depth === depth) {
        const b = open.pop();
        out.push({ kind: b.kind, inner: html.slice(b.start, m.index), nested: open.length > 0 });
      }
    } else {
      const cls = /class="box ([a-z-]+)"/.exec(m[2]);
      if (cls) open.push({ kind: cls[1], depth, start: m.index + m[0].length });
      depth++;
    }
  }
  return out;
}
function auditComponents() {
  const used = {};
  for (const s of slides) {
    const boxes = extractBoxes(s.html);
    for (const b of boxes) {
      used['box.' + b.kind] = (used['box.' + b.kind] || 0) + 1;
      if (!KNOWN_BOX.includes(b.kind)) add('components', BLOCK, `slide ${s.n}`, `unknown box variant .box.${b.kind} — it will render unstyled`);
      if (!/class="tag"/.test(b.inner)) add('components', WARN, `slide ${s.n}`, `.box.${b.kind} has no <span class="tag"> — the reader cannot tell what kind of statement it is`);
      if (b.nested) add('components', WARN, `slide ${s.n}`, `.box.${b.kind} is nested inside another callout`);
      if (b.kind === 'def' && /<span class="tag">\s*(theorem|proposition|lemma)/i.test(b.inner))
        add('components', WARN, `slide ${s.n}`, '.box.def is tagged as a theorem — use .box.thm');
      if (b.kind === 'thm' && /<span class="tag">\s*definition/i.test(b.inner))
        add('components', WARN, `slide ${s.n}`, '.box.thm is tagged as a definition — use .box.def');
    }
    const kinds = new Set(boxes.map(b => b.kind));
    if (kinds.size >= 5) add('components', NOTE, `slide ${s.n}`, `${kinds.size} different callout colours on one slide — the colour coding starts to lose meaning`);

    if (/class="activity"/.test(s.html)) {
      used['activity'] = (used['activity'] || 0) + 1;
      if (!/class="share"/.test(s.html)) add('components', BLOCK, `slide ${s.n}`, 'activity has no <div class="share"> — nothing gets presented back, so it is silent homework');
      if (!/class="time"/.test(s.html)) add('components', WARN, `slide ${s.n}`, 'activity header has no time box — students pace badly without one');
      if (!/class="who"/.test(s.html)) add('components', WARN, `slide ${s.n}`, 'activity header does not say who they work with');
    }
    for (const g of ['cols-2', 'cols-3', 'cols-5-7', 'cols-7-5']) {
      if (s.html.includes(`"s-body ${g}`) || s.html.includes(`class="${g}"`)) used[g] = (used[g] || 0) + 1;
    }
    const inline = (s.html.match(/ style="/g) || []).length;
    if (inline > 4) add('components', NOTE, `slide ${s.n}`, `${inline} inline style= attributes — that much ad-hoc layout usually wants a class in brand/deck.css`);
    if ((s.html.match(/class="card solid"/g) || []).length > 1) add('components', WARN, `slide ${s.n}`, 'more than one .card.solid — the emphasis card only works if there is exactly one');
  }
  if (!Object.keys(used).some(k => k.startsWith('box.') || k === 'activity'))
    add('components', WARN, 'deck', 'no callout boxes at all — every statement reads with the same weight');
  return used;
}

/* ============================================================
   2 · UI / UX  (measured in Chrome)
   ============================================================ */
function chrome() {
  for (const c of ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
                   '/Applications/Chromium.app/Contents/MacOS/Chromium',
                   '/usr/bin/google-chrome', '/usr/bin/chromium']) if (existsSync(c)) return c;
  if (process.env.CHROME) return process.env.CHROME;
  throw new Error('No Chrome found; set CHROME=');
}
function probeDeck() {
  // The temp copy must sit NEXT TO the deck: its stylesheets and deck.js are
  // referenced as ../../brand/..., and a <base href> does not rescue those on
  // file:// - Chrome loads the page but every relative asset 404s silently.
  const tmp = join(dirname(path), `.review-${basename(path)}`);
  const probe = readFileSync(join(SKILL, 'probe.js'), 'utf8');
  const html = raw + `\n<script>\n${probe}\n</script>\n`;
  writeFileSync(tmp, html);
  let m = null, out = '';
  for (let attempt = 0; attempt < 3 && !m; attempt++) {
    out = execFileSync(chrome(), [
      '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
      '--no-default-browser-check', '--force-color-profile=srgb',
      '--font-render-hinting=none', '--allow-file-access-from-files',
      '--window-size=1280,720', '--virtual-time-budget=25000', '--dump-dom',
      pathToFileURL(tmp).href + '?mode=scroll',
    ], { timeout: 120000, stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 64 * 1024 * 1024 }).toString();
    m = out.match(/<script type="application\/json" id="deck-review">([\s\S]*?)<\/script>/);
    if (!m) console.error(`  (probe produced nothing, retry ${attempt + 1}/2)`);
  }
  if (!m) {
    mkdirSync(BUILD, { recursive: true });
    writeFileSync(join(BUILD, 'review-dump.html'), out);
    rmSync(tmp, { force: true });
    throw new Error('probe never reported after 3 attempts. DOM written to build/review-dump.html — '
      + 'check that the deck loads ../../brand/deck.js and sets data-deck-ready.');
  }
  rmSync(tmp, { force: true });
  // Anchor to the <html> tag: the probe's own source is in the dumped DOM, so a
  // bare substring test matches the string literal inside the script and always fires.
  if (/<html[^>]*data-review-early/.test(out)) console.error('  (warning: measured before the deck reported ready)');
  return JSON.parse(m[1]);
}

/* Thresholds calibrated against a real 21-slide deck: text ink ran 11-47%
   of the slide (mean 22%) and the gap below the content ran 1-308px
   (mean 216). Airy is the house style, so a big tail gap is a note. */
function auditUI(M) {
  for (const s of M) {
    if (s.overflowPx > 2) add('ui', BLOCK, `slide ${s.n}`, `content overflows the slide by ${s.overflowPx}px — it is being cut off`);
    if (s.kind === 'content') {
      if (s.tailGapPx > 290) add('ui', NOTE, `slide ${s.n}`, `${s.tailGapPx}px empty below the content — room for an example, or trim the slide`);
      if (s.inkRatio > 0.42) add('ui', WARN, `slide ${s.n}`, `${Math.round(s.inkRatio * 100)}% text coverage — dense; consider splitting`);
      if (s.inkRatio < 0.09) add('ui', NOTE, `slide ${s.n}`, `${Math.round(s.inkRatio * 100)}% text coverage — very sparse`);
    }
    for (const t of s.smallText) add('ui', WARN, `slide ${s.n}`, `${t.px}px body text — unreadable past the third row: "${t.text}…"`);
    for (const c of s.lowContrast) {
      add('ui', c.ratio < 3 ? BLOCK : WARN, `slide ${s.n}`,
        `contrast ${c.ratio}:1 (needs ${c.need}:1)${c.chrome ? ' on slide chrome' : ''} — "${c.text}…"`);
    }
    for (const l of s.longLines) add('ui', NOTE, `slide ${s.n}`, `~${l.perLine} characters per line — past ~90 the eye loses the next line`);
    if (s.distinctSizes > 8) add('ui', NOTE, `slide ${s.n}`, `${s.distinctSizes} distinct authored font sizes on one slide`);
  }
}

/* ============================================================
   3 · CLARITY
   ============================================================ */
const STOP = new Set('the a an and or of to in is are be for with that this it as on at by from you your we our not but if then than into each their its'.split(' '));
function syllables(w) {
  w = w.toLowerCase().replace(/[^a-z]/g, '');
  if (w.length <= 3) return 1;
  w = w.replace(/(?:es|ed|[^l]e)$/, '');
  return (w.match(/[aeiouy]{1,2}/g) || ['x']).length;
}
function auditClarity() {
  let words = 0, sents = 0, syl = 0, hard = 0;
  for (const s of slides) {
    const text = visible(s.html);
    if (!text) continue;
    const sentences = text.split(/(?<=[.!?])\s+/).filter(x => x.split(' ').length > 2);
    for (const sent of sentences) {
      const ws = sent.split(/\s+/).filter(Boolean);
      sents++; words += ws.length;
      for (const w of ws) { const k = syllables(w); syl += k; if (k >= 3) hard++; }
      if (ws.length > 32) add('clarity', WARN, `slide ${s.n}`, `${ws.length}-word sentence — split it: "${sent.slice(0, 58)}…"`);
    }
    const wc = text.split(' ').filter(Boolean).length;
    if (/\bslide\b/.test('') === false && wc > 125 && !/class="activity"/.test(s.html))
      add('clarity', WARN, `slide ${s.n}`, `${wc} words on the slide — a slide is a visual aid, not a paragraph`);
  }
  const fre = sents ? 206.835 - 1.015 * (words / sents) - 84.6 * (syl / words) : 0;
  if (fre < 40) add('clarity', WARN, 'deck', `Flesch reading ease ${fre.toFixed(0)} — heavy going for a second-language cohort (aim 50+)`);
  return { words, sents, fre, avgSent: sents ? words / sents : 0, hardPct: words ? hard / words * 100 : 0 };
}

function auditJargon(session) {
  if (!session) return;
  const defined = new Set();
  for (const s of slides) {
    const defs = [...s.html.matchAll(/<div class="box (?:def|thm)"[\s\S]{0,600}?<\/div>/g)].map(m => m[0].toLowerCase());
    for (const t of session.keyTerms || []) if (defs.some(d => d.includes(t.toLowerCase()))) defined.add(t);
  }
  for (const t of session.keyTerms || []) {
    const inText = deckText.includes(t.toLowerCase());
    if (inText && !defined.has(t))
      add('clarity', NOTE, 'deck', `key term "${t}" is used but never appears inside a definition or theorem box`);
  }
}

/* ============================================================
   4 · COVERAGE  — is it enough?
   ============================================================ */
function keywords(sentence) {
  return [...new Set(sentence.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/)
    .filter(w => w.length > 4 && !STOP.has(w)))];
}
function coversAll(list, label, session, level) {
  for (const item of list || []) {
    const ks = keywords(item);
    if (!ks.length) continue;
    const hit = ks.filter(k => deckSource.includes(k)).length;
    if (hit / ks.length < 0.4)
      add('coverage', level, 'deck', `${label} not covered: "${item.length > 78 ? item.slice(0, 78) + '…' : item}"`);
  }
}
function timeBudget() {
  let fixed = 0, lo = 0, hi = 0, acts = 0;
  for (const s of slides) {
    const t = s.html.match(/class="time">\s*(\d+)\s*min/i);
    const k = s.html.match(/class="kicker">[^<]*?(\d+)\s*minutes?/i);
    if (t) { fixed += +t[1]; acts++; continue; }
    if (k) { fixed += +k[1]; acts++; continue; }
    if (/class="slide title"|class="slide section"/.test(s.attrs)) { lo += 0.5; hi += 1.5; }
    else { lo += 1.5; hi += 4; }          // a slide you derive on the board is not 2 minutes
  }
  return { lo: Math.round(fixed + lo), hi: Math.round(fixed + hi), fixed, acts };
}
function auditCoverage(session, course) {
  if (!session) { add('coverage', NOTE, 'deck', 'deck is not a numbered session — coverage not checked against course.json'); return null; }
  coversAll(session.objectives, 'objective', session, WARN);
  coversAll(session.pitfalls, 'pitfall', session, NOTE);
  for (const t of session.keyTerms || [])
    if (!deckSource.includes(t.toLowerCase())) add('coverage', NOTE, 'deck', `key term never mentioned: "${t}"`);
  const tb = timeBudget();
  const target = (course.logistics?.hoursPerDay || 3) * 60;
  if (tb.acts === 0) add('coverage', BLOCK, 'deck', 'no timed activity — students never work anything in the room');
  else if (tb.acts < 2 && session.type !== 'assessment') add('coverage', WARN, 'deck', `only ${tb.acts} timed activity for a ${target}-minute session`);
  // Only flag the extremes: how long a slide takes depends on the room.
  if (tb.lo > target) add('coverage', WARN, 'deck', `even at the fastest pace this runs ${tb.lo} min against a ${target}-minute session — you will run out of time`);
  if (tb.hi < target * 0.55) add('coverage', WARN, 'deck', `at the slowest pace this fills only ${tb.hi} of ${target} min — thin for a full session`);
  if (session.homework && !/homework/i.test(deckText)) add('coverage', WARN, 'deck', 'homework is never briefed on a slide');
  return tb;
}

/* ============================================================
   report
   ============================================================ */
function sessionFor() {
  const course = JSON.parse(readFileSync(join(ROOT, 'course/course.json'), 'utf8'));
  const m = /session-(\d+)/.exec(path);
  return { course, session: m ? course.sessions.find(s => s.n === +m[1]) : null };
}
const { course, session } = sessionFor();

const AXES = [
  ['components', 'COMPONENTS   design system used as intended'],
  ['ui',         'UI / UX      measured in the browser'],
  ['clarity',    'CLARITY      can a student read it'],
  ['coverage',   'COVERAGE     is the content enough'],
];

console.log(`review: ${relative(ROOT, path)}   ${slides.length} slides`
  + (session ? `   session ${session.n} — ${session.title}` : ''));

const used = want('components') ? auditComponents() : null;
let M = null;
if (want('ui')) {
  M = probeDeck();
  if (showData) {
    console.log('\n  slide  kind      ink%  tailGap  bottom  sizes  els  heading');
    for (const s of M) console.log(
      `  ${String(s.n).padStart(5)}  ${s.kind.padEnd(8)}  ${String(Math.round(s.inkRatio*100)).padStart(4)}`
      + `  ${String(s.tailGapPx).padStart(7)}  ${String(s.contentBottom).padStart(6)}`
      + `  ${String(s.distinctSizes).padStart(5)}  ${String(s.elementCount).padStart(3)}  ${s.heading.slice(0,34)}`);
  }
  auditUI(M);
}
const read = want('clarity') ? auditClarity() : null;
if (want('clarity')) auditJargon(session);
const tb = want('coverage') ? auditCoverage(session, course) : null;

for (const [axis, label] of AXES) {
  if (!want(axis)) continue;
  const mine = F.filter(f => f.axis === axis);
  const b = mine.filter(f => f.level === BLOCK).length;
  const w = mine.filter(f => f.level === WARN).length;
  const verdict = b ? 'FAIL' : w ? 'NEEDS WORK' : 'PASS';
  console.log(`\n${label}\n  ${verdict}   ${b} blocker, ${w} warn, ${mine.filter(f => f.level === NOTE).length} note`);
  if (axis === 'components' && used) console.log('  used: ' + (Object.entries(used).map(([k, v]) => `${k}×${v}`).join('  ') || 'none'));
  if (axis === 'ui' && M) {
    const avg = M.filter(s => s.kind === 'content');
    if (avg.length) console.log(`  density: ${Math.round(avg.reduce((a, s) => a + s.inkRatio, 0) / avg.length * 100)}% average ink`
      + `, tail gap ${Math.round(avg.reduce((a, s) => a + s.tailGapPx, 0) / avg.length)}px average`);
  }
  if (axis === 'clarity' && read) console.log(`  ${read.words} words, ${read.avgSent.toFixed(1)} words/sentence, reading ease ${read.fre.toFixed(0)}, ${read.hardPct.toFixed(0)}% long words`);
  if (axis === 'coverage' && tb) console.log(`  ${tb.acts} timed blocks (${tb.fixed} min stated), whole session ${tb.lo}-${tb.hi} min against ${(course.logistics.hoursPerDay) * 60} min`);
  for (const lvl of [BLOCK, WARN, NOTE]) {
    const mark = lvl === BLOCK ? '!!' : lvl === WARN ? ' !' : ' ·';
    // A colour that fails on nineteen slides is ONE defect in deck.css, not
    // nineteen slide problems. Group by the message with its specifics stripped.
    const groups = new Map();
    for (const f of mine.filter(x => x.level === lvl)) {
      const key = f.where === 'deck'
        ? f.msg.replace(/[\d.]+/g, '#')                       // keep the quote: it names the thing
        : f.msg.replace(/"[^"]*"/g, '"…"').replace(/[\d.]+/g, '#');
      if (!groups.has(key)) groups.set(key, { where: [], example: f.msg });
      groups.get(key).where.push(f.where);
    }
    for (const [, g] of groups) {
      const many = g.where.length > 1;
      const scope = many
        ? `${g.where.length}× (${g.where.slice(0, 6).join(', ')}${g.where.length > 6 ? ', …' : ''})`
        : g.where[0];
      console.log(`    ${mark} ${scope}: ${g.example}`);
    }
  }
}

const blockers = F.filter(f => f.level === BLOCK).length;
const warns = F.filter(f => f.level === WARN).length;
const failed = blockers > 0 || (strict && warns > 0);
console.log(`\n${failed ? 'FAIL' : 'OK'}   ${blockers} blocker, ${warns} warn, ${F.length - blockers - warns} note`);
process.exit(failed ? 1 : 0);
