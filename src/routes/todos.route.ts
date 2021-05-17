import express from 'express';
import validateMongoId from '../validators/mongoId.validator';
import validateTodoBody from '../validators/todoBody.validator';
import todoController from '../controllers/todo.controller';

const router = express.Router();

router.get('/:id/all', validateMongoId, todoController.all);
router.post('/:id/new', validateMongoId, validateTodoBody, todoController.new);

// TODO: authenticate user id with todo's owner id
router
  .route('/:id/:todoId')
  .get(todoController.getById)
  // TODO: PUT validator
  .put(todoController.updateById)
  .delete(todoController.deleteById);

export default router;
