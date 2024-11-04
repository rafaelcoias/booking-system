import { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",

        three: '350px',
        four: "400px",
        five: "500px",
        six: "600px",
        seven: "700px",
        eight: "800px",
        nine: "900px",
        thousand: "1000px",
        thousandOne: "1100px",
        thousandTwo: "1200px",
        thousandThree: "1300px",
        thousandFour: "1400px",
        thousandFive: "1500px",
      },
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        success: "var(--success)",
        error: "var(--error)",
        warning: "var(--warning)",
        info: "var(--info)",
        "primary-dark": "var(--primary-dark)",
        "primary-light": "var(--primary-light)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

export default config;