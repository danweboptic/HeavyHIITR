import React, { useMemo } from 'react';

const CircularTimer = ({ timeRemaining, totalTime, isBreak }) => {
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate stroke dash
  const progress = useMemo(() => {
    const percentage = Math.max(0, Math.min(1, timeRemaining / totalTime));
    return circumference * (1 - percentage);
  }, [timeRemaining, totalTime, circumference]);
  
  // Format time for display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="relative w-72 h-72 flex items-center justify-center">
      <svg 
        className="absolute w-full h-full transform -rotate-90" 
        viewBox="0 0 300 300"
      >
        {/* Background circle */}
        <circle
          cx="150"
          cy="150"
          r={radius}
          fill="transparent"
          stroke="#2a2a2a"
          strokeWidth="15"
        />
        
        {/* Progress circle */}
        <circle
          cx="150"
          cy="150"
          r={radius}
          fill="transparent"
          stroke={isBreak ? "#2196f3" : "#ff5722"}
          strokeWidth="15"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-linear"
        />
      </svg>
      
      <div className="absolute flex flex-col items-center justify-center">
        <div className="text-5xl font-bold">{formatTime(timeRemaining)}</div>
        <div className="text-text-secondary mt-2 text-lg">
          {isBreak ? 'REST' : 'WORK'}
        </div>
      </div>
    </div>
  );
};

export default CircularTimer;