/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/*/.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
colors: {
        'purple': '#7B2CBF',
        'lpurple': '#AD49E1',
      },
},
  },
  plugins: [],
}
