/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#04F9E8",
        buttonBackground: "#0b65bf",
        buttonBackgroundAlt: "#044982",
        dashboardSidebar: "#0d70d5",
        nftItemBackground: "#107eed",
      },
    },
  },
  plugins: [],
};
