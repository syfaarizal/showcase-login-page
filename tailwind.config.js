/** @type {import('tailwindcss').Config} */
export default {
  // Tailwind is available but all primary styling uses custom CSS variables
  // to preserve the exact original design
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
