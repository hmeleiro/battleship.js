/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        16: 'repeat(16, minmax(0, 1fr))',
        32: 'repeat(32, minmax(0, 1fr))',
        64: 'repeat(64, minmax(0, 1fr))',
        128: 'repeat(128, minmax(0, 1fr))'
      },
      colors: {
        player1: '#546d93',
        player2: '#e7b557'
      }
    }
  },
  plugins: []
}
