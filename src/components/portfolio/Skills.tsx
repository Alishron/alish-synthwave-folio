import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import { SectionHeading } from "./SectionHeading";

const skills = [
  { name: "TypeScript", color: "#3178c6" },
  { name: "React", color: "#61dafb" },
  { name: "Next.js", color: "#ffffff" },
  { name: "Tailwind", color: "#38bdf8" },
  { name: "Python", color: "#ffd43b" },
  { name: "FastAPI", color: "#009688" },
  { name: "LangGraph", color: "#a78bfa" },
  { name: "PostgreSQL", color: "#336791" },
  { name: "ChromaDB", color: "#22d3ee" },
  { name: "OpenCV", color: "#5c3ee8" },
  { name: "GitHub", color: "#f0f0f0" },
  { name: "MediaPipe", color: "#0097a7" },
];

function SkillCard({ name, color, idx }: { name: string; color: string; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-50, 50], [10, -10]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-50, 50], [-10, 10]), { stiffness: 200, damping: 20 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: idx * 0.04 }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      data-cursor-hover
      className="glass group relative flex aspect-square flex-col items-center justify-center rounded-2xl p-6 transition-colors hover:border-primary/60"
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: `0 0 30px -2px ${color}66, inset 0 0 20px -8px ${color}66` }}
      />
      <div
        className="mb-3 h-10 w-10 rounded-xl"
        style={{
          background: `linear-gradient(135deg, ${color}, ${color}80)`,
          boxShadow: `0 0 20px -4px ${color}`,
          transform: "translateZ(20px)",
        }}
      />
      <span
        className="text-sm font-medium text-foreground"
        style={{ transform: "translateZ(10px)" }}
      >
        {name}
      </span>
    </motion.div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Tech Stack"
          title="Tools I love to build with"
          subtitle="A modern stack tuned for speed, polish, and intelligence."
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4" style={{ perspective: 1000 }}>
          {skills.map((s, i) => (
            <SkillCard key={s.name} {...s} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
