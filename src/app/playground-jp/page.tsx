'use client';

import { useState } from 'react';
import { Box, Button, Flex, Heading, Textarea, useToast, Select } from '@chakra-ui/react';
import { jsonToPavoPipe } from '@/PavoPipe';

export default function PlaygroundJSONToPavoPipe() {
  const [jsonInput, setJsonInput] = useState('');
  const [pavoPipeOutput, setPavoPipeOutput] = useState('');
  const toast = useToast();

  // ---
  
  const examples = {
    simple: `{
  "name": "John",
  "age": 30,
  "city": "New York"
}`,
    nested: `{
  "user": {
    "name": "Alice",
    "contacts": {
      "email": "alice@example.com",
      "phone": "123-456-7890"
    }
  }
}`,
    array: `{
  "users": [
    {"name": "Bob", "age": 25},
    {"name": "Carol", "age": 28}
  ]
}`
  };

  const handleExampleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    if (selected in examples) {
      setJsonInput(examples[selected as keyof typeof examples]);
    }
  };

  const convertJSONToPavoPipe = () => {
    try {
      // Парсим JSON
      const jsonData = JSON.parse(jsonInput);
      console.log('!!-!!-0637 jsonData', jsonData); // del+ 

      // Преобразуем в формат PavoPipe
      const pavoPipeResult = jsonToPavoPipe(jsonData);
      
      setPavoPipeOutput(pavoPipeResult);
    } catch (error) {
      toast({
        title: 'Ошибка конвертации',
        description: error instanceof Error ? error.message : 'Неизвестная ошибка',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // ---
  
  return (
    <Box maxWidth="1200px" margin="0 auto" padding="4">
      <Heading mb={6}>JSON to PavoPipe Converter</Heading>
      
      <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
        <Box flex="1">
          <Select mb={2} placeholder="Выберите пример" onChange={handleExampleSelect}>
            <option value="simple">Простой объект</option>
            <option value="nested">Вложенный объект</option>
            <option value="array">Массив объектов</option>
          </Select>
          <Textarea
            placeholder="Введите JSON"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            height="400px"
            fontFamily="monospace"
          />
          <Button 
            colorScheme="blue" 
            mt={2} 
            onClick={convertJSONToPavoPipe}
            isDisabled={!jsonInput}
          >
            Конвертировать
          </Button>
        </Box>
        
        <Box flex="1">
          <Textarea
            placeholder="PavoPipe результат"
            value={pavoPipeOutput}
            readOnly
            height="400px"
            fontFamily="monospace"
          />
        </Box>
      </Flex>
    </Box>
  );
} 