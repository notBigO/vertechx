import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@premieroctet/next-admin/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "rotate-in": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(90deg)" },
        },
        "rotate-out": {
          "0%": { transform: "rotate(90deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        "shine-pulse": {
          "0%": {
            "background-position": "0% 0%",
          },
          "50%": {
            "background-position": "100% 100%",
          },
          "100%": {
            "background-position": "0% 0%",
          },
        },
        shine: {
          "0%": {
            "background-position": "0% 0%",
          },
          "50%": {
            "background-position": "100% 100%",
          },
          "100%": {
            "background-position": "0% 0%",
          },
        },
      },
      animation: {
        "rotate-in": "rotate-in 0.3s ease-in-out",
        "rotate-out": "rotate-out 0.3s ease-in-out",
        shine: "shine var(--duration) infinite linear",
      },
      colors: {
        nextadmin: {
          background: {
            default: "#0f0f0f",
          },
        },
        "dark-nextadmin": {
          background: {
            default: "#0f0f0f",
          },
        },
        background: "#0f0f0f",
        secondary: "#c04cff",
        primary: "#7c09ff",
        foreground: "var(--foreground)",
      },
    },
  },
  presets: [require("@premieroctet/next-admin/preset")],
};

export default config;
