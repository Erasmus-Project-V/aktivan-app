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
      "white": "#fff",
      "lightblue": "#5996B9",
    },
    fontFamily: {
      sans: ["Open Sans", "sans-serif"],
    }
  },
  plugins: [],
}

