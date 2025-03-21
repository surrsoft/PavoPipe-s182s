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
  console.log('!!-!!-0643 data', {data, t: typeof data, isArray: Array.isArray(data)}); // del+ 
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
    console.log('!!-!!-0642 item', item); // del+ 
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
