import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#DED1BA", // Warm putty
          secondary: "#8A7356", // RICH EARTH BROWN
          accent: "#5B4C3A", // DEEP ESPRESSO CLAY
          neutral: "#C4B39A", // SOFT MUSHROOM BEIGE
          "base-100": "#fff8f5", // Blanco cálido
        },
      },
      {
        dark: {
          primary: "#32373d", // Oscuro-azul
          secondary: "A5ABAF", //gris
          accent: "#D64218", // rojo
          neutral: "#2F2A25", //negro
          "base-100": "#3f3c3a", // oscuro-cafe
        },
      },
    ],
  },
};
