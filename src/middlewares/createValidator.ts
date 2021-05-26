import { RequestHandler } from 'express';
import {
  validationResult,
  ValidationChain,
  Schema,
  checkSchema,
} from 'express-validator';

const createValidator = (v: ValidationChain[] | Schema) =>
  <RequestHandler>(async (req, res, next) => {
    const validations = Array.isArray(v) ? v : checkSchema(v);
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    return !errors.isEmpty()
      ? res.status(422).json({ error: errors.array() })
      : next();
  });

export default createValidator;
