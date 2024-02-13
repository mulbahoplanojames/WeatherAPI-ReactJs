/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        1: "500px",
        2: "430px",
        3: "320px",
      },
    },
  },
  plugins: [],
};
