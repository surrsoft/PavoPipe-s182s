'use client';

import { Box, Flex, Link, Heading, Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { ColorModeButton } from '@/components/ui/color-mode';

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
        
        <Flex gap={6} align="center">
          <Menu>
            <MenuButton as={Button} variant="ghost" color="white" _hover={{ color: 'blue.300' }}>
              Страницы
            </MenuButton>
            <MenuList bg="gray.700">
              <MenuItem as={NextLink} href="/playground" bg="gray.700" _hover={{ bg: 'gray.600' }}>
                PavoPipe to JSON
              </MenuItem>
              <MenuItem as={NextLink} href="/playground-jp" bg="gray.700" _hover={{ bg: 'gray.600' }}>
                JSON to PavoPipe
              </MenuItem>
              <MenuItem as={NextLink} href="/chakra-playground" bg="gray.700" _hover={{ bg: 'gray.600' }}>
                Chakra UI Demo
              </MenuItem>
              <MenuItem as={NextLink} href="/about" bg="gray.700" _hover={{ bg: 'gray.600' }}>
                О проекте
              </MenuItem>
            </MenuList>
          </Menu>
          <ColorModeButton color="white" _hover={{ color: 'blue.300' }} />
        </Flex>
      </Flex>
    </Box>
  );
}; 