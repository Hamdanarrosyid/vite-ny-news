/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react'

export default {
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'jumbotron-search': "url('./src/assets/ny-city.jpg')"
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()]
}

