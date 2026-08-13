/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./partials/**/*.html", "./assets/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};

