module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'custom-red': '#DD4444',
      },
    },
  },
  variants: {
    extend: {
      colors: {
        'app-light-blue': '#4270ED0D',
      }
    },
  },
  plugins: [],
}
