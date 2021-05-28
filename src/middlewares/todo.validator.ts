import { RequestHandler } from 'express';
import createValidator from './createValidator';
import Todo from '../models/todo.model';
import { NotFoundError, ForbiddenError } from '../utils/errors';

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
    const { todoId, id: userId } = req.params;
    const todo = await Todo.findById(todoId).lean().exec();

    if (!todo)
      return next(new NotFoundError(`Todo with id "${todoId}" not found`));

    if (todo.owner.toString() !== userId) {
      return next(
        new ForbiddenError(
          `Todo with id "${todoId}" does not belong to user with id "${userId}"`
        )
      );
    }

    req.todo = todo;
    next();
  }),
};

export default todoValidators;
