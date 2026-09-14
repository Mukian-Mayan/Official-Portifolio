/* ============================================================
   ProjectCard.js
   Fix 4: restored the original notch/tab card shape instead of
   the gradient-glow version. The card body is left empty (or
   shows `image` if one is set in site-data.js) so a real project
   screenshot can be dropped in later without restyling anything.
============================================================ */
import { icon } from "../../js/general-functions.js";

export function renderProjectCard(p) {
  const bg = p.image ? `style="background-image:url('${p.image}')"` : "";
  return `
    <a href="#" class="project-card tone-${p.tone}" data-cursor="hover">
      <div class="project-image" ${bg}></div>
      <span class="project-tab-top"></span>
      <span class="project-tab-bottom">${icon("arrow")}</span>
      <div class="project-caption">
        <h3>${p.title}</h3>
        <p>${p.role}</p>
      </div>
    </a>`;
}

/** Subtle 3D tilt following the cursor  skipped on touch devices. */
export function initProjectTilt(root, { skip = false } = {}) {
  if (skip) return;
  root.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateX(${relY * -8}deg) rotateY(${relX * 10}deg) translateY(-4px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(800px) rotateX(0) rotateY(0) translateY(0)";
    });
  });
}
