/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx", 
    "./src/**/*.{js,jsx,ts,tsx}", 
    "./app/**/*.{js,jsx,ts,tsx}", 
    "./components/**/*.{js,jsx,ts,tsx}",
    "./mini-apps/**/*.{js,jsx,ts,tsx}",
    "./(tabs)/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        boldText: '#F1F5F9',
        background: "#05112e",
        primary: "#0F172ACC",
        blueText: '#137FEC',
        secondary: "#137FEC",
        normalText: "#94A3B8",
        light: {
          100: "#D6C6FF",
          200: "#A8B5DB",
          300: "#9CA4AB",
        },
        dark: {
          100: "#221f3d",
          200: "#0f0d23",
        },
        accent: "#AB8BFF",
        introComponent: {
          bg: "hsl(0, 100%, 74%)",
          purple350: "hsl(246, 25%, 77%)",
          purple700: "hsl(248, 32%, 49%)",
          green400: "hsl(154, 59%, 51%)",
          gray900: "hsl(249, 10%, 26%) ",
        }
      },
      fontFamily: {
        poppinsRegular: ["Poppins_400Regular"],
        poppinsSemiBold: ["Poppins_600SemiBold"],
        poppinsMedium: ["Poppins_500Medium"],
        poppinsBold: ["Poppins_700Bold"],
      },
    },
  },
  plugins: [],
}