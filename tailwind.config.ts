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
        canvas: "#050505",
        surface: "#121212",
        primary: {
          DEFAULT: "#FF5500",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#8B5CF6",
          foreground: "#FFFFFF",
        },
        "brand-orange": "#FF5500",
        "brand-dark": "#050505",
        "acid-lime": "#BDFF00",
        "acid-magenta": "#FF00FF",
        "glass-border": "rgba(255, 255, 255, 0.08)",
        "brand-black": "#030303",
        "brand-glass": "#0A0A0A",
        "brand-neon": "#00FF94",
        "brand-neon-dim": "rgba(0, 255, 148, 0.1)",
        "brand-border": "#1F1F1F",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        sans: ["var(--font-geist-sans)", "sans-serif"],
        serif: ["var(--font-instrument-serif)", "serif"],
      },
      backgroundImage: {
        "noise-pattern": "url('/noise.svg')",
      },
      boxShadow: {
        "neon-glow": "0 0 20px -5px rgba(0, 255, 148, 0.5)",
        "glass-inset": "inset 0 1px 1px rgba(255, 255, 255, 0.05)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
export default config;
