import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dracula: {
          foreground: "#F8F8F2",
          background: "#282A36",
          selection: "#44475A",
          comment: "#6272A4",
          red: "#FF5555",
          orange: "#FFB86C",
          yellow: "#F1FA8C",
          green: "#50FA7B",
          purple: "#BD93F9",
          cyan: "#8BE9FD",
          pink: "#FF79C6",
        },
      },
    },
  },
  plugins: [],
};
export default config;
