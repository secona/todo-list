import { body, param } from 'express-validator';
import userServices from '../services/user.service';
import createValidator from './createValidator';

const { isEmailAvailable } = userServices;

/**
 * Validators object that validates data (body, params, etc).\
 * Does not handle authentication and/or authorization
 */
const validators = {
  mongoId: createValidator([
    param(['todoIdd', 'todoId'], 'Invalid Id').isMongoId().optional(),
  ]),

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

  todoBody(optional?: true) {
    return createValidator({
      title: {
        in: 'body',
        optional,
        errorMessage: 'Invalid title',
        isString: { bail: true },
        notEmpty: true,
      },
      description: {
        in: 'body',
        errorMessage: 'Invalid description',
        isString: true,
        optional: true,
      },
    });
  },
};

export default validators;
