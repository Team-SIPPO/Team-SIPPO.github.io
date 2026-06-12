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
      maxWidth: {
        'container-narrow': 'var(--container-narrow)',
        'container-default': 'var(--container-default)',
        'container-wide': 'var(--container-wide)',
        reading: 'var(--reading)',
      },
      spacing: {
        'page-top': 'var(--pad-y-top)',
        'page-bottom': 'var(--pad-y-bottom)',
        'page-x': 'var(--pad-x)',
      },
      gap: {
        grid: 'var(--gap-grid)',
        section: 'var(--gap-section)',
      },
      fontSize: {
        'h1-hero': 'var(--fs-h1-hero)',
        'h2-section': 'var(--fs-h2-section)',
        'h3-sub': 'var(--fs-h3-sub)',
      },
    },
  },
  plugins: [],
};
