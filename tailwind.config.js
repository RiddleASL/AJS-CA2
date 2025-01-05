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
      danger: '#590902',
      white: '#fff',
      black: '#0D0000',
      bg: {
        dark: '#011126',
        light: '#4D6380'
      }
    },
    extend: {},
  },
  plugins: [],
}