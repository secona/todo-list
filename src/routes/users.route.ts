import express from 'express';
import validateUser from '../middlewares/validateUser';
import * as userController from '../controllers/user.controller';

const router = express.Router();

router.post('/new', validateUser, userController.create);
router
  .route('/:id')
  .get(userController.byId)
  .put(validateUser, userController.update)
  .delete(userController.remove);

export default router;
