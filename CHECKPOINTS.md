# Checkpoint Log

A running record of major save-points in this project. Use this to know what "backtrack to checkpoint N" means at any point in the conversation.

---

## Checkpoint 3 — Moen rename, bare-comment pass, 23-project roster ✅ *(active)*

Built on top of Checkpoint 1. Changes:

- **Renamed the site from Kezia to Moen** throughout — titles, meta descriptions, hero heading, footer copyright, contact email, social handles. This portfolio is now Moen's.
- **Photo path reverted to `content/images/profile.png`** (was briefly `profile1.png` at Checkpoint 1).
- **All explanatory comments stripped.** Every file now carries only bare section-marker comments — `/* HEADER */`-style one-liners in CSS/JS, `<!-- Hero -->`-style one-liners in HTML. No JSDoc, no inline explanations, no prose. Intentional, for sharing the code as a learning example: minimal noise, file names and README carry the explanation instead.
- **`PROJECTS` expanded from 3 to 23 entries**, plus a new `featured` boolean field so the homepage teaser grid can show a handful (currently the original 3) while the full Projects page lists all 23. The 20 new entries (`project-04`–`project-23`) are empty placeholders — see README → "Adding a project" for exactly which fields to fill in and where links go.
- Projects and Contact pages carried forward unchanged in structure/behavior, just re-themed to Moen.

**Noted but not started:** a MySQL-backed version is under consideration (Workbench mentioned) as a possible alternative or complement to the Checkpoint 2 headless-CMS direction. Nothing built yet — parked here so it isn't lost, same treatment as Checkpoint 2.

---

## Checkpoint 1 — multi-page base

The `moen-portfolio` project as documented in `README.md`: home page, Projects page, Contact page, page-wide particle background, component-per-file architecture, all content hardcoded in `content/site-data.js`.

This was the working base Checkpoint 3 was built on top of.

---

## Checkpoint 2 — admin/CMS exploration 🧪 *(parked, not merged)*

A standalone proof-of-concept, delivered as a single React artifact (`admin-demo.jsx`), **not merged into the real site**. It tested whether a lightweight admin panel — add/edit/delete projects, changes reflected instantly on a public view — feels good to use, before committing to a real integration.

What it showed:
- The edit → save → see it live loop feels fast and simple.
- No authentication was built (intentional, for this test) — the real version needs access control before it touches the live site.
- Decided direction (from the earlier discussion): a headless CMS (Sanity/Contentful) for project content, plus a separate lightweight analytics tool (Plausible/Fathom) for stats — both addable independently of each other and of Checkpoint 1, without disrupting it.

**Status:** parked. Nothing from this checkpoint has touched `moen-portfolio` yet. To resume, the next steps would be: (1) finish approving Checkpoint 1's `projects.html`/`contact.html`, (2) set up a Sanity (or Contentful) project and content schema matching `PROJECTS` in `site-data.js`, (3) swap `projects.js`'s local-array read for a fetch from the CMS, (4) separately add an analytics script for stats.

---

*When a new checkpoint is created, add it above this line rather than replacing older entries — the point of this log is that nothing gets forgotten.*
