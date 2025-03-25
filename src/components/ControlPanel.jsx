import React from 'react';

const ControlPanel = ({ isPaused, onPauseToggle, onExit }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-surface p-4 flex justify-center space-x-4">
      <button
        onClick={onPauseToggle}
        className="bg-primary hover:bg-orange-600 text-white font-bold py-2 px-8 rounded-md transition duration-200"
      >
        {isPaused ? 'Resume' : 'Pause'}
      </button>
      
      <button
        onClick={onExit}
        className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-8 rounded-md transition duration-200"
      >
        Exit
      </button>
    </div>
  );
};

export default ControlPanel;