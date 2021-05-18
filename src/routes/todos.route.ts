import express from 'express';
import validateMongoId from '../validators/mongoId.validator';
import todoValidators from '../validators/todo.validator';
import todoController from '../controllers/todo.controller';

const router = express.Router();

router.get('/:id/all', validateMongoId, todoController.all);
router.post(
  '/:id/new',
  validateMongoId,
  todoValidators.todoBody(),
  todoController.new
);

router
  .route('/:id/:todoId')
  .all(validateMongoId)
  .get(todoController.getById)
  .put(todoValidators.todoBody(true), todoController.updateById)
  .delete(todoController.deleteById);

export default router;
