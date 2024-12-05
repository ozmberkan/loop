/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#369BFB",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        geist: ["Geist", "sans-serif"],
      },
      backgroundImage: {
        premium: "url('/src/assets/premium.svg')",
        pro: "url('/src/assets/pro.svg')",
      },
    },
  },
  plugins: [],
};
