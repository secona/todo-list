import { ErrorRequestHandler } from 'express';
import { BaseError } from '../utils/errors';

const errorHandler: ErrorRequestHandler = (
  err: BaseError | Error,
  req,
  res,
  next
) => {
  const error = err instanceof BaseError ? err : new BaseError({ ...err });
  res.status(error.statusCode).json({ error });
};

export default errorHandler;
