import express from 'express';
import authenticateToken from '../middlewares/authenticateToken';
import validateMongoId from '../validators/mongoId.validator';
import userValidator from '../validators/user.validator';
import userController from '../controllers/user.controller';

const router = express.Router();

router.post('/register', userValidator.userBody(), userController.register);
router.post('/signin', userValidator.signIn, userController.signIn);

router
  .route('/:id')
  .all(validateMongoId, authenticateToken)
  .get(userController.byId)
  .put(userValidator.userBody(true), userController.update)
  .delete(userController.remove);

export default router;
