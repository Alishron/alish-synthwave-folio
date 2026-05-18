import { motion } from "motion/react";

import {
  GraduationCap,
  Brain,
  Server,
  Database,
  Workflow,
  CalendarDays,
  MapPin,
  Trophy,
  Building2,
} from "lucide-react";

import { SectionHeading } from "./SectionHeading";

const items = [
  {
    Icon: GraduationCap,
    title: "NITK Surathkal",

    details: [
      {
        icon: GraduationCap,
        text: "B.Tech in Electrical & Electronics Engineering",
      },

      {
        icon: CalendarDays,
        text: "2022 – 2026",
      },

      {
        icon: MapPin,
        text: "Surathkal, Karnataka",
      },

      {
        icon: Trophy,
        text: "NIRF Rank - 17",
      },
    ],

    className: "md:col-span-2",
  },

  {
    Icon: Brain,
    title: "AI + Machine Learning",
    desc: "Experienced in building AI-powered applications using LLMs, RAG systems, LangChain, vector databases, and modern machine learning workflows.",
  },

  {
    Icon: Workflow,
    title: "Full Stack Development",
    desc: "Skilled in developing scalable full-stack applications using React, Next.js, Node.js, FastAPI, PostgreSQL, and modern backend architectures.",
  },

  {
    Icon: Server,
    title: "Android App Development",
    desc: "Developed cross-platform and Android applications with modern UI, cloud integration, authentication systems, and real-time features.",
  },

  {
    Icon: Database,
    title: "Backend & Databases",
    desc: "Hands-on experience with PostgreSQL, ChromaDB, Firebase, REST APIs, authentication systems, and scalable backend services.",
  },
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
              className={`glass group relative overflow-hidden rounded-2xl p-6 transition-all hover:border-primary/40 ${
                it.className || ""
              }`}
            >
              <div
                className="absolute -top-12 -right-12 h-32 w-32 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle, rgba(56,189,248,0.3), transparent 70%)",
                }}
              />

              <div className="relative">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                  <it.Icon className="h-5 w-5" />
                </div>

                <h3 className="font-display text-lg font-semibold">
                  {it.title}
                </h3>

                {it.details ? (
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {it.details.map((detail, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                      >
                        <detail.icon className="h-4 w-4 text-primary" />

                        <span className="text-sm text-muted-foreground">
                          {detail.text}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {it.desc}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}