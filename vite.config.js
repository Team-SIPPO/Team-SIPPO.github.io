import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, existsSync, renameSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = dirname(fileURLToPath(import.meta.url));

function pagesBuildFallback() {
  return {
    name: 'pages-build-fallback',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.url === '/' || req.url === '/index.html') {
          req.url = '/app.html';
        }
        next();
      });
    },
    closeBundle() {
      const builtAppHtml = resolve(projectRoot, 'dist/app.html');
      const builtIndexHtml = resolve(projectRoot, 'dist/index.html');
      const built404Html = resolve(projectRoot, 'dist/404.html');

      if (existsSync(builtAppHtml)) {
        renameSync(builtAppHtml, builtIndexHtml);
      }

      if (existsSync(builtIndexHtml)) {
        copyFileSync(builtIndexHtml, built404Html);
      }
    },
  };
}

export default defineConfig({
  root: 'site-src',
  base: '/',
  publicDir: 'public',
  plugins: [react(), pagesBuildFallback()],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    assetsDir: 'assets/app',
    rollupOptions: {
      input: resolve(projectRoot, 'site-src/app.html'),
      output: {
        entryFileNames: 'assets/app/index.js',
        chunkFileNames: 'assets/app/[name].js',
        assetFileNames: 'assets/app/index[extname]',
      },
    },
  },
});
