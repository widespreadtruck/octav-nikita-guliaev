/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "item-custom-color": "#1E2A3B",
        "hover-item-custom-color": "#2A3649",
      },
    },
  },
  variants: {
    width: ["responsive"],
    height: ["responsive"],
    margin: ["responsive"],
  },
  plugins: [],
}
