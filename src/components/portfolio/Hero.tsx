import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Download,
  Code2,
  Cpu,
  Database,
  Github,
  Terminal,
  Wifi,
  Shield,
} from "lucide-react";
import heroChar from "@/assets/hero-character.png";

/* ── Roles ───────────────────────────────────────────────────────────── */
const roles = [
  "AI & ML Engineer",
  "Full Stack Developer",
  "Web Developer",
  "Android App Developer",
  "Backend Systems Builder",
];

/* ── Terminal-style typewriter ────────────────────────────────────────── */
function Typewriter() {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const current = roles[i % roles.length];
    const speed = del ? 38 : 78;
    const timer = setTimeout(() => {
      if (!del) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setTimeout(() => setDel(true), 1400);
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") { setDel(false); setI((v) => v + 1); }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [text, del, i]);

  return (
    <span className="font-mono">
      <span className="text-primary/50 select-none">~/dev $ </span>
      <span className="text-primary font-medium">{text}</span>
      <span className="inline-block w-[9px] h-[1.1em] bg-primary ml-0.5 animate-pulse align-middle opacity-90" />
    </span>
  );
}

/* ── 3-D tilt hook (mouse-tracked perspective) ────────────────────────── */
function use3DTilt() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 140, damping: 22 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 140, damping: 22 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onMouseLeave = () => { mx.set(0); my.set(0); };

  return { rotateX, rotateY, onMouseMove, onMouseLeave };
}

/* ── HUD corner bracket ───────────────────────────────────────────────── */
function HudCorner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const cls = {
    tl: "top-2 left-2",
    tr: "top-2 right-2 rotate-90",
    bl: "bottom-2 left-2 -rotate-90",
    br: "bottom-2 right-2 rotate-180",
  }[pos];
  return (
    <div className={`absolute ${cls} w-5 h-5 opacity-60`}>
      <svg viewBox="0 0 20 20" fill="none">
        <path d="M0 10 L0 0 L10 0" stroke="rgba(56,189,248,0.9)" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

/* ── Floating tech chips ──────────────────────────────────────────────── */
const chips = [
  { Icon: Code2,    x: "6%",  y: "10%", delay: 0,   label: "CODE"  },
  { Icon: Cpu,      x: "80%", y: "14%", delay: 0.8,  label: "CPU"   },
  { Icon: Database, x: "8%",  y: "72%", delay: 1.6,  label: "DATA"  },
  { Icon: Terminal, x: "83%", y: "68%", delay: 2.2,  label: "CLI"   },
  { Icon: Github,   x: "48%", y: "3%",  delay: 1.2,  label: "GIT"   },
  { Icon: Shield,   x: "1%",  y: "42%", delay: 1.9,  label: "SEC"   },
  { Icon: Wifi,     x: "88%", y: "42%", delay: 0.5,  label: "NET"   },
];

/* ── Clip-path helper ─────────────────────────────────────────────────── */
const bevel = (r = 8) =>
  `polygon(${r}px 0, 100% 0, 100% calc(100% - ${r}px), calc(100% - ${r}px) 100%, 0 100%, 0 ${r}px)`;

/* ═══════════════════════════════════════════════════════════════════════ */
export function Hero() {
  const tilt = use3DTilt();
  const [glitch, setGlitch] = useState(false);

  /* Random glitch pulse on the name */
  useEffect(() => {
    const id = setInterval(() => {
      if (Math.random() > 0.65) {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 160);
      }
    }, 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-32 pb-20 px-6">

      {/* ── HUD top / bottom hairlines ─────────────────────────────────── */}
      <div className="absolute inset-x-6 top-[88px] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute inset-x-6 bottom-6 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* ── Main 2-col grid ────────────────────────────────────────────── */}
      <div className="mx-auto grid max-w-7xl w-full items-center gap-12 lg:grid-cols-2">

        {/* ─────────────────────────── LEFT ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          className="relative z-10"
        >
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 text-[11px] font-mono
                       border border-primary/25 bg-primary/5 text-primary/70"
            style={{ clipPath: bevel(6) }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-semibold">[ONLINE]</span>
            <span className="text-primary/30 mx-1">|</span>
            Open to Opportunities · B.Tech · NITK Surathkal
          </motion.div>

          {/* ── Name + glitch effect ───────────────────────────────────── */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
            <span className="text-foreground">Hi, I'm </span>
            <span
              className="gradient-text relative inline-block"
              style={{
                textShadow: glitch
                  ? "3px 0 rgba(56,189,248,0.9), -3px 0 rgba(236,72,153,0.8), 0 0 20px rgba(56,189,248,0.4)"
                  : "none",
                transform: glitch ? `translateX(${Math.random() > 0.5 ? 2 : -2}px)` : "none",
                transition: "transform 0.04s, text-shadow 0.04s",
              }}
            >
              Alish Sahdev
              {/* Glitch duplicate layers */}
              {glitch && (
                <>
                  <span
                    className="absolute inset-0 gradient-text pointer-events-none select-none"
                    aria-hidden
                    style={{ transform: "translateX(3px)", opacity: 0.4, clipPath: "inset(30% 0 50% 0)" }}
                  >
                    Alish Sahdev
                  </span>
                  <span
                    className="absolute inset-0 gradient-text pointer-events-none select-none"
                    aria-hidden
                    style={{ transform: "translateX(-3px)", opacity: 0.4, clipPath: "inset(55% 0 15% 0)", filter: "hue-rotate(120deg)" }}
                  >
                    Alish Sahdev
                  </span>
                </>
              )}
            </span>
          </h1>

          {/* ── Terminal typewriter ─────────────────────────────────────── */}
          <div
            className="mt-6 text-lg sm:text-xl min-h-[2.8em] border-l-2 border-primary/60
                       pl-3 pr-4 py-2 bg-black/30 rounded-r-sm"
          >
            <Typewriter />
          </div>

          {/* Description */}
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            Passionate about building intelligent AI systems and modern digital experiences,
            I work across full-stack web development and Android apps to create scalable
            products that are both impactful and visually refined.
          </p>

          {/* ── CTA buttons ─────────────────────────────────────────────── */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              data-cursor-hover
              className="group relative inline-flex items-center gap-2 overflow-hidden
                         px-6 py-3 text-sm font-semibold font-mono text-[#020810]"
              style={{
                background: "linear-gradient(135deg, rgba(56,189,248,1) 0%, rgba(34,211,238,0.85) 100%)",
                clipPath: bevel(),
                boxShadow: "0 0 35px -6px rgba(56,189,248,0.75), inset 0 0 20px rgba(255,255,255,0.1)",
              }}
            >
              <span className="relative z-10">./view_projects</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
              <span className="absolute inset-0 animate-shimmer opacity-40" />
            </motion.a>

            <motion.a
              href="https://drive.google.com/file/d/1W6XO1RC0Y_9A7ynXyMVif5NHz-shtW4s/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              data-cursor-hover
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold font-mono
                         text-foreground border border-primary/30 bg-black/40 transition-colors
                         hover:border-primary/60 hover:bg-primary/5"
              style={{ clipPath: bevel() }}
            >
              <Download className="h-4 w-4" />
              resume.pdf
            </motion.a>
          </div>

          {/* ── HUD stats row ───────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex border border-primary/20 bg-black/25 font-mono overflow-hidden"
            style={{ clipPath: bevel(6) }}
          >
            {[
              { value: "10+", label: "PROJECTS" },
              { value: "2+",  label: "YRS_EXP"  },
              { value: "∞",   label: "CURIOSITY" },
            ].map((s, i) => (
              <div
                key={i}
                className="flex-1 flex flex-col items-center py-4 border-r border-primary/20
                           last:border-r-0 relative group hover:bg-primary/8 transition-colors cursor-default"
              >
                <span className="text-2xl font-bold text-primary" style={{ textShadow: "0 0 20px rgba(56,189,248,0.5)" }}>
                  {s.value}
                </span>
                <span className="text-[10px] tracking-[0.2em] text-primary/45 mt-0.5">{s.label}</span>
                <span className="absolute inset-x-0 bottom-0 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ─────────────────────────── RIGHT ────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.82 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="relative flex items-center justify-center h-[500px] lg:h-[600px]"
          style={{ perspective: "1100px" }}
          onMouseMove={tilt.onMouseMove}
          onMouseLeave={tilt.onMouseLeave}
        >
          {/* 3D tilt wrapper */}
          <motion.div
            style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: "preserve-3d" }}
            className="relative w-full h-full flex items-center justify-center"
          >

            {/* Radial glow behind character */}
            <motion.div
              animate={{ scale: [1, 1.12, 1], opacity: [0.45, 0.65, 0.45] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div
                className="h-[420px] w-[420px] rounded-full"
                style={{ background: "radial-gradient(circle, rgba(56,189,248,0.45), transparent 68%)", filter: "blur(24px)" }}
              />
            </motion.div>

            {/* Outer dashed ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ transform: "translateZ(-30px)" }}
            >
              <div
                className="h-[520px] w-[520px] rounded-full border border-dashed border-primary/25"
                style={{ boxShadow: "0 0 25px rgba(56,189,248,0.08)" }}
              />
            </motion.div>

            {/* Inner solid ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="h-[390px] w-[390px] rounded-full border border-accent/25" />
            </motion.div>

            {/* Orbiting bright dots */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ transform: "translateZ(10px)" }}
            >
              <div className="relative h-[520px] w-[520px]">
                {[0, 90, 180, 270].map((angle, k) => (
                  <div
                    key={k}
                    className="absolute rounded-full"
                    style={{
                      width: k % 2 === 0 ? "8px" : "5px",
                      height: k % 2 === 0 ? "8px" : "5px",
                      top: "50%",
                      left: "50%",
                      transform: `rotate(${angle}deg) translateX(260px) translateY(-50%)`,
                      background: k % 2 === 0 ? "rgba(56,189,248,1)" : "rgba(167,139,250,0.9)",
                      boxShadow: k % 2 === 0
                        ? "0 0 10px 3px rgba(56,189,248,0.8)"
                        : "0 0 8px 2px rgba(167,139,250,0.7)",
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Secondary counter-orbit */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="relative h-[390px] w-[390px]">
                {[45, 135, 225, 315].map((angle, k) => (
                  <div
                    key={k}
                    className="absolute rounded-full bg-accent/70"
                    style={{
                      width: "4px",
                      height: "4px",
                      top: "50%",
                      left: "50%",
                      transform: `rotate(${angle}deg) translateX(195px) translateY(-50%)`,
                      boxShadow: "0 0 6px rgba(34,211,238,0.6)",
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Floating tech chips */}
            {chips.map(({ Icon, x, y, delay, label }, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, y: [0, -14, 0] }}
                transition={{
                  opacity: { delay: 0.9 + delay * 0.18, duration: 0.4 },
                  scale:   { delay: 0.9 + delay * 0.18, type: "spring", stiffness: 200 },
                  y: { duration: 3.5 + idx * 0.3, repeat: Infinity, ease: "easeInOut", delay },
                }}
                className="absolute"
                style={{ left: x, top: y }}
              >
                <div
                  className="relative flex h-11 w-11 items-center justify-center
                             border border-primary/35 bg-black/55 backdrop-blur-sm group cursor-default"
                  style={{
                    clipPath: bevel(5),
                    boxShadow: "0 0 18px rgba(56,189,248,0.18), inset 0 0 12px rgba(56,189,248,0.06)",
                  }}
                >
                  <Icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                  {/* Scan line on chip */}
                  <motion.div
                    className="absolute inset-x-0 h-px bg-primary/40"
                    animate={{ top: ["0%", "100%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: idx * 0.4 }}
                  />
                </div>
                <div className="mt-1 text-center text-[9px] font-mono text-primary/50 tracking-widest">
                  {label}
                </div>
              </motion.div>
            ))}

            {/* HUD corners on the right panel area */}
            <div className="absolute inset-6 pointer-events-none">
              <HudCorner pos="tl" />
              <HudCorner pos="tr" />
              <HudCorner pos="bl" />
              <HudCorner pos="br" />
            </div>

            {/* Character image */}
            <motion.img
              src={heroChar}
              alt="Alish Sahdev coding"
              width={520}
              height={520}
              className="relative z-10 max-h-[520px] w-auto select-none"
              style={{
                filter: "drop-shadow(0 0 35px rgba(56,189,248,0.45)) drop-shadow(0 24px 48px rgba(0,0,0,0.6))",
                transform: "translateZ(45px)",
              }}
            />

            {/* Character scan line */}
            <motion.div
              className="absolute inset-x-[15%] z-20 h-[2px] pointer-events-none rounded-full"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.5), transparent)",
                boxShadow: "0 0 8px rgba(56,189,248,0.3)",
              }}
              animate={{ top: ["12%", "88%", "12%"] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Data readout chip – bottom of character */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20
                         flex items-center gap-2 px-3 py-1.5 font-mono text-[10px]
                         border border-primary/30 bg-black/60 backdrop-blur-sm text-primary/70 whitespace-nowrap"
              style={{ clipPath: bevel(5) }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              SYSTEM ONLINE
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}