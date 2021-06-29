import { RequestHandler } from 'express';
import {
  validationResult,
  ValidationChain,
  Schema,
  checkSchema,
} from 'express-validator';
import { BaseError } from '../utils/errors';

const createValidator = (v: ValidationChain[] | Schema) =>
  <RequestHandler>(async (req, res, next) => {
    const validations = Array.isArray(v) ? v : checkSchema(v);
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req).formatWith(
      ({ location, value, param, msg }) => ({
        location,
        value,
        name: param,
        msg,
      })
    );

    if (errors.isEmpty()) return next();
    next(
      new BaseError({
        statusCode: 422,
        message: 'validation error in request',
        type: 'validation',
        details: errors.array(),
      })
    );
  });

export default createValidator;
