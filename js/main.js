/* ==========================================================================
   Mircea Eliade reading guide, site behaviour
   No dependencies. Four small features:
   1. Theme toggle (light / dark), remembered in localStorage
   2. Mobile navigation toggle
   3. Gentle scroll reveal with IntersectionObserver
   4. Works page category filter
   ========================================================================== */

(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --------------------------------------------------------------
     1. Theme
     -------------------------------------------------------------- */

  var THEME_KEY = 'eliade-theme';
  var themeButton = document.getElementById('theme-toggle');
  var systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  function currentTheme() {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function applyTheme(theme, remember) {
    root.setAttribute('data-theme', theme);
    if (remember) {
      try { localStorage.setItem(THEME_KEY, theme); } catch (e) { /* private mode */ }
    }
    if (themeButton) {
      var next = theme === 'dark' ? 'light' : 'dark';
      var nextLabel = next === 'dark' ? 'Întunecat' : 'Luminos';
      var nextHint = next === 'dark' ? 'Comută la tema întunecată' : 'Comută la tema luminoasă';
      themeButton.textContent = nextLabel;
      themeButton.setAttribute('aria-label', nextHint);
      themeButton.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      themeButton.setAttribute('title', nextHint);
    }
  }

  if (themeButton) {
    applyTheme(currentTheme(), false);

    themeButton.addEventListener('click', function () {
      applyTheme(currentTheme() === 'dark' ? 'light' : 'dark', true);
    });

    // Follow the system only while the visitor has not chosen explicitly.
    var handleSystemChange = function (event) {
      var stored = null;
      try { stored = localStorage.getItem(THEME_KEY); } catch (e) { /* ignore */ }
      if (!stored) { applyTheme(event.matches ? 'dark' : 'light', false); }
    };

    if (systemDark.addEventListener) {
      systemDark.addEventListener('change', handleSystemChange);
    } else if (systemDark.addListener) {
      systemDark.addListener(handleSystemChange);
    }
  }

  /* --------------------------------------------------------------
     2. Mobile navigation
     -------------------------------------------------------------- */

  var header = document.querySelector('.site-head');
  var navButton = document.getElementById('nav-toggle');

  if (header && navButton) {
    var setNav = function (open) {
      header.classList.toggle('is-open', open);
      navButton.setAttribute('aria-expanded', open ? 'true' : 'false');
      navButton.textContent = open ? 'Închide' : 'Meniu';
    };

    navButton.addEventListener('click', function () {
      setNav(!header.classList.contains('is-open'));
    });

    header.addEventListener('click', function (event) {
      if (event.target.closest('a')) { setNav(false); }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && header.classList.contains('is-open')) {
        setNav(false);
        navButton.focus();
      }
    });
  }

  /* --------------------------------------------------------------
     3. Scroll reveal
     Motion is skipped entirely when the visitor prefers reduced
     motion, and also when IntersectionObserver is unavailable.
     -------------------------------------------------------------- */

  var revealItems = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));

  if (!reduceMotion && revealItems.length && 'IntersectionObserver' in window) {
    root.classList.add('js');
    window.__eliadeRevealReady = true;

    // Stagger siblings inside groups, so lists cascade instead of popping.
    Array.prototype.forEach.call(document.querySelectorAll('[data-reveal-group]'), function (group) {
      var children = group.querySelectorAll('[data-reveal]');
      Array.prototype.forEach.call(children, function (child, index) {
        child.style.setProperty('--reveal-delay', (index % 6) * 70 + 'ms');
      });
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });

    revealItems.forEach(function (item) { observer.observe(item); });
  }

  /* --------------------------------------------------------------
     4. Works page filter
     -------------------------------------------------------------- */

  var worksGrid = document.getElementById('works-grid');

  if (worksGrid) {
    var filterButtons = Array.prototype.slice.call(document.querySelectorAll('.filter-btn'));
    var works = Array.prototype.slice.call(worksGrid.querySelectorAll('.work'));
    var status = document.getElementById('works-status');
    var empty = document.getElementById('works-empty');

    var applyFilter = function (filter) {
      var shown = 0;

      works.forEach(function (work) {
        var match = filter === 'all' || work.getAttribute('data-cat') === filter;
        work.hidden = !match;
        if (match) { shown += 1; }
      });

      filterButtons.forEach(function (button) {
        button.setAttribute('aria-pressed', button.getAttribute('data-filter') === filter ? 'true' : 'false');
      });

      worksGrid.classList.toggle('is-odd', shown % 2 === 1);

      if (status) {
        status.textContent = 'Se afișează ' + shown + ' din ' + works.length + ' titluri.';
      }
      if (empty) { empty.hidden = shown !== 0; }
    };

    filterButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        applyFilter(button.getAttribute('data-filter'));
      });
    });

    applyFilter('all');
  }
})();
