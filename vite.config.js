import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: 'generateSW',
      registerType: 'autoUpdate', // Use autoUpdate which handles revisioning
      includeAssets: ['**/*'], // Include all assets
      devOptions: {
        enabled: true, // Enable PWA in development
        type: 'module',
        navigateFallback: undefined // Don't use navigateFallback in dev
      },
      workbox: {
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        // Remove globDirectory and use more reliable configuration
        globPatterns: [
          '**/*.{js,css,html,ico,png,svg,jpg,jpeg,gif}'
        ],
        // Don't use additionalManifestEntries to avoid revision warnings
        runtimeCaching: [
          {
            urlPattern: /\/images\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          },
          {
            urlPattern: /\/audio\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'audio-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          },
          {
            urlPattern: /\.(?:js|css)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources'
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              }
            }
          }
        ],
        // Add explicit navigation fallback for SPA
        navigateFallback: 'index.html',
        // Ensure index.html is always fetched from network first then cached
        navigateFallbackDenylist: [/^\/api\//] // Don't use fallback for API calls
      },
      manifest: {
        name: 'HeavyHITR Boxing Workout',
        short_name: 'HeavyHITR',
        description: 'Boxing training app with audio cues',
        theme_color: '#000000',
        background_color: '#121212',
        display: 'standalone',
        icons: [
          {
            src: '/images/logo.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/images/logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          }
        ],
        start_url: '/',
        scope: '/'
      }
    })
  ],
  build: {
    outDir: 'dist'
  }
});