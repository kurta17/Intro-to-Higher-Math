/* ============================================================
   Injected into a deck by review.mjs. Measures what only a
   browser knows: rendered type sizes, real contrast ratios,
   how much of the 1280x720 box is actually used, line lengths.
   Writes its findings into <script id="deck-review">.
   Never shipped with a deck - it is appended to a temp copy.
   ============================================================ */
(function () {
  var W = 1280, H = 720;

  function parseColor(c) {
    var m = /rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/.exec(c || '');
    return m ? { r: +m[1], g: +m[2], b: +m[3], a: m[4] === undefined ? 1 : +m[4] } : null;
  }
  function lum(c) {
    var f = [c.r, c.g, c.b].map(function (v) {
      v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * f[0] + 0.7152 * f[1] + 0.0722 * f[2];
  }
  function over(fg, bg) {                       // composite fg (with alpha) onto bg
    var a = fg.a;
    return { r: fg.r * a + bg.r * (1 - a), g: fg.g * a + bg.g * (1 - a),
             b: fg.b * a + bg.b * (1 - a), a: 1 };
  }
  function bgOf(el) {
    var stack = [], n = el;
    while (n && n.nodeType === 1) {
      var c = parseColor(getComputedStyle(n).backgroundColor);
      if (c && c.a > 0) { stack.push(c); if (c.a === 1) break; }
      n = n.parentElement;
    }
    var base = { r: 255, g: 255, b: 255, a: 1 };
    for (var i = stack.length - 1; i >= 0; i--) base = over(stack[i], base);
    return base;
  }
  function contrast(a, b) {
    var l1 = lum(a), l2 = lum(b);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  }

  // leaf-ish elements that actually paint text
  function textNodes(root) {
    var out = [];
    var walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        var p = n.parentElement;
        if (!p || p.closest('.notes, script, .katex-html')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var n; while ((n = walk.nextNode())) out.push(n.parentElement);
    return out;
  }

  function measure(slide, index) {
    var sr = slide.getBoundingClientRect();
    var els = textNodes(slide);
    var sizes = {}, small = [], lowContrast = [], longLines = [];
    var inkArea = 0, maxBottom = 0;

    els.forEach(function (el) {
      var s = getComputedStyle(el);
      var px = Math.round(parseFloat(s.fontSize));
      // KaTeX nests spans at many intrinsic sizes; counting them would make
      // every maths slide look typographically undisciplined. Authored text only.
      if (!el.closest('.katex')) sizes[px] = (sizes[px] || 0) + 1;

      // Measure the TEXT, not the block box: a <p> and the <strong> inside it
      // both report a rect, and summing element boxes double-counts wildly
      // (it produced "90% ink", which is impossible). Ranges measure glyphs.
      var rects = [];
      for (var i = 0; i < el.childNodes.length; i++) {
        var cn = el.childNodes[i];
        if (cn.nodeType !== 3 || !cn.nodeValue.trim()) continue;
        var rg = document.createRange(); rg.selectNodeContents(cn);
        var rl = rg.getClientRects();
        for (var j = 0; j < rl.length; j++) rects.push(rl[j]);
      }
      if (!rects.length) return;
      rects.forEach(function (r) { inkArea += r.width * r.height; });

      var inFooter = !!el.closest('.s-foot');
      if (!inFooter) {
        rects.forEach(function (r) { maxBottom = Math.max(maxBottom, r.bottom - sr.top); });
      }

      var txt = (el.textContent || '').trim();
      // Labels are meant to be small: footers, kickers, tags, chips, stat
      // captions, activity headers and table cells are chrome, not body copy.
      if (px < 17 && txt.length > 12 &&
          !el.closest('.s-foot, .kicker, .tag, .cap, .chip, .activity > header, table')) {
        small.push({ px: px, text: txt.slice(0, 42) });
      }
      var ratio = contrast(over(parseColor(s.color) || { r: 0, g: 0, b: 0, a: 1 }, bgOf(el)), bgOf(el));
      var big = px >= 24 || (px >= 19 && (+s.fontWeight >= 500));
      var need = big ? 3 : 4.5;
      if (ratio < need && txt.length > 3) {
        lowContrast.push({ ratio: +ratio.toFixed(2), px: px, need: need, chrome: inFooter,
                           text: txt.slice(0, 36) });
      }
      if (el.tagName === 'P' || el.tagName === 'LI') {
        var lh = parseFloat(s.lineHeight) || px * 1.4;
        var chars = txt.length, lines = Math.max(1, rects.length);
        var perLine = Math.round(chars / lines);
        if (perLine > 95 && chars > 90) longLines.push({ perLine: perLine, text: txt.slice(0, 36) });
      }
    });

    return {
      n: index + 1,
      kind: /\btitle\b/.test(slide.className) ? 'title'
          : /\bsection\b/.test(slide.className) ? 'section'
          : /\bdark\b/.test(slide.className) ? 'dark' : 'content',
      heading: (slide.querySelector('h1, h2') || {}).textContent
                 ? slide.querySelector('h1, h2').textContent.trim() : '(untitled)',
      overflowPx: Math.max(0, slide.scrollHeight - slide.clientHeight),
      contentBottom: Math.round(maxBottom),
      tailGapPx: Math.round(H - 68 - maxBottom),        // 68 = footer rule + band
      inkRatio: +(inkArea / (W * H)).toFixed(4),
      distinctSizes: Object.keys(sizes).length,
      sizeHistogram: sizes,
      smallText: small.slice(0, 6),
      lowContrast: lowContrast.slice(0, 8),
      longLines: longLines.slice(0, 4),
      elementCount: els.length
    };
  }

  function emit() {
    var slides = [].slice.call(document.querySelectorAll('.slide'));
    var data = slides.map(measure);
    var s = document.createElement('script');
    s.type = 'application/json';
    s.id = 'deck-review';
    s.textContent = JSON.stringify(data);
    document.body.appendChild(s);
    document.documentElement.setAttribute('data-review-ready', '1');
  }

  // Wait for deck.js to finish KaTeX, then measure. No requestAnimationFrame:
  // under --virtual-time-budget the rAF callback is starved often enough that
  // roughly every other run produced no output at all. getBoundingClientRect
  // forces layout synchronously, so a timer is all we need.
  function poll() {
    var tries = 0;
    (function wait() {
      if (document.documentElement.getAttribute('data-deck-ready') === '1') return emit();
      if (++tries > 600) { document.documentElement.setAttribute('data-review-early', '1'); return emit(); }
      setTimeout(wait, 10);
    })();
  }
  // Start from the load event, not immediately: deck.js boots on
  // DOMContentLoaded, and under virtual time a poll started during parse burns
  // its whole budget before the deck has run.
  if (document.readyState === 'complete') poll();
  else window.addEventListener('load', poll);
})();
