"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#050505]"
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            aria-hidden="true"
          >
            <div
              className="w-[400px] h-[400px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(52,211,153,0.12) 0%, transparent 70%)",
                filter: "blur(60px)",
              }}
            />
          </div>

          <div className="flex flex-col items-center gap-8 relative z-10">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <span className="text-6xl font-black gradient-text tracking-tight">KF</span>
              {/* Rotating ring */}
              <motion.div
                className="absolute -inset-4 rounded-full border-2 border-transparent"
                style={{
                  borderTopColor: "rgba(52,211,153,0.6)",
                  borderRightColor: "rgba(59,130,246,0.3)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>

            {/* Loading bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-56 h-[2px] rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  className="h-full rounded-full progress-glow"
                  style={{
                    background: "linear-gradient(90deg, #34d399, #22d3ee, #3b82f6)",
                  }}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                />
              </div>
              <motion.p
                className="text-slate-500 text-xs font-mono tracking-[0.2em] uppercase"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Loading
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
