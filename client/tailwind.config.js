/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "item-custom-color": "#333838",
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
