import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorMode } from '@chakra-ui/react';

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const { colorMode, setColorMode } = useColorMode();

  // Load settings from localStorage or use defaults
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('heavyhitr-theme');
    return saved || colorMode || 'dark';
  });

  // Sync theme with Chakra UI's color mode
  useEffect(() => {
    if (theme === 'light' || theme === 'dark') {
      setColorMode(theme);
    }
  }, [theme, setColorMode]);

  const [rounds, setRounds] = useState(() => {
    const saved = localStorage.getItem('heavyhitr-rounds');
    return saved ? parseInt(saved) : 3;
  });

  const [roundLength, setRoundLength] = useState(() => {
    const saved = localStorage.getItem('heavyhitr-round-length');
    return saved ? parseInt(saved) : 180;  // 3 minutes default
  });

  const [breakLength, setBreakLength] = useState(() => {
    const saved = localStorage.getItem('heavyhitr-break-length');
    return saved ? parseInt(saved) : 60;  // 1 minute default
  });

  const [musicVolume, setMusicVolume] = useState(() => {
    const saved = localStorage.getItem('heavyhitr-music-volume');
    return saved ? parseFloat(saved) : 0.5;  // 50% default
  });

  const [cueVolume, setCueVolume] = useState(() => {
    const saved = localStorage.getItem('heavyhitr-cue-volume');
    return saved ? parseFloat(saved) : 0.8;  // 80% default
  });

  const [sfxVolume, setSfxVolume] = useState(() => {
    const saved = localStorage.getItem('heavyhitr-sfx-volume');
    return saved ? parseFloat(saved) : 0.7;  // 70% default
  });

  const [cueFrequency, setCueFrequency] = useState(() => {
    const saved = localStorage.getItem('heavyhitr-cue-frequency');
    return saved || 'medium';  // medium default
  });

  // Save settings to localStorage on change
  useEffect(() => {
    localStorage.setItem('heavyhitr-theme', theme);
    localStorage.setItem('heavyhitr-rounds', rounds);
    localStorage.setItem('heavyhitr-round-length', roundLength);
    localStorage.setItem('heavyhitr-break-length', breakLength);
    localStorage.setItem('heavyhitr-music-volume', musicVolume);
    localStorage.setItem('heavyhitr-cue-volume', cueVolume);
    localStorage.setItem('heavyhitr-sfx-volume', sfxVolume);
    localStorage.setItem('heavyhitr-cue-frequency', cueFrequency);
  }, [
    theme, rounds, roundLength, breakLength,
    musicVolume, cueVolume, sfxVolume, cueFrequency
  ]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    setColorMode(newTheme);
  };

  return (
    <SettingsContext.Provider value={{
      theme, setTheme: handleThemeChange,
      rounds, setRounds,
      roundLength, setRoundLength,
      breakLength, setBreakLength,
      musicVolume, setMusicVolume,
      cueVolume, setCueVolume,
      sfxVolume, setSfxVolume,
      cueFrequency, setCueFrequency
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}