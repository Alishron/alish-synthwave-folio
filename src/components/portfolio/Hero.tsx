import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowRight, Download, Code2, Cpu, Database, Eye, Github } from "lucide-react";
import heroChar from "@/assets/hero-character.png";

const roles = [
  "AI & ML Engineer",
  "Full Stack Developer",
  "Web Developer",
  "Android App Developer",
  "Backend Systems Builder",
];

function Typewriter() {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const current = roles[i % roles.length];
    const speed = del ? 40 : 80;
    const timer = setTimeout(() => {
      if (!del) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setTimeout(() => setDel(true), 1400);
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDel(false);
          setI((v) => v + 1);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [text, del, i]);

  return <span className="typing-cursor text-primary font-medium">{text}</span>;
}

const floatingIcons = [
  { Icon: Code2, x: "8%", y: "12%", delay: 0 },
  { Icon: Cpu, x: "82%", y: "18%", delay: 0.8 },
  { Icon: Database, x: "10%", y: "75%", delay: 1.6 },
  { Icon: Eye, x: "85%", y: "70%", delay: 2.2 },
  { Icon: Github, x: "50%", y: "5%", delay: 1.2 },
];

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-32 pb-20 px-6">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-muted-foreground mb-6"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Open to Software Engineering Opportunities • B.Tech Graduate • NITK Surathkal
          </motion.div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
            Hi, I'm{" "}
            <span className="gradient-text">Alish Sahdev</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-muted-foreground min-h-[2em]">
            <Typewriter />
          </p>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
  Passionate about building intelligent AI systems and modern digital experiences,
  I work across full-stack web development and Android apps to
  create scalable products that are both impactful and visually refined.
</p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              data-cursor-hover
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
              style={{ boxShadow: "0 0 40px -8px rgba(56,189,248,0.7)" }}
            >
              <span className="relative z-10">View Projects</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
              <span className="absolute inset-0 animate-shimmer opacity-50" />
            </motion.a>

            <motion.a
              href="https://drive.google.com/file/d/1W6XO1RC0Y_9A7ynXyMVif5NHz-shtW4s/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              data-cursor-hover
              className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-foreground hover:border-primary/40 transition-colors"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </motion.a>
          </div>

          <div className="mt-12 flex items-center gap-8 text-sm">
            <div>
              <div className="font-display text-2xl font-bold gradient-text">10+</div>
              <div className="text-xs text-muted-foreground">Projects shipped</div>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <div className="font-display text-2xl font-bold gradient-text">2+</div>
              <div className="text-xs text-muted-foreground">Years coding</div>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <div className="font-display text-2xl font-bold gradient-text">∞</div>
              <div className="text-xs text-muted-foreground">Curiosity</div>
            </div>
          </div>
        </motion.div>

        {/* Right - character */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="relative flex items-center justify-center h-[500px] lg:h-[600px]"
        >
          {/* Glow behind */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="h-[400px] w-[400px] rounded-full animate-pulse-glow"
              style={{ background: "radial-gradient(circle, rgba(56,189,248,0.5), transparent 70%)" }}
            />
          </div>

          {/* Concentric rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="h-[480px] w-[480px] rounded-full border border-primary/20 border-dashed" />
          </motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="h-[360px] w-[360px] rounded-full border border-accent/20" />
          </motion.div>

          {/* Floating icons */}
          {floatingIcons.map(({ Icon, x, y, delay }, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, -16, 0] }}
              transition={{
                opacity: { delay: 0.8 + delay * 0.2 },
                y: { duration: 4 + idx, repeat: Infinity, ease: "easeInOut", delay },
              }}
              className="absolute"
              style={{ left: x, top: y }}
            >
              <div className="glass flex h-12 w-12 items-center justify-center rounded-2xl">
                <Icon className="h-5 w-5 text-primary" />
              </div>
            </motion.div>
          ))}

          {/* Character */}
          <motion.img
            src={heroChar}
            alt="Alish Sahdev coding"
            width={520}
            height={520}
            className="relative z-10 max-h-[520px] w-auto animate-float drop-shadow-[0_20px_60px_rgba(56,189,248,0.45)]"
          />
        </motion.div>
      </div>
    </section>
  );
}
