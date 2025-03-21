'use client';

import { Box, Flex, Link, Heading } from '@chakra-ui/react';
import NextLink from 'next/link';

export const NavigationClient = () => {
  return (
    <Box as="header" bg="gray.800" color="white" py={4}>
      <Flex maxW="container.xl" mx="auto" px={4} align="center" justify="space-between">
        <Heading as="h1" size="md">
          <Link as={NextLink} href="/">
            PavoPipe
          </Link>
        </Heading>
        
        <Flex gap={6}>
          <Link as={NextLink} href="/" _hover={{ color: 'blue.300' }}>
            Главная
          </Link>
          <Link as={NextLink} href="/pipeline" _hover={{ color: 'blue.300' }}>
            Пайплайн
          </Link>
          <Link as={NextLink} href="/settings" _hover={{ color: 'blue.300' }}>
            Настройки
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}; 