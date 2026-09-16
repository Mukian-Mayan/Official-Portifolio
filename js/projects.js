import { initSiteShell } from "./site-shell.js";
import { PROJECTS, SOCIALS } from "../content/site-data.js";
import { initProjectBrowser } from "../content/components/ProjectCard.js";
import { renderSocialLink } from "../content/components/SocialLink.js";

document.addEventListener("DOMContentLoaded", () => {
  initSiteShell();
  initProjectBrowser(
    document.getElementById("projectList"),
    document.getElementById("projectDetail"),
    PROJECTS
  );
  document.getElementById("footerConnect").insertAdjacentHTML("beforeend", SOCIALS.map(renderSocialLink).join(""));
});
