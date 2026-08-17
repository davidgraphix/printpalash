/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Body copy.
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        // Display headings — matches the client's typography reference.
        heading: ["var(--font-heading)", "var(--font-sans)", "sans-serif"],
      },
      // Tighter than Tailwind's defaults so headings and body copy sit at
      // natural reading rhythm instead of the airy spacing the client asked
      // us to pull in.
      lineHeight: {
        relaxed: "1.6",
        loose: "1.75",
      },
    },
  },
  plugins: [],
};
