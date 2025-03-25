import React, { createContext, useContext, useState, useEffect } from 'react';
import { Howl } from 'howler';
import { useSettings } from './SettingsContext';
import { motion, AnimatePresence } from 'framer-motion'; // Using Framer Motion for animations

// Audio context to manage all audio playback
const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const { musicVolume, cueVolume, sfxVolume } = useSettings();
  const [isAudioInitialized, setIsAudioInitialized] = useState(false);
  const [music, setMusic] = useState(null);
  const [currentCue, setCurrentCue] = useState(null);
  const [cuePool, setCuePool] = useState([]);
  const [lastPlayedCues, setLastPlayedCues] = useState([]);
  const [visibleCueText, setVisibleCueText] = useState(''); // Add this for visible cue text
  const [cueTimeoutId, setCueTimeoutId] = useState(null); // For managing cue visibility duration

  // Preloaded audio instances
  const [preloadedAudio, setPreloadedAudio] = useState({
    music: {},
    cues: {},
    sfx: {}
  });

  // Initialize audio on first user interaction
  const initializeAudio = () => {
    if (isAudioInitialized) return;

    // Preload all audio files
    const musicFiles = ['workout_beat1.mp3', 'workout_beat2.mp3', 'workout_beat3.mp3'];
    const sfxFiles = ['bell_start.mp3', 'bell_end.mp3', 'countdown.mp3'];

    // Load music
    const musicInstances = {};
    musicFiles.forEach(file => {
      musicInstances[file] = new Howl({
        src: [`/audio/music/${file}`],
        loop: true,
        volume: musicVolume,
        preload: true,
      });
    });

    // Load sound effects
    const sfxInstances = {};
    sfxFiles.forEach(file => {
      sfxInstances[file] = new Howl({
        src: [`/audio/sfx/${file}`],
        volume: sfxVolume,
        preload: true,
      });
    });

    // Load audio cues (will be populated from cueSystem.js)
    // This is just the structure, actual files will be loaded when needed
    setPreloadedAudio({
      music: musicInstances,
      cues: {},
      sfx: sfxInstances
    });

    // Load cue data
    fetch('/audio/cues/cuePool.json')
      .then(response => response.json())
      .then(data => {
        setCuePool(data);
        console.log('Audio cue pool loaded:', data.length);
      })
      .catch(error => console.error('Error loading cue pool:', error));

    setIsAudioInitialized(true);
    console.log('Audio system initialized');
  };

  // Update volumes when settings change
  useEffect(() => {
    if (!isAudioInitialized) return;

    // Update music volume
    Object.values(preloadedAudio.music).forEach(sound => {
      sound.volume(musicVolume);
    });

    // Update cues volume
    Object.values(preloadedAudio.cues).forEach(sound => {
      sound.volume(cueVolume);
    });

    // Update sound effects volume
    Object.values(preloadedAudio.sfx).forEach(sound => {
      sound.volume(sfxVolume);
    });
  }, [musicVolume, cueVolume, sfxVolume, isAudioInitialized, preloadedAudio]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (cueTimeoutId) {
        clearTimeout(cueTimeoutId);
      }
    };
  }, [cueTimeoutId]);

  // Play a sound effect
  const playSoundEffect = (name) => {
    if (!isAudioInitialized) return;

    const sfx = preloadedAudio.sfx[`${name}.mp3`];
    if (sfx) {
      sfx.play();
    }
  };

  // Play bell start sound
  const playBellStart = () => {
    playSoundEffect('bell_start');
  };

  // Play bell end sound
  const playBellEnd = () => {
    playSoundEffect('bell_end');
  };

  // Play countdown sound
  const playCountdown = () => {
    playSoundEffect('countdown');
  };

  // Play a random relevant cue based on workout state
  const playCurrentCue = () => {
    if (cuePool.length > 0) {
      // Select a random cue from the pool
      const randomIndex = Math.floor(Math.random() * cuePool.length);
      playCue(cuePool[randomIndex]);
    }
  };

  // Play background music
  const playMusic = (track) => {
    if (!isAudioInitialized) return;

    // Stop current music if playing
    if (music) {
      music.stop();
    }

    const musicTrack = preloadedAudio.music[`${track}.mp3`] ||
                       preloadedAudio.music['workout_beat1.mp3'];

    if (musicTrack) {
      musicTrack.play();
      setMusic(musicTrack);
    }
  };

  // Stop background music
  const stopMusic = () => {
    if (music) {
      music.stop();
      setMusic(null);
    }
  };

  // Function to sanitize filenames - remove all punctuation and replace spaces with underscores
  const sanitizeFilename = (text) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, '') // Remove all punctuation
      .replace(/\s+/g, '_');   // Replace spaces with underscores
  };

  // Play an audio cue
  const playCue = (cue) => {
    if (!isAudioInitialized || !cue) return;

    // Don't play the same cue twice in a row
    if (lastPlayedCues.includes(cue.cue)) return;

    // Check if we already have this cue loaded
    if (!preloadedAudio.cues[cue.cue]) {
      // Load the cue with sanitized filename
      preloadedAudio.cues[cue.cue] = new Howl({
        src: [`/audio/cues/${sanitizeFilename(cue.cue)}.mp3`],
        volume: cueVolume,
        onend: () => {
          setCurrentCue(null);
        }
      });
    }

    // Play the cue
    preloadedAudio.cues[cue.cue].play();
    setCurrentCue(cue);

    // Set the visible cue text (for display in the UI)
    setVisibleCueText(cue.cue);

    // Clear previous timeout if it exists
    if (cueTimeoutId) {
      clearTimeout(cueTimeoutId);
    }

    // Hide the cue text after a duration (5 seconds)
    const timeoutId = setTimeout(() => {
      setVisibleCueText('');
    }, 5000);
    setCueTimeoutId(timeoutId);

    // Add to last played cues (to avoid repetition)
    setLastPlayedCues(prev => {
      const newLastPlayed = [cue.cue, ...prev].slice(0, 3);
      return newLastPlayed;
    });
  };

  // Clear current cue (for when stopping or resetting workout)
  const clearCurrentCue = () => {
    setVisibleCueText('');
    setCurrentCue(null);
    if (cueTimeoutId) {
      clearTimeout(cueTimeoutId);
      setCueTimeoutId(null);
    }
  };

  return (
    <AudioContext.Provider
      value={{
        playSoundEffect,
        playMusic,
        stopMusic,
        playCue,
        playBellStart,
        playBellEnd,
        playCountdown,
        playCurrentCue,
        clearCurrentCue,
        initializeAudio,
        isAudioInitialized,
        currentCue,
        cuePool,
        visibleCueText, // Expose the visible cue text for use in UI
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);