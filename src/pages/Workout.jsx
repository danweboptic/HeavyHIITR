import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  CircularProgress,
  CircularProgressLabel,
  HStack,
  Badge,
  Center,
  Flex,
  Card,
  useColorMode
} from '@chakra-ui/react';
import { useSettings } from '../contexts/SettingsContext';
import { useAudio } from '../contexts/AudioContext';
import { useWorkout } from '../contexts/WorkoutContext';

function Workout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const cardBg = colorMode === 'dark' ? 'gray.800' : 'white';
  const trackColor = colorMode === 'dark' ? 'gray.700' : 'gray.200';
  const textColor = colorMode === 'dark' ? 'gray.400' : 'gray.600';

  const { rounds, roundLength, breakLength } = useSettings();
  const { playSoundEffect, playCue, initializeAudio } = useAudio();
  const { updateWorkoutConfig, focusExercises, updateFocusExercises } = useWorkout();

  // Set workout type from navigation state or default to 'fundamentals'
  const workoutType = location.state?.workoutType || 'fundamentals';

  // Initialize audio system if needed
  useEffect(() => {
    initializeAudio();
  }, [initializeAudio]);

  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(roundLength);
  const [currentRound, setCurrentRound] = useState(0);
  const [isBreak, setIsBreak] = useState(false);
  const [lastCueTime, setLastCueTime] = useState(0);

  // Current focus for the workout
  const currentFocus = focusExercises.current || '';

  // Function to update the focus
  const nextFocus = () => {
    const focuses = {
      'fundamentals': ['Jabs', 'Stance', 'Footwork', 'Straight punches', 'Guard position'],
      'power': ['Body shots', 'Hooks', 'Power combos', 'Uppercuts', 'Heavy strikes'],
      'speed': ['Fast combos', 'Double jabs', 'Quick steps', 'Speed drills', 'Rapid fire'],
      'endurance': ['Volume punches', 'Sustained pace', 'Active movement', 'High output', 'Constant work'],
      'defense': ['Slips & blocks', 'Parries', 'Head movement', 'Counter punches', 'Defensive footwork'],
      'freestyle': ['Creative combos', 'Mixed techniques', 'Flow punching', 'Rhythm changes', 'Free expression']
    };

    // Get the focus options for the current workout type
    const focusOptions = focuses[workoutType] || focuses.fundamentals;

    // Select a random focus that's different from the current one
    let newFocus;
    do {
      newFocus = focusOptions[Math.floor(Math.random() * focusOptions.length)];
    } while (newFocus === currentFocus && focusOptions.length > 1);

    updateFocusExercises({ current: newFocus });
  };

  // Refs for timer and interval handling
  const timerRef = useRef(null);
  const cueCooldown = 10; // seconds between verbal cues

  // Effect to set workout type when component mounts
  useEffect(() => {
    updateWorkoutConfig({ workoutType });
  }, [workoutType, updateWorkoutConfig]);

  // Timer management
  useEffect(() => {
    if (isActive && !isPaused) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);

            // If we're in a break, start the next round
            if (isBreak) {
              if (currentRound < rounds) {
                setIsBreak(false);
                playSoundEffect('bell_start');
                nextFocus();
                return roundLength;
              }
            } else {
              // If we've completed all rounds, end the workout
              if (currentRound >= rounds) {
                setIsActive(false);
                playSoundEffect('bell_end');
                return 0;
              } else {
                // Otherwise, start a break
                setIsBreak(true);
                playSoundEffect('bell_end');
                setCurrentRound(prev => prev + 1);
                return breakLength;
              }
            }
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [isActive, isPaused, isBreak, currentRound, rounds, roundLength, breakLength, playSoundEffect]);

  // Effect for playing audio cues during workout
  useEffect(() => {
    if (isActive && !isPaused && !isBreak) {
      // Play countdown when time is low
      if (timeLeft <= 5 && timeLeft > 0) {
        playSoundEffect('countdown');
      }

      // Play coaching cues periodically
      const now = Date.now();
      if (now - lastCueTime > cueCooldown * 1000) {
        // If you have specific cues in your cuePool, you can select one
        // For now, we'll skip this since we need to understand your cue structure
        // playCue({ cue: "Great work" });
        setLastCueTime(now);
      }
    }
  }, [timeLeft, isActive, isPaused, isBreak, playSoundEffect, lastCueTime]);

  // Start or pause workout
  const toggleWorkout = () => {
    if (!isActive) {
      // Starting the workout
      setIsActive(true);
      setIsPaused(false);
      setCurrentRound(1);
      setIsBreak(false);
      setTimeLeft(roundLength);
      playSoundEffect('bell_start');
      // Set initial focus when starting workout
      nextFocus();
    } else {
      // Toggling pause state
      setIsPaused(!isPaused);
    }
  };

  // Reset workout
  const resetWorkout = () => {
    clearInterval(timerRef.current);
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(roundLength);
    setCurrentRound(0);
    setIsBreak(false);
  };

  // End workout and go back home
  const endWorkout = () => {
    resetWorkout();
    navigate('/');
  };

  // Format time for display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Calculate progress percentage
  const calculateProgress = () => {
    const total = isBreak ? breakLength : roundLength;
    return ((total - timeLeft) / total) * 100;
  };

  return (
    <VStack spacing={8} align="center" justify="center" h="full">
      <Box textAlign="center">
        <Badge
          colorScheme={isBreak ? 'blue' : 'orange'}
          fontSize="md"
          p={2}
          borderRadius="md"
        >
          {isBreak ? 'BREAK' : workoutType.toUpperCase()}
        </Badge>

        <Heading mt={2} size="xl" color="brand.500">
          {isBreak ? 'Rest' : `Round ${currentRound}`}
        </Heading>

        <Text mt={1} fontSize="lg">
          {isBreak ? 'Recover' : `Focus: ${currentFocus}`}
        </Text>
      </Box>

      <Box position="relative">
        <CircularProgress
          value={calculateProgress()}
          size="240px"
          thickness="8px"
          color={isBreak ? 'blue.400' : 'brand.500'}
          trackColor={trackColor}
        >
          <CircularProgressLabel>
            <VStack spacing={0}>
              <Text fontSize="5xl" fontWeight="bold">
                {formatTime(timeLeft)}
              </Text>
              <Text fontSize="sm" color={textColor}>
                {isBreak ? 'Until Next Round' : 'Remaining'}
              </Text>
            </VStack>
          </CircularProgressLabel>
        </CircularProgress>
      </Box>

      <HStack spacing={6}>
        {/* Round indicators */}
        {Array.from({ length: rounds }, (_, i) => (
          <Box
            key={i}
            w="12px"
            h="12px"
            borderRadius="full"
            bg={
              i + 1 < currentRound ? 'green.500' :
              i + 1 === currentRound && !isBreak ? 'brand.500' :
              trackColor
            }
          />
        ))}
      </HStack>

      <Flex
        direction={{ base: 'column', md: 'row' }}
        width="100%"
        maxW="md"
        justify="center"
        align="center"
        mt={6}
        gap={4}
      >
        <Button
          colorScheme={isActive && !isPaused ? 'yellow' : 'green'}
          size="lg"
          width={{ base: 'full', md: 'auto' }}
          onClick={toggleWorkout}
        >
          {!isActive ? 'Start Workout' : isPaused ? 'Resume' : 'Pause'}
        </Button>

        <Button
          colorScheme="gray"
          size="lg"
          width={{ base: 'full', md: 'auto' }}
          onClick={resetWorkout}
          isDisabled={!isActive}
        >
          Reset
        </Button>

        <Button
          colorScheme="red"
          size="lg"
          width={{ base: 'full', md: 'auto' }}
          onClick={endWorkout}
        >
          End Workout
        </Button>
      </Flex>

      {currentFocus && (
        <Card
          p={4}
          bg={cardBg}
          width="100%"
          maxW="md"
          mt={4}
          borderColor={isBreak ? 'blue.400' : 'brand.500'}
          borderWidth={2}
        >
          <Center>
            <Text fontSize="xl" fontWeight="bold">
              {isBreak ? 'Next Focus: ' : 'Current Focus: '}
              <Text as="span" color={isBreak ? 'blue.400' : 'brand.500'}>
                {currentFocus}
              </Text>
            </Text>
          </Center>
        </Card>
      )}
    </VStack>
  );
}

export default Workout;