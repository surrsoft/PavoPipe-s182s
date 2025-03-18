import { jsonToPavoPipe } from './jsonToPavoPipe';
import { pavoPipeToJson } from './pavoPipeToJson';

describe('J01 - jsonToPavoPipe', () => {
    test('должен преобразовывать JSON в PavoPipe формат без описаний', () => {
      const input = [
        { n: 'текст на английском языке', s: 'текст на русском языке' },
        { s: 'стол', n: 'table' },
        { n: 'bar', foo: 'ещё что-то' }
      ];
  
      const expected = `- |n текст на английском языке |s текст на русском языке
- |s стол |n table
- |n bar |foo ещё что-то
`;
  
      expect(jsonToPavoPipe(input)).toEqual(expected);
    });
  
    test('J02 - должен преобразовывать JSON в PavoPipe формат с описаниями', () => {
      const input = [
        { c: 'Париж', f: '3 век до н.э.' },
        { c: 'Рим', f: '753 год до н.э.' }
      ];
  
      const descriptions = {
        c: 'название столицы',
        f: 'дата основания'
      };
  
      const expected = `= c название столицы
= f дата основания

- |c Париж |f 3 век до н.э.
- |c Рим |f 753 год до н.э.
`;
  
      expect(jsonToPavoPipe(input, descriptions)).toEqual(expected);
    });
  
    test('J03 - должен преобразовывать JSON обратно в PavoPipe с сохранением структуры', () => {
      const pavoData = `= name имя
= age возраст
= job работа

- |name Иван |age 30 |job Программист
- |name Мария |age 25 |job Дизайнер`;
  
      const jsonData = pavoPipeToJson({ content: pavoData });
      const descriptions = {
        name: 'имя',
        age: 'возраст',
        job: 'работа'
      };
  
      expect(jsonToPavoPipe(jsonData, descriptions)).toEqual(pavoData + '\n');
    });
  }); 