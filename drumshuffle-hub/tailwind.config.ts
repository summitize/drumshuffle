import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // DrumShuffle Brand Palette
        brand: {
          50:  "#fff1f0",
          100: "#ffe0dc",
          200: "#ffc5bd",
          300: "#ff9e91",
          400: "#ff6b5b",
          500: "#ff3d2e",   // primary red-orange
          600: "#ed2110",
          700: "#c7180a",
          800: "#a4180d",
          900: "#871a12",
          950: "#4a0805",
        },
        night: {
          50:  "#f6f6f7",
          100: "#e2e2e5",
          200: "#c4c4ca",
          300: "#9d9da8",
          400: "#77778a",
          500: "#5c5c70",
          600: "#48485a",
          700: "#3a3a49",
          800: "#242430",
          900: "#15151f",   // main bg
          950: "#0b0b13",   // deepest bg
        },
        accent: {
          cyan:   "#00d4ff",
          purple: "#8b5cf6",
          gold:   "#f59e0b",
        },
      },
      fontFamily: {
        sans:    ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
        mono:    ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial":  "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":   "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-glow":        "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,61,46,0.18) 0%, transparent 70%)",
        "card-shine":       "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 60%)",
      },
      animation: {
        "fade-up":       "fadeUp 0.6s ease forwards",
        "fade-in":       "fadeIn 0.4s ease forwards",
        "pulse-slow":    "pulse 3s cubic-bezier(0.4,0,0.6,1) infinite",
        "spin-slow":     "spin 8s linear infinite",
        "bounce-subtle": "bounceSubtle 2s ease-in-out infinite",
        "glow-pulse":    "glowPulse 2.5s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        bounceSubtle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-6px)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255,61,46,0.3)" },
          "50%":      { boxShadow: "0 0 40px rgba(255,61,46,0.6)" },
        },
      },
      boxShadow: {
        "brand-sm": "0 2px 12px rgba(255,61,46,0.25)",
        "brand-md": "0 4px 24px rgba(255,61,46,0.35)",
        "brand-lg": "0 8px 48px rgba(255,61,46,0.45)",
        "glass":    "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
        "card":     "0 4px 24px rgba(0,0,0,0.5)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
