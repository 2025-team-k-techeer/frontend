/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,html}'],
  // ... 기존 코드 ...
  theme: {
    extend: {
      colors: {
        'sage-bg': '#EAF0EE',
        'sage-accent': '#6B8A7A',
        'brand-charcoal': '#2D3748',
        'icon-gray': '#A0AEC0',
      },
      fontFamily: {
        Pretendard: ['Pretendard', 'sans-serif'],
        PlexSans: ['PlexSans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
