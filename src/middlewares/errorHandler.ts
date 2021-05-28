import { ErrorRequestHandler } from 'express';
import { BaseError } from '../utils/errors';

const errorHandler: ErrorRequestHandler = (
  error: BaseError,
  _req,
  res,
  _next
) => {
  const { statusCode = 500, message } = error;
  res.status(statusCode).json({ error: { message } });
};

export default errorHandler;
