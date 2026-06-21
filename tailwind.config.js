/** @type {import('tailwindcss').Config} */
export default {
  content: ['./site-src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans JP"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      },
      colors: {
        // 値は index.css の :root が正(二重管理しない)
        ink: 'var(--color-ink)',
        accent: 'var(--color-accent)',
      },
      maxWidth: {
        'container-narrow': 'var(--container-narrow)',
        'container-default': 'var(--container-default)',
        'container-wide': 'var(--container-wide)',
        'container-board': 'var(--container-board)',
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
