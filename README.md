- ID проекта: !!s182s!!
- описание проекта: проект цель которого предоставить базовый код для работы с форматом PavoPipe (!pavo-pipe!), на технологии TypeScript
- PORT: 22149

# История установок и настроек

- установленное помечено галочкой

## Настройки

- в package.json в команде `dev` прописан порт 22149: `"dev": "next dev --turbopack -p 22149",`

### Известные проблемы

#### Интеграция Chakra UI с Next.js App Router

Для обеспечения корректной работы Chakra UI с Next.js App Router были установлены следующие пакеты и внесены изменения:

1. Установлены необходимые пакеты:
   ```bash
   npm install @chakra-ui/next-js @emotion/styled framer-motion
   ```

   Пакеты `@emotion/styled` и `framer-motion` являются обязательными зависимостями для корректной работы Chakra UI. Без них некоторые компоненты и анимации могут работать некорректно.

2. Добавлен компонент `CacheProvider` в файл `src/settings/ChakraProviderIn.tsx`:
   ```tsx
   import { CacheProvider } from '@chakra-ui/next-js';
   
   export function ChakraProviderIn({children}: {children: React.ReactNode}) {
     return (
       <CacheProvider>
         <ChakraProvider>
           <ThemeProvider attribute="data-theme" enableSystem={false} defaultTheme="dark">
             {children}
           </ThemeProvider>
         </ChakraProvider>
       </CacheProvider>
     )
   }
   ```

Эти изменения решают проблемы гидратации при использовании Chakra UI с Next.js App Router и обеспечивают корректную работу стилизованных компонентов.

#### Проблема гидратации с темной темой

В проекте была решена проблема гидратации, связанная с несоответствием между HTML, отрендеренным на сервере, и клиентским рендерингом при использовании темной темы. Ошибка проявлялась следующим образом:

```
Error: Hydration failed because the server rendered HTML didn't match the client.
```

Решение включало следующие изменения:

1. Добавление атрибута `suppressHydrationWarning` к элементу `html` в файле `src/app/layout.tsx`:
   ```tsx
   <html lang="en" suppressHydrationWarning>
   ```

2. Настройка `ThemeProvider` с явными параметрами в файле `src/settings/ChakraProviderIn.tsx`:
   ```tsx
   <ThemeProvider attribute="data-theme" enableSystem={false} defaultTheme="dark">
   ```

3. Добавление скрипта в `head` для установки темной темы до загрузки React:
   ```tsx
   <script
     dangerouslySetInnerHTML={{
       __html: `
         (function() {
           document.documentElement.setAttribute('data-theme', 'dark');
           document.documentElement.style.colorScheme = 'dark';
         })()
       `,
     }}
   />
   ```

Эти изменения обеспечивают согласованность между серверным и клиентским рендерингом, предотвращая ошибки гидратации.

#### Совместимость Chakra UI с React 19

В проекте используется Chakra UI версии 2.8.2, так как версия 3.x несовместима с React 19. При использовании Chakra UI 3.x возникает ошибка:

```
TypeError: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2d$ui$2f$react$2f$dist$2f$components$2f$field$2f$field$2e$anatomy$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__.fieldAnatomy.extendWith is not a function
```

Это связано с тем, что Chakra UI 3.x использует библиотеку @ark-ui/react, в которой метод `fieldAnatomy.extendWith` не работает корректно с React 19.

Решение: использовать Chakra UI версии 2.8.2 вместо 3.x:
```
npm install @chakra-ui/react@2.8.2
```

#### Порт уже используется

Если при запуске проекта возникает ошибка:
```
Error: listen EADDRINUSE: address already in use :::22149
```

Это означает, что порт 22149 уже занят другим процессом. Решения:
1. Завершить процесс, использующий порт 22149
2. Изменить порт в package.json на другой

### Оптимизация [[250317002609]]

Проект использует функцию `optimizePackageImports` из Next.js для оптимизации размера бандла Chakra UI. Это позволяет загружать только те компоненты Chakra UI, которые фактически используются в проекте.

Настройка находится в `next.config.ts`:

```typescript
const config: NextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
};
```

## Установка пакетов

- ChakraUI (https://chakra-ui.com/docs/get-started/frameworks/next-app)
  - [x] `npm i @chakra-ui/react`
  - [x] `npm i @emotion/react`
  - [x] `npx @chakra-ui/cli snippet add` (это добавит @chakra-ui/cli)
  - [x] `npm i @chakra-ui/next-js`
  - [x] `npm i @emotion/styled`
  - [x] `npm i framer-motion`
  - [x] `npm i @chakra-ui/icons`
  - [x] `npm i react-icons --save`
  - `npm i chakra-react-select`
- React Query
  - `npm i @tanstack/react-query`
  - `npm i -D @tanstack/eslint-plugin-query`
  - `npm i @tanstack/react-query-devtools`
- Jest
  - https://nextjs.org/docs/pages/building-your-application/optimizing/testing#jest-and-react-testing-library
  - `npm i -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom`
  - `npm i -D @types/jest`
- Final Form
  - `npm install --save final-form react-final-form`
- другое
  - `npm i sass`
  - `npm i axios`
  - `npm i lodash @types/lodash`
  - `npm i react-hook-form`
  - `npm i zod`
  - `npm i next-international`
  - `npm i path-to-regexp`
  - [x] `npm i -D eslint-plugin-import` (для автоматической сортировки импортов, см. !asau177!)


