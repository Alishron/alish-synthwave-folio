import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

export function BackgroundFX() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.3 });

  // Matrix rain effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const chars = "01アイウエオカキクケコ∑∆∏√∞≠≈∫∇λφψω</>{}[]()";
    const fontSize = 11;
    let cols = Math.floor(canvas.width / fontSize);
    let drops: number[] = Array(cols).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const alpha = 0.08 + (i % 5) * 0.04;
        ctx.fillStyle = `rgba(56,189,248,${alpha})`;
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 55);

    const onResize = () => {
      resize();
      cols = Math.floor(canvas.width / fontSize);
      drops = Array(cols).fill(1);
    };
    window.addEventListener("resize", onResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) =>
      setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#020810]">
      {/* Matrix canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-25" />

      {/* Perspective floor grid */}
      <div
        className="absolute inset-x-0 bottom-0 h-[55%] opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(rgba(56,189,248,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56,189,248,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          transform: "perspective(600px) rotateX(55deg) scaleY(2.5)",
          transformOrigin: "center bottom",
          maskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 55%)",
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 55%)",
        }}
      />

      {/* Subtle top flat grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(56,189,248,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56,189,248,0.8) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Aurora base */}
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-aurora, radial-gradient(ellipse at 30% 20%, rgba(15,23,42,0) 0%, rgba(2,8,16,0.8) 100%))" }}
      />

      {/* Animated blobs */}
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-48 -left-48 h-[650px] w-[650px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(56,189,248,0.35), transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
        className="absolute top-1/3 -right-48 h-[700px] w-[700px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(34,211,238,0.25), transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(167,139,250,0.2), transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Mouse spotlight */}
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          background: `radial-gradient(900px circle at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(56,189,248,0.07), transparent 50%)`,
        }}
      />

      {/* Glitch horizontal streaks */}
      {[18, 42, 63, 79].map((top, i) => (
        <motion.div
          key={i}
          className="absolute inset-x-0 h-px"
          style={{ top: `${top}%`, background: "rgba(56,189,248,0.15)" }}
          animate={{ scaleX: [0, 1, 0], opacity: [0, 0.6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 2.2 + 3, repeatDelay: 6 }}
        />
      ))}

      {/* Corner accent markers */}
      {(["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"] as const).map(
        (pos, i) => (
          <motion.div
            key={i}
            className={`absolute ${pos} w-16 h-16`}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
          >
            <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
              <path
                d={i === 0 ? "M0 32 L0 0 L32 0" : i === 1 ? "M64 32 L64 0 L32 0" : i === 2 ? "M0 32 L0 64 L32 64" : "M64 32 L64 64 L32 64"}
                stroke="rgba(56,189,248,0.4)"
                strokeWidth="1"
              />
            </svg>
          </motion.div>
        )
      )}

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.65) 100%)" }}
      />
    </div>
  );
}