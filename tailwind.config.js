/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: { /* vos couleurs */ },
        teal: { /* couleurs teal */ }
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
}