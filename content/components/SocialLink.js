/* SocialLink.js */
import { icon } from "../../js/general-functions.js";

export function renderSocialLink(s) {
  return `
    <a href="${s.href}" class="social-link" data-cursor="hover">
      ${icon(s.icon)}
      <span>${s.label}</span>
    </a>`;
}
