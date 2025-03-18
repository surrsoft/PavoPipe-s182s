- ID проекта: !!s182s!!
- описание проекта: проект цель которого предоставить базовый код для работы с форматом PavoPipe (!pavo-pipe!), на технологии TypeScript
- https://github.com/surrsoft/PavoPipe-s182s
- PORT: 22149


# Описание формата PavoPipe, rev. 1.4.0

- это CSV-подобный формат представления данных. От CSV отличается отсутствием строгого порядка расположения "столбцов"
- представляет собой набор из `!pp-d-item!s` и `!pp-k-item!s`

## понятия

- `!!pp-content!!` - контент в формате `PavoPipe`; такой контент состоит из 1+ `!pp-dk-item!s`
- `!!pp-dk-item!!` - это `!pp-d-item!` или `!pp-k-item!`
- `!!pp-d-item!!` - запись вида `d=fGFNj`; назначение - дать описание для того или иного `!pp-f-name!`
	- где `d` - это начало строки, 
	- ` = ` - знак равно (как есть), 
	- `f` - это пробел, 
	- `F` - это 1+ `!pp-f-space!`,
	- `G` - это `!pp-f-name!`, 
	- `N` - это `!pp-f-desc!`; любой набор символов для описания того чем является `!pp-f-name!` 
	- `j` - это конец строки
- `!!pp-k-item!!` -  запись вида `d-fG`; аналог ряда таблицы; так же как ряд таблицы, состоит из ячеек (`!pp-f-item!`) 
	- где `d` - это начало строки, 
	- `-` - это тире (как есть),
	- `f` - это пробел, 
	- `G` - это `!pp-f-arr!`
- `!!pp-f-arr!!` - это множество из 1+ `!pp-f-item!` разделённых между собой `!pp-f-space!`
- `!!pp-f-item!!` - аналог ячейки таблицы; имеет формат `s|DfG`, 
	- где `s` - это `!pp-f-space!`
	- `D` - это `!pp-f-name!,
	- `f` - это пробел,
	- `G` - это `!pp-f-value!`,
- `!!pp-f-name!!` - имя поля; должно быть строкой удовлетворяющей регулярному выражению `^[a-zA-Z_$][a-zA-Z0-9_$]*$`
- `!!pp-f-value!!` - значение поля; любой набор символов
- `!!pp-f-space!!` - это 1+ пробелов, в том чиле опционально переносов строк
- `!!pp-f-desc!!` - см. `!pp-d-item!`

## примеры

### пример 1 - !pp-content! состоящий только из !pp-k-item!s
	
```Plain
- |n текст на английском языке |s текст на русском языке
- |s стол |n table
- |n bar |foo ещё что-то
```
	
### пример 2 - вверху мы видим два !pp-d-item!s и ниже несколько !pp-k-item!s
	
```Plain
= c название столицы
= f дата основания

- |c Париж |f 3 век до н.э.
- |c Рим |f 753 год до н.э.
- |c Лондон |f ок. 47 год н.э.
- |c Москва |f 1147 год
```
	
### пример 3 - в этом примере используются переносы строк в !pp-k-item!s для разделения отдельных !pp-f-item!s
	
```Plain
= c название   столицы
= f дата       основания

- |c Париж
		|f 3 век до н.э.
- |c Рим
		|f 753 год до н.э.
- |c Лондон 
		|f ок. 47 год н.э.
- |c Москва 
		|f 1147 год
```
        
## Реализованные утилиты PavoPipe

В проекте реализованы следующие утилиты для работы с форматом PavoPipe:

### pavoPipeToJson

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

### jsonToPavoPipe

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