import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import App from './App';
import { SettingsProvider } from './contexts/SettingsContext';
import { AudioProvider } from './contexts/AudioContext';
import { WorkoutProvider } from './contexts/WorkoutContext';
import { registerSW } from 'virtual:pwa-register';

// Define Chakra theme with color mode config
const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      50: '#fff5f0',
      100: '#ffe6d9',
      200: '#ffc7b3',
      300: '#ffa980',
      400: '#ff8a4d',
      500: '#ff5722', // Primary color (orange)
      600: '#ee3900',
      700: '#c42e00',
      800: '#9c2500',
      900: '#7c1e00',
    }
  }
});

// Register service worker with update handling
const updateSW = registerSW({
  onNeedRefresh() {
    console.log('New content available, click on reload button to update.');
  },
  onOfflineReady() {
    console.log('App ready to work offline');
  },
  immediate: true
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Add ColorModeScript before ChakraProvider */}
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <SettingsProvider>
          <AudioProvider>
            <WorkoutProvider>
              <App updateSW={updateSW} />
            </WorkoutProvider>
          </AudioProvider>
        </SettingsProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
);