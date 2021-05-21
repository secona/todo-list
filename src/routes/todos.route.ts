import express from 'express';
import authenticateToken from '../middlewares/authenticateToken';
import validateMongoId from '../validators/mongoId.validator';
import todoValidators from '../validators/todo.validator';
import todoController from '../controllers/todo.controller';

const router = express.Router();

router.all('/:id*', validateMongoId, authenticateToken);

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
