import React, { createContext, useState, useContext } from 'react';

const WorkoutContext = createContext();

export const WorkoutProvider = ({ children }) => {
  const [workoutConfig, setWorkoutConfig] = useState({
    rounds: 3,
    roundLength: 180, // in seconds
    breakLength: 30, // in seconds
    workoutType: 'fundamentals',
    intensityLevel: 'beginner',
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

  const [focusExercises, setFocusExercises] = useState({
    current: '',
    next: '',
  });

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

  return (
    <WorkoutContext.Provider
      value={{
        workoutConfig,
        workoutState,
        focusExercises,
        updateWorkoutConfig,
        updateWorkoutState,
        updateFocusExercises,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => useContext(WorkoutContext);