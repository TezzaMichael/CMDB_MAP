/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'server-img': "url('/src/assets/server.svg')",
      }
    },
  },
  plugins: [],
}
