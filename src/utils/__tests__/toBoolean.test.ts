import toBoolean from '../toBoolean';

describe('Strings to boolean', () => {
  it('should return true for "true"', () => {
    expect(toBoolean('true')).toBe(true);
  });

  it('should return true for "True"', () => {
    expect(toBoolean('True')).toBe(true);
  });

  it('should return true for "TRUE"', () => {
    expect(toBoolean('TrUe')).toBe(true);
  });

  it('should return false for "false"', () => {
    expect(toBoolean('false')).toBe(false);
  });

  it('should return false for "False"', () => {
    expect(toBoolean('False')).toBe(false);
  });

  it('should return false for "FALSE"', () => {
    expect(toBoolean('FalSe')).toBe(false);
  });
});

describe('Numbers to boolean', () => {
  it('should return true for 1', () => {
    expect(toBoolean(1)).toBe(true);
  });

  it('should return true for "1"', () => {
    expect(toBoolean('1')).toBe(true);
  });

  it('should return false for 0', () => {
    expect(toBoolean(0)).toBe(false);
  });

  it('should return false for "0"', () => {
    expect(toBoolean('0')).toBe(false);
  });

  it('should return false for 123', () => {
    expect(toBoolean(123)).toBe(false);
  });

  it('should return false for "123"', () => {
    expect(toBoolean('123')).toBe(false);
  });

  it('should return false for 1234567890', () => {
    expect(toBoolean(1234567890)).toBe(false);
  });

  it('should return false for "1234567890"', () => {
    expect(toBoolean('1234567890')).toBe(false);
  });
});
