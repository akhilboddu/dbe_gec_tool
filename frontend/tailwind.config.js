/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

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
  plugins: [require("daisyui")],
  daisyui: {
    darkTheme: "garden",
    lightTheme: "garden",
  },
};
