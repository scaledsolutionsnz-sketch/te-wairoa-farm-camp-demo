/* Te Wairoa Farm Camp - site script */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- opening animation ---- */
  var intro = document.getElementById('intro');
  if (intro) {
    var close = function () { intro.classList.add('done'); };
    window.addEventListener('load', function () { setTimeout(close, reduce ? 0 : 900); });
    setTimeout(close, 2600);
  }

  /* ---- gmail compose links (built in JS so the address is never in the HTML) ---- */
  document.querySelectorAll('a[data-gmail]').forEach(function (a) {
    var to = a.getAttribute('data-user') + '@' + a.getAttribute('data-domain');
    a.href = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(to) +
      '&su=' + (a.getAttribute('data-su') || '') +
      '&body=' + (a.getAttribute('data-body') || '');
    a.target = '_blank';
    a.rel = 'noopener';
  });

  /* ---- nav ---- */
  var nav = document.querySelector('.nav');
  var burger = document.querySelector('.burger');
  var drawer = document.querySelector('.drawer');

  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('stuck', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  if (burger && drawer) {
    burger.addEventListener('click', function () {
      var open = drawer.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    drawer.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        drawer.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- hero photo rotation ---- */
  var slides = document.querySelectorAll('.hero__slide');
  if (slides.length > 1 && !reduce) {
    var s = 0;
    setInterval(function () {
      slides[s].classList.remove('active');
      s = (s + 1) % slides.length;
      slides[s].classList.add('active');
    }, 5600);
  }

  /* ---- hero review quote rotation ---- */
  var quotes = document.querySelectorAll('.hero__q');
  if (quotes.length > 1 && !reduce) {
    var q = 0;
    setInterval(function () {
      quotes[q].classList.remove('active');
      q = (q + 1) % quotes.length;
      quotes[q].classList.add('active');
    }, 6200);
  }

  /* ---- reveal on scroll ---- */
  var rv = document.querySelectorAll('.rv');
  if (!rv.length) return;
  if (reduce || !('IntersectionObserver' in window)) {
    rv.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  rv.forEach(function (el, i) {
    el.style.transitionDelay = (Math.min(i % 3, 2) * 90) + 'ms';
    io.observe(el);
  });
})();
