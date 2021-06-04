import { LOG_PREFIX, SALT_ROUNDS } from '..';

it('should have LOG_PREFIX', () => {
  expect(LOG_PREFIX).toBeTruthy();
  expect(typeof LOG_PREFIX).toBe('string');
});

it('should have SALT_ROUNDS', () => {
  expect(SALT_ROUNDS).toBeTruthy();
  expect(typeof SALT_ROUNDS).toBe('number');
});
