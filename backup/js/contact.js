import { initSiteShell } from "./site-shell.js";
import { SOCIALS } from "../content/site-data.js";
import { renderSocialLink } from "../content/components/SocialLink.js";

document.addEventListener("DOMContentLoaded", () => {
  initSiteShell();

  document.getElementById("contactSocials").innerHTML = SOCIALS.map(renderSocialLink).join("");

  const form = document.getElementById("contactForm");
  const feedback = document.getElementById("contactFeedback");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    if (!name) return;
    feedback.textContent = `Thanks, ${name}! Your message is ready to send once this form is connected to an email service (see README).`;
    form.reset();
  });
});
