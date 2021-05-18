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

export function createValidator(validators: ValidationChain[]) {
  return [...validators, handleValidationResult];
}

export function createSchemaValidator(schema: Schema) {
  return [...checkSchema(schema), handleValidationResult];
}
