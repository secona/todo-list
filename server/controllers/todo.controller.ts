import { RequestHandler } from 'express';
import todoService from '../services/todo.service';

const todoController: Record<
  'all' | 'new' | 'getById' | 'updateById' | 'deleteById',
  RequestHandler
> = {
  all: (req, res, next) => {
    todoService
      .getAllUserTodos(req.user!)
      .then(todo =>
        res.status(200).json({
          success: true,
          data: { todo },
        })
      )
      .catch(next);
  },

  new: (req, res, next) => {
    todoService
      .newTodo(req.user!, req.body)
      .then(todo => {
        res.status(201).json({
          success: true,
          data: { todo },
        });
      })
      .catch(next);
  },

  getById: (req, res) => {
    res.status(200).json({
      data: { todo: req.todo },
    });
  },

  updateById: (req, res, next) => {
    todoService
      .updateTodo(req.todo!, req.body)
      .then(todo =>
        res.status(200).json({
          success: true,
          message: `updated todo with id "${todo?._id}"`,
          data: { todo },
        })
      )
      .catch(next);
  },

  deleteById: (req, res, next) => {
    const { todoId } = req.params;
    todoService
      .deleteTodo(req.todo!)
      .then(() =>
        res.status(200).json({
          success: true,
          message: `deleted todo with id "${todoId}"`,
          data: { todo: null },
        })
      )
      .catch(next);
  },
};

export default todoController;
