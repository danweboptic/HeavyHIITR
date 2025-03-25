// setup-pwa.js
const fs = require('fs');
const path = require('path');

// Create directories
const directories = [
  'public/images',
  'public/audio/cues',
  'public/audio/music',
  'public/audio/sfx'
];

directories.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Create placeholder favicon if it doesn't exist
const faviconPath = path.join(__dirname, 'public/images/favicon.ico');
if (!fs.existsSync(faviconPath)) {
  fs.writeFileSync(faviconPath, '');
  console.log('Created placeholder favicon.ico');
}

// Create placeholder logo if it doesn't exist
const logoPath = path.join(__dirname, 'public/images/logo.png');
if (!fs.existsSync(logoPath)) {
  fs.writeFileSync(logoPath, '');
  console.log('Created placeholder logo.png');
}

// Create manifest.json
const manifest = {
  short_name: 'HeavyHITR',
  name: 'HeavyHITR Boxing Workout',
  icons: [
    {
      src: '/images/logo.png',
      sizes: '192x192',
      type: 'image/png'
    },
    {
      src: '/images/logo.png',
      sizes: '512x512',
      type: 'image/png'
    }
  ],
  start_url: '/',
  display: 'standalone',
  theme_color: '#000000',
  background_color: '#121212'
};

fs.writeFileSync(
  path.join(__dirname, 'public/manifest.json'),
  JSON.stringify(manifest, null, 2)
);
console.log('Created manifest.json');

console.log('PWA setup complete!');