import { RequestHandler } from 'express';
import {
  validationResult,
  ValidationChain,
  Schema,
  checkSchema,
} from 'express-validator';

export const handleValidationResult: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  return !errors.isEmpty()
    ? res.status(422).json({ errors: errors.array() })
    : next();
};

export default function createValidator(
  validators: ValidationChain[] | Schema
): RequestHandler[] {
  return Array.isArray(validators)
    ? [...validators, handleValidationResult]
    : [...checkSchema(validators), handleValidationResult];
}
