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
        secondary: { default: "#ffc510", dark: "#FFC100" },
        black: {
          default: "#000000",
          "100": "rgba(0, 0, 0, 0.1)",
          "200": "rgba(0, 0, 0, 0.2)",
          "300": "rgba(0, 0, 0, 0.3)",
          "400": "rgba(0, 0, 0, 0.4)",
          "500": "rgba(0, 0, 0, 0.5)",
          "600": "rgba(0, 0, 0, 0.6)",
          "700": "rgba(0, 0, 0, 0.7)",
          "800": "rgba(0, 0, 0, 0.8)",
          "900": "rgba(0, 0, 0, 0.9)",
        },
        accent: "#ea218d",
        accent2: "#5ee2b3",
        error: "#ff5252",
        info: "#2196f3",
        success: "#4caf50",
        warning: "#ffc107",
        "gray-variant": "#c4c4c4",
        "gray-variant1": "#f0f0f0",
        "gray-variant2": "#b5b5b5",
        "gray-variant3": "#8b8b8b",
        // ...
      },
      fontFamily: {
        inter: ["Inter"],
        quicksand: ["Quicksand"],
        josefinsans: ["JosefinSans"],
      },
      borderWidth: {
        "3": "3px",
      },
    },
  },
  variants: {},
  plugins: [require("tailwindcss-plugin-fancy")],
};
