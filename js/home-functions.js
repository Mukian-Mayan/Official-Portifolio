/* ============================================================
   home-functions.js
   Functions specific to this one landing page — preloader,
   custom cursor, header behaviour, scroll progress, hero
   typing/parallax. None of these are reusable components, so
   they live here rather than under content/components/.
============================================================ */
import { isFinePointer, isCoarsePointer } from "./general-functions.js";
import { HERO_PHRASES } from "../content/site-data.js";

export function initPreloader() {
  const pre = document.getElementById("preloader");
  const letters = pre.querySelectorAll(".letter");
  letters.forEach((el, i) => (el.style.animationDelay = `${i * 0.04 + 0.1}s`));
  window.addEventListener("load", () => setTimeout(() => pre.classList.add("is-done"), 1500));
  setTimeout(() => pre.classList.add("is-done"), 3200); // fallback
}

export function initCustomCursor() {
  if (!isFinePointer()) return;
  document.body.classList.add("has-custom-cursor");
  const dot = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");
  let ringX = window.innerWidth / 2, ringY = window.innerHeight / 2;
  let mouseX = ringX, mouseY = ringY;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    dot.style.left = mouseX + "px";
    dot.style.top = mouseY + "px";
  });
  (function loop() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.left = ringX + "px";
    ring.style.top = ringY + "px";
    requestAnimationFrame(loop);
  })();
  document.addEventListener("mouseover", (e) => {
    ring.classList.toggle("is-hover", !!e.target.closest("a, button, [data-cursor='hover']"));
  });
}

/** Header scroll state, mobile nav toggle, active-link scroll-spy,
 *  and the "current section" label shown next to the hamburger
 *  on narrow screens (Fix 1: keep page context visible on mobile). */
export function initHeaderAndNav() {
  const header = document.getElementById("siteHeader");
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");
  const currentLabel = document.getElementById("navCurrentLabel");
  const links = nav.querySelectorAll(".nav-link");

  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
  links.forEach((l) =>
    l.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );

  const sectionIds = ["home", "projects", "contact"];
  const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((l) => l.classList.toggle("is-active", l.dataset.nav === entry.target.id));
        if (currentLabel) currentLabel.textContent = entry.target.dataset.label || entry.target.id;
      });
    },
    { rootMargin: "-45% 0px -45% 0px" }
  );
  sections.forEach((s) => spy.observe(s));
}

export function initSectionDotNav() {
  const dots = document.querySelectorAll(".section-nav button");
  const targets = Array.from(dots).map((d) => document.getElementById(d.dataset.target)).filter(Boolean);

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      document.getElementById(dot.dataset.target)?.scrollIntoView({ behavior: "smooth" });
    });
  });

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        dots.forEach((d) => d.classList.toggle("is-active", d.dataset.target === entry.target.id));
      });
    },
    { rootMargin: "-40% 0px -40% 0px" }
  );
  targets.forEach((t) => spy.observe(t));
}

export function initScrollProgress() {
  const fill = document.getElementById("scrollProgressFill");
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    fill.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

export function initRevealOnScroll() {
  const targets = document.querySelectorAll(".reveal-lines, .reveal-up, .reveal-morph");
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  targets.forEach((t) => observer.observe(t));
}

export function initHeroTyping() {
  const el = document.getElementById("heroTyping");
  let phraseIndex = 0, charIndex = 0, deleting = false;

  function tick() {
    const current = HERO_PHRASES[phraseIndex];
    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) { deleting = true; setTimeout(tick, 1600); return; }
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) { deleting = false; phraseIndex = (phraseIndex + 1) % HERO_PHRASES.length; }
    }
    setTimeout(tick, deleting ? 30 : 55);
  }
  tick();
}

/** Hero photo + blob drift with the pointer. Fix 1: sizes are now
 *  fluid (see styles.css) so this only ever nudges within bounds
 *  that already fit the viewport, instead of pushing content off-screen. */
export function initHeroParallax() {
  const figure = document.querySelector(".hero-figure");
  const photo = document.getElementById("heroPhoto");
  const blob = document.getElementById("heroBlob");
  if (!figure || isCoarsePointer()) return;

  figure.addEventListener("mousemove", (e) => {
    const rect = figure.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    photo.style.transform = `scale(1.05) translate(${relX * -14}px, ${relY * -14}px)`;
    blob.style.transform = `translate(-50%, -50%) translate(${relX * 22}px, ${relY * 22}px)`;
  });
  figure.addEventListener("mouseleave", () => {
    photo.style.transform = "scale(1.02) translate(0,0)";
    blob.style.transform = "translate(-50%, -50%)";
  });
}

export function initSubscribeForm() {
  const form = document.getElementById("subscribeForm");
  const feedback = document.getElementById("formFeedback");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector("input");
    if (!input.value) return;
    feedback.textContent = `Thanks — you're on the list at ${input.value}.`;
    form.reset();
    setTimeout(() => (feedback.textContent = ""), 4000);
  });
}
