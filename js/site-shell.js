/* site-shell.js — shared page shell (particles, preloader, cursor, header, scroll progress) */
import { initParticleField } from "../content/components/ParticleField.js";
import {
  initPreloader, initCustomCursor, initHeaderAndNav,
  initScrollProgress, initRevealOnScroll,
} from "./home-functions.js";

export function initSiteShell() {
  const canvas = document.getElementById("pageParticles");
  if (canvas) initParticleField(canvas);
  initPreloader();
  initCustomCursor();
  initHeaderAndNav();
  initScrollProgress();
  initRevealOnScroll();
}
