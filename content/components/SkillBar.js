/* ============================================================
   SkillBar.js
   One "HTML — 95%"-style progress row. Fills and counts up over
   a fixed 2-second span once scrolled into view (Fix 2).
============================================================ */
import { onIntersectOnce, animateNumber } from "../../js/general-functions.js";

const FILL_DURATION_MS = 2000; // Fix 2: 2 seconds, on scroll into view

export function renderSkillRow(s, i) {
  return `
    <div class="skill-row" data-pct="${s.pct}">
      <div class="skill-head">
        <span>${s.name}</span>
        <span class="skill-pct" id="skillpct-${i}">0%</span>
      </div>
      <div class="skill-track"><div class="skill-fill" id="skillfill-${i}"></div></div>
    </div>`;
}

export function initSkillBars(root) {
  root.querySelectorAll(".skill-row").forEach((row) => {
    onIntersectOnce(row, (target) => {
      const pct = parseInt(target.dataset.pct, 10);
      const fill = target.querySelector(".skill-fill");
      const label = target.querySelector(".skill-pct");
      fill.style.transitionDuration = FILL_DURATION_MS + "ms";
      fill.style.width = pct + "%";
      animateNumber({
        to: pct,
        duration: FILL_DURATION_MS,
        onUpdate: (v) => (label.textContent = v + "%"),
      });
    });
  });
}
