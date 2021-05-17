import { RequestHandler } from 'express';
import todoService from '../services/todo.service';

const todoController = {
  all: <RequestHandler>(async (req, res) => {
    try {
      const userId = req.params.id;
      const data = await todoService.getAllUserTodos(userId);

      if (data) return res.status(200).json({ data });
      return res.status(404).json({
        error: { message: `Todo for user with id "${userId}" not found` },
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  }),

  new: <RequestHandler>(async (req, res) => {
    try {
      const userId = req.params.id;
      const data = await todoService.newTodo(userId, req.body);

      if (data) return res.status(201).json({ data });
      return res.status(404).json({
        error: { message: `User with id "${userId}" not found` },
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  }),

  getById: <RequestHandler>(async (req, res) => {
    try {
      const todoId = req.params.todoId;
      const userId = req.params.id;
      const data = await todoService.getTodoById(todoId, userId);

      if (data) return res.status(200).json({ data });
      return res.status(404).json({
        error: {
          message: `Todo with id "${todoId}" that belongs to user with id "${userId}" not found`,
        },
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  }),

  updateById: <RequestHandler>(async (req, res) => {
    try {
      const todoId = req.params.todoId;
      const userId = req.params.id;
      const data = await todoService.updateTodoById(todoId, userId, req.body);

      if (data) return res.status(200).json({ data });
      return res.status(404).json({
        error: {
          message: `Todo with id "${todoId}" that belongs to user with id "${userId}" not found`,
        },
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  }),

  deleteById: <RequestHandler>(async (req, res) => {
    try {
      const todoId = req.params.todoId;
      const userId = req.params.id;
      const data = await todoService.deleteTodoById(todoId, userId);

      if (data)
        return res
          .status(200)
          .json({ message: `Successfully deleted todo with id "${todoId}"` });

      return res.status(404).json({
        error: {
          message: `Todo with id "${todoId}" that belongs to user with id "${userId}" not found`,
        },
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  }),
};

export default todoController;
