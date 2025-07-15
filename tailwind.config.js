/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      colors: {
        'sage-bg': '#EAF0EE',
        'sage-accent': '#6B8A7A',
        'brand-charcoal': '#2D3748',
        'icon-gray': '#A0AEC0',
      },
    },
  },
  plugins: [],
};
