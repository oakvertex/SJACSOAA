# SJACSOAA Website — Project Document
**St. Joseph's Anglo-Chinese School Ontario Alumni Association**
**Version 1.8 | August 2026**

> **Note on this file's history:** As of August 2026, this document was found to exist only as a file uploaded to this Claude Project — it had never been committed to the GitHub repository or its git history. It is now being saved into the repo directly to make git the durable source of truth. Keep this Project's copy in sync by re-uploading after future significant edits.

---

## 1. Project Overview

This document defines the scope, goals, and approach for building the official website of the **St. Joseph's Anglo-Chinese School Ontario Alumni Association (SJACSOAA)** — the alumni association of **St. Joseph's Anglo-Chinese School (SJACS)**. The site serves 100–500 members and is the single source of truth for all design, development, and content decisions made throughout the project.

---

## 2. Goals & Purpose

**Reconnect Alumni** — Provide a central place where former classmates can find each other, share contact details, and stay in touch across graduating years.

**Share Memories & Photos** — Host a curated photo archive organised by era and event type, with a mechanism for alumni to contribute identifications, captions, and corrections over time.

**Announce Events & Reunions** — Publish upcoming gatherings, reunions, and news in a way that is easy to update without technical help.

---

## 3. Audience

| Segment | Description |
|---|---|
| Primary | SJACS alumni (100–500 members across multiple graduating years) based in Ontario, Canada |
| Secondary | SJACSOAA site maintainer (intermediate technical skill, comfortable with some code) |
| Tertiary | Prospective alumni contributors (photo donors, event organizers) |

---

## 4. Scope

### In Scope
- Homepage (single scrolling page) with hero, about, events, find a classmate, useful links, get involved/contact, and footer sections
- Photo gallery as a separate page — one or more photos per event, shown via a paging lightbox (see Section 7)
- Alumni directory as a separate page — browse by Form 5 year; privacy-safe contact model
- Mobile-responsive design
- GitHub-hosted codebase with Cloudflare Pages deployment

### Out of Scope (Future Versions)
- Member login / password-protected directory
- Online payments or donations
- Alumni crowd-sourcing portal (photo tagging by members)
- Database backend or CMS
- Email newsletter integration
- Dedicated `about.html` and `events.html` pages (homepage `#about` and `#events` sections cover this)

---

## 5. Site Structure

```
Homepage (single scrolling page) — https://sjacsoaa.ca/
├── Hero Banner
├── About SJACSOAA (#about)
├── Events (#events) — 3 most recent; link to /gallery for full list
├── Find a Classmate — link to /directory
├── Useful Links
├── Get Involved / Contact
└── Footer

Separate Pages
├── /gallery  — Photo Gallery (all events; one or more photos each via lightbox)
└── /directory — Alumni Directory (browse by Form 5 year)
```

**Canonical URL form:** Clean extensionless (`/`, `/gallery`, `/directory`). The `.html` files exist on disk and 307-redirect to the canonical form via Cloudflare Pages.

---

## 6. Design Direction

- **Tone:** Warm, nostalgic, and community-driven
- **Colours:** Navy blue (#003087), white, gold/yellow accents
- **Language:** Association name displayed in both English and Chinese throughout (聖若瑟英文中學（安省）同學會)
- **Accessibility:** WCAG AA minimum — sufficient contrast, alt text on all images
- **Image optimisation standard:** Max 1920px wide (event photos: ~1400px), JPG at 80–85% quality, target 300–500KB per image; `loading="lazy"` applied via the JS renderer

---

## 7. Content

### Events

| Event | Date | On homepage? |
|---|---|---|
| Golf Tournament 2026 — Hong Kong Joint Schools Alumni Association | 26 July 2026 | ✅ (most recent) |
| CNY Celebration 2026 — Hong Kong Joint Schools Alumni Association | 2026 | ✅ |
| SJACSOAA AGM Dinner | 18 October 2025 | ✅ |
| SJACSOAA AGM Dinner | 27 October 2024 | ❌ (gallery only — bumped by the 3-most-recent rule) |

**Golf Tournament 2026 detail:** Held at Upper Unionville Golf Club, with dinner and award presentation at Purple Orchid the same evening. SJACS Alumni fielded a team of four — William Chow, Joe Chow, Eric Law and Johnson Yim. Results: Eric Law (Individual Strokeplay, 1st Runner-up; Closest to Pin, Hole 16), William Chow (Honest Individual Strokeplay Player). 9 photos.

### Gallery: Multi-Photo Events
Each event can now have one or more photos, shown via a paging lightbox (prev/next buttons, arrow-key navigation, "N / M" counter, optional per-photo caption). Homepage event cards always show `photos[0]` as the thumbnail. Events with a single photo behave exactly as before — no visible change for CNY 2026 or the AGM Dinners.

### Useful Links
Two categories, responsive card grid:

**Our School:** SJACS, SJACS Primary School, Brother Paul Sun Education Foundation
**SJACS Alumni Worldwide:** Old Boys' Association (Hong Kong), SJACS Vancouver, HK Joint Schools Alumni Association

All links open in a new tab with `rel="noopener noreferrer"`.

### Navigation & Footer Link Order
Home → About → Events → Gallery → Directory → Contact. All internal links use the canonical clean URL form.

### Alumni Directory
- Fields: Name, Chinese Name, Nickname, Form 5 Year (primary), Form 7 Year (optional), Graduating Class (optional)
- No personal contact details displayed publicly by default; "Connect" routes via sjacsoaa.ca@gmail.com
- Data file: `data/directory.json` (source-of-record reference); live site reads from `DIRECTORY_DATA` in `js/main.js`

#### Directory JSON schema
```json
{
  "id": 1,
  "name": "Alumni Member",
  "chineseName": "中文名",
  "nickname": "",
  "year": ["1990"],
  "form7year": [],
  "class": ["Form 5A"],
  "showEmail": false,
  "email": ""
}
```

### Event & Directory Data — Maintenance Note
`js/main.js` is the **single source of truth** for both event and directory data (`EVENTS_DATA` and `DIRECTORY_DATA` constants), because `fetch()` is blocked on `file://` paths during local preview. Neither JSON file under `data/` is ever loaded by the site — both are hand-maintained mirrors, not runtime data sources.

- **`data/events.json`** — removed (Aug 2026). Repo-wide grep confirmed its only reference anywhere was a stale line in README.md; nothing fetched, imported, or required it.
- **`data/directory.json`** — has the identical dead-duplicate characteristic, but is being **kept intentionally** while board and wider-membership directory data collection is active (see Milestones). README.md now documents it honestly as "a hand-maintained mirror of `DIRECTORY_DATA` kept for reference; it isn't loaded by the site," rather than implying it's fetched. Revisit once directory rollout is complete — remove it then, or keep it permanently as a staging file for data entry before mirroring into `main.js`.

### Contact
sjacsoaa.ca@gmail.com

---

## 8. Assets

| Asset | Status |
|---|---|
| Hero image | ✅ `images/hero.jpg` |
| School logo / crest | ✅ `images/logo.png` (official) |
| Event photos | ✅ `images/events/` — CNY 2026, AGM 2025, AGM 2024, Golf Tournament 2026 (9 photos) |

---

## 9. Tech Stack

| Layer | Tool |
|---|---|
| Repository | GitHub — github.com/oakvertex/SJACSOAA |
| Hosting | Cloudflare Pages |
| Domain | sjacsoaa.ca via Cloudflare Registrar |
| Frontend | Static HTML/CSS/JS — no frameworks |
| Development | Claude Code CLI (WSL/Ubuntu, local terminal) |
| Planning | Claude Project Chat |
| Image optimisation | Squoosh / ImageMagick |
| SEO monitoring | Google Search Console |

---

## 10. Constraints & Risks

| Constraint | Mitigation |
|---|---|
| Event/directory data embedded in `js/main.js` | No second file to keep in sync for events (`events.json` removed); `directory.json` intentionally kept as a staging mirror during active directory collection |
| Single maintainer | Static site with no dependencies |
| No WebP / srcset pipeline | Not currently needed — event photos already sized appropriately (~1400px, 300–500KB); revisit if page-weight becomes an issue |
| This decision log previously existed only in Claude Project knowledge, not in git | Being committed to the repo as of this version |

---

## 11. Milestones

| Milestone | Status |
|---|---|
| M1–M7 (setup through SEO hardening) | ✅ Done |
| M8 — Gallery extended to multi-photo events; Golf Tournament 2026 added | ✅ Done |
| M9 — `data/events.json` removed, README corrected | ✅ Done |
| Board directory entries collected | 🔄 In progress |
| Wider membership directory rollout | ⬜ |

---

## 12. Decisions Log

*(Earlier decisions through April 2026 — static site architecture, hosting, domain, colours, canonical URLs, `.gitignore` fixes, SEO foundations — carried forward unchanged; see repo history for full detail once this file has commits.)*

| Date | Decision | Rationale |
|---|---|---|
| Aug 2026 | Gallery extended from one photo per event to one-or-more, via a paging lightbox (prev/next, counter, optional caption) | Golf Tournament 2026 had 9 photos to post; single-photo events keep working unchanged |
| Aug 2026 | Added Golf Tournament 2026 event (Upper Unionville Golf Club; dinner/awards at Purple Orchid) | SJACS Alumni team of four — William Chow, Joe Chow, Eric Law, Johnson Yim — earned 3 individual awards |
| Aug 2026 | Removed `data/events.json`; corrected README's stale claims about it being fetched at runtime, and its references to removed `about.html`/`events.html` | Repo-wide grep confirmed the file had zero code references — eliminates dead duplicate data and inaccurate documentation |
| Aug 2026 | Kept `data/directory.json` despite having the same dead-duplicate characteristic as `events.json` | Directory data collection (board, then wider membership) is actively in progress; the file is useful as a staging/reference mirror during that process — revisit once collection wraps up |
| Aug 2026 | This PROJECT.md committed to the GitHub repo for the first time | Previously existed only as a Claude Project upload — not durable |

---

## 13. SEO & Indexing

*(As of April 2026 — due for a fresh check given ~4 months have passed)*

Canonical URLs (`/`, `/gallery`, `/directory`) are what's indexed; `.html` variants 307-redirect. Sitemap `lastmod` for `/` and `/gallery` updated to 2026-08-05 alongside the golf tournament event. See prior watch list re: backlinks from sjacs.com, sjacs-van.com, hkjsaa.blogspot.com if `/gallery` or `/directory` are still showing as under-indexed — worth a fresh Search Console check now that time has passed.

---

*This document should be updated whenever a significant decision is made or scope changes. It should live in the root of the GitHub repository as `PROJECT.md`, and a copy should be kept current in this Claude Project's knowledge files.*
