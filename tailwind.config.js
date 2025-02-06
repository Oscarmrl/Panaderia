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
          primary: "#2F2A25", // Oat Milk
          secondary: "#6D3914", //Roasted Chestnut
          accent: "#AB7843", //Caramel Drizzle
          neutral: "#4C2B08", // SOFT MUSHROOM BEIGE
          "base-100": "#fff8f5", // Blanco cálido
        },
      },
      {
        dark: {
          primary: "#fff8f5", // Oscuro-azul
          secondary: "#4C2B08", //gris
          accent: "#AB7843", // rojo
          neutral: "#4C2B08", //negro
          texto: "#fff8f5",
          "base-100": "#6D3914", // oscuro-cafe
        },
      },
    ],
  },
};
