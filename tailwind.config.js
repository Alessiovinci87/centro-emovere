/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        emovere: {
          bg: "#f6f5f2",
          fg: "#0d1b12",
          sage: "#9BB39C",
          sand: "#D9CBB8",
          muted: "#6b6b6b",
          border: "#e5e1da",
          ring: "#c9d6cb",
        },
      },
      borderRadius: {
        xl: "16px",
        "2xl": "20px",
      },
      boxShadow: {
        "soft-1": "0 1px 2px rgba(0,0,0,.04), 0 4px 14px rgba(0,0,0,.05)",
        "soft-2": "0 3px 6px rgba(0,0,0,.06), 0 12px 24px rgba(0,0,0,.08)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        serif: ["var(--font-playfair)", "ui-serif", "Georgia"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
};
