/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Aileron", "sans-serif"], // ✅ default body font
        biorhyme: ["var(--font-biorhyme)", "serif"], // ✅ headings
      },
    },
  },
  plugins: [],
};
