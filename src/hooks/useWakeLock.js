import { useState, useEffect } from 'react';

const useWakeLock = () => {
  const [isWakeLockSupported, setIsWakeLockSupported] = useState(false);
  const [isWakeLockActive, setIsWakeLockActive] = useState(false);
  const [wakeLock, setWakeLock] = useState(null);

  // Check if wake lock is supported
  useEffect(() => {
    const isSupported = 'wakeLock' in navigator;
    setIsWakeLockSupported(isSupported);
  }, []);

  // Function to request a wake lock
  const requestWakeLock = async () => {
    if (!isWakeLockSupported) {
      console.log('Wake Lock is not supported by this browser.');
      return;
    }

    try {
      const lock = await navigator.wakeLock.request('screen');
      
      setWakeLock(lock);
      setIsWakeLockActive(true);
      
      lock.addEventListener('release', () => {
        setIsWakeLockActive(false);
        setWakeLock(null);
      });
      
      console.log('Wake Lock is active.');
      return true;
    } catch (error) {
      console.error(`Failed to get Wake Lock: ${error.message}`);
      return false;
    }
  };

  // Function to release the wake lock
  const releaseWakeLock = () => {
    if (wakeLock) {
      wakeLock.release()
        .then(() => {
          console.log('Wake Lock has been released.');
          setIsWakeLockActive(false);
          setWakeLock(null);
        })
        .catch((error) => {
          console.error(`Failed to release Wake Lock: ${error.message}`);
        });
    }
  };

  // Re-acquire wake lock if page becomes visible again
  useEffect(() => {
    if (!isWakeLockSupported) return;

    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible' && isWakeLockActive && !wakeLock) {
        await requestWakeLock();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      // Release wake lock on unmount
      if (wakeLock) {
        wakeLock.release().catch(console.error);
      }
    };
  }, [isWakeLockActive, wakeLock, isWakeLockSupported]);

  return {
    isWakeLockSupported,
    isWakeLockActive,
    requestWakeLock,
    releaseWakeLock,
  };
};

export default useWakeLock;