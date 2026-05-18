import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "motion/react";

import { useRef } from "react";

import { SectionHeading } from "./SectionHeading";

const skills = [
   {
    name: "Java",
    color: "#f89820",
    icon: "☕",
  },

  {
    name: "JavaScript",
    color: "#f7df1e",
    icon: "JS",
  },

  {
    name: "React",
    color: "#61dafb",
    icon: "⚛",
  },

  {
    name: "Next.js",
    color: "#ffffff",
    icon: "▲",
  },

  {
    name: "Tailwind",
    color: "#38bdf8",
    icon: "TW",
  },

  {
    name: "Python",
    color: "#ffd43b",
    icon: "Py",
  },

 

  {
    name: "Flutter",
    color: "#42a5f5",
    icon: "FL",
  },

  {
    name: "FastAPI",
    color: "#009688",
    icon: "⚡",
  },

  {
    name: "Node.js",
    color: "#68a063",
    icon: "⬢",
  },

  {
    name: "Express",
    color: "#bdbdbd",
    icon: "EX",
  },

  {
    name: "PostgreSQL",
    color: "#336791",
    icon: "DB",
  },

  {
    name: "Firebase",
    color: "#ffca28",
    icon: "🔥",
  },

  {
    name: "ChromaDB",
    color: "#22d3ee",
    icon: "CH",
  },

  {
    name: "LangChain",
    color: "#00c853",
    icon: "LC",
  },

  {
    name: "LangGraph",
    color: "#a78bfa",
    icon: "LG",
  },

  {
    name: "TensorFlow",
    color: "#ff6f00",
    icon: "TF",
  },

  {
    name: "OpenCV",
    color: "#5c3ee8",
    icon: "CV",
  },

  {
    name: "FAISS",
    color: "#00acc1",
    icon: "FS",
  },

  {
    name: "Docker",
    color: "#2496ed",
    icon: "DK",
  },

  {
    name: "GitHub",
    color: "#f0f0f0",
    icon: "GH",
  },
];

function SkillCard({
  name,
  color,
  icon,
  idx,
}: {
  name: string;
  color: string;
  icon: string;
  idx: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(y, [-50, 50], [10, -10]),
    {
      stiffness: 200,
      damping: 20,
    }
  );

  const rotateY = useSpring(
    useTransform(x, [-50, 50], [-10, 10]),
    {
      stiffness: 200,
      damping: 20,
    }
  );

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
      transition={{
        duration: 0.4,
        delay: idx * 0.04,
      }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      data-cursor-hover
      className="glass group relative flex aspect-square flex-col items-center justify-center rounded-2xl p-6 transition-colors hover:border-primary/60"
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          boxShadow: `0 0 30px -2px ${color}66, inset 0 0 20px -8px ${color}66`,
        }}
      />

      <div
        className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl text-sm font-bold text-black"
        style={{
          background: `linear-gradient(135deg, ${color}, ${color}80)`,
          boxShadow: `0 0 20px -4px ${color}`,
          transform: "translateZ(20px)",
        }}
      >
        {icon}
      </div>

      <span
        className="text-sm font-medium text-foreground"
        style={{
          transform: "translateZ(10px)",
        }}
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

       <div className="relative overflow-hidden py-4">
  <motion.div
    className="flex gap-4"
    animate={{
      x: ["0%", "-50%"],
    }}
    transition={{
      repeat: Infinity,
      ease: "linear",
      duration: 25,
    }}
    whileHover={{
      animationPlayState: "paused",
    }}
    style={{
      width: "max-content",
      perspective: 1000,
    }}
  >
    {[...skills, ...skills].map((s, i) => (
      <div
        key={`${s.name}-${i}`}
        className="w-[140px] shrink-0"
      >
        <SkillCard {...s} idx={i} />
      </div>
    ))}
  </motion.div>

  {/* Left Fade */}
  <div className="pointer-events-none absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-background to-transparent" />

  {/* Right Fade */}
  <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-background to-transparent" />
</div>
      </div>
    </section>
  );
}