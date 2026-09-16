/* ParticleField.js */
export function initParticleField(canvas, options = {}) {
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const state = {
    opt: Object.assign(
      {
        count: 110,
        speed: 3,          // depth units per second (page-wide default: gentle)
        maxSize: 16,        // px, at the closest point
        minAlpha: 0.12,     // never fully invisible, even at max distance
        maxAlpha: 0.55,     // kept low this is ambient texture, not a focal effect
        depth: 900,
        focal: 420,
        square: true,
        colors: ["#D9AE72", "#8A6E86", "#7C93E0"], // muted amber / plum / periwinkle
      },
      options
    ),
    particles: [],
    boxW: 0,
    boxH: 0,
    raf: 0,
  };

  function makeParticle(z) {
    const o = state.opt;
    return {
      nx: Math.random() * 2 - 1,
      ny: Math.random() * 2 - 1,
      z: z != null ? z : 30 + Math.random() * o.depth,
      rot: Math.random() * Math.PI,
      spin: (Math.random() * 2 - 1) * 0.004,
      color: o.colors[(Math.random() * o.colors.length) | 0],
    };
  }

  function rebuild() {
    state.particles = Array.from({ length: state.opt.count }, () => makeParticle());
  }

  function resize() {
    state.boxW = window.innerWidth;
    state.boxH = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = state.boxW * dpr;
    canvas.height = state.boxH * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function draw() {
    const o = state.opt;
    const cx = state.boxW / 2, cy = state.boxH / 2;
    ctx.clearRect(0, 0, state.boxW, state.boxH);

    state.particles.forEach((p) => {
      const k = o.focal / p.z;
      const sx = cx + p.nx * o.focal * k;
      const sy = cy + p.ny * o.focal * k;
      const size = Math.max(1.2, o.maxSize * k);
      const depthFade = 1 - p.z / o.depth;
      const entryFade = Math.min(1, p.z / 60);
      const alpha = o.minAlpha + Math.max(0, depthFade) * entryFade * (o.maxAlpha - o.minAlpha);

      ctx.save();
      ctx.translate(sx, sy);
      ctx.rotate(p.rot);
      ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
      ctx.fillStyle = p.color;
      ctx.fillRect(-size / 2, -size / 2, size, size);
      ctx.restore();
    });
  }

  let lastT = performance.now();
  function step(t) {
    const dt = Math.min((t - lastT) / 1000, 0.05);
    lastT = t;
    const o = state.opt;
    state.particles.forEach((p) => {
      p.z -= o.speed * dt * 20;
      p.rot += p.spin;
      if (p.z < 30) Object.assign(p, makeParticle(o.depth));
    });
    draw();
    state.raf = requestAnimationFrame(step);
  }

  function start() {
    if (state.raf || reduceMotion) return;
    lastT = performance.now();
    state.raf = requestAnimationFrame(step);
  }
  function stop() {
    cancelAnimationFrame(state.raf);
    state.raf = 0;
  }

  const onResize = () => resize();
  const onVisibility = () => (document.hidden ? stop() : start());
  window.addEventListener("resize", onResize);
  document.addEventListener("visibilitychange", onVisibility);

  resize();
  rebuild();
  if (reduceMotion) draw();
  else start();

  return {
    update(partial) {
      Object.assign(state.opt, partial);
      if ("count" in partial) rebuild();
    },
    destroy() {
      stop();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    },
  };
}
