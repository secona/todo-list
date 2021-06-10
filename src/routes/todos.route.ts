import express from 'express';
import authorize from '../middlewares/authorize';
import validators from '../middlewares/validators';
import todoController from '../controllers/todo.controller';

const router = express.Router();

router
  .route('/:id')
  .all(authorize)
  .get(todoController.all)
  .post(validators.todoBody(), todoController.new);

router
  .route('/:id/:todoId')
  .all(authorize)
  .get(todoController.getById)
  .put(validators.todoBody(true), todoController.updateById)
  .delete(todoController.deleteById);

export default router;
