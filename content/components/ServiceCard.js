/* ServiceCard.js */
export function renderServiceCard(s) {
  return `
    <article class="service-card tone-${s.tone}">
      <h3>${s.title}</h3>
      <p>${s.text}</p>
      ${s.tech ? `<p class="service-tech">${s.tech}</p>` : ""}
      <span class="service-shape" aria-hidden="true"></span>
    </article>`;
}
