module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.vue", "./src/**/*.jsx"],
  theme: {
    screens: {
      sm: { min: "600px" },
      md: { min: "960px" },
      lg: { min: "1264px" },
      xl: { min: "1904px" },
    },
    fill: (theme) => ({
      secondary: theme("colors.secondary"),
      accent: theme("colors.accent"),
      accent2: theme("colors.accent2"),
    }),
    extend: {
      fontSize: {
        xxs: ".625rem",
        tinier: ".813rem",
        "1xl": "1.375rem",
        "2-5xl": "1.75rem",
        "3-5xl": "2rem",
        "4-5xl": "2.5rem",
      },
      colors: {
        primary: { default: "#4d31bf", light: "#6B4FDD" },
        secondary: "#ffc510",
        accent: "#ea218d",
        accent2: "#5ee2b3",
        error: "#ff5252",
        info: "#2196f3",
        success: "#4caf50",
        warning: "#ffc107",
        // ...
      },
      fontFamily: {
        inter: ["Inter"],
        quicksand: ["Quicksand"],
      },
    },
  },
  variants: {},
  plugins: [require("tailwindcss-plugin-fancy")],
};
