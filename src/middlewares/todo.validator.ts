import { RequestHandler } from 'express';
import createValidator from './createValidator';
import todoServices from '../services/todo.service';
import { NotFoundError, ForbiddenError } from '../utils/errors';
import mongoose from 'mongoose';

const todoValidators = {
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

  belongToUser: <RequestHandler>(async (req, res, next) => {
    try {
      const { todoId: _id, id: owner } = req.params;
      const todo = await todoServices.getOneTodo({ _id, owner });
      req.todo = todo;
      next();
    } catch (e) {
      next(e);
    }
  }),
};

export default todoValidators;
