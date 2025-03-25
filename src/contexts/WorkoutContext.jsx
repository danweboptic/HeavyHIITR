import React, { createContext, useState, useContext, useEffect } from 'react';
import { FOCUS_EXERCISES } from '../utils/constants';

const WorkoutContext = createContext();

// Constants
const LOCAL_STORAGE_KEYS = {
  FOCUS_EXERCISE: 'heavyhitr-focus-exercise',
  WORKOUT_CONFIG: 'heavyhitr-workout-config',
};

export const WorkoutProvider = ({ children }) => {
  const [workoutConfig, setWorkoutConfig] = useState(() => {
    // Try to load from localStorage
    const savedConfig = localStorage.getItem(LOCAL_STORAGE_KEYS.WORKOUT_CONFIG);
    return savedConfig ? JSON.parse(savedConfig) : {
      rounds: 3,
      roundLength: 180, // in seconds
      breakLength: 30, // in seconds
      workoutType: 'fundamentals',
      intensityLevel: 'beginner',
    };
  });

  const [workoutState, setWorkoutState] = useState({
    isActive: false,
    isPaused: false,
    isBreak: false,
    currentRound: 0,
    totalRounds: 0,
    timeRemaining: 0,
    elapsedTime: 0,
  });

  const [focusExercises, setFocusExercises] = useState(() => {
    // Try to load from localStorage
    const savedFocus = localStorage.getItem(LOCAL_STORAGE_KEYS.FOCUS_EXERCISE);
    return savedFocus ? JSON.parse(savedFocus) : {
      current: '',
      next: '',
    };
  });

  // Save workout config to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.WORKOUT_CONFIG, JSON.stringify(workoutConfig));
  }, [workoutConfig]);

  // Save focus exercise to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.FOCUS_EXERCISE, JSON.stringify(focusExercises));
  }, [focusExercises]);

  const updateWorkoutConfig = (config) => {
    setWorkoutConfig(prev => ({
      ...prev,
      ...config,
    }));
  };

  const updateWorkoutState = (state) => {
    setWorkoutState(prev => ({
      ...prev,
      ...state,
    }));
  };

  const updateFocusExercises = (exercises) => {
    setFocusExercises(prev => ({
      ...prev,
      ...exercises,
    }));
  };

  const getRandomFocus = (workoutType) => {
    const focusList = FOCUS_EXERCISES[workoutType] || FOCUS_EXERCISES.fundamentals;
    const randomIndex = Math.floor(Math.random() * focusList.length);
    return focusList[randomIndex];
  };

  const nextFocus = () => {
    const currentType = workoutConfig.workoutType;
    const newFocus = getRandomFocus(currentType);

    if (newFocus === focusExercises.current) {
      // Try again if we got the same focus
      nextFocus();
    } else {
      updateFocusExercises({ current: newFocus });
    }
  };

  // Set a specific focus (for use when changing workout types)
  const setSpecificFocus = (focus) => {
    updateFocusExercises({ current: focus });
  };

  // Reset focus (for use when user explicitly wants to clear it)
  const resetFocus = () => {
    updateFocusExercises({ current: '', next: '' });
  };

  return (
    <WorkoutContext.Provider
      value={{
        workoutConfig,
        workoutState,
        focusExercises,
        updateWorkoutConfig,
        updateWorkoutState,
        updateFocusExercises,
        nextFocus,
        setSpecificFocus,
        resetFocus,
        currentFocus: focusExercises.current,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => useContext(WorkoutContext);