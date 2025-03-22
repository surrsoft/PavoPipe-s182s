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
    const expectedData = [
      { n: 'текст на английском языке', s: 'текст на русском языке' },
      { s: 'стол', n: 'table' },
      { n: 'bar', foo: 'ещё что-то' }
    ];

    const result = pavoPipeToJson({ content: SIMPLE_K_ITEM_INPUT });
    expect(result.data).toEqual(expectedData);
    expect(result.descriptions).toEqual({});
  });

  test('P02 - должен парсить PavoPipe формат с d-item и k-item', () => {
    const expectedData = [
      { c: 'Париж', f: '3 век до н.э.' },
      { c: 'Рим', f: '753 год до н.э.' },
      { c: 'Лондон', f: 'ок. 47 год н.э.' },
      { c: 'Москва', f: '1147 год' }
    ];
    
    const expectedDescriptions = {
      c: 'название столицы',
      f: 'дата основания'
    };

    const result = pavoPipeToJson({ content: D_ITEM_AND_K_ITEM_INPUT });
    expect(result.data).toEqual(expectedData);
    expect(result.descriptions).toEqual(expectedDescriptions);
  });

  test('P03 - должен парсить PavoPipe формат с переносами строк между полями', () => {
    const expectedData = [
      { c: 'Париж', f: '3 век до н.э.' },
      { c: 'Рим', f: '753 год до н.э.' },
      { c: 'Лондон', f: 'ок. 47 год н.э.' },
      { c: 'Москва', f: '1147 год' }
    ];
    
    const expectedDescriptions = {
      c: 'название   столицы',
      f: 'дата       основания'
    };

    const result = pavoPipeToJson({ content: MULTILINE_FIELDS_INPUT });
    expect(result.data).toEqual(expectedData);
    expect(result.descriptions).toEqual(expectedDescriptions);
  });

  test('P04 - должен обрабатывать пустые строки и различные пробельные символы', () => {
    const expectedData = [
      { c: 'Париж', f: '3 век до н.э.' },
      { c: 'Рим', f: '753 год до н.э.' }
    ];
    
    const expectedDescriptions = {
      c: 'название столицы'
    };

    const result = pavoPipeToJson({ content: EMPTY_LINES_INPUT });
    expect(result.data).toEqual(expectedData);
    expect(result.descriptions).toEqual(expectedDescriptions);
  });

  test('P05 - должен обрабатывать сложные многострочные структуры', () => {
    const expectedData = [
      { name: 'Иван', age: '30', job: 'Программист' },
      { name: 'Мария', age: '25', job: 'Дизайнер' },
      { name: 'Алексей', age: '40', job: 'Менеджер' }
    ];
    
    const expectedDescriptions = {
      name: 'имя',
      age: 'возраст',
      job: 'работа'
    };

    const result = pavoPipeToJson({ content: COMPLEX_MULTILINE_INPUT });
    expect(result.data).toEqual(expectedData);
    expect(result.descriptions).toEqual(expectedDescriptions);
  });

  test('P06 - должен поддерживать переносы строк в значениях полей', () => {
    const input = `= desc описание
= text текст

- |desc Первая строка
  Вторая строка
    Третья строка |text Текст с
  переносом строк`;

    const expectedData = [
      {
        desc: `Первая строка
  Вторая строка
    Третья строка`,
        text: `Текст с
  переносом строк`
      }
    ];
    
    const expectedDescriptions = {
      desc: 'описание',
      text: 'текст'
    };

    const result = pavoPipeToJson({ content: input });
    expect(result.data).toEqual(expectedData);
    expect(result.descriptions).toEqual(expectedDescriptions);
  });



  test('P07 - несколько одинаковых полей должны давать массив', () => {
    const input = `= b описание
= f текст

- |b b1 |f f1
- |b b2 |f f2 |s s1 |f f3`;

    const expectedData = [
      {
        b: 'b1',
        f: 'f1'
      },
      {
        b: 'b2',
        f: ['f2', 'f3'],
        s: 's1'
      }
    ];
    
    const expectedDescriptions = {
      b: 'описание',
      f: 'текст'
    };

    const result = pavoPipeToJson({ content: input });
    
    expect(result.data[0].b).toEqual('b1');
    expect(result.data[0].f).toEqual('f1');
    expect(result.data[1].b).toEqual('b2');
    
    expect(result.data[1].f).toBeInstanceOf(Array);
    expect(result.data[1].f).toHaveLength(2);
    expect(result.data[1].f).toContain('f2');
    expect(result.data[1].f).toContain('f3');
    
    expect(result.data[1].s).toEqual('s1');

    expect(result.descriptions.b).toEqual(expectedDescriptions.b);
    expect(result.descriptions.f).toEqual(expectedDescriptions.f);
  });
});
