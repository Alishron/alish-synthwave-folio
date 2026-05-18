import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Sparkles className="h-4 w-4 text-primary" />
            <div className="absolute inset-0 blur-md bg-primary/60 animate-pulse" />
          </div>
          <span className="font-display text-sm font-semibold tracking-tight">
            alish<span className="text-primary">.</span>dev
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Alish Sahdev — Crafted with care.
        </p>
        <p className="text-xs text-muted-foreground">
          Built with <span className="text-foreground">Next.js</span> & <span className="text-foreground">TypeScript</span>
        </p>
      </div>
    </footer>
  );
}
