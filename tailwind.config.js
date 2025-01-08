/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    colors: {
      primary: '#012E40',
      secondary: '#736565',
      success: '#598C260',
      warning: '#D95829',
      danger: '#d45348',
      white: '#fff',
      black: '#0D0000',
      bg: {
        // dark: '#011126',
        dark: {
          DEFAULT: '#011126',
          50: '#cff2ff',
          100: '#cff2ff',
          200: '#aaeaff',
          300: '#70e0ff',
          400: '#2dcbff',
          500: '#00a7ff',
          600: '#007eff',
          700: '#4935cd',
          800: '#3c2ea5',
          900: '#342c83'
        },
        light: '#4D6380'
      }
    },
    extend: {},
  },
  plugins: [],
}