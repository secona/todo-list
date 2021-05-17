import express from 'express';
import validateMongoId from '../validators/mongoId.validator';
import validateTodoBody from '../validators/todoBody.validator';
import todoController from '../controllers/todo.controller';

const router = express.Router();

router.get('/:id/all', validateMongoId, todoController.all);
router.post('/:id/new', validateMongoId, validateTodoBody, todoController.new);

router
  .route('/:id/:todoId')
  .all(validateMongoId)
  .get(todoController.getById)
  // TODO: PUT validator
  .put(todoController.updateById)
  .delete(todoController.deleteById);

export default router;
