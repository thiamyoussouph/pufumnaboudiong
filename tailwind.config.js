/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#221619",
        surface: "#2c1d21",
        "surface-2": "#35242a",
        ivory: "#f2e7da",
        "ivory-soft": "#c9b8ab",
        gold: "#c6a15b",
        "gold-deep": "#a5823f",
        rose: "#c58a82",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-instrument)", "system-ui", "sans-serif"],
      },
      borderColor: {
        line: "rgba(242,231,218,.14)",
        "line-strong": "rgba(242,231,218,.28)",
      },
      maxWidth: { shell: "1240px" },
    },
  },
  plugins: [],
};
