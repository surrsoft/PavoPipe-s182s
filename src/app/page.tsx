'use client';

import styles from "./page.module.css";
import { Button, VStack, HStack, Heading } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <VStack spacing={6}>
          <Heading size="xl" mb={4}>Главная страница</Heading>
          
          <HStack spacing={4}>
            <Link href="/playground">
              <Button colorScheme="blue" size="lg">
                Playground PavoPipe to JSON
              </Button>
            </Link>

            <Link href="/playground-jp">
              <Button colorScheme="blue" size="lg">
                Playground JSON to PavoPipe
              </Button>
            </Link>
            
            <Link href="/about">
              <Button colorScheme="green" size="lg">
                О проекте
              </Button>
            </Link>
          </HStack>
        </VStack>
      </main>
    </div>
  );
}
