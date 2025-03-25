import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  Box,
  Flex,
  useColorMode,
  useToast,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton
} from '@chakra-ui/react';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Workout from './pages/Workout';
import Header from './components/Header';
import Footer from './components/Footer';
import { useSettings } from './contexts/SettingsContext';

function App({ updateSW }) {
  const { theme } = useSettings();
  const { setColorMode } = useColorMode();
  const toast = useToast();
  const [needRefresh, setNeedRefresh] = useState(false);

  // Sync Chakra's color mode with our app's theme setting
  useEffect(() => {
    if (theme === 'light' || theme === 'dark') {
      setColorMode(theme);
    }
  }, [theme, setColorMode]);

  // Custom update handler that will show a toast notification
  const handleServiceWorkerUpdate = () => {
    if (typeof updateSW === 'function') {
      // Create a custom notification for updates
      const update = () => {
        updateSW(true);
        setNeedRefresh(false);
      };

      // Override the onNeedRefresh callback
      window.addEventListener('sw-update-found', () => {
        setNeedRefresh(true);
      });

      // Check for updates every hour
      const intervalId = setInterval(() => {
        updateSW();
      }, 60 * 60 * 1000);

      return () => clearInterval(intervalId);
    }
  };

  useEffect(handleServiceWorkerUpdate, [updateSW]);

  return (
    <Flex direction="column" minHeight="100vh">
      {needRefresh && (
        <Alert status="info">
          <AlertIcon />
          <AlertTitle mr={2}>Update Available!</AlertTitle>
          <AlertDescription>
            A new version of HeavyHITR is available.
          </AlertDescription>
          <Button colorScheme="blue" ml={4} onClick={() => updateSW(true)}>
            Update Now
          </Button>
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={() => setNeedRefresh(false)}
          />
        </Alert>
      )}
      <Header />
      <Box flex="1" as="main" px={4} py={6} maxWidth="container.xl" mx="auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workout" element={<Workout />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Box>
      <Footer />
    </Flex>
  );
}

export default App;