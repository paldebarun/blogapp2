/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      invert: {
        25: '.25',
        50: '.5',
        75: '.75',
        90:'90'
      }
    },
  },
  plugins: [],
}