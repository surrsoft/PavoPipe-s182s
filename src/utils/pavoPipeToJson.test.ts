import { pavoPipeToJson } from './pavoPipeToJson';

describe('pavoPipeToJson', () => {
  test('должен парсить PavoPipe формат с простыми k-item', () => {
    const input = `- |n текст на английском языке |s текст на русском языке
- |s стол |n table
- |n bar |foo ещё что-то`;

    const expected = [
      { n: 'текст на английском языке', s: 'текст на русском языке' },
      { s: 'стол', n: 'table' },
      { n: 'bar', foo: 'ещё что-то' }
    ];

    expect(pavoPipeToJson(input)).toEqual(expected);
  });

  test('должен парсить PavoPipe формат с d-item и k-item', () => {
    const input = `= c название столицы
= f дата основания

- |c Париж |f 3 век до н.э.
- |c Рим |f 753 год до н.э.
- |c Лондон |f ок. 47 год н.э.
- |c Москва |f 1147 год`;

    const expected = [
      { c: 'Париж', f: '3 век до н.э.' },
      { c: 'Рим', f: '753 год до н.э.' },
      { c: 'Лондон', f: 'ок. 47 год н.э.' },
      { c: 'Москва', f: '1147 год' }
    ];

    expect(pavoPipeToJson(input)).toEqual(expected);
  });

  test('должен парсить PavoPipe формат с переносами строк между полями', () => {
    const input = `= c название   столицы
= f дата       основания

- |c Париж
    |f 3 век до н.э.
- |c Рим
    |f 753 год до н.э.
- |c Лондон 
    |f ок. 47 год н.э.
- |c Москва 
    |f 1147 год`;

    const expected = [
      { c: 'Париж', f: '3 век до н.э.' },
      { c: 'Рим', f: '753 год до н.э.' },
      { c: 'Лондон', f: 'ок. 47 год н.э.' },
      { c: 'Москва', f: '1147 год' }
    ];

    expect(pavoPipeToJson(input)).toEqual(expected);
  });

  test('должен обрабатывать пустые строки и различные пробельные символы', () => {
    const input = `
    
= c название столицы

- |c Париж    |f 3 век до н.э.


- |c Рим |f 753 год до н.э.
`;

    const expected = [
      { c: 'Париж', f: '3 век до н.э.' },
      { c: 'Рим', f: '753 год до н.э.' }
    ];

    expect(pavoPipeToJson(input)).toEqual(expected);
  });

  test('должен обрабатывать сложные многострочные структуры', () => {
    const input = `= name имя
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

    const expected = [
      { name: 'Иван', age: '30', job: 'Программист' },
      { name: 'Мария', age: '25', job: 'Дизайнер' },
      { name: 'Алексей', age: '40', job: 'Менеджер' }
    ];

    expect(pavoPipeToJson(input)).toEqual(expected);
  });
});
