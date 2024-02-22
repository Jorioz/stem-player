import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      width: {
        "128": "32rem",
        "144": "36rem",
        "160": "40rem",
      },
      height: {
        "128": "32rem",
        "144": "36rem",
        "160": "40rem",
      },
      boxShadow: {
        "stem-shadow":
          "inset -23px -39px 44px 7px rgba(0,0,0,0.2),0px 10px 12px -5px rgba(0,0,0,0.5),inset 7px 10px 27px -3px rgba(255,255,255,0.3)",
        "stem-inner-button":
          "inset 0px -3px 5px 0px rgba(0,0,0,0.05),inset 0px 5px 5px -5px rgba(255,255,255,0.3)",
        "stem-inner-mid":
          "inset 0px 0px 9px 0px rgba(0,0,0,0.2),0px -3px 10px 0px rgba(0,0,0,0.1)",
        "stem-inner-top":
          "inset 0px 10px 21px 0px rgba(0,0,0,0.1),inset 0px -14px 13px -14px rgba(255,255,255,0.3),0px -17px 52px -12px rgba(0,0,0,0.1)",
        "stem-inner-bottom":
          "inset 0px 10px 21px 0px rgba(0,0,0,0.1),inset 0px -14px 13px -14px rgba(255,255,255,0),0px -17px 52px -12px rgba(0,0,0,0.1)",
        "stem-inner-left":
          "inset -5px 15px 13px 0px rgba(0,0,0,0.1),inset 0px -10px 20px -5px rgba(255,255,255,0.15),0px -3px 10px 0px rgba(0,0,0,0.1)",
        "stem-inner-right":
          "inset 5px 15px 13px 0px rgba(0,0,0,0.1),inset 0px -10px 20px -5px rgba(255,255,255,0.15),0px -3px 10px 0px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
};
export default config;
