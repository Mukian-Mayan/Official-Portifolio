/* ============================================================
   TechBadge.js
   A single technology badge in the hero marquee. Clicking one
   expands a shared detail panel with its name, a short blurb,
   and a proficiency progress bar (Fix 1: click-to-expand detail).
============================================================ */
import { animateNumber } from "../../js/general-functions.js";
import { TECH_DETAILS } from "../site-data.js";

export function renderTechBadge(t) {
  return `
    <button type="button" class="tech-badge" style="--badge-color:${t.color}" data-cursor="hover" data-tech="${t.name}">
      <span class="tech-abbr">${t.abbr}</span>
      <span class="tech-tip">${t.name}</span>
    </button>`;
}

export function renderTechDetailPanel() {
  return `
    <div class="tech-detail" id="techDetail" hidden>
      <div class="tech-detail-head">
        <span class="tech-detail-name" id="techDetailName"></span>
        <span class="tech-detail-pct" id="techDetailPct">0%</span>
      </div>
      <p class="tech-detail-text" id="techDetailText"></p>
      <div class="skill-track"><div class="skill-fill" id="techDetailFill"></div></div>
    </div>`;
}

/** Wires click-to-expand behaviour for every badge inside `trackEl`,
 *  writing into the single detail panel `panelEl`. */
export function initTechBadges(trackEl, panelEl) {
  const nameEl = panelEl.querySelector("#techDetailName");
  const pctEl = panelEl.querySelector("#techDetailPct");
  const textEl = panelEl.querySelector("#techDetailText");
  const fillEl = panelEl.querySelector("#techDetailFill");
  let openName = null;

  trackEl.addEventListener("click", (e) => {
    const badge = e.target.closest(".tech-badge");
    if (!badge) return;
    const techName = badge.dataset.tech;
    const detail = TECH_DETAILS[techName] || { pct: 0, text: "Details coming soon." };

    if (openName === techName) {
      panelEl.hidden = true;
      openName = null;
      return;
    }
    openName = techName;
    panelEl.hidden = false;
    nameEl.textContent = techName;
    textEl.textContent = detail.text;
    fillEl.style.width = "0%";
    pctEl.textContent = "0%";

    animateNumber({
      to: detail.pct,
      duration: 900,
      onUpdate: (v) => {
        fillEl.style.width = v + "%";
        pctEl.textContent = v + "%";
      },
    });
  });
}
