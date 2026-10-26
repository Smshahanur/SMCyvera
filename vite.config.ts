import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  const rootDir = import.meta.dirname;
  const htmlFiles = fs.readdirSync(rootDir).filter(file => file.endsWith('.html'));
  const input = Object.fromEntries(
    htmlFiles.map(file => [file.replace(/\.html$/, ''), path.resolve(rootDir, file)])
  );

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'serve-zip',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url === '/SMCyvera-updated.zip') {
              const zipPath = path.resolve(rootDir, 'public/SMCyvera-updated.zip');
              if (fs.existsSync(zipPath)) {
                res.setHeader('Content-Type', 'application/zip');
                res.setHeader('Content-Disposition', 'attachment; filename="SMCyvera-updated.zip"');
                fs.createReadStream(zipPath).pipe(res);
                return;
              }
            }
            next();
          });
        },
      },
    ],
    build: {
      rollupOptions: {
        input,
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(rootDir, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
