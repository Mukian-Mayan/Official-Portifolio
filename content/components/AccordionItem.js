/* ============================================================
   AccordionItem.js
   One expandable "Why work with me" row.
============================================================ */
import { icon } from "../../js/general-functions.js";

export function renderAccordionItem(w, i) {
  return `
    <div class="accordion-item" data-index="${i}">
      <button class="accordion-trigger" aria-expanded="false" aria-controls="acc-panel-${i}">
        <span>${w.title}</span>
        <span class="accordion-icon">${icon("chevron")}</span>
      </button>
      <div class="accordion-panel" id="acc-panel-${i}">
        <p>${w.text}</p>
      </div>
    </div>`;
}

/** Single-open accordion behaviour for every .accordion-item in `root`. */
export function initAccordion(root) {
  const items = root.querySelectorAll(".accordion-item");
  items.forEach((item) => {
    const trigger = item.querySelector(".accordion-trigger");
    const panel = item.querySelector(".accordion-panel");
    trigger.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");
      items.forEach((other) => {
        other.classList.remove("is-open");
        other.querySelector(".accordion-trigger").setAttribute("aria-expanded", "false");
        other.querySelector(".accordion-panel").style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });
}
