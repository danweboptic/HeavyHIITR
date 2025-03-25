import React from 'react';

const WorkoutDisplay = ({ 
  isBreak, 
  currentFocus, 
  nextFocus, 
  workoutType, 
  intensityLevel 
}) => {
  return (
    <div className="w-full max-w-md bg-surface rounded-lg p-5 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <span className="text-text-secondary capitalize">
          {workoutType}
        </span>
        <span className="bg-primary bg-opacity-20 text-primary px-3 py-1 rounded-full text-sm capitalize">
          {intensityLevel}
        </span>
      </div>
      
      {isBreak ? (
        <div className="mb-4">
          <h3 className="text-text-secondary mb-1">Next Focus</h3>
          <div className="text-2xl font-semibold">{nextFocus}</div>
        </div>
      ) : (
        <div className="mb-4">
          <h3 className="text-text-secondary mb-1">Current Focus</h3>
          <div className="text-2xl font-semibold">{currentFocus}</div>
        </div>
      )}
      
      <div className="border-t border-gray-700 pt-4 mt-2">
        {isBreak ? (
          <div className="text-text-secondary">
            Take a breath and get ready for the next round
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Next:</span>
            <span>{nextFocus}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutDisplay;