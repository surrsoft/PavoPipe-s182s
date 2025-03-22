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
      
      // Обрабатываем поля в текущей строке
      processFieldsInLine(line.substring(1).trim(), currentItem);
      continue;
    }
    
    // Обработка продолжения строки данных (начинается с "|")
    if (line.startsWith('|') && currentItem) {
      processFieldsInLine(line, currentItem);
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
    const fieldRegex = /\|(\S+)\s+(.*?)(?=\|\S+\s+|$)/g;
    let match;
    
    while ((match = fieldRegex.exec(line + ' '))) {
      const [, fieldName, fieldValue] = match;
      item[fieldName] = fieldValue.trim();
    }
  }
}

