import React from "react";

/* ---------- design tokens + global rules (from the BSP design system) ---------- */
const CSS = ":root {\n  --night:        #0e0b24;  \n  --night-mid:    #181338;  \n  --night-light:  #2a2456;  \n  --night-deep:   #1f1a42;  \n  --night-tooltip:#14102e;  \n  --ink-chat:     #26252e;  \n  --red:        #e23c41;  \n  --red-hover:  #c8333a;  \n  --red-bright: #e8474c;  \n  --red-deep:   #cf3238;  \n  --white:          #ffffff;\n  --text-primary:   #ffffff;  \n  --text-body:      #d4d1e0;  \n  --text-secondary: #c5c3ce;  \n  --text-soft:      #ececf2;  \n  --text-muted:     #8a879a;  \n  --text-faint:     #73708a;  \n  --success:        #22c55e;  \n  --success-light:  #86efac;  \n  --red-006: rgba(226, 60, 65, .06);  \n  --red-008: rgba(226, 60, 65, .08);  \n  --red-012: rgba(226, 60, 65, .12);  \n  --red-018: rgba(226, 60, 65, .18);  \n  --red-022: rgba(226, 60, 65, .22);  \n  --red-035: rgba(226, 60, 65, .35);  \n  --red-glow: rgba(226, 60, 65, .15);  \n  --white-05: rgba(255, 255, 255, .05);\n  --white-06: rgba(255, 255, 255, .06);\n  --white-12: rgba(255, 255, 255, .12);\n  --surface-base:     var(--night);\n  --surface-alt:      var(--night-mid);\n  --surface-raised:   var(--night-light);\n  --surface-popover:  var(--night-tooltip);\n  --border-hairline:  var(--white-06);\n  --border-strong:    var(--white-12);  \n  --border-accent:    var(--red-008);\n  --card-fill:        rgba(24, 19, 56, .35);  \n}\n:root {\n  --paper:      #f6f4ee;  \n  --paper-dim:  #eeebe2;  \n  --paper-ink:       #16132e;  \n  --paper-ink-soft:  #3b3852;  \n  --paper-ink-mute:  #6d6a80;  \n  --paper-rule:      rgba(22, 19, 46, .16);  \n  --paper-rule-soft: rgba(22, 19, 46, .09);  \n  --paper-red-rule:  rgba(226, 60, 65, .28); \n  --paper-grain: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .04 0'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E\"); \n}\n.surface-paper {\n  background: var(--paper);\n  color: var(--paper-ink);\n  --surface-base:    var(--paper);\n  --surface-alt:     var(--paper-dim);\n  --text-primary:    var(--paper-ink);\n  --text-body:       var(--paper-ink);\n  --text-secondary:  var(--paper-ink-soft);\n  --text-muted:      var(--paper-ink-mute);\n  --text-faint:      var(--paper-ink-mute);\n  --border-hairline: var(--paper-rule-soft);\n  --border-strong:   var(--paper-rule);\n  --border-accent:   var(--paper-red-rule);\n  --card-fill:       rgba(22, 19, 46, .04);\n}\n:root {\n  --font-sans: 'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif; \n  --font-serif: 'Newsreader', Georgia, 'Times New Roman', serif;  \n  --font-mono: 'IBM Plex Mono', ui-monospace, 'SFMono-Regular', Menlo, monospace;  \n  --fw-serif-display: 500;    \n  --lh-serif-display: 1.08;  \n  --ls-serif-display: -.012em; \n  --fs-mono-meta: .68rem;     \n  --ls-mono-meta: .16em;      \n  --fs-hero:      clamp(3rem, 8vw, 6.5rem);       \n  --fs-display:   clamp(2.8rem, 7.5vw, 5.75rem);  \n  --fs-h2:        clamp(2rem, 5vw, 3.75rem);      \n  --fs-h3:        clamp(1.5rem, 2.5vw, 2.25rem);  \n  --fs-h4:        clamp(1.55rem, 3.4vw, 3rem);    \n  --lh-hero:      .92;    \n  --lh-tight:     1.05;  \n  --lh-heading:   1.1;   \n  --ls-display:  -.03em;  \n  --ls-heading:  -.02em;  \n  --fs-lead:   clamp(1.1rem, 2vw, 1.35rem);   \n  --fs-body:   1.05rem;    \n  --fs-body-sm: 15px;      \n  --lh-body:   1.8;        \n  --lh-body-relaxed: 1.85;\n  --fs-eyebrow:  clamp(.65rem, .9vw, .78rem);  \n  --fs-label:    11px;     \n  --fs-label-sm: 10px;     \n  --ls-eyebrow:  .22em;    \n  --ls-label:    .15em;    \n  --ls-nav:      .15em;    \n  --ls-wide:     .2em;     \n  --fw-regular:  400;   \n  --fw-medium:   500;   \n  --fw-semibold: 600;   \n  --fw-bold:     700;    \n  --fw-heavy:    800;    \n}\n:root {\n  --container:      1320px;  \n  --container-narrow: 1180px;\n  --gutter:         clamp(1.5rem, 4vw, 4rem);   \n  --section-y:      clamp(3.5rem, 6vw, 5.5rem);  \n  --section-y-lg:   clamp(4rem, 7vw, 6rem);     \n  --gap-section:    clamp(2.5rem, 5vw, 5.5rem);\n  --space-1:  4px;\n  --space-2:  6px;\n  --space-3:  8px;\n  --space-4:  10px;\n  --space-5:  12px;\n  --space-6:  16px;\n  --space-7:  20px;\n  --space-8:  24px;\n  --space-9:  32px;\n  --space-10: 40px;\n  --space-11: 48px;\n  --space-12: 56px;\n  --radius-0:    0;     \n  --radius-xs:   2px;   \n  --radius-sm:   4px;   \n  --radius-md:   6px;   \n  --radius-lg:   8px;   \n  --radius-xl:   10px;  \n  --radius-2xl:  20px;  \n  --radius-pill: 99px;  \n  --radius-full: 50%;   \n  --btn-pad:       16px 36px;  \n  --input-pad:     14px;       \n  --tap-min:       44px;       \n}\n:root {\n  --ease-signature: cubic-bezier(.23, 1, .32, 1);  \n  --ease-out:       cubic-bezier(0, 0, .2, 1);    \n  --dur-fast:   .25s;  \n  --dur:        .3s;   \n  --dur-slow:   .45s;  \n  --dur-reveal: .9s;    \n  --shadow-button:  0 8px 24px rgba(226, 60, 65, .3);          \n  --shadow-toast:   0 18px 50px rgba(0, 0, 0, .45);            \n  --shadow-panel:   0 24px 64px rgba(0, 0, 0, .6),\n                    inset 0 1px 0 rgba(255, 255, 255, .05);    \n  --shadow-launcher:0 8px 32px rgba(0, 0, 0, .45),\n                    inset 0 1px 0 rgba(255, 255, 255, .06);    \n  --shadow-login:   0 40px 90px rgba(0, 0, 0, .5);             \n  --shadow-text:    0 2px 22px rgba(8, 6, 20, .9),\n                    0 1px 4px rgba(8, 6, 20, .6);              \n  --blur-nav:    blur(16px);          \n  --blur-glass:  blur(28px);          \n  --glass-nav:   rgba(14, 11, 36, .6);\n  --glass-panel: rgba(12, 11, 18, .94);\n  --divider-red: linear-gradient(90deg, transparent, rgba(226, 60, 65, .15), transparent); \n  --grain: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.6'/%3E%3C/svg%3E\"); \n  --glow-red: radial-gradient(circle, rgba(226, 60, 65, .5), transparent 60%); \n}\n@keyframes bsp-rise {\n  to { transform: translateY(0); }\n}\n@keyframes bsp-fade-up {\n  from { opacity: 0; transform: translateY(20px); }\n  to   { opacity: 1; transform: translateY(0); }\n}\n@keyframes bsp-blink {\n  0%, 100% { opacity: 1; }\n  50%      { opacity: 0; }\n}\n*{margin:0;padding:0;box-sizing:border-box}\nhtml{scroll-behavior:smooth}\nbody{background:#0e0b24;color:#fff;font-family:var(--font-sans);overflow-x:hidden}\na{color:#fff}a:hover{color:var(--red)}\n::selection{background:rgba(226,60,65,.27);color:#fff}\n.bsp-navlink{position:relative}\n.bsp-navlink::after{content:\"\";position:absolute;bottom:-4px;left:0;width:0;height:2px;background:var(--red);transition:width var(--dur) ease}\n.bsp-navlink:hover{color:#fff !important}\n.bsp-navlink:hover::after{width:100%}\n.bsp-portal:hover{border-color:var(--red) !important;color:#fff !important}\n.bsp-foot-link:hover{color:var(--red) !important}\n.bsp-orb-core{width:14px;height:14px;border-radius:50%;background:var(--red);flex-shrink:0;box-shadow:0 0 14px rgba(226,60,65,.8);animation:orbBreathe 3.2s ease-in-out infinite}\n@keyframes v2-twinkle{0%,100%{opacity:.18}50%{opacity:.85}}\n@keyframes v2-beacon{0%,100%{opacity:.9}50%{opacity:.15}}\n@keyframes v2-ping{0%{transform:scale(1);opacity:.7}100%{transform:scale(3.4);opacity:0}}\n@keyframes v2-flip{0%{transform:rotateX(0)}100%{transform:rotateX(-180deg)}}\n@keyframes orbBreathe{0%,100%{transform:scale(1);box-shadow:0 0 10px rgba(226,60,65,.55)}50%{transform:scale(1.18);box-shadow:0 0 20px rgba(226,60,65,.95)}}\n.bsp-orb:hover{border-color:rgba(226,60,65,.7) !important;box-shadow:0 10px 40px rgba(226,60,65,.25),inset 0 1px 0 rgba(255,255,255,.08) !important}\n.bsp-dditem:hover{background:rgba(226,60,65,.06);color:#fff !important}\n.bsp-navorb:hover{border-color:rgba(226,60,65,.4) !important}\n.bsp-advrow:hover{background:rgba(226,60,65,.03)}\n.bsp-signal:hover{background:rgba(14,11,36,.8) !important}\n.bsp-ghost{-webkit-text-stroke:1.2px rgba(255,255,255,.3)}\n.v2-sheet:hover{transform:translateY(-4px);box-shadow:0 50px 110px rgba(0,0,0,.6) !important}\n.v2-card:hover{border-color:rgba(226,60,65,.5) !important;transform:translateY(-2px)}\n.v2-hscroll{scrollbar-width:none}.v2-hscroll::-webkit-scrollbar{display:none}\n.v2-range{-webkit-appearance:none;appearance:none;height:2px;background:linear-gradient(90deg,var(--red) 0,var(--red) var(--p,0%),rgba(226,60,65,.2) var(--p,0%));outline:none}\n.v2-range::-webkit-slider-thumb{-webkit-appearance:none;width:22px;height:22px;border-radius:50%;background:var(--night);border:2px solid var(--red);box-shadow:0 0 16px rgba(226,60,65,.6);cursor:grab}\n.v2-range::-moz-range-thumb{width:22px;height:22px;border-radius:50%;background:var(--night);border:2px solid var(--red);cursor:grab}\n@media (max-width:1100px){.v2-foot{grid-template-columns:1fr 1fr 1fr !important}.v2-foot>div:first-child{grid-column:1 / -1}}\n@media (max-width:880px){.bsp-about-grid,.bsp-founder-grid,.bsp-contact-grid,.v2-grid-2{grid-template-columns:1fr !important}.v2-grid-4{grid-template-columns:1fr 1fr !important}}\n@media (max-width:640px){.v2-foot{grid-template-columns:1fr 1fr !important}}\n/* mobile */\n@media (max-width:640px){\n  .v2-row{flex-direction:column !important;align-items:flex-start !important;gap:12px !important}\n  .v2-cta{flex-direction:column !important;align-items:stretch !important;gap:12px !important}\n  .v2-cta>*{width:100% !important;justify-content:center !important}\n  .v2-grid-4{grid-template-columns:1fr 1fr !important}\n  h1{font-size:clamp(2.4rem,11vw,3rem) !important;letter-spacing:-.035em !important}\n  h2{font-size:clamp(1.8rem,8vw,2.3rem) !important}\n}\n@media (prefers-reduced-motion:reduce){.bsp-orb-core{animation:none}}\n";
function GlobalStyle() {
  React.useEffect(() => {
    if (document.getElementById("bsp-v2-css")) return;
    const el = document.createElement("style"); el.id = "bsp-v2-css"; el.textContent = CSS; document.head.appendChild(el);
  }, []);
  return null;
}

/* ---------- design-system primitives (ported from the BSP design system) ---------- */
function Eyebrow({ children, rule = false, tone = "red", style = {}, ...rest }) {
  const text = <span style={{ fontSize: "var(--fs-eyebrow)", fontWeight: 700, letterSpacing: "var(--ls-eyebrow)", textTransform: "uppercase", color: tone === "light" ? "#fff" : "var(--red)", textShadow: tone === "light" ? "0 1px 12px rgba(8,6,20,.55)" : undefined }}>{children}</span>;
  if (!rule) return <div style={{ ...style }} {...rest}>{text}</div>;
  return <div style={{ display: "inline-flex", alignItems: "center", gap: 12, ...style }} {...rest}><span style={{ width: 48, height: 2, background: "var(--red)", display: "block", flexShrink: 0 }} />{text}</div>;
}
function Heading({ children, as: Tag = "h2", ghost = false, active = true, period = false, size = "var(--fs-h2)", style = {}, ...rest }) {
  const lit = !ghost || active;
  return <Tag style={{ fontSize: size, fontWeight: 700, lineHeight: "var(--lh-tight)", letterSpacing: "var(--ls-heading)", margin: 0, color: lit ? "#fff" : "var(--text-muted)", transition: "color var(--dur-slow) ease", ...style }} {...rest}>{children}{period && <span style={{ color: lit ? "var(--red)" : "transparent", transition: "color var(--dur-slow) ease" }}>.</span>}</Tag>;
}
function Button({ children, variant = "primary", size = "md", arrow = false, disabled = false, type = "button", onClick, style = {}, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const pad = size === "sm" ? "12px 24px" : "16px 36px";
  const base = { display: "inline-flex", alignItems: "center", gap: 12, fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 700, letterSpacing: "var(--ls-label)", textTransform: "uppercase", cursor: disabled ? "not-allowed" : "pointer", border: "none", borderRadius: 0, transition: "all var(--dur) var(--ease-signature)", textDecoration: "none", lineHeight: 1 };
  const variants = {
    primary: { padding: pad, background: disabled ? "rgba(226,60,65,.5)" : hover ? "var(--red-hover)" : "var(--red)", color: "#fff", transform: hover && !disabled ? "translateY(-2px)" : "translateY(0)", boxShadow: hover && !disabled ? "var(--shadow-button)" : "none" },
    ghost: { padding: size === "sm" ? "12px 0" : "16px 0", background: "transparent", color: hover ? "#fff" : "var(--text-secondary)", borderBottom: `1px solid ${hover ? "var(--red)" : "var(--border-strong)"}`, borderRadius: 0, letterSpacing: ".1em", fontWeight: 600 },
  };
  return <button type={type} disabled={disabled} onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ ...base, ...variants[variant], ...style }} {...rest}>{children}{arrow && <span aria-hidden="true">→</span>}</button>;
}
function Chip({ children, interactive = true, style = {}, ...rest }) {
  const [hover, setHover] = React.useState(false); const on = interactive && hover;
  return <span onMouseEnter={interactive ? () => setHover(true) : undefined} onMouseLeave={interactive ? () => setHover(false) : undefined} style={{ display: "inline-block", padding: "7px 14px", border: `1px solid ${on ? "rgba(226,60,65,.6)" : "var(--red-022)"}`, color: on ? "#fff" : "var(--text-body)", background: on ? "var(--red-006)" : "transparent", fontSize: 11, fontWeight: 500, letterSpacing: ".03em", borderRadius: 0, transition: "all var(--dur-fast)", cursor: interactive ? "default" : "inherit", ...style }} {...rest}>{children}</span>;
}
function Card({ children, variant = "border", lift = false, padding = 24, style = {}, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const variants = {
    border: { border: `1px solid ${lift && hover ? "rgba(226,60,65,.4)" : "var(--red-012)"}`, borderRadius: "var(--radius-lg)", background: "var(--card-fill)" },
    accent: { borderLeft: "4px solid var(--red)", borderRadius: 0, background: "rgba(226,60,65,.03)" },
    plain: { border: "1px solid var(--border-hairline)", borderRadius: "var(--radius-lg)", background: "var(--surface-alt)" },
  };
  return <div onMouseEnter={lift ? () => setHover(true) : undefined} onMouseLeave={lift ? () => setHover(false) : undefined} style={{ padding, transition: "all var(--dur)", transform: lift && hover ? "translateX(4px)" : "translateX(0)", cursor: lift ? "pointer" : "default", ...variants[variant], ...style }} {...rest}>{children}</div>;
}
function StatusPill({ children, tone = "success", style = {}, ...rest }) {
  const tones = { success: { dot: "var(--success)", text: "var(--success-light)", border: "rgba(34,197,94,.35)" }, red: { dot: "var(--red)", text: "var(--text-secondary)", border: "var(--red-035)" }, neutral: { dot: "var(--text-muted)", text: "var(--text-secondary)", border: "var(--border-strong)" } };
  const t = tones[tone] || tones.success;
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", border: `1px solid ${t.border}`, borderRadius: 99, fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: t.text, ...style }} {...rest}><span style={{ width: 7, height: 7, borderRadius: "50%", background: t.dot, flexShrink: 0 }} />{children}</span>;
}
const fieldLabel = { display: "block", fontSize: "var(--fs-label-sm)", fontWeight: 600, letterSpacing: "var(--ls-label)", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 6 };
function Input({ as = "input", label, type = "text", rows = 4, style = {}, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const field = { width: "100%", padding: "var(--input-pad)", background: "var(--surface-base)", border: `1px solid ${focus ? "rgba(226,60,65,.5)" : "var(--red-018)"}`, color: "#fff", fontFamily: "var(--font-sans)", fontSize: 15, transition: "border-color var(--dur)", outline: "none", resize: as === "textarea" ? "vertical" : undefined, borderRadius: 0, ...style };
  const control = as === "textarea" ? <textarea rows={rows} style={field} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} {...rest} /> : <input type={type} style={field} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} {...rest} />;
  if (!label) return control;
  return <label style={{ display: "block" }}><span style={fieldLabel}>{label}</span>{control}</label>;
}
const CARET = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238a879a' stroke-width='1.5' fill='none'/%3E%3C/svg%3E\")";
function Select({ label, options = [], placeholder = "Select one", defaultValue = "", style = {}, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const field = { width: "100%", padding: "var(--input-pad)", paddingRight: 40, background: "var(--surface-base)", border: `1px solid ${focus ? "rgba(226,60,65,.5)" : "var(--red-018)"}`, color: "#fff", fontFamily: "var(--font-sans)", fontSize: 15, transition: "border-color var(--dur)", outline: "none", appearance: "none", WebkitAppearance: "none", borderRadius: 0, backgroundImage: CARET, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", ...style };
  const control = <select defaultValue={defaultValue} style={field} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} {...rest}><option value="" disabled>{placeholder}</option>{options.map((o) => { const [value, text] = Array.isArray(o) ? o : [o, o]; return <option key={value} value={value}>{text}</option>; })}</select>;
  if (!label) return control;
  return <label style={{ display: "block" }}><span style={fieldLabel}>{label}</span>{control}</label>;
}
function BrandMark({ size = 38, lockup = false, tagline = "Retained Executive Search", style = {}, ...rest }) {
  const mark = (h) => <svg width={(130 / 140) * h} height={h} viewBox="0 0 130 140" fill="none" aria-hidden={lockup ? "true" : undefined} role={lockup ? undefined : "img"} aria-label={lockup ? undefined : "Bound Search Partners"}><rect x="4" y="4" width="30" height="132" rx="2" fill="#fff" opacity=".92" /><rect x="56" y="4" width="70" height="60" rx="2" fill="#e23c41" /><rect x="56" y="76" width="70" height="60" rx="2" fill="#e23c41" opacity=".9" /></svg>;
  if (!lockup) return <span style={{ display: "inline-flex", ...style }} {...rest}>{mark(size)}</span>;
  return <span role="img" aria-label="Bound Search Partners — Retained Executive Search" style={{ display: "inline-flex", alignItems: "center", gap: size * 0.42, ...style }} {...rest}>{mark(size)}<span style={{ display: "flex", flexDirection: "column", gap: size * 0.12 }}><span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: size * 0.46, lineHeight: 1, color: "#fff", letterSpacing: ".17em", whiteSpace: "nowrap" }}>BOUND SEARCH PARTNERS</span>{tagline && <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: size * 0.22, lineHeight: 1, color: "var(--text-muted)", letterSpacing: ".26em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{tagline}</span>}</span></span>;
}

/* ---------- utilities ---------- */
function useWidth() {
  const [w, setW] = React.useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  React.useEffect(() => { const h = () => setW(window.innerWidth); window.addEventListener("resize", h); return () => window.removeEventListener("resize", h); }, []);
  return w;
}
function useInView(threshold = .3) {
  const ref = React.useRef(null); const [vis, setVis] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, { threshold });
    io.observe(ref.current); return () => io.disconnect();
  }, []);
  return [ref, vis];
}
function useCount(to, go, dur = 1400) {
  const [v, setV] = React.useState(0);
  React.useEffect(() => {
    if (!go) return; let raf; const t0 = performance.now();
    const step = (t) => { const p = Math.min(1, (t - t0) / dur); const e = 1 - Math.pow(1 - p, 3); setV(Math.round(to * e)); if (p < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step); return () => cancelAnimationFrame(raf);
  }, [go, to]);
  return v;
}
function CountUp({ to, suffix = "", prefix = "", go, dur = 1400 }) { const v = useCount(to, go, dur); return <span>{prefix}{v}{suffix}</span>; }
const polar = (cx, cy, r, deg) => { const a = ((deg - 90) * Math.PI) / 180; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; };
const arcPath = (cx, cy, r, a0, a1) => { const [x0, y0] = polar(cx, cy, r, a0); const [x1, y1] = polar(cx, cy, r, a1); return `M ${x0} ${y0} A ${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1} ${y1}`; };
/* Odometer: each digit is a rolling column 0–9; the value drives translateY so digits spin into place. */
function Odometer({ value, pad = 0 }) {
  const str = String(Math.max(0, Math.round(value))).padStart(pad, "0");
  return (
    <span style={{ display: "inline-flex", overflow: "hidden", height: "1em", lineHeight: 1, verticalAlign: "top", fontVariantNumeric: "tabular-nums" }}>
      {str.split("").map((ch, i) => (
        <span key={i} style={{ display: "inline-block", position: "relative", width: ".62em", height: "1em" }}>
          <span style={{ position: "absolute", left: 0, top: 0, display: "flex", flexDirection: "column", transform: `translateY(-${+ch}em)`, transition: "transform .55s var(--ease-signature)" }}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => <span key={d} style={{ height: "1em", lineHeight: 1, width: ".62em", textAlign: "center" }}>{d}</span>)}
          </span>
        </span>
      ))}
    </span>
  );
}
const LABEL = { fontSize: 10, fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--text-muted)" };
const KICK = { fontSize: 10, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--red)" };
const Wrap = ({ children, style = {}, max = "var(--container)" }) => <div style={{ maxWidth: max, margin: "0 auto", padding: "0 var(--gutter)", ...style }}>{children}</div>;
const Divider = ({ a = .12 }) => <div aria-hidden="true" style={{ height: 1, background: `linear-gradient(90deg,transparent,rgba(226,60,65,${a}),transparent)` }} />;
/* Stack: all panes occupy one grid cell so the container height is the tallest pane — switching never shifts the layout below. */
const Stack = ({ items, active, render }) => (
  <div style={{ display: "grid" }}>
    {items.map((it, i) => { const on = i === active; return <div key={i} aria-hidden={!on} style={{ gridArea: "1 / 1", opacity: on ? 1 : 0, transform: on ? "translateY(0)" : "translateY(8px)", transition: "opacity .4s var(--ease-signature), transform .4s var(--ease-signature)", pointerEvents: on ? "auto" : "none" }}>{render(it, i)}</div>; })}
  </div>
);

const NAV = [["home", "Home"], ["about", "About"], ["services", "Services"], ["results", "Results"], ["contact", "Contact"]];
const METRICS = [
  { v: 200, s: "+", l: "Executive placements" },
  { v: 92, s: "%", l: "Retained beyond year one" },
  { v: 30, s: "", l: "Days to proprietary shortlist", pre: "" },
  { v: 9, s: "", l: "Industry sectors served" },
];
const ADVISORIES = [
  { no: "05", date: "Aug 11, 2026", title: "Governing Without a Rulebook", desc: "Washington finished its rules for vetting frontier AI — and won't say what's in them. Three labs in a month disclosed models acting beyond instruction. Why this changes who you hire, not whether.", href: "/BSP_Advisory_2026-08-11.pdf", read: "9 min" },
  { no: "04", date: "Jun 12, 2026", title: "The Bottleneck Has Moved", desc: "Both Middle East corridors blocked at once. U.S. factory activity at a four-year high. $1.77 trillion committed to capacity no one has staffed.", href: "/BSP_Advisory_2026-06-12.pdf", read: "7 min" },
  { no: "03", date: "Apr 29, 2026", title: "Strait of Hormuz: 60 Days In", desc: "What has actually shifted for U.S. manufacturing — and what hasn't. Three structural changes, five operational realities.", href: "/BSP_Hormuz_Update_April29.pdf", read: "6 min" },
  { no: "02", date: "Mar 12, 2026", title: "Strait of Hormuz: What's Changed Since March 5", desc: "Brent crossed $100. Iran mined the strait. Goldman's March 21 base-case recovery date. Seven-day update.", href: "/BSP_Hormuz_Update_March12.pdf", read: "5 min" },
  { no: "01", date: "Mar 5, 2026", title: "Strait of Hormuz: A Grounded Assessment", desc: "Separated verified data from noise, mapped four transmission channels into U.S. manufacturing.", href: "/BSP_Hormuz_Client_Bulletin_March2026.pdf", read: "8 min" },
];
const LinkedInMark = ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>;
const DELIV = [
  { d: 1, p: 0, t: "Portal access & weekly cadence" }, { d: 3, p: 0, t: "Search charter" }, { d: 6, p: 0, t: "Success profile" }, { d: 9, p: 0, t: "Compensation benchmark" },
  { d: 16, p: 1, t: "Market map" }, { d: 21, p: 1, t: "Target company list" }, { d: 30, p: 1, t: "Proprietary shortlist" },
  { d: 38, p: 2, t: "Interview schedule" }, { d: 46, p: 2, t: "Assessment reports" }, { d: 55, p: 2, t: "Reference plan" },
  { d: 64, p: 3, t: "Finalist slate" }, { d: 76, p: 3, t: "Offer strategy" }, { d: 84, p: 3, t: "Counteroffer plan" },
  { d: 91, p: 4, t: "30/60/90 plan" }, { d: 105, p: 4, t: "Retention check-ins" }, { d: 120, p: 4, t: "Guarantee-backed engagement" },
];
const Numero = ({ n, size = 1.45 }) => <span><span style={{ fontSize: `${size}em`, lineHeight: 1, verticalAlign: "-.05em" }}>№</span> {n}</span>;

/* ---------- Nav ---------- */
function Nav({ go }) {
  const w = useWidth(); const mobile = w <= 768;
  const [scrolled, setScrolled] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const [navOpen, setNavOpen] = React.useState(false);
  const [menu, setMenu] = React.useState(false);
  React.useEffect(() => {
    const h = () => { const y = window.scrollY; setScrolled(y > 60); setHidden(!mobile && y > 200); if (y > 200) setNavOpen(false); };
    h(); window.addEventListener("scroll", h, { passive: true }); return () => window.removeEventListener("scroll", h);
  }, [mobile]);
  const glass = mobile && scrolled;
  return (
    <React.Fragment>
      <nav style={{
        position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1000, padding: scrolled ? "12px 0" : "20px 0",
        background: glass ? "rgba(14,11,36,.82)" : "transparent", backdropFilter: glass ? "blur(18px)" : "none", WebkitBackdropFilter: glass ? "blur(18px)" : "none",
        borderBottom: scrolled ? "1px solid var(--red-008)" : "1px solid transparent",
        transform: hidden ? "translateY(-100%)" : "translateY(0)", transition: "all var(--dur-slow) var(--ease-signature)",
      }}>
        <Wrap style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div onClick={() => go("home")} style={{ cursor: "pointer", display: "flex" }}><BrandMark size={mobile ? 32 : 38} lockup={w > 1180} /></div>
          {mobile ? (
            <button aria-label="Menu" onClick={() => setMenu(!menu)} style={{ background: "none", border: "none", display: "flex", flexDirection: "column", gap: 5, cursor: "pointer", padding: 10 }}>
              <span style={{ width: 24, height: 2, background: menu ? "var(--red)" : "#fff", transform: menu ? "rotate(45deg) translateY(7px)" : "none", transition: "all .3s", display: "block" }} />
              <span style={{ width: 24, height: 2, background: "#fff", opacity: menu ? 0 : 1, transition: "all .3s", display: "block" }} />
              <span style={{ width: 24, height: 2, background: menu ? "var(--red)" : "#fff", transform: menu ? "rotate(-45deg) translateY(-7px)" : "none", transition: "all .3s", display: "block" }} />
            </button>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
              {NAV.map(([id, label]) => (
                <span key={id} onClick={() => go(id)} className="bsp-navlink" style={{ fontSize: 12, fontWeight: 600, letterSpacing: "var(--ls-nav)", textTransform: "uppercase", cursor: "pointer", color: id === "contact" ? "var(--red)" : "var(--text-secondary)", transition: "color var(--dur)" }}>{label}</span>
              ))}
              {w > 1000 && <a href="/portal.html" className="bsp-navlink" style={{ fontSize: 12, fontWeight: 600, letterSpacing: "var(--ls-nav)", textTransform: "uppercase", color: "var(--text-muted)", textDecoration: "none", whiteSpace: "nowrap", transition: "color var(--dur)" }}>Client Portal</a>}
            </div>
          )}
        </Wrap>
      </nav>
      {!mobile && (
        <React.Fragment>
          <div onClick={() => go("home")} style={{ position: "fixed", top: 20, left: 24, zIndex: 1001, cursor: "pointer", opacity: hidden ? 1 : 0, transform: hidden ? "scale(1)" : "scale(.8)", pointerEvents: hidden ? "auto" : "none", transition: "all .3s var(--ease-signature)" }}><BrandMark size={38} /></div>
          <div style={{ position: "fixed", top: 20, right: 24, zIndex: 1001, opacity: hidden ? 1 : 0, transform: hidden ? "scale(1)" : "scale(.8)", pointerEvents: hidden ? "auto" : "none", transition: "all .3s var(--ease-signature)" }}>
            <div className="bsp-navorb" onClick={() => setNavOpen(!navOpen)} style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(14,11,36,.8)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(226,60,65,.15)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: navOpen ? 0 : 5, cursor: "pointer", transition: "all .3s" }}>
              <div style={{ width: 18, height: 2, background: navOpen ? "var(--red)" : "#fff", transform: navOpen ? "rotate(45deg) translateY(1px)" : "none", transition: "all .3s" }} />
              <div style={{ width: 18, height: 2, background: "#fff", opacity: navOpen ? 0 : 1, transition: "all .2s" }} />
              <div style={{ width: 18, height: 2, background: navOpen ? "var(--red)" : "#fff", transform: navOpen ? "rotate(-45deg) translateY(-1px)" : "none", transition: "all .3s" }} />
            </div>
            <div style={{ position: "absolute", top: 52, right: 0, background: "rgba(14,11,36,.92)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(226,60,65,.1)", borderRadius: "var(--radius-lg)", padding: navOpen ? "12px 0" : 0, minWidth: 200, opacity: navOpen ? 1 : 0, transform: navOpen ? "translateY(0)" : "translateY(-8px)", pointerEvents: navOpen ? "auto" : "none", transition: "all .25s var(--ease-signature)", overflow: "hidden", maxHeight: navOpen ? 400 : 0 }}>
              {[...NAV, ["insights", "Insights"]].map(([id, label]) => (
                <div key={id} className="bsp-dditem" onClick={() => { go(id); setNavOpen(false); }} style={{ padding: "10px 24px", cursor: "pointer", fontSize: 12, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: id === "contact" ? "var(--red)" : "var(--text-secondary)", transition: "all .2s" }}>{label}</div>
              ))}
            </div>
          </div>
        </React.Fragment>
      )}
      {mobile && (
        <div onClick={() => setMenu(false)} style={{ position: "fixed", inset: 0, background: "rgba(14,11,36,.97)", backdropFilter: "blur(20px)", zIndex: 999, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 var(--gutter)", opacity: menu ? 1 : 0, pointerEvents: menu ? "auto" : "none", transition: "opacity .3s var(--ease-signature)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {[...NAV.filter(([id]) => id !== "contact"), ["insights", "Insights"]].map(([id, label], i) => (
              <span key={id} onClick={() => { go(id); setMenu(false); }} style={{ fontSize: 34, fontWeight: 700, letterSpacing: "-.02em", color: "#fff", padding: "10px 0", borderBottom: "1px solid var(--white-06)", cursor: "pointer", transform: menu ? "translateY(0)" : "translateY(12px)", opacity: menu ? 1 : 0, transition: `all .4s var(--ease-signature) ${.05 * i}s` }}>{label}<span style={{ color: "var(--red)" }}>.</span></span>
            ))}
          </div>
          <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 14 }}>
            <Button arrow onClick={() => { go("contact"); setMenu(false); }} style={{ justifyContent: "center" }}>Start a Conversation</Button>
            <a href="/portal.html" style={{ ...LABEL, textAlign: "center", color: "var(--text-secondary)", textDecoration: "none" }}>Client Portal →</a>
          </div>
          <div style={{ position: "absolute", bottom: 28, left: "var(--gutter)", right: "var(--gutter)", display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--text-muted)" }}>
            <span>(267) 265-1792</span><span>bob@boundsearch.com</span>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

/* ---------- Hero + proof ---------- */
function Glance() {
  const [ref, vis] = useInView(.2);
  return (
    <div ref={ref} style={{ width: "100%", maxWidth: 380, background: "var(--night)", borderTop: "3px solid var(--red)", padding: "26px 30px 28px", boxShadow: "0 40px 90px rgba(0,0,0,.55)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}><span style={{ ...KICK }}>The firm at a glance</span><span style={{ fontSize: 10, color: "var(--text-faint)", letterSpacing: ".1em" }}>2024 — 2026</span></div>
      {METRICS.map((m, i) => (
        <div key={m.l} style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 20, padding: "14px 0", borderTop: i ? "1px solid var(--white-06)" : "none", animation: `bsp-fade-up .6s var(--ease-signature) ${.55 + i * .08}s both` }}>
          <span style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.3 }}>{m.l}</span>
          <span style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-.03em", color: "#fff", lineHeight: 1, fontVariantNumeric: "tabular-nums", flexShrink: 0 }}><CountUp to={m.v} go={vis} />{m.s && <span style={{ color: "var(--red)" }}>{m.s}</span>}</span>
        </div>
      ))}
      <a href={ADVISORIES[0].href} target="_blank" rel="noopener noreferrer" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, padding: "18px 0 0", marginTop: 4, borderTop: "1px solid var(--red-035)", textDecoration: "none", animation: "bsp-fade-up .6s var(--ease-signature) .95s both" }} className="bsp-foot-link">
        <span><span style={{ ...LABEL, fontSize: 9, display: "block", marginBottom: 6 }}>Latest advisory · <Numero n={ADVISORIES[0].no} size={1.3} /></span><span style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>{ADVISORIES[0].title}</span></span>
        <span style={{ color: "var(--red)", fontSize: 16 }}>→</span>
      </a>
    </div>
  );
}
function ProofStrip() {
  const [ref, vis] = useInView(.4);
  const vals = METRICS.map((m) => useCount(m.v, vis, 1900));
  return (
    <div ref={ref} style={{ marginTop: "clamp(3rem,6vw,5rem)", position: "relative" }}>
      <div style={{ height: 1, background: "rgba(255,255,255,.12)", position: "relative" }}><div style={{ position: "absolute", left: 0, top: 0, height: 1, width: vis ? "100%" : "0%", background: "var(--red)", boxShadow: "0 0 12px rgba(226,60,65,.6)", transition: "width 2s var(--ease-signature)" }} /></div>
      <div className="v2-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", rowGap: 6 }}>
        {METRICS.map((m, i) => (
          <div key={m.l} style={{ padding: "22px 16px 0 0", opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(12px)", transition: `opacity .8s var(--ease-signature) ${.15 + i * .12}s, transform .8s var(--ease-signature) ${.15 + i * .12}s` }}>
            <div style={{ display: "flex", alignItems: "baseline", fontSize: "clamp(2.1rem,4vw,3.8rem)", fontWeight: 700, letterSpacing: "-.04em", color: "#fff", lineHeight: 1, textShadow: "0 2px 18px rgba(8,6,20,.8)" }}>
              <Odometer value={vals[i]} pad={String(m.v).length} />{m.s && <span style={{ color: "var(--red)", marginLeft: 2 }}>{m.s}</span>}
            </div>
            <div style={{ ...LABEL, marginTop: 10, fontSize: 9, color: "var(--text-secondary)", textShadow: "0 1px 10px rgba(8,6,20,.7)", lineHeight: 1.4 }}>{m.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
function Hero({ go, variant }) {
  const w = useWidth(); const split = variant === "c" && w > 980;
  return (
    <section id="home" data-screen-label="Hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "flex-end", paddingTop: "clamp(7rem,14vh,10rem)", paddingBottom: variant === "b" ? "clamp(6rem,10vw,9rem)" : variant === "d" ? "clamp(2.5rem,5vw,4.5rem)" : "clamp(4rem,8vw,8rem)", overflow: split ? "visible" : "hidden", background: "var(--night)" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: "url(/hero-poster.jpg)", backgroundSize: "cover", backgroundPosition: "center", filter: "saturate(.7) brightness(.82)" }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "radial-gradient(ellipse 62% 56% at 26% 58%, rgba(10,8,26,.78), transparent 74%),linear-gradient(180deg,transparent 0%,transparent 66%,var(--night) 100%),linear-gradient(90deg,rgba(14,11,36,.55) 0%,transparent 44%)" }} />
      <Wrap style={{ position: "relative", zIndex: 2, width: "100%", display: split ? "grid" : "block", gridTemplateColumns: split ? "1fr 360px" : undefined, gap: split ? "clamp(2rem,5vw,6rem)" : undefined, alignItems: "end" }}>
        <div style={{ maxWidth: 860, animation: "bsp-fade-up .7s var(--ease-signature) .2s both" }}>
          <Eyebrow rule tone="light" style={{ marginBottom: 32 }}>Retained Executive Search · U.S. Manufacturing &amp; Industrial</Eyebrow>
          <h1 style={{ fontSize: "var(--fs-hero)", fontWeight: 700, lineHeight: "var(--lh-hero)", letterSpacing: "var(--ls-display)", margin: "0 0 24px", filter: "drop-shadow(0 2px 16px rgba(8,6,20,.85))" }}>
            The leaders who move <span style={{ color: "var(--red)", fontStyle: "italic" }}>industries</span> start here.
          </h1>
          <p style={{ fontSize: "var(--fs-lead)", lineHeight: 1.55, color: "#fff", fontWeight: 500, maxWidth: 600, marginBottom: 40, textShadow: "var(--shadow-text)" }}>Bound Search Partners is a retained executive search firm specializing in manufacturing, industrial, and supply chain leadership.</p>
          <div className="v2-cta" style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
            <Button arrow onClick={() => go("contact")}>Start a Conversation</Button>
            <Button variant="ghost" arrow onClick={() => go("process")}>Our Process</Button>
          </div>
        </div>
        {variant === "d" && <ProofStrip />}
        {split && <div style={{ animation: "bsp-fade-up .7s var(--ease-signature) .5s both", justifySelf: "end" }}><Glance /></div>}
      </Wrap>
      {variant === "b" && (
        <a href={ADVISORIES[0].href} target="_blank" rel="noopener noreferrer" className="bsp-signal" style={{ position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 3, borderTop: "1px solid var(--red-012)", background: "rgba(14,11,36,.6)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", textDecoration: "none", color: "inherit" }}>
          <Wrap style={{ display: "flex", alignItems: "center", gap: 18, padding: "14px var(--gutter)", flexWrap: "wrap" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--red)", boxShadow: "0 0 12px var(--red)", flexShrink: 0 }} className="bsp-orb-core" />
            <span style={{ ...KICK }}>Advisory <Numero n={ADVISORIES[0].no} size={1.3} /></span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#fff", flex: "1 1 200px" }}>{ADVISORIES[0].title}</span>
            <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{ADVISORIES[0].date} · {ADVISORIES[0].read} read</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: "var(--red)", letterSpacing: ".1em", textTransform: "uppercase" }}>Read →</span>
          </Wrap>
        </a>
      )}
    </section>
  );
}
function ProofBand({ variant }) {
  const [ref, vis] = useInView(.4);
  if (variant === "c" || variant === "d") return null;
  if (variant === "b") return (
    <div ref={ref} style={{ background: "var(--night)", borderBottom: "1px solid var(--red-008)" }}>
      <Wrap style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "12px 40px", padding: "22px var(--gutter)" }}>
        {METRICS.map((m, i) => (
          <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <span style={{ fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: "-.02em" }}><CountUp to={m.v} go={vis} />{m.s && <span style={{ color: "var(--red)" }}>{m.s}</span>}</span>
            <span style={{ ...LABEL, fontSize: 9 }}>{m.l}</span>
          </div>
        ))}
        <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--text-faint)", fontStyle: "italic" }}>Verified outcomes. Identities protected.</span>
      </Wrap>
    </div>
  );
  return (
    <div ref={ref} style={{ background: "var(--night)" }}>
      <Wrap>
        <div className="v2-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderTop: "1px solid var(--red-008)", borderBottom: "1px solid var(--red-008)" }}>
          {METRICS.map((m, i) => (
            <div key={i} style={{ padding: "clamp(1.4rem,2.5vw,2.2rem) clamp(1rem,2vw,2rem)", borderLeft: i ? "1px solid var(--red-008)" : "none" }}>
              <div style={{ fontSize: "clamp(2rem,3.4vw,3rem)", fontWeight: 700, letterSpacing: "-.03em", lineHeight: 1, color: "#fff" }}><CountUp to={m.v} go={vis} />{m.s && <span style={{ color: "var(--red)" }}>{m.s}</span>}</div>
              <div style={{ ...LABEL, marginTop: 12 }}>{m.l}</div>
            </div>
          ))}
        </div>
      </Wrap>
    </div>
  );
}

/* ---------- About + process ---------- */
const PROC = [
  { t: "Human Curation", l: "Human Judgment", d: "Every candidate is personally assessed for technical capability, cultural fit, and leadership trajectory. Shortlists are built by a consultant who has spoken with each person, not generated by an algorithm." },
  { t: "AI-Powered Intelligence", l: "Machine Scale", d: "Proprietary research tools map the full candidate universe — market maps, compensation benchmarks, competitive intelligence — so that human judgment starts from a complete picture rather than a sample." },
  { t: "Client Partnership", l: "Adaptive", d: "You work directly with the consultant running your search, and a live client portal keeps every update and document within reach whenever you need it." },
  { t: "Placement & Beyond", l: "Accountable", d: "We stay involved through offer negotiation, counteroffer planning, resignation coaching, and the first 90 days on the job. Our work is finished when your new leader is settled and performing, not when the offer letter is signed." },
];
function About({ overhang }) {
  const [hov, setHov] = React.useState(0);
  return (
    <section id="about" data-screen-label="About" style={{ padding: overhang ? "calc(var(--section-y-lg) + 40px) 0 var(--section-y-lg)" : "var(--section-y-lg) 0", background: "var(--night)" }}>
      <Wrap>
        <div className="bsp-about-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr .8fr", gap: "clamp(3rem,8vw,8rem)", alignItems: "center" }}>
          <div>
            <Eyebrow style={{ marginBottom: 20 }}>The firm</Eyebrow>
            <Heading style={{ marginBottom: 32, lineHeight: "var(--lh-heading)" }}>Executive search built on <em style={{ color: "var(--red)", fontStyle: "italic" }}>depth</em> rather than volume.</Heading>
            <p style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)", color: "var(--text-secondary)", marginBottom: 16 }}>Bound Search Partners was founded on a simple belief: executive search works best when it is personal. Every engagement is retained and led by a senior consultant who takes the time to understand your business, your culture, and the market you compete in.</p>
            <p style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)", color: "var(--text-secondary)" }}>We serve manufacturers nationwide — industrial companies, private-equity-backed portfolio businesses, and the organizations that keep the real economy running.</p>
          </div>
          <div>
            <Eyebrow style={{ marginBottom: 32 }}>How we work</Eyebrow>
            {PROC.map((s, i) => {
              const on = hov === i;
              return (
                <div key={i} style={{ display: "flex", gap: 20, cursor: "pointer" }} onMouseEnter={() => setHov(i)} onClick={() => setHov(i)}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", border: `1.5px solid ${on ? "var(--red)" : "var(--red-022)"}`, background: on ? "rgba(226,60,65,.1)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all var(--dur) var(--ease-signature)", transform: on ? "scale(1.1)" : "scale(1)", boxShadow: on ? "0 0 20px rgba(226,60,65,.15)" : "none" }}>
                      <span style={{ width: 7, height: 7, borderRadius: "50%", background: on ? "var(--red)" : "rgba(226,60,65,.4)", transition: "background var(--dur)" }} />
                    </div>
                    {i < PROC.length - 1 && <div style={{ width: 1, flex: 1, background: `linear-gradient(180deg,rgba(226,60,65,${on ? .35 : .2}),rgba(226,60,65,.05))`, minHeight: 24 }} />}
                  </div>
                  <div style={{ paddingBottom: i < PROC.length - 1 ? 28 : 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                      <h4 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: on ? "#fff" : "var(--text-secondary)", transition: "color var(--dur)" }}>{s.t}</h4>
                      <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--red)", opacity: on ? .8 : .5 }}>{s.l}</span>
                    </div>
                    <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, margin: 0, opacity: on ? 1 : .6, transition: "opacity var(--dur)" }}>{s.d}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Wrap>
    </section>
  );
}

/* ---------- Services (accordion on mobile) ---------- */
const SRVS = [
  { t: "Executive Search", tag: "Reaching the leaders who aren't looking, and giving them a genuine reason to consider the move.", d: "C-suite, VP, and senior director placements across manufacturing, supply chain, and industrial sectors. Each engagement is retained, personally led, and grounded in a real understanding of your business, culture, and competitive landscape.", rl: "Typical Roles", r: "CEO · COO · CFO · VP Operations · VP Supply Chain", del: ["Full market mapping & competitive landscape analysis", "Proprietary candidate shortlist within 30 days", "Structured behavioral & leadership assessments", "Offer negotiation, counteroffer strategy & onboarding"] },
  { t: "Operations & Plant Leadership", tag: "The leaders who turn strategy into what actually happens on the floor.", d: "Plant managers, engineering directors, and quality leaders — the operational backbone of any manufacturing organization. We surface leaders with real floor presence, CI discipline, and team-building track records.", rl: "Typical Roles", r: "Plant Manager · Director Engineering · Quality Director · Director of Operations", del: ["Targeted outreach to passive operational leaders", "Technical competency & leadership style vetting", "On-site culture alignment evaluation", "90-day onboarding support & guarantee-backed engagement"] },
  { t: "Organizational Advisory", tag: "Understanding what your organization truly needs before committing to a hire.", d: "Diagnostic-driven consulting for manufacturers navigating growth, transition, or underperformance — leadership bench, succession, compensation benchmarking, talent mapping. Engagements are focused and scoped, with clear deliverables from the outset.", rl: "Engagement Types", r: "Leadership Audit · Succession Planning · Org Design · Comp Benchmarking", del: ["Leadership bench strength assessment", "Succession gap analysis with actionable timeline", "Compensation benchmarking vs. regional & national market", "Talent availability & density mapping"] },
  { t: "Strategic Advisory & Intelligence", tag: "Strategic intelligence of institutional quality, delivered in weeks rather than quarters.", d: "Business model audits, strategic roadmaps, and portfolio diagnostics built for private equity firms, venture-backed companies, and manufacturers navigating inflection points. The depth of a large advisory practice, with the speed and attention of a small one.", rl: "Capabilities", r: "Business Model Audit · Strategic Roadmap · Market Entry · Portfolio Diagnostics", del: ["Comprehensive business model audit & assessment", "Strategic roadmap with prioritized initiatives", "Competitive landscape & market entry analysis", "AI-augmented research at institutional depth"] },
];
function ServiceDetail({ s }) {
  return (
    <div style={{ paddingTop: 6 }}>
      <p style={{ fontSize: 13, fontStyle: "italic", color: "var(--red)", opacity: .7, lineHeight: 1.5, marginBottom: 14 }}>{s.tag}</p>
      <p style={{ fontSize: 15, lineHeight: 1.85, color: "var(--text-body)", marginBottom: 26 }}>{s.d}</p>
      <div style={{ ...KICK, marginBottom: 12 }}>Deliverables</div>
      <div style={{ marginBottom: 24 }}>{s.del.map((d, di) => <div key={di} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "5px 0" }}><span style={{ color: "var(--red)", fontSize: 8, marginTop: 5, flexShrink: 0 }}>&#9656;</span><span style={{ fontSize: 13, color: "var(--text-body)", lineHeight: 1.55 }}>{d}</span></div>)}</div>
      <div style={{ ...KICK, marginBottom: 12 }}>{s.rl}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{s.r.split(" · ").map((role) => <Chip key={role}>{role}</Chip>)}</div>
    </div>
  );
}
function Services() {
  const w = useWidth(); const mobile = w <= 880;
  const [active, setActive] = React.useState(0);
  return (
    <section id="services" data-screen-label="Services" style={{ background: "var(--night)", padding: "var(--section-y) 0", position: "relative", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ position: "absolute", width: "min(720px,90vw)", height: "min(720px,90vw)", borderRadius: "50%", background: "var(--glow-red)", filter: "blur(50px)", opacity: .12, pointerEvents: "none", top: `${active * 20 - 6}%`, left: "52%", transition: "top 1.2s var(--ease-signature)" }} />
      <Wrap style={{ position: "relative" }}>
        <Eyebrow style={{ marginBottom: 16 }}>Services</Eyebrow>
        <Heading style={{ maxWidth: 940, marginBottom: "clamp(2.5rem,5vw,4.5rem)" }}>Retained search for the leaders who <em style={{ color: "var(--red)", fontStyle: "italic" }}>run</em> plants, supply chains, and P&amp;Ls.</Heading>
        {mobile ? (
          <div>
            {SRVS.map((s, i) => {
              const on = active === i;
              return (
                <div key={i} style={{ borderBottom: "1px solid var(--red-008)" }}>
                  <div onClick={() => setActive(on ? -1 : i)} style={{ padding: "1.1rem 0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, cursor: "pointer" }}>
                    <Heading as="h3" ghost active={on} period size="clamp(1.35rem,6vw,1.9rem)" style={{ lineHeight: 1.08 }}>{s.t}</Heading>
                    <span style={{ color: "var(--red)", fontSize: 22, lineHeight: 1, transform: on ? "rotate(45deg)" : "none", transition: "transform .3s", flexShrink: 0 }}>+</span>
                  </div>
                  <div style={{ overflow: "hidden", maxHeight: on ? 900 : 0, transition: "max-height .5s var(--ease-signature)" }}><div style={{ paddingBottom: 24 }}><ServiceDetail s={s} /></div></div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "clamp(2.5rem,5vw,5.5rem)", alignItems: "start" }}>
            <div>{SRVS.map((s, i) => <div key={i} onMouseEnter={() => setActive(i)} onClick={() => setActive(i)} style={{ padding: "clamp(1.2rem,2.1vw,1.8rem) 0", cursor: "pointer", borderBottom: "1px solid var(--red-008)", userSelect: "none" }}><Heading as="h3" ghost active={active === i} period size="var(--fs-h4)" style={{ lineHeight: 1.08 }}>{s.t}</Heading></div>)}</div>
            <Stack items={SRVS} active={Math.max(0, active)} render={(s) => <ServiceDetail s={s} />} />
          </div>
        )}
      </Wrap>
    </section>
  );
}

/* ---------- Search timeline ---------- */
const PHASES = [
  { d: "Days 0–10", day: 0, wk: [0, 1.5], t: "Calibration", what: "We begin by sitting down with the hiring executive and the people the role will touch. Together we agree on the success profile, compensation range, and decision process in writing, so everyone is aligned before outreach begins.", get: ["Search charter", "Success profile", "Compensation benchmark", "Portal access & weekly cadence"] },
  { d: "Days 10–30", day: 10, wk: [1.5, 4.3], t: "Market map", what: "We map the full landscape of leaders running comparable operations, rather than sampling from it. The consultant approaches passive candidates directly, with a thoughtful case for why the opportunity deserves their attention.", get: ["Market map", "Target company list", "Proprietary shortlist by day 30"] },
  { d: "Days 30–60", day: 30, wk: [4.3, 8.6], t: "Assessment", what: "Candidates go through structured behavioral and leadership assessment, technical vetting, and culture alignment — on site where it matters. By the time you meet them, the slate has been carefully calibrated to the role.", get: ["Assessment reports", "Interview schedule", "Reference plan"] },
  { d: "Days 60–90", day: 60, wk: [8.6, 13], t: "Finalists & offer", what: "We present a competitive finalist slate and manage the offer from there — negotiation, counteroffer planning, and resignation coaching — so that an accepted offer becomes a start date.", get: ["Finalist slate", "Offer strategy", "Counteroffer plan"] },
  { d: "Days 90–120+", day: 90, wk: [13, 17], t: "Onboarding", what: "Our involvement continues well past the start date, with structured 30/60/90-day support and retention check-ins through the first year. The search is complete when your new leader is settled and performing.", get: ["30/60/90 plan", "Retention check-ins", "Guarantee-backed engagement"] },
];
function PhaseDetail({ p, compact }) {
  return (
    <div key={p.t} className="v2-grid-2" style={{ display: "grid", gridTemplateColumns: compact ? "1fr" : "1.4fr 1fr", gap: compact ? 20 : "clamp(2rem,4vw,4rem)" }}>
      <div>
        <div style={{ ...KICK, marginBottom: 10 }}>What happens</div>
        <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--text-body)", margin: 0 }}>{p.what}</p>
      </div>
      <div>
        <div style={{ ...KICK, marginBottom: 10 }}>What you receive</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{p.get.map((g) => <div key={g} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, color: "var(--text-body)", lineHeight: 1.5 }}><span style={{ color: "var(--red)", fontSize: 8, marginTop: 5 }}>&#9656;</span>{g}</div>)}</div>
      </div>
    </div>
  );
}
/* Watchface: one red hand sweeps to the selected phase; the dial is the 120-day search. */
function FlipDate({ value }) {
  const [cur, setCur] = React.useState(value); const [prev, setPrev] = React.useState(null); const [k, setK] = React.useState(0);
  React.useEffect(() => { if (value === cur) return; setPrev(cur); setCur(value); setK((n) => n + 1); const t = setTimeout(() => setPrev(null), 520); return () => clearTimeout(t); }, [value]);
  const face = (v, extra) => <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, fontWeight: 700, letterSpacing: "-.02em", color: "#0E0B24", fontVariantNumeric: "tabular-nums", background: "#f4f1ea", backfaceVisibility: "hidden", ...extra }}>{String(v).padStart(2, "0")}</div>;
  return (
    <div style={{ position: "relative", width: 34, height: 26, perspective: 160, borderRadius: 2, boxShadow: "inset 0 0 0 1px rgba(255,255,255,.35), 0 0 0 1.5px rgba(226,60,65,.7), 0 2px 8px rgba(0,0,0,.5)" }}>
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: 2 }}>
        {face(cur)}
        {prev !== null && <div key={k} style={{ position: "absolute", inset: 0, transformOrigin: "50% 0%", animation: "v2-flip .5s var(--ease-signature) both" }}>{face(prev)}</div>}
        <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 1, background: "rgba(14,11,36,.25)" }} />
      </div>
    </div>
  );
}
function SearchWatch({ day, size = 260 }) {
  const c = 130, r = 112, ang = (day / 120) * 360, circ = 2 * Math.PI * (r - 14);
  return (
    <div style={{ position: "relative", width: size, maxWidth: "100%" }}>
    <div style={{ position: "absolute", right: "13.5%", top: "50%", transform: "translateY(-50%)", zIndex: 2 }}><FlipDate value={Math.round(day)} /></div>
    <svg viewBox="0 0 260 260" width={size} height={size} style={{ display: "block", maxWidth: "100%", height: "auto" }} aria-hidden="true">
      <circle cx={c} cy={c} r={r + 12} fill="rgba(255,255,255,.015)" stroke="rgba(255,255,255,.1)" strokeWidth="1" />
      {Array.from({ length: 60 }, (_, i) => i).filter((i) => i < 13 || i > 17).map((i) => { const major = i % 5 === 0; const [x0, y0] = polar(c, c, r, i * 6); const [x1, y1] = polar(c, c, r - (major ? 10 : 5), i * 6); return <line key={i} x1={x0} y1={y0} x2={x1} y2={y1} stroke={major ? "rgba(255,255,255,.7)" : "rgba(255,255,255,.22)"} strokeWidth={major ? 1.5 : 1} />; })}
      <circle cx={c} cy={c} r={r - 14} fill="none" stroke="rgba(226,60,65,.22)" strokeWidth="5" strokeDasharray={circ} strokeDashoffset={circ * (1 - day / 120)} transform={`rotate(-90 ${c} ${c})`} style={{ transition: "stroke-dashoffset .9s var(--ease-signature)" }} />
      <g transform="translate(118 78)"><rect x="0" y="0" width="5" height="22" rx=".5" fill="#fff" opacity=".92" /><rect x="9" y="0" width="12" height="10" rx=".5" fill="#E23C41" /><rect x="9" y="12" width="12" height="10" rx=".5" fill="#E23C41" opacity=".9" /></g>
      <g style={{ transformOrigin: "130px 130px", transform: `rotate(${ang}deg)`, transition: "transform .9s var(--ease-signature)" }}>
        <line x1={c} y1={c + 16} x2={c} y2={c - r + 22} stroke="#E23C41" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx={c} cy={c} r="4.5" fill="#0E0B24" stroke="#E23C41" strokeWidth="2" />
      </g>
    </svg>
    </div>
  );
}
function Timeline({ variant }) {
  const w = useWidth(); const mobile = w <= 880;
  const [active, setActive] = React.useState(0);
  const [touched, setTouched] = React.useState(false);
  const [day, setDay] = React.useState(0);
  const [ref, vis] = useInView(.3);
  const dayRef = React.useRef(0);
  const [playing, setPlaying] = React.useState(true);
  const [ended, setEnded] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const running = false;
  React.useEffect(() => {
    if (variant === "c" || variant === "d" || touched || !vis) return;
    const id = setInterval(() => setActive((a) => (a + 1) % PHASES.length), 4200); return () => clearInterval(id);
  }, [touched, vis, variant]);
  const pick = (i) => { setTouched(true); setActive(i); };
  const head = (
    <React.Fragment>
      <Eyebrow style={{ marginBottom: 16 }}>The search, week by week</Eyebrow>
      <Heading style={{ maxWidth: 820, marginBottom: 16 }}>How a retained search unfolds over <em style={{ color: "var(--red)", fontStyle: "italic" }}>120</em> days.</Heading>
      <p style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)", color: "var(--text-secondary)", maxWidth: 620, marginBottom: "clamp(2.5rem,5vw,4rem)" }}>Each search follows the same considered arc. Select a phase to see what happens and what reaches your client portal along the way.</p>
    </React.Fragment>
  );
  if (variant === "b") return (
    <section id="process" ref={ref} data-screen-label="Timeline" style={{ padding: "var(--section-y) 0", background: "var(--night-mid)" }}>
      <Wrap>
        <div className="bsp-about-grid" style={{ display: "grid", gridTemplateColumns: ".9fr 1.1fr", gap: "clamp(2.5rem,6vw,7rem)", alignItems: "start" }}>
          <div style={{ position: mobile ? "static" : "sticky", top: 110 }}>{head}
            <div style={{ display: "flex", gap: 6, marginTop: -16 }}>{PHASES.map((p, i) => <span key={i} onClick={() => pick(i)} style={{ height: 3, flex: 1, background: i <= active ? "var(--red)" : "var(--red-012)", cursor: "pointer", transition: "background .4s" }} />)}</div>
          </div>
          <div>
            {PHASES.map((p, i) => {
              const on = active === i;
              return (
                <div key={i} onClick={() => pick(i)} onMouseEnter={() => !mobile && pick(i)} style={{ borderTop: "1px solid var(--white-06)", padding: "22px 0", cursor: "pointer" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".12em", color: on ? "var(--red)" : "var(--text-muted)", minWidth: 96, transition: "color .3s" }}>{p.d}</span>
                    <Heading as="h3" ghost active={on} period size="clamp(1.4rem,2.6vw,2.2rem)" style={{ lineHeight: 1.05, flex: 1 }}>{p.t}</Heading>
                    <span style={{ color: "var(--red)", fontSize: 20, lineHeight: 1, transform: on ? "rotate(45deg)" : "none", transition: "transform .3s", opacity: .8 }}>+</span>
                  </div>
                  <div style={{ overflow: "hidden", maxHeight: on ? 700 : 0, opacity: on ? 1 : 0, transition: "max-height .55s var(--ease-signature), opacity .35s" }}><div style={{ paddingTop: 22, paddingLeft: mobile ? 0 : 114 }}><PhaseDetail p={p} compact={mobile || w < 1100} /></div></div>
                </div>
              );
            })}
            <div style={{ borderTop: "1px solid var(--white-06)" }} />
          </div>
        </div>
      </Wrap>
    </section>
  );
  if (variant === "d") {
    const n = PHASES.length, seg = 100 / n;
    const endDay = active < n - 1 ? PHASES[active + 1].day : 120;
    const watchDay = PHASES[active].day;
    return (
      <section id="process" ref={ref} data-screen-label="Timeline" style={{ padding: "var(--section-y) 0", background: "var(--night)", overflow: "hidden" }}>
        <Wrap>
          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 300px", gap: "clamp(2rem,4vw,5rem)", alignItems: "start" }}>
            <div>{head}</div>
            <div style={{ justifySelf: mobile ? "start" : "end", paddingTop: mobile ? 0 : 8, marginBottom: mobile ? 4 : 0 }}><SearchWatch day={watchDay} size={mobile ? 190 : 260} /></div>
          </div>
          {mobile ? (
            <div>
              {PHASES.map((p, i) => { const on = active === i; return (
                <button key={i} onClick={() => pick(i)} aria-pressed={on} style={{ fontFamily: "inherit", background: "none", border: "none", borderTop: `1px solid ${on ? "var(--red)" : "rgba(255,255,255,.1)"}`, width: "100%", textAlign: "left", cursor: "pointer", padding: "16px 0", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6, color: on ? "#fff" : "var(--text-faint)", transition: "all .35s" }}>
                  <span style={{ fontSize: "1.15rem", fontWeight: 700, letterSpacing: "-.02em" }}>{p.t}<span style={{ color: on ? "var(--red)" : "transparent" }}>.</span></span>
                  <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{p.d}</span>
                </button>); })}
            </div>
          ) : (
          <div>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 1, background: "rgba(255,255,255,.14)" }} />
              <div style={{ position: "absolute", top: -1, height: 3, left: `${active * seg}%`, width: vis ? `${seg}%` : 0, background: "var(--red)", transition: "left .65s var(--ease-signature), width .9s var(--ease-signature)" }} />
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${n},1fr)` }}>
                {PHASES.map((p, i) => { const on = active === i; return (
                  <button key={i} onClick={() => pick(i)} aria-pressed={on} style={{ fontFamily: "inherit", background: "none", border: "none", textAlign: "left", cursor: "pointer", padding: "26px 20px 0 0", display: "flex", flexDirection: "column", gap: 8, color: on ? "#fff" : "var(--text-faint)", transition: "color .35s" }}
                    onMouseEnter={(e) => { if (!on) e.currentTarget.style.color = "var(--text-secondary)"; }} onMouseLeave={(e) => { if (!on) e.currentTarget.style.color = "var(--text-faint)"; }}>
                    <span style={{ fontSize: "clamp(1.05rem,1.7vw,1.45rem)", fontWeight: 700, letterSpacing: "-.02em", lineHeight: 1.1 }}>{p.t}<span style={{ color: on ? "var(--red)" : "transparent", transition: "color .35s" }}>.</span></span>
                    <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: on ? "var(--text-secondary)" : "var(--text-faint)" }}>{p.d}</span>
                  </button>); })}
              </div>
            </div>
          </div>
          )}
          <div style={{ marginTop: "clamp(2rem,5vw,4.5rem)" }}>
            <Stack items={PHASES} active={active} render={(p, i) => (
              <div className="v2-grid-2" style={{ display: "grid", gridTemplateColumns: "1.2fr .8fr", gap: "clamp(2rem,6vw,7rem)", alignItems: "start" }}>
                <p style={{ fontSize: "clamp(1.15rem,1.6vw,1.45rem)", lineHeight: 1.6, color: "#fff", fontWeight: 500, letterSpacing: "-.01em", margin: 0, maxWidth: 680 }}>{p.what}</p>
                <div>
                  <div style={{ ...KICK, marginBottom: 6 }}>Delivered to your portal</div>
                  {DELIV.filter((x) => x.p === i).map((x) => <div key={x.t} style={{ padding: "13px 0", borderBottom: "1px solid var(--white-06)", fontSize: 15, color: "var(--text-secondary)" }}>{x.t}</div>)}
                </div>
              </div>
            )} />
          </div>
        </Wrap>
      </section>
    );
  }
  if (variant === "c") {
    const cur = PHASES.reduce((acc, p, i) => (day >= p.day ? i : acc), 0);
    const totalW = 17;
    return (
      <section id="process" ref={ref} data-screen-label="Timeline" style={{ padding: "var(--section-y) 0", background: "var(--night-mid)" }}>
        <Wrap>{head}
          <div style={{ border: "1px solid var(--red-012)", background: "var(--card-fill)", padding: "clamp(1.2rem,3vw,2.4rem)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, marginBottom: 18, flexWrap: "wrap" }}>
              <div style={{ ...LABEL }}>Drag to any day of the search</div>
              <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-.02em", color: "#fff" }}>Day <span style={{ color: "var(--red)" }}>{day}</span><span style={{ fontSize: 13, color: "var(--text-muted)", marginLeft: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase" }}>{PHASES[cur].t}</span></div>
            </div>
            <input type="range" min="0" max="120" value={day} onChange={(e) => { setDay(+e.target.value); setTouched(true); }} className="v2-range" style={{ width: "100%", marginBottom: 22 }} aria-label="Day of search" />
            <div style={{ position: "relative", display: "grid", gap: 8 }}>
              <div aria-hidden="true" style={{ position: "absolute", top: 0, bottom: 0, left: `${(day / 120) * 100}%`, width: 1, background: "var(--red)", opacity: .7, transition: "left .15s", pointerEvents: "none" }} />
              {PHASES.map((p, i) => {
                const on = cur === i; const l = (p.wk[0] / totalW) * 100, wd = ((p.wk[1] - p.wk[0]) / totalW) * 100;
                return (
                  <div key={i} onClick={() => { setDay(p.day); setTouched(true); }} style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "150px 1fr", gap: mobile ? 4 : 16, alignItems: "center", cursor: "pointer" }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: on ? "#fff" : "var(--text-muted)", letterSpacing: ".02em", transition: "color .3s" }}>{p.t}<span style={{ color: "var(--text-faint)", fontWeight: 500, marginLeft: 8, fontSize: 11 }}>{p.d}</span></span>
                    <div style={{ position: "relative", height: 26, background: "rgba(255,255,255,.025)" }}>
                      <div style={{ position: "absolute", top: 4, bottom: 4, left: `${l}%`, width: `${wd}%`, background: on ? "var(--red)" : "rgba(226,60,65,.18)", border: `1px solid ${on ? "var(--red)" : "var(--red-035)"}`, transition: "all .35s var(--ease-signature)", boxShadow: on ? "0 0 22px rgba(226,60,65,.35)" : "none" }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ borderTop: "1px solid var(--white-06)", marginTop: 26, paddingTop: 26 }}><Stack items={PHASES} active={cur} render={(p) => <PhaseDetail p={p} compact={mobile} />} /></div>
          </div>
        </Wrap>
      </section>
    );
  }
  return (
    <section id="process" ref={ref} data-screen-label="Timeline" style={{ padding: "var(--section-y) 0", background: "var(--night-mid)" }}>
      <Wrap>{head}
        <div style={{ position: "relative", marginBottom: 40, overflowX: mobile ? "auto" : "visible" }} className="v2-hscroll">
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${PHASES.length},1fr)`, minWidth: mobile ? 640 : 0, position: "relative" }}>
            <div aria-hidden="true" style={{ position: "absolute", left: "10%", right: "10%", top: 9, height: 1, background: "var(--red-012)" }} />
            <div aria-hidden="true" style={{ position: "absolute", left: "10%", top: 9, height: 1, width: `${(active / (PHASES.length - 1)) * 80}%`, background: "var(--red)", transition: "width .6s var(--ease-signature)" }} />
            {PHASES.map((p, i) => {
              const on = active === i, done = i < active;
              return (
                <div key={i} onClick={() => pick(i)} onMouseEnter={() => !mobile && pick(i)} style={{ textAlign: "center", cursor: "pointer", position: "relative", padding: "0 8px" }}>
                  <div style={{ width: 19, height: 19, borderRadius: "50%", margin: "0 auto 18px", border: `1.5px solid ${on || done ? "var(--red)" : "var(--red-035)"}`, background: on ? "var(--red)" : done ? "rgba(226,60,65,.25)" : "var(--night-mid)", boxShadow: on ? "0 0 18px rgba(226,60,65,.6)" : "none", transition: "all .4s var(--ease-signature)" }} />
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: on ? "var(--red)" : "var(--text-muted)", marginBottom: 6, transition: "color .3s" }}>{p.d}</div>
                  <div style={{ fontSize: "clamp(.95rem,1.4vw,1.2rem)", fontWeight: 700, color: on ? "#fff" : "var(--text-muted)", letterSpacing: "-.01em", transition: "color .3s" }}>{p.t}</div>
                </div>
              );
            })}
          </div>
        </div>
        <Card variant="accent" padding="clamp(1.6rem,3.5vw,3rem)"><Stack items={PHASES} active={active} render={(p) => <PhaseDetail p={p} compact={mobile} />} /></Card>
      </Wrap>
    </section>
  );
}

/* ---------- Results ---------- */
const CASES = [
  { tab: "Ingredients", ind: "Ingredients Manufacturing", rev: "$500M+ Revenue", role: "VP Operations", focus: "Quality · Capital Projects · Automation", m: "120 days", ml: "Time to Fill", status: "1.5+ years and thriving",
    challenge: "A global ingredients manufacturer needed a VP Operations to lead quality transformation and oversee a major capital equipment and automation program. Qualified candidates with both the technical depth and the leadership maturity to manage enterprise-scale capex were scarce.",
    outcome: "Placed within 120 days in a difficult market. The hire has exceeded capital project timelines, navigated real-time budget constraints, identified alternate suppliers across multiple business lines, and resolved a series of global supply chain disruptions." },
  { tab: "Chemical", ind: "Chemical Manufacturing", rev: "$1B+ Revenue", role: "EHS Leader", focus: "Safety Transformation · Cultural Change", m: "Cross-country", ml: "Relocation", status: "In role and delivering",
    challenge: "A large-scale chemical manufacturer with a historically reactive safety culture needed an EHS leader capable of building proactive safety systems from the ground up — including a cross-country relocation to a specialized facility where stakeholder buy-in was critical.",
    outcome: "Successfully relocated a candidate cross-country into a high-impact role. The hire has earned organizational buy-in, implemented new proactive safety procedures, and is delivering measurable improvements adopted across the enterprise." },
  { tab: "Industrial", ind: "Industrial Manufacturing", rev: "Mid-Market · Global", role: "Manufacturing Leader, Americas", focus: "Succession Planning · Multi-Site Operations", m: "12–18 mo", ml: "Succession Window", status: "Fully transitioned and leading",
    challenge: "A mid-sized industrial manufacturer needed to plan succession for their Americas manufacturing leader approaching retirement — a 12–18 month transition demanding engineering depth and multi-site command.",
    outcome: "Identified an operations leader with a strong engineering pedigree and the strategic range to lead across a complex manufacturing network. The predecessor has since retired; the hire is nearly two years in and performing at the level envisioned." },
  { tab: "Plastics", ind: "Plastics Manufacturing", rev: "$1B+ Revenue · Global", role: "Plant Manager", focus: "Site Leadership · U.S. Flagship", m: "Multi-finalist", ml: "Slate Delivered", status: "Placed 2026 — onboarding",
    challenge: "A global specialty plastics manufacturer needed a Plant Manager for its U.S. flagship site — a high-visibility role demanding floor credibility, process and quality rigor, and the leadership range to run one of the company's most strategic plants.",
    outcome: "Ran a full retained process from market mapping through offer negotiation, delivering a competitive multi-finalist slate. Placed a proven plant leader — and the client has since retained BSP for its next search." },
];
function CaseText({ c, compact }) {
  return (
    <div className="v2-grid-2" style={{ display: "grid", gridTemplateColumns: compact ? "1fr" : "1fr 1fr", gap: compact ? 20 : 40 }}>
      <div><div style={{ ...KICK, marginBottom: 10, opacity: .7 }}>The Challenge</div><p style={{ fontSize: 14.5, color: "var(--text-secondary)", lineHeight: 1.8, margin: 0 }}>{c.challenge}</p></div>
      <div><div style={{ ...KICK, marginBottom: 10, opacity: .7 }}>The Outcome</div><p style={{ fontSize: 14.5, color: "var(--text-secondary)", lineHeight: 1.8, margin: 0 }}>{c.outcome}</p></div>
    </div>
  );
}
function Cases({ variant }) {
  const w = useWidth(); const mobile = w <= 880;
  const [active, setActive] = React.useState(0);
  const head = (
    <div className="v2-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, flexWrap: "wrap", marginBottom: "clamp(2rem,4vw,3.5rem)" }}>
      <div><Eyebrow style={{ marginBottom: 16 }}>Placement outcomes</Eyebrow><Heading style={{ maxWidth: 700 }}>Recent searches,<br />and what came of them.</Heading></div>
      <div style={{ fontSize: 11, color: "var(--text-muted)", fontStyle: "italic", maxWidth: 260, lineHeight: 1.6 }}>Client identities are protected. Every outcome shown here is real and verified.</div>
    </div>
  );
  if (variant === "b") return (
    <section id="results" data-screen-label="Results" style={{ padding: "var(--section-y) 0", background: "var(--night)" }}>
      <Wrap>{head}
        {!mobile && <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.4fr 1fr 1.2fr 40px", gap: 20, padding: "0 20px 12px", ...LABEL, fontSize: 9 }}><span>Sector</span><span>Role placed</span><span>Key figure</span><span>Status</span><span /></div>}
        <div style={{ borderTop: "1px solid var(--red-012)" }}>
          {CASES.map((c, i) => {
            const on = active === i;
            return (
              <div key={i} style={{ borderBottom: "1px solid var(--white-06)", background: on ? "rgba(226,60,65,.03)" : "transparent", transition: "background .3s" }}>
                <div onClick={() => setActive(on ? -1 : i)} className="bsp-advrow" style={{ display: "grid", gridTemplateColumns: mobile ? "1fr 40px" : "1.2fr 1.4fr 1fr 1.2fr 40px", gap: mobile ? 12 : 20, alignItems: "center", padding: "20px 20px", cursor: "pointer" }}>
                  {mobile ? (
                    <div><div style={{ ...KICK, marginBottom: 6 }}>{c.ind}</div><div style={{ fontSize: 18, fontWeight: 700, color: on ? "#fff" : "var(--text-secondary)" }}>{c.role}</div><div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 6 }}>{c.ml}: <span style={{ color: "var(--red)", fontWeight: 700 }}>{c.m}</span> · {c.rev}</div></div>
                  ) : (
                    <React.Fragment>
                      <div><div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{c.ind}</div><div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 3 }}>{c.rev}</div></div>
                      <div style={{ fontSize: 17, fontWeight: 700, color: on ? "#fff" : "var(--text-secondary)", letterSpacing: "-.01em" }}>{c.role}</div>
                      <div><div style={{ fontSize: 20, fontWeight: 700, color: "var(--red)", letterSpacing: "-.01em" }}>{c.m}</div><div style={{ fontSize: 10, color: "var(--text-muted)", letterSpacing: ".1em", textTransform: "uppercase", marginTop: 2 }}>{c.ml}</div></div>
                      <div><StatusPill style={{ padding: "6px 12px", fontSize: 10 }}>{c.status}</StatusPill></div>
                    </React.Fragment>
                  )}
                  <span style={{ color: "var(--red)", fontSize: 22, lineHeight: 1, transform: on ? "rotate(45deg)" : "none", transition: "transform .3s", textAlign: "center" }}>+</span>
                </div>
                <div style={{ overflow: "hidden", maxHeight: on ? 700 : 0, transition: "max-height .5s var(--ease-signature)" }}><div style={{ padding: "4px 20px 28px" }}><div style={{ fontSize: 12, color: "var(--text-muted)", letterSpacing: ".05em", marginBottom: 18 }}>{c.focus}</div><CaseText c={c} compact={mobile} /></div></div>
              </div>
            );
          })}
        </div>
      </Wrap>
    </section>
  );
  if (variant === "c") return (
    <section id="results" data-screen-label="Results" style={{ padding: "var(--section-y) 0", background: "var(--night)" }}>
      <Wrap>{head}
        <div className="v2-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {CASES.map((c, i) => (
            <Card key={i} variant="border" padding="clamp(1.5rem,2.6vw,2.2rem)" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <span style={{ ...KICK, padding: "4px 10px", background: "rgba(226,60,65,.08)" }}>{c.ind}</span>
                <span style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, letterSpacing: ".08em" }}>{c.rev}</span>
              </div>
              <div>
                <h3 style={{ fontSize: "clamp(1.3rem,2vw,1.7rem)", fontWeight: 700, margin: "0 0 6px", letterSpacing: "-.015em" }}>{c.role}</h3>
                <div style={{ fontSize: 12, color: "var(--text-muted)", letterSpacing: ".05em" }}>{c.focus}</div>
              </div>
              <div style={{ display: "flex", gap: 28, alignItems: "center", padding: "14px 0", borderTop: "1px solid var(--red-008)", borderBottom: "1px solid var(--red-008)", flexWrap: "wrap" }}>
                <div><div style={{ ...LABEL, fontSize: 9, marginBottom: 4 }}>{c.ml}</div><div style={{ fontSize: 22, fontWeight: 700, color: "var(--red)", letterSpacing: "-.01em" }}>{c.m}</div></div>
                <StatusPill style={{ padding: "6px 12px", fontSize: 10 }}>{c.status}</StatusPill>
              </div>
              <CaseText c={c} compact />
            </Card>
          ))}
        </div>
      </Wrap>
    </section>
  );
  return (
    <section id="results" data-screen-label="Results" style={{ padding: "var(--section-y) 0", background: "var(--night)" }}>
      <Wrap>{head}
        <div className="v2-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 2, marginBottom: 2 }}>
          {CASES.map((c, i) => {
            const on = active === i;
            return (
              <button key={i} onClick={() => setActive(i)} style={{ textAlign: "left", background: on ? "rgba(226,60,65,.08)" : "rgba(226,60,65,.02)", border: "none", borderBottom: `3px solid ${on ? "var(--red)" : "transparent"}`, padding: "clamp(1.1rem,2vw,1.6rem)", cursor: "pointer", fontFamily: "inherit", color: "inherit", transition: "all var(--dur-slow) var(--ease-signature)", display: "flex", flexDirection: "column", gap: 10, minHeight: 150 }}>
                <span style={{ ...KICK, color: on ? "var(--red)" : "var(--text-muted)" }}>{c.ind}</span>
                <span style={{ fontSize: "clamp(1.5rem,2.4vw,2.1rem)", fontWeight: 700, letterSpacing: "-.02em", lineHeight: 1, color: on ? "#fff" : "var(--text-secondary)" }}>{c.m}</span>
                <span style={{ ...LABEL, fontSize: 9 }}>{c.ml}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: on ? "#fff" : "var(--text-muted)", marginTop: "auto" }}>{c.role}</span>
              </button>
            );
          })}
        </div>
        <Card variant="accent" padding="clamp(1.8rem,4vw,3.2rem)">
          <Stack items={CASES} active={active} render={(c) => (
            <div>
              <div className="v2-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
                <div><h3 style={{ fontSize: "var(--fs-h3)", fontWeight: 700, margin: "0 0 6px" }}>{c.role}</h3><div style={{ fontSize: 13, color: "var(--text-muted)", letterSpacing: ".05em" }}>{c.focus} · {c.rev}</div></div>
                <StatusPill>{c.status}</StatusPill>
              </div>
              <CaseText c={c} compact={mobile} />
            </div>
          )} />
        </Card>
      </Wrap>
    </section>
  );
}

/* ---------- Industries ---------- */
const INDS = [
  { n: "Manufacturing", s: "Discrete & Process", r: "VP Operations · Plant Manager · Director of Manufacturing · VP Quality · COO", d: "From lean transformations to greenfield launches, we place the operators who keep the floor running — leaders who have lived with takt times, changeovers, and real cost pressure. Years in this sector have taught us the difference between a résumé that mentions operational excellence and a leader who has delivered it." },
  { n: "Supply Chain & Logistics", s: "End-to-End", r: "VP Supply Chain · Director Procurement · Head of Logistics · CSCO", d: "Tariff shifts, nearshoring, and dual-sourcing have widened what a supply chain leader is asked to do. We place executives who have redesigned networks under pressure, not only managed them in steady state." },
  { n: "Building Products", s: "Construction & Materials", r: "Division President · VP Sales · Director Product Dev", d: "Construction cycles, channel strategy, and product innovation. Building products leadership demands range — reading housing starts, managing dealer relationships, and driving product development against commodity cost swings." },
  { n: "Food & Beverage", s: "CPG & Production", r: "VP Manufacturing · Plant Director · Director Food Safety · COO", d: "Food and beverage leadership balances safety, compliance, and speed to shelf. From plants under SQF and FDA scrutiny to the commercial demands of retail and private-label customers, we place operators who protect the brand while delivering the numbers." },
  { n: "Chemicals & Packaging", s: "Specialty & Industrial", r: "VP Operations · Director Engineering · EHS Director · CTO", d: "These searches call for technical depth and regulatory rigor in equal measure — leaders fluent in process safety, EHS culture, and the engineering realities of continuous operations, where the cost of a wrong hire is measured in more than dollars." },
  { n: "Private Equity", s: "Portfolio & Platform", r: "Portfolio CEO · Operating Partner · CFO PE-Backed · Board Director", d: "Inside a hold period, speed and certainty matter a great deal. We place operating leaders who have created value in sponsor-backed companies before and can contribute to EBITDA from the first quarter." },
  { n: "Industrial Equipment", s: "Capital Goods", r: "VP Engineering · Director Product Mgmt · GM Aftermarket", d: "Aftermarket, service, and OEM. Leaders who balance the engineering culture of equipment businesses with the commercial discipline that aftermarket growth requires." },
  { n: "Real Estate", s: "Development & Construction", r: "VP Development · Director Construction · Head of Acquisitions", d: "Ground-up development to asset management. Executives who can underwrite, entitle, build, and operate — managing risk across years-long commitments." },
  { n: "Engineering Services", s: "Design & Consulting", r: "VP Engineering · Practice Leader · Chief Engineer", d: "Technical leaders who can win, manage, and deliver complex engineering programs are genuinely rare. We know where to find the people who are credible as both engineers and business builders." },
];
function Industries() {
  const w = useWidth(); const mobile = w <= 768;
  const [open, setOpen] = React.useState(-1);
  const d = open >= 0 ? INDS[open] : null;
  const anno = (x) => (
    <div className="v2-grid-2" style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1.5fr 1fr", gap: mobile ? 18 : "clamp(1.5rem,3vw,3rem)", textAlign: "left", fontWeight: 400, letterSpacing: 0, fontSize: 15, lineHeight: 1.8 }}>
      <div><div style={{ fontSize: 12, color: "var(--text-muted)", letterSpacing: ".05em", marginBottom: 10 }}>{x.s}</div><div style={{ fontSize: 14.5, color: "var(--text-body)", lineHeight: 1.85 }}>{x.d}</div></div>
      <div><div style={{ ...KICK, marginBottom: 10 }}>Roles we place</div><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{x.r.split(" · ").map((r) => <Chip key={r}>{r}</Chip>)}</div></div>
    </div>
  );
  return (
    <section id="industries" data-screen-label="Industries" style={{ padding: "var(--section-y-lg) 0", background: "var(--night)", overflow: "hidden" }}>
      <Wrap max={1100} style={{ textAlign: mobile ? "left" : "center" }}>
        <Eyebrow style={{ marginBottom: 18 }}>Industries</Eyebrow>
        <Heading style={{ marginBottom: "clamp(2.5rem,5vw,4rem)" }}>Sectors we know well<span style={{ color: "var(--red)" }}>.</span></Heading>
        <div style={{ fontSize: mobile ? "1.35rem" : "clamp(1.25rem,2.5vw,2rem)", fontWeight: 700, letterSpacing: "-.02em", lineHeight: 1.5, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: mobile ? "4px 0" : "6px 0", flexDirection: mobile ? "column" : "row" }}>
          {INDS.map((x, i) => {
            const lit = open === i;
            return (
              <React.Fragment key={i}>
                <span role="button" tabIndex={0} onClick={() => setOpen(lit ? -1 : i)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(lit ? -1 : i); } }}
                  className={lit || mobile ? "" : "bsp-ghost"} style={{ cursor: "pointer", color: lit ? "#fff" : mobile ? "rgba(197,195,206,.45)" : "transparent", transition: "color .4s", userSelect: "none", padding: mobile ? ".25rem 0" : "0 .35em", textAlign: mobile ? "left" : "center", display: "inline-block" }}>
                  {x.n}<span style={{ color: lit ? "var(--red)" : "transparent" }}>.</span>
                </span>
                {!mobile && i < INDS.length - 1 && <span aria-hidden="true" style={{ color: "var(--red)", opacity: .45, fontWeight: 400 }}>·</span>}
                {mobile && <div style={{ overflow: "hidden", maxHeight: lit ? 800 : 0, transition: "max-height .45s var(--ease-signature)" }}><div style={{ padding: "8px 0 22px" }}>{anno(x)}</div></div>}
              </React.Fragment>
            );
          })}
        </div>
        {!mobile && <div style={{ overflow: "hidden", maxHeight: d ? 320 : 0, transition: "max-height .5s var(--ease-signature)" }}>{d && <div style={{ padding: "30px 0 8px" }}><Stack items={INDS} active={open} render={(x) => anno(x)} /></div>}</div>}
      </Wrap>
    </section>
  );
}

/* ---------- Insights ---------- */
function Subscribe({ light }) {
  const [v, setV] = React.useState(""); const [ok, setOk] = React.useState(false);
  const ink = light ? "var(--paper-ink)" : "#fff";
  if (ok) return <div style={{ fontSize: 13, color: light ? "var(--paper-ink-soft)" : "var(--text-secondary)" }}>Subscribed. The next advisory arrives when it's ready — not on a schedule.</div>;
  return (
    <form onSubmit={(e) => { e.preventDefault(); if (v.includes("@")) setOk(true); }} style={{ display: "flex", gap: 0, maxWidth: 460, width: "100%" }}>
      <input value={v} onChange={(e) => setV(e.target.value)} type="email" required placeholder="Work email" aria-label="Work email" style={{ flex: 1, minWidth: 0, padding: "14px 16px", background: light ? "rgba(22,19,46,.04)" : "rgba(255,255,255,.04)", border: `1px solid ${light ? "var(--paper-rule)" : "var(--red-018)"}`, borderRight: "none", color: ink, fontFamily: "inherit", fontSize: 14, outline: "none" }} />
      <Button type="submit" size="sm" style={{ padding: "0 22px" }}>Subscribe</Button>
    </form>
  );
}
function Insights({ variant }) {
  const w = useWidth(); const mobile = w <= 880; const stack = w < 1180;
  const [sel, setSel] = React.useState(0);
  const f = ADVISORIES[0], rest = ADVISORIES.slice(1);
  const head = (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, flexWrap: "wrap", marginBottom: "clamp(2rem,4vw,3.5rem)" }}>
      <div><Eyebrow style={{ marginBottom: 16 }}>Insights · The Advisory series</Eyebrow><Heading style={{ maxWidth: 760 }}>Perspective for the people who <em style={{ color: "var(--red)", fontStyle: "italic" }}>run</em> the real economy.</Heading></div>
      <p style={{ fontSize: 14, color: "var(--text-muted)", maxWidth: 360, lineHeight: 1.7, margin: 0 }}>We publish when there is something worth saying, rather than on a schedule. The series is read by operators, boards, and sponsors across U.S. manufacturing.</p>
    </div>
  );
  const Row = ({ a, light }) => (
    <a href={a.href} target="_blank" rel="noopener noreferrer" className={light ? "" : "bsp-advrow"} style={{ display: "grid", gridTemplateColumns: stack ? "1fr" : "96px 1fr auto", gap: stack ? 6 : 24, alignItems: "baseline", padding: "16px 0", borderTop: `1px solid ${light ? "var(--paper-rule-soft)" : "var(--white-06)"}`, textDecoration: "none", color: "inherit" }}>
      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".08em", color: light ? "var(--paper-ink-mute)" : "var(--text-muted)" }}>{a.date}</span>
      <span><span style={{ fontSize: 15, fontWeight: 700, color: light ? "var(--paper-ink)" : "#fff", display: "block", marginBottom: 4 }}>{a.title}</span><span style={{ fontSize: 13, color: light ? "var(--paper-ink-soft)" : "var(--text-muted)", lineHeight: 1.6 }}>{a.desc}</span></span>
      <span style={{ fontSize: 11, fontWeight: 700, color: "var(--red)", letterSpacing: ".1em", textTransform: "uppercase", whiteSpace: "nowrap" }}><Numero n={a.no} size={1.3} /> · Read →</span>
    </a>
  );
  if (variant === "b") return (
    <section id="insights" data-screen-label="Insights" style={{ padding: "var(--section-y) 0", background: "var(--night)" }}>
      <Wrap>{head}
        <div className="bsp-about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2rem,4vw,4rem)", alignItems: "start" }}>
          <a href={f.href} target="_blank" rel="noopener noreferrer" className="surface-paper" style={{ display: "block", textDecoration: "none", padding: "clamp(1.8rem,3.5vw,3rem)", position: "relative", boxShadow: "0 30px 80px rgba(0,0,0,.5)", backgroundImage: "var(--paper-grain)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: "var(--fs-mono-meta)", letterSpacing: "var(--ls-mono-meta)", textTransform: "uppercase", color: "var(--paper-ink-mute)", marginBottom: 36, gap: 12, flexWrap: "wrap" }}>
              <span style={{ color: "var(--red)" }}>Advisory <Numero n={f.no} /></span><span>BSP-ADV-2026-0{f.no.slice(-1)} · {f.date}</span>
            </div>
            <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: "clamp(2rem,3.4vw,3rem)", lineHeight: 1.08, letterSpacing: "-.012em", color: "var(--paper-ink)", margin: "0 0 20px" }}>{f.title}<span style={{ color: "var(--red)" }}>.</span></h3>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: 18, lineHeight: 1.55, color: "var(--paper-ink-soft)", margin: "0 0 32px" }}>{f.desc}</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--paper-rule)", paddingTop: 16, fontFamily: "var(--font-mono)", fontSize: "var(--fs-mono-meta)", letterSpacing: "var(--ls-mono-meta)", textTransform: "uppercase", color: "var(--paper-ink-mute)" }}>
              <span>{f.read} read · PDF</span><span style={{ color: "var(--red)" }}>Read the advisory →</span>
            </div>
          </a>
          <div>
            <div style={{ ...LABEL, marginBottom: 6 }}>Earlier in the series</div>
            {rest.map((a) => <Row key={a.no} a={a} />)}
            <div style={{ borderTop: "1px solid var(--white-06)", paddingTop: 24, marginTop: 8 }}><div style={{ ...LABEL, marginBottom: 12 }}>Receive the next advisory</div><Subscribe /></div>
          </div>
        </div>
      </Wrap>
    </section>
  );
  if (variant === "d") {
    const meta = { fontFamily: "var(--font-mono)", fontSize: "var(--fs-mono-meta)", letterSpacing: "var(--ls-mono-meta)", textTransform: "uppercase" };
    const cur = ADVISORIES[sel];
    return (
      <section id="insights" data-screen-label="Insights" style={{ padding: "var(--section-y) 0", background: "var(--night)", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", width: "min(760px,100vw)", height: "min(760px,100vw)", borderRadius: "50%", background: "var(--glow-red)", filter: "blur(70px)", opacity: .09, pointerEvents: "none", top: "-10%", right: "-15%" }} />
        <Wrap style={{ position: "relative" }}>
          <div className="v2-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, flexWrap: "wrap", marginBottom: "clamp(2rem,4vw,3.5rem)" }}>
            <div><Eyebrow style={{ marginBottom: 16 }}>Insights</Eyebrow><Heading style={{ maxWidth: 760 }}>Perspective for the people who <em style={{ color: "var(--red)", fontStyle: "italic" }}>run</em> the real economy.</Heading></div>
            <p style={{ fontSize: 14, color: "var(--text-muted)", maxWidth: 340, lineHeight: 1.7, margin: 0 }}>Client advisories, published when there is something worth saying. Read by operators, boards, and sponsors across U.S. manufacturing.</p>
          </div>
          <div className="bsp-about-grid" style={{ display: "grid", gridTemplateColumns: "1.25fr .75fr", gap: "clamp(2rem,5vw,5rem)", alignItems: "start" }}>
            <div style={{ position: "relative" }}>
              <Stack items={ADVISORIES} active={sel} render={(x, i) => (
                <a href={x.href} target="_blank" rel="noopener noreferrer" className="surface-paper v2-sheet" style={{ display: "flex", flexDirection: "column", textDecoration: "none", padding: "clamp(1.8rem,3.5vw,3.2rem)", boxShadow: "0 40px 100px rgba(0,0,0,.55)", backgroundImage: "var(--paper-grain)", minHeight: mobile ? 0 : 500, transition: "transform .5s var(--ease-signature), box-shadow .5s var(--ease-signature)" }}>
                  <div className="v2-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap", ...meta, color: "var(--paper-ink-mute)", marginBottom: "clamp(2rem,4vw,3.5rem)" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 10 }}>{i === 0 && <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--red)" }} />}<span style={{ color: i === 0 ? "var(--red)" : "var(--paper-ink-mute)" }}>{i === 0 ? "Latest advisory" : "Client advisory"}</span></span>
                    <span>{x.date}</span>
                  </div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: "clamp(2rem,3.6vw,3.4rem)", lineHeight: 1.05, letterSpacing: "-.014em", color: "var(--paper-ink)", margin: "0 0 20px", maxWidth: 640 }}>{x.title}<span style={{ color: "var(--red)" }}>.</span></h3>
                  <p style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.05rem,1.4vw,1.2rem)", lineHeight: 1.55, color: "var(--paper-ink-soft)", margin: "0 0 auto", maxWidth: 600 }}>{x.desc}</p>
                  <div className="v2-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap", borderTop: "1px solid var(--paper-rule)", paddingTop: 18, marginTop: 36 }}>
                    <span style={{ fontFamily: "var(--font-serif)", fontSize: 15, fontWeight: 500, color: "var(--paper-ink)" }}>Bound Search Partners<span style={{ color: "var(--red)" }}>.</span></span>
                    <span style={{ ...meta, color: "var(--red)" }}>{x.read} read · Open the advisory →</span>
                  </div>
                </a>
              )} />
            </div>
            <div>
              <div style={{ ...LABEL, marginBottom: 4 }}>In the series</div>
              {ADVISORIES.map((x, i) => { const on = sel === i; return (
                <div key={x.href} role="button" tabIndex={0} aria-pressed={on} onClick={() => setSel(i)} onMouseEnter={() => !mobile && setSel(i)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(i); } }}
                  style={{ padding: "18px 0", borderBottom: "1px solid var(--white-06)", cursor: "pointer", outline: "none", display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr auto", gap: 16, alignItems: "start" }}>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: on ? "var(--red)" : "var(--text-faint)", marginBottom: 6, transition: "color .3s" }}>{x.date}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-.01em", lineHeight: 1.25, color: on ? "#fff" : "var(--text-muted)", transition: "color .3s" }}>{x.title}<span style={{ color: on ? "var(--red)" : "transparent", transition: "color .3s" }}>.</span></div>
                  </div>
                  {!mobile && <span style={{ fontSize: 14, color: "var(--red)", opacity: on ? 1 : 0, transform: on ? "translateX(0)" : "translateX(-6px)", transition: "all .3s var(--ease-signature)", paddingTop: 20 }}>→</span>}
                </div>); })}
              <div style={{ paddingTop: 18, fontSize: 12, color: "var(--text-faint)", lineHeight: 1.6 }}>Advisories are shared with clients first and published here shortly after.</div>
            </div>
          </div>
        </Wrap>
      </section>
    );
  }
  if (variant === "c") return (
    <section id="insights" data-screen-label="Insights" style={{ padding: "var(--section-y) 0", background: "var(--night)", overflow: "hidden" }}>
      <Wrap>{head}</Wrap>
      <div className="v2-hscroll" style={{ overflowX: "auto", scrollSnapType: "x mandatory", padding: "0 max(var(--gutter), calc((100vw - var(--container)) / 2 + var(--gutter))) 8px", display: "flex", gap: 16 }}>
        {ADVISORIES.map((a, i) => (
          <a key={a.no} href={a.href} target="_blank" rel="noopener noreferrer" className="v2-card" style={{ flex: "0 0 auto", width: mobile ? "82vw" : 380, scrollSnapAlign: "start", textDecoration: "none", color: "inherit", border: `1px solid ${i === 0 ? "var(--red-035)" : "var(--red-012)"}`, background: i === 0 ? "rgba(226,60,65,.05)" : "var(--card-fill)", padding: 28, display: "flex", flexDirection: "column", gap: 16, minHeight: 300, transition: "all var(--dur) var(--ease-signature)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}><span style={{ ...KICK }}>Advisory <Numero n={a.no} size={1.3} /></span>{i === 0 && <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: "#fff", background: "var(--red)", padding: "3px 8px" }}>New</span>}</div>
            <h3 style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.15, letterSpacing: "-.015em", margin: 0 }}>{a.title}</h3>
            <p style={{ fontSize: 13.5, color: "var(--text-muted)", lineHeight: 1.65, margin: 0, flex: 1 }}>{a.desc}</p>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text-faint)", borderTop: "1px solid var(--white-06)", paddingTop: 14 }}><span>{a.date} · {a.read}</span><span style={{ color: "var(--red)", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase" }}>Read →</span></div>
          </a>
        ))}
      </div>
      <Wrap style={{ marginTop: 40, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
        <div style={{ ...LABEL }}>Receive the next advisory the day it publishes</div><Subscribe />
      </Wrap>
    </section>
  );
  return (
    <section id="insights" data-screen-label="Insights" style={{ padding: "var(--section-y) 0", background: "var(--night)" }}>
      <Wrap>{head}
        <div className="bsp-about-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: "clamp(2rem,4vw,4rem)", alignItems: "start" }}>
          <a href={f.href} target="_blank" rel="noopener noreferrer" className="v2-card" style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", minHeight: mobile ? 340 : 460, textDecoration: "none", color: "inherit", padding: "clamp(1.8rem,3.5vw,3rem)", border: "1px solid var(--red-022)", background: "radial-gradient(ellipse 70% 60% at 80% 10%, rgba(226,60,65,.16), transparent 70%), var(--card-fill)", position: "relative", transition: "all var(--dur) var(--ease-signature)" }}>
            <div style={{ position: "absolute", top: 28, left: 28, right: 28, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}><span style={{ ...KICK }}>Featured · Advisory <Numero n={f.no} size={1.3} /></span><span style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: "#fff", background: "var(--red)", padding: "3px 8px" }}>New</span></div>
            <h3 style={{ fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-.025em", margin: "0 0 18px" }}>{f.title}<span style={{ color: "var(--red)" }}>.</span></h3>
            <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7, margin: "0 0 24px", maxWidth: 520 }}>{f.desc}</p>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text-muted)", borderTop: "1px solid var(--white-06)", paddingTop: 16 }}><span>{f.date} · {f.read} read</span><span style={{ color: "var(--red)", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase" }}>Read the advisory →</span></div>
          </a>
          <div>
            {rest.map((a) => <Row key={a.no} a={a} />)}
            <div style={{ borderTop: "1px solid var(--white-06)", paddingTop: 24, marginTop: 8 }}><div style={{ ...LABEL, marginBottom: 12 }}>Receive the next advisory</div><Subscribe /></div>
          </div>
        </div>
      </Wrap>
    </section>
  );
}

/* ---------- Bond ---------- */
function Bond() {
  const [ref, vis] = useInView(.35);
  const [hov, setHov] = React.useState(null);
  const tap = (k) => () => setHov(hov === k ? null : k);
  return (
    <section id="bond" ref={ref} data-screen-label="Bond" style={{ padding: "clamp(3rem,6vw,5rem) 0 clamp(5rem,10vw,8rem)", background: "var(--night)", textAlign: "center", overflow: "hidden", position: "relative" }}>
      <div aria-hidden="true" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 500, background: "radial-gradient(circle,rgba(226,60,65,.04),transparent 70%)", pointerEvents: "none" }} />
      <Wrap>
        <div style={{ position: "relative", width: 140, height: 150, margin: "0 auto" }}>
          <div style={{ position: "absolute", left: 6, top: 6, width: 34, height: 138, background: "#fff", borderRadius: 3, opacity: .92, transform: vis ? (hov === "company" ? "translateX(-30px) scale(1.12)" : hov === "leader" ? "translateX(6px) scale(.95) rotate(2deg)" : hov === "bsp" ? "translateX(18px) scale(1.08)" : "translateX(0)") : "translateX(-100px)", transition: "all .4s var(--ease-signature)" }} />
          <div style={{ position: "absolute", right: 6, top: 6, width: 78, height: 62, background: "var(--red)", borderRadius: 3, transform: vis ? (hov === "leader" ? "translateX(30px) translateY(-8px) scale(1.12)" : hov === "company" ? "translateX(-6px) scale(.95)" : hov === "bsp" ? "translateX(-18px) translateY(4px) scale(1.08)" : "translateX(0)") : "translateX(100px)", transition: "all .4s var(--ease-signature)" }} />
          <div style={{ position: "absolute", right: 6, bottom: 6, width: 78, height: 62, background: "var(--red)", opacity: .9, borderRadius: 3, transform: vis ? (hov === "leader" ? "translateX(30px) translateY(8px) scale(1.12)" : hov === "company" ? "translateX(-6px) scale(.95)" : hov === "bsp" ? "translateX(-18px) translateY(-4px) scale(1.08)" : "translateX(0)") : "translateX(100px)", transition: "all .4s var(--ease-signature) .05s" }} />
        </div>
        <div style={{ marginTop: 28, fontSize: "clamp(1.35rem,2.5vw,2rem)", fontWeight: 700, color: "#fff", padding: "0 8px", textWrap: "balance", opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(12px)", transition: "all .5s ease .5s", lineHeight: 1.4 }}>
          <span onMouseEnter={() => setHov("company")} onMouseLeave={() => setHov(null)} onClick={tap("company")} style={{ cursor: "default", color: hov === "company" ? "#fff" : "var(--text-secondary)", borderBottom: hov === "company" ? "2px solid rgba(255,255,255,.3)" : "2px solid transparent", transition: "all .2s" }}>The right company</span>
          {" "}<span style={{ color: "var(--red)" }}>+</span>{" "}
          <span onMouseEnter={() => setHov("leader")} onMouseLeave={() => setHov(null)} onClick={tap("leader")} style={{ cursor: "default", color: hov === "leader" ? "var(--red)" : "inherit", borderBottom: hov === "leader" ? "2px solid rgba(226,60,65,.3)" : "2px solid transparent", transition: "all .2s" }}>the right leader</span>
          {" "}<span style={{ color: "var(--red)" }}>=</span>{" "}
          <span onMouseEnter={() => setHov("bsp")} onMouseLeave={() => setHov(null)} onClick={tap("bsp")} style={{ cursor: "default", borderBottom: hov === "bsp" ? "2px solid rgba(226,60,65,.4)" : "2px solid transparent", transition: "all .2s" }}>Bound Search Partners.</span>
        </div>
        <div style={{ marginTop: 28, display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "8px 24px", opacity: vis ? 1 : 0, transition: "all .6s ease .7s" }}>
          {["Rigor", "Transparency", "Precision", "Trust", "Candor", "Urgency"].map((v, i) => <span key={i} style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: i % 2 === 0 ? "var(--text-secondary)" : "var(--red)", opacity: .6 }}>{v}</span>)}
        </div>
      </Wrap>
    </section>
  );
}

/* ---------- Leadership ---------- */
function Leadership() {
  const w = useWidth(); const mobile = w <= 880;
  return (
    <section id="leadership" data-screen-label="Leadership" style={{ padding: "var(--section-y) 0", background: "var(--night)" }}>
      <Wrap>
        <Eyebrow style={{ marginBottom: "clamp(2rem,4vw,3rem)" }}>Leadership</Eyebrow>
        <div className="bsp-founder-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(3rem,6vw,6rem)", alignItems: "center" }}>
          <div style={{ order: mobile ? 2 : 1 }}>
            <Heading style={{ marginBottom: 18 }}>Bob Cwenar<span style={{ color: "var(--red)" }}>.</span></Heading>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
              <span style={{ width: 34, height: 3, background: "var(--red)", flexShrink: 0 }} />
              <span style={{ fontSize: "clamp(.68rem,.95vw,.8rem)", fontWeight: 700, letterSpacing: ".24em", textTransform: "uppercase", color: "var(--red)", whiteSpace: "nowrap" }}>Founder &amp; Managing Partner</span>
              <span style={{ flex: 1, height: 1, background: "rgba(226,60,65,.18)" }} />
            </div>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.75, color: "var(--text-secondary)", marginBottom: 20 }}>Bob Cwenar has spent more than a decade in retained executive search, focused exclusively on manufacturing, industrial, and supply chain leadership. He built and led GattiHR's first Industrial Practice and directed national and global engagements there and at Kingsley Gate Partners — serving organizations from founder-led companies to enterprises exceeding $10 billion in revenue.</p>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.75, color: "var(--text-secondary)", marginBottom: 20 }}>He founded Bound Search Partners on something he saw hold true across hundreds of engagements: searches go well when the senior consultant who takes the brief is the same person who runs the process and stands behind the result. Clients work with Bob directly, from the first conversation through the first year.</p>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.75, color: "var(--text-secondary)" }}>The record: more than <strong style={{ color: "#fff" }}>200 executive placements</strong>, with <strong style={{ color: "#fff" }}>92 percent retained beyond the first year</strong>.</p>
            <div style={{ display: "flex", gap: 24, marginTop: 28, flexWrap: "wrap" }}>
              <a href="https://www.linkedin.com/in/bob-cwenar-75617860/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="bsp-foot-link" style={{ color: "var(--text-secondary)", display: "inline-flex", alignItems: "center", transition: "color var(--dur)" }}><LinkedInMark size={20} /></a>
              <a href="mailto:bob@boundsearch.com" className="bsp-foot-link" style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--text-secondary)", textDecoration: "none", borderBottom: "1px solid var(--white-12)", paddingBottom: 6 }}>bob@boundsearch.com</a>
            </div>
          </div>
          <div style={{ order: mobile ? 1 : 2, maxWidth: mobile ? "100%" : 460, marginLeft: mobile ? 0 : "auto", width: "100%" }}>
            <img src="/headshot-wide.jpg" alt="Bob Cwenar" style={{ width: "100%", display: "block", borderRadius: 2 }} />
          </div>
        </div>
      </Wrap>
    </section>
  );
}

/* ---------- Bench check ---------- */
const BENCH = [
  { q: "If your plant manager or VP Operations resigned Monday, is there a named successor ready within 90 days?", gap: "Succession gap" },
  { q: "Has leadership compensation been benchmarked against the regional and national market in the last 18 months?", gap: "Compensation blind spot" },
  { q: "Do your top three operating leaders have written development plans tied to the next capex or growth cycle?", gap: "Development gap" },
  { q: "Could you name the five people in your sector you would most want to hire — and have you spoken with any of them?", gap: "No market map" },
  { q: "Did your last senior hire come from a mapped, retained process rather than a network referral or job posting?", gap: "Process risk" },
];
function BenchCheck({ go }) {
  const w = useWidth(); const mobile = w <= 880;
  const [started, setStarted] = React.useState(false);
  const [ans, setAns] = React.useState({});
  const done = Object.keys(ans).length === BENCH.length;
  const gaps = BENCH.filter((b, i) => ans[i] === false);
  const verdict = gaps.length === 0 ? "Your bench looks to be in good order, which is less common than you might expect. It may still be worth a conversation about keeping it that way as the business grows." : gaps.length <= 2 ? "One or two gaps are very manageable, particularly when they are addressed on your timeline rather than after an unexpected resignation. We would be glad to talk through them." : "With three or more gaps, the next senior departure would likely set the agenda for you. A leadership audit is usually the most useful first step, and we would be happy to walk you through what that involves.";
  return (
    <section id="bench" data-screen-label="Bench check" style={{ padding: started ? "var(--section-y) 0" : "clamp(1.5rem,3vw,2.5rem) 0", background: "var(--night)", position: "relative", overflow: "hidden", transition: "padding .6s var(--ease-signature)" }}>
      {started && <div aria-hidden="true" style={{ position: "absolute", width: "min(640px,90vw)", height: "min(640px,90vw)", borderRadius: "50%", background: "var(--glow-red)", filter: "blur(60px)", opacity: .1, pointerEvents: "none", top: "-20%", left: "-10%" }} />}
      <Wrap>
        {!started && (
          <div onClick={() => setStarted(true)} className="bsp-advrow v2-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, padding: "22px 24px", border: "1px solid var(--red-012)", cursor: "pointer", flexWrap: "wrap", transition: "border-color var(--dur)" }}>
            <div className="v2-row" style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
              <span style={{ ...KICK }}>Leadership bench check</span>
              <span style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>Before you reach out — a short, private look at the strength of your bench.</span>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--red)", whiteSpace: "nowrap" }}>Take a look →</span>
          </div>
        )}
        <div className="bsp-about-grid" style={{ display: started ? "grid" : "none", gridTemplateColumns: ".9fr 1.1fr", gap: "clamp(2.5rem,6vw,7rem)", alignItems: "start", position: "relative", animation: "bsp-fade-up .6s var(--ease-signature)" }}>
          <div style={{ position: mobile ? "static" : "sticky", top: 110 }}>
            <Eyebrow style={{ marginBottom: 16 }}>Leadership bench check</Eyebrow>
            <Heading style={{ marginBottom: 20 }}>How <em style={{ color: "var(--red)", fontStyle: "italic" }}>ready</em> is your leadership bench?</Heading>
            <p style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)", color: "var(--text-secondary)", marginBottom: 28 }}>These are the five questions we ask at the start of every organizational advisory engagement. Your answers stay in your browser — nothing is stored or sent anywhere.</p>
            <div style={{ overflow: "hidden", maxHeight: done ? 400 : 0, opacity: done ? 1 : 0, transition: "all .6s var(--ease-signature)" }}>
              <Card variant="accent" padding={24}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 12 }}><span style={{ fontSize: 44, fontWeight: 700, letterSpacing: "-.03em", lineHeight: 1, color: gaps.length ? "var(--red)" : "#fff" }}>{gaps.length}</span><span style={{ ...LABEL }}>{gaps.length === 1 ? "gap identified" : "gaps identified"}</span></div>
                <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "var(--text-body)", margin: "0 0 16px" }}>{verdict}</p>
                {gaps.length > 0 && <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>{gaps.map((g) => <Chip key={g.gap}>{g.gap}</Chip>)}</div>}
                <Button arrow size="sm" onClick={() => go("contact")}>Talk it through with us</Button>
              </Card>
            </div>
          </div>
          <div>
            {BENCH.map((b, i) => {
              const a = ans[i];
              return (
                <div key={i} style={{ borderTop: "1px solid var(--white-06)", padding: "22px 0", display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr auto", gap: mobile ? 14 : 24, alignItems: "start" }}>
                  <p style={{ fontSize: 15.5, lineHeight: 1.6, color: a === undefined ? "var(--text-secondary)" : "#fff", margin: 0, transition: "color .3s" }}>{b.q}</p>
                  <div style={{ display: "flex", gap: 2 }}>
                    {[["Yes", true], ["No", false]].map(([l, v]) => (
                      <button key={l} onClick={() => setAns({ ...ans, [i]: v })} style={{ fontFamily: "inherit", fontSize: 11, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", padding: "10px 18px", cursor: "pointer", border: `1px solid ${a === v ? (v ? "rgba(34,197,94,.5)" : "var(--red)") : "var(--white-12)"}`, background: a === v ? (v ? "rgba(34,197,94,.1)" : "rgba(226,60,65,.12)") : "transparent", color: a === v ? "#fff" : "var(--text-muted)", transition: "all var(--dur)", minWidth: 64 }}>{l}</button>
                    ))}
                  </div>
                </div>
              );
            })}
            <div style={{ borderTop: "1px solid var(--white-06)", paddingTop: 16, display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text-faint)" }}><span>{Object.keys(ans).length} of {BENCH.length} answered</span>{<span onClick={() => { setAns({}); setStarted(false); }} style={{ cursor: "pointer", color: "var(--text-muted)" }}>Reset &amp; close</span>}</div>
          </div>
        </div>
      </Wrap>
    </section>
  );
}

/* ---------- Contact ---------- */
const ICON = {
  phone: <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />,
  mail: <g><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" /></g>,
  pin: <g><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></g>,
};
const LINES = [
  { k: "phone", label: "Phone", val: "(267) 265-1792", href: "tel:+12672651792" },
  { k: "mail", label: "Email", val: "bob@boundsearch.com", href: "mailto:bob@boundsearch.com" },
  { k: "pin", label: "Coverage", val: "Serving clients nationwide", href: null },
];
function Contact() {
  const w = useWidth(); const mobile = w <= 640;
  const [sent, setSent] = React.useState(false); const [sending, setSending] = React.useState(false);
  const two = { display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 20, marginBottom: 20 };
  return (
    <section id="contact" data-screen-label="Contact" style={{ padding: "var(--section-y) 0", background: "var(--night)" }}>
      <Wrap>
        <div className="bsp-contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "clamp(3rem,5vw,5rem)", alignItems: "start" }}>
          <div>
            <Eyebrow style={{ marginBottom: 24 }}>Contact</Eyebrow>
            <Heading style={{ marginBottom: 24 }}>Start a <em style={{ color: "var(--red)", fontStyle: "italic" }}>conversation</em>.</Heading>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.75, color: "var(--text-secondary)", marginBottom: 32 }}>Every engagement begins with an open conversation about the role, the organization, and whether we are the right partner for it. Bob reads and responds to every inquiry personally, within one business day.</p>
            {LINES.map((l) => (
              <div key={l.k} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 0", borderTop: "1px solid var(--white-05)" }}>
                <div style={{ width: 42, height: 42, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--red-006)", color: "var(--red)", flexShrink: 0 }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{ICON[l.k]}</svg></div>
                <div><strong style={{ display: "block", ...LABEL, marginBottom: 3 }}>{l.label}</strong>{l.href ? <a href={l.href} style={{ color: "#fff", textDecoration: "none" }}>{l.val}</a> : <span style={{ color: "#fff" }}>{l.val}</span>}</div>
              </div>
            ))}
          </div>
          <div>
            {sent ? (
              <div style={{ textAlign: "center", padding: "80px 24px" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(226,60,65,.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg></div>
                <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Inquiry received</h3>
                <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7 }}>Thank you for reaching out. Bob will be in touch personally within one business day.</p>
              </div>
            ) : (
              <form name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={async (e) => { e.preventDefault(); if (sending) return; setSending(true); try { const fd = new FormData(e.target); fd.append("form-name", "contact"); await fetch("/", { method: "POST", body: fd }); setSent(true); } catch { alert("Something went wrong. Please email bob@boundsearch.com directly."); } setSending(false); }}>
                <input type="hidden" name="form-name" value="contact" />
                <p style={{ display: "none" }}><label>Leave this empty: <input name="bot-field" /></label></p>
                <div style={two}><Input label="First Name" name="first-name" required /><Input label="Last Name" name="last-name" required /></div>
                <div style={two}><Select label="I Am A" name="visitor-type" required options={["Client / Prospective Client", "Candidate", "Other"]} /><Select label="Inquiry Type" name="inquiry-type" required options={["Executive Search", "Operations & Plant Leadership", "Organizational Advisory", "Strategic Advisory & Intelligence", "General Inquiry"]} /></div>
                <div style={two}><Input label="Email" name="email" type="email" required /><Input label="Phone" name="phone" type="tel" /></div>
                <div style={{ marginBottom: 20 }}><Input label="Company" name="company" /></div>
                <div style={{ marginBottom: 20 }}><Input label="Additional Context" name="message" as="textarea" rows={4} /></div>
                <Button type="submit" arrow disabled={sending} style={{ width: "100%", justifyContent: "center" }}>{sending ? "Sending…" : "Submit Inquiry"}</Button>
                <p style={{ fontSize: 11, color: "var(--text-faint)", marginTop: 14, lineHeight: 1.6 }}>Everything you share with us is held in confidence.</p>
              </form>
            )}
          </div>
        </div>
      </Wrap>
    </section>
  );
}

/* ---------- Closer + Footer ---------- */
function Closer({ go }) {
  return (
    <section id="closer" data-screen-label="Closer" style={{ padding: "var(--section-y) 0", background: "var(--night)", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "url(/closer-bg.jpg)", backgroundSize: "cover", backgroundPosition: "center 38%", filter: "saturate(.78) brightness(.9)" }} />
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, var(--night) 0%, transparent 24%, transparent 76%, var(--night) 100%)" }} />
      <Wrap max={800} style={{ position: "relative" }}>
        <h2 style={{ fontSize: "var(--fs-display)", fontWeight: 700, lineHeight: .94, letterSpacing: "var(--ls-display)", marginBottom: 24 }}>The right hire<br />changes <span style={{ color: "var(--red)", fontStyle: "italic" }}>everything</span>.</h2>
        <p style={{ fontSize: "var(--fs-lead)", color: "#fff", textShadow: "0 1px 14px rgba(8,6,20,.7)", lineHeight: 1.5, maxWidth: 550, margin: "0 auto 40px" }}>Ready when you are.</p>
        <Button arrow onClick={() => go("contact")}>Start a Conversation</Button>
      </Wrap>
    </section>
  );
}
function Skyline() {
  const win = (x, y, dur, delay, red) => <rect key={x + "-" + y} x={x} y={y} width="3" height="3" fill={red ? "#e23c41" : "#fff"} style={{ animation: `v2-twinkle ${dur}s ease-in-out ${delay}s infinite`, transformOrigin: "center" }} />;
  return (
    <svg viewBox="0 0 400 160" fill="none" style={{ width: 220, height: 88, flexShrink: 0, overflow: "visible" }} aria-hidden="true">
      <rect x="20" y="80" width="18" height="80" fill="#2a2456" opacity=".5" /><rect x="45" y="90" width="14" height="70" fill="#1f1a42" opacity=".42" /><rect x="65" y="75" width="20" height="85" fill="#2a2456" opacity=".5" />
      <rect x="95" y="45" width="22" height="115" fill="#2a2456" opacity=".6" /><polygon points="95,45 106,20 117,45" fill="#2a2456" opacity=".6" /><rect x="122" y="55" width="18" height="105" fill="#1f1a42" opacity=".5" /><polygon points="122,55 131,32 140,55" fill="#1f1a42" opacity=".5" />
      <rect x="150" y="15" width="30" height="145" fill="#2a2456" opacity=".7" /><rect x="163" y="0" width="4" height="15" fill="#2a2456" opacity=".7" /><rect x="188" y="25" width="25" height="135" fill="#1f1a42" opacity=".6" /><rect x="225" y="60" width="40" height="100" fill="#2a2456" opacity=".6" /><rect x="237" y="42" width="16" height="18" fill="#2a2456" opacity=".6" />
      <rect x="275" y="40" width="24" height="120" fill="#2a2456" opacity=".5" /><rect x="308" y="55" width="22" height="105" fill="#1f1a42" opacity=".42" /><rect x="338" y="65" width="28" height="95" fill="#2a2456" opacity=".5" /><rect x="372" y="80" width="18" height="80" fill="#1f1a42" opacity=".42" /><rect x="0" y="158" width="400" height="2" fill="#1f1a42" opacity=".6" />
      <circle cx="165" cy="2" r="3" fill="#e23c41" style={{ animation: "v2-beacon 2s ease-in-out infinite" }} />
      <circle cx="165" cy="2" r="3" fill="none" stroke="#e23c41" strokeWidth="1" style={{ animation: "v2-ping 2s ease-out infinite", transformOrigin: "165px 2px", transformBox: "view-box" }} />
      {win(156, 50, 3, 0)}{win(171, 70, 4, 1.2)}{win(158, 95, 3.5, 2.1)}{win(195, 60, 4.2, .6)}{win(203, 110, 3.2, 1.8)}
      {win(232, 80, 4, 1.5)}{win(250, 120, 3.6, .3)}{win(283, 70, 3.8, 2.4)}{win(290, 100, 4.5, 1, true)}{win(102, 90, 4.1, .9)}{win(128, 120, 3.3, 2.7)}{win(345, 95, 3.9, 1.4)}{win(316, 130, 4.4, .2)}
    </svg>
  );
}
function Footer({ go }) {
  const col = { display: "flex", flexDirection: "column", gap: 12 };
  const lnk = { fontSize: 13, color: "var(--text-muted)", cursor: "pointer", transition: "color var(--dur)", textDecoration: "none" };
  const h = { ...LABEL, color: "#fff", marginBottom: 6 };
  return (
    <footer data-screen-label="Footer" style={{ background: "var(--night)", padding: "clamp(3.5rem,6vw,5rem) 0 24px", borderTop: "1px solid var(--red-008)" }}>
      <Wrap>
        <div className="v2-foot" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr 1.3fr", gap: "clamp(2rem,4vw,4rem)", marginBottom: 48 }}>
          <div>
            <BrandMark size={36} lockup />
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text-muted)", margin: "20px 0 0", maxWidth: 300 }}>Retained executive search for manufacturing, industrial, and supply chain leadership, serving clients across the United States.</p>
          </div>
          <div style={col}><div style={h}>Firm</div>{[["about", "About"], ["process", "Our Process"], ["industries", "Industries"], ["leadership", "Leadership"], ["results", "Results"]].map(([id, l]) => <span key={id} className="bsp-foot-link" style={lnk} onClick={() => go(id)}>{l}</span>)}</div>
          <div style={col}><div style={h}>Services</div>{SRVS.map((s) => <span key={s.t} className="bsp-foot-link" style={lnk} onClick={() => go("services")}>{s.t}</span>)}</div>
          <div style={col}><div style={h}>Insights</div>{ADVISORIES.slice(0, 3).map((a) => <a key={a.no} href={a.href} target="_blank" rel="noopener noreferrer" className="bsp-foot-link" style={lnk}>Advisory <Numero n={a.no} size={1.2} /> — {a.title}</a>)}<span className="bsp-foot-link" style={{ ...lnk, color: "var(--red)" }} onClick={() => go("insights")}>All advisories →</span></div>
          <div style={col}><div style={h}>Contact</div>
            <a href="tel:+12672651792" className="bsp-foot-link" style={lnk}>(267) 265-1792</a>
            <a href="mailto:bob@boundsearch.com" className="bsp-foot-link" style={lnk}>bob@boundsearch.com</a>
            <a href="https://www.linkedin.com/company/bound-search-partners-llc/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="bsp-foot-link" style={{ ...lnk, display: "inline-flex", alignItems: "center", color: "var(--text-secondary)" }}><LinkedInMark size={18} /></a>
            <a href="/portal.html" className="bsp-foot-link" style={{ ...lnk, marginTop: 6, fontSize: 11, fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--text-secondary)" }}>Client Portal →</a>
          </div>
        </div>
        <div style={{ height: 1, background: "rgba(226,60,65,.1)", margin: "0 0 24px" }} />
        <div style={{ maxWidth: 780, marginBottom: 24 }}>
          <p style={{ fontSize: 11, lineHeight: 1.75, color: "var(--text-faint)", margin: "0 0 6px" }}>Bound Search Partners LLC is a retained executive search firm. Client and candidate information is held in confidence; the outcomes published here are real and verified, with identities protected.</p>
          <p style={{ fontSize: 11, lineHeight: 1.75, color: "var(--text-faint)", margin: 0 }}>We present candidates without regard to race, color, religion, sex, national origin, age, disability, or veteran status. Advisories and market commentary are provided for general information only and do not constitute legal, financial, or investment advice.</p>
        </div>
        <div className="v2-row" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
          <div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }}>© 2026 Bound Search Partners LLC. All rights reserved.</div>
            <div style={{ display: "flex", gap: 18, marginBottom: 6, flexWrap: "wrap" }}>{["Privacy Policy", "Terms of Use", "Accessibility"].map((l) => <a key={l} href="#" onClick={(e) => e.preventDefault()} className="bsp-foot-link" style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--text-muted)", textDecoration: "none" }}>{l}</a>)}</div>
          </div>
          <Skyline />
        </div>
      </Wrap>
    </footer>
  );
}

/* ---------- Chat (live) ---------- */
const SYSTEM = `You are the Bound Search Partners assistant on boundsearch.com. Bound Search Partners (BSP) is a retained executive search firm founded in 2024 by Bob Cwenar, serving U.S. manufacturers nationwide. Do not state or speculate about the firm's office location or address. Facts: 200+ executive placements; 92% retained beyond year one; proprietary shortlist within 30 days; typical search ~120 days; guarantee-backed engagements with 90-day onboarding support; a live client portal. Services: Executive Search (CEO, COO, CFO, VP Operations, VP Supply Chain); Operations & Plant Leadership (Plant Manager, Director Engineering, Quality Director); Organizational Advisory (leadership audit, succession, org design, comp benchmarking); Strategic Advisory & Intelligence (business model audit, roadmaps, market entry, portfolio diagnostics). Industries: manufacturing, supply chain & logistics, building products, food & beverage, chemicals & packaging, private equity, industrial equipment, real estate, engineering services. Bob built and led GattiHR's first Industrial Practice and directed engagements at Kingsley Gate Partners. Contact: bob@boundsearch.com, (267) 265-1792. Publications: the Advisory No. series (latest No. 05, "Governing Without a Rulebook").
Voice: warm, assured, and knowledgeable — the tone of an experienced senior consultant who is glad to help, never curt or salesy. Use complete, natural sentences rather than clipped fragments. No exclamation marks, no hype, no emoji. Speak as "we". Answer in 2–4 sentences unless asked for detail. If asked about fees or a specific search, say those begin with a conversation with Bob and offer the contact details. Never invent client names or placements. If a question is outside BSP's scope, say so briefly and redirect.`;
function Chat() {
  const w = useWidth(); const mobile = w <= 640;
  const [open, setOpen] = React.useState(false);
  const [msgs, setMsgs] = React.useState([{ role: "assistant", content: "Welcome. I'm happy to answer questions about how a retained search works, the roles we place, or where to begin." }]);
  const [input, setInput] = React.useState(""); const [busy, setBusy] = React.useState(false);
  const scroll = React.useRef(null);
  React.useEffect(() => { if (scroll.current) scroll.current.scrollTop = scroll.current.scrollHeight; }, [msgs, open]);
  const send = async (text) => {
    const q = (text ?? input).trim(); if (!q || busy) return;
    const next = [...msgs, { role: "user", content: q }]; setMsgs(next); setInput(""); setBusy(true);
    try {
      const res = await fetch("/.netlify/functions/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: next.map((m) => ({ role: m.role, content: m.content })) }) });
      const data = await res.json();
      const reply = Array.isArray(data && data.content) ? data.content.map((c) => c.text || "").join("") : "";
      if (!reply) throw new Error((data && data.error && (data.error.message || data.error)) || "empty");
      setMsgs((m) => [...m, { role: "assistant", content: String(reply).trim() }]);
    } catch (e) {
      console.error("Ask BSP:", e);
      setMsgs((m) => [...m, { role: "assistant", content: "The assistant is unavailable right now. Reach Bob directly at bob@boundsearch.com or (267) 265-1792." }]);
    } finally { setBusy(false); }
  };
  const prompts = ["How long does a search take?", "What roles do you place?", "How do you work with clients?"];
  return (
    <React.Fragment>
      <div onClick={() => setOpen(!open)} className="bsp-orb" style={{ position: "fixed", bottom: mobile ? 18 : 24, right: mobile ? 18 : 24, height: 54, minWidth: 54, borderRadius: 27, background: "rgba(18,14,42,.72)", border: "1px solid var(--red-035)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", boxShadow: "var(--shadow-launcher)", display: "flex", alignItems: "center", gap: 12, padding: mobile ? "0 19px" : "0 19px", cursor: "pointer", zIndex: 10001, overflow: "hidden" }}>
        {open ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg> : <span className="bsp-orb-core" />}
        {!open && !mobile && <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-secondary)", whiteSpace: "nowrap" }}>Ask BSP</span>}
      </div>
      <div style={{ position: "fixed", bottom: mobile ? 84 : 92, right: mobile ? 12 : 24, left: mobile ? 12 : "auto", width: mobile ? "auto" : "min(390px, calc(100vw - 32px))", height: mobile ? "min(520px, 70vh)" : "min(560px, 72vh)", borderRadius: "var(--radius-2xl)", overflow: "hidden", background: "var(--glass-panel)", backdropFilter: "var(--blur-glass)", WebkitBackdropFilter: "var(--blur-glass)", border: "1px solid var(--white-12)", boxShadow: "var(--shadow-panel)", zIndex: 10000, display: "flex", flexDirection: "column", transform: open ? "translateY(0) scale(1)" : "translateY(20px) scale(.96)", opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none", transition: "all var(--dur-slow) var(--ease-signature)" }}>
        <div style={{ padding: "14px 16px 12px", borderBottom: "1px solid var(--white-06)", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,.06)", border: "1px solid var(--white-12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><svg width="15" height="16" viewBox="0 0 130 140" fill="none"><rect x="4" y="4" width="30" height="132" rx="2" fill="#fff" opacity=".92" /><rect x="56" y="4" width="70" height="60" rx="2" fill="#e23c41" /><rect x="56" y="76" width="70" height="60" rx="2" fill="#e23c41" opacity=".9" /></svg></div>
          <div><div style={{ fontSize: 12.5, fontWeight: 600 }}>Bound Search Partners</div><div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 2, display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--success)" }} />Assistant · here to help</div></div>
        </div>
        <div ref={scroll} style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
          {msgs.map((m, i) => <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}><div style={{ maxWidth: "84%", padding: "10px 15px", borderRadius: m.role === "user" ? "18px 18px 5px 18px" : "18px 18px 18px 5px", background: m.role === "user" ? "linear-gradient(180deg,var(--red-bright),var(--red-deep))" : "var(--ink-chat)", fontSize: 13.5, lineHeight: 1.5, color: m.role === "user" ? "#fff" : "var(--text-soft)", whiteSpace: "pre-wrap" }}>{m.content}</div></div>)}
          {busy && <div style={{ display: "flex", gap: 5, padding: "8px 15px" }}>{[0, 1, 2].map((i) => <span key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--text-muted)", animation: `orbBreathe 1.2s ease-in-out ${i * .15}s infinite` }} />)}</div>}
          {msgs.length === 1 && <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 6 }}>{prompts.map((p) => <button key={p} onClick={() => send(p)} style={{ textAlign: "left", fontFamily: "inherit", fontSize: 12.5, color: "var(--text-secondary)", background: "transparent", border: "1px solid var(--white-12)", padding: "9px 12px", borderRadius: 12, cursor: "pointer" }}>{p}</button>)}</div>}
        </div>
        <div style={{ padding: "10px 14px 14px", borderTop: "1px solid var(--white-06)" }}>
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") send(); }} placeholder="Ask a question" style={{ flex: 1, padding: "10px 46px 10px 17px", background: "rgba(255,255,255,.05)", border: "1px solid var(--white-12)", borderRadius: 21, color: "#fff", fontFamily: "inherit", fontSize: 14, outline: "none" }} />
            <button onClick={() => send()} aria-label="Send" style={{ position: "absolute", right: 5, width: 30, height: 30, borderRadius: "50%", background: input.trim() ? "linear-gradient(180deg,var(--red-bright),var(--red-deep))" : "rgba(255,255,255,.1)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={input.trim() ? "#fff" : "#5d5a72"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg></button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

/* ---------- Composition ---------- */
export default function App() {
  const variant = "d";
  const go = (id) => { const el = document.getElementById(id); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: "smooth" }); };
  return (
    <div>
      <GlobalStyle />
      <div aria-hidden="true" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 5000, opacity: .026, backgroundImage: "var(--grain)" }} />
      <Nav go={go} />
      <Hero go={go} variant={variant} />
      <ProofBand variant={variant} />
      <About />
      <Divider />
      <Services />
      <Divider />
      <Timeline variant={variant} />
      <Divider />
      <Cases variant={variant} />
      <Divider />
      <Industries />
      <Divider />
      <Bond />
      <Divider />
      <Leadership />
      <Divider />
      <Insights variant={variant} />
      <Divider />
      <BenchCheck go={go} />
      <Divider />
      <Contact />
      <Closer go={go} />
      <Footer go={go} />
      <Chat />
    </div>
  );
}

