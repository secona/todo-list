import express from 'express';
import authorize from '../middlewares/authorize';
import validators from '../middlewares/validators';
import todoController from '../controllers/todo.controller';

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .all(authorize)
  .get(todoController.all)
  .post(validators.todoBody(), todoController.new);

router
  .route('/:todoId')
  .all(authorize)
  .get(todoController.getById)
  .patch(validators.todoBody(true), todoController.updateById)
  .delete(todoController.deleteById);

export default router;
