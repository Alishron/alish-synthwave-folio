import { useEffect, useState } from "react";
import { motion } from "motion/react";

export function BackgroundFX() {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.3 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const particles = Array.from({ length: 30 });

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Aurora */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-aurora)" }} />

      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* Animated blobs */}
      <motion.div
        className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full animate-pulse-glow"
        style={{ background: "radial-gradient(circle, rgba(56,189,248,0.4), transparent 70%)" }}
      />
      <motion.div
        className="absolute top-1/2 -right-40 h-[600px] w-[600px] rounded-full animate-pulse-glow"
        style={{ background: "radial-gradient(circle, rgba(34,211,238,0.3), transparent 70%)", animationDelay: "1.5s" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full animate-pulse-glow"
        style={{ background: "radial-gradient(circle, rgba(167,139,250,0.25), transparent 70%)", animationDelay: "3s" }}
      />

      {/* Mouse spotlight */}
      <div
        className="absolute inset-0 transition-all duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(56,189,248,0.12), transparent 50%)`,
        }}
      />

      {/* Particles */}
      {particles.map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-primary"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 53) % 100}%`,
            width: `${1 + (i % 3)}px`,
            height: `${1 + (i % 3)}px`,
            opacity: 0.4,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 4 + (i % 5),
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
    </div>
  );
}
