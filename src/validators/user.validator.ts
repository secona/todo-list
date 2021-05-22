import { RequestHandler } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { body } from 'express-validator';
import userServices from '../services/user.service';
import authenticateToken from '../middlewares/authenticateToken';
import { createSchemaValidator, createValidator } from './createValidator';
import validateMongoId from './mongoId.validator';

const { isEmailAvailable } = userServices;

const userValidators = {
  userBody(optional?: true) {
    return createSchemaValidator({
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

  isVerified: [validateMongoId, <RequestHandler>(async (req, res, next) => {
      const id = req.params.id;
      const result = await userServices.getById(id);
      if (result === 'not-found')
        return res.status(404).json({
          error: { message: `User with id "${id}" not found` },
        });
      if (result === 'not-verified')
        return res.status(403).json({
          error: { message: `User with id "${id}"'s email not verified` },
        });
      req.user = result;
      next();
    }), authenticateToken],
};

export default userValidators;
