import { useState, useEffect, useRef } from 'react';

const useTimer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [duration, setDuration] = useState(0);
  
  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);
  const pausedTimeRef = useRef(0);
  
  const startTimer = (seconds) => {
    setDuration(seconds);
    setTime(0);
    setIsRunning(true);
    setIsPaused(false);
    startTimeRef.current = Date.now();
    
    // Clear any existing intervals
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setTime(elapsedSeconds);
    }, 200); // Update slightly more frequently for accuracy
  };
  
  const pauseTimer = () => {
    if (!isRunning || isPaused) return;
    
    clearInterval(intervalRef.current);
    setIsPaused(true);
    pausedTimeRef.current = Date.now();
  };
  
  const resumeTimer = () => {
    if (!isRunning || !isPaused) return;
    
    // Adjust start time to account for pause duration
    const pauseDuration = Date.now() - pausedTimeRef.current;
    startTimeRef.current += pauseDuration;
    
    intervalRef.current = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setTime(elapsedSeconds);
    }, 200);
    
    setIsPaused(false);
  };
  
  const resetTimer = () => {
    setTime(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsRunning(false);
    setIsPaused(false);
  };
  
  const stopTimer = () => {
    resetTimer();
  };
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  return { 
    time, 
    duration,
    isRunning, 
    isPaused, 
    startTimer, 
    pauseTimer, 
    resumeTimer, 
    resetTimer, 
    stopTimer 
  };
};

export default useTimer;