/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        'width': 'width',
        'justify': 'justify-content',
      },
      colors: {
        'header': '#f3f4f6 ',
        'primary': '#2C3E50',
        'thead': '#d1d5db ',
        'aside': '#e5e7eb ',
        'asidetext': '#111827',
        'asidetexthover': '#d1d5db',
      }
    },
  },
  plugins: [],
}

