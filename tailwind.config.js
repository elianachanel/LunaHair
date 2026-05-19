/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        luna: {
          bg: "#07050D",
          surface: "#120A1E",
          card: "rgba(255,255,255,0.06)",
          border: "rgba(196,181,253,0.18)",
          purple: "#C4B5FD",
          violet: "#A78BFA",
          accent: "#8B5CF6",
          glow: "#7C3AED",
          muted: "#9CA3AF",
          text: "#F5F3FF",
        },
      },
      fontFamily: {
        sans: ["System"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(139, 92, 246, 0.35)",
        "glow-sm": "0 0 20px rgba(139, 92, 246, 0.25)",
      },
    },
  },
  plugins: [],
};
