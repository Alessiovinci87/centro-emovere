/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  corePlugins: { container: false },
  theme: {
    extend: {
      colors: {
        emovere: {
          bg: "#f7f4ee",
          fg: "#1f2a22",
          sage: "#9fb17d",
          "sage-strong": "#687a48",
          "sage-deep": "#4f5d38",
          "sage-soft": "#ecf1e4",
          blush: "#e8d5c6",
          "blush-soft": "#f4ebe3",
          muted: "#5f6b62",
          border: "#e6e1d8",
          ring: "#bdcaa5",
        },
      },
      borderRadius: {
        xl: "14px",
        "2xl": "18px",
        "3xl": "26px",
      },
      boxShadow: {
        "soft-1": "0 1px 2px rgba(31,42,34,.04), 0 6px 18px rgba(31,42,34,.06)",
        "soft-2": "0 4px 10px rgba(31,42,34,.08), 0 18px 36px rgba(31,42,34,.10)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        serif: ["var(--font-playfair)", "ui-serif", "Georgia"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({ strategy: "class" }),
    require("@tailwindcss/typography"),
  ],
};
