import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        tamil: ["var(--font-catamaran)", "Noto Sans Tamil", "Latha", "sans-serif"],
        display: ["var(--font-playfair)", "serif"],
      },
      colors: {
        // Zareqia exact palette
        ivory: "#FAF7F2",
        navy: "#1a1a2e",
        gold: "#B8860B",
        "gold-btn": "#9A7B3C",
        "section-alt": "#F5EFE6",
        // Brand / invitation
        brand: {
          rose: "#B76E79",
          blush: "#F4C2C2",
          ivory: "#FFFFF0",
          gold: "#D4AF37",
          maroon: "#800020",
          navy: "#0A1045",
          emerald: "#50C878",
          cream: "#FFFDD0",
        },
      },
      boxShadow: {
        glow: "0 0 60px rgba(212, 175, 55, 0.25)",
        gold: "0 4px 24px rgba(184, 134, 11, 0.2)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        petal: {
          "0%": { transform: "translate3d(0,-10vh,0) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "1" },
          "100%": { transform: "translate3d(var(--drift),110vh,0) rotate(360deg)", opacity: "0" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "1" },
        },
        rise: {
          "0%": { transform: "translateY(24px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "door-left": {
          "0%": { transform: "perspective(1200px) rotateY(0deg)" },
          "100%": { transform: "perspective(1200px) rotateY(-88deg)" },
        },
        "door-right": {
          "0%": { transform: "perspective(1200px) rotateY(0deg)" },
          "100%": { transform: "perspective(1200px) rotateY(88deg)" },
        },
        "bounce-down": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "confetti-fall": {
          "0%": { transform: "translateY(-10px) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(100px) rotate(360deg)", opacity: "0" },
        },
        "flip-in": {
          "0%": { transform: "rotateX(90deg)", opacity: "0" },
          "100%": { transform: "rotateX(0deg)", opacity: "1" },
        },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        petal: "petal 8s linear infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
        rise: "rise 0.8s ease-out both",
        "door-left": "door-left 1.5s ease-in-out forwards",
        "door-right": "door-right 1.5s ease-in-out forwards",
        "bounce-down": "bounce-down 1.5s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.8s ease-out both",
        "confetti-fall": "confetti-fall 1s ease-out forwards",
        "flip-in": "flip-in 0.3s ease-out both",
      },
      backgroundImage: {
        shimmer: "linear-gradient(90deg, rgba(255,255,255,0.2), rgba(255,255,255,0.7), rgba(255,255,255,0.2))",
        "gold-gradient": "linear-gradient(135deg, #B8860B 0%, #D4AF37 50%, #9A7B3C 100%)",
        "rose-gold": "linear-gradient(135deg, #B76E79 0%, #F4C2C2 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
