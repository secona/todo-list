import { body } from 'express-validator';
import createValidator from './createValidator';

const validateTodoBody = createValidator(
  body('title', 'Invalid title').isString().bail().notEmpty(),
  body('description', 'Invalid description').isString().optional()
);

export default validateTodoBody;
