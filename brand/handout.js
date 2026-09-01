/* Handout runtime: ?solutions=1 reveals the marked-up solutions. */
(function () {
  var show = new URLSearchParams(location.search).get('solutions') === '1';
  function boot() {
    if (show) document.body.classList.add('with-solutions');
    if (window.renderMathInElement) {
      window.renderMathInElement(document.body, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false }
        ],
        throwOnError: false
      });
    }
    if (document.compatMode !== 'CSS1Compat') {
      console.error('QUIRKS MODE - missing <!doctype html>; KaTeX will not render.');
    }
    document.documentElement.setAttribute('data-deck-ready', '1');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
