import { param } from 'express-validator';
import createValidator from './createValidator';

const validateMongoId = createValidator(
  param(['id', 'todoId'], 'Invalid Id').isMongoId().optional()
);

export default validateMongoId;
