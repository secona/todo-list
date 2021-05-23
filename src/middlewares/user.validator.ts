import { body } from 'express-validator';
import userServices from '../services/user.service';
import createValidator from './createValidator';
import validateMongoId from './mongoId.validator';
import _authenticateToken from './_authenticateToken';
import _isVerified from './_isVerified';

const { isEmailAvailable } = userServices;

const userValidators = {
  userBody(optional?: true) {
    return createValidator({
      name: {
        in: 'body',
        optional,
        isString: { bail: true, errorMessage: 'Invalid name' },
        notEmpty: { errorMessage: "Name mustn't be an empty string" },
      },
      email: {
        in: 'body',
        optional,
        isEmail: { bail: true, errorMessage: 'Invalid email' },
        custom: {
          options: (email, { req }) => isEmailAvailable(email, req.params?.id),
          errorMessage: 'Email is already in use',
        },
      },
      password: {
        in: 'body',
        optional,
        isString: { bail: true, errorMessage: 'Invalid password' },
        isLength: {
          options: { min: 8 },
          errorMessage: 'Password must be 8 characters or more',
        },
      },
    });
  },

  signIn: createValidator([
    body('email', 'Invalid Email').isEmail(),
    body('password', 'Invalid Password').isString(),
  ]),

  isVerified: [validateMongoId, _isVerified, _authenticateToken],
};

export default userValidators;
