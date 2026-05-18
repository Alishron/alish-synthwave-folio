import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              className="h-16 w-16 rounded-full border-2 border-primary/20 border-t-primary"
              style={{ boxShadow: "0 0 30px rgba(56,189,248,0.6)" }}
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute left-1/2 -translate-x-1/2 mt-6 whitespace-nowrap font-display text-sm tracking-[0.3em] uppercase gradient-text"
            >
              Alish.dev
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
