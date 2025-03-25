import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Flex,
  Text,
  Heading,
  IconButton,
  useColorMode,
  HStack,
  useColorModeValue
} from '@chakra-ui/react';

function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Box as="header" bg={bgColor} py={4} px={6} boxShadow="md">
      <Flex align="center" justify="space-between" maxWidth="container.xl" mx="auto">
        <RouterLink to="/">
          <Heading size="lg" color="brand.500">HeavyHITR</Heading>
        </RouterLink>

        <HStack spacing={4}>
          <RouterLink to="/">
            <IconButton
              aria-label="Home"
              variant="ghost"
              icon={<Text>🏠</Text>}
              _hover={{ bg: 'brand.100' }}
            />
          </RouterLink>

          <RouterLink to="/settings">
            <IconButton
              aria-label="Settings"
              variant="ghost"
              icon={<Text>⚙️</Text>}
              _hover={{ bg: 'brand.100' }}
            />
          </RouterLink>

          <IconButton
            aria-label="Toggle Dark Mode"
            onClick={toggleColorMode}
            variant="ghost"
            icon={colorMode === 'dark' ? <Text>☀️</Text> : <Text>🌙</Text>}
            _hover={{ bg: 'brand.100' }}
          />
        </HStack>
      </Flex>
    </Box>
  );
}

export default Header;