import { TIME_RANGES } from './constants';

/**
 * Determines the time range in the current round
 * 
 * @param {number} currentTime - Time elapsed in current round (seconds)
 * @param {number} roundLength - Total round length (seconds)
 * @returns {string} Time range identifier ('early', 'mid', or 'late')
 */
export const getTimeRange = (currentTime, roundLength) => {
  if (currentTime < 30) {
    return TIME_RANGES.EARLY;
  } else if (currentTime > roundLength - 30) {
    return TIME_RANGES.LATE;
  } else {
    return TIME_RANGES.MID;
  }
};

/**
 * Selects an appropriate cue based on workout parameters
 * 
 * @param {number} currentTime - Time elapsed in current round (seconds)
 * @param {number} roundLength - Total round length (seconds)
 * @param {string} workoutType - Type of workout
 * @param {string} intensityLevel - Intensity level
 * @param {Array} cuePool - Pool of available cues
 * @param {number} roundNumber - Current round number
 * @returns {Object|null} Selected cue object or null if no suitable cue found
 */
export const selectCue = (
  currentTime,
  roundLength,
  workoutType,
  intensityLevel,
  cuePool,
  roundNumber
) => {
  if (!cuePool || cuePool.length === 0) {
    return null;
  }

  const timeRange = getTimeRange(currentTime, roundLength);
  
  // Filter cues by workout parameters
  const validCues = cuePool.filter(cue => {
    // Check workout type match
    const workoutTypeMatch = 
      cue.workoutTypes.includes(workoutType) || 
      cue.workoutTypes.includes('all');
    
    // Check intensity level match
    const intensityLevelMatch = 
      cue.intensityLevels.includes(intensityLevel) || 
      cue.intensityLevels.includes('all');
    
    // Check time range match
    const timeRangeMatch = 
      cue.timeRange === timeRange || 
      cue.timeRange === TIME_RANGES.ANY;
    
    return workoutTypeMatch && intensityLevelMatch && timeRangeMatch;
  });
  
  if (validCues.length === 0) {
    return null;
  }
  
  // Select a random cue from valid cues
  const randomIndex = Math.floor(Math.random() * validCues.length);
  const selectedCue = validCues[randomIndex];
  
  // Add round number for template strings
  return {
    ...selectedCue,
    roundNumber
  };
};

/**
 * Processes a template cue string with dynamic values
 * 
 * @param {string} cueText - Cue template text
 * @param {Object} params - Parameters to inject
 * @returns {string} Processed cue text
 */
export const processCueText = (cueText, params = {}) => {
  if (!cueText) return '';

  let processed = cueText;
  
  // Replace template variables
  Object.entries(params).forEach(([key, value]) => {
    const pattern = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
    processed = processed.replace(pattern, value);
  });
  
  return processed;
};