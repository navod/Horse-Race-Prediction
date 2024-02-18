/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/src/assets/backgrounds/background1.jpg')",
      },
      boxShadow: {
        "login-shadow": "0px 0px 16px 2px rgba(0,0,0,0.75);",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
