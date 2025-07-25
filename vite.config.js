import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';
import mkcert from 'vite-plugin-mkcert';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ config loaded
console.log('✅ vite.config.js loaded');

const BASE_URL = 'https://api.zipkku.shop'; // 간단하게 고정

export default defineConfig({
  resolve: {
    alias: {
      '/src': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    mkcert(),
    react(),
    svgr(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.svg',
        'favicon.ico',
        'robots.txt',
        'apple-touch-icon.png',
      ],
      manifest: {
        name: '집 꾸',
        short_name: '집 꾸',
        start_url: '.',
        display: 'standalone',
        background_color: '#FFFFFF',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],
  server: {
    https: true,
    proxy: {
      '/api': {
        target: BASE_URL,
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.error('❌ Proxy Error:', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('➡️ Proxy Request:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('⬅️ Proxy Response:', proxyRes.statusCode, req.url);
          });
        },
      },
    },
  },
});
