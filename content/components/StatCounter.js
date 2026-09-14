/* ============================================================
   StatCounter.js
   One "5+ years experience"-style counter. Counts up from 0 to
   its target once scrolled into view.
============================================================ */
import { onIntersectOnce, animateNumber } from "../../js/general-functions.js";

export function renderStat(s, i) {
  return `
    <div class="stat" data-target="${s.value}" data-suffix="${s.suffix}">
      <span class="stat-number" id="stat-${i}">0</span>
      <span class="stat-label">${s.label}</span>
    </div>`;
}

/** Finds every .stat inside `root` and animates each once visible. */
export function initStatCounters(root) {
  root.querySelectorAll(".stat").forEach((statEl) => {
    onIntersectOnce(statEl, (target) => {
      const to = parseInt(target.dataset.target, 10);
      const suffix = target.dataset.suffix || "";
      const numberEl = target.querySelector(".stat-number");
      animateNumber({
        to,
        duration: 1800,
        onUpdate: (v) => (numberEl.textContent = v + suffix),
      });
    });
  });
}
