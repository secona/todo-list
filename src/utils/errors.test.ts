import {
  BaseError,
  NotFoundError,
  ForbiddenError,
  BadRequestError,
  UnauthorizedError,
} from './errors';

it('should have all the correct values for BaseError', () => {
  const err = new BaseError(405, 'method not allowed');
  expect(err.statusCode).toBe(405);
  expect(err.message).toBe('method not allowed');
});

it('should have all the correct values for NotFoundError', () => {
  const err = new NotFoundError('User not found');
  expect(err.statusCode).toBe(404);
  expect(err.message).toBe('User not found');
});

it('should have all the correct values for ForbiddenError', () => {
  const err = new ForbiddenError('You shall not pass');
  expect(err.statusCode).toBe(403);
  expect(err.message).toBe('You shall not pass');
});

it('should have all the correct values for BadRequestError', () => {
  const err = new BadRequestError('stinky bad request');
  expect(err.statusCode).toBe(400);
  expect(err.message).toBe('stinky bad request');
});

it('should have all the correct values for UnauthorizedError', () => {
  const err = new UnauthorizedError('pass where?');
  expect(err.statusCode).toBe(401);
  expect(err.message).toBe('pass where?');
});
