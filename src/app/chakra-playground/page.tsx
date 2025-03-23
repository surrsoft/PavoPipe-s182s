'use client';

import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Heading,
  useColorMode,
  Switch,
  Card,
  CardBody,
  Badge,
  Divider,
  Alert,
  AlertIcon,
  chakra
} from "@chakra-ui/react";

const BoxStyled = chakra(Box, {
  
})

export default function ChakraPlayground() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box p={8}>
      <Box>

      </Box>

      <VStack spacing={6} align="stretch">
        <Heading>Chakra UI Playground</Heading>

        <Card>
          <CardBody>
            <HStack>
              <Text>Переключить тему:</Text>
              <Switch
                isChecked={colorMode === 'dark'}
                onChange={toggleColorMode}
              />
            </HStack>
          </CardBody>
        </Card>

        <Box>
          <Heading size="md" mb={4}>Примеры компонентов</Heading>

          <VStack spacing={4} align="stretch">
            <HStack spacing={2}>
              <Badge>Default</Badge>
              <Badge colorScheme="green">Success</Badge>
              <Badge colorScheme="red">Error</Badge>
              <Badge colorScheme="purple">New</Badge>
            </HStack>

            <Divider />

            <Alert status="info">
              <AlertIcon />
              Это информационное сообщение
            </Alert>

            <HStack spacing={4}>
              <Button colorScheme="blue">Primary</Button>
              <Button colorScheme="green">Success</Button>
              <Button colorScheme="red">Danger</Button>
            </HStack>
          </VStack>
        </Box>


      </VStack>
    </Box>
  );
} 