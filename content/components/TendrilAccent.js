/* ============================================================
   TendrilAccent.js
   A small, quiet corner accent  2 muted tendrils drifting gently.
   Deliberately restrained: this replaces the hero's decorative
   cube, not the whole hero background. Same back-to-front rise
   trick as the fx sandbox (dim/thick at the root, brighter/thinner
   at the tip), just scaled down and toned way back.
============================================================ */

const DEFAULTS = {
  count: 2,
  amp: 16,      // gentle  this is a signature detail, not a focal point
  speed: 40,
  segs: 7,
  width: 5,
  colors: ["#8A6E86", "#7C93E0"], // muted plum / muted periwinkle
};

export function initTendrilAccent(canvas, options = {}) {
  const opts = Object.assign({}, DEFAULTS, options);
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let boxW = 0, boxH = 0;
  let tendrils = [];

  function seed() {
    tendrils = Array.from({ length: opts.count }, (_, i) => ({
      seed: Math.random() * 100,
      baseAngle: Math.PI / 2 + (i - (opts.count - 1) / 2) * 0.3, // pointing downward, fanned slightly
      rootOffsetX: (i - (opts.count - 1) / 2) * (boxW * 0.16),
      color: opts.colors[i % opts.colors.length],
      beadIndices: Array.from({ length: opts.segs }, (_, s) => s).filter(() => Math.random() > 0.6),
    }));
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    boxW = rect.width;
    boxH = rect.height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = boxW * dpr;
    canvas.height = boxH * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
  }
  window.addEventListener("resize", resize);
  resize();

  function hexToRgba(hex, alpha) {
    const n = parseInt(hex.slice(1), 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
  }

  function buildPoints(tendril, t) {
    const segLen = boxH / (opts.segs + 1);
    let angle = tendril.baseAngle;
    let x = boxW / 2 + tendril.rootOffsetX;
    let y = boxH * 0.04;
    const pts = [{ x, y, progress: 0 }];

    for (let i = 1; i <= opts.segs; i++) {
      const progress = i / opts.segs;
      const reach = Math.pow(progress, 1.4); // back-to-front rise
      const wiggle = Math.sin(t * opts.speed * 0.00025 + i * 0.7 + tendril.seed) * (opts.amp / 260) * reach;
      angle += wiggle;
      x += Math.cos(angle) * segLen;
      y += Math.sin(angle) * segLen;
      pts.push({ x, y, progress });
    }
    return pts;
  }

  function drawTendril(tendril, pts) {
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i], b = pts[i + 1];
      const p = b.progress;
      const segWidth = opts.width * (1 - p * 0.6);
      const alpha = 0.28 + p * 0.55; // stays soft even at the brightest point

      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = hexToRgba(tendril.color, alpha * 0.85);
      ctx.lineWidth = segWidth;
      ctx.stroke();

      ctx.strokeStyle = hexToRgba("#ffffff", alpha * 0.22);
      ctx.lineWidth = segWidth * 0.5;
      ctx.stroke();
    }

    tendril.beadIndices.forEach((i) => {
      const pt = pts[i];
      if (!pt) return;
      const alpha = 0.2 + pt.progress * 0.5;
      const r = 1.6 + pt.progress * 1.8;
      const grad = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, r);
      grad.addColorStop(0, hexToRgba("#ffffff", alpha));
      grad.addColorStop(1, hexToRgba(tendril.color, 0));
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, r, 0, Math.PI * 2);
      ctx.fill();
    });

    const tip = pts[pts.length - 1];
    ctx.save();
    ctx.shadowColor = tendril.color;
    ctx.shadowBlur = 8;
    const tipGrad = ctx.createRadialGradient(tip.x, tip.y, 0, tip.x, tip.y, 4);
    tipGrad.addColorStop(0, "rgba(255,255,255,0.7)");
    tipGrad.addColorStop(1, hexToRgba(tendril.color, 0.1));
    ctx.fillStyle = tipGrad;
    ctx.beginPath();
    ctx.arc(tip.x, tip.y, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function frame(t) {
    ctx.clearRect(0, 0, boxW, boxH);
    tendrils.forEach((tendril) => drawTendril(tendril, buildPoints(tendril, t)));
    if (!reduceMotion) requestAnimationFrame(frame);
  }

  if (reduceMotion) {
    // Draw one calm static frame instead of looping, per prefers-reduced-motion.
    frame(0);
  } else {
    requestAnimationFrame(frame);
  }
}
