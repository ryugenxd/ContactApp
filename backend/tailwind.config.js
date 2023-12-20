/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.jsx",
  ],
  theme: {
    extend:{
      spacing: {
        's95': '95vh',
      }
    },
    fontFamily:{
      'title':['Mochiy Pop One','sans-serif'],
      'gen':['Poppins', 'sans-serif'],
    },
  },
  plugins: [],
}

