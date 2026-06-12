"use client";

import { motion } from "framer-motion";

interface BackgroundBlobsProps {
  variant?: "hero" | "section" | "subtle";
}

export default function BackgroundBlobs({ variant = "section" }: BackgroundBlobsProps) {
  if (variant === "hero") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Top-right emerald blob */}
        <motion.div
          className="blob-1 absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, rgba(52,211,153,0.18) 0%, rgba(16,185,129,0.08) 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.8, 0.6] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Bottom-left blue blob */}
        <motion.div
          className="blob-2 absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, rgba(59,130,246,0.18) 0%, rgba(37,99,235,0.08) 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.75, 0.5] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Center cyan accent */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, rgba(34,211,238,0.06) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Dot grid overlay */}
        <div
          className="absolute inset-0 dot-grid opacity-40"
          style={{ backgroundSize: "40px 40px" }}
        />
      </div>
    );
  }

  if (variant === "subtle") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(52,211,153,0.07) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div
        className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(52,211,153,0.1) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(59,130,246,0.1) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
    </div>
  );
}
