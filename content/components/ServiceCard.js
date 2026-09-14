/* ============================================================
   ServiceCard.js
   One colored service card. Fix 3: text is explicitly white
   (it was inheriting a dark heading color before) and a beveled
   left edge gives it the simple "3D extension" look requested.
============================================================ */

export function renderServiceCard(s) {
  return `
    <article class="service-card tone-${s.tone}">
      <h3>${s.title}</h3>
      <p>${s.text}</p>
      ${s.tech ? `<p class="service-tech">${s.tech}</p>` : ""}
      <span class="service-shape" aria-hidden="true"></span>
    </article>`;
}
