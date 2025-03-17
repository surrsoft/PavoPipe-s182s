/**
 * Функция для преобразования формата PavoPipe в JSON
 * @param content - строка в формате PavoPipe
 * @returns массив объектов в формате JSON
 */
export function pavoPipeToJson(content: string): any[] {
  // Описания полей
  const descriptions: Record<string, string> = {};
  
  // Результирующий массив объектов
  const result: any[] = [];
  
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
        result.push({ ...currentItem });
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
    result.push({ ...currentItem });
  }
  
  return result;
  
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

/**
 * Функция для преобразования JSON в формат PavoPipe
 * @param data - массив объектов для преобразования в PavoPipe
 * @param descriptions - описания полей (опционально)
 * @returns строка в формате PavoPipe
 */
export function jsonToPavoPipe(
  data: Record<string, any>[],
  descriptions?: Record<string, string>
): string {
  let result = '';
  
  // Добавляем описания полей, если они предоставлены
  if (descriptions) {
    for (const [fieldName, description] of Object.entries(descriptions)) {
      result += `= ${fieldName} ${description}\n`;
    }
    result += '\n';
  }
  
  // Добавляем данные
  for (const item of data) {
    result += '- ';
    
    // Добавляем поля
    const fields = Object.entries(item);
    for (let i = 0; i < fields.length; i++) {
      const [fieldName, fieldValue] = fields[i];
      result += `|${fieldName} ${fieldValue}`;
      
      if (i < fields.length - 1) {
        result += ' ';
      }
    }
    
    result += '\n';
  }
  
  return result;
} 