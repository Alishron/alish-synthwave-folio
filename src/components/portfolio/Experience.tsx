import { motion } from "motion/react";
import { SectionHeading } from "./SectionHeading";

const timeline = [
  {
    period: "2025 — Present",
    role: "AI Engineering Intern",
    org: "Stealth Startup",
    desc: "Building multi-agent LangGraph pipelines, fine-tuning vision models, and shipping end-to-end AI features in production.",
  },
  {
    period: "2024 — 2025",
    role: "Full Stack Developer",
    org: "Freelance & Open Source",
    desc: "Designed and shipped premium React + FastAPI products for early-stage founders. Focus on DX, performance, and polish.",
  },
  {
    period: "2022 — 2026",
    role: "B.Tech, Computer Science",
    org: "NIT Karnataka",
    desc: "Coursework in ML, distributed systems and HCI. Active in dev community, hackathons, and AI research circles.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Experience"
          title="A timeline of momentum"
        />
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent" />

          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative mb-12 flex md:items-center md:gap-8 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex h-3 w-3 items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-primary" style={{ boxShadow: "0 0 16px rgba(56,189,248,0.8)" }} />
              </div>

              <div className="ml-12 md:ml-0 md:w-1/2 md:px-8">
                <div className="glass rounded-2xl p-6 hover:border-primary/40 transition-colors">
                  <div className="text-xs font-mono uppercase tracking-wider text-primary">{item.period}</div>
                  <h3 className="mt-2 font-display text-xl font-semibold">{item.role}</h3>
                  <div className="text-sm text-muted-foreground">{item.org}</div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              </div>
              <div className="hidden md:block md:w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
