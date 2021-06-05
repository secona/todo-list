import toBoolean from '../toBoolean';

describe('Strings to boolean', () => {
  it('should return true for "true"', () => {
    expect(toBoolean('true')).toBe(true);
  });

  it('should return true for "True"', () => {
    expect(toBoolean('True')).toBe(true);
  });

  it('should return true for "TRUE"', () => {
    expect(toBoolean('TRUE')).toBe(true);
  });

  it('should return false for "false"', () => {
    expect(toBoolean('false')).toBe(false);
  });

  it('should return false for "False"', () => {
    expect(toBoolean('False')).toBe(false);
  });

  it('should return false for "FALSE"', () => {
    expect(toBoolean('FALSE')).toBe(false);
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
});

describe('Random string', () => {
  it('should return false for "213"', () => {
    expect(toBoolean('213')).toBe(false);
  });

  it('should return false for "qwetrueqwe"', () => {
    expect(toBoolean('qwetrueqwe')).toBe(false);
  });

  it('should return false for 123', () => {
    expect(toBoolean(123)).toBe(false);
  });

  it('should return false for "qwefalseqwe"', () => {
    expect(toBoolean('qwefalseqwe')).toBe(false);
  });
});
