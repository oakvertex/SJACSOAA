/* ===========================
   Smooth scroll polyfill (Safari)
   =========================== */
(function () {
  if ('scrollBehavior' in document.documentElement.style) return;
  function lerp(a, b, t) { return a + (b - a) * t; }
  function smoothScrollTo(targetY, duration) {
    var startY = window.scrollY;
    var startTime = null;
    function step(ts) {
      if (!startTime) startTime = ts;
      var elapsed = ts - startTime;
      var t = Math.min(elapsed / duration, 1);
      var ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      window.scrollTo(0, lerp(startY, targetY, ease));
      if (elapsed < duration) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var id = this.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      var navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 68;
      var targetY = target.getBoundingClientRect().top + window.scrollY - navH;
      smoothScrollTo(targetY, 600);
    });
  });
})();

/* ===========================
   Inline data — no fetch() required
   =========================== */
var EVENTS_DATA = [
  {
    "id": "cny-2026",
    "title": "CNY Celebration 2026",
    "subtitle": "Hong Kong Joint Schools Alumni Association",
    "date": "2026",
    "dateISO": "2026-01-01",
    "photo": "images/events/cny-2026.jpg",
    "description": "SJACSOAA joined the Hong Kong Joint Schools Alumni Association's Chinese New Year celebration.",
    "upcoming": false
  },
  {
    "id": "agm-2025",
    "title": "SJACSOAA AGM Dinner",
    "subtitle": "",
    "date": "18 October 2025",
    "dateISO": "2025-10-18",
    "photo": "images/events/agm-2025.jpg",
    "description": "Our annual general meeting and dinner, bringing SJACS alumni together across graduating years.",
    "upcoming": false
  },
  {
    "id": "agm-2024",
    "title": "SJACSOAA AGM Dinner",
    "subtitle": "",
    "date": "27 October 2024",
    "dateISO": "2024-10-27",
    "photo": "images/events/agm-2024.jpg",
    "description": "Our annual general meeting and dinner, bringing SJACS alumni together across graduating years.",
    "upcoming": false
  }
];

var DIRECTORY_DATA = [
  {
    "id": 1,
    "name": "Yim, Ngok Hon",
    "chineseName": "嚴岳翰",
    "nickname": "Pizza",
    "year": ["1985"],
    "form7year": ["1987"],
    "class": ["Form 5E"],
    "showEmail": false,
    "email": ""
  },
  {
    "id": 2,
    "name": "Simon So",
    "chineseName": "蘇丞尉",
    "nickname": "薯蘇",
    "year": ["1986"],
    "form7year": [],
    "class": ["Form 5B"],
    "showEmail": false,
    "email": ""
  },
  {
    "id": 3,
    "name": "John Kwong Yuen Chan",
    "chineseName": "陳廣源",
    "nickname": "",
    "year": ["1970"],
    "form7year": [],
    "class": ["Form 5C"],
    "showEmail": false,
    "email": ""
  }
];

/* ===========================
   Hamburger menu + page init
   =========================== */
document.addEventListener('DOMContentLoaded', function () {
  var navbar  = document.getElementById('navbar');
  var toggle  = document.getElementById('nav-toggle');
  var navLinks = document.querySelectorAll('.nav-links a');

  if (toggle && navbar) {
    toggle.addEventListener('click', function () {
      navbar.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(navbar.classList.contains('nav-open')));
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (navbar) navbar.classList.remove('nav-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ===========================
     Events rendering (index.html)
     =========================== */
  var eventsSection = document.getElementById('events-cards');
  if (eventsSection) {
    if (!EVENTS_DATA || EVENTS_DATA.length === 0) {
      eventsSection.innerHTML = '<p>No events to display at this time.</p>';
    } else {
      eventsSection.innerHTML = '';
      var recentEvents = EVENTS_DATA.slice().sort(function (a, b) {
        return (b.dateISO || '').localeCompare(a.dateISO || '');
      }).slice(0, 3);
      recentEvents.forEach(function (ev) {
        var article = document.createElement('article');
        article.className = 'card';
        var subtitle = ev.subtitle
          ? '<p class="card-subtitle">' + escHtml(ev.subtitle) + '</p>'
          : '';
        article.innerHTML =
          '<div class="card-img-wrap">' +
            '<img src="' + escHtml(ev.photo) + '" alt="' + escHtml(ev.title) + ' group photo" loading="lazy">' +
            '<div class="photo-placeholder" aria-hidden="true">Photo coming soon</div>' +
          '</div>' +
          '<div class="card-body">' +
            '<h3 class="card-title">' + escHtml(ev.title) + '</h3>' +
            subtitle +
            '<p class="card-date">' + escHtml(ev.date) + '</p>' +
            '<p class="card-desc">' + escHtml(ev.description) + '</p>' +
          '</div>';
        var img = article.querySelector('img');
        img.addEventListener('load', function () {
          var ph = article.querySelector('.photo-placeholder');
          if (ph) ph.style.display = 'none';
        });
        img.addEventListener('error', function () {
          img.classList.add('broken');
        });
        eventsSection.appendChild(article);
      });
    }
  }

  /* ===========================
     Gallery rendering + lightbox (gallery.html)
     =========================== */
  var galleryGrid = document.getElementById('gallery-grid');
  if (galleryGrid) {

    /* --- Lightbox setup --- */
    var lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Photo viewer');
    lightbox.innerHTML =
      '<button class="lightbox-close" id="lightbox-close" aria-label="Close photo viewer">×</button>' +
      '<img class="lightbox-img" id="lightbox-img" src="" alt="" />';
    document.body.appendChild(lightbox);

    var lbImg        = document.getElementById('lightbox-img');
    var lbClose      = document.getElementById('lightbox-close');
    var lbPrevFocus  = null;

    function openLightbox(src, alt) {
      lbImg.src = src;
      lbImg.alt = alt;
      lbPrevFocus = document.activeElement;
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      lbClose.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
      lbImg.src = '';
      if (lbPrevFocus) lbPrevFocus.focus();
    }

    lbClose.addEventListener('click', closeLightbox);

    /* Click on dark backdrop (not the image) closes the overlay */
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
    });

    /* --- Render cards --- */
    if (!EVENTS_DATA || EVENTS_DATA.length === 0) {
      galleryGrid.innerHTML = '<p>No photos to display at this time.</p>';
    } else {
      galleryGrid.innerHTML = '';
      EVENTS_DATA.forEach(function (ev) {
        var article = document.createElement('article');
        article.className = 'gallery-card';
        article.innerHTML =
          '<div class="card-img-wrap">' +
            '<img src="' + escHtml(ev.photo) + '" alt="' + escHtml(ev.title) + ' group photo" loading="lazy">' +
            '<div class="photo-placeholder" aria-hidden="true">Photo coming soon</div>' +
          '</div>' +
          '<div class="gallery-card-body">' +
            '<h3>' + escHtml(ev.title) + '</h3>' +
            '<p class="card-date">' + escHtml(ev.date) + '</p>' +
          '</div>';
        var img     = article.querySelector('img');
        var imgWrap = article.querySelector('.card-img-wrap');
        img.addEventListener('load', function () {
          var ph = article.querySelector('.photo-placeholder');
          if (ph) ph.style.display = 'none';
        });
        img.addEventListener('error', function () {
          img.classList.add('broken');
        });
        imgWrap.addEventListener('click', function () {
          if (!img.classList.contains('broken')) openLightbox(img.src, img.alt);
        });
        galleryGrid.appendChild(article);
      });
    }
  }

  /* ===========================
     Directory rendering (directory.html)
     =========================== */
  var directorySection = document.getElementById('directory');
  var yearFilterBar    = document.getElementById('year-filters');

  if (directorySection && yearFilterBar) {
    var alumni = DIRECTORY_DATA;

    if (!alumni || alumni.length === 0) {
      yearFilterBar.innerHTML = '';
      directorySection.innerHTML = '<p>No directory entries found.</p>';
      return;
    }

    /* Collect distinct years */
    var yearSet = {};
    alumni.forEach(function (a) {
      (a.year || []).forEach(function (y) { yearSet[y] = true; });
    });
    var years = Object.keys(yearSet).sort();

    /* Build filter buttons */
    yearFilterBar.innerHTML = '';
    var allBtn = document.createElement('button');
    allBtn.className = 'year-btn active';
    allBtn.textContent = 'All';
    allBtn.setAttribute('aria-pressed', 'true');
    allBtn.addEventListener('click', function () {
      setActiveBtn(allBtn);
      clearHighlights();
    });
    yearFilterBar.appendChild(allBtn);

    years.forEach(function (yr) {
      var btn = document.createElement('button');
      btn.className = 'year-btn';
      btn.textContent = yr;
      btn.setAttribute('aria-pressed', 'false');
      btn.addEventListener('click', function () {
        setActiveBtn(btn);
        scrollToYear(yr);
      });
      yearFilterBar.appendChild(btn);
    });

    /* Group alumni by first year entry */
    var groups = {};
    alumni.forEach(function (a) {
      var yr = (a.year && a.year[0]) ? a.year[0] : 'Unknown';
      if (!groups[yr]) groups[yr] = [];
      groups[yr].push(a);
    });

    /* Render grouped entries */
    directorySection.innerHTML = '';
    years.forEach(function (yr) {
      if (!groups[yr]) return;
      var section = document.createElement('section');
      section.className = 'year-group';
      section.id = 'year-' + yr;
      var h2 = document.createElement('h2');
      h2.className = 'year-group-heading';
      h2.textContent = 'Class of ' + yr;
      section.appendChild(h2);

      var grid = document.createElement('div');
      grid.className = 'directory-cards';

      groups[yr].forEach(function (person) {
        var card = document.createElement('div');
        card.className = 'directory-card';
        var displayName = escHtml(person.name);
        if (person.chineseName) displayName += ' ' + escHtml(person.chineseName);
        if (person.nickname) displayName += ' (' + escHtml(person.nickname) + ')';
        var classLine = (person.class && person.class[0]) ? escHtml(person.class[0]) : '';
        var form7 = (person.form7year && person.form7year.length > 0) ? person.form7year[0] : '';
        var form7Line = form7
          ? '<p class="card-meta">Form 7 Year: ' + escHtml(form7) + '</p>'
          : '';
        var actionHtml = '';
        if (person.showEmail && person.email) {
          actionHtml = '<div class="directory-card-action"><a href="mailto:' + escHtml(person.email) + '">' + escHtml(person.email) + '</a></div>';
        } else {
          var subject = encodeURIComponent('Connect with ' + person.name + ' — Form 5: ' + (person.year && person.year[0] ? person.year[0] : ''));
          actionHtml = '<div class="directory-card-action"><a class="btn" href="mailto:sjacsoaa.ca@gmail.com?subject=' + subject + '">Connect</a></div>';
        }
        card.innerHTML =
          '<div class="directory-card-info">' +
            '<h3>' + displayName + '</h3>' +
            '<p class="card-meta">Form 5 Year: ' + escHtml(yr) + (classLine ? ' &middot; ' + classLine : '') + '</p>' +
            form7Line +
          '</div>' +
          actionHtml;
        grid.appendChild(card);
      });

      section.appendChild(grid);
      directorySection.appendChild(section);
    });
  }

  /* ===========================
     Helpers
     =========================== */
  function setActiveBtn(activeBtn) {
    document.querySelectorAll('.year-btn').forEach(function (b) {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    });
    activeBtn.classList.add('active');
    activeBtn.setAttribute('aria-pressed', 'true');
  }

  function clearHighlights() {
    document.querySelectorAll('.year-group').forEach(function (g) {
      g.classList.remove('highlighted');
    });
  }

  function scrollToYear(yr) {
    var target = document.getElementById('year-' + yr);
    if (!target) return;
    clearHighlights();
    target.classList.add('highlighted');
    var navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 68;
    var top = target.getBoundingClientRect().top + window.scrollY - navH - 24;
    window.scrollTo({ top: top, behavior: 'smooth' });
  }

  function escHtml(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
});
