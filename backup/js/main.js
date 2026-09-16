/* main.js: home page entry point (loaded as <script type="module">). */
import { isCoarsePointer } from "./general-functions.js";
import { initSiteShell } from "./site-shell.js";

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

import { initSectionDotNav, initHeroTyping, initHeroParallax, initSubscribeForm } from "./home-functions.js";

document.addEventListener("DOMContentLoaded", () => {
  initSiteShell();
  renderContent();

  initSectionDotNav();
  initHeroTyping();
  initHeroParallax();
  initSubscribeForm();

  initTechBadges(document.getElementById("techTrack"), document.getElementById("techDetail"));
  initStatCounters(document.getElementById("statGrid"));
  initSkillBars(document.getElementById("skillGrid"));
  initAccordion(document.getElementById("accordion"));
  initProjectTilt(document.getElementById("projectGrid"), { skip: isCoarsePointer() });
});

function renderContent() {
  const track = document.getElementById("techTrack");
  track.innerHTML = [...TECH_LOGOS, ...TECH_LOGOS].map(renderTechBadge).join("");
  document.getElementById("techDetailSlot").innerHTML = renderTechDetailPanel();

  document.getElementById("statGrid").innerHTML = STATS.map(renderStat).join("");
  document.getElementById("skillGrid").innerHTML = SKILLS.map(renderSkillRow).join("");
  document.getElementById("serviceList").innerHTML = SERVICES.map(renderServiceCard).join("");
  document.getElementById("projectGrid").innerHTML = PROJECTS.filter((p) => p.featured).map(renderProjectCard).join("");
  document.getElementById("accordion").innerHTML = WHY.map(renderAccordionItem).join("");
  document.getElementById("footerConnect").insertAdjacentHTML(
    "beforeend",
    SOCIALS.map(renderSocialLink).join("")
  );
}
