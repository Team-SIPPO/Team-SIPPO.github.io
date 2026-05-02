/** @type {import('tailwindcss').Config} */
const techreateFontStack = [
  '"IBM Plex Sans JP"',
  'system-ui',
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'sans-serif',
];

export default {
  content: ['./site-src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: techreateFontStack,
        techreate: techreateFontStack,
      },
      colors: {
        ink: '#070707',
        techYellow: '#fff000',
        lineGray: '#c7c7c7',
      },
      boxShadow: {
        tag: '6px 7px 0 rgba(0, 0, 0, 0.18)',
      },
    },
  },
  plugins: [],
};
