import { initSiteShell } from "./site-shell.js";
import { PROJECTS } from "../content/site-data.js";
import { initProjectBrowser } from "../content/components/ProjectCard.js";

document.addEventListener("DOMContentLoaded", () => {
  initSiteShell();
  initProjectBrowser(
    document.getElementById("projectList"),
    document.getElementById("projectDetail"),
    PROJECTS
  );
});
