'use client';

import { Box, Heading, Text, VStack } from "@chakra-ui/react";

export default function About() {
  return (
    <Box p={8}>
      <VStack spacing={4} align="start">
        <Heading>О проекте</Heading>
        <Text>Это демонстрационный проект, созданный с использованием Next.js и Chakra UI.</Text>
        <Text>Здесь вы можете найти информацию о проекте и его возможностях.</Text>
      </VStack>
    </Box>
  );
} 