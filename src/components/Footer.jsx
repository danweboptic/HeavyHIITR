import React from 'react';
import { Box, Text, Link, Flex, useColorModeValue } from '@chakra-ui/react';

function Footer() {
  const bgColor = useColorModeValue('gray.100', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Box as="footer" bg={bgColor} py={4} px={6}>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
        align="center"
        maxWidth="container.xl"
        mx="auto"
      >
        <Text fontSize="sm" color={textColor}>
          &copy; {new Date().getFullYear()} HeavyHITR Boxing App
        </Text>
        <Box mt={{ base: 2, md: 0 }}>
          <Link
            href="#"
            mx={2}
            fontSize="sm"
            color={textColor}
            _hover={{ color: 'brand.500' }}
          >
            Terms
          </Link>
          <Link
            href="#"
            mx={2}
            fontSize="sm"
            color={textColor}
            _hover={{ color: 'brand.500' }}
          >
            Privacy
          </Link>
        </Box>
      </Flex>
    </Box>
  );
}

export default Footer;