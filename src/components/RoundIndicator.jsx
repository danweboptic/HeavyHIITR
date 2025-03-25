import React from 'react';

const RoundIndicator = ({ currentRound, totalRounds, isBreak }) => {
  return (
    <div className="flex flex-col items-center mb-4">
      <h2 className="text-2xl font-bold mb-2">
        {isBreak ? 'REST' : `Round ${currentRound}/${totalRounds}`}
      </h2>
      
      <div className="flex space-x-1">
        {Array.from({ length: totalRounds }, (_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i + 1 < currentRound
                ? 'bg-primary'
                : i + 1 === currentRound
                ? isBreak
                  ? 'bg-secondary'
                  : 'bg-primary animate-pulse'
                : 'bg-gray-700'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default RoundIndicator;