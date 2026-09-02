/* Topic filter for /blogs.
 *
 * Two behaviours: filter the already-rendered cards, and slide a brass rule
 * to the active topic. Matches the site's existing motion language, the
 * --ease-out curve, and responds on pointer-down rather than on release.
 *
 * If /blogs moves to server-side pagination, drop everything below the
 * marked line and render each topic as a link to /blogs?topic=<slug>.
 */
(function () {
  'use strict';

  var bar = document.getElementById('topicFilter');
  if (!bar) return;

  var list = bar.querySelector('.topics-list');
  var indicator = bar.querySelector('.topics-indicator');
  var cards = document.querySelectorAll('[data-category]');
  var empty = document.getElementById('topicEmpty');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  function place(animate) {
    var btn = list.querySelector('.topic[aria-pressed="true"]');
    if (!btn || !indicator) return;

    if (!animate || reduce.matches) indicator.style.transition = 'none';
    indicator.style.width = btn.offsetWidth + 'px';
    indicator.style.transform = 'translateX(' + btn.offsetLeft + 'px)';
    if (!animate || reduce.matches) {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { indicator.style.transition = ''; });
      });
    }
  }

  /* ---- filtering (remove this block for server-side pagination) ---- */
  function select(btn) {
    var value = btn.getAttribute('data-filter');

    list.querySelectorAll('.topic').forEach(function (t) {
      t.setAttribute('aria-pressed', String(t === btn));
    });
    place(true);

    var shown = 0;
    cards.forEach(function (card) {
      var match = value === 'all' || card.getAttribute('data-category') === value;
      card.hidden = !match;
      if (match) shown++;
    });
    if (empty) empty.hidden = shown !== 0;
  }

  bar.addEventListener('pointerdown', function (e) {
    var btn = e.target.closest('.topic');
    if (btn) select(btn);
  });
  bar.addEventListener('keydown', function (e) {
    var btn = e.target.closest('.topic');
    if (btn && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      select(btn);
    }
  });
  /* ---- end filtering block ---- */

  // the rule is measured from laid-out text, so re-place after webfonts land
  place(false);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { place(false); });
  }
  window.addEventListener('resize', function () { place(false); });
  if ('ResizeObserver' in window) new ResizeObserver(function () { place(false); }).observe(list);
})();
