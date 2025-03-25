import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  useColorModeValue
} from '@chakra-ui/react';

function Home() {
  const navigate = useNavigate();

  // Use useColorModeValue instead of useColorMode
  const cardBg = useColorModeValue('white', 'gray.800');
  const cardBorderColor = useColorModeValue('gray.200', 'gray.700');

  // Workout types for the cards
  const workoutTypes = [
    {
      id: 'fundamentals',
      name: 'Fundamentals',
      description: 'Focus on boxing basics and technique',
      emoji: '👊'
    },
    {
      id: 'power',
      name: 'Power',
      description: 'Heavy strikes and power combinations',
      emoji: '💪'
    },
    {
      id: 'speed',
      name: 'Speed',
      description: 'Quick combinations and reflexes',
      emoji: '⚡'
    },
    {
      id: 'endurance',
      name: 'Endurance',
      description: 'Long rounds and high volume',
      emoji: '🏃'
    },
    {
      id: 'defense',
      name: 'Defense',
      description: 'Slips, blocks, and counters',
      emoji: '🛡️'
    },
    {
      id: 'freestyle',
      name: 'Freestyle',
      description: 'Mix of different boxing styles',
      emoji: '🥊'
    },
  ];

  const startWorkout = (workoutType) => {
    navigate('/workout', { state: { workoutType } });
  };

  return (
    <VStack spacing={8} align="stretch">
      <Box textAlign="center" py={8}>
        <Heading size="2xl" mb={4} color="brand.500">HeavyHITR</Heading>
        <Text fontSize="xl" mb={8}>Choose your boxing workout</Text>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {workoutTypes.map((workout) => (
            <Card
              key={workout.id}
              variant="outline"
              bg={cardBg}
              borderColor={cardBorderColor}
              _hover={{
                transform: 'translateY(-5px)',
                transition: 'transform 0.3s ease',
                boxShadow: 'lg'
              }}
            >
              <CardHeader pb={0}>
                <Heading size="md" display="flex" alignItems="center">
                  <Text mr={2} fontSize="2xl">{workout.emoji}</Text>
                  {workout.name}
                </Heading>
              </CardHeader>
              <CardBody>
                <Text>{workout.description}</Text>
              </CardBody>
              <CardFooter>
                <Button
                  colorScheme="orange"
                  onClick={() => startWorkout(workout.id)}
                  width="full"
                >
                  Start Workout
                </Button>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </VStack>
  );
}

export default Home;