import { pageCache, imageCache, staticResourceCache, offlineFallback } from 'workbox-recipes';
import { setCacheNameDetails } from 'workbox-core';

// Set custom cache names
setCacheNameDetails({
  prefix: 'heavyhitr',
  suffix: 'v1',
});

// Cache pages
pageCache();

// Cache images
imageCache();

// Cache static resources
staticResourceCache();

// Provide an offline fallback
offlineFallback({
  pageFallback: '/offline.html'
});