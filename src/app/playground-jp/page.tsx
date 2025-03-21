'use client';

import { useState } from 'react';
import { Box, Button, Flex, Heading, Textarea, useToast, Select, Icon } from '@chakra-ui/react';
import { CopyIcon } from "@chakra-ui/icons";
import { jsonToPavoPipe } from '@/PavoPipe';

export default function PlaygroundJSONToPavoPipe() {
  const [jsonInput, setJsonInput] = useState('');
  const [pavoPipeOutput, setPavoPipeOutput] = useState('');
  const toast = useToast();

  // ---
  
  const examples = {
    simple: `{
  "descriptions": {},
  "data": [
    {
      "n": "текст на английском языке",
      "s": "текст на русском языке"
    },
    {
      "s": "стол",
      "n": "table"
    },
    {
      "n": "bar",
      "foo": "ещё что-то"
    }
  ]
}`,
    nested: `{
  "descriptions": {
    "name": "имя",
    "age": "возраст",
    "job": "работа"
  },
  "data": [
    {
      "name": "Иван",
      "age": "30",
      "job": "Программист"
    },
    {
      "name": "Мария",
      "age": "25",
      "job": "Дизайнер"
    },
    {
      "name": "Алексей",
      "age": "40",
      "job": "Менеджер"
    }
  ]
}`,
    array: `{
  "descriptions": {
    "c": "название столицы",
    "f": "дата основания"
  },
  "data": [
    {
      "c": "Париж",
      "f": "3 век до н.э."
    },
    {
      "c": "Рим",
      "f": "753 год до н.э."
    },
    {
      "c": "Лондон",
      "f": "ок. 47 год н.э."
    },
    {
      "c": "Москва",
      "f": "1147 год"
    }
  ]
}`
  };

  const handleExampleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    if (selected in examples) {
      setJsonInput(examples[selected as keyof typeof examples]);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: 'Скопировано',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Ошибка копирования',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
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
            <option value="simple">Пример 1</option>
            <option value="nested">Пример 2</option>
            <option value="array">Пример 3</option>
          </Select>
          <Box position="relative">
            <Textarea
              placeholder="Введите JSON"
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              height="400px"
              fontFamily="monospace"
            />
            <Button
              position="absolute"
              top={2}
              right={2}
              size="sm"
              onClick={() => copyToClipboard(jsonInput)}
              aria-label="Копировать"
            >
              <Icon as={CopyIcon} />
            </Button>
          </Box>
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
          <Box position="relative">
            <Textarea
              placeholder="PavoPipe результат"
              value={pavoPipeOutput}
              readOnly
              height="400px"
              fontFamily="monospace"
            />
            <Button
              position="absolute"
              top={2}
              right={2}
              size="sm"
              onClick={() => copyToClipboard(pavoPipeOutput)}
              aria-label="Копировать"
            >
              <Icon as={CopyIcon} />
            </Button>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
} 