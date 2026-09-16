/* site-shell.js: shared page shell (particles, preloader, cursor, header, scroll progress) */
import { initParticleField } from "../content/components/ParticleField.js";
import {
  initPreloader, initCustomCursor, initHeaderAndNav,
  initScrollProgress, initRevealOnScroll,
} from "./home-functions.js";

export function initSiteShell() {
  const canvas = document.getElementById("pageParticles");
  if (canvas) {
    const isNarrow = window.innerWidth < 700;
    initParticleField(canvas, isNarrow ? { count: 50, maxSize: 10, maxAlpha: 0.4 } : {});
  }
  initPreloader();
  initCustomCursor();
  initHeaderAndNav();
  initScrollProgress();
  initRevealOnScroll();
}
