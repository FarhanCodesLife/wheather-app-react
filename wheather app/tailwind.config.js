/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        blob: "blob 7s infinite",
        gradient: "gradient 15s ease infinite",
      },
      backdropBlur: {
        md: '12px',
      },
    },
  },
  plugins: [],
}

