/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        initial: '#D1D5DB',   // Light gray
        doing: '#3B82F6',     // Blue
        finish: '#10B981',    // Green
        not_finish: '#EF4444' // Red
      }
    },
  },
  plugins: [],
}

