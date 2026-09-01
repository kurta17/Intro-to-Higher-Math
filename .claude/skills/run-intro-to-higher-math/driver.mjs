#!/usr/bin/env node
/* ============================================================
   Intro to Higher Math - deck driver.
   Headless-Chrome harness for the HS-branded slide decks:
   render, screenshot, export, and lint them without a human
   ever opening a window.

   Usage:  node .claude/skills/run-intro-to-higher-math/driver.mjs <cmd> [args]
     list                      sessions from course/course.json + deck status
     check <deck.html>         slide count, titles, overflow, unrendered TeX, errors
     shot  <deck.html> [n|all] PNG per slide  -> build/<deck>/slide-NN.png
     contact <deck.html>       whole deck as a thumbnail grid, one PNG
     pdf   <file.html> [solutions]  print/export -> build/<session>-<file>.pdf
     open  <deck.html> [n]     serve + open a Chrome window (presenting)
     new   <session-number>    scaffold sessions/session-NN/{slides,problem-set}.html
     serve [port]              static server on 127.0.0.1 (default 8177)
   ============================================================ */
import { execFileSync, spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { createReadStream, statSync } from 'node:fs';
import { existsSync, mkdirSync, readFileSync, writeFileSync, rmSync, readdirSync } from 'node:fs';
import { dirname, resolve, basename, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const SKILL_DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(SKILL_DIR, '../../..');          // <unit>/
const BUILD = join(ROOT, 'build');
const PORT = Number(process.env.PORT || 8177);
const W = 1280, H = 720;

/* ---------- chrome ---------- */
function chrome() {
  if (process.env.CHROME && existsSync(process.env.CHROME)) return process.env.CHROME;
  const candidates = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
    '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser',
  ];
  for (const c of candidates) if (existsSync(c)) return c;
  die('No Chrome found. Set CHROME=/path/to/chrome');
}

const BASE_FLAGS = [
  '--headless=new', '--disable-gpu', '--hide-scrollbars',
  '--no-first-run', '--no-default-browser-check',
  '--force-color-profile=srgb', '--font-render-hinting=none',
  '--allow-file-access-from-files',
];

function run(args, { timeout = 120000, retries = 1 } = {}) {
  mkdirSync(BUILD, { recursive: true });
  for (let attempt = 0; ; attempt++) {
    try {
      // Chrome writes noise to stderr on every run; only the exit code matters.
      return execFileSync(chrome(), args, { timeout, stdio: ['ignore', 'pipe', 'pipe'] });
    } catch (e) {
      if (e.code === 'ETIMEDOUT' && attempt < retries) {
        console.error(`  (chrome hung, retrying ${attempt + 1}/${retries})`);
        continue;
      }
      throw e;
    }
  }
}

function die(msg) { console.error('error: ' + msg); process.exit(1); }

/* ---------- deck url ---------- */
function deckUrl(deck, query = '', hash = '') {
  const p = resolve(ROOT, deck);
  if (!existsSync(p)) die(`no such deck: ${deck}`);
  return pathToFileURL(p).href + (query ? '?' + query : '') + (hash ? '#' + hash : '');
}
function deckName(deck) { return basename(dirname(resolve(ROOT, deck))); }
// build/<session>-<file>.pdf so slides.pdf and problem-set.pdf can coexist
function docName(deck) {
  const f = basename(resolve(ROOT, deck)).replace(/\.html?$/i, '');
  return `${deckName(deck)}-${f}`;
}

/* ---------- commands ---------- */
function cmdList() {
  const c = JSON.parse(readFileSync(join(ROOT, 'course/course.json'), 'utf8'));
  console.log(`${c.code}  ${c.title}  (${c.dates.start} -> ${c.dates.end})\n`);
  for (const s of c.sessions) {
    const dir = `sessions/session-${String(s.n).padStart(2, '0')}`;
    const has = existsSync(join(ROOT, dir, 'slides.html'));
    console.log(
      `${String(s.n).padStart(2)}  wk${s.week} ${s.day.slice(0, 3)} ${s.date}  ` +
      `${has ? '[deck]' : '[   -]'}  ${s.title}`
    );
  }
}

function diag(deck) {
  const tmp = join(BUILD, '.dom.html');
  mkdirSync(BUILD, { recursive: true });
  const out = run([...BASE_FLAGS, `--window-size=${W},${H}`,
    '--virtual-time-budget=12000', '--dump-dom', deckUrl(deck, 'mode=scroll&diag=1')]);
  writeFileSync(tmp, out);
  const m = out.toString().match(/<script type="application\/json" id="deck-diag">([\s\S]*?)<\/script>/);
  if (!m) die('deck never reported diagnostics - deck.js did not run. DOM dumped to build/.dom.html');
  rmSync(tmp, { force: true });
  return JSON.parse(m[1]);
}

function cmdCheck(deck) {
  const d = diag(deck);
  console.log(`deck: ${deck}`);
  console.log(`slides: ${d.slides}`);
  d.titles.forEach((t, i) => console.log(`  ${String(i + 1).padStart(2)}. ${t}`));
  let bad = 0;
  console.log(`\nkatex loaded: ${d.katex ? 'yes' : 'NO'}`);
  if (!d.katex) bad++;
  if (d.unrenderedTeX.length) { console.log(`unrendered TeX on slides: ${d.unrenderedTeX.join(', ')}`); bad++; }
  else console.log('unrendered TeX: none');
  if (d.overflows.length) {
    console.log('OVERFLOW (content taller than the 720px slide):');
    d.overflows.forEach(o => console.log(`  slide ${o.n}: +${o.over}px`));
    bad++;
  } else console.log('overflow: none');
  if (d.errors.length) { console.log('errors:'); d.errors.forEach(e => console.log('  ' + e)); bad++; }
  else console.log('errors: none');
  console.log(bad ? '\nFAIL' : '\nOK');
  process.exit(bad ? 1 : 0);
}

function cmdShot(deck, which = 'all') {
  const n = diag(deck).slides;
  const name = deckName(deck);
  const dir = join(BUILD, name);
  mkdirSync(dir, { recursive: true });
  const list = which === 'all'
    ? Array.from({ length: n }, (_, i) => i + 1)
    : [parseInt(which, 10)];
  for (const i of list) {
    if (i < 1 || i > n) die(`slide ${i} out of range (1..${n})`);
    const out = join(dir, `slide-${String(i).padStart(2, '0')}.png`);
    run([...BASE_FLAGS, `--window-size=${W},${H}`, '--virtual-time-budget=10000',
      `--screenshot=${out}`, deckUrl(deck, 'mode=present', String(i))]);
    console.log(out.replace(ROOT + '/', ''));
  }
}

/* One Chrome process for the whole deck instead of one per slide.
   `shot all` on a 20-slide deck takes minutes; this takes seconds and is
   what you want when reviewing a deck you just edited. */
function cmdContact(deck) {
  const n = diag(deck).slides;
  const out = join(BUILD, `${docName(deck)}-contact.png`);
  const rows = Math.ceil(n / 4);
  // 320x180 thumbs, 4 across. A full-size stacked canvas (1280 x 15000+)
  // makes headless Chrome hang; this stays small and renders in seconds.
  run([...BASE_FLAGS, `--window-size=1376,${rows * 196 + 40}`,
    '--virtual-time-budget=20000', `--screenshot=${out}`,
    deckUrl(deck, 'mode=thumbs')]);
  console.log(`${out.replace(ROOT + '/', '')}  (${n} slides, ${rows} rows)`);
}

function cmdPdf(deck, flag) {
  // `solutions` reveals .solution blocks in a handout (see brand/handout.js)
  const sol = flag === 'solutions';
  mkdirSync(BUILD, { recursive: true });
  const out = join(BUILD, `${docName(deck)}${sol ? '-solutions' : ''}.pdf`);
  run([...BASE_FLAGS, `--window-size=${W},${H}`, '--virtual-time-budget=15000',
    '--no-pdf-header-footer', `--print-to-pdf=${out}`,
    deckUrl(deck, 'mode=print' + (sol ? '&solutions=1' : ''))]);
  console.log(out.replace(ROOT + '/', ''));
}

/* ---------- static server ----------
   `open` presents over http rather than file://: a short stable URL you can
   also point a second machine or a tablet at. (file:// works too - the
   vendored fonts and KaTeX load fine from it; verified with document.fonts.) */
const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf',
  '.png': 'image/png', '.svg': 'image/svg+xml', '.pdf': 'application/pdf',
};
function startServer(port = PORT) {
  const srv = createServer((req, res) => {
    const rel = decodeURIComponent(req.url.split('?')[0].split('#')[0]).replace(/^\/+/, '');
    const file = resolve(ROOT, rel || 'index.html');
    if (!file.startsWith(ROOT)) { res.writeHead(403).end('forbidden'); return; }
    let st; try { st = statSync(file); } catch { res.writeHead(404).end('not found'); return; }
    if (st.isDirectory()) { res.writeHead(404).end('not found'); return; }
    const ext = file.slice(file.lastIndexOf('.'));
    res.writeHead(200, { 'content-type': MIME[ext] || 'application/octet-stream',
                         'cache-control': 'no-store' });
    createReadStream(file).pipe(res);
  });
  return new Promise((ok, no) => {
    srv.once('error', no);
    srv.listen(port, '127.0.0.1', () => ok(srv));
  });
}

async function cmdServe(port) {
  const p = Number(port) || PORT;
  await startServer(p);
  console.log(`serving ${ROOT} at http://127.0.0.1:${p}/  (ctrl-c to stop)`);
}

async function cmdOpen(deck, n = '1') {
  resolve(ROOT, deck);
  if (!existsSync(resolve(ROOT, deck))) die(`no such deck: ${deck}`);
  let live = true;
  try { await startServer(); live = false; } catch (e) {
    if (e.code !== 'EADDRINUSE') throw e;      // already serving - reuse it
  }
  const url = `http://127.0.0.1:${PORT}/${deck}?mode=present#${n}`;
  spawn(chrome(), ['--new-window', url], { detached: true, stdio: 'ignore' }).unref();
  console.log(`opened ${url}`);
  console.log('arrow keys / click to navigate' +
    (live ? '' : ' - server running in this process, ctrl-c when the lecture ends'));
  if (!live) return new Promise(() => {});      // keep the server alive
}

function cmdNew(num) {
  const c = JSON.parse(readFileSync(join(ROOT, 'course/course.json'), 'utf8'));
  const s = c.sessions.find(x => x.n === parseInt(num, 10));
  if (!s) die(`no session ${num} in course/course.json`);
  const nn = String(s.n).padStart(2, '0');
  const dir = join(ROOT, 'sessions', `session-${nn}`);
  mkdirSync(dir, { recursive: true });
  const date = new Date(s.date + 'T00:00:00Z').toUTCString().slice(0, 16);
  const subst = (tpl) => tpl
    .replaceAll('{{N}}', String(s.n))
    .replaceAll('{{TITLE}}', s.title)
    .replaceAll('{{SUBTITLE}}', s.subtitle || '')
    .replaceAll('{{GOAL}}', s.goal || '')
    .replaceAll('{{DATE}}', date);
  for (const f of ['slides.html', 'problem-set.html']) {
    const dest = join(dir, f);
    if (existsSync(dest)) { console.log('skip (exists) ' + dest.replace(ROOT + '/', '')); continue; }
    writeFileSync(dest, subst(readFileSync(join(ROOT, 'sessions/_template', f), 'utf8')));
    console.log(dest.replace(ROOT + '/', ''));
  }
  console.log(`objectives to cover:`);
  (s.objectives || []).forEach(o => console.log('  - ' + o));
}

/* ---------- dispatch ---------- */
const [cmd, ...rest] = process.argv.slice(2);
const table = { list: cmdList, check: cmdCheck, shot: cmdShot, contact: cmdContact,
                pdf: cmdPdf, open: cmdOpen, new: cmdNew, serve: cmdServe };
if (!cmd || !table[cmd]) {
  console.log(readFileSync(fileURLToPath(import.meta.url), 'utf8')
    .split('Usage:')[1].split('*/')[0].replace(/\n\s{3}/g, '\n')
    .replace(/\n=+\s*$/, '').trimEnd());
  process.exit(cmd ? 1 : 0);
}
if (!['list', 'serve'].includes(cmd) && !rest.length) die(`${cmd} needs an argument`);
table[cmd](...rest);
