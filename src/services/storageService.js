const STORAGE_KEYS = {
  SETTINGS: 'heavyhitr_settings',
  WORKOUT_HISTORY: 'heavyhitr_history',
};

/**
 * Saves settings to local storage
 * 
 * @param {Object} settings - Settings object
 */
export const saveSettings = (settings) => {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving settings:', error);
  }
};

/**
 * Loads settings from local storage
 * 
 * @returns {Object|null} Settings object or null if not found
 */
export const loadSettings = () => {
  try {
    const settings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return settings ? JSON.parse(settings) : null;
  } catch (error) {
    console.error('Error loading settings:', error);
    return null;
  }
};

/**
 * Saves workout to history
 * 
 * @param {Object} workout - Workout data
 */
export const saveWorkoutToHistory = (workout) => {
  try {
    const history = loadWorkoutHistory() || [];
    history.push({
      ...workout,
      id: Date.now(),
      date: new Date().toISOString(),
    });
    
    // Keep only the last 50 workouts
    const trimmedHistory = history.slice(-50);
    
    localStorage.setItem(STORAGE_KEYS.WORKOUT_HISTORY, JSON.stringify(trimmedHistory));
  } catch (error) {
    console.error('Error saving workout history:', error);
  }
};

/**
 * Loads workout history from local storage
 * 
 * @returns {Array|null} Array of workout history or null if not found
 */
export const loadWorkoutHistory = () => {
  try {
    const history = localStorage.getItem(STORAGE_KEYS.WORKOUT_HISTORY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error loading workout history:', error);
    return [];
  }
};

/**
 * Clears all app data from local storage
 */
export const clearAllData = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.WORKOUT_HISTORY);
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};