import { RequestHandler } from 'express';
import validators from './validators';
import userServices from '../services/user.service';
import todoServices from '../services/todo.service';
import tokenServices from '../services/token.service';
import { BaseError } from '../utils/errors';

const authorize: RequestHandler[] = [
  validators.mongoId,
  async (req, res, next) => {
    try {
      const { userId, todoId } = req.params;
      const authHeader = req.headers.authorization;
      const token = authHeader?.split(' ')[1];
      if (!token)
        throw new BaseError({
          statusCode: 401,
          message: 'Bearer token absent in `authorization` header',
          type: 'validation',
          details: [
            {
              name: 'token',
              msg: 'Bearer token absent in `authorization` header',
            },
          ],
        });

      req.user = await userServices.getOne({ _id: userId });
      await tokenServices.verifyUserToken(token, req.user);
      req.todo = todoId
        ? await todoServices.getOneTodo({ _id: todoId, owner: userId })
        : undefined;

      next();
    } catch (e) {
      next(e);
    }
  },
];

export default authorize;
