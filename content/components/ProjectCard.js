/* ProjectCard.js */
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

export function renderProjectListItem(p, i, isActive) {
  return `
    <button type="button" class="project-list-item tone-${p.tone} ${isActive ? "is-active" : ""}" data-id="${p.id}" data-cursor="hover">
      <span class="project-list-index">${String(i + 1).padStart(2, "0")}</span>
      <span class="project-list-title">${p.title}</span>
      <span class="project-list-role">${p.role}</span>
    </button>`;
}

export function renderProjectDetail(p) {
  const techChips = (p.tech || []).map((t) => `<span class="tech-chip">${t}</span>`).join("");
  const liveBtn = p.liveUrl
    ? `<a href="${p.liveUrl}" target="_blank" rel="noopener" class="btn btn-primary" data-cursor="hover">Visit live project ${icon("arrow")}</a>`
    : `<span class="btn btn-ghost btn-disabled" aria-disabled="true">Live link coming soon</span>`;
  const repoBtn = p.repoUrl
    ? `<a href="${p.repoUrl}" target="_blank" rel="noopener" class="btn btn-ghost" data-cursor="hover">View source</a>`
    : "";

  return `
    <article class="project-detail-card tone-${p.tone}">
      <div class="project-detail-image"><div class="project-tab-top"></div></div>
      <div class="project-detail-body">
        <span class="project-detail-year">${p.year || ""}</span>
        <h2>${p.title}</h2>
        <p>${p.description || p.summary || ""}</p>
        <div class="tech-chip-row">${techChips}</div>
        <div class="project-detail-actions">${liveBtn}${repoBtn}</div>
      </div>
    </article>`;
}

export function initProjectBrowser(listEl, detailEl, projects) {
  function select(id) {
    const project = projects.find((p) => p.id === id) || projects[0];
    detailEl.innerHTML = renderProjectDetail(project);
    listEl.querySelectorAll(".project-list-item").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.id === project.id);
    });
    history.replaceState(null, "", `#${project.id}`);
  }

  listEl.innerHTML = projects.map((p, i) => renderProjectListItem(p, i, i === 0)).join("");
  listEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".project-list-item");
    if (btn) select(btn.dataset.id);
  });

  const initialId = location.hash.replace("#", "");
  select(projects.some((p) => p.id === initialId) ? initialId : projects[0].id);
}
