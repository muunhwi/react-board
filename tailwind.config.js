/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        x_move: {
          "0%": {
            transform: "translateX(-100%)",
            visibility: "hidden",
          },
          "100%": {
            transform: "translateX(0px)",
            visibility: "visible",
          },
        },
        x_rev_move: {
          "0%": {
            transform: "translateX(0px)",
            visibility: "visible",
          },
          "100%": {
            transform: "translateX(-100%)",
            visibility: "hidden",
          },
        },
        fade_in_3: {
          "0%": {
            opacity: 0,
            visibility: "hidden",
          },
          "100%": {
            opacity: 0.3,
            visibility: "visible",
          },
        },
        fade_out_3: {
          "0%": {
            opacity: 0.3,
            visibility: "visible",
          },
          "100%": {
            opacity: 0,
            visibility: "hidden",
          },
        },
        fade_in: {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        fade_out: {
          "0%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0,
          },
        },
      },
      animation: {
        move: "x_move 0.3s ease-in forwards",
        revMove: "x_rev_move 0.3s ease-in forwards",
        fadeIn3: "fade_in_3 0.3s ease-in forwards",
        fadeOut3: "fade_out_3 0.3s ease-in forwards",
        fadeIn: "fade_in 0.5s  ease-in forwards ",
        fadeOut: "fade_out 0.5s  ease-in forwards ",
      },
    },
  },
  plugins: [],
};
