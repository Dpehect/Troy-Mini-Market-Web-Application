import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./store/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        danger: "hsl(var(--danger))",
        price: "hsl(var(--price))",
        discount: "hsl(var(--discount))",
        fresh: "hsl(var(--fresh))"
      },
      boxShadow: {
        soft: "0 14px 45px rgba(21, 44, 34, 0.08)",
        card: "0 20px 55px rgba(21, 44, 34, 0.10)",
        glow: "0 18px 60px rgba(238, 133, 58, 0.18)"
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.75rem",
        "4xl": "2rem"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        display: ["Fraunces", "Georgia", "ui-serif", "serif"]
      },
      backgroundImage: {
        "hero-radial": "radial-gradient(circle at top right, rgba(238, 133, 58, 0.18), transparent 36%), radial-gradient(circle at 18% 18%, rgba(32, 106, 79, 0.14), transparent 30%)"
      }
    }
  },
  plugins: [animate]
};

export default config;
