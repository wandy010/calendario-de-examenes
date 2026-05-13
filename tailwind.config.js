/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/renderer/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Espacio para temas de anime dinámicos
        houseki: {
          primary: '#e0f7fa',
          accent: '#b2ebf2',
          text: '#006064',
        },
      },
    },
  },
  plugins: [],
}
