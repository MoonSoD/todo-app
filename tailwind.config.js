module.exports = {
  purge: ["./pages/**/*.tsx", "./src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        lightgreen: "#5CDB59",
        "gray-description": "#515151",
        background: "#F1F1F1",
        card: "#F5F5F5",
      },
      borderRadius: {
        none: "0",
        xs: "0.5rem",
      },
      width: {
        list: "40.625rem",
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      cursor: ["disabled"],
    },
  },
  plugins: [],
};
