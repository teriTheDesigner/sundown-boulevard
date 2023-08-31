/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      helvetica: ["var(--font-helvetica)"],
    },

    colors: {
      "background-white": "rgb(246, 240, 240)",
      "dark-purple": "rgb(60, 21, 59)",
      "light-turquoise": "rgb(32, 163, 158)",
      "dark-yellow": "rgb(255, 186, 73)",
      "dark-red": "rgb(186, 36, 41)",
      "dark-blue": "rgb(0, 125, 219)",
    },

    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
