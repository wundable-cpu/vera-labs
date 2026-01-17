import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#030712",
        surface: "#020617",
        accent: {
          emerald: "#10B981",
          blue: "#38BDF8"
        }
      },
      boxShadow: {
        "glow-blue": "0 0 40px rgba(56, 189, 248, 0.45)"
      }
    }
  },
  plugins: []
};

export default config;


