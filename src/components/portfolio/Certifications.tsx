import { motion } from "motion/react";
import { Award } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const certs = [
  { title: "Deep Learning Specialization", org: "DeepLearning.AI", year: "2024" },
  { title: "LangChain & LangGraph", org: "LangChain Academy", year: "2025" },
  { title: "Full Stack Open", org: "University of Helsinki", year: "2024" },
  { title: "Computer Vision Nanodegree", org: "Udacity", year: "2023" },
  { title: "AWS Cloud Practitioner", org: "Amazon Web Services", year: "2024" },
  { title: "PostgreSQL for Developers", org: "Crunchy Data", year: "2025" },
];

export function Certifications() {
  return (
    <section id="certifications" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Credentials" title="Certifications & Learning" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {certs.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              data-cursor-hover
              className="glass group flex items-center gap-4 rounded-2xl p-5 hover:border-primary/40 transition-colors"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 group-hover:ring-primary/60 transition">
                <Award className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="font-medium truncate">{c.title}</div>
                <div className="text-xs text-muted-foreground">{c.org} · {c.year}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
