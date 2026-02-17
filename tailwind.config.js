const { BioRhyme } = require('next/font/google');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        aileron: ["Aileron", "sans-serif"],
        biorhyme: ["var(--font-biorhyme)", "serif"],
      },
    },
  },
  plugins: [],
};
