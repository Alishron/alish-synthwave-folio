import { motion } from "motion/react";
import { useState } from "react";
import { Send, Github, Linkedin, Mail } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

function FloatingInput({
  label,
  type = "text",
  textarea,
}: {
  label: string;
  type?: string;
  textarea?: boolean;
}) {
  const [val, setVal] = useState("");
  const [focus, setFocus] = useState(false);
  const active = focus || val.length > 0;

  const cls =
    "peer w-full bg-transparent text-foreground outline-none transition-all border-0 focus:ring-0";
  return (
    <div className="glass relative rounded-2xl px-4 pt-6 pb-2 transition-colors focus-within:border-primary/60">
      <label
        className={`pointer-events-none absolute left-4 transition-all ${
          active ? "top-2 text-xs text-primary" : "top-4 text-sm text-muted-foreground"
        }`}
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          rows={4}
          value={val}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={(e) => setVal(e.target.value)}
          className={cls + " resize-none"}
        />
      ) : (
        <input
          type={type}
          value={val}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={(e) => setVal(e.target.value)}
          className={cls}
        />
      )}
    </div>
  );
}

export function Contact() {
  return (
    <section id="contact" className="relative px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Get in touch"
          title="Let's build something great"
          subtitle="Open to internships, collaborations and ambitious side projects."
        />

        <div className="grid gap-8 md:grid-cols-5">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={(e) => e.preventDefault()}
            className="md:col-span-3 space-y-4"
          >
            <FloatingInput label="Your Name" />
            <FloatingInput label="Email" type="email" />
            <FloatingInput label="Message" textarea />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-cursor-hover
              type="submit"
              className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground"
              style={{ boxShadow: "0 0 40px -8px rgba(56,189,248,0.6)" }}
            >
              <span className="relative z-10">Send Message</span>
              <Send className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
              <span className="absolute inset-0 animate-shimmer opacity-60" />
            </motion.button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:col-span-2 space-y-3"
          >
            {[
              { Icon: Mail, label: "Email", value: "alish@example.com", href: "mailto:alish@example.com" },
              { Icon: Github, label: "GitHub", value: "@alishsahdev", href: "https://github.com" },
              { Icon: Linkedin, label: "LinkedIn", value: "Alish Sahdev", href: "https://linkedin.com" },
            ].map(({ Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                data-cursor-hover
                className="glass group flex items-center gap-4 rounded-2xl p-4 hover:border-primary/40 transition-colors"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 group-hover:ring-primary/60 transition">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground">{label}</div>
                  <div className="font-medium truncate">{value}</div>
                </div>
              </a>
            ))}
            <div className="glass rounded-2xl p-5">
              <div className="text-xs uppercase tracking-wider text-primary mb-2 font-mono">Status</div>
              <div className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Open to opportunities — Summer & Fall 2026
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
