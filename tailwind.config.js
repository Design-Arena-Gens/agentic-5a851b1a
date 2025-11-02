/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: '#2C3333',
        beige: '#E7D4B5',
        navy: '#1B3A4B',
      },
    },
  },
  plugins: [],
}
