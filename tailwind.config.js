/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        astro: {
          navy: '#0B132B',
          navyLight: '#1C2541',
          yellow: '#FFC857',
          yellowHover: '#E0A938',
          accent: '#4895EF',
          lightBg: '#F8F9FA'
        }
      }
    },
  },
  plugins: [],
}