import { motion } from "motion/react";
import { GraduationCap, Brain, Eye, Server, Database, Workflow } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const items = [
  { Icon: GraduationCap, title: "NITK Student", desc: "Final-year B.Tech building deeply technical, design-led products." },
  { Icon: Brain, title: "AI + Full Stack", desc: "Bridging research and product — from model to interface." },
  { Icon: Workflow, title: "LangGraph", desc: "Designing stateful, multi-agent LLM workflows that just work." },
  { Icon: Eye, title: "Computer Vision", desc: "Real-time perception with OpenCV, MediaPipe and modern CV stacks." },
  { Icon: Server, title: "FastAPI", desc: "High-performance Python APIs powering AI products at scale." },
  { Icon: Database, title: "PostgreSQL", desc: "Schema-first thinking with Postgres, pgvector and ChromaDB." },
];

export function About() {
  return (
    <section id="about" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="About"
          title="A builder, a learner, a shipper"
          subtitle="Engineering at the intersection of intelligence and craft."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              data-cursor-hover
              className="glass group relative overflow-hidden rounded-2xl p-6 transition-all hover:border-primary/40"
            >
              <div
                className="absolute -top-12 -right-12 h-32 w-32 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "radial-gradient(circle, rgba(56,189,248,0.3), transparent 70%)" }}
              />
              <div className="relative">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                  <it.Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
