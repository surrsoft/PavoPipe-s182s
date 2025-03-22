import { PavoPipeObj } from "./types/PavoPipeJson";

/**
 * Параметры для функции pavoPipeToJson
 */
export interface Params {
  /** !pp-content! */
  content: string;
}

/**
 * Функция для преобразования формата PavoPipe в JSON
 * @param params - параметры функции
 * @returns объект с описаниями полей и данными
 */
export function pavoPipeToJson(params: Params): PavoPipeObj {
  const { content } = params;
  
  // Описания полей
  const descriptions: Record<string, string> = {};
  
  // Результирующий массив объектов
  const data: Record<string, string>[] = [];
  
  // Разбиваем контент на строки
  const lines = content.split('\n');
  
  // Текущая запись данных
  let currentItem: Record<string, string> | null = null;
  // Имя последнего обработанного поля
  let lastFieldName: string | null = null;
  
  // Обработка строк
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Пропускаем пустые строки
    if (!line) continue;
    
    // Обработка строки с описанием поля (начинается с "=")
    if (line.startsWith('=')) {
      const match = line.match(/^=\s+(\S+)\s+(.*)/);
      if (match) {
        const [, fieldName, fieldDesc] = match;
        descriptions[fieldName] = fieldDesc;
      }
      continue;
    }
    
    // Обработка строки с данными (начинается с "-")
    if (line.startsWith('-')) {
      // Если была предыдущая запись, добавляем её в результат
      if (currentItem) {
        data.push({ ...currentItem });
      }
      
      // Создаем новую запись
      currentItem = {};
      lastFieldName = null;
      
      // Обрабатываем поля в текущей строке
      processFieldsInLine(line.substring(1).trim(), currentItem);
      continue;
    }
    
    // Обработка продолжения строки данных
    if (currentItem) {
      const originalLine = lines[i]; // Используем оригинальную строку без trim()
      // Проверяем, содержит ли строка новые поля
      const pipeIndex = originalLine.indexOf('|');
      if (pipeIndex !== -1) {
        // Если строка содержит |, разделяем её на продолжение и новые поля
        if (pipeIndex > 0 && lastFieldName && lastFieldName in currentItem) {
          // Добавляем часть до | к предыдущему полю, сохраняя исходные отступы
          const prefix = originalLine.substring(0, pipeIndex);
          if (prefix.trim()) {
            currentItem[lastFieldName] += '\n' + prefix.replace(/\s+$/, '');
          }
        }
        // Обрабатываем новые поля после |
        processFieldsInLine(originalLine.substring(pipeIndex), currentItem);
      } else if (lastFieldName && lastFieldName in currentItem) {
        // Если строка не содержит |, добавляем её к последнему полю, сохраняя исходные отступы
        if (originalLine.trim()) {
          currentItem[lastFieldName] += '\n' + originalLine.replace(/\s+$/, '');
        }
      }
    }
  }
  
  // Добавляем последнюю запись, если она есть
  if (currentItem) {
    data.push({ ...currentItem });
  }
  
  return {
    descriptions,
    data
  };
  
  // Вспомогательная функция для обработки полей в строке
  function processFieldsInLine(line: string, item: Record<string, string>) {
    // Ищем все поля в строке (формат: |field_name field_value)
    const fieldRegex = /\|(\S+)\s+([^|]*?)(?=\|\S+\s+|$)/g;
    let match;
    
    while ((match = fieldRegex.exec(line + ' '))) {
      const [, fieldName, fieldValue] = match;
      lastFieldName = fieldName;
      // Если поле уже существует, добавляем перенос строки
      if (fieldName in item) {
        const value = fieldValue.trim();
        if (value) {
          item[fieldName] += '\n' + value;
        }
      } else {
        item[fieldName] = fieldValue.trim();
      }
    }
  }
}

