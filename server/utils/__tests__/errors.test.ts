import { BaseError } from '../errors';

it('should have correct values', () => {
  const values: BaseError = {
    details: { jazz: 'you dont like?' },
    message: 'ya like jazz',
    statusCode: 200,
  };

  const error = new BaseError(values);
  expect(error).toMatchObject(values);
});

it('should have default values', () => {
  const error = new BaseError();
  expect(error).toMatchObject<BaseError>({
    statusCode: 500,
    message: 'an error occurred',
    details: {},
  });
});

it('should have partial default values', () => {
  const error = new BaseError({ statusCode: 404 });
  expect(error).toMatchObject<BaseError>({
    statusCode: 404,
    details: {},
    message: 'an error occurred',
  });
});
