"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";

import { useRef } from "react";

import {
  Github,
  ExternalLink,
  ArrowUpRight,
} from "lucide-react";

import { SectionHeading } from "./SectionHeading";

type Project = {
  title: string;
  tagline: string;
  desc: string;
  stack: string[];
  gradient: string;
  size: "lg" | "md" | "sm";
  github: string;
  live?: string;
};

const projects: Project[] = [
  {
    title: "AI Elder Care Guardian",

    tagline: "Vision + LLM Safety Companion",

    desc: "AI-powered elder monitoring system with real-time fall detection, anomaly tracking, emergency alerts, and conversational caregiving assistance using computer vision and LLM workflows.",

    stack: [
      "LangChain",
      "LangGraph",
      "Amazon Nova Lite (reasoning)",
      "ChromaDB",
      "Python",
      "FastAPI"
    ],

    gradient:
      "from-sky-500/40 via-cyan-500/20 to-transparent",

    size: "md",

    github:
      "https://github.com/Alishron/AI_ELDER_CARE",
  },

  {
  title: "Smart Inventory & Expiry Tracker",

  tagline: "Flutter + Firebase Inventory Management App",

  desc: "Developed a smart inventory management mobile application using Flutter and Firebase, enabling users to organize items by categories, track expiry dates, scan barcodes using Google ML Kit, and receive intelligent expiry notifications. Designed a premium glassmorphism UI with responsive layouts and real-time cloud-backed inventory synchronization.",

  stack: [
    "Flutter",
    "Firebase",
    "Dart",
    "Google ML Kit",
    "Firestore",
    "Notifications",
  ],

  gradient:
    "from-emerald-500/40 via-cyan-500/20 to-transparent",

  size: "md",

  github:
    "https://github.com/Alishron/smart-inventory-expiry-tracker",

},

  {
  title: "PDF Conversational AI",

  tagline: "RAG-based Document Question Answering",

  desc: "Built an intelligent PDF-based conversational AI system that allows users to upload documents and interact with them using natural language queries. Implemented semantic search with FAISS vector indexing and Google Generative AI embeddings, enabling accurate context-aware responses with persistent conversation history.",

  stack: [
    "FastAPI",
    "React.js",
    "SQLite",
    "FAISS",
    "Google Gemini",
    "Python",
  ],

  gradient:
    "from-blue-500/40 via-cyan-500/20 to-transparent",

  size: "md",

  github:
    "https://github.com/Alishron/full_stack_RAG_BOT",
},

];

function ProjectCard({
  project,
}: {
  project: Project;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rx = useSpring(
    useTransform(my, [-100, 100], [6, -6]),
    {
      stiffness: 150,
      damping: 20,
    }
  );

  const ry = useSpring(
    useTransform(mx, [-100, 100], [-6, 6]),
    {
      stiffness: 150,
      damping: 20,
    }
  );

  const onMove = (
    e: React.MouseEvent
  ) => {
    if (!ref.current) return;

    const r =
      ref.current.getBoundingClientRect();

    mx.set(
      e.clientX - r.left - r.width / 2
    );

    my.set(
      e.clientY - r.top - r.height / 2
    );
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformStyle: "preserve-3d",
      }}
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        margin: "-50px",
      }}
      transition={{
        duration: 0.6,
      }}
      data-cursor-hover
      className={`glass group relative flex flex-col overflow-hidden rounded-3xl p-7 transition-all hover:border-primary/50 ${
        project.size === "lg"
          ? "md:col-span-2 md:row-span-2"
          : ""
      }`}
    >
      {/* Banner */}
      <div
        className={`relative -mx-7 -mt-7 mb-6 h-48 overflow-hidden bg-gradient-to-br ${project.gradient}`}
      >
        <div className="absolute inset-0 grid-bg opacity-30" />

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="font-display text-6xl font-bold text-foreground/10"
            style={{
              transform: "translateZ(30px)",
            }}
          >
            {project.title
              .split(" ")
              .map((w) => w[0])
              .join("")}
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-card to-transparent" />

        <ArrowUpRight className="absolute top-4 right-4 h-5 w-5 text-foreground opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
      </div>

      {/* Glow */}
      <div
        className="absolute inset-0 -z-10 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          boxShadow:
            "0 0 60px -10px rgba(56,189,248,0.5)",
        }}
      />

      {/* Content */}
      <div className="text-xs font-mono uppercase tracking-wider text-primary">
        {project.tagline}
      </div>

      <h3 className="mt-2 font-display text-2xl font-semibold">
        {project.title}
      </h3>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {project.desc}
      </p>

      {/* STACK */}
      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((t) => (
          <span
            key={t}
            className="rounded-full border border-border bg-white/5 px-2.5 py-0.5 text-xs text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>

      {/* BUTTONS */}
      <div className="mt-6 flex items-center gap-3">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors hover:border-primary/40"
        >
          <Github className="h-3.5 w-3.5" />
          GitHub
        </a>

        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-transform hover:scale-105"
            style={{
              boxShadow:
                "0 0 16px -4px rgba(56,189,248,0.6)",
            }}
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Live Demo
          </a>
        )}
      </div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section
      id="projects"
      className="relative px-6 py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Selected Work"
          title="Things I have built"
          subtitle="A collection of AI systems, full-stack products, intelligent workflows, and modern engineering projects."
        />

        <div
          className="grid auto-rows-fr gap-5 md:grid-cols-3"
          style={{
            perspective: 1200,
          }}
        >
          {projects.map((p) => (
            <ProjectCard
              key={p.title}
              project={p}
            />
          ))}
        </div>
      </div>
    </section>
  );
}