import { RequestHandler } from 'express';
import todoService from '../services/todo.service';

const todoController = {
  all: <RequestHandler>((req, res, next) => {
    const userId = req.params.id;
    todoService
      .getAllUserTodos(userId)
      .then(data => res.status(200).json({ data }))
      .catch(next);
  }),

  new: <RequestHandler>((req, res, next) => {
    const userId = req.params.id;
    todoService
      .newTodo(userId, req.body)
      .then(data => res.status(201).json({ data }))
      .catch(next);
  }),

  getById: <RequestHandler>(async (req, res) => {
    const data = req.todo;
    res.status(200).json({ data });
  }),

  updateById: <RequestHandler>((req, res, next) => {
    const todoId = req.params.todoId;
    todoService
      .updateTodoById(todoId, req.body)
      .then(data =>
        res.status(200).json({
          message: `Successfully updated todo with id "${todoId}"`,
          data,
        })
      )
      .catch(next);
  }),

  deleteById: <RequestHandler>((req, res, next) => {
    const { todoId, id: userId } = req.params;
    todoService
      .deleteTodoById(todoId, userId)
      .then(() =>
        res
          .status(200)
          .json({ message: `Successfully deleted todo with id "${todoId}"` })
      )
      .catch(next);
  }),
};

export default todoController;
