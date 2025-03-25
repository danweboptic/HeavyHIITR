import { FOCUS_EXERCISES } from './constants';

/**
 * Gets a random focus exercise for a specific workout type and round
 * 
 * @param {string} workoutType - Type of workout
 * @param {number} roundNumber - Round number
 * @returns {string} Focus exercise description
 */
export const getFocusExerciseForRound = (workoutType, roundNumber) => {
  const exercises = FOCUS_EXERCISES[workoutType] || FOCUS_EXERCISES.fundamentals;
  
  // Use round number to deterministically select an exercise
  // This ensures consistency if the user pauses and resumes
  const index = (roundNumber - 1) % exercises.length;
  
  return exercises[index];
};

/**
 * Formats time in seconds to MM:SS format
 * 
 * @param {number} seconds - Time in seconds
 * @returns {string} Formatted time string
 */
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

/**
 * Estimates calories burned during boxing workout
 * 
 * @param {number} weightKg - User's weight in kilograms
 * @param {number} durationMinutes - Workout duration in minutes
 * @param {string} intensityLevel - Intensity level
 * @returns {number} Estimated calories burned
 */
export const estimateCaloriesBurned = (weightKg, durationMinutes, intensityLevel) => {
  // MET values for boxing activities
  // These are approximate values based on research
  const metValues = {
    beginner: 6.5,    // Light boxing
    intermediate: 8.0, // Moderate boxing
    advanced: 9.5      // Intense boxing
  };
  
  const met = metValues[intensityLevel] || metValues.intermediate;
  
  // Formula: calories = weight (kg) × MET × duration (hours)
  const durationHours = durationMinutes / 60;
  const calories = weightKg * met * durationHours;
  
  return Math.round(calories);
};

/**
 * Generates a random ID
 * 
 * @returns {string} Random ID
 */
export const generateId = () => {
  return Math.random().toString(36).substring(2, 15);
};

/**
 * Debounce function to limit function calls
 * 
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};