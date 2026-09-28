/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc7fb',
          400: '#36abf7',
          500: '#0c8fe9',
          600: '#0070c7',
          700: '#0159a2',
          800: '#064c85',
          900: '#0a406f',
          950: '#072849',
        },
        navy: {
          800: '#0B132B',
          900: '#0A0F1D',
          950: '#05070E',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 25px -5px rgba(12, 143, 233, 0.3)',
        'glow-lg': '0 0 40px -10px rgba(12, 143, 233, 0.4)',
      }
    },
  },
  plugins: [],
}
