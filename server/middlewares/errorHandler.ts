import { ErrorRequestHandler } from 'express';
import { BaseError } from '../utils/errors';

const errorHandler: ErrorRequestHandler = (
  error: BaseError,
  _req,
  res,
  _next
) => {
  const { statusCode = 500, message, name } = error;
  res.status(statusCode).json({
    message: 'an error occurred',
    error: { message, name },
  });
};

export default errorHandler;
