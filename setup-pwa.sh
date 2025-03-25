#!/bin/bash

# Create the necessary directories if they don't exist
mkdir -p public/images
mkdir -p public/audio/cues
mkdir -p public/audio/music
mkdir -p public/audio/sfx

# Create placeholder favicon and logo if needed
echo "Creating placeholder favicon and logo if they don't exist"
if [ ! -f public/images/favicon.ico ]; then
  echo "Creating favicon.ico placeholder"
  cat > public/images/favicon.ico << EOF
    <!-- This is a placeholder. Replace with actual favicon -->
EOF
fi

if [ ! -f public/images/logo.png ]; then
  echo "Creating logo.png placeholder"
  # Generate a simple colored square as a logo placeholder
  # In a real project, you would use actual graphics
  cat > public/images/logo.png << EOF
    <!-- This is a placeholder. Replace with actual logo -->
EOF
fi

# Create manifest.json in the public directory
cat > public/manifest.json << EOF
{
  "short_name": "HeavyHITR",
  "name": "HeavyHITR Boxing Workout",
  "icons": [
    {
      "src": "/images/logo.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/images/logo.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    }
  ],
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#121212",
  "scope": "/"
}
EOF

echo "PWA setup complete!"