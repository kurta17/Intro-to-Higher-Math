/* ============================================================
   HS deck runtime.
   Modes (via ?mode=): present (default) | scroll | print
   Exposes window.__deck for the screenshot/PDF driver.
   ============================================================ */
(function () {
  var SLIDE_W = 1280, SLIDE_H = 720;
  var errors = [];
  if (document.compatMode !== 'CSS1Compat') {
    errors.push('QUIRKS MODE - the deck is missing <!doctype html>. KaTeX will refuse to render.');
  }
  ['error', 'warn'].forEach(function (level) {
    var orig = console[level].bind(console);
    console[level] = function () {
      errors.push(level + ': ' + Array.prototype.map.call(arguments, String).join(' ').slice(0, 200));
      orig.apply(null, arguments);
    };
  });
  window.addEventListener('error', function (e) {
    errors.push(String((e && (e.message || e.type)) || 'error') +
                (e && e.target && e.target.src ? ' <- ' + e.target.src : '') +
                (e && e.target && e.target.href ? ' <- ' + e.target.href : ''));
  }, true);
  var params = new URLSearchParams(location.search);
  var mode = params.get('mode') || 'present';
  var slides = [];
  var idx = 0;

  function fill(sel, text) {
    document.querySelectorAll(sel).forEach(function (el) { el.textContent = text; });
  }

  function buildFurniture() {
    var meta = document.body.dataset;
    slides.forEach(function (s, i) {
      if (!s.querySelector('.s-foot')) {
        var f = document.createElement('footer');
        f.className = 's-foot';
        f.innerHTML = '<span class="brand"></span><span class="num"></span>';
        s.appendChild(f);
      }
      var brand = s.querySelector('.s-foot .brand');
      var num = s.querySelector('.s-foot .num');
      if (brand && !brand.textContent.trim()) {
        brand.textContent = (meta.course || 'Intro to Higher Math') +
          (meta.session ? ' · Session ' + meta.session : '');
      }
      if (num && !num.textContent.trim()) {
        num.textContent = (i + 1) + ' / ' + slides.length;
      }
    });
  }

  function scale() {
    if (mode === 'thumbs') return;                 // thumbs sizing is pure CSS
    if (mode !== 'present') { document.querySelector('.deck').style.setProperty('--scale', 1); return; }
    var k = Math.min(window.innerWidth / SLIDE_W, window.innerHeight / SLIDE_H);
    var deck = document.querySelector('.deck');
    deck.style.setProperty('--scale', k);
    deck.style.width = (SLIDE_W * k) + 'px';
    deck.style.height = (SLIDE_H * k) + 'px';
  }

  function goto(n) {
    if (mode !== 'present') {
      var t = slides[Math.max(0, Math.min(slides.length - 1, n))];
      if (t) t.scrollIntoView();
      return;
    }
    idx = Math.max(0, Math.min(slides.length - 1, n));
    slides.forEach(function (s, i) { s.classList.toggle('current', i === idx); });
    if (String(idx + 1) !== location.hash.slice(1)) {
      history.replaceState(null, '', '#' + (idx + 1));
    }
  }

  function boot() {
    slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
    buildFurniture();
    document.body.classList.add(
      mode === 'present' ? 'present' : mode === 'thumbs' ? 'thumbs' : 'scroll');
    scale();
    window.addEventListener('resize', scale);

    if (mode === 'present') {
      var start = parseInt(location.hash.slice(1), 10);
      goto(isNaN(start) ? 0 : start - 1);
      document.addEventListener('keydown', function (e) {
        if (['ArrowRight', 'PageDown', ' ', 'j'].indexOf(e.key) >= 0) { goto(idx + 1); e.preventDefault(); }
        if (['ArrowLeft', 'PageUp', 'k'].indexOf(e.key) >= 0) { goto(idx - 1); e.preventDefault(); }
        if (e.key === 'Home') goto(0);
        if (e.key === 'End') goto(slides.length - 1);
      });
      document.addEventListener('click', function (e) {
        if (e.target.closest('a')) return;
        goto(idx + (e.clientX < window.innerWidth * 0.25 ? -1 : 1));
      });
    }

    // KaTeX (loaded from CDN in the deck template). Render, then flag ready.
    var done = function () {
      document.documentElement.setAttribute('data-deck-ready', '1');
      if (params.get('diag') === '1') writeDiag();
    };
    if (window.renderMathInElement) {
      try {
        window.renderMathInElement(document.body, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '\\[', right: '\\]', display: true },
            { left: '$', right: '$', display: false },
            { left: '\\(', right: '\\)', display: false }
          ],
          throwOnError: false,
          ignoredClasses: ['notes']
        });
      } catch (err) { console.error('[deck] katex failed', err); }
    } else {
      console.warn('[deck] KaTeX not loaded - math will render as raw TeX');
    }
    done();
  }

  // Raw TeX left on the page means KaTeX never ran over it.
  function unrenderedTeX() {
    var hits = [];
    slides.forEach(function (s, i) {
      var t = s.cloneNode(true);
      // mirror KaTeX's own ignoredTags/ignoredClasses so documenting `$x$`
      // inside <code> is not reported as a rendering failure
      t.querySelectorAll('.katex, .notes, script, code, pre, textarea')
        .forEach(function (n) { n.remove(); });
      var txt = t.textContent || '';
      if (/\$|\\frac|\\begin\{/.test(txt)) hits.push(i + 1);
    });
    return hits;
  }

  function writeDiag() {
    var el = document.createElement('script');
    el.type = 'application/json';
    el.id = 'deck-diag';
    el.textContent = JSON.stringify({
      slides: slides.length,
      titles: window.__deck.titles(),
      overflows: window.__deck.overflows(),
      unrenderedTeX: unrenderedTeX(),
      katex: !!window.renderMathInElement,
      errors: errors
    });
    document.body.appendChild(el);
  }

  window.__deck = {
    goto: function (n) { goto(n - 1); },
    count: function () { return slides.length; },
    titles: function () {
      return slides.map(function (s) {
        var h = s.querySelector('h1, h2');
        return h ? h.textContent.trim() : '(untitled)';
      });
    },
    // slides whose content overflows the 720px box - the #1 authoring bug
    overflows: function () {
      return slides.map(function (s, i) {
        return { n: i + 1, over: s.scrollHeight - s.clientHeight };
      }).filter(function (r) { return r.over > 2; });
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else { boot(); }
})();
