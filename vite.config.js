import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
  plugins: [
    mkcert(),
    react(),
    svgr(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'ARApp',
        short_name: 'ARApp',
        start_url: '.',
        display: 'standalone',
        background_color: '#ffffff',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],
});
