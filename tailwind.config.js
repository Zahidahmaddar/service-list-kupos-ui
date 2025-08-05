/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "rating-border": "red",
        "rating-bottom": "#fef1ec",
      },
      boxShadow: {
        service: "0 3px 7px 3px rgba(0, 0, 0, .08)",
      },
      text: {
        blackText: "#464647",
      },
    },
  },
  plugins: [],
  safelist: [
    // Shadow utilities
    "shadow-xl",
    "shadow-red-950",
    "shadow-2xl",
    "shadow-service",
    "shadow",

    // Other important utilities
    "bg-white",
    "rounded-[20px]",
    "mb-[10px]",
    "mx-auto",
    "relative",
    "mb-[50px]",
    "p-[15px]",
    "flex",
    "justify-between",
    "items-center",
  ],
};
