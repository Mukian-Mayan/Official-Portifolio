# Moen — Portfolio Site

A multi-page portfolio: `index.html` (home), `projects.html` (project browser), and `contact.html` (contact form). Plain HTML/CSS/JS, no build step, no framework — components are hand-rolled JS modules.

---

## Checkpoint 1 — where the project stands

> See `CHECKPOINTS.md` for the running log of every checkpoint, including what's been explored and parked (like the admin/CMS panel test) versus what's actually merged here.

This README was written at **Checkpoint 1**, a deliberate save-point in the build. If something breaks later and you need to compare against a known-good state, this is what Checkpoint 1 includes:

- Home page fully built: hero, About, tech skill bars, services, featured-projects preview, "have an idea" CTA, "why work with me" accordion, footer.
- A page-wide animated particle background (`content/components/ParticleField.js`), sitting behind every page at `z-index:-1`.
- A component-per-file architecture under `content/components/`, each exporting render + init functions.
- A brand-new **Projects page** (`projects.html`) — a master-detail browser (project list → detail pane).
- A brand-new **Contact page** (`contact.html`) — a contact form (client-side only, see [Contact form](#contact-form-not-wired-to-a-backend-yet) below) plus direct contact info.
- Comments were stripped down to single-line section markers only (`/* HEADER */`, `<!-- Hero -->`, etc.) — no explanatory prose comments anywhere in the code. If you're reading the source to learn from it, the file names and this README are the documentation; the code itself is deliberately bare.

**Both new pages are first-pass drafts awaiting your review** — layout and interaction are functional, but treat visual details as a starting point for another round of feedback, same as the home-page effects were.

If you make manual edits going forward, consider zipping the whole project folder before big changes and labeling it your own checkpoint (e.g. `checkpoint-2-manual-edits.zip`) — that way there's always a clean fallback.

---

## Running it locally

This project uses native ES modules (`<script type="module">`), which **do not load over a plain `file://` double-click** in most browsers. You need a local server:

1. Open the project folder in VS Code.
2. Install the "Live Server" extension if you don't have it.
3. Right-click `index.html` → **Open with Live Server**.

Any other static server works too (`npx serve`, Python's `http.server`, etc.) — it just can't be opened as a bare file.

---

## Project structure

```
index.html            Home page
projects.html         Projects page (master-detail browser)
contact.html          Contact page (form + direct info)

css/
  styles.css           Shared design tokens + styles used on every page
  projects.css          Projects-page-only styles
  contact.css           Contact-page-only styles

js/
  general-functions.js  Shared utilities (icons, animation helpers, pointer checks)
  home-functions.js     Home-page-specific behaviour (hero typing, parallax, nav scroll-spy...)
  site-shell.js          Shell behaviour shared by all 3 pages (particles, preloader, cursor, header, scroll progress)
  main.js                Home page entry point
  projects.js            Projects page entry point
  contact.js             Contact page entry point

content/
  site-data.js           All page content lives here — see "Editing content" below
  images/                 Image assets (profile.png, project images go here)
  components/             One reusable UI piece per file (see below)
```

### Components (`content/components/`)

Each file exports a `render...()` function (returns an HTML string) and, where the piece needs interactivity, an `init...()` function. Nothing here is page-specific — the same `ProjectCard.js` renderer is used on both the home page and the projects page, for example.

| File | What it renders |
|---|---|
| `TechBadge.js` | Hero tech-logo marquee + click-to-expand detail panel |
| `StatCounter.js` | About section's count-up stats |
| `SkillBar.js` | "My technologies" progress bars |
| `ServiceCard.js` | Service list cards |
| `ProjectCard.js` | Homepage project cards **and** the Projects page's list/detail views |
| `AccordionItem.js` | "Why work with me" accordion |
| `SocialLink.js` | Footer / contact-page social links |
| `ParticleField.js` | The page-wide background particle effect |
| `TendrilAccent.js` | **Not currently used anywhere.** An earlier hero-corner effect kept in the project in case you want to revisit it later. Safe to delete if you don't. |

---

## Editing content

Almost everything you'd want to change — copy, numbers, links — lives in **`content/site-data.js`**, not scattered across HTML. Open that file and edit the relevant array.

### Adding a project

This drives both the homepage's "Featured projects" preview and the full Projects page — one edit, both places update. Open `content/site-data.js`, find the `PROJECTS` array, and add a new object:

```js
{
  id: "my-new-project",              // unique, URL-safe (used in the projects.html link, e.g. projects.html#my-new-project)
  title: "My New Project",
  role: "React · Supabase",           // short tech line shown on the homepage card
  tone: "plum",                       // "plum" | "navy" | "amber" — controls the card color
  image: "",                          // optional: "content/images/my-project.jpg"
  year: "2026",
  featured: false,                    // true = also shows in the homepage teaser grid
  summary: "One sentence for quick reference.",
  description: "The longer paragraph shown on the Projects page detail pane.",
  tech: ["React", "Supabase", "Tailwind"],   // shown as chips on the detail pane
  liveUrl: "https://example.com",     // leave "" to show a "coming soon" state instead of a dead link
  repoUrl: "",                        // optional — leave "" to hide the "View source" button entirely
}
```

That's the whole process — no other file needs to change. New projects appear automatically on the Projects page (in array order — reorder entries to reorder the list). Set `featured: true` on a project to also show it in the homepage's "Featured projects" grid; keep that to a handful so the homepage stays a teaser, not the full catalog.

**Current status (Checkpoint 3):** the array has 23 entries. The first 3 (`commerce-app`, `operations-dashboard`, `booking-platform`) are real placeholder content with `featured: true`. The remaining 20 (`project-04` through `project-23`) are empty placeholders — edit their `title`, `role`, `summary`, `description`, `tech`, `image`, and `liveUrl`/`repoUrl` fields directly; everything else about them (color, layout, position) already works.

### Editing everything else

| To change... | Edit this array in `content/site-data.js` |
|---|---|
| Hero tech-logo marquee | `TECH_LOGOS` |
| The click-to-expand tech detail panel | `TECH_DETAILS` |
| About section stats (5+ years, etc.) | `STATS` |
| "My technologies" skill bars | `SKILLS` |
| Service cards | `SERVICES` |
| "Why work with me" accordion | `WHY` |
| Footer / contact-page social links | `SOCIALS` |
| Hero's rotating typed phrases | `HERO_PHRASES` |

---

## Contact form — not wired to a backend yet

`contact.html`'s form currently validates client-side and shows a confirmation message, but **does not actually send an email anywhere** — there's no backend. Before this goes live, wire it to one of:

- A form service like Formspree, Web3Forms, or Getform (usually just an `action` URL + hidden fields, no server code needed).
- Your own small backend endpoint that sends mail via an email API (Resend, SendGrid, etc.).

The relevant code is the `submit` handler in `js/contact.js` — replace the fake success message with a real `fetch()` call to whichever service you pick.

---

## Known decisions / things worth knowing

- **The old hero-corner 3D cube and the tendril accent were both explored and set aside.** The page-wide `ParticleField` background is the current direction. `TendrilAccent.js` is still in the project, unused, in case you want to reconsider it.
- **`profile.png` is a placeholder.** Drop your real photo into `content/images/` under that exact filename to replace it.
- **Nav scroll-spy on `index.html`:** the "Projects" and "Contact" nav links now point to the dedicated pages, but the homepage's own `#projects` and footer sections still exist for the on-page preview and still get scroll-spy highlighting as you scroll past them. This is intentional (the sections are still there), just worth knowing if the nav highlight behavior looks slightly different from a single-purpose nav.
- **ES modules require a local server** — see "Running it locally" above. This has caused confusion before (stale-cache symptoms that were actually a missing-server issue) — if something "looks like the old version," check the browser console for module-loading errors first.
- **A MySQL-backed version is being considered** (see `CHECKPOINTS.md`) as a possible future direction alongside, or instead of, the headless-CMS path explored at Checkpoint 2. Not started — parked for later, same as the CMS thread.

---

## Suggested next steps

- Review `projects.html` and `contact.html` and give feedback — both are first drafts.
- Fill in the 20 placeholder projects (`project-04`–`project-23`) with real titles, descriptions, and links as they come in.
- Fill in real `liveUrl` / `repoUrl` / `image` values for each project once you have them.
- Connect the contact form to a real email service.
- Replace `profile.png` with your actual photo.
