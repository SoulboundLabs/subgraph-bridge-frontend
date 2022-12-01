module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        18: "4.5rem",
        112: "28rem",
        120: "30rem",
      },
    },
  },
  variants: {
    fill: ["hover", "focus"],
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
  ],
  daisyui: {},
};
