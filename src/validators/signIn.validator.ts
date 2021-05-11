import { body } from 'express-validator';
import createValidator from './createValidator';

const validateSignIn = createValidator(
  body('email', 'Invalid Email').isEmail(),
  body('password', 'Invalid Password').isString()
);

export default validateSignIn;
