import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file directory with ESM compatible approach
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  // This would be a placeholder, ideally you'd add a real image
  fs.writeFileSync(logoPath, '');
  console.log('Created placeholder logo.png');
}

// Create placeholder audio files
const audioFiles = {
  'sfx': ['bell_start.mp3', 'bell_end.mp3', 'countdown.mp3'],
  'music': ['workout_beat1.mp3', 'workout_beat2.mp3', 'workout_beat3.mp3']
};

Object.entries(audioFiles).forEach(([folder, files]) => {
  files.forEach(file => {
    const filePath = path.join(__dirname, `public/audio/${folder}/${file}`);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '');
      console.log(`Created placeholder audio file: ${folder}/${file}`);
    }
  });
});

// Create manifest.json
const manifest = {
  short_name: 'HeavyHITR',
  name: 'HeavyHITR Boxing Workout',
  icons: [
    {
      src: '/images/logo.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'any maskable'
    },
    {
      src: '/images/logo.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any maskable'
    }
  ],
  start_url: '/',
  display: 'standalone',
  theme_color: '#000000',
  background_color: '#121212',
  scope: '/'
};

fs.writeFileSync(
  path.join(__dirname, 'public/manifest.json'),
  JSON.stringify(manifest, null, 2)
);
console.log('Created manifest.json');

console.log('Asset setup complete!');