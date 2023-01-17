/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        mainColor: "#E86820"
      },
      aspectRatio: {
        "2/1": "2/1",
      },
    },
    container: {
      center: true,
      padding: "1rem",
    },
  },
  plugins: [
    require("daisyui"),
    plugin(function({ addUtilities }) {
      addUtilities({
        '.content-auto': {
          'content-visibility': 'auto',
        },
        '.no-scrollbar::-webkit-scrollbar': {
          'display': 'none',
      },
      '.no-scrollbar': {
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none',
    }
      })
    })
  ],
  daisyui: {
    darkTheme: "garden",
    lightTheme: "garden",
  },
};
