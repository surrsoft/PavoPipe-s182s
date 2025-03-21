'use client';

import { pavoPipeToJson } from "@/PavoPipe";
import { Box, Heading, Text, Textarea, Button, VStack } from "@chakra-ui/react";
import { useState } from "react";

/**
 * Страница для тестирования преобразования формата PavoPipe в JSON.
 * Позволяет вводить текст в формате PavoPipe и получать результат в формате JSON.
 */
export default function Playground() {
  const [inputText, setInputText] = useState("");
  const [output, setOutput] = useState("");

  const handleRun = () => {
    const json = pavoPipeToJson({ content: inputText });
    const jsonStr = JSON.stringify(json, null, 2);
    setOutput(jsonStr);
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
        </Button>``

        <Box>
          <Heading size="md" mb={2}>Результат:</Heading>
          <pre>{output}</pre>
        </Box>
      </VStack>
    </Box>
  );
} 