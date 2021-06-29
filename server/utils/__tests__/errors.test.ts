import { BaseError } from '../errors';

it('should have correct values', () => {
  const values: BaseError = {
    message: 'ya like jazz?',
    statusCode: 500,
    type: 'other',
    details: [{ key: 'jazz', msg: 'ya like?' }],
  };

  const error = new BaseError(values);
  expect(error).toMatchObject(values);
});

it('should have default values', () => {
  const error = new BaseError();
  expect(error).toMatchObject<BaseError>({
    statusCode: 500,
    type: 'other',
    message: 'an error occurred',
    details: [],
  });
});

it('should have partial default values', () => {
  const error = new BaseError({ statusCode: 404 });
  expect(error).toMatchObject<BaseError>({
    statusCode: 404,
    type: 'other',
    message: 'an error occurred',
    details: [],
  });
});
