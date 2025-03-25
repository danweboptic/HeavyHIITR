import React, { createContext, useContext, useState, useEffect } from 'react';
import { Howl } from 'howler';
import { useSettings } from './SettingsContext';

// Audio context to manage all audio playback
const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const { musicVolume, cuesVolume, soundEffectsVolume, useMusic, useCues, useSoundEffects } = useSettings();
  const [isAudioInitialized, setIsAudioInitialized] = useState(false);
  const [music, setMusic] = useState(null);
  const [currentCue, setCurrentCue] = useState(null);
  const [cuePool, setCuePool] = useState([]);
  const [lastPlayedCues, setLastPlayedCues] = useState([]);

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
        volume: musicVolume / 100,
        preload: true,
      });
    });

    // Load sound effects
    const sfxInstances = {};
    sfxFiles.forEach(file => {
      sfxInstances[file] = new Howl({
        src: [`/audio/sfx/${file}`],
        volume: soundEffectsVolume / 100,
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
      sound.volume(musicVolume / 100);
    });
    
    // Update cues volume
    Object.values(preloadedAudio.cues).forEach(sound => {
      sound.volume(cuesVolume / 100);
    });
    
    // Update sound effects volume
    Object.values(preloadedAudio.sfx).forEach(sound => {
      sound.volume(soundEffectsVolume / 100);
    });
  }, [musicVolume, cuesVolume, soundEffectsVolume, isAudioInitialized, preloadedAudio]);

  // Play a sound effect
  const playSoundEffect = (name) => {
    if (!isAudioInitialized || !useSoundEffects) return;
    
    const sfx = preloadedAudio.sfx[`${name}.mp3`];
    if (sfx) {
      sfx.play();
    }
  };

  // Play background music
  const playMusic = (track) => {
    if (!isAudioInitialized || !useMusic) return;
    
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

  // Play an audio cue
  const playCue = (cue) => {
    if (!isAudioInitialized || !useCues || !cue) return;
    
    // Don't play the same cue twice in a row
    if (lastPlayedCues.includes(cue.cue)) return;
    
    // Check if we already have this cue loaded
    if (!preloadedAudio.cues[cue.cue]) {
      // Load the cue
      preloadedAudio.cues[cue.cue] = new Howl({
        src: [`/audio/cues/${cue.cue.replace(/\s+/g, '_').toLowerCase()}.mp3`],
        volume: cuesVolume / 100,
        onend: () => {
          setCurrentCue(null);
        }
      });
    }
    
    // Play the cue
    preloadedAudio.cues[cue.cue].play();
    setCurrentCue(cue);
    
    // Add to last played cues (to avoid repetition)
    setLastPlayedCues(prev => {
      const newLastPlayed = [cue.cue, ...prev].slice(0, 3);
      return newLastPlayed;
    });
  };

  return (
    <AudioContext.Provider
      value={{
        playSoundEffect,
        playMusic,
        stopMusic,
        playCue,
        initializeAudio,
        isAudioInitialized,
        currentCue,
        cuePool,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);