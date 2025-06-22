module.exports = {
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}', // Adjust the paths based on your project structure
  ],  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
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
