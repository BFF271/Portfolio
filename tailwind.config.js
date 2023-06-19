const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      primary: "#00C7FF",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      green: colors.green,
    },
    fontFamily: {
      sans: ["Inter var", ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};

// 239a3b
