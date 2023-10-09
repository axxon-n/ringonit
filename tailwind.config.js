import {nextui} from '@nextui-org/theme'
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    screens: {
      'xs': '280px',
      ...defaultTheme.screens,
    },
    extend: {
      backgroundOpacity: ['active'],
        animation: {
        fadeIn: "fadeIn 5s ease-in forwards"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        }
      }
      // keyframes: {
      //   typing: {
      //     "0%": {
      //       width: "0%",
      //       visibility: "hidden"
      //     },
      //     "100%": {
      //       width: "100%"
      //     }  
      //   },
      //   blink: {
      //     "50%": {
      //       borderColor: "transparent"
      //     },
      //     "100%": {
      //       borderColor: "white"
      //     }  
      //   }
      // },
      // animation: {
      //   typing: "typing 2s steps(20) infinite alternate, blink .7s infinite"
      // }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}
