/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2A2F4F',
        secondary: '#917FB3',
        tertiary: '#E5BEEC',
        bg: '#FDE2F3'

      }
    },
    fontFamily: {
      'Josefin': ['Josefin Sans', 'sans-serif'],
      'Lilita': ['Lilita One', 'cursive'],
    }
  },
  plugins: [],
}

