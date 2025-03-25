/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#ff5722',
        'secondary': '#2196f3',
        'background': '#121212',
        'surface': '#1e1e1e',
        'text-primary': '#ffffff',
        'text-secondary': '#b3b3b3'
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}