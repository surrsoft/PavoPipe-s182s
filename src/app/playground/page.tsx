'use client';

import { pavoPipeToJson } from "@/PavoPipe";
import { Box, Heading, Text, Textarea, Button, VStack, Flex, Select, useToast, Icon } from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { useState } from "react";

/**
 * Страница для тестирования преобразования формата PavoPipe в JSON.
 * Позволяет вводить текст в формате PavoPipe и получать результат в формате JSON.
 */
export default function Playground() {
  const [inputText, setInputText] = useState("");
  const [output, setOutput] = useState("");
  const toast = useToast();

  // ---

  // сущность !!s191s!!
  const examples = {
    simple: `- |n текст на английском языке |s текст на русском языке
- |s стол |n table
- |n bar |foo ещё что-то`,

    cities: `= c название столицы
= f дата основания

- |c Париж |f 3 век до н.э.
- |c Рим |f 753 год до н.э.
- |c Лондон |f ок. 47 год н.э.
- |c Москва |f 1147 год`,

    users: `= name имя
= age возраст
= job работа

- |name Иван 
  |age 30
  |job Программист
- |name Мария
  |age 25
  |job Дизайнер
- |name Алексей |age 40
  |job Менеджер`,

    multiline: `= desc описание
= text текст

- |desc Первая строка
Вторая строка
  Третья строка |text Текст с
переносом строк`,

    array: `= b описание
= f текст

- |b b1 |f f1
- |b b2 |f f2 |s s1 |f f3`,
  };

  const handleExampleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    if (selected in examples) {
      setInputText(examples[selected as keyof typeof examples]);
    }
  };

  // ---

  const handleRun = () => {
    const json = pavoPipeToJson({ content: inputText });
    const jsonStr = JSON.stringify(json, null, 2);
    setOutput(jsonStr);
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

  return (
    <Box maxWidth="1200px" margin="0 auto" padding="4">
      <Heading mb={6}>Playground</Heading>
      <Text mb={4}>Преобразование текста в формате PavoPipe в JSON</Text>
      <Box mt={8}>
        <Box
          display="grid"
          gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
          gridTemplateRows={{ base: "auto auto auto auto", md: "auto auto" }}
          gap={4}
        >
          <Box p={4} bg="blue.100" borderRadius="md" gridRow={{ base: "1", md: "1" }}>
            <Select mb={2} width={400} placeholder="Примеры" onChange={handleExampleSelect}>
              <option value="simple">Пример 1</option>
              <option value="cities">Пример 2</option>
              <option value="users">Пример 3</option>
              <option value="multiline">Пример 4 переносы строк</option>
              <option value="array">Пример 5 array</option>
            </Select>
          </Box>
          <Box p={4} bg="green.100" borderRadius="md" gridRow={{ base: "3", md: "1" }}>
            <Heading size="md" mb={2}>Результат:</Heading>
          </Box>
          <Box p={4} bg="yellow.100" borderRadius="md" gridRow={{ base: "2", md: "2" }}>
            <Box position="relative">
              <Textarea
                placeholder="Введите текст здесь..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                height="400px"
                fontFamily="monospace"
                resize="vertical"
              />
              <Button
                position="absolute"
                top={2}
                right={2}
                size="sm"
                onClick={() => copyToClipboard(inputText)}
                aria-label="Копировать"
              >
                <Icon as={CopyIcon} />
              </Button>
            </Box>
          </Box>
          <Box p={4} bg="red.100" borderRadius="md">
            <Box position="relative">
              <Textarea
                value={output}
                onChange={(e) => setOutput(e.target.value)}
                height="400px"
                fontFamily="monospace"
              />
              <Button
                position="absolute"
                top={2}
                right={2}
                size="sm"
                onClick={() => copyToClipboard(output)}
                aria-label="Копировать"
              >
                <Icon as={CopyIcon} />
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box flex="1">
        <Button
          colorScheme="blue"
          onClick={handleRun}
          mt={2}
          isDisabled={!inputText}
        >
          Run
        </Button>
      </Box>
    </Box>
  );
} 