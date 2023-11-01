/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'page-pattern': "url('../src/img/main-page.jpg')",
      }
    },
  },
  plugins: [],
}