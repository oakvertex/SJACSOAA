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
    "id": "new-horizon-2026",
    "title": "New Horizon Charity Table Tennis Tournament 2026",
    "subtitle": "Canada-HK New Horizon Lions Club — 15th Annual Charity Table Tennis Tournament",
    "date": "9 August 2026",
    "dateISO": "2026-08-09",
    "photos": [
      {
        "image": "images/events/new-horizon-2026-tournament-action.jpg",
        "alt": "SJACS Alumni in action at the New Horizon Charity Table Tennis Tournament 2026",
        "caption": "Tournament action"
      },
      {
        "image": "images/events/new-horizon-2026-round-robin-scoreboard.jpg",
        "alt": "Round-robin scoreboard at the New Horizon Charity Table Tennis Tournament 2026",
        "caption": "Round-robin play"
      },
      {
        "image": "images/events/new-horizon-2026-team-between-matches.jpg",
        "alt": "SJACS Alumni team pairing up between matches at the New Horizon Charity Table Tennis Tournament 2026",
        "caption": "Pairing up between matches"
      },
      {
        "image": "images/events/new-horizon-2026-vs-raimondi-action.jpg",
        "alt": "SJACS Alumni in action against Raimondi College at the New Horizon Charity Table Tennis Tournament 2026",
        "caption": "Action vs. Raimondi College"
      },
      {
        "image": "images/events/new-horizon-2026-trophy-table.jpg",
        "alt": "The trophy table at the New Horizon Charity Table Tennis Tournament 2026",
        "caption": "The trophy table"
      },
      {
        "image": "images/events/new-horizon-2026-finalists-group-photo.jpg",
        "alt": "Finalists and organizers at the presentation for the New Horizon Charity Table Tennis Tournament 2026",
        "caption": "Finalists and organizers at the presentation"
      },
      {
        "image": "images/events/new-horizon-2026-sjacs-silver-medal.jpg",
        "alt": "SJACS Alumni with their silver medal finish at the New Horizon Charity Table Tennis Tournament 2026",
        "caption": "SJACS Alumni's silver-medal finish"
      }
    ],
    "description": "Held at Markham Wesley Centre, SJACS Alumni competed in the Inter-School Team event against 7 schools, topping Group B (3-0), winning the semifinal, and reaching the Final — finishing 2nd overall (Silver) after a loss to Wah Yan College.",
    "upcoming": false
  },
  {
    "id": "golf-tournament-2026",
    "title": "Golf Tournament 2026",
    "subtitle": "Hong Kong Joint Schools Alumni Association",
    "date": "26 July 2026",
    "dateISO": "2026-07-26",
    "photos": [
      {
        "image": "images/events/golf-tournament-2026/golf-tournament-2026-team-tee.jpg",
        "alt": "The SJACS Alumni team of four — Johnson Yim, William Chow, Joe Chow and Eric Law, left to right — on the tee at Upper Unionville Golf Club",
        "caption": "The SJACS Alumni team, left to right: Johnson Yim, William Chow, Joe Chow, Eric Law"
      },
      {
        "image": "images/events/golf-tournament-2026/golf-tournament-2026-group-course.jpg",
        "alt": "Golfers and alumni gathered outside the clubhouse at Upper Unionville Golf Club for the HKJSAA Golf Tournament 2026",
        "caption": "Tournament day at Upper Unionville Golf Club"
      },
      {
        "image": "images/events/golf-tournament-2026/golf-tournament-2026-alumni-dinner-stage.jpg",
        "alt": "SJACS Alumni Association members on stage at the HKJSAA Golf Tournament 2026 dinner and award presentation",
        "caption": "SJACS Alumni Association at the dinner and award presentation"
      },
      {
        "image": "images/events/golf-tournament-2026/golf-tournament-2026-dinner-table.jpg",
        "alt": "Alumni sharing dinner at Purple Orchid following the HKJSAA Golf Tournament 2026",
        "caption": "Dinner at Purple Orchid"
      },
      {
        "image": "images/events/golf-tournament-2026/golf-tournament-2026-award-strokeplay.jpg",
        "alt": "Eric Law receiving the Individual Strokeplay 1st Runner-up award at the HKJSAA Golf Tournament 2026",
        "caption": "Eric Law — Individual Strokeplay, 1st Runner-up"
      },
      {
        "image": "images/events/golf-tournament-2026/golf-tournament-2026-award-honest-reaction.jpg",
        "alt": "William Chow celebrating after being announced the Honest Individual Strokeplay Player award winner at the HKJSAA Golf Tournament 2026",
        "caption": "William Chow celebrates his Honest Individual Strokeplay Player award"
      },
      {
        "image": "images/events/golf-tournament-2026/golf-tournament-2026-award-honest.jpg",
        "alt": "William Chow receiving the Honest Individual Strokeplay Player award at the HKJSAA Golf Tournament 2026",
        "caption": "William Chow — Honest Individual Strokeplay Player"
      },
      {
        "image": "images/events/golf-tournament-2026/golf-tournament-2026-award-closest-to-pin.jpg",
        "alt": "Eric Law receiving the Closest to Pin award for Hole 16 at the HKJSAA Golf Tournament 2026",
        "caption": "Eric Law — Closest to Pin, Hole 16"
      },
      {
        "image": "images/events/golf-tournament-2026/golf-tournament-2026-all-winners.jpg",
        "alt": "All award winners on stage at the HKJSAA Golf Tournament 2026 award presentation at Purple Orchid",
        "caption": "All award winners, HKJSAA Golf Tournament 2026"
      }
    ],
    "description": "SJACS Alumni fielded a team of four — William Chow, Joe Chow, Eric Law and Johnson Yim — at the tournament, held at Upper Unionville Golf Club with dinner and the award presentation that evening at Purple Orchid. The team earned three individual awards: Eric Law (Individual Strokeplay, 1st Runner-up; Closest to Pin, Hole 16) and William Chow (Honest Individual Strokeplay Player).",
    "upcoming": false
  },
  {
    "id": "cny-2026",
    "title": "CNY Celebration 2026",
    "subtitle": "Hong Kong Joint Schools Alumni Association",
    "date": "2026",
    "dateISO": "2026-01-01",
    "photos": [
      {
        "image": "images/events/cny-2026.jpg",
        "alt": "CNY Celebration 2026 group photo"
      }
    ],
    "description": "SJACSOAA joined the Hong Kong Joint Schools Alumni Association's Chinese New Year celebration.",
    "upcoming": false
  },
  {
    "id": "agm-2025",
    "title": "SJACSOAA AGM Dinner",
    "subtitle": "",
    "date": "18 October 2025",
    "dateISO": "2025-10-18",
    "photos": [
      {
        "image": "images/events/agm-2025.jpg",
        "alt": "SJACSOAA AGM Dinner group photo"
      }
    ],
    "description": "Our annual general meeting and dinner, bringing SJACS alumni together across graduating years.",
    "upcoming": false
  },
  {
    "id": "agm-2024",
    "title": "SJACSOAA AGM Dinner",
    "subtitle": "",
    "date": "27 October 2024",
    "dateISO": "2024-10-27",
    "photos": [
      {
        "image": "images/events/agm-2024.jpg",
        "alt": "SJACSOAA AGM Dinner group photo"
      }
    ],
    "description": "Our annual general meeting and dinner, bringing SJACS alumni together across graduating years.",
    "upcoming": false
  }
];

var DIRECTORY_DATA = [
  {
    "id": 1,
    "name": "N.H. Yim",
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
  },
  {
    "id": 4,
    "name": "Martin Chai, Wen-Hsuan",
    "chineseName": "翟文軒",
    "nickname": "",
    "year": ["1988"],
    "form7year": [],
    "class": ["Form 5D"],
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
        var thumb = (ev.photos && ev.photos[0]) || {};
        var subtitle = ev.subtitle
          ? '<p class="card-subtitle">' + escHtml(ev.subtitle) + '</p>'
          : '';
        article.innerHTML =
          '<div class="card-img-wrap">' +
            '<img src="' + escHtml(thumb.image) + '" alt="' + escHtml(thumb.alt || ev.title) + '" loading="lazy">' +
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
      '<button class="lightbox-nav lightbox-prev" id="lightbox-prev" aria-label="Previous photo">&#8249;</button>' +
      '<img class="lightbox-img" id="lightbox-img" src="" alt="" />' +
      '<button class="lightbox-nav lightbox-next" id="lightbox-next" aria-label="Next photo">&#8250;</button>' +
      '<p class="lightbox-caption" id="lightbox-caption"></p>' +
      '<p class="lightbox-counter" id="lightbox-counter"></p>';
    document.body.appendChild(lightbox);

    var lbImg        = document.getElementById('lightbox-img');
    var lbClose      = document.getElementById('lightbox-close');
    var lbPrev       = document.getElementById('lightbox-prev');
    var lbNext       = document.getElementById('lightbox-next');
    var lbCaption    = document.getElementById('lightbox-caption');
    var lbCounter    = document.getElementById('lightbox-counter');
    var lbPrevFocus  = null;
    var lbPhotos     = [];
    var lbIndex      = 0;

    function renderLightboxPhoto() {
      var photo = lbPhotos[lbIndex] || {};
      lbImg.src = photo.image || '';
      lbImg.alt = photo.alt || '';

      if (photo.caption) {
        lbCaption.textContent = photo.caption;
        lbCaption.hidden = false;
      } else {
        lbCaption.textContent = '';
        lbCaption.hidden = true;
      }

      var multi = lbPhotos.length > 1;
      lbPrev.hidden = !multi;
      lbNext.hidden = !multi;
      if (multi) {
        lbCounter.textContent = (lbIndex + 1) + ' / ' + lbPhotos.length;
        lbCounter.hidden = false;
      } else {
        lbCounter.textContent = '';
        lbCounter.hidden = true;
      }
    }

    function showPrevPhoto() {
      if (lbPhotos.length < 2) return;
      lbIndex = (lbIndex - 1 + lbPhotos.length) % lbPhotos.length;
      renderLightboxPhoto();
    }

    function showNextPhoto() {
      if (lbPhotos.length < 2) return;
      lbIndex = (lbIndex + 1) % lbPhotos.length;
      renderLightboxPhoto();
    }

    function openLightbox(photos, startIndex) {
      lbPhotos = photos || [];
      lbIndex = startIndex || 0;
      renderLightboxPhoto();
      lbPrevFocus = document.activeElement;
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      lbClose.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
      lbImg.src = '';
      lbPhotos = [];
      lbIndex = 0;
      if (lbPrevFocus) lbPrevFocus.focus();
    }

    lbClose.addEventListener('click', closeLightbox);
    lbPrev.addEventListener('click', function (e) { e.stopPropagation(); showPrevPhoto(); });
    lbNext.addEventListener('click', function (e) { e.stopPropagation(); showNextPhoto(); });

    /* Click on dark backdrop (not the image or controls) closes the overlay */
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') showPrevPhoto();
      else if (e.key === 'ArrowRight') showNextPhoto();
    });

    /* --- Render cards --- */
    if (!EVENTS_DATA || EVENTS_DATA.length === 0) {
      galleryGrid.innerHTML = '<p>No photos to display at this time.</p>';
    } else {
      galleryGrid.innerHTML = '';
      EVENTS_DATA.forEach(function (ev) {
        var photos = ev.photos || [];
        var thumb  = photos[0] || {};
        var article = document.createElement('article');
        article.className = 'gallery-card';
        article.innerHTML =
          '<div class="card-img-wrap">' +
            '<img src="' + escHtml(thumb.image) + '" alt="' + escHtml(thumb.alt || ev.title) + '" loading="lazy">' +
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
          if (!img.classList.contains('broken')) openLightbox(photos, 0);
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
