import express from 'express';
import userValidators from '../middlewares/user.validator';
import todoValidators from '../middlewares/todo.validator';
import todoController from '../controllers/todo.controller';

const router = express.Router();

router.all('/:id*', userValidators.isVerified);

router
  .route('/:id')
  .get(todoController.all)
  .post(todoValidators.todoBody(), todoController.new);

router
  .route('/:id/:todoId')
  .get(todoController.getById)
  .put(todoValidators.todoBody(true), todoController.updateById)
  .delete(todoController.deleteById);

export default router;
