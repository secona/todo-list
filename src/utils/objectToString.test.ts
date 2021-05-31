import objectToString from './objectToString';

it('should return "" for empty object', () => {
  expect(objectToString({})).toBe('');
});

it('should handle one key object', () => {
  expect(objectToString({ firstname: 'Rick' })).toBe('firstname "Rick"');
});

it('should handle two key object', () => {
  const result = objectToString({ firstname: 'Rick', lastname: 'Sanchez' });
  expect(result).toBe('firstname "Rick", lastname "Sanchez"');
});

it('should handle object with numbers', () => {
  const result = objectToString({
    firstname: 'Rick',
    lastname: 'Sanchez',
    age: 70,
  });
  expect(result).toBe('firstname "Rick", lastname "Sanchez", age "70"');
});
