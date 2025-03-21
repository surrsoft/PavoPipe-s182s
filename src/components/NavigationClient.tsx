'use client';

import { Box, Flex, Link, Heading, Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
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
          
          <Menu>
            <MenuButton as={Button} variant="ghost" color="white" _hover={{ color: 'blue.300' }}>
              Страницы
            </MenuButton>
            <MenuList>
              <MenuItem as={NextLink} href="/playground" color="gray.800">
                Playground
              </MenuItem>
              <MenuItem as={NextLink} href="/playground-jp" color="gray.800">
                Playground JP
              </MenuItem>
              <MenuItem as={NextLink} href="/settings" color="gray.800">
                Настройки
              </MenuItem>
              <MenuItem as={NextLink} href="/about" color="gray.800">
                О нас
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
}; 