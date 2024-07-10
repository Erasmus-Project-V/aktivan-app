/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./src/**/*.{html,js,svelte,ts}"
  ],
  theme: {
    extend: {
    },
    colors: {
      "black": "#1C1C1E",
      "gray": "#2C2C2E",
      "lightgray": "#474747",
      "white": "#fff",
      "lightblue": "#5996B9",
      "warning": "#FF2424"
    },
    fontFamily: {
      sans: ["Actor", "sans-serif"],
      advent: ["Advent Pro", "sans-serif"],
    }
  },
  plugins: [],
}

