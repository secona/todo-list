import { body, CustomValidator } from 'express-validator';
import createValidator from './createValidator';
import User from '../models/user.model';

const isEmailAvailable: CustomValidator = (email, { req }) => {
  return User.findOne({ email }).then(data => {
    const id = req.params?.id || '';
    if (data && data._id.toString() !== id) {
      return Promise.reject('Email already in use');
    }
  });
};

const validateUser = createValidator(
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
    .withMessage('Password must be 8 characters or more')
);

export default validateUser;
