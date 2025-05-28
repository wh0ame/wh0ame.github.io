/** @type {import('tailwindcss').Config} */
module.exports = {

  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns:{
        'auto-fit-290' : 'repeat(auto-fit, minmax(290px, 1fr))',
      colors: {
        vanessMayones: '#dd3333'
      }
    },
  },
  plugins: [],
  }
}
