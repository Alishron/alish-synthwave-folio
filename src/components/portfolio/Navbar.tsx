import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sparkles } from "lucide-react";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#programming", label: "Programming" },
  { href: "#certifications", label: "Certs" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed left-1/2 top-4 z-50 -translate-x-1/2 px-4 w-full max-w-6xl"
    >
      <motion.nav
        animate={{
          paddingTop: scrolled ? 8 : 14,
          paddingBottom: scrolled ? 8 : 14,
          scale: scrolled ? 0.98 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="glass-strong relative flex items-center justify-between rounded-full px-5 shadow-2xl"
      >
        <a href="#hero" className="flex items-center gap-2 group" data-cursor-hover>
          <div className="relative">
            <Sparkles className="h-5 w-5 text-primary transition-transform group-hover:rotate-12" />
            <div className="absolute inset-0 blur-md bg-primary/60" />
          </div>
          <span className="font-display font-bold tracking-tight">
            alish<span className="text-primary">.</span>dev
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                data-cursor-hover
                className="relative px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground group"
              >
                {l.label}
                <span className="absolute left-3 right-3 -bottom-0.5 h-px scale-x-0 origin-left bg-gradient-to-r from-primary to-accent transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a
            href="#contact"
            data-cursor-hover
            className="relative inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:scale-105"
            style={{ boxShadow: "0 0 24px -4px rgba(56,189,248,0.6)" }}
          >
            Let's Talk
            <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground animate-pulse" />
          </a>
        </div>

        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-strong mt-2 rounded-2xl p-4 md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="block rounded-lg bg-primary px-3 py-2 text-center text-sm font-medium text-primary-foreground mt-2"
                >
                  Let's Talk
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
