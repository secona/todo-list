import * as env from '../env';

it('should have MongoDB URI', () => {
  expect(env.MONGODB_URI).toBeTruthy();
  expect(typeof env.MONGODB_URI).toBe('string');
});

it('should have JWT key', () => {
  expect(env.JWT_KEY).toBeTruthy();
  expect(typeof env.JWT_KEY).toBe('string');
});

it('should have email address', () => {
  expect(env.EMAIL_ADDRESS).toBeTruthy();
  expect(typeof env.EMAIL_ADDRESS).toBe('string');
});

it('should have email password', () => {
  expect(env.EMAIL_PASSWORD).toBeTruthy();
  expect(typeof env.EMAIL_PASSWORD).toBe('string');
});

it('should have email name', () => {
  expect(env.EMAIL_NAME).toBeTruthy();
  expect(typeof env.EMAIL_NAME).toBe('string');
});
