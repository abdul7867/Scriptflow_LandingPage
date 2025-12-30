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
        "glass-border": "rgba(255, 255, 255, 0.08)",
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
    },
  },
  plugins: [],
};
export default config;
