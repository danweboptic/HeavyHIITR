import { Howl } from 'howler';

/**
 * Audio service for managing audio playback
 */
export const audioService = {
  /**
   * Preloads audio files
   * 
   * @param {Array} audioFiles - Array of audio file objects
   * @returns {Promise} Promise resolving when all files are loaded
   */
  preloadAudio: (audioFiles) => {
    const promises = audioFiles.map(file => {
      return new Promise((resolve, reject) => {
        const sound = new Howl({
          src: [file.src],
          preload: true,
          onload: resolve,
          onloaderror: reject
        });
      });
    });
    
    return Promise.all(promises);
  },
  
  /**
   * Creates a new audio instance
   * 
   * @param {string} src - Audio file path
   * @param {Object} options - Howler options
   * @returns {Howl} Howler instance
   */
  createAudio: (src, options = {}) => {
    return new Howl({
      src: [src],
      ...options
    });
  },
  
  /**
   * Unloads all audio to free memory
   */
  unloadAll: () => {
    Howler.unload();
  },
  
  /**
   * Sets global volume
   * 
   * @param {number} volume - Volume level (0-1)
   */
  setGlobalVolume: (volume) => {
    Howler.volume(volume);
  }
};

/**
 * Audio cue manager for cue-specific functionality
 */
export const audioCueManager = {
  /**
   * Loads all audio cues based on cue list
   * 
   * @param {Array} cues - List of cue objects
   * @returns {Object} Map of loaded cue audio instances
   */
  loadCueAudio: (cues) => {
    const cueAudio = {};
    
    cues.forEach(cue => {
      const filename = cue.cue.replace(/\s+/g, '_').toLowerCase();
      cueAudio[cue.cue] = new Howl({
        src: [`/audio/cues/${filename}.mp3`],
        preload: true
      });
    });
    
    return cueAudio;
  }
};