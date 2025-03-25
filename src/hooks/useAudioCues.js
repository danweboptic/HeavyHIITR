import { useCallback } from 'react';
import { useAudio } from '../contexts/AudioContext';
import { useSettings } from '../contexts/SettingsContext';
import { selectCue } from '../utils/cueSystem';

const useAudioCues = () => {
  const { cuePool, playCue } = useAudio();
  const { cuesFrequency, useCues } = useSettings();
  
  // Keep track of cue timing to avoid too frequent cues
  let lastCueTime = 0;
  
  /**
   * Determines if a cue should be triggered based on workout parameters
   * and cue frequency settings
   */
  const shouldTriggerCue = (currentTime, roundLength) => {
    // Don't trigger cues if disabled
    if (!useCues) return false;
    
    // Avoid triggering cues too frequently
    const minTimeBetweenCues = Math.floor(roundLength / (cuesFrequency + 1));
    
    if (currentTime - lastCueTime < minTimeBetweenCues) {
      return false;
    }
    
    // Determine if we should trigger based on workout time
    // Early (start of round)
    if (currentTime < 10) {
      return true;
    }
    
    // Late (end of round)
    if (roundLength - currentTime < 15) {
      return true;
    }
    
    // Mid round - probabilistic approach based on cue frequency
    const chanceToTrigger = Math.min(0.8, cuesFrequency * 0.1);
    return Math.random() < chanceToTrigger;
  };
  
  /**
   * Trigger a cue based on workout parameters
   */
  const triggerCue = useCallback((params) => {
    const { currentTime, roundLength, workoutType, intensityLevel, roundNumber } = params;
    
    if (!shouldTriggerCue(currentTime, roundLength) || !cuePool || cuePool.length === 0) {
      return;
    }
    
    // Select appropriate cue
    const cue = selectCue(
      currentTime, 
      roundLength, 
      workoutType, 
      intensityLevel,
      cuePool,
      roundNumber
    );
    
    if (cue) {
      playCue(cue);
      lastCueTime = currentTime;
    }
  }, [cuePool, playCue, useCues, cuesFrequency]);
  
  return { triggerCue };
};

export default useAudioCues;