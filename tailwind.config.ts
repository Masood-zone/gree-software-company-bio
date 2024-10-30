import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)", // Primary color
        secondary: "var(--secondary)", // Secondary color
        text: {
          DEFAULT: "var(--text)", // Primary text color
          light: "var(--text-light)", // Light text color
          dark: "var(--text-dark)", // Dark text color
        },
        bg: "var(--bg)", // Background color
        white: "var(--white)", // White color
        black: "var(--black)", // Black color
      },
    },
  },
  plugins: [],
};
export default config;
