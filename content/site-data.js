/* ============================================================
   site-data.js
   Page content lives here, separate from the component files
   that render it. Edit copy/numbers/links in this one place.
============================================================ */

export const TECH_LOGOS = [
  { name: "GitHub",       abbr: "GH", color: "#1F2542" },
  { name: "Flutter",      abbr: "FL", color: "#4C6EF5" },
  { name: "Python",       abbr: "PY", color: "#E8A33D" },
  { name: "Firebase",     abbr: "FB", color: "#E8A33D" },
  { name: "Figma",        abbr: "FG", color: "#4C6EF5" },
  { name: "Go",           abbr: "GO", color: "#4C6EF5" },
  { name: "React Native", abbr: "RN", color: "#4A1942" },
  { name: "Android",      abbr: "AN", color: "#1F2542" },
];

/* One shared proficiency source used by both the hero tech-badge
   detail panel and the "My technologies" skill bars, so the two
   sections can never disagree with each other. */
export const TECH_DETAILS = {
  GitHub:       { pct: 90,  text: "Version control, branching workflows, and CI-friendly repo hygiene." },
  Flutter:      { pct: 82,  text: "Cross-platform mobile UI with a single codebase for iOS and Android." },
  Python:       { pct: 86,  text: "Scripting, APIs, and back-end services with Django/Flask." },
  Firebase:     { pct: 100, text: "Auth, real-time database, and hosting for fast-shipping apps." },
  Figma:        { pct: 78,  text: "Translating designs into pixel-accurate, responsive interfaces." },
  Go:           { pct: 70,  text: "Lightweight, concurrent back-end services and APIs." },
  "React Native": { pct: 91, text: "Native-feeling mobile apps shared across platforms." },
  Android:      { pct: 75,  text: "Native Android fundamentals for platform-specific needs." },
};

export const STATS = [
  { value: 5,   suffix: "+", label: "Years experience" },
  { value: 30,  suffix: "+", label: "Projects completed" },
  { value: 44,  suffix: "+", label: "Happy clients" },
  { value: 100, suffix: "%", label: "Client satisfaction" },
];

export const SKILLS = [
  { name: "HTML",         pct: 95 },
  { name: "React Native", pct: 91 },
  { name: "Flutter",      pct: 82 },
  { name: "C++",          pct: 88 },
  { name: "Python",       pct: 86 },
  { name: "Firebase",     pct: 100 },
];

export const SERVICES = [
  {
    title: "Front-end development",
    text: "Building responsive, modern, and interactive user interfaces that deliver smooth and engaging user experiences.",
    tech: "HTML · CSS · JavaScript · React · Flutter",
    tone: "plum",
  },
  {
    title: "Back-end development",
    text: "Developing secure, scalable, and efficient server-side systems, APIs, and application logic.",
    tech: "Node.js · Python · REST APIs",
    tone: "navy",
  },
  {
    title: "Database development",
    text: "Designing and managing structured, scalable databases to efficiently store, organize, and retrieve application data.",
    tech: "Firebase · MySQL · PostgreSQL · MongoDB",
    tone: "clay",
  },
  {
    title: "Mobile app development",
    text: "Creating modern cross-platform mobile applications that deliver consistent experiences across different devices.",
    tech: "Flutter · Firebase · React Native · Swift",
    tone: "slate",
  },
  {
    title: "API integration",
    text: "Connecting applications with third-party services, APIs, authentication systems, and cloud platforms.",
    tech: "",
    tone: "plum",
  },
  {
    title: "System development & problem solving",
    text: "Turning complex ideas into practical, reliable, and scalable software solutions.",
    tech: "",
    tone: "navy",
  },
];

/* `image` is intentionally blank drop a file into content/images/
   and set the path here (e.g. "content/images/project-1.jpg") to
   fill the card; until then the tone color shows through instead. */
export const PROJECTS = [
  { title: "Commerce mobile app",  role: "Flutter · Firebase",     tone: "plum",  image: "" },
  { title: "Operations dashboard", role: "React · Node.js",        tone: "navy",  image: "" },
  { title: "Booking platform",     role: "React Native · MongoDB", tone: "amber", image: "" },
];

export const WHY = [
  { title: "Problem solver", text: "I break big, ambiguous requests into clear technical steps, and I don't stop at the first solution that works I look for the one that holds up." },
  { title: "Continuous learner", text: "Tools change fast. I keep a working list of what I'm exploring next, from new frameworks to backend patterns, so my stack never goes stale." },
  { title: "User-focused", text: "Every screen and endpoint gets built with the person on the other end in mind  fast, clear, and easy to trust." },
  { title: "Passionate builder", text: "I like shipping things that work end to end: from database schema to the pixel on screen." },
];

export const SOCIALS = [
  { label: "+256 7XX XXX XXX",      href: "tel:+2567XXXXXXXX", icon: "phone" },
  { label: "@kezia.fullstack.ug",   href: "#", icon: "instagram" },
  { label: "@kezia.fullstack.ug",   href: "#", icon: "twitter" },
  { label: "@kezia.fullstack.ug",   href: "#", icon: "linkedin" },
  { label: "Kampala, Uganda",       href: "#", icon: "pin" },
];

export const HERO_PHRASES = [
  "A full-stack developer in Uganda",
  "Front-end craftsman",
  "Back-end engineer",
  "Mobile app builder",
];
