/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        bronze: {
          background1: "#FDFCFC",
          background2: "#FDF7F5",
          border1: "#DFCDC5",
          border2: "#D3BCB3",
          border3: "#C2A499",
          solid1: "#A18072",
          text1: "#43302B",
        },
      },
    },
  },
  plugins: [],
};
