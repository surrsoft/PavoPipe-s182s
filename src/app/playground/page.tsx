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
  |job Менеджер`
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
      <Text mb={4}>Это страница для экспериментов и тестирования компонентов.</Text>

      <Select mb={2} width={400} placeholder="Примеры" onChange={handleExampleSelect}>
        <option value="simple">Простой пример</option>
        <option value="cities">Столицы</option>
        <option value="users">Пользователи</option>
      </Select>
      <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
        <Box flex="1">

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

          <Button
            colorScheme="blue"
            onClick={handleRun}
            mt={2}
            isDisabled={!inputText}
          >
            Run
          </Button>
        </Box>

        <Box flex="1">
          <Heading size="md" mb={2}>Результат:</Heading>
          <Box position="relative">
            <Textarea
              value={output}
              readOnly
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
      </Flex>
    </Box>
  );
} 