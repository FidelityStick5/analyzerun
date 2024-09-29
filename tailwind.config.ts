import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 250ms forwards ease-in-out",
      },
      keyframes: {
        fadeIn: {
          from: {
            opacity: "0%",
            transform: "translateY(-8px)",
          },
          to: {
            opacity: "100%",
            transform: "translateY(0)",
          },
        },
      },
      colors: {
        text: "var(--text)",
        background: "var(--background)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        secondary20: "var(--secondary20)",
        accent: "var(--accent)",
      },
    },
  },
  plugins: [],
};
export default config;
