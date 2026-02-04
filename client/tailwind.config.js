/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'deep-oak': '#4B3621',
        'warm-white': '#FAF8F5',
        'oak-light': '#6B5344',
        'oak-dark': '#3A2A19',
        cream: '#F5F0E8',
        'gold-accent': '#C9A961',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
