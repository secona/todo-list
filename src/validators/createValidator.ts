import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';

export default function createValidator(
  ...validators: RequestHandler[]
): RequestHandler[] {
  return [
    ...validators,
    (req, res, next) => {
      const errors = validationResult(req);
      return !errors.isEmpty()
        ? res.status(422).json({ errors: errors.array() })
        : next();
    },
  ];
}
