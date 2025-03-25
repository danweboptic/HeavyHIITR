import React, { useEffect, useState } from 'react';
import { useAudio } from '../contexts/AudioContext';

const CueDisplay = () => {
  const { currentCue } = useAudio();
  const [showCue, setShowCue] = useState(false);
  const [displayCue, setDisplayCue] = useState(null);
  
  // Show cue when it changes
  useEffect(() => {
    if (currentCue) {
      setDisplayCue(currentCue);
      setShowCue(true);
      
      // Hide cue after 3 seconds
      const timer = setTimeout(() => {
        setShowCue(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [currentCue]);
  
  // Don't render anything if no cue is displayed
  if (!showCue || !displayCue) {
    return null;
  }
  
  // Get color based on cue type
  const getCueTypeColor = (type) => {
    switch (type) {
      case 'motivation':
        return 'text-red-400';
      case 'action':
        return 'text-green-400';
      case 'pacing':
        return 'text-blue-400';
      case 'start':
        return 'text-yellow-400';
      case 'end':
        return 'text-purple-400';
      default:
        return 'text-white';
    }
  };

  return (
    <div className={`fixed bottom-24 left-0 right-0 mx-auto max-w-md px-4 transition-opacity duration-300 ${showCue ? 'opacity-100' : 'opacity-0'}`}>
      <div className="bg-black bg-opacity-70 rounded-lg p-4 shadow-lg text-center">
        <span className={`text-xl font-semibold ${getCueTypeColor(displayCue.type)}`}>
          {displayCue.cue.replace('{{roundNumber}}', displayCue.roundNumber || '')}
        </span>
      </div>
    </div>
  );
};

export default CueDisplay;