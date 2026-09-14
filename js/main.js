/* ============================================================
   main.js — entry point (loaded as <script type="module">).
   Renders each component with its data, then wires up behaviour.
   Keeps the "what" (data), "how it looks" (components), and
   "how it behaves" (init functions) each in their own files.
============================================================ */
import { isCoarsePointer } from "./general-functions.js";

import {
  TECH_LOGOS, STATS, SKILLS, SERVICES, PROJECTS, WHY, SOCIALS,
} from "../content/site-data.js";

import { renderTechBadge, renderTechDetailPanel, initTechBadges } from "../content/components/TechBadge.js";
import { renderStat, initStatCounters } from "../content/components/StatCounter.js";
import { renderSkillRow, initSkillBars } from "../content/components/SkillBar.js";
import { renderServiceCard } from "../content/components/ServiceCard.js";
import { renderProjectCard, initProjectTilt } from "../content/components/ProjectCard.js";
import { renderAccordionItem, initAccordion } from "../content/components/AccordionItem.js";
import { renderSocialLink } from "../content/components/SocialLink.js";
import { initParticleField } from "../content/components/ParticleField.js";

import {
  initPreloader, initCustomCursor, initHeaderAndNav, initSectionDotNav,
  initScrollProgress, initRevealOnScroll, initHeroTyping, initHeroParallax,
  initSubscribeForm,
} from "./home-functions.js";

document.addEventListener("DOMContentLoaded", () => {
  renderContent();
  initParticleField(document.getElementById("pageParticles"));
  initPreloader();
  initCustomCursor();
  initHeaderAndNav();
  initSectionDotNav();
  initScrollProgress();
  initRevealOnScroll();
  initHeroTyping();
  initHeroParallax();
  initSubscribeForm();

  // Component-owned interactivity, wired against the containers main.js just filled.
  initTechBadges(document.getElementById("techTrack"), document.getElementById("techDetail"));
  initStatCounters(document.getElementById("statGrid"));
  initSkillBars(document.getElementById("skillGrid"));
  initAccordion(document.getElementById("accordion"));
  initProjectTilt(document.getElementById("projectGrid"), { skip: isCoarsePointer() });
});

function renderContent() {
  // Tech marquee — logo list is doubled so the CSS scroll-loop is seamless.
  const track = document.getElementById("techTrack");
  track.innerHTML = [...TECH_LOGOS, ...TECH_LOGOS].map(renderTechBadge).join("");
  document.getElementById("techDetailSlot").innerHTML = renderTechDetailPanel();

  document.getElementById("statGrid").innerHTML = STATS.map(renderStat).join("");
  document.getElementById("skillGrid").innerHTML = SKILLS.map(renderSkillRow).join("");
  document.getElementById("serviceList").innerHTML = SERVICES.map(renderServiceCard).join("");
  document.getElementById("projectGrid").innerHTML = PROJECTS.map(renderProjectCard).join("");
  document.getElementById("accordion").innerHTML = WHY.map(renderAccordionItem).join("");
  document.getElementById("footerConnect").insertAdjacentHTML(
    "beforeend",
    SOCIALS.map(renderSocialLink).join("")
  );
}
