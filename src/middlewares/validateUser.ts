import { RequestHandler } from 'express';
import { body, CustomValidator } from 'express-validator';
import handleValidationResult from './handleValidator';
import User from '../models/user.model';

const isEmailAvailable: CustomValidator = email => {
  return User.findOne({ email }).then(data => {
    if (data) return Promise.reject('Email already in use');
  });
};

const validateUser: RequestHandler[] = [
  body('name', 'Invalid Name')
    .isString()
    .bail()
    .notEmpty()
    .withMessage("Name mustn't be an empty string"),
  body('email', 'Invalid email')
    .isEmail()
    .bail()
    .custom(isEmailAvailable)
    .withMessage('Email is already in use'),
  body('password', 'Invalid password')
    .isString()
    .bail()
    .isLength({ min: 8 })
    .withMessage('Password must be 8 characters or more'),
  handleValidationResult,
];

export default validateUser;
