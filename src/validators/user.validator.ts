import { body } from 'express-validator';
import createValidator from './createValidator';
import { isEmailAvailable } from '../services/user.service';

export const validators = [
  body('name', 'Invalid Name')
    .isString()
    .bail()
    .notEmpty()
    .withMessage("Name mustn't be an empty string"),
  body('email', 'Invalid email')
    .isEmail()
    .bail()
    .custom((email, { req }) => isEmailAvailable(email, req.params?.id))
    .withMessage('Email is already in use'),
  body('password', 'Invalid password')
    .isString()
    .bail()
    .isLength({ min: 8 })
    .withMessage('Password must be 8 characters or more'),
];

const validateUser = createValidator(...validators);

export default validateUser;
