import { motion } from "motion/react";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mx-auto mb-16 max-w-2xl text-center"
    >
      <div className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em] text-primary mb-4">
        <span className="h-1 w-1 rounded-full bg-primary" />
        {eyebrow}
      </div>
      <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
        {title.split(" ").map((w, i, arr) =>
          i === arr.length - 1 ? (
            <span key={i} className="gradient-text">{w}</span>
          ) : (
            <span key={i}>{w} </span>
          )
        )}
      </h2>
      {subtitle && <p className="mt-4 text-muted-foreground">{subtitle}</p>}
    </motion.div>
  );
}
