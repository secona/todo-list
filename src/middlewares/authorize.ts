import { RequestHandler } from 'express';
import validators from './validators';
import userServices from '../services/user.service';
import todoServices from '../services/todo.service';
import tokenServices from '../services/token.service';
import { UnauthorizedError } from '../utils/errors';

const authorize: RequestHandler[] = [
  validators.mongoId,
  async (req, res, next) => {
    try {
      const { id, todoId } = req.params;
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];
      if (!token)
        throw new UnauthorizedError(
          'Bearer token required in `authorization` header'
        );

      req.user = await userServices.getOne({ _id: id });
      await tokenServices.verifyUserToken(token, req.user);
      req.todo = todoId
        ? await todoServices.getOneTodo({ _id: todoId, owner: id })
        : undefined;

      next();
    } catch (e) {
      next(e);
    }
  },
];

export default authorize;
