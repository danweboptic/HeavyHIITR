import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Flex, useColorMode } from '@chakra-ui/react';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Workout from './pages/Workout';
import Header from './components/Header';
import Footer from './components/Footer';
import { useSettings } from './contexts/SettingsContext';

function App({ updateSW }) {
  const { theme } = useSettings();
  const { setColorMode } = useColorMode();

  // Sync Chakra's color mode with our app's theme setting
  useEffect(() => {
    if (theme === 'light' || theme === 'dark') {
      setColorMode(theme);
    }
  }, [theme, setColorMode]);

  // Check for SW updates
  useEffect(() => {
    if (typeof updateSW === 'function') {
      const intervalId = setInterval(() => {
        updateSW(true);
      }, 60 * 60 * 1000); // Check every hour

      return () => clearInterval(intervalId);
    }
  }, [updateSW]);

  return (
    <Flex direction="column" minHeight="100vh">
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