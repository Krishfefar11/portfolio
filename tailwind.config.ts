import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        surface: "#0d0d0d",
        "surface-2": "#141414",
        "surface-3": "#1a1a1a",
        primary: {
          DEFAULT: "#34d399",
          50: "#ecfdf5",
          100: "#d1fae5",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
        },
        secondary: {
          DEFAULT: "#3b82f6",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
        },
        accent: {
          DEFAULT: "#22d3ee",
          400: "#22d3ee",
          500: "#06b6d4",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "float-delayed": "float 7s ease-in-out infinite 2s",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
        "spin-slow": "spin 12s linear infinite",
        "border-glow": "borderGlow 3s ease-in-out infinite",
        "slide-up": "slideUp 0.6s ease forwards",
        "slide-down": "slideDown 0.4s ease forwards",
        "fade-in": "fadeIn 0.6s ease forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-24px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.7" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        borderGlow: {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(52,211,153,0.3), 0 0 40px rgba(52,211,153,0.1)",
          },
          "50%": {
            boxShadow: "0 0 30px rgba(59,130,246,0.5), 0 0 60px rgba(59,130,246,0.2)",
          },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          from: { opacity: "0", transform: "translateY(-10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-primary": "linear-gradient(135deg, #34d399, #22d3ee, #3b82f6)",
        "card-glow": "linear-gradient(135deg, rgba(52,211,153,0.08) 0%, rgba(59,130,246,0.08) 100%)",
        "hero-mesh": "radial-gradient(at 40% 20%, rgba(52,211,153,0.15) 0%, transparent 50%), radial-gradient(at 80% 80%, rgba(59,130,246,0.15) 0%, transparent 50%)",
        "dot-grid": "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
      },
      backgroundSize: {
        "dot-grid": "40px 40px",
      },
      blur: {
        "4xl": "100px",
        "5xl": "150px",
        "6xl": "200px",
      },
      boxShadow: {
        "glow-emerald": "0 0 25px rgba(52,211,153,0.4)",
        "glow-blue": "0 0 25px rgba(59,130,246,0.4)",
        "glow-cyan": "0 0 25px rgba(34,211,238,0.4)",
        "card": "0 4px 24px rgba(0,0,0,0.4), 0 0 1px rgba(255,255,255,0.08)",
        "card-hover": "0 8px 40px rgba(0,0,0,0.6), 0 0 20px rgba(52,211,153,0.15)",
      },
      screens: {
        xs: "480px",
        "3xl": "1920px",
      },
    },
  },
  plugins: [],
};

export default config;
