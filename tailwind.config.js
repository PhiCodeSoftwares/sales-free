/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      'primary': '#338c4b',
      'onPrimary': '#ffffff',
      'secondary': '#a5bebb',
      'onSecondary': '#ffffff',
      'background': '#ffffff',
      'onBackground': '#092d36',
      'white': '#ffffff',
      'black': '#000000',
      'gray': '#808080',
      'error': '#E80000',
      'warning': '#FF6600',
      'success': '#28a745',
      'info': '#17a2b8',
      'light': '#f8f9fa',
      'dark': '#343a40',
      'muted': '#6c757d',
      'accent': '#e83e8c',
      'onAccent': '#ffffff'
    },
    extend: {},
  },
  plugins: [],
};
