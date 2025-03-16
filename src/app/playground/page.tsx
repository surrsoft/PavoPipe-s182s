'use client';

import { Box, Heading, Text, Textarea, Button, VStack } from "@chakra-ui/react";
import { useState } from "react";

export default function Playground() {
  const [inputText, setInputText] = useState("");

  const handleRun = () => {
    console.log("Выполняется код:", inputText);
    // Здесь можно добавить логику выполнения введенного кода
  };

  return (
    <Box p={8}>
      <VStack spacing={6} align="stretch">
        <Heading mb={2}>Playground</Heading>
        <Text mb={4}>Это страница для экспериментов и тестирования компонентов.</Text>
        
        <Textarea 
          placeholder="Введите текст здесь..." 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          minHeight="200px"
          resize="vertical"
        />
        
        <Button 
          colorScheme="blue" 
          onClick={handleRun}
          alignSelf="flex-start"
        >
          Run
        </Button>
      </VStack>
    </Box>
  );
} 