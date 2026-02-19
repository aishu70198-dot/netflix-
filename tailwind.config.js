/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        netflix: {
          black: '#141414',
          dark: '#181818',
          red: '#e50914',
          gray: '#808080',
        },
      },
      fontFamily: {
        sans: ['system-ui', 'ui-sans-serif', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

