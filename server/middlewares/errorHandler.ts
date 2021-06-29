import { ErrorRequestHandler } from 'express';
import { BaseError } from '../utils/errors';

const errorHandler: ErrorRequestHandler = (
  err: BaseError | Error,
  req,
  res,
  next
) => {
  const error = err instanceof BaseError ? err : new BaseError({ ...err });
  const { message, ...rest } = error;

  res.status(error.statusCode).json({
    success: false,
    message,
    error: rest,
  });
};

export default errorHandler;
