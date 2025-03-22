- ID проекта: !!s182s!!
- описание проекта: проект цель которого предоставить базовый код для работы с форматом PavoPipe (!pavo-pipe!), на технологии TypeScript
- https://github.com/surrsoft/PavoPipe-s182s
- PORT: 22149

# Описание формата PavoPipe

см. в файле README-PavoPipe.md
        
# Реализованные утилиты PavoPipe

В проекте реализованы следующие утилиты для работы с форматом PavoPipe:

## pavoPipeToJson

Функция `pavoPipeToJson` преобразует строку в формате PavoPipe в объект с описаниями полей и массивом данных:

```typescript
import { pavoPipeToJson } from '@/utils';

const pavoData = `= c название столицы
= f дата основания

- |c Париж |f 3 век до н.э.
- |c Рим |f 753 год до н.э.`;

const result = pavoPipeToJson({ content: pavoData });
console.log(result);
/*
{
  descriptions: {
    c: "название столицы",
    f: "дата основания"
  },
  data: [
    { c: "Париж", f: "3 век до н.э." },
    { c: "Рим", f: "753 год до н.э." }
  ]
}
*/
```

## jsonToPavoPipe

Функция `jsonToPavoPipe` преобразует массив JSON-объектов обратно в формат PavoPipe:

```typescript
import { jsonToPavoPipe } from '@/utils';

const jsonData = [
  { c: 'Париж', f: '3 век до н.э.' },
  { c: 'Рим', f: '753 год до н.э.' }
];

const descriptions = {
  c: 'название столицы',
  f: 'дата основания'
};

const pavoData = jsonToPavoPipe(jsonData, descriptions);
// Результат:
// = c название столицы
// = f дата основания
//
// - |c Париж |f 3 век до н.э.
// - |c Рим |f 753 год до н.э.
//
```

Также можно использовать результат функции `pavoPipeToJson` напрямую:

```typescript
import { pavoPipeToJson, jsonToPavoPipe } from '@/utils';

const pavoInput = `= c название столицы
= f дата основания

- |c Париж |f 3 век до н.э.
- |c Рим |f 753 год до н.э.`;

const result = pavoPipeToJson({ content: pavoInput });
const pavoOutput = jsonToPavoPipe(result.data, result.descriptions);
// pavoOutput будет идентичен pavoInput + '\n'
```

Для тестирования этих функций используются Jest и ts-jest. Тесты находятся в файле `src/utils/pavoPipeToJson.test.ts`.


# История установок и настроек

- установленное помечено галочкой

## Настройки

- в package.json в команде `dev` прописан порт 22149: `"dev": "next dev --turbopack -p 22149",`

## Известные проблемы

### Интеграция Chakra UI с Next.js App Router

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

### Проблема гидратации с темной темой

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

### Совместимость Chakra UI с React 19

В проекте используется Chakra UI версии 2.8.2, так как версия 3.x несовместима с React 19. При использовании Chakra UI 3.x возникает ошибка:

```