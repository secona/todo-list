import { RequestHandler } from 'express';
import todoService from '../services/todo.service';

const todoController: Record<
  'all' | 'new' | 'getById' | 'updateById' | 'deleteById',
  RequestHandler
> = {
  all: (req, res, next) => {
    todoService
      .getAllUserTodos(req.user!)
      .then(data => res.status(200).json({ data }))
      .catch(next);
  },

  new: (req, res, next) => {
    todoService
      .newTodo(req.user!, req.body)
      .then(data => res.status(201).json({ data }))
      .catch(next);
  },

  getById: (req, res) => {
    const data = req.todo;
    res.status(200).json({ data });
  },

  updateById: (req, res, next) => {
    todoService
      .updateTodo(req.todo!, req.body)
      .then(data =>
        res.status(200).json({
          message: `Successfully updated todo with id "${data?._id}"`,
          data,
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
          message: `Successfully deleted todo with id "${todoId}"`,
        })
      )
      .catch(next);
  },
};

export default todoController;
