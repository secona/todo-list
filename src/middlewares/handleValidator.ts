import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';

const handleValidationResult: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  return !errors.isEmpty()
    ? res.status(422).json({ errors: errors.array() })
    : next();
};

export default handleValidationResult;
