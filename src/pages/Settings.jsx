import React from 'react';
import {
  Box,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Select,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  Switch,
  Card,
  CardHeader,
  CardBody,
  useColorModeValue,
  useColorMode
} from '@chakra-ui/react';
import { useSettings } from '../contexts/SettingsContext';

function Settings() {
  const { colorMode } = useColorMode();
  const cardBg = useColorModeValue('white', 'gray.800');
  const cardBorderColor = useColorModeValue('gray.200', 'gray.700');
  const selectBg = useColorModeValue('white', 'gray.700');
  const sliderTrackBg = useColorModeValue('gray.200', 'gray.600');

  const {
    theme,
    setTheme,
    rounds,
    setRounds,
    roundLength,
    setRoundLength,
    breakLength,
    setBreakLength,
    musicVolume,
    setMusicVolume,
    cueVolume,
    setCueVolume,
    sfxVolume,
    setSfxVolume,
    cueFrequency,
    setCueFrequency
  } = useSettings();

  return (
    <VStack spacing={8} align="stretch">
      <Box textAlign="center" mb={6}>
        <Heading size="xl" color="brand.500">Settings</Heading>
      </Box>

      <Card
        variant="outline"
        bg={cardBg}
        borderColor={cardBorderColor}
      >
        <CardHeader>
          <Heading size="md">Workout Settings</Heading>
        </CardHeader>
        <CardBody>
          <VStack spacing={6} align="stretch">
            <FormControl>
              <FormLabel>Number of Rounds</FormLabel>
              <Select
                value={rounds}
                onChange={(e) => setRounds(Number(e.target.value))}
                bg={selectBg}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                  <option key={num} value={num}>{num} rounds</option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Round Length: {roundLength} seconds</FormLabel>
              <Slider
                min={30}
                max={300}
                step={15}
                value={roundLength}
                onChange={setRoundLength}
              >
                <SliderTrack bg={sliderTrackBg}>
                  <SliderFilledTrack bg="brand.500" />
                </SliderTrack>
                <SliderThumb boxSize={6} bg="brand.500" />
              </Slider>
              <Box display="flex" justifyContent="space-between" width="100%" mt={1}>
                <Text fontSize="xs">30s</Text>
                <Text fontSize="xs">5min</Text>
              </Box>
            </FormControl>

            <FormControl>
              <FormLabel>Break Length: {breakLength} seconds</FormLabel>
              <Slider
                min={10}
                max={60}
                step={5}
                value={breakLength}
                onChange={setBreakLength}
              >
                <SliderTrack bg={sliderTrackBg}>
                  <SliderFilledTrack bg="brand.500" />
                </SliderTrack>
                <SliderThumb boxSize={6} bg="brand.500" />
              </Slider>
              <Box display="flex" justifyContent="space-between" width="100%" mt={1}>
                <Text fontSize="xs">10s</Text>
                <Text fontSize="xs">60s</Text>
              </Box>
            </FormControl>

            <FormControl>
              <FormLabel>Cue Frequency</FormLabel>
              <Select
                value={cueFrequency}
                onChange={(e) => setCueFrequency(e.target.value)}
                bg={selectBg}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Select>
            </FormControl>
          </VStack>
        </CardBody>
      </Card>

      <Card
        variant="outline"
        bg={cardBg}
        borderColor={cardBorderColor}
      >
        <CardHeader>
          <Heading size="md">Audio Settings</Heading>
        </CardHeader>
        <CardBody>
          <VStack spacing={6} align="stretch">
            <FormControl>
              <FormLabel>Music Volume: {Math.round(musicVolume * 100)}%</FormLabel>
              <Slider
                min={0}
                max={1}
                step={0.1}
                value={musicVolume}
                onChange={setMusicVolume}
              >
                <SliderTrack bg={sliderTrackBg}>
                  <SliderFilledTrack bg="brand.500" />
                </SliderTrack>
                <SliderThumb boxSize={6} bg="brand.500" />
              </Slider>
            </FormControl>

            <FormControl>
              <FormLabel>Verbal Cues Volume: {Math.round(cueVolume * 100)}%</FormLabel>
              <Slider
                min={0}
                max={1}
                step={0.1}
                value={cueVolume}
                onChange={setCueVolume}
              >
                <SliderTrack bg={sliderTrackBg}>
                  <SliderFilledTrack bg="brand.500" />
                </SliderTrack>
                <SliderThumb boxSize={6} bg="brand.500" />
              </Slider>
            </FormControl>

            <FormControl>
              <FormLabel>Sound Effects Volume: {Math.round(sfxVolume * 100)}%</FormLabel>
              <Slider
                min={0}
                max={1}
                step={0.1}
                value={sfxVolume}
                onChange={setSfxVolume}
              >
                <SliderTrack bg={sliderTrackBg}>
                  <SliderFilledTrack bg="brand.500" />
                </SliderTrack>
                <SliderThumb boxSize={6} bg="brand.500" />
              </Slider>
            </FormControl>
          </VStack>
        </CardBody>
      </Card>

      <Card
        variant="outline"
        bg={cardBg}
        borderColor={cardBorderColor}
      >
        <CardHeader>
          <Heading size="md">Display Settings</Heading>
        </CardHeader>
        <CardBody>
          <FormControl display="flex" alignItems="center">
            <FormLabel mb={0}>Dark Mode</FormLabel>
            <Switch
              colorScheme="orange"
              isChecked={theme === 'dark'}
              onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            />
          </FormControl>
        </CardBody>
      </Card>
    </VStack>
  );
}

export default Settings;