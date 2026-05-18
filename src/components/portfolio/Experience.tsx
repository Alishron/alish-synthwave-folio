import { motion } from "motion/react";
import { SectionHeading } from "./SectionHeading";

const timeline = [
  {
    period: "May 2025 — July 2025",
    role: "Software Engineering Intern",
    org: "Tech Mahindra",
    desc: "Developed a full-stack onboarding and offboarding management system used by 48+ application teams using React.js, Node.js, Express.js, and PostgreSQL with secure RBAC-based workflows.",
  },

  {
    period: "2022 — 2026",
    role: "B.Tech in Electrical & Electronics Engineering",
    org: "NITK Surathkal",
    desc: "Focused on software engineering, machine learning, backend systems, AI infrastructure, and modern application development while actively building real-world technical projects.",
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
