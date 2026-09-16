/* general-functions.js */
export const ICONS = {
  phone: '<path d="M4 3h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 12l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 2 5a2 2 0 0 1 2-2Z"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/>',
  twitter: '<path d="M22 5.9c-.7.3-1.5.6-2.3.7a4 4 0 0 0 1.8-2.2 8 8 0 0 1-2.5 1 4 4 0 0 0-6.9 3.6A11.4 11.4 0 0 1 3.8 4.6a4 4 0 0 0 1.2 5.3 4 4 0 0 1-1.8-.5v.1a4 4 0 0 0 3.2 3.9 4 4 0 0 1-1.8.1 4 4 0 0 0 3.7 2.8A8 8 0 0 1 2 18.4a11.3 11.3 0 0 0 6.1 1.8c7.3 0 11.3-6 11.3-11.3v-.5A8 8 0 0 0 22 5.9Z"/>',
  linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8.5" r="1.4"/><path d="M6.8 11.5v6M12 11.5v6M12 14c0-1.4 1-2.2 2.2-2.2 1.3 0 2 .9 2 2.4v3.3"/>',
  pin: '<path d="M12 21s7-6.3 7-11.5A7 7 0 0 0 5 9.5C5 14.7 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.3"/>',
  arrow: '<path d="M7 17 17 7M9 7h8v8"/>',
  chevron: '<path d="M6 9l6 6 6-6"/>',
};

export function icon(name, extraClass) {
  return `<svg class="icon ${extraClass || ""}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ""}</svg>`;
}

export function isFinePointer() {
  return window.matchMedia("(pointer: fine)").matches;
}
export function isCoarsePointer() {
  return window.matchMedia("(pointer: coarse)").matches;
}

export function onIntersectOnce(el, callback, options = { threshold: 0.3 }) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, options);
  observer.observe(el);
  return observer;
}

export function animateNumber({ from = 0, to, duration = 1400, onUpdate, onDone }) {
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(from + (to - from) * eased);
    onUpdate(value);
    if (progress < 1) requestAnimationFrame(step);
    else if (onDone) onDone();
  }
  requestAnimationFrame(step);
}
