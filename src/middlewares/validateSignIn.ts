import { RequestHandler } from 'express';
import { body } from 'express-validator';
import handleValidationResult from './handleValidator';

const validateSignIn: RequestHandler[] = [
  body('email', 'Invalid Email').isEmail().exists(),
  body('password', 'Invalid Password').isString().exists(),
  handleValidationResult,
];

export default validateSignIn;
