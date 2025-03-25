// PWA configuration
export default {
  // Base config for the PWA plugin
  baseConfig: {
    registerType: 'prompt',
    devOptions: {
      enabled: true,
      type: 'module'
    }
  },
  
  // Manifest configuration
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
  },
  
  // Assets to include
  includeAssets: [
    'images/favicon.ico',
    'images/logo.png'
  ],
  
  // Workbox configuration
  workbox: {
    // More specific file patterns
    globPatterns: ['**/*.{js,css,html}'],
    // Ensure proper revisioning
    additionalManifestEntries: [
      { url: 'index.html', revision: Date.now().toString() },
      { url: '/images/logo.png', revision: null },
      { url: '/images/favicon.ico', revision: null }
    ],
    navigateFallback: 'index.html'
  }
};