import { pavoPipeToJson } from './pavoPipeToJson';

// Тестовые данные
const SIMPLE_K_ITEM_INPUT = `- |n текст на английском языке |s текст на русском языке
- |s стол |n table
- |n bar |foo ещё что-то`;

const D_ITEM_AND_K_ITEM_INPUT = `= c название столицы
= f дата основания

- |c Париж |f 3 век до н.э.
- |c Рим |f 753 год до н.э.
- |c Лондон |f ок. 47 год н.э.
- |c Москва |f 1147 год`;

const MULTILINE_FIELDS_INPUT = `= c название   столицы
= f дата       основания

- |c Париж
    |f 3 век до н.э.
- |c Рим
    |f 753 год до н.э.
- |c Лондон 
    |f ок. 47 год н.э.
- |c Москва 
    |f 1147 год`;

const EMPTY_LINES_INPUT = `
    
= c название столицы

- |c Париж    |f 3 век до н.э.


- |c Рим |f 753 год до н.э.
`;

const COMPLEX_MULTILINE_INPUT = `= name имя
= age возраст
= job работа

- |name Иван 
  |age 30
  |job Программист
- |name Мария
  |age 25
  |job Дизайнер
- |name Алексей |age 40
  |job Менеджер`;

describe('pavoPipeToJson', () => {
  test('P01 - должен парсить PavoPipe формат с простыми k-item', () => {
    const expected = [
      { n: 'текст на английском языке', s: 'текст на русском языке' },
      { s: 'стол', n: 'table' },
      { n: 'bar', foo: 'ещё что-то' }
    ];

    expect(pavoPipeToJson(SIMPLE_K_ITEM_INPUT)).toEqual(expected);
  });

  test('P02 - должен парсить PavoPipe формат с d-item и k-item', () => {
    const expected = [
      { c: 'Париж', f: '3 век до н.э.' },
      { c: 'Рим', f: '753 год до н.э.' },
      { c: 'Лондон', f: 'ок. 47 год н.э.' },
      { c: 'Москва', f: '1147 год' }
    ];

    expect(pavoPipeToJson(D_ITEM_AND_K_ITEM_INPUT)).toEqual(expected);
  });

  test('P03 - должен парсить PavoPipe формат с переносами строк между полями', () => {
    const expected = [
      { c: 'Париж', f: '3 век до н.э.' },
      { c: 'Рим', f: '753 год до н.э.' },
      { c: 'Лондон', f: 'ок. 47 год н.э.' },
      { c: 'Москва', f: '1147 год' }
    ];

    expect(pavoPipeToJson(MULTILINE_FIELDS_INPUT)).toEqual(expected);
  });

  test('P04 - должен обрабатывать пустые строки и различные пробельные символы', () => {
    const expected = [
      { c: 'Париж', f: '3 век до н.э.' },
      { c: 'Рим', f: '753 год до н.э.' }
    ];

    expect(pavoPipeToJson(EMPTY_LINES_INPUT)).toEqual(expected);
  });

  test('P05 - должен обрабатывать сложные многострочные структуры', () => {
    const expected = [
      { name: 'Иван', age: '30', job: 'Программист' },
      { name: 'Мария', age: '25', job: 'Дизайнер' },
      { name: 'Алексей', age: '40', job: 'Менеджер' }
    ];

    expect(pavoPipeToJson(COMPLEX_MULTILINE_INPUT)).toEqual(expected);
  });
});
