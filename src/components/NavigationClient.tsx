'use client';

import { Box, Flex, Link, Heading, Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

export const NavigationClient = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

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
              <MenuItem 
                as={NextLink} 
                href="/playground" 
                color={isActive('/playground') ? 'blue.500' : 'gray.800'}
                bg={isActive('/playground') ? 'gray.100' : 'transparent'}
              >
                Playground
              </MenuItem>
              <MenuItem 
                as={NextLink} 
                href="/playground-jp" 
                color={isActive('/playground-jp') ? 'blue.500' : 'gray.800'}
                bg={isActive('/playground-jp') ? 'gray.100' : 'transparent'}
              >
                Playground JP
              </MenuItem>
              <MenuItem 
                as={NextLink} 
                href="/settings" 
                color={isActive('/settings') ? 'blue.500' : 'gray.800'}
                bg={isActive('/settings') ? 'gray.100' : 'transparent'}
              >
                Настройки
              </MenuItem>
              <MenuItem 
                as={NextLink} 
                href="/about" 
                color={isActive('/about') ? 'blue.500' : 'gray.800'}
                bg={isActive('/about') ? 'gray.100' : 'transparent'}
              >
                О нас
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
}; 