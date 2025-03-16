'use client';

import { ThemeProvider } from 'next-themes';
import { ChakraProvider } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

/**
 * См. пример https://github.com/chakra-ui/chakra-ui/blob/main/sandbox/next-app/app/provider.tsx
 */
export function ChakraProviderIn({children}: {children: React.ReactNode}) {
  // Предотвращение ошибок гидратации с помощью отложенного рендеринга на клиенте
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ChakraProvider>
      <ThemeProvider attribute="data-theme" enableSystem={false} defaultTheme="dark">
        {mounted ? children : null}
      </ThemeProvider>
    </ChakraProvider>
  )
}
